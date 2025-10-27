<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import EventCard from '../../components/ui/EventCard.svelte';
	import PaginationControls from '../../components/ui/PaginationControls.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();

	let isMobile = $state(false);
	let loading = $state(false);

	const eventsPerPage = $derived(Math.max(data.eventsPerPage ?? 6, 1));
	const currentPage = $derived(data.currentPage ?? 0);
	const totalPages = $derived(Math.ceil(data.totalEvents / eventsPerPage));
	const hasMoreEvents = $derived(data.events.length < data.totalEvents);

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 1024;
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	});

	async function goToPage(newPage: number) {
		if (newPage >= 0 && newPage < totalPages && !loading) {
			loading = true;
			await goto(`?page=${newPage}`, { keepFocus: true });
			window.scrollTo({ top: 0, behavior: 'smooth' });
			loading = false;
		}
	}

	async function loadMoreMobile() {
		if (hasMoreEvents && !loading) {
			loading = true;
			const nextPage = Math.floor(data.events.length / eventsPerPage);
			await goto(`?page=${nextPage}&loadMore=true`, { keepFocus: true });
			loading = false;
		}
	}
</script>

<div class="container mx-auto px-6 lg:px-4 py-8 max-w-6xl">
	<h1 class="text-2xl font-semibold text-gray-800 mb-2">Events & Termine</h1>
	<p class="opacity-50 mb-10">
		Hier findest du alles, was dich demnächst bei uns erwartet.
	</p>

	{#if data.events.length === 0}
		<div class="text-center py-12">
			<p class="text-gray-500">Keine Events verfügbar.</p>
		</div>
	{:else}
		<div class="flex flex-col gap-6 mb-8">
			{#each data.events as event (event._id)}
				<EventCard {event} />
			{/each}
		</div>

		<PaginationControls
			{isMobile}
			{loading}
			currentPage={currentPage}
			totalPages={totalPages}
			hasMore={hasMoreEvents}
			onSelectPage={goToPage}
			onLoadMore={loadMoreMobile}
		/>
	{/if}
</div>
