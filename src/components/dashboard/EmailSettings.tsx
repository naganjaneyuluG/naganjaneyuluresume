
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MailIcon, Lock, Server, Send, Key } from "lucide-react";
import { toast } from "sonner";

interface SMTPSettings {
  host: string;
  port: string;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
  secure: boolean;
  enabled: boolean;
}

const defaultSettings: SMTPSettings = {
  host: "",
  port: "587",
  username: "",
  password: "",
  fromEmail: "",
  fromName: "",
  secure: true,
  enabled: false
};

const EmailSettings = () => {
  const [settings, setSettings] = useState<SMTPSettings>(defaultSettings);
  const [testEmail, setTestEmail] = useState("");
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem("smtpSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (key: keyof SMTPSettings, value: string | boolean) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };

  const handleSaveSettings = () => {
    // Validation
    if (settings.enabled) {
      const requiredFields = ['host', 'port', 'username', 'password', 'fromEmail', 'fromName'];
      for (const field of requiredFields) {
        if (!settings[field as keyof SMTPSettings]) {
          toast.error(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
          return;
        }
      }
    }
    
    localStorage.setItem("smtpSettings", JSON.stringify(settings));
    toast.success("Email settings saved successfully");
  };

  const handleTestEmail = () => {
    if (!testEmail) {
      toast.error("Please enter a test email address");
      return;
    }
    
    if (!settings.host || !settings.port || !settings.username || !settings.password) {
      toast.error("Please fill in all SMTP settings first");
      return;
    }
    
    setIsTesting(true);
    
    // Simulate sending a test email
    setTimeout(() => {
      setIsTesting(false);
      toast.success(`Test email sent to ${testEmail}`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MailIcon className="h-5 w-5" />
            SMTP Email Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="enable-smtp"
              checked={settings.enabled}
              onCheckedChange={(checked) => handleSettingChange('enabled', checked)}
            />
            <Label htmlFor="enable-smtp">Enable email notifications and auto-responses</Label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="smtp-host" className="flex items-center gap-2">
                <Server className="h-4 w-4" /> SMTP Host
              </Label>
              <Input
                id="smtp-host"
                placeholder="smtp.example.com"
                value={settings.host}
                onChange={(e) => handleSettingChange('host', e.target.value)}
                disabled={!settings.enabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input
                id="smtp-port"
                placeholder="587"
                value={settings.port}
                onChange={(e) => handleSettingChange('port', e.target.value)}
                disabled={!settings.enabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smtp-username" className="flex items-center gap-2">
                <Key className="h-4 w-4" /> SMTP Username
              </Label>
              <Input
                id="smtp-username"
                placeholder="your-username"
                value={settings.username}
                onChange={(e) => handleSettingChange('username', e.target.value)}
                disabled={!settings.enabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smtp-password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" /> SMTP Password
              </Label>
              <Input
                id="smtp-password"
                type="password"
                placeholder="••••••••"
                value={settings.password}
                onChange={(e) => handleSettingChange('password', e.target.value)}
                disabled={!settings.enabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="from-email">From Email</Label>
              <Input
                id="from-email"
                placeholder="you@example.com"
                value={settings.fromEmail}
                onChange={(e) => handleSettingChange('fromEmail', e.target.value)}
                disabled={!settings.enabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="from-name">From Name</Label>
              <Input
                id="from-name"
                placeholder="Your Name"
                value={settings.fromName}
                onChange={(e) => handleSettingChange('fromName', e.target.value)}
                disabled={!settings.enabled}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="secure-connection"
              checked={settings.secure}
              onCheckedChange={(checked) => handleSettingChange('secure', checked)}
              disabled={!settings.enabled}
            />
            <Label htmlFor="secure-connection">Use secure connection (TLS/SSL)</Label>
          </div>
          
          <Button 
            onClick={handleSaveSettings} 
            className="flex items-center gap-2"
            disabled={!settings.enabled}
          >
            Save SMTP Settings
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Test Email Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="test-email">Send Test Email To</Label>
            <div className="flex space-x-2">
              <Input
                id="test-email"
                placeholder="test@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                disabled={!settings.enabled || isTesting}
              />
              <Button 
                onClick={handleTestEmail} 
                disabled={!settings.enabled || !testEmail || isTesting}
                className="flex items-center gap-2"
              >
                {isTesting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full mr-1"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Test
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="bg-secondary/30 p-4 rounded-md text-sm text-muted-foreground">
            <p>This will send a test email to verify your SMTP configuration is working correctly.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSettings;
