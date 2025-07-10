
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Decision } from '@/pages/Index';

interface NetworkChartProps {
  decisions: Decision[];
}

interface Node {
  id: string;
  label: string;
  type: 'theory' | 'decision' | 'evidence';
  x: number;
  y: number;
  color: string;
  size: number;
}

interface Link {
  source: string;
  target: string;
  strength: number;
}

const THEORY_COLORS = ['#FF6B35', '#8B5CF6', '#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#6366F1'];

export const NetworkChart = ({ decisions }: NetworkChartProps) => {
  const { nodes, links } = useMemo(() => {
    const nodeMap = new Map<string, Node>();
    const linkMap = new Map<string, number>();
    
    // Create theory nodes
    const allTheories = new Set<string>();
    decisions.forEach(d => d.goldTheories.forEach(t => allTheories.add(t)));
    
    Array.from(allTheories).forEach((theory, index) => {
      const usageCount = decisions.filter(d => d.goldTheories.includes(theory)).length;
      nodeMap.set(theory, {
        id: theory,
        label: theory.replace(' Theory', ''),
        type: 'theory',
        x: Math.cos((index / allTheories.size) * 2 * Math.PI) * 100 + 200,
        y: Math.sin((index / allTheories.size) * 2 * Math.PI) * 100 + 150,
        color: THEORY_COLORS[index % THEORY_COLORS.length],
        size: Math.max(8, usageCount * 3)
      });
    });
    
    // Create decision nodes and links
    decisions.forEach((decision, index) => {
      const decisionId = `decision-${decision.id}`;
      nodeMap.set(decisionId, {
        id: decisionId,
        label: decision.title.substring(0, 20) + '...',
        type: 'decision',
        x: Math.random() * 300 + 50,
        y: Math.random() * 200 + 50,
        color: 'hsl(var(--primary))',
        size: 6
      });
      
      // Create links between decisions and theories
      decision.goldTheories.forEach(theory => {
        const linkId = `${theory}-${decisionId}`;
        linkMap.set(linkId, (linkMap.get(linkId) || 0) + 1);
      });
    });
    
    const links: Link[] = Array.from(linkMap.entries()).map(([linkId, strength]) => {
      const [source, target] = linkId.split('-decision-');
      return {
        source,
        target: `decision-${target}`,
        strength
      };
    });
    
    return {
      nodes: Array.from(nodeMap.values()),
      links
    };
  }, [decisions]);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">Theory-Decision Network</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 relative overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 400 300">
            {/* Links */}
            {links.map((link, index) => {
              const sourceNode = nodes.find(n => n.id === link.source);
              const targetNode = nodes.find(n => n.id === link.target);
              
              if (!sourceNode || !targetNode) return null;
              
              return (
                <line
                  key={index}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={Math.max(1, link.strength)}
                  strokeOpacity={0.3}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                />
              );
            })}
            
            {/* Nodes */}
            {nodes.map((node, index) => (
              <g key={node.id} className="cursor-pointer">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size}
                  fill={node.color}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                  className="hover:brightness-110 transition-all duration-200 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
                <text
                  x={node.x}
                  y={node.y + node.size + 12}
                  textAnchor="middle"
                  fontSize="8"
                  fill="hsl(var(--muted-foreground))"
                  className="pointer-events-none"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span>Decisions</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: THEORY_COLORS[0] }}></div>
              <span>GOLD Theories</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
