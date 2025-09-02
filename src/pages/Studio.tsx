import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatInterface } from '@/components/studio/ChatInterface';
import { LyricsDraft } from '@/components/studio/LyricsDraft';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';

const steps = [
  { id: 1, title: 'Створення слів', description: 'Створюємо слова для пісні' },
  { id: 2, title: 'Генерація пісні', description: 'Генеруємо 3 варіанти на основі слів' },
  { id: 3, title: 'Дизайн лицьової сторони', description: 'Оформлюємо лицьову частину листівки' },
  { id: 4, title: 'Дизайн зворотної сторони', description: 'Оформлюємо зворотну частину листівки' },
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
                  <TabsTrigger value="draft">Чернетка</TabsTrigger>
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
            <h3 className="text-xl font-semibold mb-4">Генерація пісні</h3>
            <p className="text-muted-foreground mb-6">
              Тут буде генерація 3 варіантів пісні на основі створених слів
            </p>
            <Button variant="outline" onClick={() => setCurrentStep(3)}>
              Перейти до дизайну лицьової сторони
            </Button>
          </Card>
        );
      case 3:
        return (
          <Card className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Дизайн лицьової сторони</h3>
            <p className="text-muted-foreground mb-6">
              Тут буде створення дизайну лицьової сторони листівки
            </p>
            <Button variant="outline" onClick={() => setCurrentStep(4)}>
              Перейти до дизайну зворотної сторони
            </Button>
          </Card>
        );
      case 4:
        return (
          <Card className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Дизайн зворотної сторони</h3>
            <p className="text-muted-foreground mb-6">
              Тут буде створення дизайну зворотної сторони листівки
            </p>
            <Button>Завершити створення листівки</Button>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD1DC] to-white/20">
      {/* Header */}
      <Header centerTitle="Студія створення листівки" hideNav showMenu={false} />

      {/* Steps indicator */}
      <div className="bg-transparent pt-24 md:pt-28">
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
      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
        {renderStepContent()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Studio;