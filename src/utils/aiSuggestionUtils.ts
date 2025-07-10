
import { Phase } from "@/pages/Index";

interface AISuggestions {
  rationale: string;
  risks: string;
  evaluation: string;
  alternatives: string;
}

const phaseContexts = {
  discovery: {
    focus: "needs analysis and organisational assessment",
    keyQuestions: ["What learning needs exist?", "What is the organisational context?", "What constraints must be considered?"],
    commonRisks: ["Incomplete stakeholder analysis", "Misaligned organisational readiness", "Insufficient baseline data"]
  },
  design: {
    focus: "learning architecture and instructional design",
    keyQuestions: ["How will cognitive load be managed?", "What learning pathways are optimal?", "How will inclusion be ensured?"],
    commonRisks: ["Cognitive overload in design", "Inadequate accessibility considerations", "Misaligned learning objectives"]
  },
  development: {
    focus: "content creation and quality assurance",
    keyQuestions: ["How will content quality be assured?", "What AI tools enhance learning?", "How will retrieval practice be integrated?"],
    commonRisks: ["Inconsistent content quality", "Over-reliance on AI tools", "Insufficient testing with learners"]
  },
  delivery: {
    focus: "facilitation and learning environment optimisation",
    keyQuestions: ["How will facilitation be optimised?", "What real-time adjustments are needed?", "How will learner safety be maintained?"],
    commonRisks: ["Cognitive load mismanagement during delivery", "Inadequate real-time adaptation", "Environmental barriers to learning"]
  },
  evaluation: {
    focus: "learning effectiveness measurement and improvement",
    keyQuestions: ["How will learning outcomes be measured?", "What evidence demonstrates effectiveness?", "How will improvements be planned?"],
    commonRisks: ["Incomplete evaluation metrics", "Bias in outcome measurement", "Insufficient long-term follow-up"]
  }
};

const theorySpecificGuidance = {
  "Cognitive Load Theory": {
    rationale: "Consider how this decision impacts intrinsic, extraneous, and germane cognitive load. Ensure learners can process information within their working memory capacity.",
    risks: "Risk of cognitive overload if multiple complex elements are introduced simultaneously. Monitor for extraneous load that doesn't contribute to learning.",
    evaluation: "Measure cognitive load through learner self-reports, performance metrics, and mental effort ratings. Track learning efficiency and retention.",
    alternatives: "Consider chunking information, providing scaffolding, or using worked examples to manage cognitive demands."
  },
  "Rosenshine's Principles": {
    rationale: "Align with systematic instruction principles: daily review, small steps, guided practice, frequent feedback, and independent practice.",
    risks: "Risk of rushing through instructional steps or providing insufficient guided practice before independent work.",
    evaluation: "Assess each principle's implementation: review frequency, step size appropriateness, practice quality, and feedback effectiveness.",
    alternatives: "Consider alternative sequencing, different practice formats, or varied feedback mechanisms whilst maintaining systematic approach."
  },
  "Multimedia Learning Theory": {
    rationale: "Optimise dual processing by combining visual and auditory channels effectively whilst avoiding redundancy and split attention.",
    risks: "Risk of cognitive overload from redundant information or split attention between competing visual elements.",
    evaluation: "Test multimedia effectiveness through comprehension measures, retention tests, and learner preference data.",
    alternatives: "Consider single-modality presentations, sequential rather than simultaneous presentation, or learner-controlled pacing."
  },
  "Retrieval Practice Theory": {
    rationale: "Strengthen memory consolidation through active recall opportunities, spaced practice, and testing effects rather than passive review.",
    risks: "Risk of premature testing before adequate encoding or insufficient spacing between practice sessions.",
    evaluation: "Measure long-term retention through delayed testing, transfer assessments, and spaced recall performance.",
    alternatives: "Consider different retrieval formats (cued recall, recognition, generation), varied spacing intervals, or progressive difficulty."
  },
  "Desirable Difficulties Theory": {
    rationale: "Introduce appropriate challenges that enhance long-term learning without overwhelming learners' cognitive capacity.",
    risks: "Risk of difficulties becoming undesirable if too challenging or poorly timed, leading to frustration rather than learning.",
    evaluation: "Monitor the balance between challenge and success through performance patterns, effort metrics, and learner persistence.",
    alternatives: "Consider adjustable difficulty levels, learner choice in challenge selection, or graduated difficulty progression."
  },
  "Trauma-Informed Pedagogy": {
    rationale: "Create physically and psychologically safe learning environments that recognise trauma's impact on learning capacity and engagement.",
    risks: "Risk of retraumatisation through triggering content, power imbalances, or unsafe learning environments.",
    evaluation: "Assess learner sense of safety, engagement patterns, and inclusive environment indicators through surveys and observation.",
    alternatives: "Consider alternative content delivery methods, flexible participation options, or enhanced support systems."
  },
  "Universal Design for Learning": {
    rationale: "Provide multiple means of representation, engagement, and action/expression to support diverse learners from the outset.",
    risks: "Risk of overwhelming complexity from too many options or insufficient accessibility for specific learning needs.",
    evaluation: "Evaluate accessibility effectiveness through diverse learner outcomes, engagement metrics, and barrier identification.",
    alternatives: "Consider streamlined options, learner-customisable interfaces, or phase-in approaches to UDL implementation."
  }
};

export const generateAISuggestions = (phase: Phase, selectedTheories: string[], decisionTitle: string): AISuggestions => {
  const phaseContext = phaseContexts[phase];
  const suggestions: AISuggestions = {
    rationale: "",
    risks: "",
    evaluation: "",
    alternatives: ""
  };

  // Generate phase-specific opening
  const phaseIntro = `[AI Suggestion - ${phase.charAt(0).toUpperCase() + phase.slice(1)} Phase Context] `;
  
  // Build rationale suggestions
  let rationaleContent = `${phaseIntro}In the ${phase} phase, focus on ${phaseContext.focus}. `;
  
  selectedTheories.forEach((theory, index) => {
    const guidance = theorySpecificGuidance[theory as keyof typeof theorySpecificGuidance];
    if (guidance) {
      rationaleContent += `\n\n${theory}: ${guidance.rationale}`;
    }
  });

  // Add phase-specific questions
  rationaleContent += `\n\nKey questions to address: ${phaseContext.keyQuestions.join(' ')}`;
  
  // Build risk suggestions
  let riskContent = `${phaseIntro}Common ${phase} phase risks: ${phaseContext.commonRisks.join(', ')}. `;
  
  selectedTheories.forEach((theory) => {
    const guidance = theorySpecificGuidance[theory as keyof typeof theorySpecificGuidance];
    if (guidance) {
      riskContent += `\n\n${theory} Risk: ${guidance.risks}`;
    }
  });

  // Build evaluation suggestions
  let evaluationContent = `${phaseIntro}Evaluate this decision's effectiveness in the ${phase} context. `;
  
  selectedTheories.forEach((theory) => {
    const guidance = theorySpecificGuidance[theory as keyof typeof theorySpecificGuidance];
    if (guidance) {
      evaluationContent += `\n\n${theory} Evaluation: ${guidance.evaluation}`;
    }
  });

  // Build alternatives suggestions
  let alternativesContent = `${phaseIntro}Consider these theory-informed alternatives: `;
  
  selectedTheories.forEach((theory) => {
    const guidance = theorySpecificGuidance[theory as keyof typeof theorySpecificGuidance];
    if (guidance) {
      alternativesContent += `\n\n${theory}: ${guidance.alternatives}`;
    }
  });

  suggestions.rationale = rationaleContent;
  suggestions.risks = riskContent;
  suggestions.evaluation = evaluationContent;
  suggestions.alternatives = alternativesContent;

  return suggestions;
};
