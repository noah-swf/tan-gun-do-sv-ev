import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const postQuery = groq`*[_type == "newsPost" && slug.current == $slug][0]`;

export const postsQuery = groq`*[_type == "newsPost" && defined(slug.current)] | order(_createdAt desc)[0...9]`; // Fetch the 9 most recent posts

export interface Post {
	_type: 'newsPost';
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset;
	body: PortableTextBlock[];
}
