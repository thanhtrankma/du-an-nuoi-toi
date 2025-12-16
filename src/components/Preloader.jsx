import { useEffect, useState } from 'react';

const Preloader = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader" className={hidden ? 'hidden-loader' : ''}>
      <div className="flex flex-col items-center justify-center gap-6">
        <i className="fa-solid fa-seedling text-6xl text-green-500 animate-bounce"></i>
        <div className="w-8 h-8 border-4 border-green-100 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Preloader;

