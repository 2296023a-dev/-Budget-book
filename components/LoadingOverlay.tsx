import React from 'react';
import { Loader2, ScanLine } from 'lucide-react';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible, message = "レシートを解析中..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-900/90 backdrop-blur-sm text-white">
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary-500 opacity-20"></div>
        <div className="relative bg-white/10 p-4 rounded-full">
           <ScanLine className="w-12 h-12 text-primary-400 animate-pulse" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Loader2 className="w-5 h-5 animate-spin text-primary-400" />
        <p className="text-lg font-medium tracking-wide">{message}</p>
      </div>
      <p className="mt-2 text-sm text-gray-300">AIが内容を読み取っています</p>
    </div>
  );
};

export default LoadingOverlay;