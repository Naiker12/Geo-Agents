import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Monitor, Terminal, Code2 } from "lucide-react";

type InstallTabsProps = {
  children: React.ReactNode;
};

export function InstallTabs({ children }: InstallTabsProps) {
  return (
    <Tabs defaultValue="windows" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="windows" className="flex items-center gap-2">
          <Monitor className="h-4 w-4" />
          Windows
        </TabsTrigger>
        <TabsTrigger value="macos" className="flex items-center gap-2">
          <Monitor className="h-4 w-4" />
          macOS
        </TabsTrigger>
        <TabsTrigger value="linux" className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          Linux
        </TabsTrigger>
        <TabsTrigger value="dev" className="flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          Dev
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}
