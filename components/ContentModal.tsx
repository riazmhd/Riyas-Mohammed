import React, { useState, useEffect, DragEvent } from 'react';
import { format } from 'date-fns';
import { Post, SocialPlatform, Client } from '../types';
import { SOCIAL_PLATFORMS } from '../constants';
import { X, Calendar, Clock, UploadCloud, Twitter, Instagram, Facebook, Linkedin, Building2 } from 'lucide-react';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: Omit<Post, 'id'>) => void;
  selectedDate: Date;
}

const platformIcons: Record<SocialPlatform, React.ReactNode> = {
    Instagram: <Instagram className="h-5 w-5" />,
    Twitter: <Twitter className="h-5 w-5" />,
    Facebook: <Facebook className="h-5 w-5" />,
    LinkedIn: <Linkedin className="h-5 w-5" />,
};

const platformColors: Record<SocialPlatform, string> = {
    Instagram: 'text-[#E1306C]',
    Twitter: 'text-[#1DA1F2]',
    Facebook: 'text-[#1877F2]',
    LinkedIn: 'text-[#0A66C2]',
}

const CLIENTS: Client[] = ['H&S', 'DECA', 'DPS'];

export const ContentModal: React.FC<ContentModalProps> = ({ isOpen, onClose, onSave, selectedDate }) => {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState<SocialPlatform>('Instagram');
  const [time, setTime] = useState('10:00');
  const [client, setClient] = useState<Client | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setContent('');
      setPlatform('Instagram');
      setTime('10:00');
      setClient(null);
      setFile(null);
      setPreviewUrl(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || (!content.trim() && !file)) return;
    onSave({
      date: format(selectedDate, 'yyyy-MM-dd'),
      content: content.trim() || file!.name,
      platform,
      time,
      client,
      file: file ? { name: file.name, type: file.type } : undefined,
    });
  };
  
  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
        setFile(selectedFile);
    }
  };

  const handleDragEvents = (e: DragEvent<HTMLDivElement>, dragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    const droppedFile = e.dataTransfer.files && e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };
  
  if (!isOpen) return null;

  const canSave = !!(client && (content.trim() || file));

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-md" onClick={onClose}>
      <div className="bg-white/60 backdrop-blur-2xl border border-white/50 rounded-2xl shadow-2xl w-full max-w-3xl transform transition-all duration-300" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
           <div className="p-6 border-b border-white/40 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Create New Content</h2>
              <p className="text-sm text-slate-600 mt-1">Design your post and schedule it for the perfect time.</p>
            </div>
            <button type="button" onClick={onClose} className="p-2 rounded-full hover:bg-black/10">
              <X className="h-6 w-6 text-slate-700" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 border-r-0 md:border-r border-white/40">
              <div className="space-y-6">
                {file ? (
                  <div className="relative group">
                    <img src={previewUrl || ''} alt="Preview" className="w-full h-48 object-cover rounded-lg shadow-lg" />
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <button 
                          type="button" 
                          onClick={() => setFile(null)} 
                          className="bg-white/20 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-white/30 backdrop-blur-sm"
                        >
                            Remove
                        </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragEnter={(e) => handleDragEvents(e, true)}
                    onDragLeave={(e) => handleDragEvents(e, false)}
                    onDragOver={(e) => handleDragEvents(e, true)}
                    onDrop={handleDrop}
                    className={`relative block w-full h-48 border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-slate-400/50 hover:border-blue-500/50'}`}
                  >
                    <label htmlFor="file-upload" className="cursor-pointer h-full flex flex-col items-center justify-center">
                      <UploadCloud className="mx-auto h-10 w-10 text-slate-500" />
                      <span className="mt-2 block text-sm font-semibold text-slate-700">
                        Drag & drop file or <span className="text-blue-600">click to upload</span>
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">PNG, JPG, GIF up to 10MB</span>
                    </label>
                    <input id="file-upload" type="file" className="sr-only" onChange={e => handleFileChange(e.target.files ? e.target.files[0] : null)} />
                  </div>
                )}
                
                <div>
                  <textarea
                    id="content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    rows={6}
                    className="w-full bg-white/50 border border-white/40 rounded-lg shadow-inner focus:ring-blue-500 focus:border-blue-500 transition p-4 text-sm placeholder:text-slate-500"
                    placeholder="Write your caption or post content here..."
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-black/5">
              <div className="space-y-6">
                 <div>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2"><Building2 className="h-4 w-4"/>Client</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {CLIENTS.map(c => (
                       <button
                         key={c}
                         type="button"
                         onClick={() => setClient(c)}
                         className={`p-3 text-sm font-semibold rounded-lg border-2 transition-all duration-200 ${client === c ? `border-blue-500/50 bg-blue-500/10 text-blue-700 shadow-sm` : 'border-transparent bg-white/50 text-slate-600 hover:bg-white/80'}`}
                       >
                         {c}
                       </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Platform</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {SOCIAL_PLATFORMS.map(p => (
                       <button
                         key={p}
                         type="button"
                         onClick={() => setPlatform(p)}
                         className={`flex items-center gap-2 p-3 text-sm font-semibold rounded-lg border-2 transition-all duration-200 ${platform === p ? `border-blue-500/50 bg-blue-500/10 text-blue-700 shadow-sm` : 'border-transparent bg-white/50 text-slate-600 hover:bg-white/80'}`}
                       >
                         <span className={platform === p ? platformColors[p] : 'text-slate-500'}>{platformIcons[p]}</span>
                         {p}
                       </button>
                    ))}
                  </div>
                </div>
                
                <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Schedule</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/50 rounded-lg border border-white/40">
                           <label htmlFor="date" className="flex items-center gap-2 text-xs font-medium text-slate-500">
                               <Calendar className="h-4 w-4" />
                               <span>Date</span>
                           </label>
                           <p className="font-semibold text-slate-800 mt-1">{format(selectedDate, 'MMM d, yyyy')}</p>
                        </div>
                        <div className="relative">
                            <label htmlFor="time" className="absolute -top-2 left-2 inline-block bg-transparent px-1 text-xs font-medium text-slate-500">
                                <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> Time</div>
                            </label>
                            <input
                                type="time"
                                id="time"
                                value={time}
                                onChange={e => setTime(e.target.value)}
                                className="w-full h-full p-3 pt-4 bg-white/50 border border-white/40 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition font-semibold"
                            />
                        </div>
                    </div>
                </div>

              </div>
            </div>
          </div>
          <div className="p-4 bg-black/5 rounded-b-2xl flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white/50 border border-white/40 rounded-lg hover:bg-white/80 transition duration-200">
              Cancel
            </button>
            <button type="submit" disabled={!canSave} className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed disabled:shadow-none">
              Schedule Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};