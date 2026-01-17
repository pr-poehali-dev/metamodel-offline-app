import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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

  const evolutionData = archetypes.map(a => ({
    name: a.name,
    progress: a.progress,
    color: a.color,
  }));

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

  const heatmapData = [
    { week: 'Нед 1', days: [3, 5, 2, 8, 6, 4, 1] },
    { week: 'Нед 2', days: [7, 4, 9, 5, 3, 6, 8] },
    { week: 'Нед 3', days: [2, 6, 4, 7, 9, 5, 3] },
    { week: 'Нед 4', days: [8, 3, 6, 4, 2, 7, 5] },
  ];

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {archetypes.map((archetype, index) => (
                <Card
                  key={archetype.id}
                  className={`p-6 bg-gradient-to-br ${archetype.color} bg-opacity-10 border-border hover:scale-105 transition-all cursor-pointer animate-scale-in backdrop-blur-sm`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-5xl">{archetype.emoji}</span>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Целей</div>
                        <div className="text-2xl font-bold">{archetype.goals}</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground">{archetype.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">Активен: {archetype.lastActive}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Прогресс</span>
                        <span className="font-bold text-foreground">{archetype.progress}%</span>
                      </div>
                      <Progress value={archetype.progress} className="h-2 bg-background/50" />
                    </div>
                    <Button 
                      onClick={() => openGoalDialog(archetype.id)}
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 border-border hover:bg-primary/10 hover:text-primary transition-all"
                    >
                      <Icon name="Plus" className="mr-1" size={14} />
                      Добавить цель
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-card/50 border-border backdrop-blur-sm">
              <h3 className="font-heading text-xl font-bold mb-4 flex items-center">
                <Icon name="TrendingUp" className="mr-2 text-primary" size={24} />
                Карта эволюции
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={evolutionData}>
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                      labelStyle={{ color: '#f3f4f6' }}
                    />
                    <Bar dataKey="progress" radius={[8, 8, 0, 0]}>
                      {evolutionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
                      ))}
                    </Bar>
                    <defs>
                      {evolutionData.map((entry, index) => (
                        <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1} />
                          <stop offset="100%" stopColor="#EC4899" stopOpacity={0.8} />
                        </linearGradient>
                      ))}
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4 mt-6">
            {goals.map((goal) => {
              const archetype = archetypes.find((a) => a.id === goal.archetypeId);
              return (
                <Card key={goal.id} className="p-6 bg-card/50 border-border backdrop-blur-sm hover:scale-[1.02] transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{archetype?.emoji}</span>
                      <div>
                        <h4 className="font-heading font-bold text-lg">{goal.title}</h4>
                        <p className="text-sm text-muted-foreground">{archetype?.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Дедлайн</div>
                      <div className="text-sm font-bold">{goal.deadline}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Выполнено</span>
                      <span className="font-bold text-foreground">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2 bg-background/50" />
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card/50 border-border backdrop-blur-sm">
                <h3 className="font-heading text-xl font-bold mb-4 flex items-center">
                  <Icon name="Activity" className="mr-2 text-purple-400" size={24} />
                  Активность за неделю
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                      <XAxis dataKey="day" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                      />
                      <Bar dataKey="value" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 border-border backdrop-blur-sm">
                <h3 className="font-heading text-xl font-bold mb-4 flex items-center">
                  <Icon name="LineChart" className="mr-2 text-pink-400" size={24} />
                  Тренд прогресса
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressTrendData}>
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                      />
                      <Line type="monotone" dataKey="value" stroke="#EC4899" strokeWidth={3} dot={{ fill: '#EC4899', r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-card/50 border-border backdrop-blur-sm">
              <h3 className="font-heading text-xl font-bold mb-4 flex items-center">
                <Icon name="Calendar" className="mr-2 text-orange-400" size={24} />
                Тепловая карта активности
              </h3>
              <div className="space-y-2">
                <div className="flex gap-2 text-xs text-muted-foreground ml-16">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                    <div key={day} className="w-12 text-center">
                      {day}
                    </div>
                  ))}
                </div>
                {heatmapData.map((week) => (
                  <div key={week.week} className="flex items-center gap-2">
                    <div className="w-14 text-sm text-muted-foreground">{week.week}</div>
                    <div className="flex gap-2">
                      {week.days.map((value, idx) => (
                        <div
                          key={idx}
                          className={`w-12 h-12 rounded-lg ${getHeatColor(value)} transition-all hover:scale-110 cursor-pointer flex items-center justify-center text-xs font-bold`}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-6 text-xs text-muted-foreground">
                <span>Меньше</span>
                <div className="flex gap-1">
                  <div className="w-4 h-4 rounded bg-muted" />
                  <div className="w-4 h-4 rounded bg-blue-400" />
                  <div className="w-4 h-4 rounded bg-orange-500" />
                  <div className="w-4 h-4 rounded bg-pink-500" />
                  <div className="w-4 h-4 rounded bg-purple-500" />
                </div>
                <span>Больше</span>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4 mt-6">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500" />
              {[
                { date: '15 янв 2024', title: 'Достигнут 75% прогресс "Творец"', type: 'milestone', icon: 'Trophy' },
                { date: '14 янв 2024', title: 'Создана новая цель "Провести тренинг"', type: 'goal', icon: 'Target' },
                { date: '12 янв 2024', title: 'Активирован архетип "Исследователь"', type: 'archetype', icon: 'Sparkles' },
                { date: '10 янв 2024', title: 'Завершена цель "Медитация 30 дней"', type: 'complete', icon: 'CheckCircle' },
              ].map((event, index) => (
                <Card
                  key={index}
                  className="ml-20 mb-4 p-4 bg-card/50 border-border backdrop-blur-sm hover:scale-[1.02] transition-all animate-fade-in relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -left-[3.25rem] top-4 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse-glow">
                    <Icon name={event.icon as any} size={16} className="text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">{event.date}</div>
                  <div className="font-heading font-semibold">{event.title}</div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;