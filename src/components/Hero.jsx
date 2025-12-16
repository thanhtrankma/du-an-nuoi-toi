import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="text-center py-8 space-y-4">
      <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-xs md:text-sm font-bold mb-2 shadow-sm animate-pulse">
        <span>{t('hero_tag')}</span>
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
        <span>{t('hero_title_1')}</span>{' '}
        <span className="shimmer">{t('hero_title_highlight')}</span>.<br />
        <span className="text-xl md:text-3xl text-gray-500 font-bold mt-2 block">
          {t('hero_subtitle')}
        </span>
      </h1>
      <p className="text-gray-500 text-lg max-w-2xl mx-auto italic">
        &quot;{t('hero_quote')}&quot;
      </p>
    </section>
  );
};

export default Hero;

