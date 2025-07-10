
import { Decision } from "@/pages/Index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedBarChart } from "./charts/EnhancedBarChart";
import { EnhancedPieChart } from "./charts/EnhancedPieChart";
import { TimelineChart } from "./charts/TimelineChart";
import { NetworkChart } from "./charts/NetworkChart";
import { useState } from "react";
import { toast } from "sonner";

interface DashboardProps {
  decisions: Decision[];
}

const THEORY_COLOURS = ['#FF6B35', '#8B5CF6', '#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#6366F1'];

const goldTheories = [
  "Cognitive Load Theory",
  "Rosenshine's Principles",
  "Multimedia Learning Theory",
  "Retrieval Practice Theory",
  "Desirable Difficulties Theory",
  "Trauma-Informed Pedagogy",
  "Universal Design for Learning"
];

export const Dashboard = ({ decisions }: DashboardProps) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const phaseData = [
    { phase: 'Discovery', decisions: decisions.filter(d => d.phase === 'discovery').length },
    { phase: 'Design', decisions: decisions.filter(d => d.phase === 'design').length },
    { phase: 'Development', decisions: decisions.filter(d => d.phase === 'development').length },
    { phase: 'Delivery', decisions: decisions.filter(d => d.phase === 'delivery').length },
    { phase: 'Evaluation', decisions: decisions.filter(d => d.phase === 'evaluation').length },
  ];

  const theoryUsage = goldTheories.map(theory => ({
    name: theory.replace(' Theory', '').replace('Rosenshine\'s Principles', 'Rosenshine\'s'),
    value: decisions.filter(d => d.goldTheories.includes(theory)).length
  })).filter(item => item.value > 0);

  const evidenceTypes = [
    'Cognitive Science Research',
    'Organisational Learning Data',
    'Learner Feedback/Preferences',
    'Previous Design Experience',
    'Learning Science Consultation',
    'Pilot Implementation Results',
    'Stakeholder Requirements',
    'Accessibility/Inclusion Audits'
  ];

  const evidenceData = evidenceTypes.map(type => ({
    name: type.replace(' Research', '').replace('/', '/\n'),
    value: decisions.filter(d => d.evidenceSources.includes(type)).length
  })).filter(item => item.value > 0);

  const handleBarClick = (data: any) => {
    setSelectedPhase(data.phase);
    toast.info(`Filtered by ${data.phase} phase`);
  };

  const handleDecisionClick = (decision: Decision) => {
    toast.info(`Viewing details for: ${decision.title}`);
  };

  const handleTheoryClick = (data: any) => {
    toast.info(`Showing decisions using: ${data.name}`);
  };

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg">Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-delivery animate-scale-in">
                {decisions.length}
              </div>
              <div className="text-sm text-gray-600">Total Decisions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-development animate-scale-in" style={{ animationDelay: '200ms' }}>
                {new Set(decisions.flatMap(d => d.goldTheories)).size}
              </div>
              <div className="text-sm text-gray-600">GOLD Theories Used</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EnhancedBarChart
        data={phaseData}
        title="Decisions by Phase"
        onBarClick={handleBarClick}
      />

      {decisions.length > 0 && (
        <TimelineChart
          decisions={decisions}
          onPointClick={handleDecisionClick}
        />
      )}

      {theoryUsage.length > 0 && (
        <EnhancedPieChart
          data={theoryUsage}
          title="GOLD Framework Usage"
          colors={THEORY_COLOURS}
          onSegmentClick={handleTheoryClick}
        />
      )}

      {decisions.length > 0 && (
        <NetworkChart decisions={decisions} />
      )}

      {evidenceData.length > 0 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Evidence Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {evidenceData.map((item, index) => (
                <div 
                  key={item.name} 
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-sm font-medium">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-development transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, (item.value / Math.max(...evidenceData.map(d => d.value))) * 100)}%`,
                          animationDelay: `${index * 100 + 300}ms`
                        }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8 text-right">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
