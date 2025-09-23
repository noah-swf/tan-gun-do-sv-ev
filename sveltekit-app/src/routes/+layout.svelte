<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import LiveMode from '../components/LiveMode.svelte';
	import "../app.css";
	import logo from '$lib/assets/logo.webp';
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/footer.svelte';
</script>
<div class="font-poppins">
<header class="header">
<Navbar/>
</header>

<main>

</main>

<footer class="footer">
	<Footer/>
</footer>
</div>

<style lang="postcss">
	main{
		min-height: 100vh;
	}
</style>