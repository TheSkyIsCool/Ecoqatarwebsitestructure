import { motion } from 'motion/react';
import { MapPin, Trash2, CheckCircle, XCircle, Lightbulb, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function RecyclingPage() {
  const recyclingLocations = [
    {
      name: 'Al Wakrah Recycling Center',
      address: 'Al Wakrah Main Street, near Al Wakrah Souq',
      types: ['Plastic', 'Paper', 'Metal', 'Glass'],
      hours: '7:00 AM - 9:00 PM',
    },
    {
      name: 'Doha Central Collection Point',
      address: 'Salwa Road, Industrial Area',
      types: ['Plastic', 'Paper', 'Metal', 'Glass', 'Electronics'],
      hours: '24/7',
    },
    {
      name: 'West Bay Eco Station',
      address: 'West Bay, near City Center Mall',
      types: ['Plastic', 'Paper', 'Cardboard'],
      hours: '8:00 AM - 8:00 PM',
    },
    {
      name: 'The Pearl Recycling Hub',
      address: 'The Pearl-Qatar, Porto Arabia',
      types: ['Plastic', 'Paper', 'Glass', 'Batteries'],
      hours: '9:00 AM - 6:00 PM',
    },
  ];

  const wasteTypes = [
    {
      name: 'Plastic',
      color: 'bg-blue-500',
      examples: ['Bottles', 'Containers', 'Bags', 'Packaging'],
      icon: '♻️',
    },
    {
      name: 'Paper',
      color: 'bg-amber-500',
      examples: ['Newspapers', 'Magazines', 'Cardboard', 'Office paper'],
      icon: '📄',
    },
    {
      name: 'Glass',
      color: 'bg-green-500',
      examples: ['Bottles', 'Jars', 'Containers'],
      icon: '🫙',
    },
    {
      name: 'Metal',
      color: 'bg-gray-500',
      examples: ['Cans', 'Foil', 'Tins'],
      icon: '🥫',
    },
    {
      name: 'Electronics',
      color: 'bg-purple-500',
      examples: ['Phones', 'Computers', 'Batteries', 'Cables'],
      icon: '📱',
    },
    {
      name: 'Organic',
      color: 'bg-emerald-500',
      examples: ['Food waste', 'Garden waste', 'Compostables'],
      icon: '🍃',
    },
  ];

  const dos = [
    'Rinse containers before recycling',
    'Flatten cardboard boxes to save space',
    'Remove caps and lids from bottles',
    'Keep recyclables clean and dry',
    'Separate different materials',
    'Check local guidelines for accepted items',
  ];

  const donts = [
    'Don\'t recycle contaminated items',
    'Don\'t bag recyclables unless required',
    'Don\'t include food-soiled paper',
    'Don\'t mix hazardous waste with recyclables',
    'Don\'t recycle broken glass in regular bins',
    'Don\'t include plastic bags in curbside recycling',
  ];

  const ecoTips = [
    {
      title: 'Reduce First',
      tip: 'The best way to reduce waste is to not create it in the first place. Choose reusable items over disposables.',
      icon: Leaf,
      color: 'from-green-400 to-green-500',
    },
    {
      title: 'Reuse Items',
      tip: 'Get creative with reusing items. Glass jars can become storage containers, old clothes can be repurposed.',
      icon: Lightbulb,
      color: 'from-yellow-400 to-yellow-500',
    },
    {
      title: 'Compost Organic Waste',
      tip: 'Start composting kitchen scraps and yard waste. It reduces landfill waste and creates nutrient-rich soil.',
      icon: Leaf,
      color: 'from-emerald-400 to-emerald-500',
    },
    {
      title: 'Buy Recycled Products',
      tip: 'Support the recycling industry by purchasing products made from recycled materials.',
      icon: CheckCircle,
      color: 'from-blue-400 to-blue-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-green-800">Recycling in Qatar</h1>
        </div>
        <p className="text-green-600">
          Find recycling locations, learn about waste types, and discover how to reduce your environmental impact.
        </p>
      </motion.div>

      <Tabs defaultValue="locations" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-green-50">
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="types">Waste Types</TabsTrigger>
          <TabsTrigger value="guidelines">Do's & Don'ts</TabsTrigger>
          <TabsTrigger value="tips">Eco Tips</TabsTrigger>
        </TabsList>

        {/* Recycling Locations */}
        <TabsContent value="locations" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-green-800 mb-4">Recycling Centers Near You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recyclingLocations.map((location, index) => (
                <motion.div
                  key={location.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-green-100 shadow-md hover:shadow-lg transition-all h-full">
                    <CardHeader>
                      <CardTitle className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-green-800">{location.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-green-600">{location.address}</p>
                      <div>
                        <p className="text-green-700 mb-2">Accepts:</p>
                        <div className="flex flex-wrap gap-2">
                          {location.types.map((type) => (
                            <Badge key={type} className="bg-green-100 text-green-700 hover:bg-green-200">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-green-500">
                        <span className="text-green-700">Hours:</span> {location.hours}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Waste Types */}
        <TabsContent value="types" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-green-800 mb-4">Types of Recyclable Waste</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wasteTypes.map((type, index) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="border-green-100 shadow-md hover:shadow-lg transition-all h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center text-2xl`}>
                          {type.icon}
                        </div>
                        <h3 className="text-green-800">{type.name}</h3>
                      </div>
                      <p className="text-green-600 mb-2">Examples:</p>
                      <ul className="space-y-1">
                        {type.examples.map((example) => (
                          <li key={example} className="text-green-500 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Do's and Don'ts */}
        <TabsContent value="guidelines" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Do's */}
              <Card className="border-green-200 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Do's
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {dos.map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3 text-green-600"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Don'ts */}
              <Card className="border-red-200 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <XCircle className="w-5 h-5 text-red-500" />
                    Don'ts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {donts.map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3 text-red-600"
                      >
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>

        {/* Eco Tips */}
        <TabsContent value="tips" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-green-800 mb-4">Sustainable Living Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ecoTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="border-green-100 shadow-md hover:shadow-lg transition-all h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-green-800 mb-2">{tip.title}</h3>
                            <p className="text-green-600">{tip.tip}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
