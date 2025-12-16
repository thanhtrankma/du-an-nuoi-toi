import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard = ({ totalBalance, goal = 1000000 }) => {
  const { t } = useLanguage();
  const [displayBalance, setDisplayBalance] = useState(0);

  useEffect(() => {
    const duration = 1000;
    let startTimestamp = null;
    const startValue = displayBalance;
    const endValue = totalBalance;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (endValue - startValue) + startValue);
      setDisplayBalance(value);
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    
    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [totalBalance]);

  const formatMoney = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const percentage = Math.min((totalBalance / goal) * 100, 100).toFixed(1);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-green-100 relative overflow-hidden hover-card group">
        <div className="absolute -right-6 -top-6 bg-green-50 w-24 h-24 rounded-full group-hover:scale-150 transition duration-500"></div>
        <div className="relative z-10">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">
            {t('stat_balance')}
          </p>
          <h3 className="text-4xl font-extrabold text-green-600 mt-2 transition-all duration-300">
            {formatMoney(displayBalance)}
          </h3>
          <p className="text-xs text-gray-400 font-semibold mt-1">
            VND ({t('stat_realtime')})
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg border border-yellow-100 md:col-span-2 hover-card relative overflow-hidden">
        <div className="flex justify-between items-end mb-4 relative z-10">
          <div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">
              {t('stat_goal')}
            </p>
            <h3 className="text-3xl font-extrabold text-gray-800 mt-1 flex items-baseline gap-2">
              1.000.000 <span className="text-sm text-gray-400">VND</span>
            </h3>
          </div>
          <span className="text-yellow-700 font-bold bg-yellow-100 px-3 py-1 rounded-full text-sm shadow-sm">
            {percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner relative z-10">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          >
            <div className="w-full h-full opacity-30 bg-[length:10px_10px] bg-[linear-gradient(45deg,rgba(255,255,255,.15)25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)50%,rgba(255,255,255,.15)75%,transparent_75%,transparent)] animate-[pulse_1s_linear_infinite]"></div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2 italic text-right relative z-10">
          {t('stat_cheer')}
        </p>
      </div>
    </section>
  );
};

export default Dashboard;

