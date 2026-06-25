import React, { useState } from 'react';
import { Sparkles, Send, User, ChevronRight, Compass } from 'lucide-react';
import { mockProperties, mockDestinations } from '../../data/mockData';
import type { Property, Destination } from '../../data/mockData';
import { Link } from 'react-router-dom';


interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendations?: {
    properties: Property[];
    destinations: Destination[];
    budgetEstimate?: string;
  };
}

export const AITravelAssistant: React.FC = () => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I am your Airbnb AI Travel Assistant. Tell me what kind of trip you want and your budget (e.g., 'I want a beachfront cabin under ₹20,000' or 'Show me luxury views below ₹40,000')."
    }
  ]);

  const processQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // 1. Detect Category
    let category = "";
    if (lowerQuery.includes("beach") || lowerQuery.includes("ocean") || lowerQuery.includes("sea")) {
      category = "Beach";
    } else if (lowerQuery.includes("cabin") || lowerQuery.includes("wood") || lowerQuery.includes("forest")) {
      category = "Cabins";
    } else if (lowerQuery.includes("mountain") || lowerQuery.includes("snow") || lowerQuery.includes("alp")) {
      category = "Mountains";
    } else if (lowerQuery.includes("camp") || lowerQuery.includes("glamp") || lowerQuery.includes("outdoor")) {
      category = "Camping";
    } else if (lowerQuery.includes("view") || lowerQuery.includes("dome") || lowerQuery.includes("scenic")) {
      category = "Amazing Views";
    } else if (lowerQuery.includes("trend") || lowerQuery.includes("popular")) {
      category = "Trending";
    } else if (lowerQuery.includes("island") || lowerQuery.includes("tropical")) {
      category = "Islands";
    } else if (lowerQuery.includes("farm") || lowerQuery.includes("vineyard") || lowerQuery.includes("countryside")) {
      category = "Farms";
    } else if (lowerQuery.includes("treehouse") || lowerQuery.includes("bamboo")) {
      category = "Treehouses";
    } else if (lowerQuery.includes("luxury") || lowerQuery.includes("estate") || lowerQuery.includes("exclusive")) {
      category = "Luxury";
    }

    // 2. Parse Budget (look for numbers)
    let maxBudget = Infinity;
    const rupeeMatch = lowerQuery.match(/(?:₹|rs\.?|inr)?\s*(\d{1,3}(?:,\d{3})*|\d+)/);
    const genericNumberMatches = lowerQuery.match(/\b\d{4,6}\b/g); // Find 4-6 digit numbers
    
    if (rupeeMatch && rupeeMatch[1]) {
      const val = parseInt(rupeeMatch[1].replace(/,/g, ''));
      if (val > 1000) maxBudget = val;
    } else if (genericNumberMatches && genericNumberMatches.length > 0) {
      maxBudget = parseInt(genericNumberMatches[0]);
    }

    // Filter properties
    let matchedProps = mockProperties;
    if (category) {
      matchedProps = matchedProps.filter(p => p.category === category);
    }
    matchedProps = matchedProps.filter(p => p.pricePerNight <= maxBudget);
    
    // Sort by rating desc
    matchedProps = matchedProps.sort((a, b) => b.rating - a.rating).slice(0, 3);

    // Filter destinations
    let matchedDests = mockDestinations;
    if (category) {
      matchedDests = matchedDests.filter(d => d.popularCategory === category);
    }
    matchedDests = matchedDests.slice(0, 2);

    // Formulate response
    let responseText = "";
    if (matchedProps.length === 0) {
      responseText = `I analyzed our available listings for your request. I couldn't find any stays that fit all criteria${category ? ` in the '${category}' category` : ''} under ₹${maxBudget.toLocaleString()}. \n\nHowever, you can try raising your budget limit or broadening your category preferences! Here are a few popular stays:`;
      matchedProps = mockProperties.slice(0, 2);
    } else {
      responseText = `I found ${matchedProps.length} spectacular stays that match your criteria! \n\nI recommend visiting ${matchedDests.map(d => `${d.name} (${d.country})`).join(' or ')} because it has perfect weather and matches your trip theme perfectly.`;
    }

    // Budget math
    let budgetEstimateText = "";
    if (matchedProps.length > 0) {
      const avgPrice = matchedProps[0].pricePerNight;
      const stayCost3N = avgPrice * 3;
      const extras = Math.round(stayCost3N * 0.4);
      budgetEstimateText = `Estimated 3-night stay costs: Stay: ₹${stayCost3N.toLocaleString()} + Food/Activities: ₹${extras.toLocaleString()} ≈ ₹${(stayCost3N + extras).toLocaleString()}`;
    }

    return {
      text: responseText,
      recommendations: {
        properties: matchedProps,
        destinations: matchedDests,
        budgetEstimate: budgetEstimateText
      }
    };
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const result = processQuery(userText);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: result.text,
        recommendations: result.recommendations
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const setPreset = (txt: string) => {
    setInput(txt);
  };

  return (
    <div className="flex flex-col h-[600px] border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden shadow-lg transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-rose-500 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 animate-pulse" />
          <span className="font-bold tracking-tight">Airbnb AI Assistant</span>
        </div>
        <span className="text-[10px] uppercase font-extrabold tracking-wider bg-white/20 px-2 py-0.5 rounded">
          Mock AI Model
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            
            {msg.sender === 'ai' && (
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-primary/20 flex items-center justify-center text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
            )}

            <div className="max-w-[85%] sm:max-w-[75%] space-y-3">
              {/* Message Bubble */}
              <div className={`p-4.5 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none border border-zinc-150 dark:border-zinc-750'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>

              {/* Recommendations Cards */}
              {msg.recommendations && (
                <div className="space-y-3">
                  {/* Destinations list */}
                  {msg.recommendations.destinations.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {msg.recommendations.destinations.map(d => (
                        <div key={d.id} className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 dark:bg-zinc-800/40 dark:border-zinc-700 px-3 py-1.5 rounded-full text-xs text-zinc-600 dark:text-zinc-350">
                          <Compass className="h-3.5 w-3.5 text-primary" />
                          <span>{d.name}, {d.country}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Properties Carousel list */}
                  {msg.recommendations.properties.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {msg.recommendations.properties.map(p => (
                        <Link 
                          key={p.id} 
                          to={`/property/${p.id}`}
                          className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-zinc-50 dark:bg-zinc-800/30 group"
                        >
                          <div className="h-28 overflow-hidden relative">
                            <img 
                              src={p.images[0]} 
                              alt={p.title} 
                              className="w-full h-full object-cover group-hover:scale-103 transition-transform" 
                            />
                            <div className="absolute top-2 right-2 bg-white/90 dark:bg-zinc-900/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-primary">
                              ★ {p.rating}
                            </div>
                          </div>
                          <div className="p-3">
                            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">{p.title}</h4>
                            <p className="text-[10px] text-zinc-500 truncate">{p.location}</p>
                            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-zinc-200/50 dark:border-zinc-700/50">
                              <span className="text-xs font-extrabold text-primary">₹{p.pricePerNight.toLocaleString()}/night</span>
                              <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Budget Estimate message */}
                  {msg.recommendations.budgetEstimate && (
                    <div className="bg-rose-50/50 border border-rose-100 dark:bg-rose-950/10 dark:border-rose-900/30 rounded-xl p-3 text-[11px] font-medium text-rose-800 dark:text-rose-300">
                      {msg.recommendations.budgetEstimate}
                    </div>
                  )}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-750 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
                <User className="h-4 w-4" />
              </div>
            )}

          </div>
        ))}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-primary/20 flex items-center justify-center text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-800 p-4.5 rounded-2xl rounded-tl-none border border-zinc-150 dark:border-zinc-750 flex items-center gap-1.5">
              <span className="h-2 w-2 bg-zinc-400 dark:bg-zinc-550 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-2 w-2 bg-zinc-400 dark:bg-zinc-550 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-2 w-2 bg-zinc-400 dark:bg-zinc-550 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Preset Queries */}
      <div className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/50 flex flex-wrap gap-2">
        <button 
          onClick={() => setPreset("I want a beach villa under ₹40,000")} 
          className="text-xs px-2.5 py-1.5 rounded-full border border-zinc-200 hover:border-primary dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-350 hover:text-primary transition-colors cursor-pointer"
        >
          Beach under ₹40k
        </button>
        <button 
          onClick={() => setPreset("Cozy mountain cabins under ₹15,000")} 
          className="text-xs px-2.5 py-1.5 rounded-full border border-zinc-200 hover:border-primary dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-350 hover:text-primary transition-colors cursor-pointer"
        >
          Mountain Cabins under ₹15k
        </button>
        <button 
          onClick={() => setPreset("Show me amazing views treehouses")} 
          className="text-xs px-2.5 py-1.5 rounded-full border border-zinc-200 hover:border-primary dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-350 hover:text-primary transition-colors cursor-pointer"
        >
          Treehouses views
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about properties, categories and budget..."
          className="flex-1 bg-zinc-50 border border-zinc-250 dark:border-zinc-750 dark:bg-zinc-800/50 rounded-xl px-4 text-sm focus:outline-none focus:border-primary dark:focus:border-primary dark:text-white transition-colors"
          aria-label="Travel prompt input"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-white rounded-xl p-3 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Send query"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
