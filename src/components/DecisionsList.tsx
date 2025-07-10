
import { Decision } from "@/pages/Index";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Calendar, User } from "lucide-react";

interface DecisionsListProps {
  decisions: Decision[];
  onEdit: (decision: Decision) => void;
  onDelete: (id: string) => void;
}

export const DecisionsList = ({ decisions, onEdit, onDelete }: DecisionsListProps) => {
  return (
    <div className="space-y-4">
      {decisions.map((decision) => (
        <Card key={decision.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{decision.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(decision.date).toLocaleDateString()}
                  </div>
                  {decision.owner && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {decision.owner}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(decision)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(decision.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4 line-clamp-3">{decision.rationale}</p>
            
            {decision.goldTheories.length > 0 && (
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-600 mb-2">GOLD Theories Applied:</h4>
                <div className="flex flex-wrap gap-1">
                  {decision.goldTheories.map((theory) => (
                    <Badge key={theory} variant="secondary" className="text-xs">
                      {theory.replace(' Theory', '')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {decision.evidenceSources.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Evidence Sources:</h4>
                <div className="flex flex-wrap gap-1">
                  {decision.evidenceSources.map((source) => (
                    <Badge key={source} variant="outline" className="text-xs">
                      {source.replace(' Research', '').replace(' Literature', '')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
