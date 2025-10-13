<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';

	import NewsSection from '../components/sections/NewsSection.svelte';
	import HeroSection from '../components/sections/HeroSection.svelte';
	import EventSection from '../components/sections/EventSection.svelte';
	import MapSection from '../components/sections/MapSection.svelte';
	
	import type { PageData } from './$types';
	import type { HeroContent, HomePagePayload, Post } from '$lib/sanity/queries';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const q = useQuery<HomePagePayload>(data);

	let { data: homeData } = $derived($q);

	let posts: Post[] = $derived(homeData?.posts ?? []);
	let hero: HeroContent | null = $derived(homeData?.hero ?? null);
	let events = $derived(homeData?.events ?? []);

</script>

<section>
	<HeroSection {hero} />
	<NewsSection {posts} />
	<EventSection {events} />
    <MapSection />
</section>