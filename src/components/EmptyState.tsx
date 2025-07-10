
import { Phase } from "@/pages/Index";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Lightbulb, Cog, Rocket, BarChart } from "lucide-react";

interface EmptyStateProps {
  phase: Phase;
  onCreateDecision: () => void;
}

const phaseInfo = {
  discovery: {
    icon: Lightbulb,
    title: "Discovery Phase",
    description: "Evidence-based needs analysis, stakeholder assessment, and organisational learning design maturity evaluation using GOLD Framework principles.",
    keyActivities: [
      "Stakeholder needs assessment with cognitive science lens",
      "Learning context analysis and environmental factors", 
      "Cognitive load baseline evaluation",
      "Organisational AI learning design capability assessment",
      "Trauma-informed pedagogical considerations",
      "Accessibility and inclusion requirements mapping"
    ]
  },
  design: {
    icon: FileText,
    title: "Design Phase", 
    description: "Apply GOLD Framework to learning architecture, ensuring cognitive load management, systematic instruction design, and inclusive learning pathways.",
    keyActivities: [
      "Learning architecture design using Rosenshine's Principles",
      "Cognitive load optimisation across intrinsic, extraneous, and germane processing",
      "Multimedia learning design for visual-verbal processing",
      "Universal Design for Learning implementation",
      "Trauma-informed pedagogical architecture",
      "Strategic AI integration planning"
    ]
  },
  development: {
    icon: Cog,
    title: "Development Phase",
    description: "Implement quality-assured AI-enhanced content creation with systematic multimedia design, retrieval practice integration, and inclusive development processes.",
    keyActivities: [
      "Evidence-based content creation and curation",
      "AI tool integration with cognitive science evaluation", 
      "Quality assurance processes against GOLD Framework standards",
      "Retrieval practice and spaced learning implementation",
      "Desirable difficulties calibration",
      "Accessibility and trauma-informed content development"
    ]
  },
  delivery: {
    icon: Rocket,
    title: "Delivery Phase",
    description: "Optimise facilitation within cognitive boundaries, implement systematic instruction principles, and maintain inclusive learning environments.",
    keyActivities: [
      "Facilitation optimisation using Rosenshine's Principles",
      "Cognitive load management during delivery",
      "Multimedia learning optimisation",
      "Desirable difficulties real-time calibration", 
      "Trauma-informed delivery practices",
      "Universal accessibility maintenance"
    ]
  },
  evaluation: {
    icon: BarChart,
    title: "Evaluation Phase",
    description: "Measure learning effectiveness against GOLD Framework principles, assess cognitive science adherence, and plan evidence-based improvements.",
    keyActivities: [
      "Learning outcome measurement across multiple domains",
      "GOLD framework adherence assessment",
      "AI integration effectiveness evaluation",
      "Inclusive learning impact assessment",
      "Trauma-informed practice evaluation", 
      "Continuous improvement planning"
    ]
  }
};

export const EmptyState = ({ phase, onCreateDecision }: EmptyStateProps) => {
  const info = phaseInfo[phase];
  const Icon = info.icon;

  return (
    <Card className="border-dashed border-2 border-muted-foreground/30">
      <CardContent className="p-8 text-center">
        <Icon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-foreground">{info.title}</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{info.description}</p>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold mb-4 text-blue-800 dark:text-blue-200 text-center">
            How to Get Started:
          </h4>
          <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2 text-left max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
              <span>Click "Document Your First Decision" to record a key choice for this phase</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
              <span>Select relevant GOLD Framework theories that support your decision</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
              <span>Use "Smart AI Assist" for contextual suggestions and evidence-based rationale</span>
            </div>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-6 mb-6 text-left">
          <h4 className="font-medium mb-4 text-foreground text-center">Key Activities for This Phase:</h4>
          <ul className="text-sm text-muted-foreground space-y-3 list-none">
            {info.keyActivities.map((activity, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                <span className="flex-1 leading-relaxed">{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button onClick={onCreateDecision} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Document Your First Decision
        </Button>
        
        <p className="text-sm text-muted-foreground mt-4">
          Start building evidence-based documentation with GOLD Framework integration
        </p>
      </CardContent>
    </Card>
  );
};
