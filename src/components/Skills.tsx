
import { useState } from "react";
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
  Monitor
} from "lucide-react";

const skillsData = {
  "Operating Systems": [
    { name: "Red Hat Linux", level: 90, icon: <Server className="h-4 w-4" /> },
    { name: "Amazon Linux", level: 92, icon: <Cloud className="h-4 w-4" /> },
    { name: "Rocky Linux", level: 85, icon: <Server className="h-4 w-4" /> },
    { name: "Ubuntu", level: 95, icon: <Server className="h-4 w-4" /> },
    { name: "CentOS", level: 88, icon: <Server className="h-4 w-4" /> },
    { name: "Linux", level: 95, icon: <Terminal className="h-4 w-4" /> },
  ],
  "Cloud Skills": [
    { name: "Amazon Web Services (AWS)", level: 95, icon: <Cloud className="h-4 w-4" /> },
  ],
  "Configuration Management": [
    { name: "Jenkins", level: 92, icon: <Settings className="h-4 w-4" /> },
    { name: "Ansible", level: 90, icon: <Puzzle className="h-4 w-4" /> },
  ],
  "Monitoring Tools": [
    { name: "Grafana", level: 88, icon: <Activity className="h-4 w-4" /> },
    { name: "Prometheus", level: 90, icon: <Activity className="h-4 w-4" /> },
    { name: "Zabbix", level: 85, icon: <Activity className="h-4 w-4" /> },
    { name: "Datadog", level: 88, icon: <Activity className="h-4 w-4" /> },
    { name: "New Relic", level: 85, icon: <Activity className="h-4 w-4" /> },
  ],
  "CI/CD": [
    { name: "GitHub Actions", level: 92, icon: <Github className="h-4 w-4" /> },
    { name: "Jenkins", level: 95, icon: <Settings className="h-4 w-4" /> },
    { name: "Argo CD", level: 90, icon: <GitBranch className="h-4 w-4" /> },
    { name: "CircleCI", level: 88, icon: <GitBranch className="h-4 w-4" /> },
  ],
  "Version Control Tools": [
    { name: "Git", level: 95, icon: <GitBranch className="h-4 w-4" /> },
    { name: "GitHub", level: 95, icon: <Github className="h-4 w-4" /> },
    { name: "GitLab", level: 90, icon: <GitBranch className="h-4 w-4" /> },
  ],
  "IAC": [
    { name: "Terraform", level: 95, icon: <Layers className="h-4 w-4" /> },
    { name: "AWS CDK", level: 90, icon: <Cloud className="h-4 w-4" /> },
  ],
  "Scanning & Artifactory": [
    { name: "Frog Artifactory", level: 85, icon: <Package className="h-4 w-4" /> },
    { name: "Nexus", level: 88, icon: <Package className="h-4 w-4" /> },
    { name: "Sonar", level: 90, icon: <Code className="h-4 w-4" /> },
  ],
  "Containerization Tools": [
    { name: "Kubernetes-Helm", level: 92, icon: <Cpu className="h-4 w-4" /> },
    { name: "Docker", level: 95, icon: <Layers className="h-4 w-4" /> },
    { name: "Docker Swarm", level: 88, icon: <Layers className="h-4 w-4" /> },
  ],
  "Project Management": [
    { name: "Jira", level: 90, icon: <Layout className="h-4 w-4" /> },
    { name: "Confluence", level: 88, icon: <FileCode className="h-4 w-4" /> },
  ],
  "Scripting": [
    { name: "Shell Scripting", level: 95, icon: <Terminal className="h-4 w-4" /> },
  ],
  "Databases": [
    { name: "MySQL", level: 88, icon: <Database className="h-4 w-4" /> },
    { name: "MariaDB", level: 85, icon: <Database className="h-4 w-4" /> },
    { name: "PostgreSQL", level: 88, icon: <Database className="h-4 w-4" /> },
    { name: "MongoDB", level: 85, icon: <Database className="h-4 w-4" /> },
  ],
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Operating Systems");

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
                        {skillsData[category as keyof typeof skillsData][0].icon}
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
                  {skillsData[activeCategory as keyof typeof skillsData].map((skill, index) => (
                    <div
                      key={skill.name}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-medium flex items-center gap-2">
                          {skill.icon}
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
