<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import logo from '$lib/assets/logo.webp';

	export let title: string;
	export let trainers: any[];
	export let showBackgroundLogo: boolean = false;
    export let className: string = "mt-16";
</script>

<section class={className}>
	<h2 class="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
		{#each trainers as trainer}
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
	{#if showBackgroundLogo}
		<img src={logo} alt="Tan Gun Do Logo" class="absolute lg:-right-10 lg:left-2/5 top-[70vh] lg:top-[30vh] -z-1 lg:w-lg w-85 opacity-10" />
	{/if}
</section>
