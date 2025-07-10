
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EnhancedBarChartProps {
  data: Array<{ phase: string; decisions: number }>;
  title: string;
  onBarClick?: (data: any) => void;
}

const PHASE_COLORS = {
  'Discovery': 'hsl(25, 95%, 53%)',
  'Design': 'hsl(271, 81%, 56%)', 
  'Development': 'hsl(142, 76%, 36%)',
  'Delivery': 'hsl(217, 91%, 60%)',
  'Evaluation': 'hsl(45, 93%, 47%)'
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-4 shadow-lg animate-fade-in">
        <p className="font-semibold text-foreground">{`${label} Phase`}</p>
        <p className="text-sm text-muted-foreground mb-2">
          {`${payload[0].value} decisions documented`}
        </p>
        <div className="text-xs text-muted-foreground">
          Click to filter by this phase
        </div>
      </div>
    );
  }
  return null;
};

export const EnhancedBarChart = ({ data, title, onBarClick }: EnhancedBarChartProps) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="phase" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                fontSize={12} 
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="decisions" 
                radius={[4, 4, 0, 0]}
                cursor="pointer"
                onClick={onBarClick}
                className="transition-all duration-300 hover:opacity-80"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={PHASE_COLORS[entry.phase as keyof typeof PHASE_COLORS] || '#3B82F6'}
                    className="hover:brightness-110 transition-all duration-200"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
