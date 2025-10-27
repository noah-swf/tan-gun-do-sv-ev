import type { PageServerLoad } from './$types';
import { serverClient } from '$lib/server/sanity/client';
import type { Event } from '$lib/sanity/queries';
import groq from 'groq';

const EVENTS_PER_PAGE = 5;

export const load: PageServerLoad = async ({ url }) => {
    const pageParam = Number.parseInt(url.searchParams.get('page') ?? '0', 10);
    const page = Number.isNaN(pageParam) || pageParam < 0 ? 0 : pageParam;
    const loadMore = url.searchParams.get('loadMore') === 'true';

    try {
        const countQuery = groq`count(*[_type == "event" && (date >= now() || !defined(date))])`;
        const totalEvents = await serverClient.fetch<number>(countQuery);

        if (loadMore) {
            const eventsToLoad = (page + 1) * EVENTS_PER_PAGE;
            const eventsQuery = groq`*[_type == "event" && (date >= now() || !defined(date))] | order(coalesce(date, "9999-12-31"), _createdAt asc)[0...${eventsToLoad}]`;
            const events = await serverClient.fetch<Event[]>(eventsQuery);
            return { events, totalEvents, currentPage: page, eventsPerPage: EVENTS_PER_PAGE };
        }

        const start = page * EVENTS_PER_PAGE;
        const end = start + EVENTS_PER_PAGE;
        const eventsQuery = groq`*[_type == "event" && (date >= now() || !defined(date))] | order(coalesce(date, "9999-12-31"), _createdAt asc)[${start}...${end}]`;
        const events = await serverClient.fetch<Event[]>(eventsQuery);
        return { events, totalEvents, currentPage: page, eventsPerPage: EVENTS_PER_PAGE };
    } catch (error) {
        console.error('Failed to load events', error);
        return { events: [] as Event[], totalEvents: 0, currentPage: 0, eventsPerPage: EVENTS_PER_PAGE };
    }
};
