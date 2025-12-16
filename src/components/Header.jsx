import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { currentLang, changeLanguage, t, langConfig } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setDropdownOpen(false);
  };

  const languages = [
    { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'zh', flag: '🇨🇳', name: '中文 (Trung)' },
    { code: 'jp', flag: '🇯🇵', name: '日本語 (Nhật)' },
    { code: 'kr', flag: '🇰🇷', name: '한국어 (Hàn)' },
    { code: 'fr', flag: '🇫🇷', name: 'Français (Pháp)' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский (Nga)' },
    { code: 'th', flag: '🇹🇭', name: 'ไทย (Thái)' }
  ];

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-green-100 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#" className="text-xl md:text-2xl font-extrabold text-green-600 flex items-center gap-2 hover:scale-105 transition">
          <i className="fa-solid fa-seedling animate-bounce"></i>
          <span>{t('brand_name')}</span>
        </a>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded-full transition shadow-sm hover:shadow-md"
          >
            <span className="text-xl">{langConfig[currentLang].flag}</span>
            <span className="hidden md:inline">{langConfig[currentLang].name}</span>
            <i className="fa-solid fa-chevron-down text-xs text-gray-400"></i>
          </button>

          <div className={`lang-dropdown ${dropdownOpen ? 'active' : ''}`}>
            {languages.map((lang) => (
              <div
                key={lang.code}
                className="lang-item"
                onClick={() => handleLanguageChange(lang.code)}
              >
                <span className="text-xl">{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

