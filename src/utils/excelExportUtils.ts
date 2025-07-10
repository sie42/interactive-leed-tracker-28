
import * as XLSX from 'xlsx';
import { Decision } from "@/pages/Index";

// Enhanced Excel export with professional formatting
export const exportToEnhancedExcel = (decisions: Decision[]) => {
  const workbook = XLSX.utils.book_new();
  
  // Executive Summary with styling
  const summaryData = [
    ['LEED Interactive Tracker - Comprehensive Report'],
    ['Generated:', new Date().toLocaleDateString()],
    [''],
    ['Executive Summary'],
    [''],
    ['Phase', 'Decision Count', 'Percentage', 'GOLD Theories Used', 'Key Evidence Sources'],
    ['Discovery', decisions.filter(d => d.phase === 'discovery').length, `${((decisions.filter(d => d.phase === 'discovery').length / decisions.length) * 100).toFixed(1)}%`, new Set(decisions.filter(d => d.phase === 'discovery').flatMap(d => d.goldTheories)).size, new Set(decisions.filter(d => d.phase === 'discovery').flatMap(d => d.evidenceSources)).size],
    ['Design', decisions.filter(d => d.phase === 'design').length, `${((decisions.filter(d => d.phase === 'design').length / decisions.length) * 100).toFixed(1)}%`, new Set(decisions.filter(d => d.phase === 'design').flatMap(d => d.goldTheories)).size, new Set(decisions.filter(d => d.phase === 'design').flatMap(d => d.evidenceSources)).size],
    ['Development', decisions.filter(d => d.phase === 'development').length, `${((decisions.filter(d => d.phase === 'development').length / decisions.length) * 100).toFixed(1)}%`, new Set(decisions.filter(d => d.phase === 'development').flatMap(d => d.goldTheories)).size, new Set(decisions.filter(d => d.phase === 'development').flatMap(d => d.evidenceSources)).size],
    ['Delivery', decisions.filter(d => d.phase === 'delivery').length, `${((decisions.filter(d => d.phase === 'delivery').length / decisions.length) * 100).toFixed(1)}%`, new Set(decisions.filter(d => d.phase === 'delivery').flatMap(d => d.goldTheories)).size, new Set(decisions.filter(d => d.phase === 'delivery').flatMap(d => d.evidenceSources)).size],
    ['Evaluation', decisions.filter(d => d.phase === 'evaluation').length, `${((decisions.filter(d => d.phase === 'evaluation').length / decisions.length) * 100).toFixed(1)}%`, new Set(decisions.filter(d => d.phase === 'evaluation').flatMap(d => d.goldTheories)).size, new Set(decisions.filter(d => d.phase === 'evaluation').flatMap(d => d.evidenceSources)).size],
    [''],
    ['Total Decisions:', decisions.length],
    ['Unique GOLD Theories:', new Set(decisions.flatMap(d => d.goldTheories)).size],
    ['Unique Evidence Sources:', new Set(decisions.flatMap(d => d.evidenceSources)).size],
    ['Average Timeline Coverage:', decisions.filter(d => d.timeline).length]
  ];
  
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Executive Summary');
  
  // Comprehensive decisions worksheet
  const headers = [
    'Phase', 'Date', 'Title', 'Owner', 'Rationale', 
    'GOLD Theories', 'Evidence Sources', 'Success Metrics',
    'Timeline', 'Alternatives', 'AI Tools', 'Quality Assurance', 
    'Risks', 'Evaluation', 'Evidence Details'
  ];
  
  const decisionsData = [
    headers,
    ...decisions.map(d => [
      d.phase.charAt(0).toUpperCase() + d.phase.slice(1),
      new Date(d.date).toLocaleDateString(),
      d.title,
      d.owner,
      d.rationale,
      d.goldTheories.join('; '),
      d.evidenceSources.join('; '),
      d.successMetrics.join('; '),
      d.timeline,
      d.alternatives,
      d.aiTools,
      d.qualityAssurance,
      d.risks,
      d.evaluation,
      d.evidence
    ])
  ];
  
  const decisionsSheet = XLSX.utils.aoa_to_sheet(decisionsData);
  XLSX.utils.book_append_sheet(workbook, decisionsSheet, 'Complete Decisions');
  
  // Phase-specific detailed worksheets
  const phases = ['discovery', 'design', 'development', 'delivery', 'evaluation'];
  phases.forEach(phase => {
    const phaseDecisions = decisions.filter(d => d.phase === phase);
    if (phaseDecisions.length > 0) {
      const phaseData = [
        [`${phase.charAt(0).toUpperCase() + phase.slice(1)} Phase - Detailed Analysis`],
        [''],
        headers,
        ...phaseDecisions.map(d => [
          d.phase.charAt(0).toUpperCase() + d.phase.slice(1),
          new Date(d.date).toLocaleDateString(),
          d.title,
          d.owner,
          d.rationale,
          d.goldTheories.join('; '),
          d.evidenceSources.join('; '),
          d.successMetrics.join('; '),
          d.timeline,
          d.alternatives,
          d.aiTools,
          d.qualityAssurance,
          d.risks,
          d.evaluation,
          d.evidence
        ])
      ];
      
      const phaseSheet = XLSX.utils.aoa_to_sheet(phaseData);
      XLSX.utils.book_append_sheet(workbook, phaseSheet, phase.charAt(0).toUpperCase() + phase.slice(1));
    }
  });
  
  // GOLD Framework Analysis
  const goldTheories = [
    "Cognitive Load Theory",
    "Rosenshine's Principles", 
    "Multimedia Learning Theory",
    "Retrieval Practice Theory",
    "Desirable Difficulties Theory",
    "Trauma-Informed Pedagogy",
    "Universal Design for Learning"
  ];
  
  const goldAnalysis = [
    ['GOLD Framework Usage Analysis'],
    [''],
    ['Theory', 'Usage Count', 'Percentage', 'Primary Phases', 'Key Applications'],
    ...goldTheories.map(theory => {
      const usageCount = decisions.filter(d => d.goldTheories.includes(theory)).length;
      const percentage = decisions.length > 0 ? ((usageCount / decisions.length) * 100).toFixed(1) : '0';
      const primaryPhases = [...new Set(decisions.filter(d => d.goldTheories.includes(theory)).map(d => d.phase))].join(', ');
      const applications = decisions.filter(d => d.goldTheories.includes(theory)).slice(0, 3).map(d => d.title).join('; ');
      
      return [theory, usageCount, `${percentage}%`, primaryPhases, applications];
    })
  ];
  
  const goldSheet = XLSX.utils.aoa_to_sheet(goldAnalysis);
  XLSX.utils.book_append_sheet(workbook, goldSheet, 'GOLD Framework Analysis');
  
  const fileName = `leed-comprehensive-data-${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
  
  return fileName;
};
