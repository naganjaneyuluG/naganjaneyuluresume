
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Save, PlusCircle, Trash2, Lock } from "lucide-react";
import { toast } from "sonner";
import ExperienceEditor from "@/components/dashboard/ExperienceEditor";
import SkillsEditor from "@/components/dashboard/SkillsEditor";
import AppearanceSettings from "@/components/dashboard/AppearanceSettings";
import ResumeManager from "@/components/dashboard/ResumeManager";
import MeetingScheduler from "@/components/dashboard/MeetingScheduler";
import EmailSettings from "@/components/dashboard/EmailSettings";
import PasswordChange from "@/components/dashboard/PasswordChange";

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
            <TabsList className="grid w-full grid-cols-7 mb-8">
              <TabsTrigger value="experience">Work Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="meetings">Meetings</TabsTrigger>
              <TabsTrigger value="email">Email Settings</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            
            <TabsContent value="experience" className="space-y-4">
              <ExperienceEditor />
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-4">
              <SkillsEditor />
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <AppearanceSettings />
            </TabsContent>

            <TabsContent value="resume" className="space-y-4">
              <ResumeManager />
            </TabsContent>

            <TabsContent value="meetings" className="space-y-4">
              <MeetingScheduler />
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <EmailSettings />
            </TabsContent>

            <TabsContent value="password" className="space-y-4">
              <PasswordChange />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
