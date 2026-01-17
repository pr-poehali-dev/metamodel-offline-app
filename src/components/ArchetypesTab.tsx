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
            className="relative p-6 bg-card/30 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400/60 hover:scale-105 transition-all cursor-pointer animate-scale-in group overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-5xl filter drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">{archetype.emoji}</span>
                <div className="text-right bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded">
                  <div className="text-xs text-cyan-400 font-bold tracking-wider">GOALS</div>
                  <div className="text-2xl font-black text-cyan-300">{archetype.goals}</div>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-cyan-300 uppercase tracking-wider">{archetype.name}</h3>
                <p className="text-xs text-cyan-400/60 mt-1 font-mono">// ACTIVE: {archetype.lastActive}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cyan-400/70 font-bold tracking-wider uppercase text-xs">PROGRESS</span>
                  <span className="font-black text-cyan-300 text-lg">{archetype.progress}%</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-cyan-500/30">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                    style={{ width: `${archetype.progress}%` }}
                  ></div>
                </div>
              </div>
              <Button 
                onClick={() => openGoalDialog(archetype.id)}
                variant="outline"
                size="sm"
                className="w-full mt-2 border-2 border-yellow-400/50 text-yellow-300 hover:bg-yellow-400/20 hover:text-yellow-200 hover:border-yellow-300 hover:shadow-[0_0_15px_rgba(234,179,8,0.5)] transition-all font-bold tracking-wider uppercase text-xs"
              >
                <Icon name="Plus" className="mr-1" size={14} />
                Add Goal
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-card/30 backdrop-blur-sm border-2 border-cyan-500/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400"></div>
        <h3 className="font-heading text-2xl font-black mb-6 flex items-center text-cyan-300 uppercase tracking-wider">
          <Icon name="TrendingUp" className="mr-3 text-cyan-400" size={28} />
          EVOLUTION MAP
          <span className="ml-3 text-xs text-cyan-400/60 font-mono">// v2.077</span>
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={evolutionData}>
              <XAxis 
                dataKey="name" 
                stroke="#06b6d4" 
                style={{ fontWeight: 'bold', fontSize: '12px', letterSpacing: '0.05em' }}
              />
              <YAxis 
                stroke="#06b6d4" 
                style={{ fontWeight: 'bold', fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                  border: '2px solid #06b6d4', 
                  borderRadius: '0.5rem',
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
                }}
                labelStyle={{ color: '#67e8f9', fontWeight: 'bold', textTransform: 'uppercase' }}
                itemStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
              />
              <Bar dataKey="progress" radius={[4, 4, 0, 0]}>
                {evolutionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#cyber-gradient-${index})`} />
                ))}
              </Bar>
              <defs>
                {evolutionData.map((entry, index) => (
                  <linearGradient key={`cyber-gradient-${index}`} id={`cyber-gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
                    <stop offset="50%" stopColor="#d946ef" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#eab308" stopOpacity={0.8} />
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