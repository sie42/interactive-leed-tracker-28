
import { Decision } from "@/pages/Index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, File, Table } from "lucide-react";
import { toast } from "sonner";
import { exportToEnhancedPDF } from "@/utils/pdfExportUtils";
import { exportToEnhancedExcel } from "@/utils/excelExportUtils";
import { exportToEnhancedWord } from "@/utils/wordExportUtils";
import { AppendixDrawer } from "@/components/AppendixDrawer";
import { BookOpen } from "lucide-react";

interface ExportCenterProps {
  decisions: Decision[];
}

export const ExportCenter = ({ decisions }: ExportCenterProps) => {
  const handleExportPDF = async () => {
    try {
      const fileName = await exportToEnhancedPDF(decisions);
      toast.success(`Professional report exported as ${fileName}`);
    } catch (error) {
      toast.error("Failed to export PDF report");
      console.error("PDF export error:", error);
    }
  };

  const handleExportExcel = () => {
    try {
      const fileName = exportToEnhancedExcel(decisions);
      toast.success(`Comprehensive data exported as ${fileName}`);
    } catch (error) {
      toast.error("Failed to export Excel file");
      console.error("Excel export error:", error);
    }
  };

  const handleExportWord = async () => {
    try {
      const fileName = await exportToEnhancedWord(decisions);
      toast.success(`Professional document exported as ${fileName}`);
    } catch (error) {
      toast.error("Failed to export Word document");
      console.error("Word export error:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Centre
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={handleExportPDF}
          variant="outline"
          className="w-full justify-start"
          disabled={decisions.length === 0}
        >
          <FileText className="h-4 w-4 mr-2" />
          <div className="text-left">
            <div>Export Professional PDF</div>
            <div className="text-xs text-muted-foreground">Complete report with executive summary & analysis</div>
          </div>
        </Button>
        
        <Button
          onClick={handleExportExcel}
          variant="outline"
          className="w-full justify-start"
          disabled={decisions.length === 0}
        >
          <Table className="h-4 w-4 mr-2" />
          <div className="text-left">
            <div>Export Comprehensive Excel</div>
            <div className="text-xs text-muted-foreground">Multi-sheet analysis with GOLD framework data</div>
          </div>
        </Button>

        <Button
          onClick={handleExportWord}
          variant="outline"
          className="w-full justify-start"
          disabled={decisions.length === 0}
        >
          <File className="h-4 w-4 mr-2" />
          <div className="text-left">
            <div>Export Professional Word</div>
            <div className="text-xs text-muted-foreground">Formatted document with comprehensive details</div>
          </div>
        </Button>

        <div className="pt-3 border-t">
          <AppendixDrawer
            trigger={
              <Button
                variant="ghost"
                className="w-full justify-start text-primary hover:text-primary/80 hover:bg-primary/10"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div>View Reference Appendices</div>
                  <div className="text-xs text-muted-foreground">GOLD Framework & Evidence Guidelines</div>
                </div>
              </Button>
            }
          />
        </div>

        <div className="text-xs text-muted-foreground pt-2 border-t">
          {decisions.length} decision{decisions.length !== 1 ? 's' : ''} ready for export
        </div>
      </CardContent>
    </Card>
  );
};
