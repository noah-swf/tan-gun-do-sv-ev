<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
    import logo from '$lib/assets/logo.webp';

	export let data: PageData;
	
	$: aboutUs = data.aboutUs;
</script>

<div class="container mx-auto px-6 lg:px-4 py-8 max-w-6xl">
	{#if aboutUs}
		<section class="mb-16">
			<h1 class="text-2xl font-semibold text-gray-800 mb-6">{aboutUs.title || 'Unsere Geschichte'}</h1>
			{#if aboutUs.description}
				<div class="prose max-w-none text-gray-600">
					<PortableText value={aboutUs.description} />
				</div>
			{/if}
		</section>

		{#if aboutUs.trainers && aboutUs.trainers.length > 0}
			<section>
				<h2 class="text-2xl font-semibold text-gray-800 mb-6">Unsere Trainer</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
					{#each aboutUs.trainers as trainer}
						<div class="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow w-full">
							<div class="aspect-[3/3] w-full bg-gray-100 relative">
								{#if trainer.image}
									<img 
										src={urlFor(trainer.image).width(600).height(750).url()} 
										alt={trainer.name}
										class="w-full h-full object-cover"
									/>
								{/if}
							</div>
							<div class="p-4">
								<h3 class="font-bold text-lg text-gray-900">{trainer.name}</h3>
								<p class="text-red text-sm font-medium mb-4">{trainer.roles}</p>
								
								<hr class="border-gray-300 mb-4" />
								
								<div class="space-y-2 text-sm">
									<div class="flex justify-between">
										<span class="text-gray-500">Taekwondo seit:</span>
										<span class="font-medium text-gray-900">{trainer.taekwondoSeit}</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-500">Graduierung:</span>
										<span class="font-medium text-gray-900">{trainer.graduierung}</span>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
				<img src={logo} alt="Tan Gun Do Logo" class="absolute -right-10 lg:left-2/5 top-[70vh] lg:top-[30vh] -z-1 lg:w-lg w-85 opacity-10" />
			</section>
		{/if}

		{#if aboutUs.coTrainers && aboutUs.coTrainers.length > 0}
			<section class="mt-16">
				<h2 class="text-2xl font-semibold text-gray-800 mb-6">Unsere Co-Trainer</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
					{#each aboutUs.coTrainers as trainer}
						<div class="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow w-full">
							<div class="aspect-[3/3] w-full bg-gray-100 relative">
								{#if trainer.image}
									<img 
										src={urlFor(trainer.image).width(600).height(750).url()} 
										alt={trainer.name}
										class="w-full h-full object-cover"
									/>
								{/if}
							</div>
							<div class="p-4">
								<h3 class="font-bold text-lg text-gray-900">{trainer.name}</h3>
								<p class="text-red text-sm font-medium mb-4">{trainer.roles}</p>
								
								<hr class="border-gray-300 mb-4" />
								
								<div class="space-y-2 text-sm">
									<div class="flex justify-between">
										<span class="text-gray-500">Taekwondo seit:</span>
										<span class="font-medium text-gray-900">{trainer.taekwondoSeit}</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-500">Graduierung:</span>
										<span class="font-medium text-gray-900">{trainer.graduierung}</span>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		{#if aboutUs.certifications && aboutUs.certifications.length > 0}
			<section class="mt-16">
				<h2 class="text-2xl font-semibold text-gray-800 mb-6">Offiziell anerkannt & zertifiziert</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
					{#each aboutUs.certifications as cert}
						<a 
							href={cert.link || '#'} 
							class="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center h-48 group {cert.link ? 'cursor-pointer' : 'cursor-default'}"
							target={cert.link ? "_blank" : ""}
							rel="noopener noreferrer"
						>
							{#if cert.logo}
								<div class="h-24 w-full flex items-center justify-center mb-4">
									<img 
										src={urlFor(cert.logo).height(200).url()} 
										alt={cert.name}
										class="max-h-full max-w-full object-contain lg:grayscale group-hover:grayscale-0 transition-all duration-300"
									/>
								</div>
							{/if}
							<span class="font-medium text-gray-700 group-hover:text-gray-900">{cert.name}</span>
						</a>
					{/each}
				</div>
			</section>
		{/if}
		
	{:else}
		<!-- Loading Skeleton -->
		<div class="animate-pulse">
			<div class="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
			<div class="space-y-3 mb-16">
				<div class="h-4 bg-gray-200 rounded w-full"></div>
				<div class="h-4 bg-gray-200 rounded w-full"></div>
				<div class="h-4 bg-gray-200 rounded w-3/4"></div>
			</div>
		</div>
	{/if}
</div>
