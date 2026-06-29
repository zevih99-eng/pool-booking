// ─────────────────────────────────────────────────────────────────────────
//  Iceland Industrial Group — site content
//  Edit the copy here; the page layout in App.jsx reads from this file.
// ─────────────────────────────────────────────────────────────────────────

export const COMPANY = {
  name: 'Iceland Industrial Group',
  // PLACEHOLDER — confirm or replace with the business inbox you want public.
  email: 'info@icelandindustrialgroup.com',
  location: 'New York, NY',
  // General region only — no street address shown publicly.
  address: 'New York, NY',
  tagline: 'Institutional standards for industrial real estate.',
}

export const HERO = {
  eyebrow: 'Industrial Real Estate · United States',
  headline: 'Built on income. Managed to institutional standards.',
  sub: 'Iceland Industrial Group acquires and operates existing, income-producing industrial assets — with a focus on long-term value, strategic location, and disciplined, institutional-grade management.',
  primaryCta: { label: 'Start a conversation', href: '#contact' },
  secondaryCta: { label: 'Our approach', href: '#approach' },
}

// Qualitative differentiators (no figures invented — replace with real
// metrics such as AUM, square footage, or asset count when you'd like).
export const STATS = [
  { value: 'Income-first', label: 'We acquire cash-flowing assets, not speculation' },
  { value: 'Long-term', label: 'Hold strategy built around durable value' },
  { value: 'Hands-on', label: 'Institutional-grade, owner-operator management' },
]

export const PILLARS = [
  {
    title: 'Acquisitions',
    body: 'We target existing, income-producing industrial assets in strategic locations — sourcing off-market and relationship-driven opportunities that fit a clear, disciplined investment thesis.',
  },
  {
    title: 'Asset Management',
    body: 'Every asset is run with institutional rigor: proactive operations, tenant relationships, and cost discipline that protect and compound net operating income over time.',
  },
  {
    title: 'Long-Term Value',
    body: 'We are owner-operators, not flippers. Our capital is patient and our horizon is long, aligning our outcomes with the durability of the assets we hold.',
  },
]

export const CRITERIA = {
  eyebrow: 'Investment Focus',
  title: 'What we look for',
  intro:
    'A consistent, repeatable set of criteria keeps our portfolio focused and our underwriting honest.',
  items: [
    { k: 'Asset type', v: 'Warehouse, distribution, light manufacturing, and flex industrial.' },
    { k: 'Profile', v: 'Existing, stabilized, income-producing properties.' },
    { k: 'Location', v: 'Strategic logistics corridors with durable tenant demand.' },
    { k: 'Strategy', v: 'Long-term hold with active, institutional-grade operations.' },
  ],
}

export const TEAM = {
  eyebrow: 'Leadership',
  title: 'A shared vision',
  intro:
    'Iceland Industrial Group was founded on a simple idea: bring institutional standards to the acquisition and management of cash-flowing industrial assets.',
  members: [
    {
      name: 'Daniel Eckstein',
      role: 'Founder & Chief Executive Officer',
      bio: 'Daniel leads the firm’s investment strategy and capital allocation, bringing institutional discipline to the sourcing, underwriting, and management of industrial assets.',
      initials: 'DE',
    },
    {
      name: 'Zevi Hofstatter',
      role: 'Co-Founder',
      bio: 'Zevi pairs relationship-driven sales expertise with deep operational insight and real estate experience, anchoring the firm’s partnerships and day-to-day execution.',
      initials: 'ZH',
    },
  ],
}

export const CONTACT = {
  eyebrow: 'Get in touch',
  title: 'Let’s talk industrial real estate',
  sub: 'Whether you’re a broker with a deal, an owner considering a sale, or an investor exploring a partnership — we’d like to hear from you.',
}
