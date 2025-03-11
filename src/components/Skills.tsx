import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Server,
  Cloud,
  Settings,
  Activity,
  GitBranch,
  Github,
  Code,
  Package,
  Database,
  FileCode,
  Puzzle,
  Layers,
  Cpu,
  Layout,
  Terminal,
  Monitor,
  HardDrive,
  Shield,
  Workflow
} from "lucide-react";
import { getSkillsData } from "@/utils/localStorage";

// Map for icon components
const iconMap: Record<string, React.ReactNode> = {
  Server: <Server className="h-4 w-4" />,
  Cloud: <Cloud className="h-4 w-4" />,
  Settings: <Settings className="h-4 w-4" />,
  Activity: <Activity className="h-4 w-4" />,
  GitBranch: <GitBranch className="h-4 w-4" />,
  Github: <Github className="h-4 w-4" />,
  Code: <Code className="h-4 w-4" />,
  Package: <Package className="h-4 w-4" />,
  Database: <Database className="h-4 w-4" />,
  FileCode: <FileCode className="h-4 w-4" />,
  Puzzle: <Puzzle className="h-4 w-4" />,
  Layers: <Layers className="h-4 w-4" />,
  Cpu: <Cpu className="h-4 w-4" />,
  Layout: <Layout className="h-4 w-4" />,
  Terminal: <Terminal className="h-4 w-4" />,
  Monitor: <Monitor className="h-4 w-4" />,
  HardDrive: <HardDrive className="h-4 w-4" />,
  Shield: <Shield className="h-4 w-4" />,
  Workflow: <Workflow className="h-4 w-4" />
};

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillsData {
  [category: string]: Skill[];
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [skillsData, setSkillsData] = useState<SkillsData>({});

  useEffect(() => {
    // Load skills data from localStorage
    const loadedData = getSkillsData();
    setSkillsData(loadedData);
    
    // Set first category as active
    if (Object.keys(loadedData).length > 0) {
      setActiveCategory(Object.keys(loadedData)[0]);
    }
  }, []);

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName] || <Code className="h-4 w-4" />;
  };

  if (Object.keys(skillsData).length === 0) {
    return <div>Loading skills...</div>;
  }

  return (
    <section id="skills" className="section bg-gray-50 dark:bg-gray-900/50">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-foreground/70">
            With years of experience building and maintaining cloud infrastructure,
            I've developed deep expertise in AWS environments and various DevOps tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="glass-card sticky top-20">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 text-lg">Skill Categories</h3>
                <ul className="space-y-1">
                  {Object.keys(skillsData).map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2",
                          activeCategory === category
                            ? "bg-primary text-white font-medium"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        {skillsData[category][0] ? 
                          getIconComponent(skillsData[category][0].icon) : 
                          <Code className="h-4 w-4" />}
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="glass-card h-full">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-6 text-xl">{activeCategory}</h3>
                <div className="space-y-6">
                  {skillsData[activeCategory]?.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-medium flex items-center gap-2">
                          {getIconComponent(skill.icon)}
                          {skill.name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {skill.level}%
                        </Badge>
                      </div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
