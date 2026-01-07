<script lang="ts">
    import { onDestroy, tick } from 'svelte';
    import ButtonFilled from '../ui/ButtonFilled.svelte';
    import ButtonOutlined from '../ui/ButtonOutlined.svelte';
    import { urlFor } from '$lib/sanity/image';
    import type { HeroContent, HeroSlide } from '$lib/sanity/queries';
    import logo from '$lib/assets/logo.webp';
	import ButtonLeft from '../ui/ButtonLeft.svelte';
	import ButtonRight from '../ui/ButtonRight.svelte';

    interface Props {
        hero: HeroContent | null;
    }

    let { hero }: Props = $props();

    const age = new Date().getFullYear() - 1997;
    const AGE_PLACEHOLDER = '{age}';
    const FALLBACK_TITLE = '{age} Jahre Tan Gun Do -\nEssen Schonnebeck';
    const FALLBACK_SUBTITLE = 'Wir sind ein Taekwondo-Verein mit viel Spaß an Bewegung, der respektvollen Umgang und Gemeinschaft für alle Altersgruppen bietet.';

    const applyAgePlaceholder = (input: string) =>
        input.includes(AGE_PLACEHOLDER) ? input.replaceAll(AGE_PLACEHOLDER, age.toString()) : input;

    let filteredSlides: HeroSlide[] = $derived(
        (hero?.slides ?? []).filter((slide): slide is HeroSlide => Boolean(slide?.image?.asset?._ref))
    );

    const computedTitle = $derived(applyAgePlaceholder(hero?.title ?? FALLBACK_TITLE));
    const computedSubtitle = $derived(applyAgePlaceholder(hero?.subtitle ?? FALLBACK_SUBTITLE));
    const titleLines = $derived(computedTitle.split('\n'));

    const TRANSITION_DURATION_MS = 300;
    let positionIndex = $state(0);
    let enableTransition = $state(false);
    let loading = $state(true);
    const DEFAULT_DURATION_MS = 5000;
    let timer: ReturnType<typeof setTimeout> | null = null;

    $effect(() => {
        if (filteredSlides.length === 0) {
            loading = false;
        }
    });

    function clearAutoplay() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    function scheduleAutoplay() {
        if (filteredSlides.length <= 1) return;
        const active = filteredSlides[getActiveIndex()];
        const duration = active?.durationMs && active.durationMs > 0 ? active.durationMs : DEFAULT_DURATION_MS;
        timer = setTimeout(() => {
            if (!filteredSlides.length) return;
            goToNext();
        }, duration);
    }

    function resetAutoplay() {
        clearAutoplay();
        scheduleAutoplay();
    }

    function goToNext() {
        if (filteredSlides.length <= 1) return;
        enableTransition = true;
        positionIndex += 1;
        resetAutoplay();
    }

    function goToPrevious() {
        if (filteredSlides.length <= 1) return;
        enableTransition = true;
        positionIndex -= 1;
        resetAutoplay();
    }

    const getSlideImageUrl = (slide: HeroSlide, isActive: boolean) => {
        if (!slide.image) return '';
        const builder = urlFor(slide.image).auto('format').quality(isActive ? 85 : 70);
        return builder.width(1600).height(900).url();
    };

    type DisplaySlide = {
        slide: HeroSlide;
        key: string;
        actualIndex: number;
    };

    let displayedSlides = $state<DisplaySlide[]>([]);

    function handleImageLoad(node: HTMLImageElement, index: number) {
        if (!loading) return;

        const check = () => {
            if (index === positionIndex) loading = false;
        };

        if (node.complete) {
            check();
        }

        node.addEventListener('load', check);

        return {
            destroy() {
                node.removeEventListener('load', check);
            }
        };
    }

    function getActiveIndex() {
        if (!filteredSlides.length) return 0;
        if (filteredSlides.length === 1) return 0;

        const rawIndex = positionIndex - 1;
        if (rawIndex < 0) return filteredSlides.length - 1;
        if (rawIndex >= filteredSlides.length) return 0;
        return rawIndex;
    }

    async function snapWithoutTransition(nextIndex: number) {
        enableTransition = false;
        positionIndex = nextIndex;
        await tick();
        enableTransition = true;
    }

    async function handleTransitionEnd(event: TransitionEvent) {
        if (event.target !== event.currentTarget) return;
        if (event.propertyName !== 'transform') return;
        if (filteredSlides.length <= 1) return;

        if (positionIndex === 0) {
            await snapWithoutTransition(filteredSlides.length);
        } else if (positionIndex === filteredSlides.length + 1) {
            await snapWithoutTransition(1);
        }
    }

    $effect(() => {
        resetAutoplay();
        return clearAutoplay;
    });

    $effect(() => {
        if (filteredSlides.length === 0) {
            clearAutoplay();
        }
    });

    $effect(() => {
        if (!filteredSlides.length) {
            displayedSlides = [];
            positionIndex = 0;
            enableTransition = false;
            return;
        }

        if (filteredSlides.length === 1) {
            displayedSlides = filteredSlides.map((slide, index) => ({
                slide,
                key: slide._key ?? `slide-${index}`,
                actualIndex: index
            }));
            positionIndex = 0;
            enableTransition = false;
            return;
        }

        const last = filteredSlides[filteredSlides.length - 1];
        const first = filteredSlides[0];

        displayedSlides = [
            {
                slide: last,
                key: `${last._key ?? 'slide-last'}-clone-head`,
                actualIndex: filteredSlides.length - 1
            },
            ...filteredSlides.map((slide, index) => ({
                slide,
                key: slide._key ?? `slide-${index}`,
                actualIndex: index
            })),
            {
                slide: first,
                key: `${first._key ?? 'slide-first'}-clone-tail`,
                actualIndex: 0
            }
        ];

        if (positionIndex === 0) {
            positionIndex = 1;
            enableTransition = false;
            void tick().then(() => {
                enableTransition = true;
            });
        }
    });

    $effect(() => {
        if (filteredSlides.length <= 1) return;

        if (positionIndex <= 0 || positionIndex > filteredSlides.length) {
            void snapWithoutTransition(1);
        }
    });

    onDestroy(() => clearAutoplay());
</script>

<div class="flex flex-col lg:flex-row min-w-screen">
    <div class="w-full lg:w-1/2 lg:h-[87.5vh] flex flex-col justify-center items-start mt-12 lg:mt-0 space-y-6 order-2 lg:order-1 p-7 lg:p-0">
        <div class="mx-auto w-full lg:w-3/5 space-y-5">
            <h1 class="lg:text-3xl text-2xl font-semibold">
                {#each titleLines as line, index}
                    <span>{line}</span>
                    {#if index < titleLines.length - 1}
                        <br />
                    {/if}
                {/each}
            </h1>
            <p class="opacity-50">{computedSubtitle}</p>
            <div class="flex flex-col lg:flex-row space-x-3 space-y-3 mt-7 lg:mt-0 lg:space-y-0">
                <ButtonFilled href="/probetraining">Jetzt mitmachen</ButtonFilled>
                <ButtonOutlined href="/news">Neuigkeiten ansehen</ButtonOutlined>
            </div>
        </div>
        <img src={logo} alt="Tan Gun Do Logo" class="absolute left-0 lg:left-1/4 top-[52vh] lg:top-[5vh] -z-1 lg:w-xl w-40 opacity-10" />
    </div>
    <div class="w-full lg:w-1/2 h-[40vh] lg:h-[87.5vh] flex flex-col lg:justify-center items-start lg:space-y-6 lg:relative lg:right-0 order-1 lg:order-2">
        <div class="relative w-full h-full lg:h-10/12 overflow-hidden lg:rounded-l-lg shadow-lg">
            {#if loading}
                <div class="absolute inset-0 z-20 bg-gray-200 animate-pulse w-full h-full"></div>
            {/if}
            {#if filteredSlides.length > 0}
                {@const activeIndex = getActiveIndex()}
                <div
                    class="flex h-full w-full"
                    style={`transform: translateX(-${positionIndex * 100}%); transition: ${enableTransition ? `transform ${TRANSITION_DURATION_MS}ms ease-in-out` : 'none'}; will-change: transform;`}
                    ontransitionend={handleTransitionEnd}
                >
                    {#each displayedSlides as item, index (item.key)}
                        <figure class="relative h-full w-full flex-shrink-0">
                            <img
                                class="h-full w-full object-cover"
                                src={getSlideImageUrl(item.slide, item.actualIndex === activeIndex)}
                                alt={item.slide.alt || 'Hero Bild'}
                                loading={filteredSlides.length > 1
                                    ? index === positionIndex
                                        ? 'eager'
                                        : 'lazy'
                                    : 'eager'}
                                use:handleImageLoad={index}
                            />
                        </figure>
                    {/each}
                </div>
            {:else}
                <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 text-center text-sm text-black/60 px-6">
                    <p>Füge im Sanity Studio Bilder zur Hero-Sektion hinzu, um hier eine Slideshow anzuzeigen.</p>
                </div>
            {/if}
        </div>
        <div class="flex flex-row justify-end space-x-4 absolute lg:relative right-3 top-[45vh] lg:top-0 lg:right-0 float-right">
            <ButtonLeft onclick={goToPrevious} />
            <ButtonRight onclick={goToNext}/>
        </div>
    </div>
</div>