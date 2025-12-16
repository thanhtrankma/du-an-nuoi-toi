import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

const Donate = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const accountNumber = '03497785801';
  const accountName = 'TRAN DUNG THANH';

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <>
      <section
        id="donate"
        className="bg-white rounded-[2rem] p-8 md:p-12 text-center shadow-2xl border-4 border-white ring-1 ring-gray-100 relative overflow-visible transform transition hover:-translate-y-1"
      >
        <h2 className="text-3xl font-extrabold mb-2 text-gray-800 relative z-10">
          {t('donate_title')}
        </h2>
        <p className="text-gray-500 mb-8 relative z-10">{t('donate_desc')}</p>

        <div className="max-w-xs mx-auto bg-white rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] border border-gray-100 overflow-visible relative z-10 pb-4">
          <div className="bg-[#5e2396] p-4 flex items-center justify-center gap-3 rounded-t-2xl">
            <div className="bg-white p-1 rounded h-8 w-16 flex items-center justify-center shadow-sm">
              <img
                src="/Icon-TPBank.webp"
                alt="TP BANK"
                className="h-full object-contain"
              />
            </div>
            <span className="text-white font-bold tracking-widest text-sm">TP BANK</span>
          </div>

          <div className="p-6 pb-2">
            <div className="mb-3 text-center">
              <span className="inline-block bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full border border-red-100 shadow-sm animate-pulse">
                ❤️ {t('qr_note')}
              </span>
            </div>

            <div className="relative inline-block group">
              <div className="bg-white p-2 rounded-xl shadow-inner border border-gray-200">
                <img
                  src="https://i.postimg.cc/N0c7z9N3/IMG-3363.jpg"
                  alt="QR Code"
                  className="w-48 h-48 object-contain mix-blend-multiply transition group-hover:scale-105 duration-300"
                />
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                {t('acc_num_label')}
              </p>
              <div
                className="flex items-center justify-center gap-2 group cursor-pointer bg-purple-50 hover:bg-purple-100 p-3 rounded-xl border border-purple-100 hover:border-purple-300 transition duration-300"
                onClick={() => copyToClipboard(accountNumber)}
              >
                <span className="text-2xl font-mono font-bold text-[#5e2396] tracking-wider">
                  {accountNumber.match(/.{1,4}/g).join('.')}
                </span>
                <i className="fa-regular fa-copy text-purple-400 group-hover:text-purple-600"></i>
              </div>
              <p className="text-sm font-bold text-gray-700 uppercase pt-2">{accountName}</p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-400 italic">
          *{t('scan_note')}*
        </p>
        <p className="mt-2 text-sm text-gray-500 font-bold">{t('car_promise')}</p>
      </section>

      {copied && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center gap-2">
          <i className="fa-solid fa-circle-check text-green-400"></i>
          <span>{t('toast_copied')}{accountNumber}</span>
        </div>
      )}
    </>
  );
};

export default Donate;

