import { useState, useEffect, useCallback } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import SpendingPlan from './components/SpendingPlan';
import History from './components/History';
import Donate from './components/Donate';
import Footer from './components/Footer';
import MessengerPopup from './components/MessengerPopup';
import { initialTransactions, processTime, calculateTotal } from './utils/transactions';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const processed = initialTransactions.map(processTime);
    processed.sort((a, b) => b.dateObj - a.dateObj);
    return processed;
  });
  const [totalBalance, setTotalBalance] = useState(() => {
    const processed = initialTransactions.map(processTime);
    return calculateTotal(processed);
  });
  const [currentPopup, setCurrentPopup] = useState(null);
  const [loading, setLoading] = useState(true);

  const addNewTransaction = useCallback((name, amount, msg, type) => {
    const newItem = {
      name,
      amount,
      msg,
      type,
      dateObj: new Date(),
      isDynamic: true
    };

    setTransactions((prev) => {
      const updated = [newItem, ...prev];
      setTotalBalance(calculateTotal(updated));
      return updated;
    });

    setCurrentPopup(newItem);
  }, []);

  useEffect(() => {

    // Hide preloader after delay
    const preloaderTimer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    // Auto-add transactions
    const timer1 = setTimeout(() => {
      addNewTransaction('TRAN THI BICH NGOC (Ban cu cap 3)', 20000, 'Cho mua milo', 'receive');
    }, 15000);

    const timer2 = setTimeout(() => {
      addNewTransaction('VIETTEL TELECOM (Nap tien DT)', 50000, 'Gia han goi 4G thang', 'spend');
    }, 45000);

    return () => {
      clearTimeout(preloaderTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [addNewTransaction]);

  return (
    <LanguageProvider>
      {loading && <Preloader />}
      <div className="text-gray-800 relative bg-gradient-to-b from-green-50 to-white min-h-screen">
        <Header />
        <main className="relative z-10 pt-24 pb-10 container mx-auto px-4 max-w-4xl">
          <Hero />
          <Dashboard totalBalance={totalBalance} />
          <SpendingPlan />
          <History transactions={transactions} />
          <Donate />
        </main>
        <Footer />
        <MessengerPopup transaction={currentPopup} />
      </div>
    </LanguageProvider>
  );
}

export default App;
