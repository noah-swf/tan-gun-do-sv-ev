<script>
    import logo from '$lib/assets/logo.webp';
    const links = [
        { href: '/datenschutz', name: 'Datenschutz' },
        { href: '/impressum', name: 'Impressum' },
        { href: '/kontakt', name: 'Kontakt' }
    ]

	let year = $state(new Date().getFullYear().toString());
</script>
<div class="p-10">

<hr class="border-t-1.5 border-gray-300 mb-10 md:mb-0"/>
<footer class="w-full mx-auto my-4">
	<nav class="py-4 w-full">
		<div class="flex flex-col md:flex-row md:items-center md:justify-between">
			<div class="flex flex-col md:flex-row md:items-center space-x-4 space-y-4 md:space-y-0">
				<img src={logo} alt="Logo Tan Gun Do" class="h-12 w-12" />
				<h1 class="font-semibold">&copy; {year} Tan Gun Do SV e.V.</h1>
			</div>

			<div class="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 mt-6 md:mt-0 md:items-center">
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
</div>
