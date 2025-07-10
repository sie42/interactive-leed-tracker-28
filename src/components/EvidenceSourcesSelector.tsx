
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { EvidenceGuidelinesHelp } from "@/components/AppendixDrawer";

const evidenceSources = [
  "Cognitive Science Research Literature",
  "Organisational Learning Data",
  "Learner Feedback and Preferences",
  "Previous Learning Design Experience",
  "Learning Science Expert Consultation",
  "Pilot Implementation Results",
  "Stakeholder Requirements Input",
  "Accessibility and Inclusion Audits"
];

interface EvidenceSourcesSelectorProps {
  selectedSources: string[];
  onSourceChange: (source: string, checked: boolean) => void;
}

export const EvidenceSourcesSelector = ({ selectedSources, onSourceChange }: EvidenceSourcesSelectorProps) => {
  return (
    <div>
      <Label className="text-sm font-medium flex items-center gap-2">
        Evidence Sources
        <EvidenceGuidelinesHelp />
      </Label>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {evidenceSources.map((source) => (
          <div key={source} className="flex items-center space-x-2">
            <Checkbox
              id={source}
              checked={selectedSources.includes(source)}
              onCheckedChange={(checked) => onSourceChange(source, checked as boolean)}
            />
            <Label htmlFor={source} className="text-xs cursor-pointer">
              {source}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
