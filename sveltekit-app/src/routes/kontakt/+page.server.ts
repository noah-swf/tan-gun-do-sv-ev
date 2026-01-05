import type { PageServerLoad } from './$types';
import { serverClient } from '$lib/server/sanity/client';
import { contactQuery } from '$lib/sanity/queries';

export const load: PageServerLoad = async () => {
    const data = await serverClient.fetch(contactQuery);
    return {
        contact: data
    };
};
