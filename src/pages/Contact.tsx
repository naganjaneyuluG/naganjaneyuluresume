
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";

const Contact = () => {
  return (
    <div className="min-h-screen page-transition">
      <NavBar />
      
      <main className="pt-24 pb-16">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-foreground/70">
              Have a project in mind or want to discuss potential opportunities?
              Let's connect and explore how my DevOps expertise can benefit your organization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-6">
                <h2 className="text-2xl font-bold mb-6">Schedule an Interview</h2>
                <ContactForm />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <ContactInfo />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
