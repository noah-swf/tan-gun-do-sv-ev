<script lang="ts">
	import { page } from '$app/stores';

	interface Props {
		title?: string;
		description?: string;
		image?: string;
		type?: 'website' | 'article';
		author?: string;
		publishedAt?: string;
		modifiedAt?: string;
	}

	let {
		title = 'Tan-Gun-Do SV. e.V. - Taekwondo Kampfsportverein',
		description = 'Willkommen beim Tan-Gun-Do SV. e.V. Wir bieten Taekwondo Training für alle Altersgruppen.',
		image,
		type = 'website',
		author,
		publishedAt,
		modifiedAt
	}: Props = $props();

	const siteUrl = $page.url.origin;
	const canonicalUrl = $page.url.href;
	const socialImage = image || `${siteUrl}/favicon/android-chrome-512x512.png`; // Fallback image
	const titleTemplate = '%s | Tan-Gun-Do';
	const fullTitle = title === 'Tan-Gun-Do SV. e.V. - Taekwondo Kampfsportverein' ? title : titleTemplate.replace('%s', title);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={socialImage} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={canonicalUrl} />
	<meta property="twitter:title" content={fullTitle} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={socialImage} />

	{#if type === 'article'}
		{#if author}
			<meta property="article:author" content={author} />
		{/if}
		{#if publishedAt}
			<meta property="article:published_time" content={publishedAt} />
		{/if}
		{#if modifiedAt}
			<meta property="article:modified_time" content={modifiedAt} />
		{/if}
	{/if}
</svelte:head>
