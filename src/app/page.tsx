import Image from "next/image";
import { ArrowUpRight, Check, Code2, Mail } from "lucide-react";
import { SITE, faq, process, projects, services, stack } from "@/lib/content";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

export default function Home() {
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent("Project inquiry")}`;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-violet-500 text-slate-950">
              <Code2 size={18} />
            </span>
            {SITE.name}
          </a>
          <div className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-violet-300">
                {n.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="rounded-md bg-violet-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-violet-400"
          >
            Get in touch
          </a>
        </nav>
      </header>

      <main>
        <section id="top" className="relative overflow-hidden border-b border-slate-900">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.18),transparent_60%)]" />
          <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
            <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-violet-300">
              {SITE.role}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              I build the website, app, or automation that solves{" "}
              <span className="text-violet-400">one specific problem</span> in your business.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              Websites that convert, booking systems without double bookings, secure client portals, workflow
              automation, and AI assistants. Below are five working projects you can click through right now.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#work" className="rounded-md bg-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-violet-400">
                See the work
              </a>
              <a href="#contact" className="rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold hover:border-slate-500">
                Start a conversation
              </a>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold tracking-tight">What I build</h2>
          <p className="mt-2 text-slate-400">Each one starts from a business problem, not a technology.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="border-y border-slate-900 bg-slate-900/30 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-bold tracking-tight">Selected work</h2>
            <p className="mt-2 max-w-2xl text-slate-400">
              All five are concept projects I built to show what I can do. They are fully working, but the businesses
              are fictional and none were built for real clients.
            </p>

            <div className="mt-12 space-y-16">
              {projects.map((p, i) => (
                <article
                  key={p.slug}
                  className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
                >
                  <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                    {p.image ? (
                      <Image src={p.image} alt={`${p.title} screenshot`} width={1440} height={900} className="h-auto w-full" />
                    ) : (
                      <div className="flex aspect-[16/10] flex-col items-center justify-center gap-2 bg-gradient-to-br from-violet-500/20 to-slate-900 p-8 text-center">
                        <p className="font-mono text-xs uppercase tracking-widest text-violet-300">Workflow</p>
                        <p className="font-mono text-sm text-slate-300">
                          Webhook &rarr; Validate &rarr; Database &rarr; Email &rarr; Respond
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium uppercase tracking-widest text-violet-300">{p.kind}</span>
                      <span className="rounded-full border border-slate-700 px-2.5 py-0.5 text-[11px] text-slate-400">
                        Concept project
                      </span>
                    </div>
                    <h3 className="mt-2 text-2xl font-bold">{p.title}</h3>
                    <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                      <div>
                        <dt className="font-semibold text-slate-200">Problem</dt>
                        <dd className="text-slate-400">{p.problem}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-200">Solution</dt>
                        <dd className="text-slate-400">{p.solution}</dd>
                      </div>
                    </dl>
                    <ul className="mt-4 space-y-1.5">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-slate-300">
                          <Check size={16} className="mt-0.5 shrink-0 text-violet-400" /> {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <span key={t} className="rounded-md bg-slate-800 px-2.5 py-1 font-mono text-xs text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex gap-3">
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md bg-violet-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-violet-400"
                        >
                          Live demo <ArrowUpRight size={15} />
                        </a>
                      )}
                      <a
                        href={p.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold hover:border-slate-500"
                      >
                        View code <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="stack" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold tracking-tight">Tools I use, and why</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((s) => (
              <div key={s.name} className="rounded-xl border border-slate-800 p-5">
                <p className="font-semibold">{s.name}</p>
                <p className="mt-1 text-sm text-slate-400">{s.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="process" className="border-y border-slate-900 bg-slate-900/30 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-bold tracking-tight">How we would work together</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-4">
              {process.map((step, i) => (
                <li key={step.title}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-slate-950">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight">About</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            I am an independent developer based in Poland, working in English with clients anywhere. I learn by
            building real things end to end: design, database, login, deployment, and documentation. Every project
            here has a README explaining the problem, the solution, and the trade-offs, because I think you should be
            able to understand what you are paying for.
          </p>
        </section>

        <section id="faq" className="border-t border-slate-900 bg-slate-900/30 py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-bold tracking-tight">Questions</h2>
            <div className="mt-8 divide-y divide-slate-800 rounded-xl border border-slate-800">
              {faq.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="cursor-pointer list-none font-semibold marker:content-none">
                    <span className="flex items-center justify-between gap-4">
                      {f.q}
                      <span className="text-violet-400 transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.18),transparent_60%)]" />
          <div className="relative mx-auto max-w-2xl px-6 py-24 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Have a problem worth solving?</h2>
            <p className="mt-4 text-lg text-slate-400">
              Tell me what is slowing your business down. I will reply with honest thoughts on whether a website, app,
              or automation is the right fix.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={mailto}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-violet-400"
              >
                <Mail size={16} /> {SITE.email}
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold hover:border-slate-500"
              >
                <Code2 size={16} /> GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900 py-8 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} {SITE.name}. All projects shown are concept work.
      </footer>
    </>
  );
}
