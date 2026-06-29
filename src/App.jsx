import { useEffect, useState } from 'react'
import Logo, { LogoMark } from './components/Logo'
import {
  COMPANY,
  HERO,
  STATS,
  PILLARS,
  CRITERIA,
  TEAM,
  CONTACT,
} from './content'

const NAV = [
  { label: 'Approach', href: '#approach' },
  { label: 'Focus', href: '#focus' },
  { label: 'Leadership', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-hairline bg-white/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[15px] font-medium text-slate transition-colors hover:text-glacier"
            >
              {n.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary !px-5 !py-2 text-[14px]">
            Get in touch
          </a>
        </nav>
        <button
          className="md:hidden text-ink"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-hairline bg-white md:hidden">
          <nav className="wrap flex flex-col py-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-[15px] font-medium text-slate"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background:
            'radial-gradient(1100px 520px at 78% -8%, rgba(111,168,220,0.45), transparent 60%), radial-gradient(820px 480px at 8% 108%, rgba(31,95,168,0.5), transparent 60%)',
        }}
      />
      <div className="wrap relative grid gap-12 pb-20 pt-32 sm:pt-36 lg:grid-cols-12 lg:items-center lg:pb-28 lg:pt-40">
        <div className="lg:col-span-7">
          <p className="eyebrow text-ice fade-up">{HERO.eyebrow}</p>
          <h1 className="fade-up mt-5 text-[40px] font-semibold leading-[1.05] tracking-tightest text-white sm:text-[56px]">
            {HERO.headline}
          </h1>
          <p className="fade-up mt-6 max-w-xl text-[18px] leading-relaxed text-mist/90" style={{ animationDelay: '80ms' }}>
            {HERO.sub}
          </p>
          <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: '140ms' }}>
            <a href={HERO.primaryCta.href} className="btn-light">
              {HERO.primaryCta.label}
            </a>
            <a href={HERO.secondaryCta.href} className="btn border border-white/25 text-white hover:bg-white/10">
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
        <div className="fade-up lg:col-span-5" style={{ animationDelay: '200ms' }}>
          <div className="relative mx-auto flex aspect-square max-w-sm items-center justify-center">
            <div className="absolute inset-0 rounded-[28px] border border-white/15 bg-white/[0.04] backdrop-blur-sm" />
            <div className="text-white/90">
              <LogoMark className="h-28 w-28 drop-shadow-[0_8px_30px_rgba(111,168,220,0.45)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-b border-hairline bg-white">
      <div className="wrap grid gap-px overflow-hidden sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.value} className="py-10 text-center sm:px-6">
            <div className="font-serif text-[30px] font-semibold text-navy">{s.value}</div>
            <p className="mx-auto mt-2 max-w-[16rem] text-[15px] text-steel">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section id="approach" className="bg-white py-24">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow">Our Approach</p>
          <h2 className="mt-4 text-[32px] font-semibold sm:text-[40px]">
            Disciplined ownership of essential assets.
          </h2>
          <p className="mt-5 text-[18px] text-slate">
            Industrial real estate is the backbone of the modern economy. We invest where that demand is
            durable — and we operate with the rigor of an institution and the care of an owner.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div key={p.title} className="card">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-frost text-glacier">
                <span className="font-serif text-[18px] font-semibold">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-5 text-[20px] font-semibold">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Focus() {
  return (
    <section id="focus" className="bg-frost py-24">
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">{CRITERIA.eyebrow}</p>
          <h2 className="mt-4 text-[32px] font-semibold sm:text-[40px]">{CRITERIA.title}</h2>
          <p className="mt-5 text-[18px] text-slate">{CRITERIA.intro}</p>
          <a href="#contact" className="btn-primary mt-8">
            Have a property?
          </a>
        </div>
        <dl className="divide-y divide-hairline rounded-lg border border-hairline bg-white px-7 shadow-card">
          {CRITERIA.items.map((it) => (
            <div key={it.k} className="grid grid-cols-3 gap-4 py-5">
              <dt className="text-[13px] font-semibold uppercase tracking-wider text-glacier">{it.k}</dt>
              <dd className="col-span-2 text-[15px] text-ink">{it.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section id="team" className="bg-white py-24">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow">{TEAM.eyebrow}</p>
          <h2 className="mt-4 text-[32px] font-semibold sm:text-[40px]">{TEAM.title}</h2>
          <p className="mt-5 text-[18px] text-slate">{TEAM.intro}</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {TEAM.members.map((m) => (
            <div key={m.name} className="card flex gap-5">
              <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-navy font-serif text-[18px] font-semibold text-white">
                {m.initials}
              </div>
              <div>
                <h3 className="text-[19px] font-semibold">{m.name}</h3>
                <p className="text-[14px] font-medium text-glacier">{m.role}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
    'Inquiry — Iceland Industrial Group',
  )}`
  return (
    <section id="contact" className="relative overflow-hidden bg-navy py-24 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(700px 380px at 85% 0%, rgba(111,168,220,0.4), transparent 60%)',
        }}
      />
      <div className="wrap relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow text-ice">{CONTACT.eyebrow}</p>
          <h2 className="mt-4 text-[32px] font-semibold text-white sm:text-[40px]">{CONTACT.title}</h2>
          <p className="mt-5 max-w-md text-[18px] text-mist/90">{CONTACT.sub}</p>
        </div>
        <div className="rounded-lg border border-white/15 bg-white/[0.04] p-8 backdrop-blur-sm">
          <ContactRow label="Email" value={COMPANY.email} href={mailto} />
          <ContactRow label="Office" value={COMPANY.address} />
          <a href={mailto} className="btn-light mt-7 w-full">
            Email us
          </a>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ label, value, href }) {
  const inner = href ? (
    <a href={href} className="text-white hover:text-ice">
      {value}
    </a>
  ) : (
    <span className="text-white">{value}</span>
  )
  return (
    <div className="border-b border-white/10 py-4 first:pt-0">
      <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ice">{label}</div>
      <div className="mt-1 text-[16px]">{inner}</div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-ink py-12 text-mist/70">
      <div className="wrap flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <Logo light />
        <div className="flex flex-wrap gap-x-7 gap-y-2">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-[14px] text-mist/70 hover:text-white">
              {n.label}
            </a>
          ))}
        </div>
      </div>
      <div className="wrap mt-8 border-t border-white/10 pt-6 text-[13px] text-mist/50">
        © {new Date().getFullYear()} {COMPANY.name}. {COMPANY.location}. All rights reserved.
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Approach />
        <Focus />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
