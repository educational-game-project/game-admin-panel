import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import type { PerformanceChartProps } from '../../../types';

function PerformanceChart({
  currentvalue,
  totalValue,
  baseColor,
}: PerformanceChartProps) {
  const chartColors = [baseColor, `${baseColor}4d`];
  const currentVal = currentvalue || 0;
  const totalVal = totalValue || 0;

  const data = [
    { name: 'Aktif', value: currentVal },
    { name: 'Total Item', value: totalVal - currentVal },
  ];

  return (
    <div className="w-full h-16">
      <ResponsiveContainer>
        <PieChart
          width={400}
          height={200}>
          <Pie
            cx="50%"
            cy="95%"
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius={24}
            outerRadius={48}
            fill="#8884d8"
            paddingAngle={4}
            blendStroke
            dataKey="value">
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartColors[index % chartColors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceChart;
