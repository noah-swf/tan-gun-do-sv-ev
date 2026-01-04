import type { PortableTextBlock } from '@portabletext/types';
import type { Image, ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const postQuery = groq`*[_type == "newsPost" && slug.current == $slug][0]{
	...,
	gallery[]{
		...,
		asset->{
			...,
			metadata
		}
	}
}`;

export const postsQuery = groq`*[_type == "newsPost" && defined(slug.current)] | order(_createdAt desc)[0...9]`; // Fetch the 9 most recent posts

export const eventsQuery = groq`*[_type == "event"] | order(date asc)[0...2]`;

export const homePageQuery = groq`{
	"hero": *[_type == "heroSection"] | order(_createdAt desc)[0] {
		_id,
		title,
		subtitle,
		slides[]{
			_key,
			alt,
			link,
			durationMs,
			image
		}
	},
	"posts": ${postsQuery},
	"events": ${eventsQuery}
}`;

export const trainingszeitenQuery = groq`
	*[_type == "trainingszeiten"] | order(_createdAt asc) {
	  _id,
	  day,
	  units[]{
	    ageGroup,
	    timeslot,
	    location,
	    comment
	}
  }`;

export const FAQQuery = groq`
	*[_type == "faq"] | order(_createdAt asc) {
	  _id,
	  question,
	  answer
	}`;

export interface units{
	ageGroup: string;
	timeslot: string;
	location?: string;
}

export interface FAQ {
	_id: string;
	question: string;
	answer: string;
}

export interface Trainingszeiten {
	_id?: string;
	day: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday');
	units: units[];
}

export const aboutUsQuery = groq`*[_type == "aboutUs"][0]{
  title,
  description,
  trainers[]->{
    name,
    image,
    roles,
    taekwondoSeit,
    graduierung
  },
  coTrainers[]->{
    name,
    image,
    roles,
    taekwondoSeit,
    graduierung
  },
  certifications[]{
    name,
    logo,
    link
  }
}`;

export interface Post {
	_type: 'newsPost';
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset;
	gallery?: {
		asset: {
			metadata: {
				dimensions: {
					aspectRatio: number;
					width: number;
					height: number;
				};
			};
		};
	}[];
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
	events: Event[];
}

export interface Event {
	_id: string;
	title?: string;
	date?: string;
	ort?: string;
	comment?: string;
}

export const impressumQuery = groq`*[_type == "impressum"][0]`;
export const datenschutzQuery = groq`*[_type == "datenschutz"][0]`;

export interface Impressum {
    _id: string;
    title: string;
    content: PortableTextBlock[];
}

export interface Datenschutz {
    _id: string;
    title: string;
    content: PortableTextBlock[];
}
