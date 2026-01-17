import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

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
  onUpdateGoalProgress: (goalId: string, progress: number) => void;
}

export const GoalsTab = ({ goals, archetypes, onUpdateGoalProgress }: GoalsTabProps) => {
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [tempProgress, setTempProgress] = useState<number>(0);

  const handleEditProgress = (goalId: string, currentProgress: number) => {
    setEditingGoalId(goalId);
    setTempProgress(currentProgress);
  };

  const handleSaveProgress = (goalId: string) => {
    onUpdateGoalProgress(goalId, tempProgress);
    setEditingGoalId(null);
  };

  const handleCancelEdit = () => {
    setEditingGoalId(null);
  };

  return (
    <>
      {goals.map((goal) => {
        const archetype = archetypes.find((a) => a.id === goal.archetypeId);
        const isEditing = editingGoalId === goal.id;
        const displayProgress = isEditing ? tempProgress : goal.progress;

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
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Выполнено</span>
                <span className="font-bold text-foreground">{displayProgress}%</span>
              </div>
              {isEditing ? (
                <>
                  <Slider
                    value={[tempProgress]}
                    onValueChange={(value) => setTempProgress(value[0])}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleSaveProgress(goal.id)}
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
                    >
                      <Icon name="Check" className="mr-1" size={14} />
                      Сохранить
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-border"
                    >
                      <Icon name="X" className="mr-1" size={14} />
                      Отмена
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Progress value={goal.progress} className="h-2 bg-background/50" />
                  <Button
                    onClick={() => handleEditProgress(goal.id, goal.progress)}
                    size="sm"
                    variant="outline"
                    className="w-full border-border hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    <Icon name="Edit" className="mr-1" size={14} />
                    Изменить прогресс
                  </Button>
                </>
              )}
            </div>
          </Card>
        );
      })}
    </>
  );
};