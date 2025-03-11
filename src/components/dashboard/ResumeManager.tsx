
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FilePdf, Upload, Download, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";

interface Resume {
  id: string;
  title: string;
  fileName: string;
  fileData: string;
  uploadDate: string;
  isDefault: boolean;
}

const ResumeManager = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeTitle, setResumeTitle] = useState("");

  useEffect(() => {
    // Load saved resumes
    const savedResumes = localStorage.getItem("resumes");
    if (savedResumes) {
      setResumes(JSON.parse(savedResumes));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        toast.error("Please upload a PDF file");
        return;
      }
      
      setResumeFile(file);
      if (!resumeTitle) {
        // Set the title to the file name without extension
        setResumeTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleUploadResume = async () => {
    if (!resumeFile) {
      toast.error("Please select a PDF file to upload");
      return;
    }

    if (!resumeTitle.trim()) {
      toast.error("Please provide a title for your resume");
      return;
    }

    // Convert PDF to base64
    const reader = new FileReader();
    reader.readAsDataURL(resumeFile);
    
    reader.onloadend = () => {
      const base64data = reader.result as string;
      
      const newResume: Resume = {
        id: Date.now().toString(),
        title: resumeTitle,
        fileName: resumeFile.name,
        fileData: base64data,
        uploadDate: new Date().toISOString(),
        isDefault: resumes.length === 0 // First upload becomes default
      };
      
      const updatedResumes = [...resumes, newResume];
      setResumes(updatedResumes);
      localStorage.setItem("resumes", JSON.stringify(updatedResumes));
      
      // Reset form
      setResumeFile(null);
      setResumeTitle("");
      
      toast.success("Resume uploaded successfully");
    };
  };

  const handleSetDefault = (id: string) => {
    const updatedResumes = resumes.map(resume => ({
      ...resume,
      isDefault: resume.id === id
    }));
    
    setResumes(updatedResumes);
    localStorage.setItem("resumes", JSON.stringify(updatedResumes));
    toast.success("Default resume updated");
  };

  const handleDownload = (resume: Resume) => {
    // Create a link element
    const link = document.createElement('a');
    link.href = resume.fileData;
    link.download = resume.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (id: string) => {
    const updatedResumes = resumes.filter(resume => resume.id !== id);
    
    // If we deleted the default resume and there are other resumes, set a new default
    if (updatedResumes.length > 0 && !updatedResumes.some(r => r.isDefault)) {
      updatedResumes[0].isDefault = true;
    }
    
    setResumes(updatedResumes);
    localStorage.setItem("resumes", JSON.stringify(updatedResumes));
    toast.success("Resume deleted");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Resume
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resume-title">Resume Title</Label>
            <Input
              id="resume-title"
              placeholder="e.g., Software Developer Resume 2023"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resume-file">PDF File</Label>
            <Input
              id="resume-file"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            {resumeFile && (
              <p className="text-sm text-muted-foreground">
                Selected file: {resumeFile.name} ({Math.round(resumeFile.size / 1024)} KB)
              </p>
            )}
          </div>
          
          <Button 
            onClick={handleUploadResume} 
            className="flex items-center gap-2 w-full md:w-auto mt-2"
          >
            <FilePdf className="h-4 w-4" />
            Upload Resume
          </Button>
        </CardContent>
      </Card>
      
      <h3 className="text-xl font-semibold mt-8 mb-4">Manage Your Resumes</h3>
      
      {resumes.length === 0 ? (
        <Card className="p-8 text-center bg-muted/40">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">You haven't uploaded any resumes yet.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {resumes.map(resume => (
            <Card key={resume.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <FilePdf className="h-10 w-10 text-primary" />
                    <div>
                      <h4 className="font-semibold text-lg">{resume.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Uploaded on {formatDate(resume.uploadDate)}
                      </p>
                    </div>
                    {resume.isDefault && (
                      <span className="ml-2 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2 w-full md:w-auto">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleDownload(resume)}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    
                    {!resume.isDefault && (
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleSetDefault(resume.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleDelete(resume.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeManager;
