
import { Document, Packer, Paragraph, Table, TableCell, TableRow, HeadingLevel, AlignmentType, TextRun, Header, Footer, ImageRun, BorderStyle, WidthType } from 'docx';
import { Decision } from "@/pages/Index";

// Enhanced Word export with professional formatting
export const exportToEnhancedWord = async (decisions: Decision[]) => {
  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: "heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          run: {
            size: 32,
            bold: true,
            color: "2563EB",
          },
          paragraph: {
            spacing: { after: 300 },
          },
        },
        {
          id: "heading2", 
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          run: {
            size: 28,
            bold: true,
            color: "1E40AF",
          },
          paragraph: {
            spacing: { after: 200, before: 400 },
          },
        }
      ],
    },
    sections: [{
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "LEED Interactive Tracker - Comprehensive Report",
                  bold: true,
                  size: 24,
                  color: "2563EB"
                })
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 }
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              children: [
                new TextRun(`Generated: ${new Date().toLocaleDateString()} | `),
                new TextRun("Learning Engineering Evidence & Decisions")
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
        }),
      },
      children: [
        // Title Page
        new Paragraph({
          children: [new TextRun({
            text: "LEED Interactive Tracker",
            bold: true,
            size: 48,
            color: "2563EB"
          })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),
        new Paragraph({
          children: [new TextRun({
            text: "Learning Engineering Evidence & Decisions",
            size: 32,
            color: "4B5563"
          })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 }
        }),
        new Paragraph({
          children: [new TextRun({
            text: "Comprehensive Project Report",
            size: 24,
            italics: true,
            color: "6B7280"
          })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 }
        }),
        
        // Executive Summary
        new Paragraph({
          children: [new TextRun({
            text: "Executive Summary",
            bold: true,
            size: 36,
            color: "2563EB"
          })],
          style: "heading1"
        }),
        
        // Summary Table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: "Metric", bold: true })] })],
                  shading: { fill: "E5E7EB" }
                }),
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: "Value", bold: true })] })],
                  shading: { fill: "E5E7EB" }
                }),
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: "Analysis", bold: true })] })],
                  shading: { fill: "E5E7EB" }
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun("Total Decisions")] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun(decisions.length.toString())] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun("Comprehensive decision documentation")] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun("GOLD Theories Applied")] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun(new Set(decisions.flatMap(d => d.goldTheories)).size.toString())] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun("Evidence-based framework implementation")] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun("Evidence Sources")] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun(new Set(decisions.flatMap(d => d.evidenceSources)).size.toString())] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun("Diverse research foundation")] })] })
              ]
            })
          ]
        }),
        
        new Paragraph({ children: [new TextRun("")], spacing: { after: 400 } }),
        
        // Phase Analysis
        new Paragraph({
          children: [new TextRun({
            text: "Phase Distribution Analysis",
            bold: true,
            size: 32,
            color: "2563EB"
          })],
          style: "heading1"
        }),
        
        ...['discovery', 'design', 'development', 'delivery', 'evaluation'].map(phase => {
          const phaseDecisions = decisions.filter(d => d.phase === phase);
          if (phaseDecisions.length === 0) return [];
          
          return [
            new Paragraph({
              children: [new TextRun({
                text: `${phase.charAt(0).toUpperCase() + phase.slice(1)} Phase (${phaseDecisions.length} decisions)`,
                bold: true,
                size: 28,
                color: "1E40AF"
              })],
              style: "heading2"
            }),
            ...phaseDecisions.map(decision => [
              new Paragraph({
                children: [new TextRun({
                  text: decision.title,
                  bold: true,
                  size: 24,
                })],
                spacing: { before: 200, after: 100 }
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "Owner: ", bold: true }),
                  new TextRun(`${decision.owner} | `),
                  new TextRun({ text: "Date: ", bold: true }),
                  new TextRun(new Date(decision.date).toLocaleDateString())
                ],
                spacing: { after: 100 }
              }),
              new Paragraph({
                children: [new TextRun({ text: "Rationale:", bold: true })],
                spacing: { after: 50 }
              }),
              new Paragraph({
                children: [new TextRun(decision.rationale)],
                spacing: { after: 100 }
              }),
              ...(decision.goldTheories.length > 0 ? [
                new Paragraph({
                  children: [new TextRun({ text: "GOLD Theories Applied:", bold: true })],
                  spacing: { after: 50 }
                }),
                new Paragraph({
                  children: [new TextRun(decision.goldTheories.join(', '))],
                  spacing: { after: 100 }
                }),
              ] : []),
              ...(decision.evidenceSources.length > 0 ? [
                new Paragraph({
                  children: [new TextRun({ text: "Evidence Sources:", bold: true })],
                  spacing: { after: 50 }
                }),
                new Paragraph({
                  children: [new TextRun(decision.evidenceSources.join(', '))],
                  spacing: { after: 100 }
                }),
              ] : []),
              ...(decision.successMetrics.length > 0 ? [
                new Paragraph({
                  children: [new TextRun({ text: "Success Metrics:", bold: true })],
                  spacing: { after: 50 }
                }),
                new Paragraph({
                  children: [new TextRun(decision.successMetrics.join(', '))],
                  spacing: { after: 100 }
                }),
              ] : []),
              ...(decision.timeline ? [
                new Paragraph({
                  children: [
                    new TextRun({ text: "Timeline: ", bold: true }),
                    new TextRun(decision.timeline)
                  ],
                  spacing: { after: 100 }
                }),
              ] : []),
              ...(decision.risks ? [
                new Paragraph({
                  children: [new TextRun({ text: "Risks:", bold: true })],
                  spacing: { after: 50 }
                }),
                new Paragraph({
                  children: [new TextRun(decision.risks)],
                  spacing: { after: 100 }
                }),
              ] : []),
              ...(decision.evaluation ? [
                new Paragraph({
                  children: [new TextRun({ text: "Evaluation:", bold: true })],
                  spacing: { after: 50 }
                }),
                new Paragraph({
                  children: [new TextRun(decision.evaluation)],
                  spacing: { after: 200 }
                }),
              ] : []),
            ]).flat()
          ];
        }).flat().filter(item => item),
      ],
    }],
  });
  
  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = `leed-comprehensive-report-${new Date().toISOString().split('T')[0]}.docx`;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
  
  return fileName;
};
