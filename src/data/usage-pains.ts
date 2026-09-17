import catalog from './catalog/poesis-usage.json' with { type: 'json' };

export interface UsagePain {
    /** Stable public identity, used in derived anchors and diagram lookups. */
    slug: string;
    /** Practice/concern labels. */
    tags: string[];
    /** The pain, stated in the buyer's words. Card title. */
    pain: string;
    /** What the pain costs today. */
    cost: string;
    actorTypes: string[];
    occursIn?: string[];
}

export const usagePains: UsagePain[] = catalog.pains;
