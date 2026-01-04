import { serverClient } from '$lib/server/sanity/client';
import groq from 'groq';

export async function GET({ url }) {
	const posts = await serverClient.fetch(groq`*[_type == "newsPost" && defined(slug.current)] {
		"slug": slug.current,
		_updatedAt
	}`);

	const pages = [
		'',
		'/ueber-uns',
		'/trainingszeiten',
		'/probetraining',
		'/termine',
		'/news',
		'/kontakt',
		'/impressum',
		'/datenschutz'
	];

	const siteUrl = url.origin;

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${pages
		.map(
			(page) => `
	<url>
		<loc>${siteUrl}${page}</loc>
		<changefreq>monthly</changefreq>
		<priority>${page === '' ? '1.0' : '0.8'}</priority>
	</url>`
		)
		.join('')}
	${posts
		.map(
			(post: any) => `
	<url>
		<loc>${siteUrl}/post/${post.slug}</loc>
		<lastmod>${post._updatedAt}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.7</priority>
	</url>`
		)
		.join('')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
