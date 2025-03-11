
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
    // Add other skill categories as needed
  };

  try {
    const savedSkills = localStorage.getItem("skillsData");
    return savedSkills ? JSON.parse(savedSkills) : defaultSkillsData;
  } catch (error) {
    console.error("Error loading skills:", error);
    return defaultSkillsData;
  }
};
