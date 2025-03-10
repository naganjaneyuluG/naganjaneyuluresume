
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const skills = {
  "Cloud Platforms": [
    { name: "AWS", level: 95 },
    { name: "Google Cloud Platform (GCP)", level: 90 },
    { name: "Azure", level: 75 },
  ],
  "Infrastructure as Code": [
    { name: "Terraform", level: 90 },
    { name: "CloudFormation", level: 85 },
    { name: "Pulumi", level: 80 },
  ],
  "CI/CD & DevOps": [
    { name: "Jenkins", level: 95 },
    { name: "GitHub Actions", level: 90 },
    { name: "GitLab CI", level: 85 },
    { name: "CircleCI", level: 80 },
  ],
  "Containerization & Orchestration": [
    { name: "Docker", level: 95 },
    { name: "Kubernetes", level: 90 },
    { name: "ECS/EKS", level: 85 },
    { name: "GKE", level: 85 },
  ],
  "Monitoring & Observability": [
    { name: "Prometheus", level: 90 },
    { name: "Grafana", level: 85 },
    { name: "ELK Stack", level: 80 },
    { name: "Datadog", level: 85 },
  ],
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Cloud Platforms");

  return (
    <section id="skills" className="section bg-gray-50">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-foreground/70">
            With years of experience building and maintaining cloud infrastructure,
            I've developed deep expertise in AWS and GCP environments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="glass-card sticky top-20">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 text-lg">Skill Categories</h3>
                <ul className="space-y-1">
                  {Object.keys(skills).map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
                          activeCategory === category
                            ? "bg-primary text-white font-medium"
                            : "hover:bg-gray-100"
                        )}
                      >
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
                  {skills[activeCategory as keyof typeof skills].map((skill, index) => (
                    <div
                      key={skill.name}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-foreground/70">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
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
