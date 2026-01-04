import { client } from '$lib/sanity/client';
import groq from 'groq';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const query = groq`*[_type == "probetraining"][0]{
    title,
    heroImage,
    heroText,
    contactPersons[]->{
      name,
      image,
      roles,
      taekwondoSeit,
      graduierung
    }
  }`;

  const probetraining = await client.fetch(query);

  return {
    probetraining
  };
};
