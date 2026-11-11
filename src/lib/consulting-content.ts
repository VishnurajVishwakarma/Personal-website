// Canonical Content Source of Truth — Appendix A (Verbatim + Structured Consulting Metadata)
// Do not invent client outcomes, awards, testimonials, or unverified metrics.

export interface ServicePillar {
  id: string
  number: string
  title: string
  description: string
  problemsAddressed: string[]
  approachSummary: string
  potentialOutcomes: string[]
  relatedWorkSlugs: string[]
  domains: string[]
}

export interface ApproachStep {
  step: string
  title: string
  description: string
  deliverableFocus: string
}

export interface InitiativeCaseStudy {
  slug: string
  number: string
  title: string
  shortTitle: string
  subtitle: string
  category: string
  statusLabel: string
  roleContext: string
  summary: string
  objective: string
  focusAreas: string[]
  externalUrl?: string
  externalLabel?: string
  secondaryUrl?: string
  secondaryLabel?: string
  confidentialityNote?: string
  caseStudy: {
    contextAndChallenge: string
    consultingApproach: string[]
    systemArchitecture: string[]
    keyLearningsAndDirection: string
  }
}

export interface ExpertiseDomain {
  id: string
  title: string
  capabilities: string[]
}

export interface ExperienceItem {
  id: string
  organization: string
  role: string
  description: string
  contextNote: string
  externalUrl?: string
}

export interface PerspectiveCategory {
  id: string
  number: string
  title: string
  description: string
  keyQuestions: string[]
}

export const BRAND = {
  name: 'Vishnuraj Vishwakarma',
  role: 'AI · Business · IT & Technology Consultant',
  location: 'Mumbai, India',
  email: 'vishnurajvishwakarma@gmail.com',
  siteUrl: 'https://www.vishnurajvishwakarma.in',
  // Verified from existing repository schema & settings; can be overridden via Admin Settings
  linkedinUrl: 'https://in.linkedin.com/in/vishnuraj-vishwakarma',
  githubUrl: 'https://github.com/VishnurajVishwakarma',
  seoTitle: 'Vishnuraj Vishwakarma | AI, Business & Technology Consultant',
  seoDescription:
    'Vishnuraj Vishwakarma is a Mumbai-based AI, Business and Technology Consultant focused on AI adoption, business automation, digital transformation, intelligent systems, and long-term business growth.',
  footerTagline:
    'Connecting Business Strategy, Artificial Intelligence, and Technology for Long-Term Growth.',
} as const

export const HERO_CONTENT = {
  eyebrow: 'AI · Business · IT & Technology Consultant',
  headline: 'Turning Technology into Business Advantage.',
  subheadline:
    'Helping businesses adopt AI, optimize operations, and build intelligent technology systems for sustainable, long-term growth.',
  bodyPrimary:
    'I work at the intersection of Artificial Intelligence, Information Technology, Business Operations, and Strategy—connecting business challenges with practical technology solutions.',
  bodySecondary:
    'From identifying opportunities to designing, implementing, and integrating systems, my focus is on making technology a driver of measurable business value.',
  primaryCta: {
    label: 'Discuss Your Business Challenge',
    href: '/contact',
  },
  secondaryCta: {
    label: 'Explore My Work',
    href: '/work',
  },
  collaborateCta: {
    label: "Let's Collaborate",
    href: '/contact',
  },
  location: 'Mumbai, India',
  focusAreas: [
    'AI Adoption',
    'Digital Transformation',
    'Business Systems',
    'Technology Strategy',
  ],
} as const

export const WHAT_I_DO_CONTENT = {
  sectionNumber: '02',
  eyebrow: 'What I Do',
  title: 'Bridging the Gap Between Business and Technology.',
  lead: 'Technology creates value when it solves the right business problems.',
  intro:
    'I help businesses evaluate, adopt, and integrate AI and technology into their operations, aligning every solution with their strategic objectives, operational needs, and long-term vision.',
  pillars: [
    {
      id: 'ai-adoption-integration',
      number: '01',
      title: 'AI Adoption & Integration',
      description:
        'Identify AI use cases, evaluate opportunities for automation, and design practical adoption strategies that improve productivity and decision-making.',
      problemsAddressed: [
        'Unclear return on investment from generic or disconnected AI tools',
        'Repetitive knowledge work and document-heavy operational bottlenecks',
        'Difficulty integrating AI capabilities into existing team workflows safely',
      ],
      approachSummary:
        'Audit high-friction workflows, distinguish high-feasibility AI use cases from hype, and integrate tailored AI-enabled workflows with human-in-the-loop oversight.',
      potentialOutcomes: [
        'Structured AI adoption roadmap aligned with operational priorities',
        'Reduced manual synthesis across research, reporting, and customer operations',
        'Practical decision-support workflows that teams actually adopt',
      ],
      relatedWorkSlugs: ['zaprill', 'business-intelligence-decision-systems'],
      domains: ['AI Use-Case Evaluation', 'Workflow Automation', 'Applied AI Systems'],
    },
    {
      id: 'business-process-optimization',
      number: '02',
      title: 'Business Process Optimization',
      description:
        'Understand existing business workflows, identify operational inefficiencies, and develop systems that reduce manual effort and improve performance.',
      problemsAddressed: [
        'Heavy reliance on manual spreadsheets, duplicated data entry, and ad-hoc handoffs',
        'Process bottlenecks that slow down execution as transaction volume grows',
        'Lack of standardized operational visibility across teams',
      ],
      approachSummary:
        'Map end-to-end operational processes, eliminate redundant steps before automating, and implement reliable digital workflows.',
      potentialOutcomes: [
        'Streamlined operational execution with fewer manual handoff errors',
        'Clearer accountability and standardized process documentation',
        'Scalable workflows prepared for automation and analytics',
      ],
      relatedWorkSlugs: ['business-intelligence-decision-systems', 'austrange-solutions'],
      domains: ['Workflow Mapping', 'Operational Efficiency', 'Process Automation'],
    },
    {
      id: 'it-digital-transformation',
      number: '03',
      title: 'IT & Digital Transformation',
      description:
        'Help organizations modernize their technology infrastructure, integrate business applications, and transition from fragmented processes to connected digital operations.',
      problemsAddressed: [
        'Siloed software tools across finance, sales, and operations that do not communicate',
        'Legacy processes that limit agility and data reliability',
        'High implementation friction when introducing new digital systems',
      ],
      approachSummary:
        'Architect connected application ecosystems using clean APIs, modern web infrastructure, and phased rollout plans that protect core business continuity.',
      potentialOutcomes: [
        'Connected digital operations replacing fragmented point tools',
        'Improved system reliability and cleaner cross-departmental data flow',
        'Phased modernization without disrupting day-to-day operations',
      ],
      relatedWorkSlugs: ['business-intelligence-decision-systems', 'austrange-solutions'],
      domains: ['Systems Integration', 'Application Modernization', 'Connected Operations'],
    },
    {
      id: 'business-intelligence-analytics',
      number: '04',
      title: 'Business Intelligence & Analytics',
      description:
        'Turn business data into useful insights through integrated reporting, financial analytics, dashboards, and decision-support systems.',
      problemsAddressed: [
        'Delayed management reporting caused by manual data consolidation',
        'Disconnected financial, sales, marketing, and operational metrics',
        'Limited visibility into unit economics and operational performance drivers',
      ],
      approachSummary:
        'Consolidate multi-source operational and financial data into structured pipelines and executive dashboards designed around actual management decisions.',
      potentialOutcomes: [
        'Unified visibility across finance, sales, marketing, and operations',
        'Faster, more reliable management reporting and performance tracking',
        'Decision-support views tailored to leadership and operational leads',
      ],
      relatedWorkSlugs: ['business-intelligence-decision-systems', 'zaprill'],
      domains: ['Executive Dashboards', 'Financial Analytics', 'Decision-Support Systems'],
    },
    {
      id: 'technology-business-strategy',
      number: '05',
      title: 'Technology & Business Strategy',
      description:
        'Align technology investments with business objectives, scalability requirements, operational priorities, and long-term growth opportunities.',
      problemsAddressed: [
        'Technology spending that lacks clear linkage to commercial outcomes',
        'Build-versus-buy uncertainty when scaling products or internal systems',
        'Need for structured roadmaps connecting technical execution with business economics',
      ],
      approachSummary:
        'Evaluate technology options through the lens of cost, operational complexity, feasibility, and strategic alignment before committing capital.',
      potentialOutcomes: [
        'Pragmatic technology roadmaps grounded in business economics',
        'Informed build-versus-buy and vendor architecture decisions',
        'Stronger alignment between technical teams and commercial leadership',
      ],
      relatedWorkSlugs: ['austrange-solutions', 'ciel'],
      domains: ['Technology Roadmaps', 'Investment Evaluation', 'Strategic Planning'],
    },
    {
      id: 'product-systems-development',
      number: '06',
      title: 'Product & Systems Development',
      description:
        'Translate business requirements into functional digital products, intelligent systems, and technology-enabled workflows.',
      problemsAddressed: [
        'Gap between strategic business concepts and working software execution',
        'Need for rapid validation, prototyping, and full-stack product delivery',
        'Building internal tools or customer-facing platforms that scale cleanly',
      ],
      approachSummary:
        'Combine business requirements analysis with modern full-stack software engineering to design, build, and iterate functional digital systems.',
      potentialOutcomes: [
        'Working digital products and internal systems aligned with user needs',
        'Clean, maintainable architecture built for future iteration',
        'Seamless translation from business specification to deployed software',
      ],
      relatedWorkSlugs: ['zaprill', 'austrange-solutions'],
      domains: ['Digital Products', 'Full-Stack Systems', 'Prototyping & Execution'],
    },
  ] satisfies ServicePillar[],
} as const

export const APPROACH_CONTENT = {
  sectionNumber: '03',
  eyebrow: 'My Approach',
  title: 'Business First. Technology Second. Long-Term Value Always.',
  intro:
    'I believe successful digital transformation starts with understanding the business—not choosing the technology.',
  closing:
    "The objective isn't simply to implement technology. It's to help businesses become more efficient, intelligent, adaptable, and competitive.",
  steps: [
    {
      step: '01',
      title: 'Understand',
      description:
        'Understand the business model, operations, challenges, objectives, and existing technology landscape.',
      deliverableFocus: 'Operational & Systems Diagnostic',
    },
    {
      step: '02',
      title: 'Identify',
      description:
        'Discover opportunities where AI, automation, analytics, or technology can create meaningful operational or strategic improvements.',
      deliverableFocus: 'Opportunity & Bottleneck Mapping',
    },
    {
      step: '03',
      title: 'Strategize',
      description:
        'Develop practical technology recommendations based on feasibility, investment, expected business impact, and long-term scalability.',
      deliverableFocus: 'Architecture & Investment Roadmap',
    },
    {
      step: '04',
      title: 'Implement',
      description:
        'Design, develop, integrate, or coordinate the implementation of technology solutions aligned with business requirements.',
      deliverableFocus: 'Systems Build & Workflow Integration',
    },
    {
      step: '05',
      title: 'Optimize',
      description:
        'Evaluate system performance, improve workflows, and support continuous technology adoption as business needs evolve.',
      deliverableFocus: 'Performance Review & Continuous Adoption',
    },
  ] satisfies ApproachStep[],
} as const

export const PROJECTS_CONTENT = {
  sectionNumber: '04',
  eyebrow: 'Selected Projects & Initiatives',
  title: 'From Business Problems to Working Solutions.',
  intro:
    'My experience combines technology development, entrepreneurship, operational management, and business systems.',
  initiatives: [
    {
      slug: 'business-intelligence-decision-systems',
      number: '01',
      title: 'Business Intelligence & Decision Systems',
      shortTitle: 'BI & Decision Systems',
      subtitle: 'Connecting business operations, finance, and data.',
      category: 'Business Systems · Analytics',
      statusLabel: 'Active Initiative (Working On)',
      roleContext: 'Systems Development & Business Intelligence Architecture',
      summary:
        'Working on integrated business intelligence and decision-support systems that consolidate information from finance, sales, marketing, and operations.',
      objective:
        'The objective is to reduce fragmented reporting, improve data visibility, and enable more informed management decisions.',
      focusAreas: [
        'Business Intelligence',
        'Financial Analytics',
        'Systems Integration',
        'Automation',
      ],
      confidentialityNote:
        'Note: Specific operational schemas and financial datasets pertain to private business systems; this overview presents the non-sensitive architectural approach and problem domain.',
      caseStudy: {
        contextAndChallenge:
          'Growing organizations frequently operate across disconnected spreadsheets, accounting tools, CRM pipelines, and operational logs. When finance, sales, marketing, and operations data live in separate silos, leadership faces delayed reporting, manual reconciliation overhead, and fragmented visibility into business performance.',
        consultingApproach: [
          'Map core management questions and operational KPIs across finance, sales, marketing, and operations before designing dashboards.',
          'Design standardized data ingestion and transformation workflows that reduce manual spreadsheet consolidation.',
          'Structure multi-layered reporting views so both executive leadership and operational teams work from a consistent source of truth.',
        ],
        systemArchitecture: [
          'Cross-functional data consolidation layer connecting financial records, commercial pipelines, and operational metrics',
          'Automated reporting workflows and validation checks to improve data consistency',
          'Decision-support dashboards focused on cash flow visibility, operational throughput, and commercial performance',
        ],
        keyLearningsAndDirection:
          'Effective business intelligence is less about visual chart complexity and more about aligning data definitions with how management actually allocates capital and operational attention.',
      },
    },
    {
      slug: 'zaprill',
      number: '02',
      title: 'Zaprill — AI-Powered Career Intelligence',
      shortTitle: 'Zaprill',
      subtitle: 'Applying AI and data to improve career decisions.',
      category: 'AI Product · Data Intelligence',
      statusLabel: 'Active Platform (Contributing)',
      roleContext: 'AI Systems, Product Strategy & Operations',
      summary:
        'Contributing to an AI-powered career intelligence platform that brings together salary insights, resume intelligence, skill analysis, and career opportunities.',
      objective:
        'The platform explores how AI and data can make career planning and professional decision-making more informed and accessible.',
      focusAreas: [
        'AI Products',
        'Data Intelligence',
        'Product Strategy',
        'Digital Platforms',
      ],
      externalUrl: 'https://www.zaprill.com/',
      externalLabel: 'Visit Zaprill Website',
      secondaryUrl: 'https://app.zaprill.com/',
      secondaryLabel: 'Explore Platform',
      caseStudy: {
        contextAndChallenge:
          'Professionals and job seekers often make critical career decisions with fragmented information—relying on disconnected job boards, opaque salary benchmarks, and generic resume advice without clear market signal.',
        consultingApproach: [
          'Connect four interdependent career signals—compensation benchmarks, resume readiness, skill gap analysis, and relevant opportunities—into a cohesive digital platform.',
          'Apply AI workflows to structure messy career and skill data into clear, actionable guidance for users.',
          'Align product architecture with practical user workflows from initial career assessment to opportunity matching.',
        ],
        systemArchitecture: [
          'Salary & market intelligence engine contextualizing compensation across roles and experience levels',
          'AI-assisted resume and profile signal evaluation for clearer candidate positioning',
          'Skill intelligence and opportunity discovery modules designed for continuous career planning',
        ],
        keyLearningsAndDirection:
          'Building AI-enabled products requires balancing model capability with transparent, trustworthy user interfaces that help people make confident real-world decisions.',
      },
    },
    {
      slug: 'austrange-solutions',
      number: '03',
      title: 'Austrange Solutions — Technology & Innovation',
      shortTitle: 'Austrange Solutions',
      subtitle: 'Transforming real-world challenges into technology-driven solutions.',
      category: 'Entrepreneurship · Product & Operations',
      statusLabel: 'Founder & COO Experience',
      roleContext: 'Austrange Solutions Pvt. Ltd. — Founder & COO',
      summary:
        'Experience in entrepreneurial operations, innovation, product development, and technology commercialization.',
      objective:
        'Work has involved translating ideas into practical solutions while navigating product, operational, and business challenges.',
      focusAreas: [
        'Entrepreneurship',
        'Technology Development',
        'Product Innovation',
        'Business Operations',
      ],
      externalUrl: 'https://in.linkedin.com/company/austrange-solutions',
      externalLabel: 'View on LinkedIn',
      caseStudy: {
        contextAndChallenge:
          'Taking technology concepts from early ideation to real-world adoption requires more than engineering—it demands structured product validation, operational discipline, resource allocation, and commercial execution.',
        consultingApproach: [
          'Ground product development in real-world user and operational constraints rather than purely technical novelty.',
          'Coordinate cross-functional execution spanning software/technology development, operational workflows, and strategic planning.',
          'Navigate the full lifecycle from problem discovery and prototyping to commercialization and business operations.',
        ],
        systemArchitecture: [
          'End-to-end product development and requirement translation workflows',
          'Operational management frameworks supporting team execution and delivery',
          'Commercialization strategy connecting technical capabilities with market needs',
        ],
        keyLearningsAndDirection:
          'Operating as a Founder & COO reinforced that technology only creates durable value when paired with disciplined operations, clear unit economics, and practical execution.',
      },
    },
    {
      slug: 'ciel',
      number: '04',
      title: 'CIEL — Innovation & Entrepreneurship',
      shortTitle: 'CIEL',
      subtitle: 'Supporting the development of an innovation-driven ecosystem.',
      category: 'Innovation Management · Incubation',
      statusLabel: 'Institutional Initiative (Contributing)',
      roleContext: "Chetana's Innovation & Entrepreneurship Lab (CIEL) — Innovation Associate",
      summary:
        'Contributing to innovation operations, planning, and incubation initiatives that connect ideas, institutions, entrepreneurs, and industry.',
      objective:
        'Focused on creating structured pathways for problem identification, validation, prototyping, and business development.',
      focusAreas: [
        'Innovation Management',
        'Incubation',
        'Strategic Planning',
        'Ecosystem Development',
      ],
      externalUrl: 'https://www.cielhub.org/about#joint-steering-committee',
      externalLabel: 'View CIEL Reference',
      caseStudy: {
        contextAndChallenge:
          'Early-stage innovators and institutional entrepreneurship programs need structured frameworks to move from raw ideas to validated problem statements, functional prototypes, and viable business models.',
        consultingApproach: [
          'Support institutional innovation operations, program planning, and incubation workflows.',
          'Establish structured stages for problem identification, market validation, prototyping, and business model development.',
          'Bridge academic institutions, emerging entrepreneurs, and industry mentors through coordinated initiatives.',
        ],
        systemArchitecture: [
          'Structured incubation and venture validation pathways',
          'Program operations and institutional coordination frameworks',
          'Mentorship and ecosystem alignment connecting founders with domain guidance',
        ],
        keyLearningsAndDirection:
          'Working across an innovation ecosystem highlights the universal patterns of why early initiatives succeed or stall—and how structured validation saves both time and capital.',
      },
    },
  ] satisfies InitiativeCaseStudy[],
} as const

export const ABOUT_CONTENT = {
  sectionNumber: '05',
  eyebrow: 'About Me',
  title: 'I Understand Technology. I Think in Business.',
  paragraphs: [
    "I'm Vishnuraj Vishwakarma, a technology and business professional based in Mumbai, India.",
    'My foundation is in Information Technology, with experience across software development, AI-enabled systems, digital products, business operations, and entrepreneurship.',
    'Over time, my focus has expanded beyond building technology to understanding how organizations operate, how business decisions are made, and how technology can improve financial and operational performance.',
    'I hold a B.Sc. in Information Technology and am currently pursuing a Post Graduate Diploma in Management (PGDM), developing my understanding of business strategy, finance, management, and organizational decision-making.',
    "Through entrepreneurial ventures and business technology projects, I've developed an interdisciplinary approach that combines technical problem-solving with business thinking.",
    'My professional focus is helping organizations make better technology decisions, implement practical solutions, and build capabilities that create long-term value.',
  ],
  education: [
    {
      degree: 'Post Graduate Diploma in Management (PGDM)',
      status: 'Currently Pursuing',
      focus:
        'Developing understanding of business strategy, finance, management, and organizational decision-making.',
    },
    {
      degree: 'Bachelor of Science in Information Technology (B.Sc. IT)',
      status: 'Completed',
      focus:
        'Foundation in software systems, information technology, data management, and application development.',
    },
  ],
} as const

export const EXPERTISE_CONTENT = {
  sectionNumber: '06',
  eyebrow: 'Business & Technology Expertise',
  title: 'Connecting Technical Capabilities with Commercial Objectives.',
  domains: [
    {
      id: 'artificial-intelligence',
      title: 'Artificial Intelligence',
      capabilities: [
        'AI Adoption',
        'AI-Enabled Workflows',
        'Intelligent Automation',
        'AI Product Development',
      ],
    },
    {
      id: 'information-technology',
      title: 'Information Technology',
      capabilities: [
        'Software Systems',
        'Web Applications',
        'Cloud Infrastructure',
        'APIs',
        'Systems Integration',
      ],
    },
    {
      id: 'business-operations',
      title: 'Business Operations',
      capabilities: [
        'Workflow Analysis',
        'Process Optimization',
        'Operational Efficiency',
        'Business Requirements',
      ],
    },
    {
      id: 'data-intelligence',
      title: 'Data & Intelligence',
      capabilities: [
        'Business Intelligence',
        'Dashboards',
        'Financial Reporting',
        'Data Integration',
        'Decision Support',
      ],
    },
    {
      id: 'business-strategy',
      title: 'Business & Strategy',
      capabilities: [
        'Business Model Analysis',
        'Technology Roadmaps',
        'Digital Transformation',
        'Strategic Planning',
      ],
    },
    {
      id: 'finance-management',
      title: 'Finance & Management',
      capabilities: [
        'Financial Analysis',
        'Operational Performance',
        'Business Economics',
        'Management Decision-Making',
      ],
    },
  ] satisfies ExpertiseDomain[],
} as const

export const FINANCE_STRATEGY_CONTENT = {
  sectionNumber: '07',
  eyebrow: 'Finance & Strategy',
  title: 'Technology Should Make Business Sense.',
  lead: 'A technically powerful solution is not necessarily the right business solution.',
  paragraphs: [
    'My approach considers not only what technology can accomplish, but also its cost, operational impact, implementation complexity, and long-term relevance.',
    "I'm developing deeper expertise in finance, strategic management, business analysis, and valuation to strengthen this connection between technology decisions and commercial outcomes.",
  ],
  areasOfFocus: [
    'Technology Investment & Business Value',
    'Financial and Operational Analysis',
    'Business Performance Measurement',
    'Digital Transformation Economics',
    'Long-Term Business Strategy',
    'Data-Driven Decision-Making',
  ],
} as const

export const PROOF_CONTENT = {
  sectionNumber: '08',
  eyebrow: 'Proof & Recognition',
  title: 'Experience, Execution & Continuous Learning.',
  intro:
    'My journey includes technology projects, entrepreneurial initiatives, innovation programs, and academic development.',
  directiveNote:
    'Highlight verified academic achievements, competition recognitions, implemented systems, and measurable project outcomes.',
  evidenceCategories: [
    {
      title: 'Business systems and digital products developed',
      detail:
        'Design and development of web applications, AI-enabled platforms (such as Zaprill), and integrated operational tools.',
      status: 'Active & Documented in Work',
      href: '/work',
    },
    {
      title: 'AI and automation implementations',
      detail:
        'Practical workflow automation, career intelligence models, and data-driven reporting pipelines.',
      status: 'Active & Documented in Work',
      href: '/work/zaprill',
    },
    {
      title: 'Entrepreneurial and operational experience',
      detail:
        'Founder & COO experience at Austrange Solutions Pvt. Ltd. and ecosystem operations at CIEL.',
      status: 'Verified Role History',
      href: '/about#experience',
    },
    {
      title: 'Innovation awards and competitions',
      detail:
        'Recognitions across technology and ideation competitions (verified certificates and records managed via credentials repository).',
      // TODO(owner-review): Confirm exact competition titles, dates, and public verification URLs in Supabase `certificates` / `metrics` before displaying specific figures on the main page.
      status: 'Credentials Repository',
      href: '/certificates',
    },
    {
      title: 'Academic and professional qualifications',
      detail:
        'B.Sc. in Information Technology (Completed) and Post Graduate Diploma in Management — PGDM (Currently Pursuing).',
      status: 'Academic Profile',
      href: '/about#education',
    },
    {
      title: 'Quantified project improvements, where verified',
      detail:
        'Operational and reporting improvements shared strictly where client permission and verification artifacts exist.',
      // TODO(owner-review): Add client-approved, non-confidential outcome metrics via Admin -> Metrics only when backed by public verification.
      status: 'Verified Case Studies Only',
      href: '/work/business-intelligence-decision-systems',
    },
  ],
  closingQuote:
    'The value of technology is demonstrated through what it helps people and businesses achieve.',
} as const

export const PERSPECTIVES_CONTENT = {
  sectionNumber: '09',
  eyebrow: 'Research & Perspectives',
  title: 'Exploring the Future of Business and Technology.',
  intro:
    'I explore how emerging technologies, changing business models, and data-driven decision-making are transforming organizations.',
  categories: [
    {
      id: 'ai-business',
      number: '01',
      title: 'AI × Business',
      description:
        'Practical AI adoption, intelligent automation, and emerging business applications.',
      keyQuestions: [
        'Where does AI create durable operational leverage versus superficial novelty?',
        'How should organizations structure human-in-the-loop workflows for reliability?',
      ],
    },
    {
      id: 'technology-finance',
      number: '02',
      title: 'Technology × Finance',
      description:
        'Financial intelligence, technology investments, business performance, and digital finance.',
      keyQuestions: [
        'How should leadership evaluate the unit economics and payback period of software investments?',
        'How can real-time financial analytics improve capital allocation decisions?',
      ],
    },
    {
      id: 'digital-transformation',
      number: '03',
      title: 'Digital Transformation',
      description:
        'How businesses can modernize operations and introduce technology without losing sight of business fundamentals.',
      keyQuestions: [
        'Why do technology rollouts stall, and how does process clarity prevent implementation failure?',
        'How can established businesses transition from fragmented tools to connected operations incrementally?',
      ],
    },
    {
      id: 'business-intelligence',
      number: '04',
      title: 'Business Intelligence',
      description:
        'Turning operational and financial data into actionable management insights.',
      keyQuestions: [
        'What separates decision-support systems that executives actually use from static reporting graveyards?',
        'How can finance, sales, and operations share a single source of truth?',
      ],
    },
    {
      id: 'innovation-entrepreneurship',
      number: '05',
      title: 'Innovation & Entrepreneurship',
      description:
        'Building products, validating business ideas, and designing technology-enabled business models.',
      keyQuestions: [
        'How do early-stage ventures validate problem-solution fit before over-investing in engineering?',
        'What institutional structures help ideas bridge the gap from prototype to commercial viability?',
      ],
    },
    {
      id: 'long-term-strategy',
      number: '06',
      title: 'Long-Term Strategy',
      description:
        'Understanding how technology can support competitive advantage, scalability, and sustainable growth.',
      keyQuestions: [
        'How do technology architecture choices compound into long-term strategic advantages or technical debt?',
        'What capabilities make an organization adaptable as AI and market dynamics evolve?',
      ],
    },
  ] satisfies PerspectiveCategory[],
} as const

export const EXPERIENCE_CONTENT = {
  sectionNumber: '10',
  eyebrow: 'Professional Experience',
  title: 'Building Across Technology, Business & Innovation.',
  roles: [
    {
      id: 'austrange-solutions',
      organization: 'Austrange Solutions Pvt. Ltd.',
      role: 'Founder & COO',
      description:
        'Entrepreneurship, technology innovation, business operations, product development, and strategic execution.',
      // TODO(owner-review): Confirm whether you wish to display specific start/end dates or active status badge for Austrange Solutions Pvt. Ltd.
      contextNote: 'Entrepreneurial Venture & Technology Operations',
      externalUrl: 'https://in.linkedin.com/company/austrange-solutions',
    },
    {
      id: 'ciel',
      organization: "Chetana's Innovation & Entrepreneurship Lab (CIEL)",
      role: 'Innovation Associate',
      description:
        'Innovation operations, planning, incubation support, entrepreneurship programs, and institutional coordination.',
      contextNote: 'Institutional Innovation & Incubation Ecosystem',
      externalUrl: 'https://www.cielhub.org/about#joint-steering-committee',
    },
    {
      id: 'bi-tech-projects',
      organization: 'Business Intelligence & Technology Projects',
      role: 'Systems Development',
      description:
        'Business data integration, intelligent reporting, operational automation, and decision-support solutions.',
      contextNote: 'Business Systems & Decision Intelligence',
    },
    {
      id: 'vishnushakti-foundation',
      organization: 'Vishnushakti Foundation',
      role: 'Web Development & Analytics',
      description:
        'Development and support of digital systems, web solutions, data management, and analytics.',
      contextNote: 'Digital Systems & Data Management',
    },
  ] satisfies ExperienceItem[],
} as const

export const CURRENT_FOCUS_CONTENT = {
  sectionNumber: '11',
  eyebrow: 'Current Focus',
  title: "What I'm Working Towards.",
  paragraphs: [
    'Developing technology-enabled businesses, building intelligent systems, expanding my expertise in finance and management, and exploring opportunities to help organizations adopt AI effectively.',
    'My long-term ambition is to work at the intersection of business consulting, emerging technologies, financial intelligence, and enterprise transformation.',
    'Helping businesses move from isolated technology tools to connected, intelligent, and scalable operations.',
  ],
} as const

export const CONTACT_CONTENT = {
  sectionNumber: '12',
  eyebrow: 'Contact',
  title: "Let's Build a More Intelligent Business.",
  lead: 'Have a business challenge that technology could help solve?',
  paragraphs: [
    "Whether you're exploring AI adoption, looking to automate operations, planning a digital transformation, or building a technology-driven business, I'm interested in discussing meaningful opportunities.",
    "Let's explore how the right technology, combined with the right business strategy, can create lasting value.",
  ],
  primaryCta: 'Discuss Your Business Challenge',
  secondaryCta: 'Connect on LinkedIn',
  email: 'vishnurajvishwakarma@gmail.com',
  location: 'Mumbai, India',
  inquiryTopics: [
    'AI Adoption & Workflow Integration',
    'Business Process Optimization & Automation',
    'Business Intelligence & Financial Analytics',
    'IT & Digital Transformation Advisory',
    'Product & Systems Development',
    'Strategic Collaboration / Other',
  ],
} as const

