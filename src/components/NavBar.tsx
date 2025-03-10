
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { path: "/", label: "Home" },
    { path: "/resume", label: "Resume" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="container-tight flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">DevOps<span className="text-primary">Pro</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors relative",
                location.pathname === link.path 
                  ? "text-primary" 
                  : "text-foreground/80 hover:text-foreground"
              )}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden md:flex items-center gap-2">
            <a href="/resume.pdf" download>
              <Download className="h-4 w-4" />
              <span>Resume</span>
            </a>
          </Button>
          
          <Button asChild size="sm">
            <Link to="/contact">Contact Me</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
