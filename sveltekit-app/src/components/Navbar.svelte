<script>
    import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import LiveMode from '../components/LiveMode.svelte';
	import "../app.css";
	import logo from '$lib/assets/logo.webp';
	import { afterNavigate } from '$app/navigation';

	let scrollY = 0;

    let links = [
		{ href: '/', name: 'Home' },
		{ href: '/trainingszeiten', name: 'Trainingszeiten' },
		{ href: '/news', name: 'News' },
		{ href: '/termine', name: 'Termine' },
		{ href: '/ueber-uns', name: 'Über uns' },
		{ href: '/probetraining', name: 'Probetraining' },
		{ href: '/kontakt', name: 'Kontakt' }
	]

    let showMenu = false;

	function toggleMenu() {
		showMenu = !showMenu;

		// Verhindert Scrollen, wenn das mobile Menü geöffnet ist
		document.documentElement.classList.toggle('overflow-hidden', showMenu);
	}

	afterNavigate(() => {
		// Erlaubt Scrollen wieder, wenn zu einer neuen Seite navigiert wird
		document.documentElement.classList.remove('overflow-hidden');
	});

</script>

<svelte:window bind:scrollY />

<nav 
	class="px-6 lg:px-8 bg-white transition-all duration-300"
	class:py-6={scrollY === 0}
	class:py-4={scrollY > 0}
	class:shadow-md={scrollY > 0}
>
  	<div class="flex justify-between items-center w-full">
    	<a class="flex items-center space-x-3" href="/">
    	  	<img src={logo} alt="Logo Tan Gun Do" width="50" height="50" />
    	  	<h1 class="hidden font-medium lg:block">Tan Gun Do Selbstverteidigung e.V</h1>
		</a>


    	<div class="hidden lg:flex space-x-6 items-center">
      	{#each links as linkT}
          	<a
            	href={linkT.href}
            	class="px-2 py-1 rounded-lg transition hover:text-red active:text-red"
            	class:hover:text-red-800={$page.url.pathname === linkT.href}
            	class:text-red={$page.url.pathname === linkT.href}
          	>
            {linkT.name}
          	</a>
      	{/each}
    	</div>

    	<button
      		class="lg:hidden flex flex-col justify-between w-6 h-4 focus:outline-none"
      		on:click={toggleMenu}
      		aria-label="Menü öffnen/schließen"
    	>
      		<span class="block h-0.5 w-5 bg-black transform origin-right transition duration-300 ease-in-out" 
			class:-rotate-45={showMenu}></span>
      		<span class="block h-0.5 w-5 bg-black transition duration-300 ease-in-out" 
			class:opacity-0={showMenu}></span>
      		<span class="block h-0.5 w-5 bg-black transform origin-right transition duration-300 ease-in-out" 
			class:rotate-45={showMenu}></span>
    	</button>
	</div>

	{#if showMenu}
    <div class="lg:hidden mt-20 space-y-4 h-screen bg-white">
      	{#each links as linkT}
          	<a
            	href={linkT.href}
            	class="block text-xl font-medium p-1 ml-1 transition text-gray-400 hover:bg-gray-100 active:bg-gray-200"
            	class:hover:text-gray-700={$page.url.pathname !== linkT.href}
            	class:hover:text-red-700={$page.url.pathname === linkT.href}
            	class:text-red-500={$page.url.pathname === linkT.href}
            	on:click={() => (showMenu = false)}
          	>
            	{linkT.name}
          	</a>
      	{/each}
    </div>
  	{/if}
</nav>
