<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
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

{#if $isPreviewing}
	<VisualEditing />
	<LiveMode />
{/if}

<style>

	.container {
		margin: 0 auto;
	}

	main {
		margin-top: 45px;
	}

	.header {
		display: flex;
		padding: 0 var(--space-1);
		border-bottom: 1px solid #ced2d9;

		z-index: 10;
		background: var(--white);
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
	}

	.header .header__title {
		font-weight: 800;
		font-size: var(--font-size-3);
		line-height: var(--line-height-1);
		padding-left: var(--space-2);
		margin: var(--space-3) 0;
		text-decoration: none;
		color: var(--black);
	}

	.footer {
		display: flex;
		justify-content: flex-end;
		padding: 0 var(--space-3);
	}
  
</style>