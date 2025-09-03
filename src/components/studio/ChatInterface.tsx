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
  onConfirmLyrics?: (lyrics: string) => void;
  onEditLyrics?: () => void;
}

const hintChips = [
  'Кому призначена листівка?',
  'Який стиль пісні ви віддаєте перевагу?',
  'Який настрій повинен бути?',
  'Чи є особливі побажання?',
];

const refineChips = [
  'Зробити веселіше',
  'Додати більше рими',
  'Більше емоцій',
  'Простіше слова'
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  onLyricsGenerated, 
  onConfirmLyrics,
  onEditLyrics 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Привіт! Я Лістосик, і я допоможу тобі створити прекрасні слова для пісні на листівку. Розкажи мені, кому призначена ця листівка і які почуття ти хочеш передати?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [lastLyricsMessage, setLastLyricsMessage] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (customMessage?: string, isRefining = false) => {
    const messageText = customMessage || newMessage.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customMessage) setNewMessage('');
    setIsTyping(true);

    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAssistantResponse(messageText, isRefining),
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantResponse]);
      setIsTyping(false);

      // If response contains lyrics, update the draft
      if (assistantResponse.content.includes('Ось текст пісні') || assistantResponse.content.includes('Ось оновлений варіант')) {
        const lyricsMatch = assistantResponse.content.match(/```([\s\S]*?)```/);
        if (lyricsMatch) {
          const lyrics = lyricsMatch[1].trim();
          onLyricsGenerated(lyrics);
          setLastLyricsMessage(lyrics);
        }
      }
    }, 1500);
  };

  const generateAssistantResponse = (userInput: string, isRefining = false): string => {
    if (isRefining && lastLyricsMessage) {
      // Simulate refinement based on user feedback
      let refinedLyrics = lastLyricsMessage;
      
      if (userInput.includes('веселіше') || userInput.includes('веселі')) {
        refinedLyrics = refinedLyrics.replace('тепло', 'радість').replace('темній ночі', 'яскравий день');
      } else if (userInput.includes('рим') || userInput.includes('римув')) {
        refinedLyrics = refinedLyrics.replace('золота', 'срібла').replace('щастя', 'радості');
      } else if (userInput.includes('емоцій') || userInput.includes('почуття')) {
        refinedLyrics = refinedLyrics.replace('серці', 'душі палкій').replace('любов', 'пристрасть');
      } else if (userInput.includes('простіше')) {
        refinedLyrics = 'Ти мій друг найкращий,\nЗ тобою все прекрасно,\nБудь завжди щасливим,\nІ посміхайся ясно!';
      } else if (userInput.includes('не так') || userInput.includes('переробити')) {
        refinedLyrics = `Дружба наша міцна,
Як весняна квітка,
Разом ми сильніші,
Це не просто мітка!

Приспів:
Друже мій вірний,
Поруч завжди,
Щастя нам світить,
Мрії здійсни!

Кожен день разом -
То велика сила,
Наша дружба вічна,
Світла і красива!`;
      }
      
      return `Ось оновлений варіант:\n\n\`\`\`\n${refinedLyrics}\n\`\`\`\n\nТак краще? Можемо ще щось змінити!`;
    }

    const responses = [
      'Чудово! Розкажи мені більше про отримувача. Які у вас стосунки?',
      'Відмінно! Який настрій повинен бути у пісні - веселий, романтичний, зворушливий?',
      'Зрозуміло! А чи є якісь особливі спогади або моменти, які хочеться відобразити в пісні?',
      `Дякую за подробиці! Ось текст пісні, який я створив спеціально для вас:

\`\`\`
У серці моєму живе тепло,
Що дарує мені твоя любов,
Нехай цей день буде світло,
І щастя ллється знов і знов.

Приспів:
Ти моє світло в темній ночі,
Ти мій друг назавжди,
Нехай здійсняться мрії,
Будь щасливим завжди!

Кожен день з тобою як свято,
Кожна мить дорожча золота,
Нехай посмішка не згасне,
І душа співає від щастя!
\`\`\`

Як вам такий варіант? Якщо щось потрібно змінити, просто скажіть!`,
    ];

    return responses[Math.min(messages.length - 1, responses.length - 1)];
  };

  const handleHintClick = (hint: string) => {
    setNewMessage(hint);
    textareaRef.current?.focus();
  };

  const handleRefineClick = (refinement: string) => {
    handleSendMessage(refinement, true);
  };

  const handleGeneralFeedback = () => {
    setNewMessage('Щось не так з цим текстом, можеш переробити?');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const extractLyricsFromMessage = (content: string): string | null => {
    const lyricsMatch = content.match(/```([\s\S]*?)```/);
    return lyricsMatch ? lyricsMatch[1].trim() : null;
  };

  const handleEditMessage = (messageId: string, content: string) => {
    setEditingMessageId(messageId);
    const lyrics = extractLyricsFromMessage(content);
    setEditingContent(lyrics || content);
  };

  const handleSaveEdit = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, content: msg.content.includes('```') 
            ? msg.content.replace(/```[\s\S]*?```/, `\`\`\`\n${editingContent}\n\`\`\``)
            : editingContent
          }
        : msg
    ));
    onLyricsGenerated(editingContent);
    setEditingMessageId(null);
    setEditingContent('');
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingContent('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
        <Avatar>
          <AvatarImage src={listosMascot} alt="Листосик" />
          <AvatarFallback>Л</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">Лістосик</h3>
          <p className="text-sm text-muted-foreground">Помічник зі створення пісень</p>
        </div>
      </div>

      <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => {
            const hasLyrics = message.sender === 'assistant' && extractLyricsFromMessage(message.content);
            const isEditing = editingMessageId === message.id;
            
            return (
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
                <div className="max-w-[80%] flex flex-col gap-2">
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isEditing ? (
                      <Textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full min-h-[100px] text-sm"
                        placeholder="Редагуйте текст пісні..."
                      />
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    )}
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  {/* Lyrics action buttons */}
                  {hasLyrics && !isEditing && (
                    <div className="space-y-3 mt-3 pt-3 border-t border-border">
                      {/* Quick refine options */}
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Швидко покращити:</p>
                        <div className="flex flex-wrap gap-2">
                          {refineChips.map((chip) => (
                            <button
                              key={chip}
                              onClick={() => handleRefineClick(chip)}
                              className="px-3 py-1 text-xs rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* General feedback and actions */}
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleGeneralFeedback}
                          className="text-xs"
                        >
                          Щось не так?
                        </Button>
                        {onEditLyrics && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={onEditLyrics}
                            className="text-xs"
                          >
                            Детальне редагування
                          </Button>
                        )}
                        {onConfirmLyrics && (
                          <Button
                            size="sm"
                            onClick={() => onConfirmLyrics(extractLyricsFromMessage(message.content) || '')}
                            className="text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            Підтвердити і далі →
                          </Button>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Листосик допоможе вам покращити пісню, просто скажіть що хочете змінити
                      </p>
                    </div>
                  )}
                  
                  {/* Edit mode buttons */}
                  {isEditing && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(message.id)}
                      >
                        Зберегти
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        Скасувати
                      </Button>
                    </div>
                  )}
                </div>
                {message.sender === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>Ви</AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })}
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
          <p className="text-sm text-muted-foreground mb-2">Приклади запитань:</p>
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
          <p className="text-xs text-muted-foreground mt-2">
            💡 Після створення слів ви зможете їх відредагувати прямо в чаті або у чернетці
          </p>
        </div>
      )}

      {/* Message composer */}
      <div className="flex gap-2 pt-4 border-t border-border">
        <Textarea
          ref={textareaRef}
          placeholder={lastLyricsMessage ? "Скажіть що хочете змінити у пісні..." : "Введіть ваше повідомлення..."}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="min-h-[44px] max-h-32 resize-none"
          rows={1}
        />
        <Button 
          onClick={() => handleSendMessage()} 
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