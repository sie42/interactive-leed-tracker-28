
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { GoldFrameworkHelp } from "@/components/AppendixDrawer";

const goldTheories = [
  "Cognitive Load Theory",
  "Rosenshine's Principles",
  "Multimedia Learning Theory", 
  "Retrieval Practice Theory",
  "Desirable Difficulties Theory",
  "Trauma-Informed Pedagogy",
  "Universal Design for Learning"
];

const theoryDescriptions = {
  "Cognitive Load Theory": "Manage intrinsic, extraneous, and germane cognitive load to optimise learning processing capacity.",
  "Rosenshine's Principles": "Apply systematic instruction through daily review, small steps, guided practice, feedback, independent practice, and systematic review.",
  "Multimedia Learning Theory": "Combine visual and auditory information effectively using dual processing channels whilst managing cognitive load.",
  "Retrieval Practice Theory": "Strengthen memory and learning through active recall, spaced practice, and testing effects rather than passive review.",
  "Desirable Difficulties Theory": "Introduce appropriate challenges that enhance long-term learning and transfer without overwhelming cognitive capacity.",
  "Trauma-Informed Pedagogy": "Recognise and respond to the impact of trauma on learning, creating physically and emotionally safe learning environments.",
  "Universal Design for Learning": "Provide multiple means of representation, engagement, and action/expression to support diverse learners."
};

interface GoldFrameworkSelectorProps {
  selectedTheories: string[];
  onTheoryChange: (theory: string, checked: boolean) => void;
}

export const GoldFrameworkSelector = ({ selectedTheories, onTheoryChange }: GoldFrameworkSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          GOLD Framework Theories Applied
          <GoldFrameworkHelp />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {goldTheories.map((theory) => (
            <Collapsible key={theory}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={theory}
                  checked={selectedTheories.includes(theory)}
                  onCheckedChange={(checked) => onTheoryChange(theory, checked as boolean)}
                />
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:text-blue-600">
                  <Label htmlFor={theory} className="cursor-pointer">{theory}</Label>
                  <ChevronDown className="h-3 w-3" />
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="ml-6 mt-2">
                <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  {theoryDescriptions[theory as keyof typeof theoryDescriptions]}
                </p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
