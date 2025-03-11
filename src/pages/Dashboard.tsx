
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
import { supabase } from "@/lib/supabase";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check Supabase session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (!session) {
          // Fallback to localStorage for demo authentication
          const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
          
          if (!isLoggedIn) {
            throw new Error("Not authenticated");
          }
          
          // Demo user from localStorage
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } else {
          // Set authenticated Supabase user
          setUser(session.user);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Authentication error:", error);
        toast.error("Unauthorized access", {
          description: "You must be logged in to view this page.",
        });
        navigate("/login");
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Supabase sign out
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Also clear localStorage (for demo fallback)
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error signing out");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <NavBar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container-tight">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              {user && (
                <p className="text-muted-foreground">
                  Welcome, {user.user_metadata?.full_name || user.name || user.email}
                </p>
              )}
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
          
          <Tabs defaultValue="experience" className="space-y-6">
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
              <ExperienceEditor userId={user?.id} />
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-4">
              <SkillsEditor userId={user?.id} />
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <AppearanceSettings userId={user?.id} />
            </TabsContent>

            <TabsContent value="resume" className="space-y-4">
              <ResumeManager userId={user?.id} />
            </TabsContent>

            <TabsContent value="meetings" className="space-y-4">
              <MeetingScheduler userId={user?.id} />
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <EmailSettings userId={user?.id} />
            </TabsContent>

            <TabsContent value="password" className="space-y-4">
              <PasswordChange userId={user?.id} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
