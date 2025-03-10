
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, ExternalLink } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <Card className="glass-card animate-fade-in">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-foreground/70">example@email.com</p>
            </div>
          </div>
          
          <Button asChild className="w-full" variant="outline">
            <a href="mailto:example@email.com">
              Send Email
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
      
      <Card className="glass-card animate-fade-in" style={{ animationDelay: "100ms" }}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-green-600"
              >
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1zm0 0a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">WhatsApp</h3>
              <p className="text-foreground/70">+1 (123) 456-7890</p>
            </div>
          </div>
          
          <Button asChild className="w-full" variant="outline">
            <a 
              href="https://wa.me/11234567890" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
      
      <Card className="glass-card animate-fade-in" style={{ animationDelay: "200ms" }}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-foreground/70">+1 (123) 456-7890</p>
            </div>
          </div>
          
          <Button asChild className="w-full" variant="outline">
            <a href="tel:+11234567890">
              Call Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
      
      <Card className="glass-card animate-fade-in" style={{ animationDelay: "300ms" }}>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Social Profiles</h3>
          
          <div className="grid grid-cols-3 gap-4">
            {[
              { 
                name: "LinkedIn", 
                icon: () => (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
                url: "https://linkedin.com",
                bgColor: "bg-[#0077B5]/10",
                textColor: "text-[#0077B5]"
              },
              { 
                name: "GitHub", 
                icon: () => (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                ),
                url: "https://github.com",
                bgColor: "bg-gray-100",
                textColor: "text-gray-900"
              },
              { 
                name: "Twitter", 
                icon: () => (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                ),
                url: "https://twitter.com",
                bgColor: "bg-[#1DA1F2]/10",
                textColor: "text-[#1DA1F2]"
              }
            ].map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`${social.bgColor} p-2 rounded-full ${social.textColor}`}>
                  {social.icon()}
                </div>
                <span className="text-xs font-medium">{social.name}</span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactInfo;
