
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface DecisionAdditionalFieldsProps {
  formData: {
    alternatives: string;
    aiTools: string;
    risks: string;
    evaluation: string;
  };
  onChange: (field: string, value: string) => void;
}

export const DecisionAdditionalFields = ({ formData, onChange }: DecisionAdditionalFieldsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="alternatives">Alternatives Considered</Label>
        <Textarea
          id="alternatives"
          value={formData.alternatives}
          onChange={(e) => onChange('alternatives', e.target.value)}
          placeholder="What other options were considered? Why were they rejected?"
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="aiTools">AI Tools/Methods Integration</Label>
        <Textarea
          id="aiTools"
          value={formData.aiTools}
          onChange={(e) => onChange('aiTools', e.target.value)}
          placeholder="Which AI tools or methods are involved? How do they align with cognitive science principles?"
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="risks">Risks & Mitigation</Label>
        <Textarea
          id="risks"
          value={formData.risks}
          onChange={(e) => onChange('risks', e.target.value)}
          placeholder="What risks does this decision introduce? How will they be managed?"
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="evaluation">Evaluation Plan</Label>
        <Textarea
          id="evaluation"
          value={formData.evaluation}
          onChange={(e) => onChange('evaluation', e.target.value)}
          placeholder="How will you evaluate whether this decision was effective against GOLD Framework principles?"
          rows={3}
        />
      </div>
    </div>
  );
};
