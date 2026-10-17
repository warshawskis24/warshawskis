/* Warshawskis project data.
   live:       URL of the live site, or null
   caseStudy:  true if a full case study exists (shows "Request case study")
   page:       project page path (Sprint 2 builds these)
   Hooks marked TODO need Amos's wording. */
window.WORK = [
  { slug: "rat-race", title: "Rat Race", meta: "Co-creator · Toronto",
    hook: "A puzzle hunt that turned Toronto's PATH into a playground for strangers.",
    tags: ["Brand", "Experience", "Community"], live: "https://www.ratrace.to", caseStudy: true },
  { slug: "macleans-education", title: "Maclean's Education", meta: "SJC Media · Sole UX designer",
    hook: "Canada's most trusted rankings had the readers. I gave them somewhere to stay.",
    tags: ["UX", "IA", "Sub-brand"], live: "https://macleans.ca/education/", caseStudy: true },
  { slug: "next-supergeek", title: "The Next SuperGeek", meta: "CBC Kids × TFO · Co-creator",
    hook: "A multi-platform kids' game, co-created with CBC Kids and TFO.",
    tags: ["Kids", "Game", "Story"], live: null, caseStudy: false },
  { slug: "autoalign", title: "AutoAlign", meta: "Design Lead · 2024–25",
    hook: "Designing trust for an AI that checks other AIs. With a pigeon.",
    tags: ["AI", "Brand", "0→1"], live: "https://www.autoalign.ai/", caseStudy: true },
  { slug: "chatelaine", title: "Chatelaine", meta: "SJC Media · UX Design Lead",
    hook: "A 10-year-old site rebuilt so readers stop hitting a wall, starting with the horoscopes.",
    tags: ["UX", "Media", "Accessibility"], live: null, caseStudy: true },
  { slug: "star-sports", title: "Toronto Star Sports+", meta: "Toronto Star",
    hook: "A premium sports experience redesigned from scratch: 42 new pages.",
    tags: ["Media", "Product", "Brand"], live: null, caseStudy: true },
  { slug: "rbc-mobile", title: "RBC Mobile", meta: "RBC",
    hook: "Credit data made readable for millions of Canadians.",
    tags: ["Fintech", "UX"], live: null, caseStudy: true },
  { slug: "lifemark-assess", title: "Lifemark Assess", meta: "Lifemark · Warshawskis client",
    hook: "An independent-assessment platform, prototyped end to end.",
    tags: ["Health", "Product", "Prototype"], live: null, caseStudy: true }
];

window.LAB = [
  { slug: "delta", title: "Delta", status: "Prototype", hook: "TODO: one line on what Delta is.", tools: ["AI"] },
  { slug: "soma-dashboard", title: "Soma's Dashboard", status: "Ongoing", hook: "One Kanban board instead of checking three task apps.", tools: ["Claude", "HTML/JS"] },
  { slug: "samina-site", title: "Samina's Site", status: "Live", hook: "TODO: who it's for and the AI angle.", tools: ["AI"] },
  { slug: "toronto-life-membership", title: "Toronto Life Membership", status: "Prototype", hook: "An AI-built prototype that sells membership by showing it.", tools: ["AI", "Prototype"] }
];
