import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle, Save, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Experience } from "@/lib/supabase";

// Initial default experiences
const defaultExperiences = [
  {
    id: "1",
    title: "Senior DevOps Engineer",
    company: "TechGlobe Solutions",
    period: "2021 - Present",
    description: "Leading cloud infrastructure architecture and CI/CD pipeline development for enterprise clients. Reduced deployment time by 70% and achieved 99.99% uptime across all systems.",
    technologies: ["AWS", "Kubernetes", "Terraform", "Jenkins", "Prometheus"],
    highlight: true,
    user_id: "", // Will be populated with the actual user ID when needed
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    company: "Innovate Systems Inc.",
    title: "Cloud Infrastructure Engineer",
    period: "2018 - 2021",
    description: "Designed and implemented multi-region cloud architecture on GCP. Managed migration of legacy applications to containerized microservices architecture.",
    technologies: ["GCP", "Docker", "Kubernetes", "GitLab CI", "Terraform"],
    highlight: false,
  },
  {
    id: "3",
    company: "DataFlow Technologies",
    title: "DevOps Specialist",
    period: "2016 - 2018",
    description: "Implemented CI/CD pipelines and automated infrastructure deployment processes. Reduced infrastructure costs by 35% through optimization.",
    technologies: ["AWS", "Docker", "CloudFormation", "Jenkins", "ELK Stack"],
    highlight: false,
  },
];

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  highlight: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

const ExperienceEditor = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [newTechnology, setNewTechnology] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndExperiences = async () => {
      try {
        // Get the current user session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user?.id) {
          setUserId(session.user.id);
          
          // Fetch user's experiences from Supabase
          const { data, error } = await supabase
            .from('experiences')
            .select('*')
            .eq('user_id', session.user.id);
          
          if (error) throw error;
          
          if (data && data.length > 0) {
            setExperiences(data);
          } else {
            // If no experiences exist yet, use defaults but assign the user_id
            const defaultsWithUserId = defaultExperiences.map(exp => ({
              ...exp,
              user_id: session.user.id
            }));
            setExperiences(defaultsWithUserId);
            
            // Optionally save these defaults to the database
            // This is commented out as you might not want to automatically create records
            // await Promise.all(defaultsWithUserId.map(exp => supabase.from('experiences').insert(exp)));
          }
        } else {
          // Fallback to localStorage for development/demo
          const savedExperiences = localStorage.getItem("experiences");
          if (savedExperiences) {
            setExperiences(JSON.parse(savedExperiences));
          } else {
            setExperiences(defaultExperiences);
            localStorage.setItem("experiences", JSON.stringify(defaultExperiences));
          }
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
        toast.error("Failed to load experiences");
        
        // Fallback to localStorage
        const savedExperiences = localStorage.getItem("experiences");
        if (savedExperiences) {
          setExperiences(JSON.parse(savedExperiences));
        } else {
          setExperiences(defaultExperiences);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserAndExperiences();
  }, []);

  const saveExperiences = async (updatedExperiences: Experience[]) => {
    try {
      if (userId) {
        // If we have a userId, we're using Supabase
        // This is simplified - in a real app you might need more complex logic for updates
        await supabase.from('experiences').upsert(updatedExperiences);
      } else {
        // Fallback to localStorage
        localStorage.setItem("experiences", JSON.stringify(updatedExperiences));
      }
      
      setExperiences(updatedExperiences);
    } catch (error) {
      console.error("Error saving experiences:", error);
      toast.error("Failed to save experiences");
      
      // Always update the local state even if the server save failed
      setExperiences(updatedExperiences);
      
      // Fallback to localStorage
      localStorage.setItem("experiences", JSON.stringify(updatedExperiences));
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience({...experience});
  };

  const handleDelete = (id: string) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    saveExperiences(updatedExperiences);
    toast.success("Experience deleted successfully");
  };

  const handleAddNew = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: "New Position",
      company: "Company Name",
      period: "Start - End",
      description: "Describe your responsibilities and achievements",
      technologies: ["Technology"],
      highlight: false,
      user_id: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setEditingExperience(newExperience);
  };

  const handleSave = () => {
    if (!editingExperience) return;
    
    let updatedExperiences;
    const existingIndex = experiences.findIndex(exp => exp.id === editingExperience.id);
    
    if (existingIndex >= 0) {
      updatedExperiences = [...experiences];
      updatedExperiences[existingIndex] = editingExperience;
    } else {
      updatedExperiences = [...experiences, editingExperience];
    }
    
    saveExperiences(updatedExperiences);
    setEditingExperience(null);
    toast.success("Experience saved successfully");
  };

  const handleCancel = () => {
    setEditingExperience(null);
  };

  const handleAddTechnology = () => {
    if (!editingExperience || !newTechnology.trim()) return;
    
    setEditingExperience({
      ...editingExperience,
      technologies: [...editingExperience.technologies, newTechnology.trim()]
    });
    
    setNewTechnology("");
  };

  const handleRemoveTechnology = (tech: string) => {
    if (!editingExperience) return;
    
    setEditingExperience({
      ...editingExperience,
      technologies: editingExperience.technologies.filter(t => t !== tech)
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {editingExperience ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold mb-4">
              {editingExperience.id ? "Edit Experience" : "Add New Experience"}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input 
                  id="job-title" 
                  value={editingExperience.title}
                  onChange={(e) => setEditingExperience({...editingExperience, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  value={editingExperience.company}
                  onChange={(e) => setEditingExperience({...editingExperience, company: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="period">Period</Label>
              <Input 
                id="period" 
                value={editingExperience.period}
                onChange={(e) => setEditingExperience({...editingExperience, period: e.target.value})}
                placeholder="e.g., 2021 - Present"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                rows={4}
                value={editingExperience.description}
                onChange={(e) => setEditingExperience({...editingExperience, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Technologies</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {editingExperience.technologies.map(tech => (
                  <div 
                    key={tech} 
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {tech}
                    <button 
                      onClick={() => handleRemoveTechnology(tech)}
                      className="text-secondary-foreground/70 hover:text-secondary-foreground ml-1"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input 
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="Add technology"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTechnology();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTechnology} size="sm">Add</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  id="highlight"
                  checked={editingExperience.highlight}
                  onChange={(e) => setEditingExperience({...editingExperience, highlight: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="highlight">Highlight this experience</Label>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={handleAddNew} className="mb-4 gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Experience
        </Button>
      )}
      
      <div className="space-y-4">
        {experiences.map(experience => (
          <Card key={experience.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className={`p-6 ${experience.highlight ? 'border-l-4 border-l-primary' : ''}`}>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-xl">{experience.title}</h3>
                    <p className="text-foreground/70">{experience.company}</p>
                  </div>
                  <span className="text-sm font-medium bg-secondary text-secondary-foreground py-1 px-3 rounded-full">
                    {experience.period}
                  </span>
                </div>
                
                <p className="mb-4 text-foreground/80">{experience.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {experience.technologies.map(tech => (
                    <span key={tech} className="bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => handleDelete(experience.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => handleEdit(experience)}
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExperienceEditor;
