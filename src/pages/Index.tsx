import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { ArchetypesTab } from '@/components/ArchetypesTab';
import { GoalsTab } from '@/components/GoalsTab';
import { AnalyticsTab } from '@/components/AnalyticsTab';
import { TimelineTab } from '@/components/TimelineTab';

interface Archetype {
  id: string;
  name: string;
  emoji: string;
  color: string;
  progress: number;
  goals: number;
  lastActive: string;
}

interface Goal {
  id: string;
  archetypeId: string;
  title: string;
  progress: number;
  deadline: string;
}

const Index = () => {
  const [archetypes, setArchetypes] = useState<Archetype[]>([
    { id: '1', name: 'Творец', emoji: '🎨', color: 'from-purple-500 to-pink-500', progress: 75, goals: 3, lastActive: '2024-01-15' },
    { id: '2', name: 'Лидер', emoji: '👑', color: 'from-orange-500 to-red-500', progress: 60, goals: 5, lastActive: '2024-01-14' },
    { id: '3', name: 'Исследователь', emoji: '🔭', color: 'from-blue-500 to-cyan-500', progress: 45, goals: 2, lastActive: '2024-01-12' },
    { id: '4', name: 'Мудрец', emoji: '📚', color: 'from-green-500 to-emerald-500', progress: 85, goals: 4, lastActive: '2024-01-16' },
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', archetypeId: '1', title: 'Завершить арт-проект', progress: 80, deadline: '2024-02-01' },
    { id: '2', archetypeId: '2', title: 'Провести тренинг', progress: 50, deadline: '2024-01-25' },
    { id: '3', archetypeId: '4', title: 'Прочитать 5 книг', progress: 90, deadline: '2024-01-31' },
  ]);

  const [newArchetypeName, setNewArchetypeName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('✨');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [selectedArchetypeForGoal, setSelectedArchetypeForGoal] = useState('');
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');

  const emojis = ['🎨', '👑', '🔭', '📚', '💪', '🧘', '🎯', '⚡', '🌟', '🔥', '💎', '🚀'];
  const gradients = [
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
    'from-indigo-500 to-purple-500',
  ];

  const activityData = [
    { day: 'Пн', value: 5 },
    { day: 'Вт', value: 8 },
    { day: 'Ср', value: 12 },
    { day: 'Чт', value: 7 },
    { day: 'Пт', value: 15 },
    { day: 'Сб', value: 10 },
    { day: 'Вс', value: 6 },
  ];

  const progressTrendData = [
    { month: 'Окт', value: 45 },
    { month: 'Ноя', value: 52 },
    { month: 'Дек', value: 61 },
    { month: 'Янв', value: 66 },
  ];

  const heatmapData = [
    { week: 'Нед 1', days: [3, 5, 2, 8, 6, 4, 1] },
    { week: 'Нед 2', days: [7, 4, 9, 5, 3, 6, 8] },
    { week: 'Нед 3', days: [2, 6, 4, 7, 9, 5, 3] },
    { week: 'Нед 4', days: [8, 3, 6, 4, 2, 7, 5] },
  ];

  const handleCreateArchetype = () => {
    if (newArchetypeName.trim()) {
      const newArchetype: Archetype = {
        id: Date.now().toString(),
        name: newArchetypeName,
        emoji: selectedEmoji,
        color: gradients[Math.floor(Math.random() * gradients.length)],
        progress: 0,
        goals: 0,
        lastActive: new Date().toISOString().split('T')[0],
      };
      setArchetypes([...archetypes, newArchetype]);
      setNewArchetypeName('');
      setSelectedEmoji('✨');
      setIsDialogOpen(false);
    }
  };

  const handleCreateGoal = () => {
    if (newGoalTitle.trim() && selectedArchetypeForGoal && newGoalDeadline) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        archetypeId: selectedArchetypeForGoal,
        title: newGoalTitle,
        progress: 0,
        deadline: newGoalDeadline,
      };
      setGoals([...goals, newGoal]);
      
      setArchetypes(archetypes.map(a => 
        a.id === selectedArchetypeForGoal 
          ? { ...a, goals: a.goals + 1, lastActive: new Date().toISOString().split('T')[0] }
          : a
      ));
      
      setNewGoalTitle('');
      setNewGoalDeadline('');
      setNewGoalDescription('');
      setSelectedArchetypeForGoal('');
      setIsGoalDialogOpen(false);
    }
  };

  const openGoalDialog = (archetypeId?: string) => {
    if (archetypeId) {
      setSelectedArchetypeForGoal(archetypeId);
    }
    setIsGoalDialogOpen(true);
  };

  const getHeatColor = (value: number) => {
    if (value >= 8) return 'bg-purple-500';
    if (value >= 6) return 'bg-pink-500';
    if (value >= 4) return 'bg-orange-500';
    if (value >= 2) return 'bg-blue-400';
    return 'bg-muted';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              MetaModel
            </h1>
            <p className="text-muted-foreground mt-1">Инструмент осознанной эволюции</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all hover:scale-105">
                  <Icon name="Target" className="mr-2" size={20} />
                  Создать цель
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="font-heading">Новая цель</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Создайте цель и привяжите её к архетипу для отслеживания прогресса
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="archetype-select">Архетип</Label>
                    <Select value={selectedArchetypeForGoal} onValueChange={setSelectedArchetypeForGoal}>
                      <SelectTrigger id="archetype-select" className="bg-background border-border mt-2">
                        <SelectValue placeholder="Выберите архетип" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {archetypes.map((archetype) => (
                          <SelectItem key={archetype.id} value={archetype.id}>
                            <span className="flex items-center gap-2">
                              <span>{archetype.emoji}</span>
                              <span>{archetype.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="goal-title">Название цели</Label>
                    <Input
                      id="goal-title"
                      placeholder="Например: Написать книгу..."
                      value={newGoalTitle}
                      onChange={(e) => setNewGoalTitle(e.target.value)}
                      className="bg-background border-border mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="goal-deadline">Дедлайн</Label>
                    <Input
                      id="goal-deadline"
                      type="date"
                      value={newGoalDeadline}
                      onChange={(e) => setNewGoalDeadline(e.target.value)}
                      className="bg-background border-border mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="goal-description">Описание (опционально)</Label>
                    <Textarea
                      id="goal-description"
                      placeholder="Детали цели..."
                      value={newGoalDescription}
                      onChange={(e) => setNewGoalDescription(e.target.value)}
                      className="bg-background border-border mt-2 min-h-20"
                    />
                  </div>
                  <Button 
                    onClick={handleCreateGoal} 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500"
                    disabled={!selectedArchetypeForGoal || !newGoalTitle || !newGoalDeadline}
                  >
                    Создать цель
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105">
                  <Icon name="Plus" className="mr-2" size={20} />
                  Создать архетип
                </Button>
              </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-heading">Новый архетип</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Название</label>
                  <Input
                    placeholder="Например: Герой, Мыслитель..."
                    value={newArchetypeName}
                    onChange={(e) => setNewArchetypeName(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Выберите символ</label>
                  <div className="grid grid-cols-6 gap-2">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`text-3xl p-3 rounded-lg transition-all hover:scale-110 ${
                          selectedEmoji === emoji ? 'bg-primary/20 ring-2 ring-primary' : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={handleCreateArchetype} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                  Создать
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          </div>
        </header>

        <Tabs defaultValue="archetypes" className="animate-fade-in">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="archetypes" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
              <Icon name="Users" className="mr-2" size={16} />
              Архетипы
            </TabsTrigger>
            <TabsTrigger value="goals" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
              <Icon name="Target" className="mr-2" size={16} />
              Цели
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
              <Icon name="BarChart3" className="mr-2" size={16} />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
              <Icon name="Clock" className="mr-2" size={16} />
              Хроника
            </TabsTrigger>
          </TabsList>

          <TabsContent value="archetypes" className="space-y-4 mt-6">
            <ArchetypesTab archetypes={archetypes} openGoalDialog={openGoalDialog} />
          </TabsContent>

          <TabsContent value="goals" className="space-y-4 mt-6">
            <GoalsTab goals={goals} archetypes={archetypes} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <AnalyticsTab 
              activityData={activityData} 
              progressTrendData={progressTrendData} 
              heatmapData={heatmapData}
              getHeatColor={getHeatColor}
            />
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4 mt-6">
            <TimelineTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
