import { motion } from 'motion/react';
import { Thermometer, Wind, Droplets, Bot, TrendingDown, Leaf, Award, Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

type Page = 'home' | 'air-quality' | 'recycling' | 'ai-assistant' | 'eco-score';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const stats = [
    { 
      label: 'Temperature', 
      value: '22°C', 
      icon: Thermometer, 
      color: 'from-orange-400 to-orange-500',
      description: 'Pleasant winter weather'
    },
    { 
      label: 'Air Quality Index', 
      value: '95', 
      icon: Wind, 
      color: 'from-yellow-400 to-yellow-500',
      description: 'Moderate'
    },
    { 
      label: 'Pollution Level', 
      value: 'Moderate', 
      icon: Droplets, 
      color: 'from-yellow-400 to-yellow-500',
      description: 'Acceptable for most'
    },
  ];

  const features = [
    {
      title: 'Air Quality Monitor',
      description: 'Track real-time air quality and get health recommendations',
      icon: Wind,
      color: 'bg-blue-50 text-blue-600',
      page: 'air-quality' as Page,
    },
    {
      title: 'Recycling Guide',
      description: 'Find recycling locations and learn proper waste sorting',
      icon: Leaf,
      color: 'bg-green-50 text-green-600',
      page: 'recycling' as Page,
    },
    {
      title: 'AI Eco Assistant',
      description: 'Get personalized eco tips and carbon footprint analysis',
      icon: Bot,
      color: 'bg-purple-50 text-purple-600',
      page: 'ai-assistant' as Page,
    },
    {
      title: 'Eco Score Quiz',
      description: 'Take a quiz and discover your environmental impact score',
      icon: Award,
      color: 'bg-amber-50 text-amber-600',
      page: 'eco-score' as Page,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Leaf className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
        </motion.div>
        
        <h1 className="text-green-800 mb-4">
          EcoQatar – For a Greener Future 🇶🇦
        </h1>
        
        <p className="text-green-600 max-w-2xl mx-auto mb-8">
          Join Qatar's journey towards sustainability. Monitor air quality, discover recycling locations, 
          and get personalized eco tips powered by AI.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => onNavigate('ai-assistant')}
            className="bg-green-500 hover:bg-green-600 text-white gap-2"
            size="lg"
          >
            <Bot className="w-5 h-5" />
            Talk to AI Assistant
          </Button>
          <Button
            onClick={() => onNavigate('eco-score')}
            variant="outline"
            className="border-green-500 text-green-700 hover:bg-green-50 gap-2"
            size="lg"
          >
            <Award className="w-5 h-5" />
            Take Eco Quiz
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="border-green-100 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-green-600 mb-1">{stat.label}</p>
                      <p className="text-green-900 mb-1">{stat.value}</p>
                      <p className="text-green-500">{stat.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-green-800 mb-6 text-center">Explore Our Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
              >
                <Card 
                  className="border-green-100 hover:border-green-300 transition-all cursor-pointer h-full shadow-md hover:shadow-xl"
                  onClick={() => onNavigate(feature.page)}
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-green-800 mb-2">{feature.title}</h3>
                    <p className="text-green-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Contact Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-800 text-center">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-green-700 mb-1">Phone</p>
                  <a 
                    href="tel:+97444445555" 
                    className="text-green-600 hover:text-green-800 transition-colors"
                  >
                    +974 4444 5555
                  </a>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-green-700 mb-1">Email</p>
                  <a 
                    href="mailto:sample@dpsmisdoha.com" 
                    className="text-green-600 hover:text-green-800 transition-colors break-all"
                  >
                    sample@dpsmisdoha.com
                  </a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-green-700 mb-1">Location</p>
                  <p className="text-green-600">
                    DPS Modern Indian School, Al Wakrah
                  </p>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}