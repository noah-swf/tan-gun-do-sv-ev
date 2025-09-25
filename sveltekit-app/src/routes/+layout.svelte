<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import LiveMode from '../components/LiveMode.svelte';
	import "../app.css";

	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/footer.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex flex-col min-h-screen font-poppins">
<header class="header">
<Navbar/>
</header>

<main class="flex-grow">
	{@render children?.()}
</main>

<footer class="footer">
	<Footer/>
</footer>
</div>

<style lang="postcss">
</style>