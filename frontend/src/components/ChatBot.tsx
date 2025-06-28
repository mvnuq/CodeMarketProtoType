import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

type Message = { from: 'user' | 'bot' | 'suggestion'; text: string };

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: '¡Hola! 👋 Soy tu Asesor. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    setInput('');

    // simulamos respuesta del bot
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: '¡Entiendo! ¿Quieres que continuemos por WhatsApp?' },
        { 
          from: 'suggestion', 
          text: 'Chat en WhatsApp', 
        }
      ]);
    }, 800);
  };

  return (
    <>
      <button className="chatbot-toggle" onClick={() => setOpen(o => !o)}>
        {open ? '✕' : '💬'} Asesor
      </button>

      {open && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <div className="bot-info">
                <img
                src="/assets/chatbot.png"
                alt="Asesor CodeMarket"
                className="bot-avatar"
                />
                <span>Asesor CodeMarket</span>
            </div>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chatbot-body">
            {messages.map((m, i) => (
              m.from === 'suggestion' ? (
                <a 
                  key={i}
                  href="https://api.whatsapp.com/send?phone=56954615765&text=Hola%20necesito%20asesoramiento"
                  className="chatbot-suggestion"
                  target="_blank"
                  rel="noreferrer"
                >
                  {m.text} ➜
                </a>
              ) : (
                <div key={i} className={`chatbot-msg ${m.from}`}>
                  {m.text}
                </div>
              )
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Escribe tu mensaje..."
            />
            <button onClick={send}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
