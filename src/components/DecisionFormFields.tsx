
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface DecisionFormFieldsProps {
  formData: {
    title: string;
    owner: string;
    rationale: string;
  };
  onChange: (field: string, value: string) => void;
}

export const DecisionFormFields = ({ formData, onChange }: DecisionFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Decision Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="What decision was made?"
            required
          />
        </div>
        <div>
          <Label htmlFor="owner">Decision Owner</Label>
          <Input
            id="owner"
            value={formData.owner}
            onChange={(e) => onChange('owner', e.target.value)}
            placeholder="Who made this decision?"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="rationale">Rationale & Evidence *</Label>
        <Textarea
          id="rationale"
          value={formData.rationale}
          onChange={(e) => onChange('rationale', e.target.value)}
          placeholder="Why was this decision made? What evidence supports it?"
          rows={4}
          required
        />
      </div>
    </>
  );
};
