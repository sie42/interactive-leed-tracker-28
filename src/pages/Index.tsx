import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { PhaseNavigator } from "@/components/PhaseNavigator";
import { Dashboard } from "@/components/Dashboard";
import { DecisionsList } from "@/components/DecisionsList";
import { DecisionForm } from "@/components/DecisionForm";
import { ExportCenter } from "@/components/ExportCenter";
import { EmptyState } from "@/components/EmptyState";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
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
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState<Phase>("discovery");
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [showDecisionForm, setShowDecisionForm] = useState(false);
  const [editingDecision, setEditingDecision] = useState<Decision | null>(null);
  const [loading, setLoading] = useState(true);

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Load user's decisions from Supabase
  useEffect(() => {
    if (user) {
      loadDecisions();
    }
  }, [user]);

  const loadDecisions = async () => {
    try {
      const { data, error } = await supabase
        .from('decisions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        toast.error('Failed to load decisions');
        console.error('Error loading decisions:', error);
        return;
      }

      // Transform database format to component format
      const transformedDecisions: Decision[] = data.map(dbDecision => ({
        id: dbDecision.id,
        phase: dbDecision.phase as Phase,
        date: new Date(dbDecision.date).toISOString().split('T')[0],
        title: dbDecision.title,
        rationale: dbDecision.rationale || '',
        evidence: dbDecision.evidence || '',
        goldTheories: dbDecision.gold_theories || [],
        evidenceSources: dbDecision.evidence_sources || [],
        alternatives: dbDecision.alternatives || '',
        aiTools: dbDecision.ai_tools || '',
        qualityAssurance: dbDecision.quality_assurance || '',
        risks: dbDecision.risks || '',
        evaluation: dbDecision.evaluation || '',
        successMetrics: dbDecision.success_metrics || [],
        timeline: dbDecision.timeline || '',
        owner: dbDecision.owner || '',
      }));

      setDecisions(transformedDecisions);
    } catch (error) {
      toast.error('Failed to load decisions');
      console.error('Error loading decisions:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSaveDecision = async (decision: Decision) => {
    if (!user) return;

    try {
      // Transform component format to database format
      const dbDecision = {
        user_id: user.id,
        phase: decision.phase,
        date: new Date(decision.date).toISOString(),
        title: decision.title,
        rationale: decision.rationale,
        evidence: decision.evidence,
        gold_theories: decision.goldTheories,
        evidence_sources: decision.evidenceSources,
        alternatives: decision.alternatives,
        ai_tools: decision.aiTools,
        quality_assurance: decision.qualityAssurance,
        risks: decision.risks,
        evaluation: decision.evaluation,
        success_metrics: decision.successMetrics,
        timeline: decision.timeline,
        owner: decision.owner,
      };

      if (editingDecision) {
        const { error } = await supabase
          .from('decisions')
          .update(dbDecision)
          .eq('id', decision.id);
        
        if (error) throw error;
        
        setDecisions(prev => prev.map(d => d.id === decision.id ? decision : d));
        toast.success("Decision updated successfully!");
      } else {
        const { data, error } = await supabase
          .from('decisions')
          .insert([dbDecision])
          .select()
          .single();
        
        if (error) throw error;
        
        const newDecision = { ...decision, id: data.id };
        setDecisions(prev => [newDecision, ...prev]);
        toast.success("Decision saved successfully!");
      }
    } catch (error) {
      toast.error("Failed to save decision");
      console.error('Error saving decision:', error);
    }
    
    setShowDecisionForm(false);
    setEditingDecision(null);
  };

  const handleEditDecision = (decision: Decision) => {
    setEditingDecision(decision);
    setShowDecisionForm(true);
  };

  const handleDeleteDecision = async (id: string) => {
    try {
      const { error } = await supabase
        .from('decisions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setDecisions(prev => prev.filter(d => d.id !== id));
      toast.success("Decision deleted");
    } catch (error) {
      toast.error("Failed to delete decision");
      console.error('Error deleting decision:', error);
    }
  };

  const currentPhaseDecisions = decisions.filter(d => d.phase === currentPhase);

  // Show loading spinner while checking auth or loading data
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return null;
  }

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
            <UserMenu />
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
