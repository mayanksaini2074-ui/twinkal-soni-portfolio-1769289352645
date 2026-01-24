import { ResumeData, SectionConfig } from '@/types/portfolio';

export const portfolioData: ResumeData = {
  "personalInfo": {
    "name": "Twinkal Soni",
    "title": "Engineering Student",
    "email": "twinkalsoni07@gmail.com",
    "phone": "+91-7988753365",
    "linkedin": "linkedin.com/in/twinkal-soni-nitkkr",
    "github": "",
    "location": "Mahendragarh, Haryana",
    "summary": "Results-oriented Engineering student with a versatile background in Management, Sales, and Technology. Successfully generated 200,000 INR revenue in sales, led large-scale campus events as Management Head, and executed technical security projects at CDAC."
  },
  "experience": [
    {
      "title": "Head Management (Event Logistics & Team Leadership)",
      "company": "NIT Kurukshetra",
      "dates": "Nov 2022 – Present",
      "description": "Led a multidisciplinary team to organize large-scale college events with zero operational downtime.",
      "highlights": [
        "Oversaw end-to-end logistics, resource allocation, and vendor coordination.",
        "Streamlined communication between student committees and administration to execute event roadmaps."
      ]
    },
    {
      "title": "Campus Ambassador (Business Development)",
      "company": "Physics Wallah",
      "dates": "May 2024 – Present",
      "description": "Generated revenue and managed student inquiries for Physics Wallah.",
      "highlights": [
        "Generated over 200,000 INR in revenue through direct sales and strategic outreach.",
        "Managed student inquiries and converted leads into active enrollments through effective pitching.",
        "Executed on-ground promotional campaigns to increase brand penetration."
      ]
    },
    {
      "title": "Ethical Hacker Intern",
      "company": "CDAC Noida",
      "dates": "June 2025 – July 2025",
      "description": "Analyzed phishing architectures and evaluated network vulnerabilities for CDAC.",
      "highlights": [
        "Analyzed phishing architectures and evasion techniques used to bypass spam filters.",
        "Evaluated vulnerabilities in network protocols and proposed security enhancements."
      ]
    },
    {
      "title": "Internships",
      "company": "GUESSS India, India Space Lab, Jindal Stainless",
      "dates": "June 2024 – Present",
      "description": "Participated in various internships focusing on outreach, space engineering, and manufacturing workflows.",
      "highlights": [
        "Driving student outreach and data collection for entrepreneurship surveys at GUESSS India (Sept ’25-Jan.2026).",
        "Completed technical training on space engineering fundamentals (Dec ’24-Jan ’25).",
        "Analyzed manufacturing workflows at Jindal Stainless Ltd (June ’24-July ’24)."
      ]
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Technology (B.Tech) in Mechanical Engineering",
      "institution": "National Institute of Technology (NIT), Kurukshetra",
      "years": "Nov 2022 – June 2026",
      "gpa": ""
    },
    {
      "degree": "Class XII (Senior Secondary)",
      "institution": "Central Board of Secondary Education (CBSE)",
      "years": "Completed 2021",
      "gpa": "90.2%"
    },
    {
      "degree": "Class X (Secondary)",
      "institution": "Board of School Education Haryana (BSEH)",
      "years": "Completed 2019",
      "gpa": "95.8%"
    }
  ],
  "skills": {
    "frontend": [],
    "backend": [],
    "devops": [],
    "additional": []
  },
  "projects": [
    {
      "name": "Phishing Techniques & Security Analysis",
      "description": "Investigated advanced spoofing mechanisms including URL manipulation and payload obfuscation.",
      "technologies": [
        "Phishing Analysis",
        "Security Proposals"
      ],
      "link": "",
      "github": ""
    }
  ]
};

export const sectionConfig: SectionConfig = {
  "hero": "falling-snow",
  "about": "split",
  "experience": "timeline",
  "projects": "grid",
  "skills": "tags",
  "skillsDisplay": "separate",
  "contact": "simple",
  "colorPalette": "slate"
};
