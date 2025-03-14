
// Function to get experiences from localStorage
export const getExperiences = () => {
  const defaultExperiences = [
    {
      id: "1",
      title: "Senior DevOps Engineer",
      company: "TechGlobe Solutions",
      period: "2021 - Present",
      description: "Leading cloud infrastructure architecture and CI/CD pipeline development for enterprise clients. Reduced deployment time by 70% and achieved 99.99% uptime across all systems.",
      technologies: ["AWS", "Kubernetes", "Terraform", "Jenkins", "Prometheus"],
      highlight: true,
    },
    {
      id: "2",
      company: "Innovate Systems Inc.",
      title: "Cloud Infrastructure Engineer",
      period: "2018 - 2021",
      description: "Designed and implemented multi-region cloud architecture on GCP. Managed migration of legacy applications to containerized microservices architecture.",
      technologies: ["GCP", "Docker", "Kubernetes", "GitLab CI", "Terraform"],
      highlight: false,
    },
    {
      id: "3",
      company: "DataFlow Technologies",
      title: "DevOps Specialist",
      period: "2016 - 2018",
      description: "Implemented CI/CD pipelines and automated infrastructure deployment processes. Reduced infrastructure costs by 35% through optimization.",
      technologies: ["AWS", "Docker", "CloudFormation", "Jenkins", "ELK Stack"],
      highlight: false,
    },
  ];

  try {
    const savedExperiences = localStorage.getItem("experiences");
    return savedExperiences ? JSON.parse(savedExperiences) : defaultExperiences;
  } catch (error) {
    console.error("Error loading experiences:", error);
    return defaultExperiences;
  }
};

// Function to get skills from localStorage
export const getSkillsData = () => {
  const defaultSkillsData = {
    "Operating Systems": [
      { name: "Red Hat Linux", level: 90, icon: "Server" },
      { name: "Amazon Linux", level: 92, icon: "Cloud" },
      { name: "Rocky Linux", level: 85, icon: "Server" },
      { name: "Ubuntu", level: 95, icon: "Server" },
      { name: "CentOS", level: 88, icon: "Server" },
      { name: "Linux", level: 95, icon: "Terminal" },
    ],
    "Cloud Skills": [
      { name: "Amazon Web Services (AWS)", level: 95, icon: "Cloud" },
    ],
    "Configuration Management": [
      { name: "Jenkins", level: 88, icon: "Settings" },
      { name: "Ansible", level: 85, icon: "Settings" },
    ],
    "Monitoring Tools": [
      { name: "Grafana", level: 90, icon: "Activity" },
      { name: "Prometheus", level: 92, icon: "Activity" },
      { name: "Zabbix", level: 82, icon: "Activity" },
      { name: "Datadog", level: 85, icon: "Activity" },
      { name: "New Relic", level: 80, icon: "Activity" },
    ],
    "CI/CD": [
      { name: "GitHub Actions", level: 92, icon: "GitBranch" },
      { name: "Jenkins", level: 90, icon: "Settings" },
      { name: "Argo CD", level: 85, icon: "GitBranch" },
      { name: "CircleCI", level: 80, icon: "GitBranch" },
    ],
    "Version Control Tools": [
      { name: "Git", level: 95, icon: "GitBranch" },
      { name: "GitHub", level: 92, icon: "Github" },
      { name: "GitLab", level: 88, icon: "Github" },
    ],
    "Infrastructure as Code": [
      { name: "Terraform", level: 90, icon: "Code" },
      { name: "AWS CDK", level: 85, icon: "Code" },
    ],
    "Scanning & Artifactory": [
      { name: "Frog Artifactory", level: 82, icon: "Package" },
      { name: "Nexus", level: 80, icon: "Package" },
      { name: "Sonar", level: 85, icon: "Code" },
    ],
    "Containerization Tools": [
      { name: "Kubernetes-Helm", level: 88, icon: "Server" },
      { name: "Docker", level: 92, icon: "Package" },
      { name: "Docker Swarm", level: 80, icon: "Package" },
    ],
    "Project Management": [
      { name: "Jira", level: 90, icon: "Layers" },
      { name: "Confluence", level: 88, icon: "Layers" },
    ],
    "Scripting": [
      { name: "Shell Scripting", level: 92, icon: "Terminal" },
    ],
    "Databases": [
      { name: "MySQL", level: 85, icon: "Database" },
      { name: "MariaDB", level: 82, icon: "Database" },
      { name: "PostgreSQL", level: 88, icon: "Database" },
      { name: "MongoDB", level: 80, icon: "Database" },
    ],
  };

  try {
    const savedSkills = localStorage.getItem("skillsData");
    return savedSkills ? JSON.parse(savedSkills) : defaultSkillsData;
  } catch (error) {
    console.error("Error loading skills:", error);
    return defaultSkillsData;
  }
};

// Function to save appearance settings
export const saveAppearanceSettings = (settings: any) => {
  try {
    localStorage.setItem("appearanceSettings", JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error("Error saving appearance settings:", error);
    return false;
  }
};

// Function to get appearance settings
export const getAppearanceSettings = () => {
  const defaultSettings = {
    primaryColor: "#1E90FF",
    secondaryColor: "#6C7A89",
    accentColor: "#FF6B6B",
    backgroundColor: "#FFFFFF",
    textColor: "#333333",
    profileImage: null,
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      github: ""
    }
  };

  try {
    const savedSettings = localStorage.getItem("appearanceSettings");
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  } catch (error) {
    console.error("Error loading appearance settings:", error);
    return defaultSettings;
  }
};

// Function to get meetings data
export const getMeetings = () => {
  const defaultMeetings: any[] = [];

  try {
    const savedMeetings = localStorage.getItem("meetingRequests");
    return savedMeetings ? JSON.parse(savedMeetings) : defaultMeetings;
  } catch (error) {
    console.error("Error loading meetings:", error);
    return defaultMeetings;
  }
};

// Function to get resume data
export const getResumes = () => {
  const defaultResumes: any[] = [];

  try {
    const savedResumes = localStorage.getItem("resumes");
    return savedResumes ? JSON.parse(savedResumes) : defaultResumes;
  } catch (error) {
    console.error("Error loading resumes:", error);
    return defaultResumes;
  }
};

// Function to apply theme colors to the site
export const applyThemeColors = () => {
  try {
    const savedColors = localStorage.getItem("siteColors");
    if (savedColors) {
      const colors = JSON.parse(savedColors);
      document.documentElement.style.setProperty('--primary-color', colors.primary);
      document.documentElement.style.setProperty('--secondary-color', colors.secondary);
      document.documentElement.style.setProperty('--accent-color', colors.accent);
      document.documentElement.style.setProperty('--background-color', colors.background);
      document.documentElement.style.setProperty('--text-color', colors.text);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error applying theme colors:", error);
    return false;
  }
};
