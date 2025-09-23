<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import LiveMode from '../components/LiveMode.svelte';
	import "../app.css";
	import logo from '$lib/assets/logo.webp';
	const linksTop = [
		{ href: '/', name: 'Home' },
		{ href: '/trainingszeiten', name: 'Trainingszeiten' },
		{ href: '/news', name: 'News' },
		{ href: '/termine', name: 'Termine' },
		{ href: '/ueber-uns', name: 'Über uns' },
		{ href: '/kontakt', name: 'Kontakt' }
	]
	const linksBottom = [
		{ href: '/datenschutz', name: 'Datenschutz' },
		{ href: '/impressum', name: 'Impressum' },
		{ href: '/kontakt', name: 'Kontakt' }
	]
	let showMenu = false;

	function toggleMenu() {
		showMenu = !showMenu;
	}
</script>


<nav class="p-4">
	<div class="container mx-auto flex justify-between items-center">
		<img src={logo} alt="Logo Tan Gun Do" width="50" height="50"/>
		<h1>Tan Gun Do Selbstverteidigung e.V</h1>
	
		<div class="hidden md:flex space-x-6">
			{#each linksTop as linkT}
				<a 
				href={linkT.href} 
				class:hover:text-gray-700={$page.url.pathname !== linkT.href}
				class:hover:text-red-700={$page.url.pathname === linkT.href}
				class:text-red-500={$page.url.pathname === linkT.href}
				>
					{linkT.name}
				</a>
			{/each}
		</div>
		<button class="md:hidden focus:outline-none" on:click={toggleMenu}>
			&#9776;
		</button>
	</div>
	{#if showMenu}
		<div class="md:hidden mt-2 px-4 py-2 space-y-2">
			{#each linksTop as linkT}
				<a 
				href={linkT.href} 
				class="block py-2"
				class:hover:text-gray-700={$page.url.pathname !== linkT.href}
				class:hover:text-red-700={$page.url.pathname === linkT.href}
				class:text-red-500={$page.url.pathname === linkT.href}
				on:click={() => showMenu = false}
				>
					{linkT.name}
				</a>
			{/each}
		</div>
	{/if}
</nav>

<main>
</main>

<hr class="border-t-1.5 border-gray-400 w-4/5 mx-auto my-5"/>
<footer class="flex w-4/5 mx-auto my-5">
	<nav class="p-4 ">
		<div class="container mx-auto flex justify-center items-center">
			<div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
				<img src={logo} alt="Logo Tan Gun Do" width="50" height="50"/>
				<p>
					<span class="block md:hidden">Tan Gun Do e.V.</span>
					<span class="hidden md:block">&copy; 2025 Tan Gun Do SV e.V.</span>
				</p>
					{#each linksBottom as linkB}
						<a
						href={linkB.href}
						class="font-thin text-gray-600 hover:underline"
						>
							{linkB.name}
						</a>
					{/each}
			</div>

		</div>
	</nav>
</footer>


<style lang="postcss">
	main{
		display:flex;
		flex-direction: column;
		min-height: 100vh;
	}
	footer{
		flex: 0 0 absolute;
		text-align: center;
		padding: 4px;
		margin-top: auto;
	}
</style>
