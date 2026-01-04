<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDate, toPlainText, truncateText } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import X from '@lucide/svelte/icons/x';
	import SanityImage from '../../../components/ui/SanityImage.svelte';
	import CustomHeading from '../../../components/ui/SanityHeading.svelte';
	import SanityBullet from '../../../components/ui/SanityBullet.svelte';
	import SanityLink from '../../../components/ui/SanityLink.svelte';
	import SanityQuote from '../../../components/ui/SanityQuote.svelte';
	import SEO from '../../../components/SEO.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const q = useQuery(data);

	let { data: post } = $derived($q);

	let lightboxOpen = $state(false);
	let currentIndex = $state(0);

	function openLightbox(index: number) {
		currentIndex = index;
		lightboxOpen = true;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeLightbox() {
		lightboxOpen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function nextImage(e?: Event) {
		e?.stopPropagation();
		if (post.gallery && currentIndex < post.gallery.length - 1) {
			currentIndex++;
		} else {
			currentIndex = 0;
		}
	}

	function prevImage(e?: Event) {
		e?.stopPropagation();
		if (currentIndex > 0) {
			currentIndex--;
		} else if (post.gallery) {
			currentIndex = post.gallery.length - 1;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!lightboxOpen) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowRight') nextImage();
		if (e.key === 'ArrowLeft') prevImage();
	}

	let touchStartX = 0;
	let touchEndX = 0;

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.changedTouches[0].screenX;
	}

	function handleTouchEnd(e: TouchEvent) {
		touchEndX = e.changedTouches[0].screenX;
		handleSwipe();
	}

	function handleSwipe() {
		const swipeThreshold = 50;
		if (touchEndX < touchStartX - swipeThreshold) {
			nextImage();
		}
		if (touchEndX > touchStartX + swipeThreshold) {
			prevImage();
		}
	}
</script>

<SEO
	title={post.title}
	description={truncateText(toPlainText(post.body), 160)}
	image={post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined}
	type="article"
	publishedAt={post._createdAt}
	modifiedAt={post._createdAt}
/>

<svelte:window onkeydown={handleKeydown} />

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
			<h1 class="text-3xl font-semibold md:mt-5 mt-7">{post.title}</h1>
			
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

			{#if post.gallery && post.gallery.length > 0}
				<div class="mt-12 mb-8">
					<h2 class="text-2xl font-semibold mb-6">Galerie</h2>
					<div class="gallery-container flex flex-wrap gap-2">
						{#each post.gallery as image, i}
							{@const aspectRatio = image.asset?.metadata?.dimensions?.aspectRatio || 1}
							
							<button 
								class="gallery-item relative rounded-lg overflow-hidden bg-gray-100 cursor-pointer block p-0 border-0"
								style="--ar: {aspectRatio}"
								onclick={() => openLightbox(i)}
								aria-label="View image {i + 1} in full screen"
							>
								<img 
									src={urlFor(image.asset).url()} 
									alt={post.title + ' gallery image ' + (i + 1)} 
									class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
									loading="lazy"
								/>
							</button>
						{/each}
						<div class="flex-grow-[999] basis-0"></div>
					</div>
				</div>
			{/if}
		</div>
		<p class="opacity-50 text-sm my-5 ">
		Veröffentlicht am {formatDate(post._createdAt)}
	</p> 
	</div>
	
</section>


<!-- Full Screen Image View -->
{#if lightboxOpen && post.gallery}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div 
		class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" 
		onclick={closeLightbox}
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
	>
		<button class="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full z-50 cursor-pointer" onclick={closeLightbox}>
			<X class="w-8 h-8" />
		</button>
		
		<button class="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full z-50 cursor-pointer" onclick={prevImage}>
			<ChevronLeft class="w-8 h-8" />
		</button>

		<div class="relative max-w-[90vw] max-h-[90vh]" onclick={(e) => e.stopPropagation()}>
			<img 
				src={urlFor(post.gallery[currentIndex].asset).url()} 
				alt={post.title + ' gallery image ' + (currentIndex + 1)}
				class="max-w-full max-h-[90vh] object-contain"
			/>
			<div class="absolute -bottom-8 left-0 right-0 text-center text-white/70 text-sm">
				{currentIndex + 1} / {post.gallery.length}
			</div>
		</div>

		<button class="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full z-50 cursor-pointer" onclick={nextImage}>
			<ChevronRight class="w-8 h-8" />
		</button>
	</div>
{/if}

<style>
    .gallery-container {
        --row-height: 220px;
    }
    @media (min-width: 768px) {
        .gallery-container {
            --row-height: 240px;
        }
    }
    .gallery-item {
        height: var(--row-height);
        flex-grow: var(--ar);
        flex-basis: calc(var(--row-height) * var(--ar));
        min-width: calc(var(--row-height) * var(--ar) * 0.5);
        max-width: 100%;
    }
</style>