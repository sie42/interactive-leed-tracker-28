
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, HelpCircle } from "lucide-react";
import { AppendixA } from "./AppendixA";
import { AppendixB } from "./AppendixB";

interface AppendixDrawerProps {
  trigger: React.ReactNode;
  defaultTab?: "appendix-a" | "appendix-b";
}

export const AppendixDrawer = ({ trigger, defaultTab = "appendix-a" }: AppendixDrawerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            LEED Quick Reference Appendices
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6">
          <Tabs defaultValue={defaultTab} className="h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="appendix-a" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                GOLD Framework
              </TabsTrigger>
              <TabsTrigger value="appendix-b" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Evidence Guidelines
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appendix-a" className="mt-4">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <AppendixA />
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="appendix-b" className="mt-4">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <AppendixB />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Convenience components for different contexts
export const QuickReferenceButton = () => (
  <AppendixDrawer
    trigger={
      <Button variant="outline" className="flex items-center gap-2">
        <BookOpen className="h-4 w-4" />
        Quick Reference
      </Button>
    }
  />
);

export const GoldFrameworkHelp = () => (
  <AppendixDrawer
    trigger={
      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
        <HelpCircle className="h-4 w-4" />
      </Button>
    }
    defaultTab="appendix-a"
  />
);

export const EvidenceGuidelinesHelp = () => (
  <AppendixDrawer
    trigger={
      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
        <HelpCircle className="h-4 w-4" />
      </Button>
    }
    defaultTab="appendix-b"
  />
);
