
# DevOps Portfolio Application with Supabase Backend

This application is a DevOps professional portfolio with a Supabase backend for authentication and data storage.

## Environment Setup

Before deployment, you need to set up the following environment variables:

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Database Setup

1. Create a new Supabase project at [https://app.supabase.com](https://app.supabase.com)
2. Use the SQL Editor in the Supabase dashboard to run the schema.sql file located in the supabase directory
3. This will create all necessary tables and security policies

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Skills Categories

The application includes the following DevOps skill categories:

- Operating Systems: Red Hat Linux, Amazon Linux, Rocky Linux, Ubuntu, CentOS, Linux
- Cloud Skills: Amazon Web Services (AWS)
- Configuration Management: Jenkins, Ansible
- Monitoring Tools: Grafana, Prometheus, Zabbix, Datadog, New Relic
- CI/CD: GitHub Actions, Jenkins, Argo CD, CircleCI
- Version Control Tools: Git, GitHub, GitLab
- Infrastructure as Code (IAC): Terraform, AWS CDK
- Scanning & Artifactory: Frog Artifactory, Nexus, Sonar
- Containerization Tools: Kubernetes-Helm, Docker, Docker Swarm
- Project Management: Jira, Confluence
- Scripting: Shell Scripting
- Databases: MySQL, MariaDB, PostgreSQL, MongoDB

## Features

- User authentication (login/register)
- Experience management
- Skills management
- Resume management
- Appearance customization
- Contact form and meeting scheduler

## Deployment

This application can be deployed to any hosting provider that supports React applications (Vercel, Netlify, etc.). Make sure to set the environment variables on your hosting platform.
