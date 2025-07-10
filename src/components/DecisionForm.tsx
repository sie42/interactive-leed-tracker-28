
import { useState, useEffect } from "react";
import { Decision, Phase } from "@/pages/Index";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { generateAISuggestions } from "@/utils/aiSuggestionUtils";
import { DecisionFormFields } from "@/components/DecisionFormFields";
import { GoldFrameworkSelector } from "@/components/GoldFrameworkSelector";
import { EvidenceSourcesSelector } from "@/components/EvidenceSourcesSelector";
import { DecisionAdditionalFields } from "@/components/DecisionAdditionalFields";
import { DecisionFormTips } from "@/components/DecisionFormTips";

interface DecisionFormProps {
  phase: Phase;
  decision?: Decision | null;
  onSave: (decision: Decision) => void;
  onClose: () => void;
}

export const DecisionForm = ({ phase, decision, onSave, onClose }: DecisionFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    rationale: "",
    evidence: "",
    goldTheories: [] as string[],
    evidenceSources: [] as string[],
    alternatives: "",
    aiTools: "",
    qualityAssurance: "",
    risks: "",
    evaluation: "",
    successMetrics: [] as string[],
    timeline: "",
    owner: ""
  });

  useEffect(() => {
    if (decision) {
      setFormData({
        title: decision.title,
        rationale: decision.rationale,
        evidence: decision.evidence,
        goldTheories: decision.goldTheories,
        evidenceSources: decision.evidenceSources,
        alternatives: decision.alternatives,
        aiTools: decision.aiTools,
        qualityAssurance: decision.qualityAssurance,
        risks: decision.risks,
        evaluation: decision.evaluation,
        successMetrics: decision.successMetrics,
        timeline: decision.timeline,
        owner: decision.owner
      });
    }
  }, [decision]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.rationale.trim()) {
      toast.error("Please fill in the required fields (title and rationale)");
      return;
    }

    const decisionData: Decision = {
      id: decision?.id || `decision-${Date.now()}`,
      phase,
      date: decision?.date || new Date().toISOString(),
      ...formData
    };

    onSave(decisionData);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTheoryChange = (theory: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      goldTheories: checked 
        ? [...prev.goldTheories, theory]
        : prev.goldTheories.filter(t => t !== theory)
    }));
  };

  const handleEvidenceSourceChange = (source: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      evidenceSources: checked
        ? [...prev.evidenceSources, source]
        : prev.evidenceSources.filter(s => s !== source)
    }));
  };

  const handleAiAssist = () => {
    if (formData.goldTheories.length === 0) {
      toast.error("Please select at least one GOLD theory to get AI assistance");
      return;
    }
    
    const suggestions = generateAISuggestions(phase, formData.goldTheories, formData.title || "");
    
    setFormData(prev => ({
      ...prev,
      rationale: prev.rationale + (prev.rationale ? '\n\n' : '') + suggestions.rationale,
      risks: prev.risks + (prev.risks ? '\n\n' : '') + suggestions.risks,
      evaluation: prev.evaluation + (prev.evaluation ? '\n\n' : '') + suggestions.evaluation,
      alternatives: prev.alternatives + (prev.alternatives ? '\n\n' : '') + suggestions.alternatives
    }));
    
    toast.success("AI suggestions added based on selected GOLD theories and phase context");
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Document Decision - <Badge variant="outline" className="capitalise">{phase}</Badge>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAiAssist}
              className="ml-auto flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200 dark:from-blue-950/50 dark:to-purple-950/50 dark:hover:from-blue-900/60 dark:hover:to-purple-900/60 dark:border-blue-700 dark:text-blue-200"
            >
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Smart AI Assist
            </Button>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-6 p-1">
            <DecisionFormTips phase={phase} />

            <DecisionFormFields 
              formData={{
                title: formData.title,
                owner: formData.owner,
                rationale: formData.rationale
              }}
              onChange={handleFieldChange}
            />

            <GoldFrameworkSelector 
              selectedTheories={formData.goldTheories}
              onTheoryChange={handleTheoryChange}
            />

            <EvidenceSourcesSelector 
              selectedSources={formData.evidenceSources}
              onSourceChange={handleEvidenceSourceChange}
            />

            <Separator />

            <DecisionAdditionalFields 
              formData={{
                alternatives: formData.alternatives,
                aiTools: formData.aiTools,
                risks: formData.risks,
                evaluation: formData.evaluation
              }}
              onChange={handleFieldChange}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {decision ? "Update Decision" : "Save Decision"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
