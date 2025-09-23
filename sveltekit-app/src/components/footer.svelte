<script>
    import logo from '$lib/assets/logo.webp';
    const links = [
        { href: '/datenschutz', name: 'Datenschutz' },
        { href: '/impressum', name: 'Impressum' },
        { href: '/kontakt', name: 'Kontakt' }
    ]
</script>

<hr class="border-t-1.5 border-gray-400 w-4/5 mx-auto my-5"/>
<footer class="flex w-4/5 mx-auto my-5">
    <nav class="p-4 w-full">
    	<div class="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
    	  <div class="flex items-center space-x-4">
    	    <img src={logo} alt="Logo Tan Gun Do" class="h-12 w-12" />
    	    <p>
    	      <span class="block md:hidden">&copy; 2025 Tan Gun Do e.V.</span>
    	      <span class="hidden md:block">&copy; 2025 Tan Gun Do SV e.V.</span>
    	    </p>
    	  </div>
    	  <div class="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 md:ml-auto">
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