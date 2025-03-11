import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Resume {
  id: string;
  name: string;
  content: string;
}

const ResumeManager = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [newResumeName, setNewResumeName] = useState("");
  const [resumeContent, setResumeContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load resumes from localStorage
    const savedResumes = localStorage.getItem("resumes");
    if (savedResumes) {
      setResumes(JSON.parse(savedResumes));
    }
  }, []);

  useEffect(() => {
    // Set active resume content when activeResumeId changes
    if (activeResumeId) {
      const activeResume = resumes.find((resume) => resume.id === activeResumeId);
      if (activeResume) {
        setResumeContent(activeResume.content);
      }
    } else {
      setResumeContent("");
    }
  }, [activeResumeId, resumes]);

  const saveResumes = (updatedResumes: Resume[]) => {
    localStorage.setItem("resumes", JSON.stringify(updatedResumes));
    setResumes(updatedResumes);
  };

  const handleCreateResume = () => {
    if (!newResumeName.trim()) {
      toast.error("Resume name cannot be empty");
      return;
    }

    const newResume: Resume = {
      id: Date.now().toString(),
      name: newResumeName,
      content: "",
    };

    saveResumes([...resumes, newResume]);
    setActiveResumeId(newResume.id);
    setNewResumeName("");
    setIsEditing(true);
    toast.success("Resume created successfully");
  };

  const handleUpdateResume = () => {
    if (!activeResumeId) return;

    const updatedResumes = resumes.map((resume) =>
      resume.id === activeResumeId ? { ...resume, content: resumeContent } : resume
    );

    saveResumes(updatedResumes);
    toast.success("Resume updated successfully");
  };

  const handleDeleteResume = (resumeId: string) => {
    const updatedResumes = resumes.filter((resume) => resume.id !== resumeId);
    saveResumes(updatedResumes);
    setActiveResumeId(null);
    toast.success("Resume deleted successfully");
  };

  const handleDownloadResume = () => {
    if (!activeResumeId) return;

    const activeResume = resumes.find((resume) => resume.id === activeResumeId);
    if (!activeResume) return;

    const blob = new Blob([activeResume.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeResume.name}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUploadResume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setResumeContent(content);

      if (activeResumeId) {
        const updatedResumes = resumes.map((resume) =>
          resume.id === activeResumeId ? { ...resume, content: content } : resume
        );
        saveResumes(updatedResumes);
        toast.success("Resume uploaded successfully");
      } else {
        // If no resume is selected, create a new one
        const newResume: Resume = {
          id: Date.now().toString(),
          name: file.name.replace(".txt", "").replace(".pdf", ""),
          content: content,
        };
        saveResumes([...resumes, newResume]);
        setActiveResumeId(newResume.id);
        toast.success("Resume uploaded and created successfully");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeResumeId ? "edit" : "create"}>
        <TabsList className="mb-4">
          <TabsTrigger value="create">Create Resume</TabsTrigger>
          <TabsTrigger value="edit" disabled={!activeResumeId}>
            Edit Resume
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card className="glass-card">
            <CardContent className="p-6">
              <Label htmlFor="resume-name" className="mb-2">
                New Resume Name
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="resume-name"
                  placeholder="e.g., Software Engineer Resume"
                  value={newResumeName}
                  onChange={(e) => setNewResumeName(e.target.value)}
                />
                <Button onClick={handleCreateResume}>Create</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <Card className="glass-card">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Select Resume</h3>
                  <div className="space-y-2">
                    {resumes.map((resume) => (
                      <Button
                        key={resume.id}
                        variant={activeResumeId === resume.id ? "secondary" : "outline"}
                        className="w-full justify-start"
                        onClick={() => {
                          setActiveResumeId(resume.id);
                          setIsEditing(true);
                        }}
                      >
                        {resume.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-3">
              <Card className="glass-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                      {activeResumeId
                        ? resumes.find((resume) => resume.id === activeResumeId)?.name
                        : "No Resume Selected"}
                    </h3>
                    <div className="flex space-x-2">
                      <Button onClick={handleUpdateResume} disabled={!activeResumeId}>
                        Update
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => activeResumeId && handleDeleteResume(activeResumeId)}
                        disabled={!activeResumeId}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={handleDownloadResume}
                        disabled={!activeResumeId}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  {activeResumeId ? (
                    <>
                      <Label htmlFor="resume-content">Resume Content</Label>
                      <Textarea
                        id="resume-content"
                        value={resumeContent}
                        onChange={(e) => setResumeContent(e.target.value)}
                        className="h-96 resize-none"
                      />

                      <div className="flex items-center space-x-2 mt-4">
                        <Label htmlFor="upload-resume" className="cursor-pointer">
                          <Card className="bg-secondary text-secondary-foreground p-3 rounded-md hover:bg-secondary/80 transition-colors">
                            <div className="flex items-center space-x-2">
                              <Upload className="h-4 w-4" />
                              <span>Upload Resume</span>
                            </div>
                          </Card>
                        </Label>
                        <Input
                          type="file"
                          id="upload-resume"
                          className="hidden"
                          onChange={handleUploadResume}
                          accept=".txt, .pdf"
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-muted-foreground">Select a resume to edit or create a new one.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeManager;
