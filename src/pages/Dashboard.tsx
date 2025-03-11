
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Save, PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ExperienceEditor from "@/components/dashboard/ExperienceEditor";
import SkillsEditor from "@/components/dashboard/SkillsEditor";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      toast.error("Unauthorized access", {
        description: "You must be logged in to view this page.",
      });
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container-tight">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
          
          <Tabs defaultValue="experience">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="experience">Work Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            
            <TabsContent value="experience" className="space-y-4">
              <ExperienceEditor />
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-4">
              <SkillsEditor />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
