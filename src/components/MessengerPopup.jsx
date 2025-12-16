import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const MessengerPopup = ({ transaction }) => {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (transaction) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [transaction]);

  if (!transaction) return null;

  const formatMoney = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const isSpend = transaction.type === 'spend';
  const txtReport = t('report_title');
  const txtWithdrew = t('withdrew');
  const txtDonated = t('donated');
  const txtJustNow = t('just_now');

  return (
    <div
      id="messenger-pop"
      className={`messenger-pop fixed top-0 left-0 right-0 z-[60] px-4 pt-4 md:pt-6 pointer-events-none flex justify-center ${show ? 'show' : ''}`}
    >
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-4 w-full max-w-lg border border-gray-100 ring-1 ring-black/5 flex items-center gap-4 relative overflow-hidden">
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 ${
            isSpend ? 'bg-red-500' : 'bg-green-500'
          }`}
        ></div>
        <div className="shrink-0 relative">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm border border-white ${
              isSpend
                ? 'bg-red-100 text-red-600'
                : 'bg-green-100 text-green-600'
            }`}
          >
            <i
              className={`fa-solid ${
                isSpend ? 'fa-arrow-trend-down' : 'fa-coins animate-bounce'
              }`}
            ></i>
          </div>
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-gray-900 truncate pr-2 text-base">
              {isSpend ? txtReport : transaction.name.split('(')[0]}
            </h4>
            <span className="text-[10px] text-gray-400 whitespace-nowrap pt-0.5">
              {txtJustNow}
            </span>
          </div>
          <p className="text-sm text-gray-600 truncate mt-0.5 font-medium">
            {isSpend ? (
              <>
                {txtWithdrew}{' '}
                <span className="font-bold text-red-600">
                  -{formatMoney(transaction.amount)}đ
                </span>
                : {transaction.msg}
              </>
            ) : (
              <>
                {txtDonated}{' '}
                <span className="font-bold text-green-600">
                  +{formatMoney(transaction.amount)}đ
                </span>
                : &quot;{transaction.msg}&quot;
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessengerPopup;

