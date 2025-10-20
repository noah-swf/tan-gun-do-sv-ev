import type { PageServerLoad } from './$types';
import { serverClient } from '$lib/server/sanity/client';
import type { Post } from '$lib/sanity/queries';
import groq from 'groq';

const POSTS_PER_PAGE = 6;

export const load: PageServerLoad = async ({ url }) => {
    const page = parseInt(url.searchParams.get('page') || '0');
    const loadMore = url.searchParams.get('loadMore') === 'true';
    
    try {
        // Get total count
        const countQuery = groq`count(*[_type == "newsPost" && defined(slug.current)])`;
        const totalPosts = await serverClient.fetch<number>(countQuery);
        
        if (loadMore) {
            // Mobile: load multiple pages worth of posts
            const postsToLoad = (page + 1) * POSTS_PER_PAGE;
            const postsQuery = groq`*[_type == "newsPost" && defined(slug.current)] | order(_createdAt desc)[0...${postsToLoad}]`;
            const posts = await serverClient.fetch<Post[]>(postsQuery);
            return { posts, totalPosts };
        } else {
            // Desktop: load only current page
            const start = page * POSTS_PER_PAGE;
            const end = start + POSTS_PER_PAGE;
            const postsQuery = groq`*[_type == "newsPost" && defined(slug.current)] | order(_createdAt desc)[${start}...${end}]`;
            const posts = await serverClient.fetch<Post[]>(postsQuery);
            return { posts, totalPosts, currentPage: page };
        }
    } catch (error) {
        console.error('Failed to load news posts', error);
        return { posts: [] as Post[], totalPosts: 0, currentPage: 0 };
    }
};