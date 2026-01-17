import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export const TimelineTab = () => {
  const events = [
    { date: '15 янв 2024', title: 'Достигнут 75% прогресс "Творец"', type: 'milestone', icon: 'Trophy' },
    { date: '14 янв 2024', title: 'Создана новая цель "Провести тренинг"', type: 'goal', icon: 'Target' },
    { date: '12 янв 2024', title: 'Активирован архетип "Исследователь"', type: 'archetype', icon: 'Sparkles' },
    { date: '10 янв 2024', title: 'Завершена цель "Медитация 30 дней"', type: 'complete', icon: 'CheckCircle' },
  ];

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500" />
      {events.map((event, index) => (
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
  );
};
