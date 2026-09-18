/**
 * services.ts — the engagement side of the model.
 *
 * Services say how the platform is delivered to an organization. They never
 * declare platform or usage support, so this module imports nothing from the
 * other two catalogs. `href` is derived rather than authored, so a route and a
 * slug can never drift apart.
 */
import catalog from './catalog/poesis-services.json' with { type: 'json' };

export interface ServicePoint {
  title: string;
  description: string;
}

export interface Service {
  /** Stable public identity; also the `/services/<slug>` route. */
  slug: string;
  /** The claim boundary of the offer; `availabilityNote` states what it excludes. */
  availability: 'By agreement' | 'Planned';
  availabilityNote: string;
  href: string;
  label: string;
  category: string;
  title: string;
  summary: string;
  lead: string;
  proposition: string;
  outcomes: ServicePoint[];
  stages: ServicePoint[];
}

/** The Pilot retains its dedicated engagement route. */
export function serviceHref(service: Pick<Service, 'slug'>): string { return service.slug === 'pilot' ? '/pilot' : `/services/${service.slug}`; }

const authored = catalog.services as Omit<Service, 'href'>[];

export const services: Service[] = authored.map((service) => ({ ...service, href: serviceHref(service) }));

export function serviceBySlug(slug: string): Service | undefined { return services.find((service) => service.slug === slug); }

function unique(values: string[], label: string): void { if (new Set(values).size !== values.length) throw new Error(`Duplicate ${label}`); }

export function validateServices(entries: Service[] = services): void {
  unique(entries.map((service) => service.slug), 'service');
  for (const service of entries) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(service.slug)) throw new Error(`Invalid service slug: ${service.slug}`);
    if (!['By agreement', 'Planned'].includes(service.availability)) throw new Error(`Invalid service availability: ${service.slug}`);
    if (!service.availabilityNote.trim()) throw new Error(`Unqualified service availability: ${service.slug}`);
    if (!service.outcomes.length || !service.stages.length) throw new Error(`Incomplete service: ${service.slug}`);
    for (const point of [...service.outcomes, ...service.stages]) if (!point.title.trim() || !point.description.trim()) throw new Error(`Empty service point on ${service.slug}`);
  }
}
validateServices();
