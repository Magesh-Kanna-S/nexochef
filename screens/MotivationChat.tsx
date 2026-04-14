
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';
import { getMotivationalMessage, generateSpeech } from '../services/gemini';

const MotivationChat: React.FC = () => {
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your NexoChef companion. Both text and voice enabled for your convenience. How can I guide you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const speakText = async (text: string) => {
    if (isSpeaking) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    try {
      const base64Audio = await generateSpeech(text);
      if (base64Audio) {
        const audioSrc = `data:audio/mpeg;base64,${base64Audio}`;
        const audio = new Audio(audioSrc);
        audioRef.current = audio;
        audio.onended = () => {
          setIsSpeaking(false);
          audioRef.current = null;
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          audioRef.current = null;
        };
        await audio.play();
      } else {
        setIsSpeaking(false);
      }
    } catch (e) {
      console.error("Audio playback error:", e);
      setIsSpeaking(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text: input };
    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await getMotivationalMessage([...history, userMsg]);
      const reply = response || 'I am focused on your health schedule!';
      setHistory(prev => [...prev, { role: 'model', text: reply }]);
      // Automatically read out the response
      await speakText(reply);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 text-gray-900 dark:text-gray-100">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-[1.8rem] text-sm font-medium leading-relaxed ${
              msg.role === 'user' 
              ? 'bg-emerald-600 text-white rounded-tr-none shadow-xl shadow-emerald-100 dark:shadow-none' 
              : 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-lg'
            }`}>
              <div className="markdown-body prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-0">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
              {msg.role === 'model' && (
                <button 
                  onClick={() => speakText(msg.text)}
                  className="block mt-3 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  <i className={`fa-solid ${isSpeaking ? 'fa-stop' : 'fa-volume-high'} mr-2`}></i>
                  {isSpeaking ? 'Stop Audio' : 'Replay Audio'}
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-[1.8rem] rounded-tl-none animate-pulse shadow-sm">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-emerald-300 dark:bg-emerald-700 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-300 dark:bg-emerald-700 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-emerald-300 dark:bg-emerald-700 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef}></div>
      </div>

      <div className="p-6 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 sticky bottom-0 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] rounded-t-[2.5rem]">
        <div className="flex gap-3">
          <button 
            onClick={() => alert("Voice input listening... (Simulated)")}
            className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shadow-inner hover:bg-emerald-100 dark:hover:bg-emerald-900/50 active:scale-90 transition-all border border-emerald-100 dark:border-emerald-800"
          >
            <i className="fa-solid fa-microphone text-xl"></i>
          </button>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your health query..."
            className="input-field flex-1"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="btn-primary w-14 h-14 flex items-center justify-center p-0"
          >
            <i className="fa-solid fa-paper-plane text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotivationChat;
