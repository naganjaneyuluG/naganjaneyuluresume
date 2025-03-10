
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Mail, Phone } from "lucide-react";

const Resume = () => {
  return (
    <div className="min-h-screen page-transition">
      <NavBar />
      
      <main className="pt-24 pb-16">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Naganjaneyulu Gudditi</h1>
              <p className="text-xl text-foreground/70 mb-4">Senior DevOps Engineer</p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="mailto:example@email.com" 
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>example@email.com</span>
                </a>
                <a 
                  href="tel:+11234567890" 
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>+1 (123) 456-7890</span>
                </a>
              </div>
            </div>
            
            <Button asChild className="flex items-center gap-2">
              <a href="/resume.pdf" download>
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </a>
            </Button>
          </div>
          
          <Card className="glass-card mb-8 animate-fade-in">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3">Professional Summary</h2>
              <p className="text-foreground/80">
                Experienced DevOps Engineer with over 7 years of expertise in cloud infrastructure design, 
                implementation, and management. Specialized in AWS and GCP environments with a strong 
                focus on automation, CI/CD pipelines, and containerization. Proven track record of 
                optimizing deployment workflows, enhancing system reliability, and reducing operational costs.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Professional Experience</h2>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Senior DevOps Engineer",
                    company: "TechGlobe Solutions",
                    period: "2021 - Present",
                    responsibilities: [
                      "Led the design and implementation of multi-region Kubernetes clusters on AWS, ensuring 99.99% uptime",
                      "Reduced deployment time by 70% through CI/CD pipeline optimization using Jenkins and GitHub Actions",
                      "Implemented Infrastructure as Code using Terraform, creating reusable modules for rapid environment provisioning",
                      "Engineered automated disaster recovery solutions, reducing recovery time objective (RTO) by 85%",
                      "Mentored junior engineers on cloud best practices and DevOps methodologies"
                    ]
                  },
                  {
                    title: "Cloud Infrastructure Engineer",
                    company: "Innovate Systems Inc.",
                    period: "2018 - 2021",
                    responsibilities: [
                      "Designed and managed GCP infrastructure for microservices architecture serving millions of users",
                      "Implemented GitLab CI pipelines for automated testing and deployment across multiple environments",
                      "Migrated legacy applications to containerized services, improving scalability and reducing costs by 40%",
                      "Created comprehensive monitoring and alerting systems using Prometheus and Grafana",
                      "Collaborated with development teams to optimize application performance in cloud environments"
                    ]
                  },
                  {
                    title: "DevOps Specialist",
                    company: "DataFlow Technologies",
                    period: "2016 - 2018",
                    responsibilities: [
                      "Automated infrastructure provisioning on AWS using CloudFormation and Ansible",
                      "Implemented ELK stack for centralized logging and monitoring across all systems",
                      "Developed CI/CD pipelines for Java and Node.js applications using Jenkins",
                      "Managed containerized applications using Docker and AWS ECS",
                      "Improved system security through implementation of AWS security best practices"
                    ]
                  }
                ].map((job, index) => (
                  <div 
                    key={index}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-foreground/70">{job.company}</p>
                      </div>
                      <span className="text-sm bg-secondary text-secondary-foreground py-1 px-3 rounded-full">
                        {job.period}
                      </span>
                    </div>
                    
                    <ul className="list-disc pl-5 text-foreground/80 space-y-1 mt-2">
                      {job.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    
                    {index < 2 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Skills</h2>
              
              <div className="space-y-6">
                <Card className="glass-card animate-fade-in">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Cloud Platforms</h3>
                    <div className="flex flex-wrap gap-2">
                      {["AWS", "GCP", "Azure"].map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card animate-fade-in" style={{ animationDelay: "100ms" }}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Infrastructure as Code</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Terraform", "CloudFormation", "Pulumi", "Ansible"].map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card animate-fade-in" style={{ animationDelay: "200ms" }}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">CI/CD</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Jenkins", "GitHub Actions", "GitLab CI", "CircleCI"].map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card animate-fade-in" style={{ animationDelay: "300ms" }}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Containerization</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Docker", "Kubernetes", "ECS/EKS", "GKE"].map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card animate-fade-in" style={{ animationDelay: "400ms" }}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Monitoring</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Prometheus", "Grafana", "ELK Stack", "Datadog"].map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Education</h2>
              <Card className="glass-card animate-fade-in">
                <CardContent className="p-4">
                  <h3 className="font-semibold">B.S. Computer Science</h3>
                  <p className="text-foreground/70">University of Technology</p>
                  <p className="text-sm text-foreground/60">2012 - 2016</p>
                </CardContent>
              </Card>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Certifications</h2>
              <div className="space-y-3">
                {[
                  "AWS Certified DevOps Engineer - Professional",
                  "Google Cloud Professional DevOps Engineer",
                  "Certified Kubernetes Administrator (CKA)",
                  "Terraform Associate",
                  "AWS Solutions Architect - Professional",
                ].map((cert, i) => (
                  <div 
                    key={i} 
                    className="bg-secondary/50 p-3 rounded-lg animate-fade-in"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resume;
