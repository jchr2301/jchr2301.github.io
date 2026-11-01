import type { PortfolioRecord } from './types';

export const projects: PortfolioRecord[] = [
{
  "id": "project-careerpair",
  "slug": "careerpair",
  "title": "CareerPair — Course and Career Planning",
  "role": "Course Project",
  "context": "University of Michigan course project",
  "location": "Ann Arbor, MI",
  "startDate": "2026-09",
  "endDate": "Present",
  "draft": false,
  "featured": true,
  "order": 1,
  "summary": "Conducted and analyzed 13 interviews across two rounds with students from four MSI pathways, and met with OASA to explore course-selection and career-planning needs. Contributed market and feasibility analysis to a pitch for a proposed recommendation tool.",
  "tags": [
    "User Interviews",
    "Product Discovery",
    "Market Analysis",
    "Feasibility"
  ],
  "links": [],
  "sections": [
    {
      "heading": "Research",
      "body": "Conducted and analyzed 13 interviews across two rounds with students from four MSI pathways. Met with UMSI’s Office of Academic and Student Affairs (OASA) to explore course-selection and career-planning needs."
    },
    {
      "heading": "Opportunity assessment",
      "body": "Developed a market overview, a SWOT analysis of the MSI degree, and desirability and feasibility assessments for a proposed course and career recommendation tool."
    },
    {
      "heading": "Proposed direction",
      "body": "Contributed these findings to an investor pitch for the proposed tool. The project is ongoing."
    }
  ]
},
{
  "id": "project-essential-tremor",
  "slug": "essential-tremor-project",
  "title": "Business+Tech Innovation Jam — Essential Tremor Project",
  "role": "Product Manager",
  "context": "Student innovation project",
  "location": "Ann Arbor, MI",
  "startDate": "2026-10",
  "endDate": "Present",
  "draft": false,
  "featured": true,
  "order": 2,
  "summary": "Defined the problem statement and analyzed five competing products to guide product discovery. Participated in interviews and synthesized findings as part of a team research effort spanning 15 interviews.",
  "tags": [
    "Problem Definition",
    "Competitive Analysis",
    "User Research",
    "Healthcare"
  ],
  "links": [],
  "sections": [
    {
      "heading": "Problem framing",
      "body": "Defined the problem statement to guide product discovery for an essential tremor project through Business+Tech Innovation Jam."
    },
    {
      "heading": "Competitive landscape",
      "body": "Analyzed five competing products to inform the team’s exploration of potential solutions."
    },
    {
      "heading": "Research",
      "body": "Participated in interviews and synthesized findings within a team research effort spanning 15 interviews to clarify user needs and explore potential solutions. The project is ongoing."
    }
  ]
},
{
  "id": "project-midwest-healthcare",
  "slug": "midwest-healthcare-case-competition",
  "title": "Midwest Healthcare Case Competition",
  "role": "Commercial Strategy, Acquisition Case",
  "context": "Case competition",
  "location": "Ann Arbor, MI",
  "startDate": "2026-10",
  "endDate": "2026-10",
  "draft": false,
  "featured": false,
  "order": 3,
  "summary": "Contributed commercial analysis to a one-week pharmaceutical acquisition assessment, evaluating physician targeting, a proposed vascular-center pilot, and marketing resource allocation to support the team’s no-go recommendation.",
  "tags": [
    "Commercial Strategy",
    "Acquisition Analysis",
    "Healthcare",
    "Case Competition"
  ],
  "links": [],
  "sections": [
    {
      "heading": "Commercial assessment",
      "body": "Evaluated physician targeting, a proposed vascular-center pilot, and marketing resource allocation for a potential pharmaceutical acquisition."
    },
    {
      "heading": "Team synthesis",
      "body": "Contributed commercial analysis to a one-week assessment, integrating findings with teammates’ market-sizing, launch-performance diagnosis, and financial analyses."
    },
    {
      "heading": "Recommendation",
      "body": "The combined assessment supported the team’s no-go recommendation within the competition case."
    }
  ]
},
  {
    id: 'project-swap',
    logoImage: 'images/swap/logo.png',
    gallery: {
    "title": "From browsing to an exchange",
    "description": "Selected interface designs from the original Swap project. English notes explain the flow; the original screens are preserved.",
    "items": [
        {
            "src": "images/swap/interface-designs.png",
            "title": "Browse items",
            "caption": "Explore available items and choose an item of interest.",
            "alt": "Swap interface design showing a water bottle listing and items available for exchange.",
            "crop": {
                "x": 8,
                "y": 14,
                "width": 192,
                "height": 418,
                "sourceWidth": 1070,
                "sourceHeight": 866
            }
        },
        {
            "src": "images/swap/interface-designs.png",
            "title": "Review requests",
            "caption": "Review incoming exchange requests and accept or reject a proposal.",
            "alt": "Swap interface design showing exchange requests for a pair of sandals.",
            "crop": {
                "x": 432,
                "y": 14,
                "width": 192,
                "height": 418,
                "sourceWidth": 1070,
                "sourceHeight": 866
            }
        },
        {
            "src": "images/swap/interface-designs.png",
            "title": "Track a request",
            "caption": "Check the details and status of a requested exchange.",
            "alt": "Swap wishlist interface design showing the details of a pending exchange request.",
            "crop": {
                "x": 642,
                "y": 14,
                "width": 192,
                "height": 418,
                "sourceWidth": 1070,
                "sourceHeight": 866
            }
        },
        {
            "src": "images/swap/interface-designs.png",
            "title": "Connect after a match",
            "caption": "After acceptance, view contact details to coordinate the exchange.",
            "alt": "Swap match-confirmation interface design displaying the contact step after acceptance.",
            "crop": {
                "x": 850,
                "y": 14,
                "width": 192,
                "height": 418,
                "sourceWidth": 1070,
                "sourceHeight": 866
            }
        }
    ]
},
    supportingMaterials: [
    {
        "src": "images/swap/project-poster-zh.png",
        "title": "Original project poster",
        "alt": "Original Chinese-language Swap graduation-project poster with the exchange flow and image-assisted listing concept.",
        "caption": "Chinese-language team presentation from National Chengchi University. The poster documents the exchange flow and the team’s image-assisted listing concept. Open the original to read the details."
    }
],
    slug: 'swap',
    title: 'Swap — Secondhand Marketplace',
    role: 'Developer & Project Manager',
    context: 'Five-person undergraduate team · Taipei, Taiwan',
    startDate: '2022-08',
    endDate: '2023-11',
    recognition: 'First Runner-Up, ESG Category · 2023 International ICT Innovative Services Awards',
    summary: 'Led four teammates in a five-person team to build a secondhand marketplace prototype. Developed Flutter interfaces, application logic, and API integrations, mapped user journeys, and revised authentication to allow browsing before sign-in.',
    draft: false,
    featured: true,
    order: 4,
    tags: ['Flutter', 'MongoDB', 'User Flow', 'Project Coordination'],
    links: [{ label: 'Interface designs · Figma', url: 'https://www.figma.com/design/yHjDfKWWkVo3QblGL1bBM1/?node-id=0-1' }],
    sections: [
      { heading: 'Context', body: 'Our five-person undergraduate team built a demo-ready mobile app prototype intended to facilitate secondhand exchanges among university students and local community members.' },
      { heading: 'My contribution', body: 'I developed front-end interfaces and application logic in Flutter and integrated MongoDB through APIs to retrieve and update data.' },
      { heading: 'A decision we reconsidered', body: 'Following discussion with our faculty advisor, I proposed allowing visitors to browse items before signing in. I discussed the change with teammates, aligned with them on the revised flow, and updated the authentication logic.' },
      { heading: 'Project coordination', body: 'I led four teammates within our five-person team, coordinated tasks based on teammates’ strengths, and tracked project progress in Trello.' },
      { heading: 'Team recognition', body: 'Our team earned First Runner-Up in the ESG category at the 2023 International ICT Innovative Services Awards for the Swap prototype.' },
    ],
  },
  // Copy this starter, assign a unique id/slug, and replace blanks with verified facts.
  // It is intentionally unpublished, not an additional portfolio achievement.
  {
    id: 'project-starter',
    slug: 'unpublished-project-starter',
    title: 'Unpublished project starter',
    role: '',
    organization: '',
    startDate: '',
    endDate: '',
    summary: '',
    tags: [],
    coverImage: '',
    coverAlt: '',
    links: [],
    draft: true,
    featured: false,
    sections: [
      { heading: 'Context', body: '' },
      { heading: 'My Contribution', body: '' },
      { heading: 'Key Decisions', body: '' },
      { heading: 'Outcome', body: '' },
      { heading: 'Reflection', body: '' },
    ],
  },
];
