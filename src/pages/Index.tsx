
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen page-transition">
      <NavBar />
      
      <main>
        <Hero />
        <Skills />
        <Experience />
        
        {/* CTA Section */}
        <section className="section bg-primary text-primary-foreground">
          <div className="container-tight text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Cloud Infrastructure?</h2>
              <p className="text-primary-foreground/90 mb-8 text-lg">
                Let's discuss how my expertise in AWS and GCP can help your organization 
                achieve scalable, secure, and cost-effective cloud solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  size="lg" 
                  variant="secondary" 
                  className="font-medium"
                >
                  <Link to="/contact">Schedule a Consultation</Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white/30 text-white hover:bg-white/10"
                >
                  <Link to="/resume">
                    View My Resume
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
