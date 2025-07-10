
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from "lucide-react";

export const GettingStartedGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      step: 1,
      title: "Choose Your Phase",
      description: "Start with Discovery and work through each phase sequentially. Each phase builds on decisions from previous phases."
    },
    {
      step: 2,
      title: "Document Key Decisions",
      description: "Click 'Document Decision' to record important choices. Include rationale and evidence backing each decision."
    },
    {
      step: 3,
      title: "Apply GOLD Framework",
      description: "Select relevant learning science theories (GOLD Framework) that support your decision-making process."
    },
    {
      step: 4,
      title: "Use AI Assistance",
      description: "Click 'Smart AI Assist' in the decision form to get contextual suggestions based on your selected theories."
    },
    {
      step: 5,
      title: "Track & Export",
      description: "Monitor your progress in the dashboard and export professional reports when ready to share."
    }
  ];

  return (
    <Card className="mb-6 border-primary/20 bg-primary/5">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-primary/10 transition-colors">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Getting Started with the Interactive LEED Tracker
              </div>
              {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <p className="text-muted-foreground mb-4">
              Follow this 5-step workflow to effectively document your learning engineering decisions with evidence-based rationale:
            </p>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step.step} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground mt-1" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Pro Tip:</strong> Use the AI Assist feature to get contextual suggestions based on learning science principles and your current phase.
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
