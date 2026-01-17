import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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

interface GoalsTabProps {
  goals: Goal[];
  archetypes: Archetype[];
}

export const GoalsTab = ({ goals, archetypes }: GoalsTabProps) => {
  return (
    <>
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
    </>
  );
};
