
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Brain, Target, Eye, Repeat, Zap, Heart, Users } from "lucide-react";

const goldTheories = [
  {
    id: "cognitive-load",
    title: "Cognitive Load Theory",
    icon: Brain,
    definition: "Manage intrinsic, extraneous, and germane cognitive load to optimise learning processing capacity.",
    principles: [
      "Intrinsic load relates to the inherent difficulty of the material",
      "Extraneous load is caused by poor instructional design",
      "Germane load supports schema construction and knowledge transfer"
    ],
    applications: [
      "Break complex topics into smaller, manageable chunks",
      "Use worked examples before independent practice",
      "Eliminate irrelevant visual and auditory distractions",
      "Provide completion tasks to reduce problem-solving load"
    ],
    pitfalls: [
      "Overloading with too much information at once",
      "Adding decorative elements that don't support learning",
      "Assuming all learners have the same prior knowledge"
    ],
    assessment: [
      "Do learners show signs of cognitive overload?",
      "Are irrelevant elements removed from the design?",
      "Is the difficulty appropriate for the target audience?"
    ]
  },
  {
    id: "rosenshines-principles",
    title: "Rosenshine's Principles",
    icon: Target,
    definition: "Apply systematic instruction through daily review, small steps, guided practice, feedback, independent practice, and systematic review.",
    principles: [
      "Begin lessons with a short review of previous learning",
      "Present new material in small steps with student practice",
      "Ask questions and check for understanding",
      "Provide models and worked examples",
      "Guide student practice with immediate feedback",
      "Check for understanding and provide systematic feedback",
      "Obtain a high success rate during guided practice",
      "Provide scaffolds for difficult tasks",
      "Require independent practice until responses are automatic",
      "Engage students in weekly and monthly review"
    ],
    applications: [
      "Start each session with a brief recap of key points",
      "Use step-by-step tutorials with practice opportunities",
      "Include regular formative assessments",
      "Provide immediate corrective feedback"
    ],
    pitfalls: [
      "Rushing through steps without checking understanding",
      "Providing too much content without practice opportunities",
      "Assuming learners are ready for independent work too quickly"
    ],
    assessment: [
      "Are learners successfully completing guided practice?",
      "Is feedback immediate and specific?",
      "Are prerequisite skills mastered before moving forward?"
    ]
  },
  {
    id: "multimedia-learning",
    title: "Multimedia Learning Theory",
    icon: Eye,
    definition: "Combine visual and auditory information effectively using dual processing channels whilst managing cognitive load.",
    principles: [
      "Coherence: Remove extraneous material",
      "Signalling: Highlight essential material",
      "Redundancy: Don't present identical information in multiple formats",
      "Spatial contiguity: Present related visual and verbal material together",
      "Temporal contiguity: Present related visual and verbal material simultaneously",
      "Modality: Present words as narration rather than on-screen text",
      "Personalisation: Use conversational style and virtual coaches"
    ],
    applications: [
      "Combine narration with relevant visuals",
      "Use diagrams with spoken explanations",
      "Avoid reading text aloud that's already on screen",
      "Place labels close to relevant diagram parts"
    ],
    pitfalls: [
      "Overwhelming learners with too many multimedia elements",
      "Using decorative graphics that don't support learning",
      "Presenting the same information in text and audio simultaneously"
    ],
    assessment: [
      "Do visuals directly support the learning objectives?",
      "Are both visual and auditory channels used effectively?",
      "Is redundant information eliminated?"
    ]
  },
  {
    id: "retrieval-practice",
    title: "Retrieval Practice Theory",
    icon: Repeat,
    definition: "Strengthen memory and learning through active recall, spaced practice, and testing effects rather than passive review.",
    principles: [
      "Testing effect: Retrieving information strengthens memory",
      "Spacing effect: Distributed practice is more effective than massed practice",
      "Interleaving: Mixing different types of problems improves learning",
      "Elaborative interrogation: Asking 'why' deepens understanding"
    ],
    applications: [
      "Include regular low-stakes quizzes and knowledge checks",
      "Use flashcards and spaced repetition systems",
      "Implement interleaved practice sessions",
      "Encourage learners to explain their reasoning"
    ],
    pitfalls: [
      "Relying solely on recognition rather than recall",
      "Cramming all practice into one session",
      "Making tests too high-stakes, causing anxiety"
    ],
    assessment: [
      "Can learners recall information without prompts?",
      "Are practice sessions distributed over time?",
      "Is retrieval practice low-stakes and frequent?"
    ]
  },
  {
    id: "desirable-difficulties",
    title: "Desirable Difficulties Theory",
    icon: Zap,
    definition: "Introduce appropriate challenges that enhance long-term learning and transfer without overwhelming cognitive capacity.",
    principles: [
      "Generation effect: Producing answers is better than recognising them",
      "Testing effect: Retrieval practice strengthens memory",
      "Spacing effect: Distributed practice improves retention",
      "Interleaving: Mixing topics forces discrimination between concepts"
    ],
    applications: [
      "Use open-ended questions instead of multiple choice when possible",
      "Introduce slight delays between related concepts",
      "Mix different types of problems in practice sessions",
      "Encourage learners to generate examples and explanations"
    ],
    pitfalls: [
      "Making tasks too difficult, leading to frustration",
      "Introducing difficulties that don't serve learning goals",
      "Overwhelming learners with too many challenges at once"
    ],
    assessment: [
      "Are challenges appropriate for the learner's level?",
      "Do difficulties enhance rather than hinder learning?",
      "Is support available when learners struggle?"
    ]
  },
  {
    id: "trauma-informed",
    title: "Trauma-Informed Pedagogy",
    icon: Heart,
    definition: "Recognise and respond to the impact of trauma on learning, creating physically and emotionally safe learning environments.",
    principles: [
      "Safety: Ensure physical and emotional safety",
      "Trustworthiness: Build and maintain trust through clear communication",
      "Choice: Maximise learner choice and control",
      "Collaboration: Healing occurs in relationship and community",
      "Empowerment: Emphasise learner strengths and resilience"
    ],
    applications: [
      "Provide multiple ways for learners to demonstrate knowledge",
      "Create predictable routines and clear expectations",
      "Offer choices in learning activities and environments",
      "Use strengths-based language and feedback"
    ],
    pitfalls: [
      "Making assumptions about learners' experiences",
      "Overlooking subtle signs of trauma response",
      "Creating environments that feel unsafe or unpredictable"
    ],
    assessment: [
      "Do learners feel safe to participate and take risks?",
      "Are multiple options provided for engagement?",
      "Is the learning environment predictable and supportive?"
    ]
  },
  {
    id: "universal-design",
    title: "Universal Design for Learning",
    icon: Users,
    definition: "Provide multiple means of representation, engagement, and action/expression to support diverse learners.",
    principles: [
      "Multiple means of representation: Present information in different ways",
      "Multiple means of engagement: Motivate learners differently",
      "Multiple means of action/expression: Allow different ways to demonstrate learning"
    ],
    applications: [
      "Provide captions for videos and transcripts for audio",
      "Offer various assessment formats (written, oral, visual, practical)",
      "Include multiple examples and non-examples",
      "Allow learners to choose topics of personal interest"
    ],
    pitfalls: [
      "Assuming one size fits all approaches",
      "Overlooking learners with different accessibility needs",
      "Not providing enough variety in learning pathways"
    ],
    assessment: [
      "Are multiple learning pathways available?",
      "Can all learners access and engage with the content?",
      "Are assessment methods varied and inclusive?"
    ]
  }
];

export const AppendixA = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3 text-foreground">GOLD Framework Quick Reference</h2>
        <p className="text-muted-foreground">
          The GOLD Framework integrates evidence-based learning theories to guide effective learning design decisions.
          Each theory provides specific principles for creating cognitively-informed learning experiences.
        </p>
      </div>

      <div className="space-y-4">
        {goldTheories.map((theory) => {
          const Icon = theory.icon;
          return (
            <Card key={theory.id} className="border-l-4 border-l-blue-500">
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="hover:bg-accent hover:text-accent-foreground transition-colors">
                    <CardTitle className="flex items-center gap-3 text-left">
                      <Icon className="h-5 w-5 text-blue-600" />
                      {theory.title}
                      <ChevronDown className="h-4 w-4 ml-auto" />
                    </CardTitle>
                    <p className="text-sm text-muted-foreground text-left mt-2">
                      {theory.definition}
                    </p>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Core Principles</h4>
                          <ul className="text-sm space-y-1">
                            {theory.principles.map((principle, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                <span className="text-foreground">{principle}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Practical Applications</h4>
                          <ul className="text-sm space-y-1">
                            {theory.applications.map((application, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span className="text-foreground">{application}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Common Pitfalls</h4>
                          <ul className="text-sm space-y-1">
                            {theory.pitfalls.map((pitfall, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span className="text-foreground">{pitfall}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Assessment Questions</h4>
                          <ul className="text-sm space-y-1">
                            {theory.assessment.map((question, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-purple-500 mt-1">•</span>
                                <span className="text-foreground">{question}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
