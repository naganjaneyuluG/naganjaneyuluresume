
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, Save, Trash2, Edit, Settings } from "lucide-react";
import { toast } from "sonner";

// Default skills categories and skills
const defaultSkillsData = {
  "Operating Systems": [
    { name: "Red Hat Linux", level: 90, icon: "Server" },
    { name: "Amazon Linux", level: 92, icon: "Cloud" },
    { name: "Rocky Linux", level: 85, icon: "Server" },
    { name: "Ubuntu", level: 95, icon: "Server" },
    { name: "CentOS", level: 88, icon: "Server" },
    { name: "Linux", level: 95, icon: "Terminal" },
  ],
  "Cloud Skills": [
    { name: "Amazon Web Services (AWS)", level: 95, icon: "Cloud" },
  ],
  // ... more categories from the Skills.tsx component
};

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillsData {
  [category: string]: Skill[];
}

const SkillsEditor = () => {
  const [skillsData, setSkillsData] = useState<SkillsData>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillIndex, setSkillIndex] = useState<number | null>(null);

  useEffect(() => {
    // Load skills from localStorage or use defaults
    const savedSkills = localStorage.getItem("skillsData");
    let skills: SkillsData;
    
    if (savedSkills) {
      skills = JSON.parse(savedSkills);
    } else {
      skills = defaultSkillsData;
      localStorage.setItem("skillsData", JSON.stringify(defaultSkillsData));
    }
    
    setSkillsData(skills);
    setCategories(Object.keys(skills));
    if (Object.keys(skills).length > 0) {
      setCurrentCategory(Object.keys(skills)[0]);
    }
  }, []);

  const saveSkillsData = (updatedSkills: SkillsData) => {
    localStorage.setItem("skillsData", JSON.stringify(updatedSkills));
    setSkillsData(updatedSkills);
    setCategories(Object.keys(updatedSkills));
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    
    if (categories.includes(newCategoryName)) {
      toast.error("Category already exists");
      return;
    }
    
    const updatedSkills = {
      ...skillsData,
      [newCategoryName]: []
    };
    
    saveSkillsData(updatedSkills);
    setCurrentCategory(newCategoryName);
    setNewCategoryName("");
    toast.success("Category added successfully");
  };

  const handleRenameCategory = () => {
    if (!editingCategory || !newCategoryName.trim()) return;
    
    if (categories.includes(newCategoryName)) {
      toast.error("Category already exists");
      return;
    }
    
    const updatedSkills = { ...skillsData };
    updatedSkills[newCategoryName] = updatedSkills[editingCategory];
    delete updatedSkills[editingCategory];
    
    saveSkillsData(updatedSkills);
    setCurrentCategory(newCategoryName);
    setEditingCategory(null);
    setNewCategoryName("");
    toast.success("Category renamed successfully");
  };

  const handleDeleteCategory = (category: string) => {
    if (categories.length <= 1) {
      toast.error("Cannot delete the last category");
      return;
    }
    
    const updatedSkills = { ...skillsData };
    delete updatedSkills[category];
    
    saveSkillsData(updatedSkills);
    setCurrentCategory(Object.keys(updatedSkills)[0]);
    toast.success("Category deleted successfully");
  };

  const handleEditSkill = (skill: Skill, index: number) => {
    setEditingSkill({ ...skill });
    setSkillIndex(index);
  };

  const handleAddSkill = () => {
    setEditingSkill({ name: "", level: 80, icon: "Code" });
    setSkillIndex(null);
  };

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = { ...skillsData };
    updatedSkills[currentCategory] = [
      ...updatedSkills[currentCategory].slice(0, index),
      ...updatedSkills[currentCategory].slice(index + 1)
    ];
    
    saveSkillsData(updatedSkills);
    toast.success("Skill deleted successfully");
  };

  const handleSaveSkill = () => {
    if (!editingSkill || !currentCategory) return;
    
    const updatedSkills = { ...skillsData };
    
    if (skillIndex !== null) {
      // Edit existing skill
      updatedSkills[currentCategory] = [
        ...updatedSkills[currentCategory].slice(0, skillIndex),
        editingSkill,
        ...updatedSkills[currentCategory].slice(skillIndex + 1)
      ];
    } else {
      // Add new skill
      updatedSkills[currentCategory] = [
        ...updatedSkills[currentCategory],
        editingSkill
      ];
    }
    
    saveSkillsData(updatedSkills);
    setEditingSkill(null);
    setSkillIndex(null);
    toast.success("Skill saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Skill Categories</h3>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8"
                  onClick={() => {
                    setEditingCategory(null);
                    setNewCategoryName("");
                  }}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              
              {editingCategory === null && newCategoryName === "" ? (
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category} className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentCategory(category)}
                        className={`flex-grow text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                          currentCategory === category
                            ? "bg-primary text-white font-medium"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <Settings className="h-4 w-4" />
                        {category}
                      </button>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCategory(category);
                            setNewCategoryName(category);
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCategory(category);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="category-name">
                    {editingCategory ? "Rename Category" : "New Category Name"}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="category-name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Category name"
                    />
                    <Button
                      onClick={editingCategory ? handleRenameCategory : handleAddCategory}
                    >
                      {editingCategory ? "Update" : "Add"}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full mt-2"
                    onClick={() => {
                      setEditingCategory(null);
                      setNewCategoryName("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="glass-card">
            <CardContent className="p-6">
              {currentCategory ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-xl">{currentCategory}</h3>
                    <Button onClick={handleAddSkill} size="sm" className="gap-1">
                      <PlusCircle className="h-4 w-4" />
                      Add Skill
                    </Button>
                  </div>
                  
                  {editingSkill ? (
                    <div className="space-y-4 mb-6 p-4 border rounded-md">
                      <h4 className="font-medium">
                        {skillIndex !== null ? "Edit Skill" : "Add New Skill"}
                      </h4>
                      
                      <div className="space-y-2">
                        <Label htmlFor="skill-name">Skill Name</Label>
                        <Input
                          id="skill-name"
                          value={editingSkill.name}
                          onChange={(e) => setEditingSkill({...editingSkill, name: e.target.value})}
                          placeholder="e.g., Docker"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="skill-level">
                          Proficiency Level: {editingSkill.level}%
                        </Label>
                        <Input
                          id="skill-level"
                          type="range"
                          min="1"
                          max="100"
                          value={editingSkill.level}
                          onChange={(e) => setEditingSkill({
                            ...editingSkill, 
                            level: parseInt(e.target.value)
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="skill-icon">Icon Name</Label>
                        <Input
                          id="skill-icon"
                          value={editingSkill.icon}
                          onChange={(e) => setEditingSkill({...editingSkill, icon: e.target.value})}
                          placeholder="e.g., Server, Cloud, Code"
                        />
                        <p className="text-xs text-muted-foreground">
                          Use icon names from Lucide React: Server, Cloud, Code, Terminal, etc.
                        </p>
                      </div>
                      
                      <div className="flex justify-end gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setEditingSkill(null);
                            setSkillIndex(null);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleSaveSkill} className="gap-2">
                          <Save className="h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : null}
                  
                  <div className="space-y-4">
                    {skillsData[currentCategory]?.map((skill, index) => (
                      <div key={index} className="animate-fade-in">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium flex items-center gap-2">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                              {skill.level}%
                            </span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => handleEditSkill(skill, index)}
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-7 w-7 p-0 text-destructive"
                              onClick={() => handleDeleteSkill(index)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    
                    {skillsData[currentCategory]?.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No skills added yet. Click "Add Skill" to get started.</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No categories found. Add a category to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillsEditor;
