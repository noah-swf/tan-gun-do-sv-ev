<script>
    import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import LiveMode from '../components/LiveMode.svelte';
	import "../app.css";
	import logo from '$lib/assets/logo.webp';

    const links = [
		{ href: '/', name: 'Home' },
		{ href: '/trainingszeiten', name: 'Trainingszeiten' },
		{ href: '/news', name: 'News' },
		{ href: '/termine', name: 'Termine' },
		{ href: '/ueber-uns', name: 'Über uns' },
		{ href: '/kontakt', name: 'Kontakt' }
	]

    let showMenu = false;
	let openDesktop = false;
	let openMobile = false;

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function toggleDropdownDesktop(){
		openDesktop = !openDesktop;
	}
	function toggleDropdownMobile(){
		openMobile = !openMobile;
	}
</script>

<nav class="px-8 py-6">
  	<div class="flex justify-between items-center w-full">
    	<div class="flex items-center space-x-3">
    	  	<img src={logo} alt="Logo Tan Gun Do" width="50" height="50" />
    	  	<h1 class="hidden md:block">Tan Gun Do Selbstverteidigung e.V</h1>
    	</div>


    	<div class="hidden md:flex space-x-6 items-center">
      	{#each links as linkT}
        	{#if linkT.href !== '/kontakt'}
          	<a
            	href={linkT.href}
            	class="px-3 py-1 rounded-lg transition hover:bg-gray-50 hover:rounded-xl hover:shadow-lg hover:shadow-gray-300/40 hover:text-black active:bg-gray-200"
            	class:hover:text-red-700={$page.url.pathname === linkT.href}
            	class:text-red-500={$page.url.pathname === linkT.href}
          	>
            {linkT.name}
          	</a>
        	{:else}
          	<div class="relative">
            	<button
              	class="flex items-center px-3 py-1 rounded-lg transition hover:bg-gray-50 hover:rounded-xl hover:shadow-lg hover:shadow-gray-300/40 hover:text-black active:bg-gray-200 focus:outline-none"
				class:hover:text-gray-700={$page.url.pathname !== linkT.href}
              	on:click={toggleDropdownDesktop}
            	>
              		{linkT.name}
              		<svg
                		class="w-4 h-4 ml-1 transform transition-transform duration-200"
                		class:rotate-180={openDesktop}
                		fill="none"
                		stroke="currentColor"
                		viewBox="0 0 24 24"
              		>
                		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              		</svg>
            	</button>

            {#if openDesktop}
              	<div class="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10">
                <a href="/kontakt" class="block px-4 py-2 hover:bg-gray-100" on:click={() => (openDesktop = false)}>
                  	Kontaktformular
                </a>
                <a href="/probetraining" class="block px-4 py-2 hover:bg-gray-100" on:click={() => (openDesktop = false)}>
                  	Probetraining vereinbaren
                </a>
              	</div>
            {/if}
        	</div>
    		{/if}
      	{/each}
    	</div>

    	<button
      		class="md:hidden px- flex flex-col justify-between w-6 h-6 focus:outline-none"
      		on:click={toggleMenu}
      		aria-label="Menü öffnen/schließen"
    	>
      		<span class="block h-0.5 w-8 bg-black transform origin-left transition duration-300 ease-in-out" 
			class:rotate-45={showMenu}></span>
      		<span class="block h-0.5 w-8 bg-black transition duration-300 ease-in-out" 
			class:opacity-0={showMenu}></span>
      		<span class="block h-0.5 w-8 bg-black transform origin-left transition duration-300 ease-in-out" 
			class:-rotate-45={showMenu}></span>
    	</button>
	</div>

	{#if showMenu}
    <div class="md:hidden mt-10 space-y-4">
      	{#each links as linkT}
        	{#if linkT.href !== '/kontakt'}
          	<a
            	href={linkT.href}
            	class="block text-xl font-medium px-1 py-1 ml-1 rounded-lg transition text-gray-400 hover:bg-gray-100 active:bg-gray-200"
            	class:hover:text-gray-700={$page.url.pathname !== linkT.href}
            	class:hover:text-red-700={$page.url.pathname === linkT.href}
            	class:text-red-500={$page.url.pathname === linkT.href}
            	on:click={() => (showMenu = false)}
          	>
            	{linkT.name}
          	</a>
        	{:else}
          	<div>
            	<button
              		class="flex items-center w-full px-1 py-1 ml-1 text-xl font-medium text-gray-700 rounded-lg"
              		on:click={toggleDropdownMobile}
           	 	>
              		{linkT.name}
              		<svg
                		class="w-4 h-4 ml-1 transform transition-transform duration-200"
                		class:rotate-180={openMobile}
                		fill="none"
                		stroke="currentColor"
                		viewBox="0 0 24 24"
              		>
                		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              		</svg>
            	</button>

            {#if openMobile}
              	<div class="ml-6 mt-4 text-lg font-medium space-y-1">
                	<a href="/kontakt" class="block py-1 text-gray-500 hover:underline" on:click={() => { openMobile = false; showMenu = false }}>
                  		Kontaktformular
                	</a>
                	<a href="/probetraining" class="block py-1 text-gray-500 hover:underline" on:click={() => { openMobile = false; showMenu = false }}>
                  		Probetraining vereinbaren
                	</a>
              	</div>
            {/if}
          	</div>
        	{/if}
      	{/each}
    </div>
  	{/if}
</nav>
