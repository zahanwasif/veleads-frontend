import { resolveMx, resolveTxt } from 'node:dns/promises';

// Live DNS check behind the Email Outbound page's "Check my domain" form.
// Only DNS lookups, so there's no request to the visitor's servers.

export type Finding = { label: string; ok: boolean };

async function txt(name: string) {
  try {
    return (await resolveTxt(name)).map((parts) => parts.join(''));
  } catch {
    return [];
  }
}

export async function checkDeliverability(domain: string): Promise<Finding[]> {
  const [mx, root, dmarcRecords] = await Promise.all([
    resolveMx(domain).catch(() => []),
    txt(domain),
    txt(`_dmarc.${domain}`),
  ]);

  const spf = root.find((r) => r.toLowerCase().startsWith('v=spf1'));
  const dmarc = dmarcRecords.find((r) => r.toLowerCase().startsWith('v=dmarc1'));
  const policy = dmarc?.match(/;\s*p=(\w+)/i)?.[1]?.toLowerCase();

  return [
    mx.length
      ? { label: 'Mail servers are set up', ok: true }
      : { label: 'No mail servers found for this domain', ok: false },
    spf
      ? { label: 'SPF record found', ok: true }
      : { label: 'No SPF record, so inboxes can’t verify who sends for you', ok: false },
    !dmarc
      ? { label: 'No DMARC record, so spoofed email isn’t blocked', ok: false }
      : policy === 'none'
        ? { label: 'DMARC is set to none, so it isn’t enforced yet', ok: false }
        : { label: `DMARC is enforced (${policy ?? 'policy set'})`, ok: true },
  ];
}
