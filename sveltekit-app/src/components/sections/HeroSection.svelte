<script lang="ts">
    import { onDestroy } from 'svelte';
    import ButtonFilled from '../ui/ButtonFilled.svelte';
    import ButtonOutlined from '../ui/ButtonOutlined.svelte';
    import ChevronRight from '@lucide/svelte/icons/chevron-right';
    import ChevronLeft from '@lucide/svelte/icons/chevron-left';
    import { urlFor } from '$lib/sanity/image';
    import type { HeroContent, HeroSlide } from '$lib/sanity/queries';

    interface Props {
        hero: HeroContent | null;
    }

    let { hero }: Props = $props();

    const age = new Date().getFullYear() - 1997;
    const AGE_PLACEHOLDER = '{age}';
    const FALLBACK_TITLE = '{age} Jahre Tan Gun Do -\nEssen Schonnebeck';
    const FALLBACK_SUBTITLE =
        'Wir sind ein Taekwondo-Verein mit viel Spaß an Bewegung, der respektvollen Umgang und Gemeinschaft für alle Altersgruppen bietet.';

    const applyAgePlaceholder = (input: string) =>
        input.includes(AGE_PLACEHOLDER) ? input.replaceAll(AGE_PLACEHOLDER, age.toString()) : input;

    let filteredSlides: HeroSlide[] = $derived(
        (hero?.slides ?? []).filter((slide): slide is HeroSlide => Boolean(slide?.image?.asset?._ref))
    );

    const computedTitle = $derived(applyAgePlaceholder(hero?.title ?? FALLBACK_TITLE));
    const computedSubtitle = $derived(applyAgePlaceholder(hero?.subtitle ?? FALLBACK_SUBTITLE));
    const titleLines = $derived(computedTitle.split('\n'));

    let currentIndex = $state(0);
    const DEFAULT_DURATION_MS = 6000;
    let timer: ReturnType<typeof setTimeout> | null = null;

    function clearAutoplay() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    function scheduleAutoplay() {
        clearAutoplay();
        if (filteredSlides.length <= 1) return;
        const active = filteredSlides[currentIndex];
        const duration = active?.durationMs && active.durationMs > 0 ? active.durationMs : DEFAULT_DURATION_MS;
        timer = setTimeout(() => {
            currentIndex = (currentIndex + 1) % filteredSlides.length;
            scheduleAutoplay();
        }, duration);
    }

    function goToNext() {
        if (!filteredSlides.length) return;
        currentIndex = (currentIndex + 1) % filteredSlides.length;
        scheduleAutoplay();
    }

    function goToPrevious() {
        if (!filteredSlides.length) return;
        currentIndex = (currentIndex - 1 + filteredSlides.length) % filteredSlides.length;
        scheduleAutoplay();
    }

    const getSlideImageUrl = (slide: HeroSlide, isActive: boolean) => {
        if (!slide.image) return '';
        const builder = urlFor(slide.image).auto('format').quality(isActive ? 85 : 70);
        return builder.width(1600).height(900).url();
    };

    $effect(() => {
        const length = filteredSlides.length;
        currentIndex = 0;
        scheduleAutoplay();
        return clearAutoplay;
    });

    onDestroy(() => clearAutoplay());
</script>

<div class="flex flex-row min-h-screen min-w-screen px-4">
    <div class="w-1/2 h-[87.5vh] flex flex-col justify-center items-start space-y-6">
        <div class="mx-auto w-3/5 space-y-5">
            <h1 class="text-3xl font-semibold">
                {#each titleLines as line, index}
                    <span>{line}</span>
                    {#if index < titleLines.length - 1}
                        <br />
                    {/if}
                {/each}
            </h1>
            <p class="opacity-50">{computedSubtitle}</p>
            <div class="flex flex-col md:flex-row space-x-3">
                <ButtonFilled href="/probetraining" text="Jetzt mitmachen" />
                <ButtonOutlined href="/trainingszeiten" text="Trainingszeiten ansehen" />
            </div>
        </div>
    </div>
    <div class="w-1/2 h-[87.5vh] flex flex-col justify-center items-start space-y-6">
        <div class="relative w-full h-10/12 overflow-hidden rounded-lg shadow-lg">
            {#if filteredSlides.length > 0}
                {#each filteredSlides as slide, index (slide._key ?? index)}
                    <figure
                        class={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                    >
                        {#if slide.link}
                            <a
                                href={slide.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="block h-full w-full"
                                tabindex={index === currentIndex ? 0 : -1}
                            >
                                <img
                                    class="h-full w-full object-cover"
                                    src={getSlideImageUrl(slide, index === currentIndex)}
                                    alt={slide.alt || 'Hero Bild'}
                                    loading={index === currentIndex ? 'eager' : 'lazy'}
                                />
                            </a>
                        {:else}
                            <img
                                class="h-full w-full object-cover"
                                src={getSlideImageUrl(slide, index === currentIndex)}
                                alt={slide.alt || 'Hero Bild'}
                                loading={index === currentIndex ? 'eager' : 'lazy'}
                            />
                        {/if}
                        {#if slide.caption}
                            <figcaption class="absolute bottom-0 left-0 right-0 bg-black/55 px-4 py-3 text-sm text-white">
                                {slide.caption}
                            </figcaption>
                        {/if}
                    </figure>
                {/each}
            {:else}
                <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 text-center text-sm text-black/60 px-6">
                    <p>Füge im Sanity Studio Bilder zur Hero-Sektion hinzu, um hier eine Slideshow anzuzeigen.</p>
                </div>
            {/if}
        </div>
        <div class="flex flex-row justify-end space-x-4">
            <button
                class="rounded border border-gray-300 bg-white/70 hover:bg-white hover:cursor-pointer p-2"
                aria-label="Nach links"
                title="Nach links"
                onclick={goToPrevious}
            >
                <ChevronLeft color="var(--color-red)" class="w-5 h-5 text-gray-600" />
            </button>
            <button
                class="rounded border border-gray-300 bg-white/70 hover:bg-white hover:cursor-pointer p-2"
                aria-label="Nach rechts"
                title="Nach rechts"
                onclick={goToNext}
            >
                <ChevronRight color="var(--color-red)" class="w-5 h-5 text-gray-600" />
            </button>
        </div>
    </div>
</div>