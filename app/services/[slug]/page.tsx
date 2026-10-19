import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/PageShell';
import { ServicePage } from '@/components/ServicePage';
import { getService, services } from '@/lib/services';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  const title = `${service.title} for B2B AI & SaaS founders | Veleads`;
  return {
    title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title, description: service.metaDescription, url: `/services/${service.slug}` },
    twitter: { title, description: service.metaDescription },
  };
}

export default async function Page({ params }: PageProps<'/services/[slug]'>) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return (
    <PageShell>
      <ServicePage service={service} />
    </PageShell>
  );
}
