import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatInterface } from '@/components/studio/ChatInterface';
import { LyricsDraft } from '@/components/studio/LyricsDraft';

const steps = [
  { id: 1, title: 'Создание слов', description: 'Создаем слова для песни' },
  { id: 2, title: 'Генерация песни', description: 'Выбираем мелодию' },
  { id: 3, title: 'Дизайн лицевой части', description: 'Оформляем лицо открытки' },
  { id: 4, title: 'Дизайн обратной части', description: 'Оформляем оборот открытки' },
];

const Studio = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [lyrics, setLyrics] = useState('');

  const handleLyricsConfirmed = (confirmedLyrics: string) => {
    setLyrics(confirmedLyrics);
    setCurrentStep(2);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="h-full">
            {/* Desktop: Two-column layout */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-6 h-full">
              <Card className="p-6 h-full">
                <ChatInterface onLyricsGenerated={setLyrics} />
              </Card>
              <Card className="p-6 h-full">
                <LyricsDraft lyrics={lyrics} onConfirm={handleLyricsConfirmed} />
              </Card>
            </div>

            {/* Mobile: Tabbed layout */}
            <div className="md:hidden h-full">
              <Tabs defaultValue="chat" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="chat">Чат</TabsTrigger>
                  <TabsTrigger value="draft">Черновик</TabsTrigger>
                </TabsList>
                <TabsContent value="chat" className="flex-1">
                  <Card className="p-4 h-full">
                    <ChatInterface onLyricsGenerated={setLyrics} />
                  </Card>
                </TabsContent>
                <TabsContent value="draft" className="flex-1">
                  <Card className="p-4 h-full">
                    <LyricsDraft lyrics={lyrics} onConfirm={handleLyricsConfirmed} />
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        );
      case 2:
        return (
          <Card className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Генерация песни</h3>
            <p className="text-muted-foreground mb-6">
              Здесь будет генерация 3 вариантов песни на основе созданных слов
            </p>
            <Button variant="outline" onClick={() => setCurrentStep(3)}>
              Перейти к дизайну лицевой части
            </Button>
          </Card>
        );
      case 3:
        return (
          <Card className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Дизайн лицевой части</h3>
            <p className="text-muted-foreground mb-6">
              Здесь будет создание дизайна лицевой части открытки
            </p>
            <Button variant="outline" onClick={() => setCurrentStep(4)}>
              Перейти к дизайну обратной части
            </Button>
          </Card>
        );
      case 4:
        return (
          <Card className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Дизайн обратной части</h3>
            <p className="text-muted-foreground mb-6">
              Здесь будет создание дизайна обратной части открытки
            </p>
            <Button>Завершить создание открытки</Button>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Студия создания открыток</h1>
          </div>
        </div>
      </header>

      {/* Steps indicator */}
      <div className="bg-background/50 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep > step.id 
                      ? 'bg-success border-success text-success-foreground' 
                      : currentStep === step.id 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'bg-background border-border text-muted-foreground'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 transition-colors ${
                    currentStep > step.id ? 'bg-success' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 h-[calc(100vh-200px)]">
        {renderStepContent()}
      </main>
    </div>
  );
};

export default Studio;