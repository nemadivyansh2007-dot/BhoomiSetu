import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, FileText, Database, AlertCircle, Sparkles } from 'lucide-react';
import { getAIResponse } from '@/data/mockData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  relatedResearch?: string[];
  relatedDatasets?: string[];
}

const SUGGESTED = [
  'Show research about land governance',
  'Find datasets related to rural development',
  'What is SVAMITVA scheme?',
  'Show evidence related to women\'s land rights',
  'Research on forest rights in India',
];

export default function EvidenceAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Hello! I\'m the BhoomiSetu Evidence Assistant. I can help you discover research, datasets and evidence related to land governance and rural development. What would you like to explore?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (query: string) => {
    if (!query.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));

    const response = getAIResponse(query);
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.answer,
      sources: response.sources,
      relatedResearch: response.relatedResearch,
      relatedDatasets: response.relatedDatasets,
    };
    setMessages(prev => [...prev, assistantMsg]);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-900 to-forest-900 px-6 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          <Sparkles size={20} className="text-saffron-300" />
        </div>
        <div>
          <div className="font-bold text-white">Evidence Assistant</div>
          <div className="text-xs text-gray-300">Demo responses — not official government data</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-forest-400 animate-pulse-slow"></span>
          <span className="text-xs text-gray-300">Active</span>
        </div>
      </div>

      {/* Chat */}
      <div className="h-80 overflow-y-auto p-4 space-y-4 bg-cream-50">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' ? 'bg-forest-700 text-white' : 'bg-navy-100 text-navy-700'
            }`}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-forest-700 text-white rounded-tr-sm'
                  : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm shadow-sm'
              }`}>
                {msg.content}
              </div>

              {msg.role === 'assistant' && msg.sources && (
                <div className="space-y-2 w-full">
                  {msg.sources.length > 0 && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 mb-1.5">
                        <AlertCircle size={12} /> Sources
                      </div>
                      {msg.sources.map(s => (
                        <div key={s} className="text-xs text-blue-600 flex items-center gap-1 mb-0.5">
                          <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0"></span> {s}
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.relatedResearch && msg.relatedResearch.length > 0 && (
                    <div className="bg-forest-50 border border-forest-100 rounded-xl px-3 py-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-forest-700 mb-1.5">
                        <FileText size={12} /> Related Research
                      </div>
                      {msg.relatedResearch.map(r => (
                        <div key={r} className="text-xs text-forest-600 flex items-center gap-1 mb-0.5">
                          <span className="w-1 h-1 rounded-full bg-forest-400 flex-shrink-0"></span> {r}
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.relatedDatasets && msg.relatedDatasets.length > 0 && (
                    <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 mb-1.5">
                        <Database size={12} /> Related Datasets
                      </div>
                      {msg.relatedDatasets.map(d => (
                        <div key={d} className="text-xs text-amber-600 flex items-center gap-1 mb-0.5">
                          <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0"></span> {d}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-navy-100 text-navy-700 flex items-center justify-center flex-shrink-0">
              <Bot size={14} />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-none">
        {SUGGESTED.map(s => (
          <button
            key={s}
            onClick={() => send(s)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-forest-400 hover:text-forest-700 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={e => { e.preventDefault(); send(input); }}
        className="flex items-center gap-2 px-4 py-3 border-t border-gray-100"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about land governance, research, datasets..."
          className="input-field flex-1"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 bg-forest-800 text-white rounded-lg hover:bg-forest-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
