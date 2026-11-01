import type { ProfileContent } from './types';

// Add only details the portfolio owner is ready to publish.
export const profile: ProfileContent = {
  name: 'Jen-Chien (Ryan) Huang',
  displayName: 'Ryan Huang',
  headline: '',
  introduction: 'I’m Ryan, a University of Michigan MSI student pursuing the Product Management Pathway. My work spans product discovery, commercial analysis, and software development, from exploring healthcare needs and course-planning challenges to implementing Salesforce CRM solutions.',
  about: [
    'I’m Jen-Chien (Ryan) Huang, a Master of Science in Information student at the University of Michigan pursuing the Product Management Pathway. I previously earned a bachelor’s degree in Management Information Systems from National Chengchi University in Taiwan.',
    'My background combines software development and CRM implementation with recent work in product discovery and commercial analysis. At May4S, I implemented Salesforce features, integrated systems, and investigated data discrepancies. My current projects explore healthcare needs and course and career planning through interviews, competitive analysis, and feasibility assessment.',
    'I’m exploring product management and technology consulting opportunities where I can connect user needs, business priorities, and technical execution.',
  ],
  location: '',
  email: 'jchr.2301@gmail.com',
  resume: { path: 'ryan-huang-resume.pdf', filename: 'Ryan-Huang-Resume.pdf' },
  education: [
    { institution: 'University of Michigan, Ann Arbor', school: 'School of Information', degree: 'Master of Science in Information, Product Management Pathway', date: 'Expected June 2028' },
    { institution: 'National Chengchi University', location: 'Taipei, Taiwan', degree: 'Bachelor of Management Information Systems', date: 'June 2024' },
  ],
  certifications: ['Salesforce Platform Developer I', 'Salesforce B2C Commerce Cloud Developer'],
  links: [{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/jen-chien-huang/' }],
  principles: [
    { title: 'Understand the need', body: 'Ask what problem a feature addresses and whose needs it serves.' },
    { title: 'Connect decisions to implementation', body: 'Consider how a proposed change affects the user journey and the system behind it.' },
    { title: 'Learn beyond the prototype', body: 'Distinguish between building something that works and understanding why people would keep using it.' },
  ],
};
