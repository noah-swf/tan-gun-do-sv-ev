export async function GET({ url }) {
	const robots = `
User-agent: *
Allow: /

Sitemap: ${url.origin}/sitemap.xml
`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
}
