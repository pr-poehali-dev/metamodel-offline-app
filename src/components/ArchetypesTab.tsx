import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Archetype {
  id: string;
  name: string;
  emoji: string;
  color: string;
  progress: number;
  goals: number;
  lastActive: string;
}

interface ArchetypesTabProps {
  archetypes: Archetype[];
  openGoalDialog: (archetypeId?: string) => void;
}

export const ArchetypesTab = ({ archetypes, openGoalDialog }: ArchetypesTabProps) => {
  const evolutionData = archetypes.map(a => ({
    name: a.name,
    progress: a.progress,
    color: a.color,
  }));

  return (
    <>
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
    </>
  );
};
