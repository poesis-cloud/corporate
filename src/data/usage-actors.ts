import catalog from './catalog/poesis-usage.json' with { type: 'json' };

export interface ActorType {
    /** Stable public identity, used in query parameters and derived anchors. */
    slug: string;
    kind: 'human' | 'system';
    domainSlug: 'it';
    name: string;
    tags: string[];
    /** Icon name from components/Icon.astro. */
    icon: string;
    hook: string;
    body: string;
}

export const actorTypes: ActorType[] = catalog.actorTypes as ActorType[];
