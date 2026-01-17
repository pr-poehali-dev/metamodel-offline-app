import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsTabProps {
  activityData: { day: string; value: number }[];
  progressTrendData: { month: string; value: number }[];
  heatmapData: { week: string; days: number[] }[];
  getHeatColor: (value: number) => string;
}

export const AnalyticsTab = ({ activityData, progressTrendData, heatmapData, getHeatColor }: AnalyticsTabProps) => {
  return (
    <>
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
    </>
  );
};
