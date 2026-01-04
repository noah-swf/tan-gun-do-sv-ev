<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	import TrainerSection from '../../components/sections/TrainerSection.svelte';
	import MapSection from '../../components/sections/MapSection.svelte';
	import Clock from '@lucide/svelte/icons/clock-9';
	import Shirt from '@lucide/svelte/icons/shirt';
	import GlassWater from '@lucide/svelte/icons/glass-water';
	import SanityLink from '../../components/ui/SanityLink.svelte';

	export let data: PageData;
	$: probetraining = data.probetraining;
</script>

{#if probetraining}
	<div class="container mx-auto px-6 lg:px-4 pt-8 max-w-6xl">
		<!-- Header -->
		<h1 class="text-2xl font-semibold text-gray-800 mb-6">{probetraining.title || 'Probetraining'}</h1>

		<!-- Hero Section -->
		<section class="flex flex-col md:flex-row gap-8 items-center">
			{#if probetraining.heroImage}
				<div class="w-full md:w-1/2 rounded-xl overflow-hidden">
					<img
						src={urlFor(probetraining.heroImage).width(800).url()}
						alt="Probetraining"
						class="w-full h-auto object-cover"
					/>
				</div>
			{/if}
			<div class="w-full md:w-1/2 prose max-w-none text-gray-600">
				{#if probetraining.heroText}
					<PortableText value={probetraining.heroText} 
                        components={{
                            marks: {
								link: SanityLink,
							},
                         }}
                    />
				{/if}
			</div>
		</section>
	</div>

	<!-- Info Icons Section -->
	<div class="bg-red/10 py-12 my-20 mb-16">
		<div class="container mx-auto px-6 lg:px-4 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="flex gap-4 items-center">
				<div class="text-red">
					<Clock class="w-[25px] h-[25px] md:w-[35px] md:h-[35px]" strokeWidth={1.5} />
				</div>
				<div>
					<h3 class="font-bold text-red">Wann?</h3>
					<p class="text-gray-700">Sei ca. 15 Minuten vor Beginn da.</p>
				</div>
			</div>
			<div class="flex gap-4 items-center">
				<div class="text-red">
					<Shirt class="w-[25px] h-[25px] md:w-[35px] md:h-[35px]" strokeWidth={1.5} />
				</div>
				<div>
					<h3 class="font-bold text-red">Was soll ich anziehen?</h3>
					<p class="text-gray-700">Bequeme Sportkleidung reicht.</p>
				</div>
			</div>
			<div class="flex gap-4 items-center">
				<div class="text-red">
					<GlassWater class="w-[25px] h-[25px] md:w-[35px] md:h-[35px]" strokeWidth={1.5} />
				</div>
				<div>
					<h3 class="font-bold text-red">Noch was?</h3>
					<p class="text-gray-700">Wasserflasche nicht vergessen!</p>
				</div>
			</div>
		</div>
	</div>

	<div class="container mx-auto px-6 lg:px-4 max-w-6xl">
		<!-- Trainer Section -->
		{#if probetraining.contactPersons}
			<TrainerSection
				title="Deine Ansprechpartner"
				trainers={probetraining.contactPersons}
				className="mb-16"
			/>
		{/if}
	</div>

    <!-- Map Section -->
    <MapSection />

{:else}
	<!-- Loading Skeleton -->
	<div class="container mx-auto px-6 lg:px-4 py-8 max-w-6xl animate-pulse">
		<div class="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
		<div class="flex flex-col md:flex-row gap-8 mb-16">
			<div class="w-full md:w-1/2 h-64 bg-gray-200 rounded"></div>
			<div class="w-full md:w-1/2 space-y-4">
				<div class="h-4 bg-gray-200 rounded w-full"></div>
				<div class="h-4 bg-gray-200 rounded w-full"></div>
				<div class="h-4 bg-gray-200 rounded w-3/4"></div>
			</div>
		</div>
	</div>
{/if}
