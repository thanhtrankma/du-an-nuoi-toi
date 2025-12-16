import { useLanguage } from '../contexts/LanguageContext';

const SpendingPlan = () => {
  const { t } = useLanguage();

  const plans = [
    {
      icon: 'fa-graduation-cap',
      color: 'blue',
      label: t('plan_1'),
      percentage: 50,
      desc: t('plan_1_desc')
    },
    {
      icon: 'fa-mug-hot',
      color: 'green',
      label: t('plan_2'),
      percentage: 30
    },
    {
      icon: 'fa-cookie-bite',
      color: 'orange',
      label: t('plan_3'),
      percentage: 20
    }
  ];

  return (
    <section className="bg-white p-8 rounded-3xl shadow-xl mb-12 border border-gray-100 hover-card">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-800">
        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
          <i className="fa-solid fa-chart-pie"></i>
        </div>
        <span>{t('plan_title')}</span>
      </h2>

      <div className="space-y-6">
        {plans.map((plan, index) => {
          const colorClasses = {
            blue: {
              icon: 'text-blue-500',
              badge: 'text-blue-600 bg-blue-50',
              bar: 'bg-blue-500 group-hover:bg-blue-600'
            },
            green: {
              icon: 'text-green-500',
              badge: 'text-green-600 bg-green-50',
              bar: 'bg-green-500 group-hover:bg-green-600'
            },
            orange: {
              icon: 'text-orange-500',
              badge: 'text-orange-600 bg-orange-50',
              bar: 'bg-orange-400 group-hover:bg-orange-500'
            }
          };
          const colors = colorClasses[plan.color] || colorClasses.blue;

          return (
            <div key={index} className="group">
              <div className="flex justify-between mb-2 text-sm font-bold">
                <span className="flex items-center gap-2">
                  <i className={`fa-solid ${plan.icon} ${colors.icon}`}></i>
                  <span>{plan.label}</span>
                </span>
                <span className={`${colors.badge} px-2 rounded`}>
                  {plan.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`${colors.bar} h-3 rounded-full transition-all duration-1000`}
                  style={{ width: `${plan.percentage}%` }}
                ></div>
              </div>
              {plan.desc && (
                <p className="text-xs text-gray-400 mt-1 ml-6">{plan.desc}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SpendingPlan;

