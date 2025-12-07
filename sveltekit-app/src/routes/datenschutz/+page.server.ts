import { client } from '$lib/sanity/client';
import { datenschutzQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const datenschutz = await client.fetch(datenschutzQuery);
	return {
		datenschutz
	};
};
