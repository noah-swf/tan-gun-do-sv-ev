<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';

	import type { PageData } from './$types';
	import NewsSection from '../components/sections/NewsSection.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const q = useQuery(data);

	let { data: posts } = $derived($q);

</script>

<section>
	<NewsSection {posts} />
</section>
