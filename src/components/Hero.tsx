
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowDown, Moon, Sun, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

const Hero = () => {
  const { theme, setTheme } = useTheme();
  
  const scrollToSkills = () => {
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div 
        className="absolute top-0 right-0 -z-10 w-full h-full bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-background opacity-50"
        aria-hidden="true"
      />
      
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="absolute top-4 right-4 p-2 rounded-full bg-background/30 backdrop-blur-sm border border-border z-50"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
      
      <div className="container-tight grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in-up">
          <div>
            <div className="mb-2 inline-flex rounded-full px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/50 text-primary">
              DevOps Engineer
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Naganjaneyulu Gudditi
            </h1>
            <p className="text-xl md:text-2xl text-primary mt-2">
              Cloud & Infrastructure Expert
            </p>
          </div>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-xl">
            Specializing in AWS and GCP infrastructure architecture, automation, and CI/CD pipelines that scale with your needs.
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/contact">Schedule a Call</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full"
              onClick={scrollToSkills}
            >
              Explore My Skills
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="pt-4 flex items-center gap-6">
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
              ].map((src, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative inline-block h-8 w-8 rounded-full border-2 border-white dark:border-gray-800",
                    "transition-all duration-300 ease-in-out",
                    "hover:scale-110 hover:z-10"
                  )}
                  style={{ 
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-foreground/70">
              Trusted by <span className="font-medium text-foreground">20+</span> companies
            </p>
          </div>
        </div>
        
        <div className="relative">
          <div className="relative z-10 animate-fade-in rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src="/profile-image.jpg" // You'll need to add your image to the public folder
              alt="Naganjaneyulu Gudditi - DevOps Engineer"
              className="w-full h-full object-cover"
            />
          </div>
          <div 
            className="absolute -top-6 -right-6 w-64 h-64 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl -z-10"
            aria-hidden="true"
          />
          <div 
            className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl -z-10"
            aria-hidden="true"
          />
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToSkills}
          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-sm"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-5 w-5 text-primary" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
