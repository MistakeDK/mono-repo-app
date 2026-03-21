'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [isInstalled, setIsInstalled] = useState(false);

  const [showInstallButton, setShowInstallButton] = useState(false);

  const handleBeforeInstallPrompt = (e: Event) => {
    e.preventDefault();

    setInstallPrompt(e as BeforeInstallPromptEvent);

    setShowInstallButton(true);
  };

  const handleAppInstalled = () => {
    console.log('PWA đã được cài đặt thành công');
    setInstallPrompt(null);
    setShowInstallButton(false);
    setIsInstalled(true);
  };

  const checkIfInstalled = () => {
    const isRunningAsApp =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsInstalled(isRunningAsApp);
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    checkIfInstalled();

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    try {
      await installPrompt.prompt();

      const { outcome } = await installPrompt.userChoice;

      if (outcome === 'accepted') {
        setShowInstallButton(false);
      }

      setInstallPrompt(null);
    } catch (error) {
      console.error('Lỗi khi cài đặt PWA:', error);
    }
  };

  if (isInstalled || !showInstallButton) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Cài đặt ứng dụng</h3>
          <p className="text-sm text-gray-600">
            Cài đặt Tuduu trên điện thoại của bạn để truy cập nhanh hơn
          </p>
        </div>

        <button
          onClick={() => setShowInstallButton(false)}
          className="text-gray-400 hover:text-gray-600 shrink-0"
          aria-label="Đóng"
        >
          ✕
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleInstallClick}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Cài đặt
        </button>
        <button
          onClick={() => setShowInstallButton(false)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
        >
          Sau
        </button>
      </div>
    </div>
  );
};
