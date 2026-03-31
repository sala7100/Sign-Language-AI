import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Trophy, Target, TrendingUp, Award, Star, Flame } from 'lucide-react';
import { motion } from 'motion/react';

const ACHIEVEMENTS = [
  { id: 1, title: 'First Steps', description: 'Completed first practice session', icon: Star, earned: true },
  { id: 2, title: 'Quick Learner', description: 'Perfect score in practice mode', icon: Trophy, earned: true },
  { id: 3, title: 'Consistent', description: '7 day practice streak', icon: Flame, earned: true },
  { id: 4, title: 'Alphabet Master', description: 'Learned all 26 letters', icon: Award, earned: false },
  { id: 5, title: 'Recognition Expert', description: '100 signs recognized', icon: Target, earned: false },
  { id: 6, title: 'Marathon', description: '5 hours of practice time', icon: TrendingUp, earned: false },
];

const WEEKLY_PROGRESS = [
  { day: 'Mon', minutes: 45, accuracy: 85 },
  { day: 'Tue', minutes: 30, accuracy: 88 },
  { day: 'Wed', minutes: 60, accuracy: 92 },
  { day: 'Thu', minutes: 25, accuracy: 87 },
  { day: 'Fri', minutes: 50, accuracy: 94 },
  { day: 'Sat', minutes: 40, accuracy: 90 },
  { day: 'Sun', minutes: 35, accuracy: 91 },
];

const LEARNING_STATS = [
  { label: 'Letters Mastered', value: 18, total: 26, color: 'bg-blue-500' },
  { label: 'Common Words', value: 34, total: 50, color: 'bg-green-500' },
  { label: 'Phrases', value: 8, total: 20, color: 'bg-purple-500' },
];

export function ProgressDashboard() {
  const maxMinutes = Math.max(...WEEKLY_PROGRESS.map(d => d.minutes));

  return (
    <div className="space-y-6">
      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Trophy className="size-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Score</div>
              <div className="text-2xl font-bold">1,247</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="size-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Accuracy</div>
              <div className="text-2xl font-bold">92%</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Flame className="size-6 text-orange-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Day Streak</div>
              <div className="text-2xl font-bold">7</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="size-6 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">This Week</div>
              <div className="text-2xl font-bold">285m</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Learning Progress */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Learning Progress</h3>
        <div className="space-y-6">
          {LEARNING_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{stat.label}</span>
                <span className="text-sm text-gray-600">
                  {stat.value}/{stat.total}
                </span>
              </div>
              <Progress 
                value={(stat.value / stat.total) * 100} 
                className="h-3"
              />
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Weekly Activity */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Weekly Activity</h3>
        <div className="flex items-end justify-between gap-2 h-48">
          {WEEKLY_PROGRESS.map((day, index) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(day.minutes / maxMinutes) * 100}%` }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                className="w-full bg-blue-500 rounded-t-lg relative group cursor-pointer hover:bg-blue-600 transition-colors"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {day.minutes}m • {day.accuracy}%
                </div>
              </motion.div>
              <div className="text-xs text-gray-600 font-medium">{day.day}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className={`p-4 ${
                    achievement.earned 
                      ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300' 
                      : 'bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.earned ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}>
                      <Icon className="size-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{achievement.title}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                    </div>
                    {achievement.earned && (
                      <Badge variant="secondary" className="bg-yellow-500 text-white">
                        Earned
                      </Badge>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
