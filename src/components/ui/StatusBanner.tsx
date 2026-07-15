import React from 'react';

interface StatusBannerProps {
  type: 'success' | 'error' | 'info';
  message: React.ReactNode;
}

export default function StatusBanner({ type, message }: StatusBannerProps) {
  const styles = {
    success: 'bg-[#A3D5D3]/20 border-[#A3D5D3] text-[#2c615f]',
    error: 'bg-red-50 border-red-300 text-red-800',
    info: 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--foreground)]'
  };

  const icons = {
    success: '✅',
    error: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={`p-4 rounded-2xl border-2 flex items-start gap-4 shadow-sm animate-float ${styles[type]}`}>
      <span className="text-2xl">{icons[type]}</span>
      <div className="font-semibold text-lg">{message}</div>
    </div>
  );
}
