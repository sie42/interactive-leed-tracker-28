import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Award, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const evidenceQualityLevels = [
  {
    level: "Gold Standard",
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    icon: Award,
    description: "Highest quality evidence with rigorous methodology and clear applicability",
    criteria: [
      "Peer-reviewed research with large sample sizes",
      "Randomised controlled trials or systematic reviews",
      "Direct relevance to your learning context and population",
      "Recent publication (within last 5 years for most fields)",
      "Replication across multiple studies",
      "Clear methodology and transparent reporting"
    ]
  },
  {
    level: "Silver Standard", 
    color: "bg-gray-400",
    textColor: "text-gray-700",
    icon: CheckCircle,
    description: "Good quality evidence with some limitations but still valuable",
    criteria: [
      "Peer-reviewed research with moderate sample sizes",
      "Quasi-experimental designs or well-designed case studies",
      "Reasonable relevance to your context",
      "Published within last 10 years",
      "Some supporting evidence from other studies",
      "Clear reporting of methods and limitations"
    ]
  },
  {
    level: "Bronze Standard",
    color: "bg-amber-700", 
    textColor: "text-amber-800",
    icon: AlertTriangle,
    description: "Lower quality evidence that should be used cautiously",
    criteria: [
      "Non-peer reviewed reports or limited peer review",
      "Small sample sizes or limited generalisability",
      "Indirect relevance to your context",
      "Older publications that may need verification",
      "Limited supporting evidence",
      "Some methodological concerns"
    ]
  }
];

const evidenceSources = [
  {
    category: "Cognitive Science Research Literature",
    goldCriteria: [
      "Meta-analyses of learning and memory research",
      "Peer-reviewed cognitive psychology journals",
      "Replication studies confirming key findings",
      "Cross-cultural validation of cognitive principles"
    ],
    silverCriteria: [
      "Individual empirical studies with strong methodology",
      "Conference proceedings from major cognitive science conferences",
      "Book chapters by recognised experts",
      "Longitudinal studies tracking learning outcomes"
    ],
    redFlags: [
      "Pop psychology interpretations of research",
      "Single studies making broad claims",
      "Research that hasn't been replicated",
      "Studies with unclear or biased methodology"
    ]
  },
  {
    category: "Organisational Learning Data",
    goldCriteria: [
      "Large-scale learning analytics with clear patterns",
      "Longitudinal tracking of learner performance",
      "Comparison data across different approaches",
      "Validated assessment instruments"
    ],
    silverCriteria: [
      "Smaller-scale internal evaluation data",
      "Learner performance trends over time",
      "Comparative analysis within organisation",
      "Reliable assessment data"
    ],
    redFlags: [
      "Anecdotal reports without systematic data collection",
      "Cherry-picked success stories",
      "Data without appropriate comparison groups",
      "Unvalidated or unreliable measures"
    ]
  },
  {
    category: "Learner Feedback and Preferences",
    goldCriteria: [
      "Systematic surveys with validated instruments",
      "Mixed-methods evaluation including qualitative insights",
      "Representative sampling across learner groups",
      "Longitudinal feedback tracking changes over time"
    ],
    silverCriteria: [
      "Regular feedback collection with consistent methods",
      "Focus groups or interviews with structured protocols",
      "Feedback from diverse learner populations",
      "Some triangulation of feedback sources"
    ],
    redFlags: [
      "Informal or ad-hoc feedback collection",
      "Leading questions that bias responses",
      "Feedback only from satisfied learners",
      "Conflating learner satisfaction with learning effectiveness"
    ]
  },
  {
    category: "Previous Learning Design Experience",
    goldCriteria: [
      "Documented case studies with outcome measures",
      "Systematic reflection on what worked and why",
      "Pattern recognition across multiple projects",
      "Evidence-based adaptation of previous approaches"
    ],
    silverCriteria: [
      "Informal documentation of lessons learnt",
      "Qualitative reflection on previous successes",
      "Some tracking of what approaches worked",
      "Peer discussion and validation of experiences"
    ],
    redFlags: [
      "Relying on memory without documentation",
      "Assuming success without measuring outcomes",
      "Overgeneralising from limited experiences",
      "Ignoring context differences between projects"
    ]
  }
];

const qualityAssuranceChecklist = [
  "Source credibility: Is the source reputable and recognised in the field?",
  "Methodology transparency: Are methods clearly described and appropriate?",
  "Sample representativeness: Does the sample match your target population?",
  "Bias assessment: Are potential biases acknowledged and addressed?",
  "Contextual relevance: How well does this apply to your specific situation?",
  "Replication status: Has this finding been replicated by others?",
  "Recency relevance: Is the evidence current enough for your context?",
  "Practical applicability: Can these findings be realistically implemented?"
];

export const AppendixB = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3 text-foreground">Evidence Quality Guidelines</h2>
        <p className="text-muted-foreground">
          Use these guidelines to evaluate the quality and reliability of evidence sources when making learning design decisions.
          Higher quality evidence should carry more weight in your decision-making process.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Evidence Quality Standards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {evidenceQualityLevels.map((level) => {
                const Icon = level.icon;
                return (
                  <div key={level.level} className="border rounded-lg p-4 border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="h-5 w-5 text-foreground" />
                      <Badge className={`${level.color} text-white`}>
                        {level.level}
                      </Badge>
                      <span className={`font-semibold ${level.textColor} dark:text-current`}>
                        {level.description}
                      </span>
                    </div>
                    <ul className="text-sm space-y-1 ml-8">
                      {level.criteria.map((criterion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span className="text-foreground">{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Evidence Source Evaluation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {evidenceSources.map((source) => (
                <Collapsible key={source.category}>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-3 bg-accent hover:bg-accent/80 rounded-lg transition-colors">
                      <h4 className="font-semibold text-left text-accent-foreground">{source.category}</h4>
                      <ChevronDown className="h-4 w-4 text-accent-foreground" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-4 grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-700 dark:text-yellow-400 mb-2 flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Gold Standard
                        </h5>
                        <ul className="text-sm space-y-1">
                          {source.goldCriteria.map((criterion, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-yellow-500 mt-1">•</span>
                              <span className="text-foreground">{criterion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Silver Standard
                        </h5>
                        <ul className="text-sm space-y-1">
                          {source.silverCriteria.map((criterion, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-gray-500 mt-1">•</span>
                              <span className="text-foreground">{criterion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                          <XCircle className="h-4 w-4" />
                          Red Flags
                        </h5>
                        <ul className="text-sm space-y-1">
                          {source.redFlags.map((flag, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              <span className="text-foreground">{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Quality Assurance Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Use this checklist to systematically evaluate any evidence source before incorporating it into your decision-making:
            </p>
            <div className="space-y-2">
              {qualityAssuranceChecklist.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-2 bg-accent rounded">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-accent-foreground">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
