<script>
    import logo from '$lib/assets/logo.webp';
    const links = [
        { href: '/datenschutz', name: 'Datenschutz' },
        { href: '/impressum', name: 'Impressum' },
        { href: '/kontakt', name: 'Kontakt' }
    ]
</script>

<hr class="border-t-1.5 border-gray-400 w-19/20 mx-auto my-2"/>
<footer class="w-28/30 mx-auto my-4">
  	<nav class="py-4 w-full">
    	<div class="flex flex-col md:flex-row md:items-center md:justify-between">
      
      		<div class="flex items-center space-x-4">
        		<img src={logo} alt="Logo Tan Gun Do" class="h-12 w-12" />
        		<p class="text-sm md:text-base">
          			<span class="block md:hidden">&copy; 2025 Tan Gun Do e.V.</span>
          			<span class="hidden md:block">&copy; 2025 Tan Gun Do SV e.V.</span>
        		</p>
      		</div>

      		<div class="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 mt-4 md:mt-0 md:items-center">
        	{#each links as linkB}
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