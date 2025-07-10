
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Decision } from '@/pages/Index';

interface TimelineChartProps {
  decisions: Decision[];
  onPointClick?: (decision: Decision) => void;
}

const PHASE_COLORS = {
  'discovery': 'hsl(25, 95%, 53%)',
  'design': 'hsl(271, 81%, 56%)', 
  'development': 'hsl(142, 76%, 36%)',
  'delivery': 'hsl(217, 91%, 60%)',
  'evaluation': 'hsl(45, 93%, 47%)'
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const decision = payload[0].payload.decision;
    return (
      <div className="bg-background border border-border rounded-lg p-4 shadow-lg animate-fade-in max-w-xs">
        <p className="font-semibold text-foreground">{decision.title}</p>
        <p className="text-sm text-muted-foreground capitalize mb-1">
          {decision.phase} Phase
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(decision.date).toLocaleDateString()}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Click to view details
        </p>
      </div>
    );
  }
  return null;
};

const CustomDot = ({ cx, cy, payload, onPointClick }: any) => {
  const decision = payload.decision;
  
  const handleClick = () => {
    if (onPointClick) {
      onPointClick(decision);
    }
  };
  
  return (
    <Dot
      cx={cx}
      cy={cy}
      r={6}
      fill={PHASE_COLORS[decision.phase as keyof typeof PHASE_COLORS]}
      stroke="hsl(var(--background))"
      strokeWidth={2}
      className="cursor-pointer hover:r-8 transition-all duration-200"
      onClick={handleClick}
    />
  );
};

export const TimelineChart = ({ decisions, onPointClick }: TimelineChartProps) => {
  const timelineData = decisions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((decision, index) => ({
      x: index,
      y: Math.random() * 5 + 1, // Distribute vertically for better visibility
      decision,
      date: new Date(decision.date).toLocaleDateString()
    }));

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">Decision Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date"
                fontSize={10}
                stroke="hsl(var(--muted-foreground))"
                interval="preserveStartEnd"
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="y"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                dot={<CustomDot onPointClick={onPointClick} />}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
