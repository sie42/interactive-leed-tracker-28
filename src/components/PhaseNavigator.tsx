
import { Phase, Decision } from "@/pages/Index";
import { cn } from "@/lib/utils";

interface PhaseNavigatorProps {
  currentPhase: Phase;
  onPhaseChange: (phase: Phase) => void;
  decisions: Decision[];
}

const phases: { key: Phase; label: string; colorClass: string; bgClass: string; lightBgClass: string }[] = [
  { 
    key: "discovery", 
    label: "Discovery", 
    colorClass: "text-discovery", 
    bgClass: "bg-discovery",
    lightBgClass: "bg-discovery-light"
  },
  { 
    key: "design", 
    label: "Design", 
    colorClass: "text-design", 
    bgClass: "bg-design",
    lightBgClass: "bg-design-light"
  },
  { 
    key: "development", 
    label: "Development", 
    colorClass: "text-development", 
    bgClass: "bg-development",
    lightBgClass: "bg-development-light"
  },
  { 
    key: "delivery", 
    label: "Delivery", 
    colorClass: "text-delivery", 
    bgClass: "bg-delivery",
    lightBgClass: "bg-delivery-light"
  },
  { 
    key: "evaluation", 
    label: "Evaluation", 
    colorClass: "text-evaluation", 
    bgClass: "bg-evaluation",
    lightBgClass: "bg-evaluation-light"
  },
];

export const PhaseNavigator = ({ currentPhase, onPhaseChange, decisions }: PhaseNavigatorProps) => {
  const getPhaseProgress = (phase: Phase) => {
    const phaseDecisions = decisions.filter(d => d.phase === phase);
    return phaseDecisions.length;
  };

  const getCurrentPhaseData = () => phases.find(p => p.key === currentPhase);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-2">
      <div className="flex space-x-1">
        {phases.map((phase) => {
          const isActive = currentPhase === phase.key;
          const hasDecisions = getPhaseProgress(phase.key) > 0;
          
          return (
            <button
              key={phase.key}
              onClick={() => onPhaseChange(phase.key)}
              className={cn(
                "flex-1 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200",
                "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                isActive
                  ? `${phase.lightBgClass} ${phase.colorClass} border border-current border-opacity-30`
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <div className="flex items-center justify-center space-x-2">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors",
                    isActive ? phase.bgClass : hasDecisions ? phase.bgClass : "bg-gray-300"
                  )}
                />
                <span>{phase.label}</span>
                {getPhaseProgress(phase.key) > 0 && (
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    isActive 
                      ? `${phase.bgClass} text-white`
                      : "bg-blue-100 text-blue-800"
                  )}>
                    {getPhaseProgress(phase.key)}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
