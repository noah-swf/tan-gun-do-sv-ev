import type { PortableTextBlock } from '@portabletext/types';
import type { Image, ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const postQuery = groq`*[_type == "newsPost" && slug.current == $slug][0]`;

export const postsQuery = groq`*[_type == "newsPost" && defined(slug.current)] | order(_createdAt desc)[0...9]`; // Fetch the 9 most recent posts

export const homePageQuery = groq`{
  "hero": *[_type == "heroSection"] | order(_createdAt desc)[0] {
    _id,
    title,
    subtitle,
    slides[]{
      _key,
      alt,
      caption,
      link,
      durationMs,
      image
    }
  },
  "posts": ${postsQuery}
}`;

export const trainingszeitenQuery = groq`
	*[_type == "trainingszeiten"] | order(_createdAt asc) {
	  _id,
	  day,
	  units[]{
	    ageGroup,
	    timeslot,
	    location,
	    trainer
	}
  }`;

export interface units{
	ageGroup: string;
	timeslot: string;
	location?: string;
}

export interface Trainingszeiten {
	_id?: string;
	day: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday');
	units: units[];
}

export interface Post {
	_type: 'newsPost';
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset;
	body: PortableTextBlock[];
}

export interface HeroSlide {
	_key?: string;
	alt?: string;
	durationMs?: number;
	image?: Image;
}

export interface HeroContent {
	_id?: string;
	title?: string;
	subtitle?: string;
	slides?: HeroSlide[];
}

export interface HomePagePayload {
	hero: HeroContent | null;
	posts: Post[];
}
