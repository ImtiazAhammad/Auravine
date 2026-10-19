import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
    personal: {
        name: "AURAVINE",
        title: "AI-First Software Development Company",
        subtitle: "Voice AI, chatbots, computer vision, and business analytics, engineered for companies in Bangladesh and worldwide",
        bio: "Auravine is an AI-first software development company based in Dhaka, Bangladesh. We design and build practical AI products for businesses: AI voice agents that answer every call, custom chatbots that serve customers across web and messaging channels, computer vision systems such as face recognition attendance, and business analytics platforms that turn operational data into decisions. We work with local businesses and international clients who want measurable results, secure systems, and software their teams can actually run.",
        avatar: "/grid.svg",
        location: "Dhaka, Bangladesh · Serving clients worldwide",
        email: "",
        phone: "",
        resumeUrl: '/resume',
        website: "",
        languages: [
            { name: 'Bengali', level: 'Native' },
            { name: 'English', level: 'Fluent' },
        ],
        socialLinks: [
            {
                platform: 'GitHub',
                url: '#',
                icon: 'github',
                username: 'auravine',
            },
            {
                platform: 'LinkedIn',
                url: '#',
                icon: 'linkedin',
                username: 'auravine',
            },
            {
                platform: 'Instagram',
                url: '#',
                icon: 'instagram',
                username: 'auravine',
            },
            {
                platform: 'Twitter',
                url: '#',
                icon: 'twitter',
                username: 'auravine',
            },
        ],
    },
    projects: [
        {
            id: 'project-featured-shefa',
            slug: 'shefa-hospital-ai-front-desk',
            title: 'Shefa: AI Front-Desk Agent for Hospitals',
            description: 'An AI agent that answers hospital calls in Bangla and English, so patients no longer wait in a phone queue to book a doctor.',
            longDescription: 'Hospital phone lines are busy from the first hour of the morning, and patients often hang up before a receptionist answers. Shefa is our in-house AI front-desk agent with one job: take the booking call. It picks up inbound calls, understands what the patient needs in Bangla or English, and checks the requested doctor\'s availability. It then offers the open slots, reserves the one the patient chooses, gives a serial number, and tells the patient the expected time of visit. Reception staff see every booking as it happens and can take over any call.',
            image: '/project/featured/shefa-hero.svg',
            galleryImages: ['/project/featured/shefa-gallery.svg'],
            techStack: ['Python', 'Speech-to-Text', 'Text-to-Speech', 'LLM Orchestration', 'Telephony', 'PostgreSQL'],
            tools: ['Asterisk SIP', 'Twilio', 'Docker', 'Grafana'],
            status: 'ongoing',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2026-01-01',
            role: 'AI Product Lead',
            team: 'Auravine (in-house product)',
            highlights: ['Bangla & English Calls', 'Live Doctor Availability', 'Serial Number & Visit Time'],
            metrics: [
                { value: '24/7', label: 'Calls answered, day and night' },
                { value: '< 5 sec', label: 'Average wait before a call is picked up' },
                { value: '~2 min', label: 'Average time to book a doctor slot' },
            ],
            category: 'Healthcare AI',
            features: [
                {
                    title: 'Call Handling',
                    items: [
                        '**24/7 Call Pickup**: Answers every inbound call immediately, so no patient waits in the queue.',
                        '**Bangla & English Conversations**: Understands the patient in either language, including mixed sentences.',
                        '**Human Takeover**: Reception can join or take over any call with the full transcript on screen.'
                    ]
                },
                {
                    title: 'Booking Engine',
                    items: [
                        '**Doctor & Department Lookup**: Matches the patient\'s need to the right doctor or department.',
                        '**Live Slot Availability**: Offers only slots that are open at that moment, so double bookings are avoided.',
                        '**Serial & Visit Time**: Gives the patient a serial number and the expected time of visit, then sends a confirmation.'
                    ]
                },
                {
                    title: 'Hospital Operations',
                    items: [
                        '**Doctor Schedules**: Hospital admins update schedules and leave days in one place.',
                        '**Booking Dashboard**: Calls, bookings, and unanswered requests in real time.',
                        '**Audit Trail**: Every call summary and booking change is logged for review.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Patients describe symptoms and departments in everyday language',
                    solution: 'Shefa maps everyday phrases to departments and doctors, and asks one clarifying question when the request is unclear.'
                },
                {
                    problem: 'Two callers must never be given the same slot',
                    solution: 'Each slot is reserved against live availability at the moment of confirmation, not when the call started.'
                },
                {
                    problem: 'Staff must trust the agent before they rely on it',
                    solution: 'Reception can monitor calls live, take over at any point, and review a summary of every conversation.'
                }
            ]
        },
        {
            id: 'project-featured-safar',
            slug: 'safar-electric-neighborhood-shuttle',
            title: 'Safar: Electric Neighborhood Shuttle for Dhaka',
            description: 'An electric shuttle service with 25 fleets on fixed routes across Dhaka, with a commuter app that shows where the next shuttle is in real time.',
            longDescription: 'Safar runs electric neighborhood shuttles on defined routes across Dhaka, giving commuters an affordable and comfortable ride for short and medium trips. Our commuter app shows every shuttle on a live map, like a ride-tracking app, so riders know exactly when and where to wait. Location sharing is limited to the shuttles and the commuters who are riding, and each route has its own stops. A current example is the route from Jashimuddin to Uttara North Metro Station.',
            image: '/project/featured/safar-hero.svg',
            galleryImages: ['/project/featured/safar-gallery.svg'],
            techStack: ['React Native', 'Node.js', 'PostgreSQL', 'WebSockets', 'Maps API', 'Docker'],
            tools: ['Figma', 'Grafana', 'Docker', 'GitHub'],
            status: 'ongoing',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2026-01-01',
            role: 'Product & Full Stack Engineer',
            team: 'Auravine (in-house product)',
            highlights: ['25 Electric Shuttles', 'Live Shuttle Tracking', 'Fixed Dhaka Routes'],
            category: 'Mobility',
            features: [
                {
                    title: 'Commuter App',
                    items: [
                        '**Live Shuttle Map**: See each shuttle on the route, its direction, and its estimated arrival at your stop.',
                        '**Seat Availability**: Check how many seats are free before you walk to the stop.',
                        '**Route Planning**: Choose your pickup and drop-off stops on a defined route.'
                    ]
                },
                {
                    title: 'Fleet Operations',
                    items: [
                        '**Fleet Monitoring**: Track all 25 electric shuttles from one control view.',
                        '**Route & Stop Management**: Add or adjust stops and timetables without an app update.',
                        '**Driver Check-in**: Shift start and stop are recorded for each shuttle.'
                    ]
                },
                {
                    title: 'Privacy & Safety',
                    items: [
                        '**Shared Location Only**: Location is shared only between a shuttle and the commuters riding it.',
                        '**Role-Based Access**: Operators, drivers, and commuters each see only what they need.',
                        '**Data Minimization**: Ride history is kept only as long as operations require.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Live positions must update smoothly on mobile networks',
                    solution: 'Shuttle positions stream over a lightweight connection and the app falls back to the last known position when the signal drops.'
                },
                {
                    problem: 'Commuters need arrival times they can trust in heavy traffic',
                    solution: 'Arrival estimates combine the shuttle\'s live position with recent travel times on the same stretch of road.'
                },
                {
                    problem: 'Electric shuttles must be managed like a fleet',
                    solution: 'Each shuttle has its own status, route, and shift record, so operators can reassign a vehicle in a few taps.'
                }
            ]
        },
        {
            id: 'project-featured-handset-depot',
            slug: 'the-handset-depot-ecommerce',
            title: 'The Handset Depot: Pre-Owned & New Phone Commerce',
            description: 'A complete e-commerce platform for buying and selling pre-owned and new smartphones, with phone servicing and accessories, backed by full order, stock, and service management.',
            longDescription: 'The Handset Depot is a complete platform for pre-owned and new smartphones. Customers buy and sell phones online, book phone servicing, and shop for accessories such as earbuds, neckbands, phone cases, and original chargers. Behind the storefront, the business runs on one system: orders, stock, sales tracking, service tickets, partner management, and profit tracking, so the team can see what sold, what is being repaired, and what each sale earned.',
            image: '/project/featured/handset-depot-hero.svg',
            galleryImages: ['/project/featured/handset-depot-gallery.svg'],
            techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Stripe'],
            tools: ['Figma', 'Postman', 'Docker', 'GitHub'],
            status: 'completed',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2026-01-01',
            role: 'Full Stack Engineer',
            team: 'Auravine Delivery Team',
            highlights: ['Buy & Sell Pre-Owned Phones', 'Phone Servicing Tracking', 'Profit & Partner Management'],
            category: 'E-Commerce',
            features: [
                {
                    title: 'Storefront',
                    items: [
                        '**Pre-Owned & New Phones**: Browse certified pre-owned and new handsets with clear condition details.',
                        '**Sell Your Phone**: Customers submit their phone for an offer and get a quote.',
                        '**Accessories**: Earbuds, AirPods-style pods, neckbands, cases, and original chargers in one catalog.'
                    ]
                },
                {
                    title: 'Operations',
                    items: [
                        '**Order Management**: Every order moves through a clear status from placed to delivered.',
                        '**Stock Management**: Stock is tracked per unit for phones and per SKU for accessories.',
                        '**Sales Tracking**: Daily, weekly, and monthly sales by product, channel, and partner.'
                    ]
                },
                {
                    title: 'Servicing & Partners',
                    items: [
                        '**Service Tickets**: Track each repair from received to ready for pickup, with customer updates.',
                        '**Partner Management**: Manage suppliers, resellers, and service partners with their own records.',
                        '**Profit Management**: Margin per sale, per device, and per service, after parts and partner costs.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Pre-owned phones need clear, trustworthy condition information',
                    solution: 'Each device has a standard condition grade, inspection notes, and photos, recorded before it is listed for sale.'
                },
                {
                    problem: 'Stock, orders, and repairs must not drift apart',
                    solution: 'A single inventory record links each handset to its purchase, service tickets, and sale, so the numbers reconcile automatically.'
                },
                {
                    problem: 'Profit depends on parts and partner costs',
                    solution: 'Profit is calculated per sale and per service using the actual parts and partner costs recorded against each job.'
                }
            ]
        },
        {
            id: 'project-featured-spanishstitch',
            slug: 'spanishstitch-rmg-buying-house-cms',
            title: 'SpanishStitch: RMG Buying House Platform',
            description: 'A CMS and operations platform for a garment buying house, covering RFQs, orders, clients, sales pipeline, and the styles in production for each product category.',
            longDescription: 'SpanishStitch is a buying house platform for the ready-made garment (RMG) industry. It manages the full path from a buyer\'s request for quotation to a confirmed order, keeps every client and potential client in one place, and shows total sales and the pipeline at a glance. Super admins can change and configure every text and asset on each section of the public website without a developer, and the dashboard shows how many styles are in production in each category, such as knit, woven, denim, and sweater.',
            image: '/project/featured/spanishstitch-hero.svg',
            galleryImages: ['/project/featured/spanishstitch-gallery.svg'],
            techStack: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
            tools: ['Figma', 'Docker', 'GitHub', 'Postman'],
            status: 'completed',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2026-01-01',
            role: 'Full Stack & Backend Engineer',
            team: 'Auravine Delivery Team',
            highlights: ['RFQ to Order Workflow', 'Client & Pipeline CRM', 'Styles by Category'],
            category: 'Enterprise SaaS',
            features: [
                {
                    title: 'Buying House Operations',
                    items: [
                        '**RFQ Management**: Log buyer requests, track costing and sampling, and convert approved RFQs into orders.',
                        '**Order Management**: Orders, shipment milestones, and status for each style and buyer.',
                        '**Styles in Production**: See how many styles are running in knit, woven, denim, and sweater lines.'
                    ]
                },
                {
                    title: 'Clients & Sales',
                    items: [
                        '**Client Handling**: Buyer contacts, requirements, and history in one profile.',
                        '**Potential Clients**: Pipeline stages from first contact to first order.',
                        '**Total Sales**: Sales totals and trends across clients, categories, and periods.'
                    ]
                },
                {
                    title: 'Website Control',
                    items: [
                        '**No-Code Content Editing**: Super admins change every text and image in each section of the website.',
                        '**Role-Based Access**: Merchandisers, sales, and management see only their modules.',
                        '**Activity Log**: Changes to orders, RFQs, and website content are recorded.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'RFQs, orders, and client records live in separate sheets',
                    solution: 'One data model links each client, RFQ, order, and style, so every team sees the same record.'
                },
                {
                    problem: 'Non-technical staff need to update the public website',
                    solution: 'Every section of the site reads its text and images from the admin CMS, so content changes do not need a developer.'
                },
                {
                    problem: 'Management needs to see production by category at a glance',
                    solution: 'Style counts are grouped by production category and updated as orders move through their stages.'
                }
            ]
        },
        {
            id: 'project-2',
            slug: 'custom-business-chatbot',
            title: 'Custom AI Chatbot for Customer Support',
            image: '/project/featured/chatbot-hero.svg',
            description: 'A custom chatbot for your website, WhatsApp, and Messenger that answers customer questions from your own documents and hands off to your team when needed.',
            longDescription: 'Most customer questions repeat: prices, delivery times, return policies, product details, and order status. Our custom chatbot is trained on your own knowledge base so it answers accurately, cites its sources, and avoids guessing. It runs on your website, WhatsApp Business, and Facebook Messenger from a single backend, and it escalates to human agents with full context when a customer needs more than an answer.',
            techStack: ['Next.js', 'TypeScript', 'LLM APIs', 'RAG', 'WhatsApp Cloud API', 'Node.js'],
            tools: ['VS Code', 'Postman', 'Vercel', 'GitHub'],
            status: 'ongoing',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2025-11-01',
            role: 'Full Stack & AI Engineer',
            customTimeline: '2025 – 2026',
            team: 'Auravine Delivery Team',
            highlights: ['Website & WhatsApp', 'Answers With Sources', 'Human Handoff'],
            category: 'Conversational AI',
            features: [
                {
                    title: 'Knowledge & Answers',
                    items: [
                        '**Your Documents as the Source**: Product catalogs, policies, FAQs, and price lists are indexed so answers come from your content.',
                        '**Source Citations**: Each answer links to the document or page it came from, so customers and staff can verify it.',
                        '**Safe Fallbacks**: When confidence is low, the bot asks a clarifying question or hands off instead of inventing an answer.'
                    ]
                },
                {
                    title: 'Channels',
                    items: [
                        '**Website Widget**: A branded, mobile-friendly chat widget with Bangla and English support.',
                        '**WhatsApp & Messenger**: One knowledge base and one conversation history across every channel.',
                        '**Order & Lead Capture**: Collects order details or lead information and pushes them to your CRM or spreadsheet.'
                    ]
                },
                {
                    title: 'Management',
                    items: [
                        '**Admin Console**: Update knowledge, review conversations, and see unanswered questions to improve coverage.',
                        '**Human Takeover**: Agents see the full thread and can reply directly from the same inbox.',
                        '**Usage Reporting**: Conversation volume, resolution rate, and handoff rate tracked over time.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Customers ask questions the knowledge base does not cover',
                    solution: 'Unanswered questions are logged and grouped weekly, so your team can add missing content and the bot improves without retraining from scratch.'
                },
                {
                    problem: 'Answers must stay accurate when prices and policies change',
                    solution: 'Content updates are re-indexed automatically, and answers always reflect the latest version of your documents.'
                },
                {
                    problem: 'One conversation spans several channels',
                    solution: 'A unified conversation model links website, WhatsApp, and Messenger threads to the same customer profile.'
                }
            ]
        },
        {
            id: 'project-3',
            slug: 'face-recognition-attendance',
            title: 'Face Recognition Smart Attendance',
            image: '/project/featured/face-hero.svg',
            description: 'Touchless attendance with face recognition, live dashboards, and automatic payroll-ready reports for offices, factories, schools, and campuses.',
            longDescription: 'Manual attendance registers are slow and easy to manipulate. Our smart attendance system uses face recognition on standard IP cameras or dedicated terminals to record check-in and check-out within seconds. Managers see who is present in real time, late arrivals and early departures are flagged automatically, and reports export directly to payroll or HR systems. Liveness checks and privacy controls keep the system secure and compliant with your internal policies.',
            techStack: ['Python', 'OpenCV', 'Face Embeddings', 'FastAPI', 'PostgreSQL', 'React'],
            tools: ['VS Code', 'Docker', 'Grafana', 'GitHub'],
            status: 'ongoing',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2025-08-01',
            role: 'Computer Vision Engineer',
            customTimeline: '2025 – 2026',
            team: 'Auravine Delivery Team',
            highlights: ['Touchless Check-in', 'Liveness Detection', 'Payroll-Ready Reports'],
            category: 'Computer Vision',
            features: [
                {
                    title: 'Recognition Pipeline',
                    items: [
                        '**Face Detection & Recognition**: Detects and matches faces from existing IP cameras or dedicated terminals.',
                        '**Liveness Checks**: Helps prevent spoofing with printed photos and screen replays.',
                        '**Mask & Lighting Tolerance**: Tuned for real office and factory conditions, including partial occlusion and varied lighting.'
                    ]
                },
                {
                    title: 'Attendance Management',
                    items: [
                        '**Live Presence Board**: See who is in, who is out, and who is late as it happens.',
                        '**Shift & Rule Engine**: Late arrival, overtime, and early departure rules configured per shift or department.',
                        '**Exports & Integrations**: Daily and monthly reports to Excel, payroll software, or HR systems through an API.'
                    ]
                },
                {
                    title: 'Privacy & Security',
                    items: [
                        '**Encrypted Templates**: Face data is stored as encrypted embeddings, not raw photos, where your policy allows.',
                        '**Role-Based Access**: HR, managers, and auditors see only the data their role requires.',
                        '**Retention Controls**: Data retention periods and deletion requests are handled from the admin panel.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Recognition accuracy drops with poor lighting and camera angles',
                    solution: 'We benchmarked each camera location, set per-site thresholds, and added multi-frame voting so a single bad frame does not cause a wrong record.'
                },
                {
                    problem: 'Spoofing with photos or phone screens',
                    solution: 'A liveness check and motion analysis run before a match is accepted, with suspicious attempts logged for review.'
                },
                {
                    problem: 'Attendance data must match payroll rules',
                    solution: 'Shift and overtime rules are modeled explicitly, and every record keeps an audit trail so HR can verify any figure.'
                }
            ]
        },
        {
            id: 'project-4',
            slug: 'business-analytics-dashboard',
            title: 'Business Analytics & Forecasting Dashboard',
            image: '/project/featured/analytics-hero.svg',
            description: 'Live sales, inventory, and operations dashboards with AI forecasts, so leaders see what is happening and what is likely to happen next.',
            longDescription: 'Most businesses have data in POS systems, spreadsheets, and accounting software, but no single view of performance. We connect those sources into one analytics platform with clear dashboards for owners and managers. Forecasting models estimate demand, stock needs, and cash flow, and alerts notify the right person when a KPI moves outside its normal range. The platform is designed to be understood by non-technical leaders from day one.',
            techStack: ['Python', 'Pandas', 'Prophet', 'PostgreSQL', 'Next.js', 'Recharts'],
            tools: ['Power BI', 'Airflow', 'Docker', 'GitHub'],
            status: 'ongoing',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2025-06-01',
            role: 'Data Engineer & Analytics Lead',
            customTimeline: '2025 – 2026',
            team: 'Auravine Delivery Team',
            highlights: ['Unified Data Sources', 'AI Demand Forecasting', 'Smart Alerts'],
            category: 'Business Intelligence',
            features: [
                {
                    title: 'Data Integration',
                    items: [
                        '**Source Connectors**: POS, e-commerce, spreadsheets, accounting exports, and databases in one pipeline.',
                        '**Automated Cleaning**: Duplicate detection, missing value handling, and currency normalization run on schedule.',
                        '**Data Quality Checks**: Freshness and completeness checks report problems before a dashboard shows wrong numbers.'
                    ]
                },
                {
                    title: 'Dashboards & Forecasts',
                    items: [
                        '**Executive Overview**: Revenue, margin, cash position, and top-line KPIs for leadership.',
                        '**Demand & Stock Forecasts**: Predicts item-level demand to suggest reorder quantities and reduce stockouts.',
                        '**Scenario Planning**: Compare pricing or promotion scenarios before committing budget.'
                    ]
                },
                {
                    title: 'Alerts & Access',
                    items: [
                        '**Smart Alerts**: Email or messaging notifications when a metric crosses a threshold you define.',
                        '**Role-Based Views**: Store managers, finance, and owners each see the metrics relevant to them.',
                        '**Mobile-Friendly Reports**: Scheduled PDF and link-based reports for leaders on the move.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Data lives in many disconnected systems',
                    solution: 'We built connectors and a single data model, so every dashboard uses the same definitions of revenue, margin, and stock.'
                },
                {
                    problem: 'Forecasts are not trusted by managers',
                    solution: 'Each forecast shows its assumptions and backtest accuracy, and managers can compare it with their own estimates.'
                },
                {
                    problem: 'Dashboards are overloaded and rarely used',
                    solution: 'We start with a short list of decision-critical KPIs and expand only when a team asks for a specific metric.'
                }
            ]
        },
        {
            id: 'project-5',
            slug: 'document-intelligence-rag',
            title: 'Document Intelligence & Knowledge Assistant',
            image: '/project/featured/docs-hero.svg',
            description: 'A private AI assistant that searches contracts, policies, and reports across your company and answers questions with page-level citations.',
            longDescription: 'Teams lose hours searching for the right clause, policy, or past report. Our document intelligence platform indexes your internal files, respects existing access permissions, and answers natural-language questions with citations to the exact page. It can run on your own cloud or on-premise infrastructure, which matters for companies that handle sensitive legal, financial, or client data.',
            techStack: ['Python', 'LangChain', 'Vector Search', 'OCR', 'FastAPI', 'Next.js'],
            tools: ['Docker', 'Postman', 'GitHub', 'VS Code'],
            status: 'ongoing',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2025-10-01',
            role: 'AI Engineer',
            customTimeline: '2025 – 2026',
            team: 'Auravine Delivery Team',
            highlights: ['Page-Level Citations', 'Respects Access Rights', 'Private Deployment'],
            category: 'Generative AI',
            features: [
                {
                    title: 'Ingestion & Search',
                    items: [
                        '**Multi-Format Ingestion**: PDF, Word, Excel, scanned documents, and email archives, with OCR for images.',
                        '**Hybrid Retrieval**: Combines keyword and semantic search so exact clause numbers and general questions both work.',
                        '**Version Awareness**: Tracks document revisions and prefers the latest approved version.'
                    ]
                },
                {
                    title: 'Answers You Can Check',
                    items: [
                        '**Cited Answers**: Every statement links to the source page and paragraph.',
                        '**Confidence Signals**: The assistant states when the documents do not contain a reliable answer.',
                        '**Summaries & Comparisons**: Compare two contracts or summarize a long report in a few clicks.'
                    ]
                },
                {
                    title: 'Security & Deployment',
                    items: [
                        '**Permission Mirroring**: Users only see answers from documents they already have access to.',
                        '**Private Hosting**: Deploy on your cloud account or on-premise, with no data sent to third parties when required.',
                        '**Audit Logs**: Every query and document access is logged for compliance review.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Scanned documents and mixed languages reduce search quality',
                    solution: 'We combined OCR with layout-aware parsing and normalized Bangla and English text before indexing.'
                },
                {
                    problem: 'Confidential files must not leak across teams',
                    solution: 'Access control lists from the source system are mirrored into the index, and retrieval filters results by user permissions.'
                },
                {
                    problem: 'Answers must be verifiable for legal and finance teams',
                    solution: 'The assistant is constrained to quote and cite retrieved passages, and it refuses to answer when evidence is missing.'
                }
            ]
        },
        {
            id: 'project-6',
            slug: 'computer-vision-quality-inspection',
            title: 'Computer Vision Quality Inspection',
            image: '/project/featured/cv-hero.svg',
            description: 'Camera-based defect detection for production lines that flags faulty items in real time and logs every decision for traceability.',
            longDescription: 'Manual inspection is tiring, inconsistent, and expensive to scale. Our computer vision inspection system uses industrial or standard cameras and a trained detection model to identify defects, missing components, and packaging errors while products move along the line. Operators receive instant alerts, rejected items are logged with images, and quality trends are visible to production managers.',
            techStack: ['Python', 'PyTorch', 'YOLO', 'OpenCV', 'MQTT', 'Docker'],
            tools: ['Label Studio', 'Grafana', 'Docker', 'GitHub'],
            status: 'ongoing',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2025-12-01',
            role: 'Computer Vision Engineer',
            customTimeline: '2025 – 2026',
            team: 'Auravine Delivery Team',
            highlights: ['Real-Time Detection', 'Image Traceability', 'Edge Deployment'],
            category: 'Computer Vision',
            features: [
                {
                    title: 'Detection',
                    items: [
                        '**Defect Detection**: Identifies scratches, dents, misalignment, and missing parts in real time.',
                        '**Custom Model Training**: Models are trained on images from your own production line for accurate results.',
                        '**Edge Inference**: Runs on local hardware so the line keeps working when the internet does not.'
                    ]
                },
                {
                    title: 'Operations',
                    items: [
                        '**Instant Alerts**: Operators get visual and audible alerts at the station.',
                        '**Image Traceability**: Every rejected item is stored with its image, timestamp, and line number.',
                        '**Quality Dashboard**: Defect rates by shift, product, and machine.'
                    ]
                },
                {
                    title: 'Maintenance',
                    items: [
                        '**Labeling Workflow**: Operators correct misclassifications, and those corrections feed model retraining.',
                        '**Drift Monitoring**: Alerts when image conditions change, such as lighting or product design updates.',
                        '**Versioned Models**: Safe rollouts and rollbacks for every model update.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Items move too fast for a single camera pass',
                    solution: 'We tuned frame rate, exposure, and model input size together so detection keeps pace with line speed.'
                },
                {
                    problem: 'Lighting changes between shifts reduce accuracy',
                    solution: 'Training data was collected across shifts, and augmentation simulates lighting variation to make the model robust.'
                },
                {
                    problem: 'Production cannot depend on cloud connectivity',
                    solution: 'Inference runs on edge hardware at the line, and results sync to the central dashboard when the connection is available.'
                }
            ]
        },
        {
            id: 'project-7',
            slug: 'ai-sales-and-recommendations',
            title: 'AI Product Recommendations for E-Commerce',
            image: '/project/featured/recs-hero.svg',
            description: 'Personalized product recommendations and smart search for online stores, designed to lift average order value and reduce bounce rates.',
            longDescription: 'Online shoppers leave when they cannot find what they want. Our recommendation engine learns from browsing and purchase behavior to show relevant products on the homepage, product pages, and carts. Smart search understands typos, Bangla and English queries, and product attributes, so customers find items faster. The system is integrated with popular storefront platforms and reports results in plain language for store owners.',
            techStack: ['Python', 'Scikit-learn', 'Embeddings', 'Redis', 'Node.js', 'React'],
            tools: ['Postman', 'Redis Insight', 'Vercel', 'GitHub'],
            status: 'ongoing',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2026-03-01',
            role: 'Machine Learning Engineer',
            customTimeline: '2026',
            team: 'Auravine Delivery Team',
            highlights: ['Personalized Recommendations', 'Bangla & English Search', 'Store Platform Integrations'],
            category: 'E-Commerce AI',
            features: [
                {
                    title: 'Recommendations',
                    items: [
                        '**Behavior-Based Suggestions**: Products recommended from views, carts, and purchases.',
                        '**Cold-Start Handling**: New products and new visitors receive sensible recommendations from day one.',
                        '**Placement Control**: Choose where recommendations appear and which business rules apply, such as stock or margin.'
                    ]
                },
                {
                    title: 'Smart Search',
                    items: [
                        '**Typo & Transliteration Tolerance**: Finds products even with spelling variations or mixed-script queries.',
                        '**Attribute Understanding**: Filters by size, color, brand, and price range from natural language.',
                        '**Search Analytics**: Shows zero-result queries so merchandising can fill the gaps.'
                    ]
                },
                {
                    title: 'Business Reporting',
                    items: [
                        '**Revenue Attribution**: Tracks orders influenced by recommendations and search.',
                        '**A/B Testing**: Compare recommendation strategies before rolling them out to all visitors.',
                        '**Plain-Language Summaries**: Weekly summaries for store owners without needing to read charts.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Small catalogs have too little behavior data',
                    solution: 'We combine content similarity from product attributes with behavior signals, so recommendations work before large datasets exist.'
                },
                {
                    problem: 'Search fails on Bangla and English spelling variations',
                    solution: 'Query normalization and multilingual embeddings match intent rather than exact words.'
                },
                {
                    problem: 'Recommendations must respect stock and margin',
                    solution: 'Business rules run as filters after ranking, so out-of-stock or low-margin items are never promoted by mistake.'
                }
            ]
        },
        {
            id: 'project-8',
            slug: 'clinic-management-saas',
            title: 'Clinic Management SaaS with AI Assistance',
            image: '/project/featured/clinic-hero.svg',
            description: 'A cloud platform for clinics and diagnostic centers covering appointments, patient records, billing, and AI-assisted queue and no-show management.',
            longDescription: 'Clinics juggle paper registers, phone bookings, and separate billing tools. Our clinic management platform brings appointments, patient records, prescriptions, billing, and reporting into one secure system. AI features predict no-shows so reception can send reminders, balance queues across doctors, and surface patterns that help clinic owners plan staffing. Patient data is protected with role-based access and audit trails.',
            techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Python'],
            tools: ['Docker', 'Vercel', 'Figma', 'GitHub'],
            status: 'ongoing',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2026-01-01',
            role: 'Full Stack Engineer',
            customTimeline: '2026',
            team: 'Auravine Delivery Team',
            highlights: ['Appointments & Billing', 'No-Show Prediction', 'Role-Based Patient Privacy'],
            category: 'Enterprise SaaS',
            features: [
                {
                    title: 'Clinic Operations',
                    items: [
                        '**Appointment Scheduling**: Doctor calendars, walk-ins, and automated reminders via SMS and WhatsApp.',
                        '**Queue Management**: Live queue boards for reception and waiting areas.',
                        '**Prescriptions & Records**: Structured patient history, lab results, and printable prescriptions.'
                    ]
                },
                {
                    title: 'AI Assistance',
                    items: [
                        '**No-Show Prediction**: Flags appointments at high risk of being missed so reception can confirm them.',
                        '**Demand Forecasting**: Helps plan doctor schedules and staffing for peak days.',
                        '**Clinical Documentation Support**: Drafts visit summaries for doctors to review and approve.'
                    ]
                },
                {
                    title: 'Billing & Compliance',
                    items: [
                        '**Billing & Receipts**: Service packages, insurance-style claims, and printable receipts.',
                        '**Role-Based Access**: Doctors, reception, and billing staff see only the data their role needs.',
                        '**Audit Trails**: Every record view and change is logged.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Clinics lose revenue to missed appointments',
                    solution: 'Predictive reminders and waitlist automation help fill cancelled slots, and the no-show model improves as more visits are recorded.'
                },
                {
                    problem: 'Staff adoption fails when systems are complicated',
                    solution: 'We designed the reception and doctor workflows with clinic staff, keeping common tasks to a few clicks.'
                },
                {
                    problem: 'Patient data must stay private',
                    solution: 'Data is encrypted in transit and at rest, access is role-based, and all changes are audited.'
                }
            ]
        }
    ],
    experiences: [
        {
            id: 'phase-1',
            company: 'Auravine',
            position: 'Discovery & Solution Design',
            description: 'We start every engagement by understanding your business, your customers, and the outcome you need before writing any code.',
            responsibilities: [
                'Workshops with business owners and operations teams to map current processes and pain points.',
                'Review of existing systems, data sources, and integration points.',
                'A clear proposal covering scope, architecture, timeline, and expected business impact.',
            ],
            skills: [
                'Requirement Analysis',
                'Solution Architecture',
                'Process Mapping',
                'Business Case Design',
            ],
            startDate: '2026-01-01',
            isOngoing: true,
            location: 'Dhaka, Bangladesh · Remote-friendly',
            type: 'contract',
            keyLearnings: [
                'Clear scope prevents expensive surprises later.',
                'The best AI use cases start with a measurable business problem.',
            ],
            impact: [
                'Every client receives a written plan before development begins.',
            ],
        },
        {
            id: 'phase-2',
            company: 'Auravine',
            position: 'Build, Test & Launch',
            description: 'Agile delivery in short sprints, with working software shown to you every two weeks and quality checks throughout.',
            responsibilities: [
                'Data preparation, model development, and evaluation with documented accuracy targets.',
                'Full-stack development of dashboards, admin panels, and customer-facing apps.',
                'Integration with your existing tools such as CRM, POS, accounting, messaging, and telephony.',
                'User acceptance testing and staff training before go-live.',
            ],
            skills: [
                'Agile Delivery',
                'Machine Learning',
                'Full Stack Development',
                'System Integration',
                'QA & Testing',
            ],
            startDate: '2026-01-01',
            isOngoing: true,
            location: 'Dhaka, Bangladesh',
            type: 'contract',
            keyLearnings: [
                'Shipping a working slice early reveals real requirements faster than documents do.',
            ],
            impact: [
                'Clients see a working prototype early, so feedback shapes the final product.',
            ],
        },
        {
            id: 'phase-3',
            company: 'Auravine',
            position: 'Operate, Monitor & Improve',
            description: 'After launch, we monitor performance, retrain models when data changes, and keep your systems secure and up to date.',
            responsibilities: [
                'Uptime and performance monitoring with clear alerts.',
                'Model monitoring for drift, accuracy, and cost, with scheduled retraining.',
                'Security patches, backups, and access reviews.',
                'Monthly reports on usage, outcomes, and recommended improvements.',
            ],
            skills: [
                'MLOps',
                'DevOps',
                'Cloud Operations',
                'Security Operations',
            ],
            startDate: '2026-01-01',
            isOngoing: true,
            location: 'Dhaka, Bangladesh · Global clients',
            type: 'contract',
            keyLearnings: [
                'AI systems need ongoing care; they do not stay accurate by themselves.',
            ],
            impact: [
                'Long-term support keeps systems reliable as your business grows.',
            ],
        },
    ],
    education: [
        {
            id: 'edu-1',
            institution: 'Auravine AI Lab',
            degree: 'Applied AI Research',
            major: 'Voice AI · Computer Vision · Conversational AI',
            startDate: '2025-01-01',
            isOngoing: true,
            activities: ['Bangla speech dataset research', 'Face recognition benchmarking', 'Retrieval-augmented generation experiments'],
            achievements: [
                'Internal benchmarks for every model before it reaches a client',
                'Continuous evaluation of new open and commercial AI models',
                'Knowledge sharing through regular technical sessions',
            ],
        },
    ],
    achievements: [
        {
            id: 'ach-1',
            title: 'Responsible AI Practice',
            issuer: 'Auravine',
            date: '2026-01-01',
            description: 'Every AI system we deliver ships with an evaluation report, data-privacy review, and human-in-the-loop controls for high-impact decisions.',
            category: 'recognition',
            tags: ['Responsible AI', 'Governance'],
        },
        {
            id: 'ach-2',
            title: 'Secure-by-Design Delivery',
            issuer: 'Auravine',
            date: '2026-01-01',
            description: 'Access control, encryption, audit logs, and backups are part of the first sprint, not added at the end of a project.',
            category: 'recognition',
            tags: ['Security', 'Compliance'],
        },
        {
            id: 'ach-3',
            title: 'Bangla & English Language Support',
            issuer: 'Auravine',
            date: '2026-01-01',
            description: 'Our voice and chat products are designed for Bangla, English, and code-mixed conversations common in Bangladesh and the wider region.',
            category: 'recognition',
            tags: ['Bangla', 'NLP'],
        },
    ],
    techStack: [
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python', category: 'language' },
        { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript', category: 'language' },
        { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript', category: 'language' },
        { name: 'React', icon: 'https://cdn.simpleicons.org/react', category: 'framework' },
        { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs', category: 'framework' },
        { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs', category: 'framework' },
        { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi', category: 'framework' },
        { name: 'Flask', icon: 'https://cdn.simpleicons.org/flask', category: 'framework' },
        { name: 'TensorFlow', icon: 'https://cdn.simpleicons.org/tensorflow', category: 'library' },
        { name: 'PyTorch', icon: 'https://cdn.simpleicons.org/pytorch', category: 'library' },
        { name: 'Scikit-learn', icon: 'https://cdn.simpleicons.org/scikitlearn', category: 'library' },
        { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas', category: 'library' },
        { name: 'NumPy', icon: 'https://cdn.simpleicons.org/numpy', category: 'library' },
        { name: 'OpenCV', icon: 'https://cdn.simpleicons.org/opencv', category: 'library' },
        { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain', category: 'library' },
        { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss', category: 'library' },
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql', category: 'database' },
        { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis', category: 'database' },
        { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker', category: 'tool' },
        { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes', category: 'tool' },
        { name: 'Terraform', icon: 'https://cdn.simpleicons.org/terraform', category: 'tool' },
    ],
    hardSkills: [
        { name: 'AI Voice Agents', level: 'expert', category: 'ai', description: 'Designing real-time speech assistants for call centers, clinics, and service businesses in Bangla and English.' },
        { name: 'Conversational AI & Chatbots', level: 'expert', category: 'ai', description: 'Building website, WhatsApp, and Messenger assistants grounded in each client\'s own knowledge base.' },
        { name: 'Large Language Models & RAG', level: 'expert', category: 'ai', description: 'Retrieval-augmented generation, prompt engineering, and evaluation for accurate, citable answers.' },
        { name: 'Computer Vision', level: 'expert', category: 'ai', description: 'Object detection, defect inspection, and video analytics for production and security use cases.' },
        { name: 'Face Recognition Systems', level: 'advanced', category: 'ai', description: 'Touchless attendance and access systems with liveness checks and privacy-aware data handling.' },
        { name: 'Predictive Analytics', level: 'expert', category: 'data', description: 'Demand forecasting, churn prediction, and risk scoring built on clean, well-documented data.' },
        { name: 'Business Intelligence', level: 'expert', category: 'data', description: 'Executive dashboards and KPI tracking that business leaders can use without training.' },
        { name: 'Data Engineering', level: 'advanced', category: 'data', description: 'Connectors, pipelines, and data quality checks across POS, ERP, spreadsheets, and databases.' },
        { name: 'MLOps', level: 'advanced', category: 'ai', description: 'Model versioning, monitoring, drift detection, and safe rollouts for production AI.' },
        { name: 'Full Stack Web & Mobile', level: 'expert', category: 'software', description: 'Responsive web apps and admin panels built with TypeScript, Next.js, and modern APIs.' },
        { name: 'System Architecture', level: 'advanced', category: 'software', description: 'Scalable, secure architectures that can grow from a pilot to thousands of users.' },
        { name: 'API & System Integration', level: 'expert', category: 'software', description: 'Connecting AI products to CRM, accounting, payment, messaging, and telephony platforms.' },
        { name: 'Cloud & DevOps', level: 'advanced', category: 'devops', description: 'Containerized deployments, CI/CD pipelines, monitoring, and backup strategy.' },
        { name: 'Cybersecurity & Data Privacy', level: 'advanced', category: 'software', description: 'Access control, encryption, audit trails, and security reviews built into every project.' },
        { name: 'IoT & Edge AI', level: 'intermediate', category: 'other', description: 'Sensor integration and on-device inference for factories, farms, and smart buildings.' },
        { name: 'UI/UX for Business Software', level: 'advanced', category: 'software', description: 'Clear, accessible interfaces designed around real workflows and the people who use them.' },
    ],
    softSkills: [
        { name: 'Business Understanding', description: 'We translate business goals into technical scope and measurable outcomes.' },
        { name: 'Clear Communication', description: 'Plain-language updates, demos every sprint, and no unnecessary jargon.' },
        { name: 'Transparency', description: 'Honest timelines, clear costs, and early warnings when risks appear.' },
        { name: 'Ownership', description: 'We stay with systems after launch and keep them reliable.' },
        { name: 'Localization', description: 'Products built for Bangla, English, and the way businesses operate in Bangladesh.' },
        { name: 'Collaboration', description: 'Working alongside your staff so knowledge transfers and adoption is smooth.' },
    ],
    tools: [
        { name: 'VS Code', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg', category: 'ide' },
        { name: 'Jupyter', icon: 'https://cdn.simpleicons.org/jupyter', category: 'ide' },
        { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma', category: 'design' },
        { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github', category: 'devops' },
        { name: 'Git', icon: 'https://cdn.simpleicons.org/git', category: 'devops' },
        { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker', category: 'devops' },
        { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux', category: 'devops' },
        { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman', category: 'devops' },
    ],
    faqs: [
        {
            question: 'What services does Auravine offer?',
            answer: 'We build AI voice agents for customer calls, custom chatbots for websites and messaging apps, computer vision systems such as face recognition attendance and quality inspection, business analytics and forecasting dashboards, document intelligence assistants, and custom web and mobile software.',
        },
        {
            question: 'Do you work with businesses outside Bangladesh?',
            answer: 'Yes. Our team is based in Dhaka and works with clients across South Asia, the Middle East, Europe, and North America. We run remote-friendly projects with clear communication and overlapping working hours where possible.',
        },
        {
            question: 'Can your AI voice agent and chatbot understand Bangla?',
            answer: 'Yes. Our voice and chat products support Bangla, English, and code-mixed conversations. We test each deployment with real customer examples from your business before launch.',
        },
        {
            question: 'Where is my data stored, and is it secure?',
            answer: 'You choose the hosting. We can deploy on your own cloud account, a regional cloud, or on-premise hardware. Access control, encryption, audit logs, and backups are standard in every project.',
        },
        {
            question: 'How long does a typical project take?',
            answer: 'A focused pilot, such as one chatbot or one dashboard, often takes a few weeks. Larger platforms are delivered in phases so you see working software early and can adjust priorities as you learn.',
        },
        {
            question: 'Do you provide support after launch?',
            answer: 'Yes. We offer monthly support packages covering monitoring, model retraining, security updates, and feature changes.',
        },
    ],
    blogs: [
        {
            id: 'blog-1',
            slug: 'ai-voice-agents-for-business',
            title: 'Why Every Business Needs an AI Voice Agent Now',
            excerpt: 'Missed calls are lost revenue. Here is how AI voice agents answer every call, book appointments, and hand off the hard cases to your team.',
            content: `Every missed call is a potential customer who calls a competitor. For clinics, hotels, real estate firms, logistics companies, and service businesses, the phone is still the most important sales and support channel, and it is often unanswered after office hours or during busy periods.

An AI voice agent answers that call immediately. It understands natural speech in Bangla, English, and the mixed language many customers use, checks availability in your calendar, books or reschedules appointments, answers common questions about services and prices, and sends a confirmation message when the call ends.

## What a good voice agent does

A useful voice agent does three things well. It answers routine questions instantly, so staff are not interrupted. It completes simple tasks end to end, such as booking a slot or taking a message. And it knows when to stop: when a caller is upset, asks for a manager, or describes something urgent, the call is transferred to a person with a short summary of what was said.

## How to start

Begin with one call type, such as appointment booking or after-hours enquiries. Write down the ten questions your team hears most often and the answers you want given. Connect the agent to the calendar or booking system you already use. Then test it with real examples from your customers before it goes live.

Measure what matters: answer rate, bookings made, average handling time, and the number of calls handed to staff. Review a sample of recordings every week during the first month and refine the scripts and rules.

## The bottom line

Voice AI is not about replacing your team. It is about making sure no caller is ignored, that routine work does not crowd out important work, and that every conversation is recorded and searchable. At Auravine we design these systems around your business rules, deploy them securely, and keep improving them after launch.`,
            image: '/blog/ai-voice-agents-for-business.svg',
            date: '2026-03-20',
            category: 'applied-ai',
            tags: ['Voice AI', 'Customer Service', 'Automation'],
            author: { name: 'Auravine Team', avatar: "/grid.svg", },
            readTime: '5'
        },
        {
            id: 'blog-2',
            slug: 'chatbots-that-cite-their-sources',
            title: 'Chatbots That Cite Their Sources: Building Trust with Customers',
            excerpt: 'A chatbot that guesses damages your brand. Retrieval-based answers with citations keep your customer conversations accurate.',
            content: `Customers ask the same questions every day: What is the price? How long does delivery take? What is your return policy? Can I change my booking? A chatbot can answer these questions around the clock, but only if its answers are accurate. A chatbot that guesses damages trust faster than having no chatbot at all.

The difference is how the answers are produced. Many simple bots rely on fixed scripts that break when a question is phrased differently. Generative models write fluent answers, but they can invent details. The approach we use for business chatbots is retrieval-based: the assistant first searches your own documents, such as product catalogs, policies, and price lists, and then writes its answer using only that material.

## Citations build confidence

Each answer links to the page or document it came from. Customers can check the policy themselves, and your staff can see exactly what the bot relied on. When the documents do not contain an answer, the bot says so and offers a handoff to a person rather than making something up.

## One knowledge base, every channel

The same knowledge should power your website chat, WhatsApp, and Messenger. When the information changes, you update it once. Conversations stay in one inbox, so an agent who takes over a chat sees the full history instead of asking the customer to repeat themselves.

## Measure and improve

Track three numbers from day one: the share of questions answered without a handoff, the questions the bot could not answer, and customer satisfaction after each conversation. The unanswered questions are your roadmap. Add the missing information, and the assistant gets better without a rebuild.`,
            image: '/blog/chatbots-that-cite-their-sources.svg',
            date: '2026-03-15',
            category: 'applied-ai',
            tags: ['Chatbot', 'RAG', 'Customer Trust'],
            author: { name: 'Auravine Team', avatar: "/grid.svg", },
            readTime: '4'
        },
        {
            id: 'blog-3',
            slug: 'face-recognition-attendance-privacy',
            title: 'Face Recognition Attendance: Accuracy, Liveness, and Privacy',
            excerpt: 'What to look for when adopting face recognition attendance in an office or factory, and how to protect employee data.',
            content: `Paper registers and card punching are slow, easy to manipulate, and hard to audit. Face recognition attendance offers a touchless alternative that records check-in and check-out in seconds. It can work with cameras you already have or with dedicated terminals at entrances, and it can export data directly to payroll and HR systems.

Before adopting it, business owners should ask three questions: how accurate is it in our conditions, can it tell a real person from a photo or screen, and how is employee data protected?

## Accuracy depends on the setup

Recognition accuracy depends on camera placement, lighting, angle, and how many people pass the camera at the same time. A good deployment tests each location before rollout, sets thresholds for that location, and uses several frames before accepting a match, so one blurry frame does not create a wrong record.

## Liveness protects against spoofing

A face recognition system should check that a live person is in front of the camera. Liveness checks look for natural movement and depth cues, which prevents attendance fraud using printed photos or phone screens. Suspicious attempts should be logged for review rather than silently ignored.

## Privacy is a design decision

Store face data as encrypted mathematical templates rather than raw photos where your policy allows. Limit access by role, so HR sees attendance records and managers see their team. Set retention periods, and make sure employees know what is collected, why, and how to ask questions or request deletion.

## What success looks like

The best outcome is not a clever camera. It is accurate, trusted attendance data that your managers use every day and that matches your payroll rules. Auravine builds these systems with shift rules, audit trails, and privacy controls from the first sprint.`,
            image: '/blog/face-recognition-attendance-privacy.svg',
            date: '2026-02-10',
            category: 'software-development',
            tags: ['Computer Vision', 'HR Tech', 'Privacy'],
            author: { name: 'Auravine Team', avatar: "/grid.svg", },
            readTime: '6'
        },
        {
            id: 'blog-4',
            slug: 'analytics-before-ai',
            title: 'Start with Analytics Before You Start with AI',
            excerpt: 'Clean data and a clear KPI list matter more than the newest model. A practical roadmap for owners who want AI results.',
            content: `Many businesses want AI before they have answers to basic questions: Which products sell best each week? Where does stock run out? Which branches are profitable? Which customers come back? If those answers depend on spreadsheets that do not match each other, no AI model will fix the problem.

Analytics is the foundation AI is built on. Before you invest in forecasting, automation, or an assistant, make sure your data is trustworthy and your key numbers have clear definitions.

## Start with a short KPI list

Choose five to ten metrics that drive decisions, such as revenue, margin, stock turnover, customer retention, and cash position. Write down how each one is calculated. When two teams report different revenue figures, the problem is almost always a definition, not a calculation error.

## Connect the sources you already use

Most businesses have data in point-of-sale systems, e-commerce platforms, accounting software, and spreadsheets. A basic data pipeline pulls these sources into one place on a schedule, cleans duplicates, normalizes currency and dates, and runs quality checks. When a source stops updating, the dashboard should show that instead of quietly displaying old numbers.

## Then add prediction

Once the data is clean and the dashboards are trusted, forecasting becomes practical. Demand forecasts help you order the right stock. Cash-flow projections show when you need financing. Alerts tell managers when a metric moves outside its normal range. Each model should show its assumptions and how accurate it was on past data, so leaders can judge whether to act on it.

## Where to begin

A focused first project, usually four to six weeks, is enough to show value. Choose one decision that is made often and matters financially, build the data foundation for it, and measure the result. That early win makes the next AI project easier to justify.`,
            image: '/blog/analytics-before-ai.svg',
            date: '2026-01-22',
            category: 'applied-ai',
            tags: ['Business Intelligence', 'Strategy', 'Data'],
            author: { name: 'Auravine Team', avatar: "/grid.svg", },
            readTime: '5'
        },
        {
            id: 'blog-5',
            slug: 'about-auravine',
            title: 'About Auravine: AI-First Software from Dhaka',
            excerpt: 'Who we are, how we work, and why we build AI products for businesses in Bangladesh and abroad.',
            content: `Auravine is an AI-first software development company based in Dhaka, Bangladesh. We help businesses use artificial intelligence in practical ways: answering customer calls, supporting customers in chat, recognizing faces for attendance, inspecting products on production lines, and turning operational data into clear decisions.

We work with local businesses that want to grow without adding headcount for every new customer, and with international companies that need reliable engineering partners in South Asia. Our clients range from clinics and retail chains to manufacturers and startups.

## How we work

Every engagement starts with a conversation about your business goal, not a technology choice. We map your current process, review your data and systems, and deliver a written plan with scope, timeline, and expected impact. Then we build in short sprints, show working software every two weeks, and only move forward when you are satisfied with what you see.

## What we believe

AI should be measured against business outcomes. Systems should be secure by design, with access control, encryption, and audit trails in the first sprint. Products should work in the languages your customers speak, including Bangla. And every solution should be supported after launch, because AI systems need monitoring and retraining as your data changes.

## Talk to us

If you are exploring AI for your business, book a free consultation. We will listen to your challenge, suggest a practical first step, and tell you honestly whether AI is the right tool for it.`,
            image: '/blog/about-auravine.svg',
            date: '2026-01-05',
            category: 'about-me',
            tags: ['Company', 'Dhaka', 'AI'],
            author: { name: 'Auravine Team', avatar: "/grid.svg", },
            readTime: '3'
        },
    ],
    gallery: [
        {
            id: 'gal-1',
            title: 'Discovery Workshop',
            description: 'Mapping business processes with a client team before design begins.',
            date: '2026-02-05',
            type: 'image',
            url: '/studio/discovery-workshop.svg',
            category: 'research'
        },
        {
            id: 'gal-2',
            title: 'Product Demo Session',
            description: 'Walking stakeholders through a working prototype at the end of a sprint.',
            date: '2026-01-20',
            type: 'image',
            url: '/studio/product-demo.svg',
            category: 'event'
        },
        {
            id: 'gal-3',
            title: 'Computer Vision Lab',
            description: 'Testing detection models on camera feeds from real production conditions.',
            date: '2025-12-15',
            type: 'image',
            url: '/studio/computer-vision-lab.svg',
            category: 'technical'
        },
        {
            id: 'gal-4',
            title: 'Team Build Day',
            description: 'Planning the next quarter of AI product development together.',
            date: '2025-11-25',
            type: 'image',
            url: '/studio/team-build-day.svg',
            category: 'event'
        },
    ],
};
