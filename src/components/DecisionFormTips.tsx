
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Target, Shield, BarChart } from "lucide-react";
import { Phase } from "@/pages/Index";

interface DecisionFormTipsProps {
  phase: Phase;
}

const phaseTips = {
  discovery: {
    icon: Lightbulb,
    title: "Discovery Phase Tips",
    tips: [
      "Focus on stakeholder needs assessment and learning context analysis",
      "Document evidence from learner feedback, organisational data, and expert consultation", 
      "Consider cognitive load baseline and accessibility requirements",
      "Use AI Assist to get suggestions for learning science-based needs analysis"
    ]
  },
  design: {
    icon: Target,
    title: "Design Phase Tips", 
    tips: [
      "Apply Rosenshine's Principles and cognitive load theory to learning architecture",
      "Document how design decisions support systematic instruction principles",
      "Consider multimedia learning and Universal Design for Learning implementation",
      "Use AI Assist to align design choices with GOLD Framework theories"
    ]
  },
  development: {
    icon: Shield,
    title: "Development Phase Tips",
    tips: [
      "Document quality assurance processes against GOLD Framework standards",
      "Include AI tool integration with learning science evaluation",
      "Consider retrieval practice and spaced learning implementation",
      "Use AI Assist to ensure content development follows evidence-based practices"
    ]
  },
  delivery: {
    icon: Target,
    title: "Delivery Phase Tips",
    tips: [
      "Focus on facilitation optimisation using systematic instruction principles",
      "Document real-time cognitive load management strategies",
      "Include trauma-informed delivery practices and accessibility maintenance",
      "Use AI Assist to optimise delivery against learning science principles"
    ]
  },
  evaluation: {
    icon: BarChart,
    title: "Evaluation Phase Tips",
    tips: [
      "Measure learning outcomes across multiple domains and assessment types",
      "Document GOLD framework adherence and AI integration effectiveness",
      "Include inclusive learning impact assessment and continuous improvement plans",
      "Use AI Assist to design comprehensive evaluation strategies"
    ]
  }
};

export const DecisionFormTips = ({ phase }: DecisionFormTipsProps) => {
  const tips = phaseTips[phase];
  const Icon = tips.icon;

  return (
    <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <h4 className="font-medium text-blue-800 dark:text-blue-200">{tips.title}</h4>
        </div>
        <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
          {tips.tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
