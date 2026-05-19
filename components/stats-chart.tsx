'use client';

import { Car } from '@/lib/types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatNumber } from '@/lib/utils';

interface StatsChartProps {
  car: Car;
  variant?: 'radar' | 'comparison';
  comparisonCar?: Car;
}

interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export function StatsChart({
  car,
  variant = 'radar',
  comparisonCar,
}: StatsChartProps) {
  const stats = [
    { name: 'Speed', value: Math.min((car.stats?.speed || 0) / 250 * 100, 100) },
    { name: 'Handling', value: (car.stats?.handling || 0) * 10 },
    { name: 'Acceleration', value: (car.stats?.acceleration || 0) * 10 },
    { name: 'Launch', value: (car.stats?.launch || 0) * 10 },
    { name: 'Braking', value: (car.stats?.braking_100_to_0_mph || 0) * 10 },
    { name: 'Offroad', value: (car.stats?.offroad || 0) * 10 },
  ].filter((stat) => stat.value > 0);

  if (stats.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 bg-card rounded-lg border border-border">
        <p className="text-text-muted">Performance data not available</p>
      </div>
    );
  }

  const chartData: ChartData[] = stats.map((stat) => ({
    name: stat.name,
    [car.name]: Math.min(stat.value, 100),
    ...(comparisonCar && {
      [comparisonCar.name]: comparisonCar.stats
        ? Math.min(
          {
            Speed: (comparisonCar.stats.speed || 0) / 250 * 100,
            Handling: (comparisonCar.stats.handling || 0) * 10,
            Acceleration: (comparisonCar.stats.acceleration || 0) * 10,
            Launch: (comparisonCar.stats.launch || 0) * 10,
            Braking: (comparisonCar.stats.braking_100_to_0_mph || 0) * 10,
            Offroad: (comparisonCar.stats.offroad || 0) * 10,
          }[stat.name] || 0,
          100
        )
        : 0,
    }),
  }));

  return (
    <div className="w-full h-80 bg-card rounded-lg border border-border p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={chartData}
          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
        >
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="name" tick={{ fontSize: 12, fill: '#E2E8F0' }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 12, fill: '#94A3B8' }} />
          <Radar
            name={car.name}
            dataKey={car.name}
            stroke="#00D9FF"
            fill="#00D9FF"
            fillOpacity={0.5}
          />
          {comparisonCar && (
            <Radar
              name={comparisonCar.name}
              dataKey={comparisonCar.name}
              stroke="#FF0055"
              fill="#FF0055"
              fillOpacity={0.3}
            />
          )}
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              color: '#F1F5F9',
              fontSize: '12px',
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#F1F5F9',
            }}
            formatter={(value) => formatNumber(value as number)}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
