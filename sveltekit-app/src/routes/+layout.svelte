<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import LiveMode from '../components/LiveMode.svelte';
	import { page } from '$app/stores';
	import "../app.css";

	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';
	import SEO from '../components/SEO.svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<SEO />

{#if $isPreviewing}
	<a href={`/preview/disable?redirect=${$page.url.pathname}`} class="preview-toggle">
		<span>Preview Enabled</span>
		<span>Disable Preview</span>
	</a>
{/if}

<div class="min-h-dvh flex flex-col font-poppins">

  <header class="header fixed top-0 z-50 w-full">
		<Navbar/>
	</header>

	<div class="h-24"></div>

	<main class="flex-grow">
		{@render children?.()}
	</main>

	<footer class="footer mt-auto">
		<Footer/>
	</footer>

</div>

{#if $isPreviewing}
	<VisualEditing />
	<LiveMode />
{/if}
