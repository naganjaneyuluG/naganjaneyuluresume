
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PaintBucket, ImagePlus, Save, Trash2, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DEFAULT_COLORS = {
  primary: "#1E90FF",
  secondary: "#6C7A89",
  accent: "#FF6B6B",
  background: "#FFFFFF",
  text: "#333333"
};

const DEFAULT_SOCIAL = {
  facebook: "",
  twitter: "",
  instagram: "",
  linkedin: "",
  github: ""
};

const AppearanceSettings = () => {
  const [colors, setColors] = useState(DEFAULT_COLORS);
  const [socialLinks, setSocialLinks] = useState(DEFAULT_SOCIAL);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  useEffect(() => {
    // Load saved colors
    const savedColors = localStorage.getItem("siteColors");
    if (savedColors) {
      setColors(JSON.parse(savedColors));
    }

    // Load saved social links
    const savedSocial = localStorage.getItem("socialLinks");
    if (savedSocial) {
      setSocialLinks(JSON.parse(savedSocial));
    }

    // Load profile image
    const savedProfileImage = localStorage.getItem("profileImage");
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
  }, []);

  const handleColorChange = (colorName: keyof typeof DEFAULT_COLORS, value: string) => {
    setColors({ ...colors, [colorName]: value });
  };

  const handleSocialLinkChange = (platform: keyof typeof DEFAULT_SOCIAL, value: string) => {
    setSocialLinks({ ...socialLinks, [platform]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      setProfileImageFile(file);
      
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAppearance = () => {
    // Save colors to localStorage
    localStorage.setItem("siteColors", JSON.stringify(colors));
    
    // Save social links to localStorage
    localStorage.setItem("socialLinks", JSON.stringify(socialLinks));
    
    // Save profile image to localStorage
    if (profileImage) {
      localStorage.setItem("profileImage", profileImage);
    }
    
    // Apply colors to CSS variables
    document.documentElement.style.setProperty('--primary-color', colors.primary);
    document.documentElement.style.setProperty('--secondary-color', colors.secondary);
    document.documentElement.style.setProperty('--accent-color', colors.accent);
    document.documentElement.style.setProperty('--background-color', colors.background);
    document.documentElement.style.setProperty('--text-color', colors.text);
    
    toast.success("Appearance settings saved successfully");
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setProfileImageFile(null);
    localStorage.removeItem("profileImage");
    toast.success("Profile image removed");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="colors">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="profile">Profile & Social</TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PaintBucket className="h-5 w-5" />
                Website Color Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(colors).map(([colorName, colorValue]) => (
                  <div key={colorName} className="space-y-2">
                    <Label htmlFor={`color-${colorName}`} className="capitalize">{colorName} Color</Label>
                    <div className="flex space-x-2">
                      <div 
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: colorValue }}
                      />
                      <Input
                        id={`color-${colorName}`}
                        type="color"
                        value={colorValue}
                        onChange={(e) => handleColorChange(colorName as keyof typeof DEFAULT_COLORS, e.target.value)}
                        className="w-full h-10"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Color Preview</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="p-4 rounded-md text-white flex items-center justify-center h-12 w-32" 
                      style={{ backgroundColor: colors.primary }}>
                      Primary
                    </div>
                    <div className="p-4 rounded-md text-white flex items-center justify-center h-12 w-32" 
                      style={{ backgroundColor: colors.secondary }}>
                      Secondary
                    </div>
                    <div className="p-4 rounded-md text-white flex items-center justify-center h-12 w-32" 
                      style={{ backgroundColor: colors.accent }}>
                      Accent
                    </div>
                  </div>
                  <div className="p-6 rounded-md flex items-center justify-center" 
                    style={{ backgroundColor: colors.background, color: colors.text }}>
                    This is how text will look on your background
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImagePlus className="h-5 w-5" />
                Profile Image & Social Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Profile Image</Label>
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  {profileImage && (
                    <div className="relative">
                      <img 
                        src={profileImage} 
                        alt="Profile Preview" 
                        className="w-32 h-32 object-cover rounded-full border"
                      />
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                        onClick={handleRemoveImage}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="max-w-md"
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload a square image for best results. Recommended size: 400x400px.
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="facebook" className="flex items-center gap-2">
                      <Facebook className="h-4 w-4" /> Facebook
                    </Label>
                    <Input
                      id="facebook"
                      placeholder="https://facebook.com/username"
                      value={socialLinks.facebook}
                      onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="flex items-center gap-2">
                      <Twitter className="h-4 w-4" /> Twitter
                    </Label>
                    <Input
                      id="twitter"
                      placeholder="https://twitter.com/username"
                      value={socialLinks.twitter}
                      onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="flex items-center gap-2">
                      <Instagram className="h-4 w-4" /> Instagram
                    </Label>
                    <Input
                      id="instagram"
                      placeholder="https://instagram.com/username"
                      value={socialLinks.instagram}
                      onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/in/username"
                      value={socialLinks.linkedin}
                      onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="github" className="flex items-center gap-2">
                      <Github className="h-4 w-4" /> GitHub
                    </Label>
                    <Input
                      id="github"
                      placeholder="https://github.com/username"
                      value={socialLinks.github}
                      onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Button 
        onClick={handleSaveAppearance} 
        className="flex items-center gap-2 w-full md:w-auto md:float-right"
      >
        <Save className="h-4 w-4" />
        Save Appearance Settings
      </Button>
    </div>
  );
};

export default AppearanceSettings;
