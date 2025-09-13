import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import listosMascot from '@/assets/listosyk-mascot.png';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatInterfaceRef {
  prefillAndFocus: (text: string) => void;
  prefillAndSend: (text: string) => void;
}

interface ChatInterfaceProps {
  initialMessages?: Message[];
  onMessagesChange?: (messages: Message[]) => void;
  onLyricsGenerated: (lyrics: string) => void;
  onConfirmLyrics?: (lyrics: string) => void;
  onEditLyrics?: () => void;
}

const hintChips = [
  'Романтична листівка для коханої на День народження',
  'Весела пісня для дитини на випускний',
  'Подяка другу за підтримку',
  'Листівка мамі на 8 березня',
];

const refineChips = [
  'Зробити веселіше',
  'Додати більше рими',
  'Більше емоцій',
  'Простіше слова'
];

export const ChatInterface = forwardRef<ChatInterfaceRef, ChatInterfaceProps>(({ 
  initialMessages,
  onMessagesChange,
  onLyricsGenerated, 
  onConfirmLyrics,
  onEditLyrics 
}, ref) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialMessages && initialMessages.length > 0) {
      // Convert timestamps back to Date objects if they're numbers/strings
      return initialMessages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp)
      }));
    }
    return [{
      id: '1',
      content: 'Привіт! Я Лістосик 🍃 Я допоможу створити унікальну пісню для твоєї листівки! Розкажи мені про листівку - кому вона призначена, з якого приводу, та які емоції ти хочеш передати?',
      sender: 'assistant',
      timestamp: new Date(),
    }];
  });
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [lastLyricsMessage, setLastLyricsMessage] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update parent when messages change
  useEffect(() => {
    onMessagesChange?.(messages);
  }, [messages, onMessagesChange]);

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

    try {
      // Trim conversation history to last 15 messages for API efficiency
      const trimmedHistory = messages.slice(-15);
      
      const { data, error } = await supabase.functions.invoke('generate-lyrics', {
        body: {
          message: messageText,
          conversationHistory: trimmedHistory
        }
      });

      if (error) {
        console.error('Error calling generate-lyrics function:', error);
        throw new Error(error.message || 'Failed to generate response');
      }

      const aiResponse = data.reply || 'Вибачте, не вдалося згенерувати відповідь.';

      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantResponse]);

      // Check if we have lyrics to extract
      const lyricsMatch = aiResponse.match(/```LYRICS\n([\s\S]*?)\n```/);
      if (lyricsMatch) {
        // Extract lyrics from the marked section
        const lyrics = lyricsMatch[1].trim();
        onLyricsGenerated(lyrics);
        setLastLyricsMessage(lyrics);
      } else if (aiResponse.includes('Куплет') && aiResponse.includes('Припев')) {
        // Fallback: if response contains verse/chorus structure
        onLyricsGenerated(aiResponse);
        setLastLyricsMessage(aiResponse);
      }

    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Fallback response
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Вибачте, сталася помилка. Давайте спробуємо ще раз! Розкажіть мені про пісню, яку хочете створити.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
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

  useImperativeHandle(ref, () => ({
    prefillAndFocus: (text: string) => {
      setNewMessage(text);
      setTimeout(() => {
        textareaRef.current?.focus();
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(text.length, text.length);
        }
      }, 100);
    },
    prefillAndSend: (text: string) => {
      setNewMessage(text);
      setTimeout(() => {
        handleSendMessage(text);
      }, 100);
    }
  }));

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
});