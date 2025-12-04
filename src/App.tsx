import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Wind, Recycle, Bot, Award, Menu, X } from 'lucide-react';
import HomePage from './components/HomePage';
import AirQualityPage from './components/AirQualityPage';
import RecyclingPage from './components/RecyclingPage';
import AIAssistantPage from './components/AIAssistantPage';
import EcoScorePage from './components/EcoScorePage';

type Page = 'home' | 'air-quality' | 'recycling' | 'ai-assistant' | 'eco-score';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'air-quality' as Page, label: 'Air Quality', icon: Wind },
    { id: 'recycling' as Page, label: 'Recycling', icon: Recycle },
    { id: 'ai-assistant' as Page, label: 'AI Assistant', icon: Bot },
    { id: 'eco-score' as Page, label: 'Eco Score', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-800">EcoQatar</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      currentPage === item.id
                        ? 'bg-green-500 text-white'
                        : 'text-green-700 hover:bg-green-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-green-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-green-100 bg-white"
            >
              <div className="px-4 py-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                        currentPage === item.id
                          ? 'bg-green-500 text-white'
                          : 'text-green-700 hover:bg-green-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
          {currentPage === 'air-quality' && <AirQualityPage />}
          {currentPage === 'recycling' && <RecyclingPage />}
          {currentPage === 'ai-assistant' && <AIAssistantPage />}
          {currentPage === 'eco-score' && <EcoScorePage />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
