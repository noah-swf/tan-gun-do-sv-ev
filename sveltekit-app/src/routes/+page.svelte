<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';

	import type { PageData } from './$types';
	import NewsSection from '../components/sections/NewsSection.svelte';
	import HeroSection from '../components/sections/HeroSection.svelte';
	import type { HeroContent, HomePagePayload, Post } from '$lib/sanity/queries';
	import Map from '../components/Map.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const q = useQuery<HomePagePayload>(data);

	let { data: homeData } = $derived($q);

	let posts: Post[] = $derived(homeData?.posts ?? []);
	let hero: HeroContent | null = $derived(homeData?.hero ?? null);

</script>

<section>
		<HeroSection {hero} />
		<NewsSection {posts} />
    <Map />
</section>