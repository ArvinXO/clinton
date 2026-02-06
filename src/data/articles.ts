export interface Article {
    id: string;
    title: string;
    date: string;
    category: string;
    summary: string;
    readTime: string;
    slug: string;
    content: string;
}

export const articles: Article[] = [
    {
        id: "1",
        title: "Tactical Forensics: Reclaiming Digital Assets from Offshore Entities",
        date: "February 5, 2026",
        category: "Legal Guide",
        summary: "A technical blueprint for investigating and challenging operators who refuse to release legitimate player earnings.",
        readTime: "9 min read",
        slug: "reclaiming-offshore-assets",
        content: "..."
    },
    {
        id: "2",
        title: "The Compliance Gap: How Operator Negligence Creates Your Refund Case",
        date: "February 1, 2026",
        category: "Regulation",
        summary: "Understanding why failure to triggered mandatory wealth verification is a legal breach that favors the player.",
        readTime: "7 min read",
        slug: "compliance-negligence-refunds",
        content: "..."
    },
    {
        id: "3",
        title: "Card Network Arbitration: Mastering the Chargeback Process in 2026",
        date: "January 28, 2026",
        category: "Legal Guide",
        summary: "An expert comparison of Visa vs Mastercard dispute rules. Learn which merchant codes are most susceptible to challenge.",
        readTime: "11 min read",
        slug: "card-arbitration-mastery",
        content: "..."
    },
    {
        id: "4",
        title: "Protocol Curaçao: Piercing Corporate Obscurity in Global Betting",
        date: "January 15, 2026",
        category: "Regulation",
        summary: "New legislative changes in the Antilles are finally making sub-licensees accountable to European legal standards.",
        readTime: "13 min read",
        slug: "protocol-curacao-obscurity",
        content: "..."
    },
    {
        id: "5",
        title: "Balance Restoration: Challenging Unjust Account Freezes and Bans",
        date: "January 20, 2026",
        category: "Player Rights",
        summary: "What to do when 'professional play' or 'arbitrage' tags are used as an excuse to freeze high-stakes victory balances.",
        readTime: "8 min read",
        slug: "challenging-account-freezes",
        content: "..."
    },
    {
        id: "6",
        title: "Digital Memory: Exercising DPA 2018 Rights Against Gaming Databases",
        date: "December 28, 2025",
        category: "Privacy & Data",
        summary: "A legal guide to the 'Right to be Forgotten' and preventing operators from sharing your data via hidden networks.",
        readTime: "10 min read",
        slug: "dpa-privacy-rights",
        content: "..."
    },
    {
        id: "7",
        title: "The 'No Win, No Fee' Reality: Transparency in Legal Recovery Costs",
        date: "December 15, 2025",
        category: "Legal Guide",
        summary: "Everything players need to know about the fiscal structures of legal intervention and contingency modeling.",
        readTime: "6 min read",
        slug: "legal-recovery-transparency",
        content: "..."
    },
    {
        id: "8",
        title: "Affordability Thresholds: When Casinos Overstep Their Regulatory Bounds",
        date: "December 5, 2025",
        category: "Regulation",
        summary: "Analyzing the 'Duty of Care' and how excessive deposit limits without inquiry can lead to full loss restoration.",
        readTime: "9 min read",
        slug: "affordability-regulatory-bounds",
        content: "..."
    },
    {
        id: "9",
        title: "Evidence Synthesis: Building a Bulletproof Case for IBAS Resolution",
        date: "November 22, 2025",
        category: "Legal Guide",
        summary: "Technical steps to organize correspondence and transaction logs for maximum impact during ADR proceedings.",
        readTime: "8 min read",
        slug: "evidence-synthesis-ibas",
        content: "..."
    },
    {
        id: "10",
        title: "Case Study: The £40k Reclaim from a 'Mirror' Operator",
        date: "November 10, 2025",
        category: "Case Study",
        summary: "How our team used jurisdictional cross-referencing to recover funds from a casino operating outside its stated license.",
        readTime: "12 min read",
        slug: "case-study-mirror-operator",
        content: "..."
    }
];

export const categories = [
    "All",
    "Legal Guide",
    "Player Rights",
    "Case Study",
    "Regulation",
    "Privacy & Data"
];
