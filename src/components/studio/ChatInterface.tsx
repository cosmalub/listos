import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import listosMascot from '@/assets/listosyk-mascot.png';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  onLyricsGenerated: (lyrics: string) => void;
}

const hintChips = [
  'Кому предназначена открытка?',
  'Какой стиль песни вы предпочитаете?',
  'Какое настроение должно быть?',
  'Есть ли особые пожелания?',
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onLyricsGenerated }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Привет! Я Листосик, и я помогу тебе создать прекрасные слова для песни на открытку. Расскажи мне, кому предназначена эта открытка и какие чувства ты хочешь передать?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAssistantResponse(newMessage),
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantResponse]);
      setIsTyping(false);

      // If response contains lyrics, update the draft
      if (assistantResponse.content.includes('Вот текст песни')) {
        const lyricsMatch = assistantResponse.content.match(/```([\s\S]*?)```/);
        if (lyricsMatch) {
          onLyricsGenerated(lyricsMatch[1].trim());
        }
      }
    }, 1500);
  };

  const generateAssistantResponse = (userInput: string): string => {
    const responses = [
      'Замечательно! Расскажи мне больше о получателе. Какие у вас отношения?',
      'Отлично! Какое настроение должно быть у песни - веселое, романтичное, трогательное?',
      'Понятно! А есть ли какие-то особые воспоминания или моменты, которые хочется отразить в песне?',
      `Спасибо за подробности! Вот текст песни, который я создал специально для вас:

\`\`\`
В сердце моем живет тепло,
Что дарит мне твоя любовь,
Пусть этот день будет светло,
И счастье льется вновь и вновь.

Припев:
Ты мой свет в темной ночи,
Ты мой друг навсегда,
Пусть исполнятся мечты,
Будь счастлив всегда!

Каждый день с тобой как праздник,
Каждый миг дороже золота,
Пусть улыбка не погаснет,
И душа поет от счастья!
\`\`\`

Как вам такой вариант? Если что-то нужно изменить, просто скажите!`,
    ];

    return responses[Math.min(messages.length - 1, responses.length - 1)];
  };

  const handleHintClick = (hint: string) => {
    setNewMessage(hint);
    textareaRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
        <Avatar>
          <AvatarImage src={listosMascot} alt="Листосик" />
          <AvatarFallback>Л</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">Листосик</h3>
          <p className="text-sm text-muted-foreground">Помощник по созданию песен</p>
        </div>
      </div>

      <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'assistant' && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={listosMascot} alt="Листосик" />
                  <AvatarFallback>Л</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.sender === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>Вы</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <Avatar className="w-8 h-8">
                <AvatarImage src={listosMascot} alt="Листосик" />
                <AvatarFallback>Л</AvatarFallback>
              </Avatar>
              <div className="bg-muted text-muted-foreground rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Hint chips */}
      {messages.length === 1 && (
        <div className="my-4">
          <p className="text-sm text-muted-foreground mb-2">Примеры вопросов:</p>
          <div className="flex flex-wrap gap-2">
            {hintChips.map((hint) => (
              <Badge
                key={hint}
                variant="outline"
                className="cursor-pointer hover:bg-accent"
                onClick={() => handleHintClick(hint)}
              >
                {hint}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Message composer */}
      <div className="flex gap-2 pt-4 border-t border-border">
        <Textarea
          ref={textareaRef}
          placeholder="Введите ваше сообщение..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="min-h-[44px] max-h-32 resize-none"
          rows={1}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={!newMessage.trim() || isTyping}
          size="icon"
          className="self-end"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};