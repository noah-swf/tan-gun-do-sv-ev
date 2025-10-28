<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import SanityImage from '../../../components/ui/SanityImage.svelte';
	import CustomHeading from '../../../components/ui/SanityHeading.svelte';
	import SanityBullet from '../../../components/ui/SanityBullet.svelte';
	import SanityLink from '../../../components/ui/SanityLink.svelte';
	import SanityQuote from '../../../components/ui/SanityQuote.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const q = useQuery(data);

	let { data: post } = $derived($q);
</script>



<section class="min-w-screen inset-x-0 px-6 md:p-16 lg:p-10">
	<div class="max-w-4xl mx-auto ">
		<button onclick={() => history.back()} class="inline-flex items-center opacity-50 text-sm md:py-2 mb-1 hover:opacity-100 hover:cursor-pointer" >
			<ChevronLeft class="inline h-4 w-4 mr-1" />
			Zurück
		</button>
	{#if post.mainImage}
		<div class="aspect-auto w-full md:my-4 my-2">
			<img
				class="h-full w-full rounded-md object-cover"
				src={urlFor(post.mainImage).url()}
				alt="Cover image for {post.title}"
			/>
		</div>
	{:else}
		<div class=""></div>
	{/if}
		<div class="">
			<p class="opacity-50 text-sm my-5 ">
				{formatDate(post._createdAt)}
			</p>
			<h1 class="text-3xl font-semibold md:mt-5">{post.title}</h1>
			
			{#if post.body}
				<div class="mt-5 prose prose-sm md:prose lg:prose-lg max-w-none">
					<PortableText
						value={post.body}
						onMissingComponent={false}
						components={{
							block: {
								h1: CustomHeading,
								h2: CustomHeading,
								h3: CustomHeading,
								h4: CustomHeading,
								h5: CustomHeading,
								blockquote: SanityQuote,
							},
							marks: {
								link: SanityLink,
							},
							list: {
								bullet: SanityBullet,
							},
							types: {
								image: SanityImage,
							}
							}}
						/>
				</div>
			{/if}
		</div>
	</div>
	
</section>