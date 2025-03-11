
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getExperiences } from "@/utils/localStorage";

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  highlight: boolean;
}

const Experience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    // Load experiences from localStorage
    setExperiences(getExperiences());
  }, []);

  return (
    <section className="section">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-foreground/70">
            A track record of successfully implementing and managing cloud infrastructure at scale.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div 
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20" 
            aria-hidden="true"
          />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div 
                key={`${exp.company}-${index}`}
                className={cn(
                  "relative pl-16 animate-fade-in",
                  { "animate-slide-in-right": index % 2 === 0, "animate-slide-in-left": index % 2 !== 0 }
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Timeline dot */}
                <div 
                  className={cn(
                    "absolute left-7 top-2 w-3 h-3 rounded-full border-2 border-primary transform -translate-x-1/2",
                    exp.highlight ? "bg-primary" : "bg-white"
                  )}
                  aria-hidden="true"
                />

                <Card className={cn(
                  "glass-card transition-all duration-300 hover:shadow-md",
                  exp.highlight && "border-l-4 border-l-primary"
                )}>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                      <div>
                        <h3 className="font-bold text-xl">{exp.title}</h3>
                        <p className="text-foreground/70">{exp.company}</p>
                      </div>
                      <span className="text-sm font-medium bg-secondary text-secondary-foreground py-1 px-3 rounded-full">
                        {exp.period}
                      </span>
                    </div>

                    <p className="mb-4">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map(tech => (
                        <Badge key={tech} variant="secondary" className="rounded-full">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
