import { client } from '$lib/sanity/client';
import { impressumQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const impressum = await client.fetch(impressumQuery);
	return {
		impressum
	};
};
