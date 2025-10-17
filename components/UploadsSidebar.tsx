import React from 'react';
import { format } from 'date-fns';
import { Post } from '../types';
import { X, File, User, Download } from 'lucide-react';

interface UploadsSidebarProps {
  data: { date: Date; posts: Post[] } | null;
  onClose: () => void;
}

export const UploadsSidebar: React.FC<UploadsSidebarProps> = ({ data, onClose }) => {
  const handleDownload = (post: Post) => {
    if (!post.file) return;

    // In a real app, this would be a direct URL to the stored file.
    // For this demo, we'll simulate a download using a placeholder image.
    const fileUrl = `https://picsum.photos/seed/${post.id}/1920/1080`;
    
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = post.file?.name || 'downloaded-file';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      })
      .catch(err => {
        console.error('Download simulation failed:', err);
        // Fallback to opening in a new tab if blob download fails
        window.open(fileUrl, '_blank');
      });
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 bg-white z-40 flex flex-col border-r border-slate-200 shadow-xl transition-transform duration-300 ease-in-out ${
        data ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Header */}
      {data && (
        <>
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-800">Uploads for</h3>
              <p className="text-sm text-slate-500">{format(data.date, 'MMMM d, yyyy')}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 transition-colors"
              aria-label="Close uploads sidebar"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          {/* Uploads List */}
          <div className="flex-1 p-4 overflow-y-auto">
            {data.posts.length > 0 ? (
              <ul className="space-y-3">
                {data.posts.map((post) => (
                  <li key={post.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200 group">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <File className="h-5 w-5 text-blue-500 flex-shrink-0" />
                            <p className="text-sm font-medium text-slate-800 truncate" title={post.file?.name}>
                                {post.file?.name}
                            </p>
                        </div>
                        <button
                            onClick={() => handleDownload(post)}
                            className="p-1.5 rounded-full hover:bg-slate-200 transition-colors flex-shrink-0"
                            title={`Download ${post.file?.name}`}
                            aria-label={`Download ${post.file?.name}`}
                        >
                            <Download className="h-4 w-4 text-slate-500 group-hover:text-slate-800 transition-colors" />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1.5 pl-8">
                      <User className="h-3 w-3" />
                      <span>Uploaded by {post.uploader || 'Unknown'}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-sm text-slate-500 mt-8">No uploads for this day.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};