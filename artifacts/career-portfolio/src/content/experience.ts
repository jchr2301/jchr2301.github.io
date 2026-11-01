import type { PortfolioRecord } from './types';

export const experience: PortfolioRecord[] = [
{
  "id": "experience-military-service",
  "slug": "mandatory-military-service",
  "title": "Military Police Soldier (Mandatory Military Service)",
  "organization": "ROC Army (Taiwan)",
  "type": "Mandatory Military Service",
  "location": "Taipei City, Taiwan",
  "startDate": "2024-09",
  "endDate": "2025-01",
  "draft": false,
  "featured": false,
  "showOnHome": false,
  "summary": "Completed mandatory military service in a structured training environment, collaborating with people from diverse backgrounds to carry out team training and assigned duties under time constraints.",
  "tags": [
    "Accountability",
    "Adaptability",
    "Teamwork"
  ],
  "links": [],
  "sections": [
    {
      "heading": "Adaptability and accountability",
      "body": "Adapted to a highly structured and demanding training environment, strengthening discipline, resilience, and accountability."
    },
    {
      "heading": "Teamwork",
      "body": "Worked with people from diverse backgrounds to complete team-based training and assigned duties under time constraints."
    }
  ]
},
  {
    id: 'experience-may4s',
    slug: 'salesforce-crm-technical-consultant-internship',
    title: 'CRM Technical Consultant Intern',
    organization: 'May4S',
    location: 'Taipei, Taiwan',
    startDate: '2024-01',
    endDate: '2024-09',
    summary: 'Implemented Salesforce features and REST API integrations within an eight-member cross-functional team. Resolved cross-system data discrepancies and tested 10+ e-commerce features over approximately three months.',
    type: 'Internship',
    draft: false,
    featured: false,
    tags: ['Salesforce', 'REST APIs', 'Data Validation', 'UAT'],
    links: [],
    sections: [
      { heading: 'Implementation', body: 'Implemented Salesforce automation, Lightning Web Components, and internal support chatbot workflows to address client-specific requirements and support issue reporting.' },
      { heading: 'Integration', body: 'Integrated Salesforce with multiple third-party systems through REST APIs to enable data read and write operations.' },
      { heading: 'Reporting validation', body: 'Investigated discrepancies between Salesforce reports and a client’s existing system by tracing calculation logic, modifying code, and revalidating reports to reconcile the results.' },
      { heading: 'Testing', body: 'Conducted functional and user acceptance testing for 10+ e-commerce features over approximately three months, tracking test cases and issues in Google Sheets, Jira, and Confluence.' },
      { heading: 'Collaboration', body: 'Worked with an eight-member cross-functional team using Git for version control and Jira and Confluence for task tracking and documentation.' },
    ],
  },
];
