import { useState } from "react";
import { PhaseNavigator } from "@/components/PhaseNavigator";
import { Dashboard } from "@/components/Dashboard";
import { DecisionsList } from "@/components/DecisionsList";
import { DecisionForm } from "@/components/DecisionForm";
import { ExportCenter } from "@/components/ExportCenter";
import { EmptyState } from "@/components/EmptyState";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { QuickReferenceButton } from "@/components/AppendixDrawer";
import { GettingStartedGuide } from "@/components/GettingStartedGuide";

export type Phase = "discovery" | "design" | "development" | "delivery" | "evaluation";

export interface Decision {
  id: string;
  phase: Phase;
  date: string;
  title: string;
  rationale: string;
  evidence: string;
  goldTheories: string[];
  evidenceSources: string[];
  alternatives: string;
  aiTools: string;
  qualityAssurance: string;
  risks: string;
  evaluation: string;
  successMetrics: string[];
  timeline: string;
  owner: string;
}

const Index = () => {
  const [currentPhase, setCurrentPhase] = useState<Phase>("discovery");
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [showDecisionForm, setShowDecisionForm] = useState(false);
  const [editingDecision, setEditingDecision] = useState<Decision | null>(null);

  const getPhaseColor = (phase: Phase) => {
    const colors = {
      discovery: "bg-discovery hover:bg-discovery/90",
      design: "bg-design hover:bg-design/90", 
      development: "bg-development hover:bg-development/90",
      delivery: "bg-delivery hover:bg-delivery/90",
      evaluation: "bg-evaluation hover:bg-evaluation/90"
    };
    return colors[phase];
  };

  const handleSaveDecision = (decision: Decision) => {
    if (editingDecision) {
      setDecisions(prev => prev.map(d => d.id === decision.id ? decision : d));
      toast.success("Decision updated successfully!");
    } else {
      setDecisions(prev => [...prev, decision]);
      toast.success("Decision saved successfully!");
    }
    setShowDecisionForm(false);
    setEditingDecision(null);
  };

  const handleEditDecision = (decision: Decision) => {
    setEditingDecision(decision);
    setShowDecisionForm(true);
  };

  const handleDeleteDecision = (id: string) => {
    setDecisions(prev => prev.filter(d => d.id !== id));
    toast.success("Decision deleted");
  };

  const currentPhaseDecisions = decisions.filter(d => d.phase === currentPhase);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Interactive LEED Tracker
            </h1>
            <p className="text-muted-foreground">
              Learning Engineering Evidence & Decisions Tool
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <QuickReferenceButton />
          </div>
        </div>

        <GettingStartedGuide />

        <PhaseNavigator
          currentPhase={currentPhase}
          onPhaseChange={setCurrentPhase}
          decisions={decisions}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
          <div className="xl:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold capitalize text-foreground">
                {currentPhase} Phase
              </h2>
              <Button
                onClick={() => setShowDecisionForm(true)}
                className={`flex items-center gap-2 text-white ${getPhaseColor(currentPhase)}`}
              >
                <Plus className="h-4 w-4" />
                Document Decision
              </Button>
            </div>

            {currentPhaseDecisions.length === 0 ? (
              <EmptyState
                phase={currentPhase}
                onCreateDecision={() => setShowDecisionForm(true)}
              />
            ) : (
              <DecisionsList
                decisions={currentPhaseDecisions}
                onEdit={handleEditDecision}
                onDelete={handleDeleteDecision}
              />
            )}
          </div>

          <div className="space-y-6">
            <Dashboard decisions={decisions} />
            <ExportCenter decisions={decisions} />
          </div>
        </div>
      </div>

      {showDecisionForm && (
        <DecisionForm
          phase={currentPhase}
          decision={editingDecision}
          onSave={handleSaveDecision}
          onClose={() => {
            setShowDecisionForm(false);
            setEditingDecision(null);
          }}
        />
      )}
    </div>
  );
};

export default Index;
