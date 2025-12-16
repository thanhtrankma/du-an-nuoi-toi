import { useLanguage } from '../contexts/LanguageContext';

const History = ({ transactions }) => {
  const { t } = useLanguage();

  const formatMoney = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const formatTime = (dateObj, isDynamic) => {
    const txtNow = t('just_now');
    const txtToday = t('today');
    const txtYest = t('yesterday');

    const h = dateObj.getHours().toString().padStart(2, '0');
    const m = dateObj.getMinutes().toString().padStart(2, '0');
    const d = dateObj.getDate().toString().padStart(2, '0');
    const mo = (dateObj.getMonth() + 1).toString().padStart(2, '0');

    const now = new Date();
    const diffTime = Math.abs(now - dateObj);

    if (isDynamic && diffTime < 60000) {
      return (
        <>
          {h}:{m} <br />
          <span className="text-xs text-green-600 font-bold">{txtNow}</span>
        </>
      );
    }

    let dayLabel = '';
    if (now.getDate() === dateObj.getDate()) {
      dayLabel = <span className="text-green-600 font-bold">{txtToday}</span>;
    } else if (now.getDate() - dateObj.getDate() === 1) {
      dayLabel = txtYest;
    } else {
      dayLabel = `${d}/${mo}`;
    }

    return (
      <>
        {h}:{m} <br />
        <span className="text-xs text-gray-400">{dayLabel}</span>
      </>
    );
  };

  const formatName = (name) => {
    if (name.includes('(')) {
      const parts = name.split('(');
      return (
        <>
          <span className="font-bold text-gray-800">{parts[0]}</span>
          <br />
          <span className="text-xs text-gray-500 font-normal italic">
            ({parts[1]}
          </span>
        </>
      );
    }
    return <span className="font-bold text-gray-800">{name}</span>;
  };

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 flex items-center gap-2">
          <i className="fa-solid fa-file-invoice-dollar text-green-600"></i>
          <span>{t('history_title')}</span>
        </h2>
        <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full shadow-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-bold text-green-700">Live</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="p-4 border-b">{t('table_time')}</th>
                <th className="p-4 border-b">{t('table_user')}</th>
                <th className="p-4 border-b text-right">{t('table_amount')}</th>
                <th className="p-4 border-b">{t('table_content')}</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {transactions.map((item, index) => {
                const isSpend = item.type === 'spend';
                const amountColor = isSpend ? 'text-red-500' : 'text-green-600';
                const amountSign = isSpend ? '-' : '+';
                const isNew = item.isDynamic && new Date().getTime() - item.dateObj.getTime() < 10000;
                const rowClass = isNew
                  ? 'new-row-highlight'
                  : isSpend
                  ? 'hover:bg-red-50/50'
                  : 'hover:bg-green-50/50';

                return (
                  <tr
                    key={index}
                    className={`${rowClass} transition border-b border-gray-50 last:border-0 group`}
                  >
                    <td className="p-4 text-gray-500 font-mono text-sm leading-tight whitespace-nowrap align-top">
                      {formatTime(item.dateObj, item.isDynamic)}
                    </td>
                    <td className="p-4 text-sm md:text-base uppercase tracking-tight align-top">
                      {formatName(item.name)}
                    </td>
                    <td className={`p-4 text-right font-bold ${amountColor} align-top`}>
                      {amountSign} {formatMoney(item.amount)}
                    </td>
                    <td className="p-4 italic text-gray-400 text-sm group-hover:text-gray-600 align-top">
                      &quot;{item.msg}&quot;
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default History;

