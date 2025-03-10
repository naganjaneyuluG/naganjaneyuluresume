
import { Link } from "react-router-dom";
import { Mail, Phone, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container-tight">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl">DevOps<span className="text-primary">Pro</span></span>
            </Link>
            <p className="text-foreground/70 mb-4">
              Expert DevOps engineer with specialization in AWS and GCP cloud infrastructure. 
              Building scalable, reliable, and secure systems.
            </p>
            <div className="space-y-2">
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
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Resume", path: "/resume" },
                { label: "Contact", path: "/contact" },
                { label: "Download Resume", path: "/resume.pdf", download: true },
              ].map((link) => (
                <li key={link.label}>
                  {link.download ? (
                    <a 
                      href={link.path} 
                      download
                      className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>{link.label}</span>
                    </a>
                  ) : (
                    <Link 
                      to={link.path}
                      className="text-foreground/70 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                asChild
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                asChild
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  GitHub
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                asChild
              >
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  Twitter
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
            © {currentYear} DevOpsPro. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-foreground/60 hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/" className="text-sm text-foreground/60 hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
