import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { PageShell } from '@/components/PageShell';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GridBackdrop } from '@/components/ui/GridBackdrop';

// Not legal advice: have a lawyer review it, and update COMPANY once Veleads is registered.
// Veleads isn't a registered company yet, so the people running it are responsible for the data.
// Once it's registered, replace `operator` with the company's legal name and registered address.
const COMPANY = {
  operator: 'Abdullah Liaqat',
  country: 'the United States',
  email: 'privacy@veleads.io',
};
const LAST_UPDATED = '6 November 2026';
/** How long we keep leads who never became clients. Confirm before publishing. */
const LEAD_RETENTION = '24 months after our last contact with you';

const title = 'Privacy policy | Veleads';
const description = 'What personal data Veleads collects through veleads.io, why, who we share it with, and your rights.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/privacy' },
  openGraph: { title, description, url: '/privacy' },
  twitter: { title, description },
};

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          Veleads is run by {COMPANY.operator}, based in {COMPANY.country}. Veleads isn&rsquo;t a registered company
          yet, so {COMPANY.operator}{' '}is responsible for the personal data described here. We&rsquo;ll update this
          page when that changes. We run LinkedIn content, LinkedIn outreach and cold email for B2B founders.
        </p>
        <p>
          Questions or requests about your data: <strong>{COMPANY.email}</strong>.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: 'What we collect',
    body: (
      <>
        <h3>What you give us</h3>
        <ul>
          <li>
            <strong>Free report and review forms:</strong> your company website or LinkedIn profile link, full name,
            work email and role, plus your average deal size and when you want to start if you choose to share them.
          </li>
          <li>
            <strong>Booking a call:</strong> the details you enter in Calendly, such as your name, email and answers
            to any booking questions.
          </li>
          <li>
            <strong>Emails and calls:</strong> anything you tell us when you contact us or speak with us.
          </li>
        </ul>
        <h3>What we collect automatically</h3>
        <ul>
          <li>
            <strong>Usage data:</strong> pages you visit, the page you submitted a form from, your browser and device
            type, and your IP address. We use your IP address to block abuse of our forms and pass it to HubSpot with
            a form submission.
          </li>
          <li>
            <strong>Cookies:</strong> see <a href="#cookies">Cookies</a> below.
          </li>
        </ul>
        <h3>What we look up</h3>
        <ul>
          <li>
            <strong>Your company website:</strong> when you enter a website, we check that it exists, fetch its
            public icon to show in the popup, and, for the email deliverability check, look up its public DNS records
            (mail servers, SPF and DMARC).
          </li>
          <li>
            <strong>Your LinkedIn profile:</strong> when you ask for a LinkedIn report, we may look up the public
            information on the profile you gave us (such as your headline, about section and recent posts) to
            prepare it.
          </li>
          <li>
            <strong>If you use &ldquo;Continue with LinkedIn&rdquo;:</strong> LinkedIn shares your name, email
            address and profile photo with us. We use them to confirm the profile is yours and to send you your
            report. We never see your LinkedIn password.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use-it',
    title: 'How we use it, and why we’re allowed to',
    body: (
      <ul>
        <li>
          <strong>To send you what you asked for</strong>, such as a report, review or audit, and to arrange calls.
          This is necessary to provide the service you requested.
        </li>
        <li>
          <strong>To follow up about working with us</strong>, by email or on LinkedIn, after you request something
          from us. This is our legitimate interest in growing our business. You can tell us to stop at any time.
        </li>
        <li>
          <strong>To understand and improve the website</strong> through analytics. We only do this with your
          consent, given through the cookie banner.
        </li>
        <li>
          <strong>To keep the site secure</strong> and prevent abuse, such as limiting how often a form can be
          sent. This is our legitimate interest.
        </li>
        <li>
          <strong>To deliver our services to clients</strong> under the contract we have with them.
        </li>
      </ul>
    ),
  },
  {
    id: 'who-we-share-it-with',
    title: 'Who we share it with',
    body: (
      <>
        <p>
          We don&rsquo;t sell your personal data. We share it only with the service providers that help us run
          Veleads, and only for the purposes above:
        </p>
        <ul>
          <li>
            <strong>Vercel</strong> hosts the website.
          </li>
          <li>
            <strong>HubSpot</strong> is our CRM. It stores form submissions, tracks website visits (with your
            consent) and runs our cookie banner.
          </li>
          <li>
            <strong>Google Tag Manager</strong> loads analytics tags on the site, with your consent.
          </li>
          <li>
            <strong>n8n</strong> runs the automation that prepares and emails your report.
          </li>
          <li>
            <strong>Calendly</strong> handles call bookings.
          </li>
          <li>
            <strong>AI providers</strong> help prepare reports and draft messages.
          </li>
          <li>
            <strong>LinkedIn</strong>, if you use &ldquo;Continue with LinkedIn&rdquo;, and the tools we use to
            look up public LinkedIn profiles.
          </li>
        </ul>
        <p>
          We may also share data if the law requires it, or with a buyer if Veleads is ever sold or merged.
        </p>
      </>
    ),
  },
  {
    id: 'international-transfers',
    title: 'International transfers',
    body: (
      <p>
        We&rsquo;re based in the United States, and most of our providers store data there. If you&rsquo;re in the
        UK or EU, your data is transferred to the US. We rely on safeguards such as the European Commission&rsquo;s
        standard contractual clauses or our providers&rsquo; certification under the EU&ndash;US Data Privacy
        Framework and its UK extension.
      </p>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: (
      <>
        <p>We use cookies and similar technologies for two things:</p>
        <ul>
          <li>
            <strong>Remembering your cookie choice:</strong> a cookie set by HubSpot&rsquo;s banner, so we
            don&rsquo;t ask you again.
          </li>
          <li>
            <strong>Analytics and tracking:</strong> HubSpot cookies (such as <code>hubspotutk</code>) that link
            your visits to a form you submit, and cookies set by the analytics tags in Google Tag Manager. These are
            only used if you accept them.
          </li>
        </ul>
        <p>
          You can change your choice at any time with the &ldquo;Cookie settings&rdquo; link in the footer, or clear
          cookies in your browser.
        </p>
      </>
    ),
  },
  {
    id: 'how-long-we-keep-it',
    title: 'How long we keep it',
    body: (
      <ul>
        <li>
          <strong>Enquiries and report requests</strong> that don&rsquo;t lead to working together: {LEAD_RETENTION}, then
          deleted.
        </li>
        <li>
          <strong>Client data:</strong> for as long as we work together, then as long as the law requires for tax
          and accounting records.
        </li>
        <li>
          <strong>Website logs and analytics:</strong> for the periods set by Vercel, HubSpot and Google.
        </li>
      </ul>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: (
      <>
        <p>Depending on where you live, you can ask us to:</p>
        <ul>
          <li>give you a copy of the personal data we hold about you</li>
          <li>correct it if it&rsquo;s wrong</li>
          <li>delete it</li>
          <li>stop or limit how we use it, including for follow-ups</li>
          <li>send it to you or another company in a common format</li>
          <li>withdraw your consent to cookies or analytics at any time</li>
        </ul>
        <p>
          Email <strong>{COMPANY.email}</strong>{' '}and we&rsquo;ll reply within one month. If you&rsquo;re not happy
          with our answer, you can complain to your local data protection authority, such as the ICO in the UK.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <p>
        We use reputable providers, encrypted connections (HTTPS) and access controls to protect your data. No system
        is perfectly secure, but we&rsquo;ll tell you and the authorities promptly if a breach affects you.
      </p>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: <p>Veleads is a business service. We don&rsquo;t knowingly collect data from anyone under 16.</p>,
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We&rsquo;ll update this page when our practices change, and change the date at the top. For significant
        changes, we&rsquo;ll let you know by email if we have it.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <section className="pt-[72px]">
        <div className="panel relative isolate overflow-hidden bg-bg py-16 md:py-24">
          <GridBackdrop />
          <div className="container-page flex flex-col items-center gap-6 text-center">
            <Eyebrow>Last updated {LAST_UPDATED}</Eyebrow>
            <h1 className="display-l max-w-[48rem]">Privacy policy</h1>
            <p className="lead max-w-[38rem] text-text-secondary max-md:text-[1.0625rem] max-md:leading-relaxed">
              What we collect when you use veleads.io, why, who we share it with, and how to get it changed or
              deleted.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="sticky top-28 flex flex-col gap-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <Link href={`#${s.id}`} className="text-text-secondary transition-colors hover:text-text">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex max-w-[44rem] flex-col gap-12">
            {sections.map((s) => (
              <article key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="heading-3 mb-4">{s.title}</h2>
                <div className="flex flex-col gap-4 text-text-secondary [&_a]:font-semibold [&_a]:text-brand-text [&_a:hover]:underline [&_code]:rounded [&_code]:bg-surface-sunken [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_h3]:mt-2 [&_h3]:font-semibold [&_h3]:text-text [&_li]:pl-1 [&_strong]:text-text [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
                  {s.body}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
