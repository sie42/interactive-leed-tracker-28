
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Decision } from "@/pages/Index";

// Enhanced PDF export with professional landscape formatting
export const exportToEnhancedPDF = async (decisions: Decision[]) => {
  // Switch to landscape orientation for better table and content layout
  const pdf = new jsPDF('l', 'mm', 'a4'); // Changed from 'p' to 'l' for landscape
  
  // Professional styling with proper tuple types for landscape layout
  const primaryColor: [number, number, number] = [65, 105, 225];
  const secondaryColor: [number, number, number] = [128, 128, 128];
  const headerColor: [number, number, number] = [240, 240, 240];
  
  // Landscape dimensions: A4 landscape is 297mm x 210mm
  const pageWidth = 297;
  const pageHeight = 210;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Title page with branding - adjusted for landscape
  pdf.setFillColor(...primaryColor);
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.text('LEED Interactive Tracker', pageWidth / 2, 25, { align: 'center' });
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Learning Engineering Evidence & Decisions Report', pageWidth / 2, 35, { align: 'center' });
  
  // Reset colors for body content
  pdf.setTextColor(0, 0, 0);
  
  // Executive Summary with improved layout
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Executive Summary', margin, 60);
  
  const summaryData = [
    ['Metric', 'Value', 'Analysis'],
    ['Total Decisions', decisions.length.toString(), 'Comprehensive decision documentation'],
    ['Discovery Decisions', decisions.filter(d => d.phase === 'discovery').length.toString(), 'Foundation analysis completed'],
    ['Design Decisions', decisions.filter(d => d.phase === 'design').length.toString(), 'Architecture planning documented'],
    ['Development Decisions', decisions.filter(d => d.phase === 'development').length.toString(), 'Implementation choices recorded'],
    ['Delivery Decisions', decisions.filter(d => d.phase === 'delivery').length.toString(), 'Deployment strategies captured'],
    ['Evaluation Decisions', decisions.filter(d => d.phase === 'evaluation').length.toString(), 'Assessment approaches defined'],
    ['GOLD Theories Applied', new Set(decisions.flatMap(d => d.goldTheories)).size.toString(), 'Evidence-based framework usage'],
    ['Evidence Sources Used', new Set(decisions.flatMap(d => d.evidenceSources)).size.toString(), 'Diverse research foundation']
  ];
  
  // Improved table layout for landscape orientation
  autoTable(pdf, {
    head: [summaryData[0]],
    body: summaryData.slice(1),
    startY: 70,
    theme: 'grid',
    headStyles: { 
      fillColor: primaryColor, 
      textColor: [255, 255, 255], 
      fontStyle: 'bold',
      fontSize: 12
    },
    bodyStyles: { 
      textColor: [0, 0, 0],
      fontSize: 11
    },
    alternateRowStyles: { fillColor: headerColor },
    columnStyles: {
      0: { cellWidth: 80, fontStyle: 'bold' },
      1: { cellWidth: 40, halign: 'center' },
      2: { cellWidth: 137 }
    },
    margin: { left: margin, right: margin },
    tableWidth: contentWidth
  });
  
  // Detailed decisions by phase with improved landscape layout
  const phases = ['discovery', 'design', 'development', 'delivery', 'evaluation'];
  const phaseColors: Record<string, [number, number, number]> = {
    discovery: [255, 107, 53],
    design: [139, 92, 246],
    development: [16, 185, 129],
    delivery: [59, 130, 246],
    evaluation: [245, 158, 11]
  };
  
  phases.forEach(phase => {
    const phaseDecisions = decisions.filter(d => d.phase === phase);
    if (phaseDecisions.length > 0) {
      pdf.addPage();
      
      // Phase header - adjusted for landscape
      const phaseColor = phaseColors[phase];
      pdf.setFillColor(...phaseColor);
      pdf.rect(0, 0, pageWidth, 25, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${phase.charAt(0).toUpperCase() + phase.slice(1)} Phase`, pageWidth / 2, 16, { align: 'center' });
      
      pdf.setTextColor(0, 0, 0);
      
      // Phase decisions table with optimized column widths for landscape
      const tableData = phaseDecisions.map(decision => [
        decision.title,
        decision.owner,
        new Date(decision.date).toLocaleDateString(),
        decision.goldTheories.join(', '),
        decision.rationale.substring(0, 120) + (decision.rationale.length > 120 ? '...' : '')
      ]);
      
      autoTable(pdf, {
        head: [['Decision Title', 'Owner', 'Date', 'GOLD Theories', 'Rationale']],
        body: tableData,
        startY: 35,
        theme: 'striped',
        headStyles: { 
          fillColor: phaseColor, 
          textColor: [255, 255, 255], 
          fontStyle: 'bold',
          fontSize: 11
        },
        bodyStyles: { 
          textColor: [0, 0, 0], 
          fontSize: 10
        },
        columnStyles: {
          0: { cellWidth: 60, fontStyle: 'bold' },
          1: { cellWidth: 35 },
          2: { cellWidth: 30 },
          3: { cellWidth: 50 },
          4: { cellWidth: 82 }
        },
        margin: { left: margin, right: margin },
        tableWidth: contentWidth
      });
      
      // Detailed decision breakdown with consistent typography
      let yPosition = (pdf as any).lastAutoTable.finalY + 20;
      
      phaseDecisions.forEach((decision, index) => {
        if (yPosition > 160) { // Adjusted for landscape height
          pdf.addPage();
          yPosition = 30;
        }
        
        // Decision header with consistent formatting
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}. ${decision.title}`, margin, yPosition);
        yPosition += 10;
        
        // Decision details with standardized formatting
        const details = [
          ['Owner', decision.owner],
          ['Date', new Date(decision.date).toLocaleDateString()],
          ['GOLD Theories', decision.goldTheories.join(', ')],
          ['Evidence Sources', decision.evidenceSources.join(', ')],
          ['Success Metrics', decision.successMetrics.join(', ')],
          ['Timeline', decision.timeline],
          ['AI Tools Used', decision.aiTools],
          ['Quality Assurance', decision.qualityAssurance],
          ['Risks', decision.risks],
          ['Evaluation', decision.evaluation]
        ];
        
        details.forEach(([label, value]) => {
          if (value && value.trim()) {
            // Consistent label formatting
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`${label}:`, margin + 5, yPosition);
            
            // Consistent content formatting with proper text wrapping for landscape
            pdf.setFont('helvetica', 'normal');
            const splitText = pdf.splitTextToSize(value, contentWidth - 10); // Adjusted for landscape width
            pdf.text(splitText, margin + 5, yPosition + 5);
            yPosition += 5 + (splitText.length * 4) + 3;
          }
        });
        
        // Rationale with consistent formatting
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Rationale:', margin + 5, yPosition);
        pdf.setFont('helvetica', 'normal');
        const rationaleText = pdf.splitTextToSize(decision.rationale, contentWidth - 10); // Proper width for landscape
        pdf.text(rationaleText, margin + 5, yPosition + 5);
        yPosition += 5 + (rationaleText.length * 4) + 15;
      });
    }
  });
  
  // Add page numbers and footer with landscape adjustments
  const pageCount = pdf.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, margin, pageHeight - 10);
    pdf.text('LEED Interactive Tracker', pageWidth - margin, pageHeight - 10, { align: 'right' });
  }
  
  const fileName = `leed-comprehensive-report-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
  
  return fileName;
};
