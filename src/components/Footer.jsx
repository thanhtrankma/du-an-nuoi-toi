import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white/50 backdrop-blur border-t border-gray-100 text-gray-400 py-8 text-center text-sm relative z-10">
      <p className="container mx-auto px-4 max-w-2xl">
        <strong>⚠️ {t('disclaimer_title')}</strong> {t('disclaimer_text')}
      </p>
      <div className="pt-4 mt-4 text-xs text-gray-300">
        &copy; 2025 {t('footer_project')}
      </div>
    </footer>
  );
};

export default Footer;

