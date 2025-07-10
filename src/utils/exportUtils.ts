
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, HeadingLevel, AlignmentType, TextRun, Header, Footer } from 'docx';
import { Decision } from "@/pages/Index";

export const exportToPDF = async (decisions: Decision[]) => {
  const pdf = new jsPDF();
  
  // Title page
  pdf.setFontSize(20);
  pdf.text('LEED Decision Report', 20, 30);
  pdf.setFontSize(12);
  pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 45);
  
  // Executive Summary
  pdf.setFontSize(16);
  pdf.text('Executive Summary', 20, 65);
  pdf.setFontSize(10);
  
  const summary = [
    `Total Decisions: ${decisions.length}`,
    `Discovery Phase: ${decisions.filter(d => d.phase === 'discovery').length}`,
    `Design Phase: ${decisions.filter(d => d.phase === 'design').length}`,
    `Development Phase: ${decisions.filter(d => d.phase === 'development').length}`,
    `Delivery Phase: ${decisions.filter(d => d.phase === 'delivery').length}`,
    `Evaluation Phase: ${decisions.filter(d => d.phase === 'evaluation').length}`,
  ];
  
  let yPosition = 75;
  summary.forEach(line => {
    pdf.text(line, 25, yPosition);
    yPosition += 8;
  });
  
  // Add decisions by phase
  const phases = ['discovery', 'design', 'development', 'delivery', 'evaluation'];
  
  phases.forEach(phase => {
    const phaseDecisions = decisions.filter(d => d.phase === phase);
    if (phaseDecisions.length > 0) {
      pdf.addPage();
      pdf.setFontSize(16);
      pdf.text(`${phase.charAt(0).toUpperCase() + phase.slice(1)} Phase`, 20, 30);
      
      yPosition = 45;
      phaseDecisions.forEach(decision => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 30;
        }
        
        pdf.setFontSize(12);
        pdf.text(decision.title, 20, yPosition);
        yPosition += 10;
        
        pdf.setFontSize(9);
        const splitText = pdf.splitTextToSize(decision.rationale, 170);
        pdf.text(splitText, 25, yPosition);
        yPosition += splitText.length * 4 + 10;
        
        if (decision.goldTheories.length > 0) {
          pdf.text(`GOLD Theories: ${decision.goldTheories.join(', ')}`, 25, yPosition);
          yPosition += 8;
        }
        
        yPosition += 5;
      });
    }
  });
  
  const fileName = `leed-report-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
  
  return fileName;
};

export const exportToExcel = (decisions: Decision[]) => {
  const workbook = XLSX.utils.book_new();
  
  // Summary worksheet
  const summaryData = [
    ['LEED Decision Report Summary'],
    ['Generated:', new Date().toLocaleDateString()],
    [''],
    ['Phase', 'Decision Count'],
    ['Discovery', decisions.filter(d => d.phase === 'discovery').length],
    ['Design', decisions.filter(d => d.phase === 'design').length],
    ['Development', decisions.filter(d => d.phase === 'development').length],
    ['Delivery', decisions.filter(d => d.phase === 'delivery').length],
    ['Evaluation', decisions.filter(d => d.phase === 'evaluation').length],
    [''],
    ['Total Decisions:', decisions.length],
    ['Unique GOLD Theories Used:', new Set(decisions.flatMap(d => d.goldTheories)).size]
  ];
  
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
  
  // All decisions worksheet
  const headers = [
    'Phase', 'Date', 'Title', 'Owner', 'Rationale', 
    'GOLD Theories', 'Evidence Sources', 'Alternatives',
    'AI Tools', 'Quality Assurance', 'Risks', 'Evaluation'
  ];
  
  const decisionsData = [
    headers,
    ...decisions.map(d => [
      d.phase,
      d.date,
      d.title,
      d.owner,
      d.rationale,
      d.goldTheories.join('; '),
      d.evidenceSources.join('; '),
      d.alternatives,
      d.aiTools,
      d.qualityAssurance,
      d.risks,
      d.evaluation
    ])
  ];
  
  const decisionsSheet = XLSX.utils.aoa_to_sheet(decisionsData);
  XLSX.utils.book_append_sheet(workbook, decisionsSheet, 'All Decisions');
  
  // Phase-specific worksheets
  const phases = ['discovery', 'design', 'development', 'delivery', 'evaluation'];
  phases.forEach(phase => {
    const phaseDecisions = decisions.filter(d => d.phase === phase);
    if (phaseDecisions.length > 0) {
      const phaseData = [
        headers,
        ...phaseDecisions.map(d => [
          d.phase,
          d.date,
          d.title,
          d.owner,
          d.rationale,
          d.goldTheories.join('; '),
          d.evidenceSources.join('; '),
          d.alternatives,
          d.aiTools,
          d.qualityAssurance,
          d.risks,
          d.evaluation
        ])
      ];
      
      const phaseSheet = XLSX.utils.aoa_to_sheet(phaseData);
      XLSX.utils.book_append_sheet(workbook, phaseSheet, phase.charAt(0).toUpperCase() + phase.slice(1));
    }
  });
  
  const fileName = `leed-decisions-${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
  
  return fileName;
};

export const exportToWord = async (decisions: Decision[]) => {
  const doc = new Document({
    sections: [{
      headers: {
        default: new Header({
          children: [new Paragraph({
            children: [new TextRun("LEED Decision Report")],
            alignment: AlignmentType.CENTER,
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            children: [new TextRun(`Generated: ${new Date().toLocaleDateString()}`)],
            alignment: AlignmentType.CENTER,
          })],
        }),
      },
      children: [
        new Paragraph({
          children: [new TextRun({
            text: "LEED Interactive Tracker",
            bold: true,
            size: 32,
          })],
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          children: [new TextRun({
            text: "Learning Engineering Evidence & Decisions Report",
            size: 24,
          })],
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          children: [new TextRun("")],
        }),
        new Paragraph({
          children: [new TextRun({
            text: "Executive Summary",
            bold: true,
            size: 28,
          })],
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          children: [new TextRun(`Total Decisions Documented: ${decisions.length}`)],
        }),
        new Paragraph({
          children: [new TextRun(`GOLD Theories Applied: ${new Set(decisions.flatMap(d => d.goldTheories)).size}`)],
        }),
        new Paragraph({
          children: [new TextRun("")],
        }),
        ...decisions.map(decision => [
          new Paragraph({
            children: [new TextRun({
              text: decision.title,
              bold: true,
              size: 24,
            })],
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Phase: ${decision.phase.charAt(0).toUpperCase() + decision.phase.slice(1)} | `,
                bold: true,
              }),
              new TextRun(`Date: ${new Date(decision.date).toLocaleDateString()} | `),
              new TextRun(`Owner: ${decision.owner}`)
            ],
          }),
          new Paragraph({
            children: [new TextRun({
              text: "Rationale:",
              bold: true,
            })],
          }),
          new Paragraph({
            children: [new TextRun(decision.rationale)],
          }),
          ...(decision.goldTheories.length > 0 ? [
            new Paragraph({
              children: [new TextRun({
                text: "GOLD Theories Applied:",
                bold: true,
              })],
            }),
            new Paragraph({
              children: [new TextRun(decision.goldTheories.join(', '))],
            }),
          ] : []),
          ...(decision.evidenceSources.length > 0 ? [
            new Paragraph({
              children: [new TextRun({
                text: "Evidence Sources:",
                bold: true,
              })],
            }),
            new Paragraph({
              children: [new TextRun(decision.evidenceSources.join(', '))],
            }),
          ] : []),
          new Paragraph({
            children: [new TextRun("")],
          }),
        ]).flat(),
      ],
    }],
  });
  
  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = `leed-report-${new Date().toISOString().split('T')[0]}.docx`;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
  
  return fileName;
};
