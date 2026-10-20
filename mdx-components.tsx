import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/playbooks/Callout';
import { OfferCta } from '@/components/playbooks/OfferCta';

// Article styling for every playbook. Headings get ids from rehype-slug (see next.config.ts),
// and scroll-mt keeps them clear of the fixed navigation when linked to.
const components: MDXComponents = {
  h2: (props) => <h2 className="heading-3 mt-14 scroll-mt-28 text-text first:mt-0" {...props} />,
  h3: (props) => <h3 className="heading-4 mt-10 scroll-mt-28 text-text" {...props} />,
  p: (props) => <p className="mt-5 text-[1.0625rem] leading-relaxed text-text-secondary" {...props} />,
  ul: (props) => <ul className="mt-5 flex list-disc flex-col gap-2 pl-6 text-[1.0625rem] leading-relaxed text-text-secondary marker:text-brand" {...props} />,
  ol: (props) => <ol className="mt-5 flex list-decimal flex-col gap-2 pl-6 text-[1.0625rem] leading-relaxed text-text-secondary marker:font-semibold marker:text-brand-text" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  a: (props) => <a className="font-medium text-brand-text underline underline-offset-4 hover:no-underline" {...props} />,
  strong: (props) => <strong className="font-semibold text-text" {...props} />,
  code: (props) => <code className="rounded bg-surface-sunken px-1.5 py-0.5 font-mono text-[0.9em] text-text" {...props} />,
  pre: (props) => (
    <pre
      className="mt-5 overflow-x-auto rounded-lg bg-inverse-bg p-5 text-sm leading-relaxed text-inverse-text [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inverse-text"
      {...props}
    />
  ),
  blockquote: (props) => <blockquote className="mt-6 border-l-4 border-brand pl-5 text-text" {...props} />,
  hr: () => <hr className="my-12 border-border" />,
  table: (props) => (
    <div className="mt-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[32rem] border-collapse text-left text-[0.9375rem]" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b border-border bg-bg px-4 py-3 font-semibold text-text" {...props} />,
  td: (props) => <td className="border-b border-border px-4 py-3 align-top text-text-secondary [tr:last-child_&]:border-b-0" {...props} />,
  input: (props) => <input {...props} disabled className="mr-2 h-4 w-4 translate-y-0.5 accent-brand" />,
  Callout,
  OfferCta,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
