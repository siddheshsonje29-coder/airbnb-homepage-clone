import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { AppRoutes } from './routes/AppRoutes';
import { useThemeStore } from './store/useThemeStore';
import { AuthModal } from './components/AuthModal/AuthModal';

function App() {
  const { theme, setTheme } = useThemeStore();

  // Initialize theme class list on boot
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
        <Navbar />
        <div className="flex-grow">
          <AppRoutes />
        </div>
        <Footer />
        <AuthModal />
      </div>
    </BrowserRouter>
  );
}

export default App;
