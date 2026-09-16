import { actorTypes, type ActorType } from './usage-actors.ts';

export type Profile = ActorType;
export const profiles = actorTypes.filter((actor) => ['it-cto', 'it-architect', 'it-ciso', 'it-platform', 'it-head-of-ai'].includes(actor.slug));
export const profilesForDomain = (domainSlug: Profile['domainSlug']): Profile[] =>
    profiles.filter((profile) => profile.domainSlug === domainSlug);
