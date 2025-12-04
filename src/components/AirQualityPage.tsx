import { motion } from 'motion/react';
import { Wind, AlertTriangle, Heart, Activity, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Badge } from './ui/badge';

export default function AirQualityPage() {
  // Mock AQI data for the chart
  const aqiData = [
    { time: '00:00', aqi: 75 },
    { time: '04:00', aqi: 68 },
    { time: '08:00', aqi: 95 },
    { time: '12:00', aqi: 110 },
    { time: '16:00', aqi: 118 },
    { time: '20:00', aqi: 105 },
    { time: '24:00', aqi: 88 },
  ];

  const aqiLevels = [
    { range: '0-50', level: 'Good', color: 'bg-green-500', textColor: 'text-green-700', description: 'Air quality is satisfactory' },
    { range: '51-100', level: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-700', description: 'Acceptable for most people' },
    { range: '101-150', level: 'Unhealthy for Sensitive', color: 'bg-orange-500', textColor: 'text-orange-700', description: 'Sensitive groups may experience effects' },
    { range: '151-200', level: 'Unhealthy', color: 'bg-red-500', textColor: 'text-red-700', description: 'Everyone may experience effects' },
    { range: '201-300', level: 'Very Unhealthy', color: 'bg-purple-500', textColor: 'text-purple-700', description: 'Health alert: everyone may experience serious effects' },
    { range: '301+', level: 'Hazardous', color: 'bg-red-900', textColor: 'text-red-900', description: 'Health warning of emergency conditions' },
  ];

  const healthPrecautions = [
    {
      icon: Heart,
      title: 'General Population',
      advice: 'Air quality is acceptable. Most people can enjoy normal outdoor activities.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Activity,
      title: 'Active People',
      advice: 'Moderate air quality. Consider reducing intense outdoor activities during midday hours.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: AlertTriangle,
      title: 'Sensitive Groups',
      advice: 'People with asthma or heart conditions should limit prolonged outdoor exertion, especially during peak pollution hours.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Eye,
      title: 'Monitor Symptoms',
      advice: 'Watch for coughing, shortness of breath, or eye irritation. Move indoors if symptoms occur.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const currentAQI = 95;
  const currentLevel = currentAQI <= 50 ? 'Good' : currentAQI <= 100 ? 'Moderate' : 'Unhealthy for Sensitive';
  const currentColor = currentAQI <= 50 ? 'green' : currentAQI <= 100 ? 'yellow' : 'orange';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
            <Wind className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-green-800">Air Quality Monitor</h1>
        </div>
        <p className="text-green-600">
          Real-time air quality data for Doha, Qatar. Stay informed about the air you breathe.
        </p>
      </motion.div>

      {/* Current AQI Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className={`border-${currentColor}-200 bg-gradient-to-br from-${currentColor}-50 to-white shadow-lg`}>
          <CardContent className="p-8">
            <div className="text-center">
              <p className="text-green-600 mb-2">Current Air Quality Index</p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className={`text-${currentColor}-600 mb-2 inline-block`}
              >
                {currentAQI}
              </motion.div>
              <Badge className={`bg-${currentColor}-500 text-white text-lg px-4 py-1`}>
                {currentLevel}
              </Badge>
              <p className="text-green-600 mt-4">Last updated: Just now</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AQI Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="border-green-100 shadow-md">
          <CardHeader>
            <CardTitle className="text-green-800">24-Hour AQI Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={aqiData}>
                  <defs>
                    <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                  <XAxis dataKey="time" stroke="#059669" />
                  <YAxis stroke="#059669" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #d1fae5',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="aqi" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fill="url(#colorAqi)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AQI Color-Coded Index */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-green-800 mb-4">AQI Index Guide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aqiLevels.map((level, index) => (
            <motion.div
              key={level.range}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="border-green-100 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded-full ${level.color} flex-shrink-0 mt-1`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className={level.textColor}>{level.level}</span>
                        <span className="text-green-600">{level.range}</span>
                      </div>
                      <p className="text-green-500">{level.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Health Precautions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-green-800 mb-4">Health Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {healthPrecautions.map((precaution, index) => {
            const Icon = precaution.icon;
            return (
              <motion.div
                key={precaution.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-green-100 shadow-md hover:shadow-lg transition-all h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${precaution.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${precaution.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-green-800 mb-2">{precaution.title}</h3>
                        <p className="text-green-600">{precaution.advice}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}