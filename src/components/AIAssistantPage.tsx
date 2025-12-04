import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, Loader2, Sparkles, Calendar, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your EcoQatar AI Assistant. I can help you with eco-friendly tips, create a weekly eco plan, or analyze your carbon footprint. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    {
      label: 'Eco Weekly Plan',
      icon: Calendar,
      prompt: 'Generate a personalized eco-friendly weekly plan for me',
    },
    {
      label: 'Carbon Footprint',
      icon: BarChart3,
      prompt: 'Help me calculate and understand my carbon footprint',
    },
    {
      label: 'Eco Tips',
      icon: Sparkles,
      prompt: 'Give me some practical eco-friendly tips for daily life in Qatar',
    },
  ];

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Eco Weekly Plan
    if (lowerMessage.includes('weekly plan') || lowerMessage.includes('week')) {
      return `🌿 **Your Personalized Eco Weekly Plan**

**Monday - Reduce Day**
• Bring reusable bags for shopping
• Use a refillable water bottle
• Turn off lights when leaving rooms

**Tuesday - Reuse Day**
• Repurpose glass jars for storage
• Donate unused clothes
• Use cloth napkins instead of paper

**Wednesday - Recycle Day**
• Sort recyclables properly
• Visit recycling center for electronics
• Clean and organize recycling bins

**Thursday - Energy Day**
• Unplug unused electronics
• Use natural light during daytime
• Set AC to 24°C for efficiency

**Friday - Green Transport**
• Use public transport or carpool
• Walk or bike for short distances
• Plan efficient routes to reduce driving

**Saturday - Water Conservation**
• Fix any leaky faucets
• Take shorter showers
• Water plants in the evening

**Sunday - Community Day**
• Join a beach cleanup event
• Share eco tips with family
• Plan next week's sustainable meals

Remember: Small daily actions create big environmental impact! 🌍`;
    }

    // Carbon Footprint
    if (lowerMessage.includes('carbon') || lowerMessage.includes('footprint')) {
      return `📊 **Carbon Footprint Analysis**

Let me help you understand your carbon footprint:

**Major Contributors:**
1. **Transportation** (30-40%)
   • Car usage: ~4.6 tons CO2/year
   • Flights: Varies by distance
   • Tip: Carpool or use public transport

2. **Home Energy** (25-35%)
   • Electricity: ~2-3 tons CO2/year
   • AC usage in Qatar: High impact
   • Tip: Use energy-efficient appliances

3. **Food** (15-20%)
   • Meat consumption: Higher impact
   • Imported foods: Extra emissions
   • Tip: Buy local, eat more plant-based

4. **Consumption** (15-20%)
   • Shopping habits
   • Single-use items
   • Tip: Buy quality over quantity

**Your Action Plan:**
✓ Switch to LED bulbs (-200kg CO2/year)
✓ Reduce meat by 50% (-300kg CO2/year)
✓ Recycle regularly (-100kg CO2/year)
✓ Use public transport 2x/week (-500kg CO2/year)

**Potential Savings: ~1.1 tons CO2/year** 🌱`;
    }

    // Eco Tips
    if (lowerMessage.includes('tips') || lowerMessage.includes('advice')) {
      return `💡 **Practical Eco Tips for Qatar**

**At Home:**
• Set AC between 23-24°C (saves 5-10% energy)
• Use energy-efficient LED bulbs
• Install water-saving faucets
• Create a small indoor herb garden

**Shopping:**
• Bring reusable bags to souqs and malls
• Choose products with minimal packaging
• Support local farmers and markets
• Buy in bulk to reduce packaging waste

**Transportation:**
• Use the Doha Metro when possible
• Carpool with colleagues
• Combine errands into one trip
• Maintain your car for better fuel efficiency

**Water Conservation:**
• Water plants early morning or evening
• Fix leaks immediately
• Use a broom instead of hose for cleaning
• Collect AC condensation for plants

**Community:**
• Join Qatar Sustainability Week events
• Participate in beach cleanups
• Share eco knowledge with friends
• Support businesses with green practices

Every action counts! 🌍💚`;
    }

    // Default response
    return `I'm here to help with eco-friendly advice! I can:

• 📅 Create a personalized weekly eco plan
• 📊 Help analyze your carbon footprint
• 💡 Share practical sustainability tips for Qatar
• ♻️ Advise on recycling and waste reduction
• 🌱 Suggest ways to reduce energy consumption

What would you like to know more about?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateResponse(input),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
    // Auto-send after a brief moment
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-green-800">AI Eco Assistant</h1>
        </div>
        <p className="text-green-600">
          Get personalized eco-friendly advice, weekly plans, and carbon footprint analysis.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 border-green-200 hover:border-green-400 hover:bg-green-50"
                  onClick={() => handleQuickAction(action.prompt)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className="w-6 h-6 text-green-600" />
                    <span className="text-green-800">{action.label}</span>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-green-100 shadow-lg">
          <CardHeader className="border-b border-green-100">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Bot className="w-5 h-5 text-green-500" />
              Chat with AI
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <ScrollArea className="h-[400px] p-6">
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-green-500 text-white'
                            : 'bg-green-50 text-green-800 border border-green-100'
                        }`}
                      >
                        {message.type === 'assistant' && (
                          <Bot className="w-4 h-4 inline-block mr-2 text-green-500" />
                        )}
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-green-50 border border-green-100 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-green-500 animate-spin" />
                        <span className="text-green-600">AI is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-green-100 p-4">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask me about eco tips, weekly plans, or carbon footprint..."
                  className="resize-none border-green-200 focus:border-green-400"
                  rows={3}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-green-500 hover:bg-green-600 text-white self-end"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
