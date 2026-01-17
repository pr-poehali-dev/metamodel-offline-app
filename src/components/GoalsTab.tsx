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
          <Card key={goal.id} className="relative p-6 bg-card/30 backdrop-blur-sm border-2 border-yellow-500/30 hover:border-yellow-400/60 hover:scale-[1.02] transition-all group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 via-cyan-400 to-fuchsia-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">{archetype?.emoji}</span>
                <div>
                  <h4 className="font-heading font-bold text-xl text-yellow-300 uppercase tracking-wider">{goal.title}</h4>
                  <p className="text-sm text-yellow-400/60 font-mono mt-1">// {archetype?.name}</p>
                </div>
              </div>
              <div className="text-right bg-yellow-500/10 border border-yellow-500/30 px-3 py-2 rounded">
                <div className="text-xs text-yellow-400 font-bold tracking-wider">DEADLINE</div>
                <div className="text-sm font-black text-yellow-300">{goal.deadline}</div>
              </div>
            </div>
            <div className="relative space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-yellow-400/70 font-bold tracking-wider uppercase text-xs">COMPLETION</span>
                <span className="font-black text-yellow-300 text-xl">{displayProgress}%</span>
              </div>
              {isEditing ? (
                <>
                  <div className="relative">
                    <Slider
                      value={[tempProgress]}
                      onValueChange={(value) => setTempProgress(value[0])}
                      max={100}
                      step={5}
                      className="w-full [&_[role=slider]]:border-2 [&_[role=slider]]:border-cyan-400 [&_[role=slider]]:bg-cyan-500 [&_[role=slider]]:shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleSaveProgress(goal.id)}
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-green-400 to-green-500 text-black border-2 border-green-300 shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:from-green-500 hover:to-green-600 font-bold tracking-wider uppercase text-xs"
                    >
                      <Icon name="Check" className="mr-1" size={14} />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-2 border-red-400/50 text-red-300 hover:bg-red-400/20 hover:text-red-200 hover:border-red-300 font-bold tracking-wider uppercase text-xs"
                    >
                      <Icon name="X" className="mr-1" size={14} />
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-3 bg-black/50 rounded-full overflow-hidden border border-yellow-500/30">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 via-cyan-400 to-fuchsia-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <Button
                    onClick={() => handleEditProgress(goal.id, goal.progress)}
                    size="sm"
                    variant="outline"
                    className="w-full border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/20 hover:text-cyan-200 hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all font-bold tracking-wider uppercase text-xs"
                  >
                    <Icon name="Edit" className="mr-1" size={14} />
                    Edit Progress
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