import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import GithubSlugger from 'github-slugger';
import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/PageShell';
import { OfferCta } from '@/components/playbooks/OfferCta';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { authors } from '@/lib/authors';
import { PLAYBOOK_SLUGS, isPlaybookSlug, loadPlaybook, topicDetails } from '@/lib/playbooks';
import { SITE_URL } from '@/lib/site-url';

export const dynamicParams = false;

export function generateStaticParams() {
  return PLAYBOOK_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<'/playbooks/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  if (!isPlaybookSlug(slug)) return {};
  const { meta } = await loadPlaybook(slug);
  const title = `${meta.title} | Veleads`;
  return {
    title,
    description: meta.description,
    alternates: { canonical: `/playbooks/${slug}` },
    openGraph: {
      type: 'article',
      title,
      description: meta.description,
      url: `/playbooks/${slug}`,
      publishedTime: meta.published,
      modifiedTime: meta.updated ?? meta.published,
    },
    twitter: { title, description: meta.description },
  };
}

// Table of contents from the file's "## " headings, using the same ids rehype-slug gives the rendered headings.
async function tableOfContents(slug: string) {
  const source = await readFile(join(process.cwd(), 'content/playbooks', `${slug}.mdx`), 'utf8');
  const slugger = new GithubSlugger();
  // Strip fenced code blocks first, so headings inside code samples don't appear in the contents.
  const prose = source.replace(/^```[\s\S]*?^```/gm, '');
  return [...prose.matchAll(/^## (.+)$/gm)].map(([, text]) => ({ text: text.trim(), id: slugger.slug(text.trim()) }));
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default async function PlaybookPage({ params }: PageProps<'/playbooks/[slug]'>) {
  const { slug } = await params;
  if (!isPlaybookSlug(slug)) notFound();
  const { default: Body, meta } = await loadPlaybook(slug);
  const toc = await tableOfContents(slug);
  const { label: topicLabel, service, offer } = topicDetails(meta.topic);
  const author = authors[meta.author];

  // Article structured data, so search engines and AI assistants know what this page is and who wrote it.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.published,
    dateModified: meta.updated ?? meta.published,
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      image: `${SITE_URL}${author.image}`,
      url: author.linkedin,
      sameAs: [author.linkedin],
      worksFor: { '@type': 'Organization', name: 'Veleads', url: SITE_URL },
    },
    publisher: { '@type': 'Organization', name: 'Veleads', url: SITE_URL, logo: `${SITE_URL}/icon.svg` },
    mainEntityOfPage: `${SITE_URL}/playbooks/${slug}`,
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="pt-[72px]">
        <div className="panel relative isolate overflow-hidden bg-bg py-12 md:py-20">
          <GridBackdrop />
          <div className="container-page flex max-w-[56rem] flex-col items-start gap-6">
            <Link
              href="/playbooks"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All playbooks
            </Link>
            <Eyebrow>{topicLabel}</Eyebrow>
            <h1 className="display-l">{meta.title}</h1>
            <p className="lead max-w-[42rem] text-text-secondary max-md:text-[1.0625rem] max-md:leading-relaxed">
              {meta.summary}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-text-muted">
              <a
                href={author.linkedin}
                rel="author noopener"
                target="_blank"
                className="group inline-flex items-center gap-3"
              >
                <Image
                  src={author.image}
                  alt={author.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full ring-2 ring-surface"
                />
                <span className="flex flex-col leading-tight">
                  <span className="font-semibold text-text group-hover:underline group-hover:underline-offset-4">
                    {author.name}
                  </span>
                  <span>{author.role}</span>
                </span>
              </a>
              <span aria-hidden="true">·</span>
              <time dateTime={meta.updated ?? meta.published}>
                {meta.updated ? `Updated ${formatDate(meta.updated)}` : formatDate(meta.published)}
              </time>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" aria-hidden="true" /> {meta.readingMinutes} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,15rem)_minmax(0,44rem)] lg:justify-center lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-28 flex flex-col gap-3">
            <span className="text-[13px] font-semibold uppercase tracking-[1.2px] text-text-muted">On this page</span>
            <ol className="flex flex-col gap-2 border-l border-border">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-sm leading-snug text-text-secondary transition-colors hover:border-brand hover:text-text"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <article className="min-w-0">
          <Body />

          <aside aria-label="About the author" className="mt-14 flex gap-4 rounded-xl bg-bg p-6">
            <Image
              src={author.image}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-full"
            />
            <div className="flex flex-col gap-1.5">
              <span className="text-sm text-text-muted">Written by</span>
              <span className="heading-4">{author.name}</span>
              <p className="text-text-secondary">{author.bio}</p>
              <a
                href={author.linkedin}
                rel="author noopener"
                target="_blank"
                className="mt-1 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-text hover:underline hover:underline-offset-4"
              >
                Connect on LinkedIn <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </aside>

          <OfferCta
            offer={offer}
            id="playbook-end-form"
            title={offer === 'deliverability-check' ? 'Want us to check yours?' : 'Want this done for you?'}
            body={
              offer === 'deliverability-check'
                ? 'Enter your website and we’ll run the same checks from this playbook on your domain.'
                : 'Start with the free version below. It takes about 20 seconds.'
            }
          />
          <Link
            href={service ? `/services/${service.slug}` : '/#services'}
            className="group flex items-center justify-between gap-4 rounded-xl border border-border p-5 transition-colors hover:bg-bg"
          >
            <span className="flex flex-col gap-1">
              <span className="text-sm text-text-muted">Rather have it done for you?</span>
              <span className="font-semibold text-text">
                {service ? `See our ${service.title} service` : 'See the 90-Day Pipeline Sprint'}
              </span>
            </span>
            <ArrowUpRight
              className="h-5 w-5 shrink-0 text-brand-text transition-transform duration-300 ease-out-soft group-hover:rotate-45"
              aria-hidden="true"
            />
          </Link>
        </article>
      </div>
    </PageShell>
  );
}
