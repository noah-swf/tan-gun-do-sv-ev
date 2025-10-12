<script lang="ts">
  import NewsCard from '../ui/NewsCard.svelte';
  import Welcome from '../Welcome.svelte';
  import type { Post } from '$lib/sanity/queries';

  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import ChevronLeft from '@lucide/svelte/icons/chevron-left';

  // Background images representing the south korean flag (south korea top left = sktl, etc.)
  import sktl from '$lib/assets/bg/SK_tl.webp';
  import sktr from '$lib/assets/bg/SK_tr.webp';
  import skbl from '$lib/assets/bg/SK_bl.webp';
  import skbr from '$lib/assets/bg/SK_br.webp';
	import ButtonOutlined from '../ui/ButtonOutlined.svelte';

  export let posts: Post[] = [];

  let scroller: HTMLDivElement;
  let scrollPos = 0;

  function scrollRight() {
    const step = scroller.clientWidth; // alternativ: feste CardBreite * 3
    scroller.scrollBy({ left: step, behavior: 'smooth' });
    scrollPos += step;
  }

  function scrollLeft() {
    const step = scroller.clientWidth;
    scroller.scrollBy({ left: -step, behavior: 'smooth' });
    scrollPos -= step;
  }
</script>

{#if posts.length}
<div class="min-w-screen relative inset-x-0 p-10 md:p-16 lg:p-10 bg-[#E6EDF6]/50">
  <!-- Hintergrundbilder -->
  <img src={sktl} alt="" class="hidden md:block absolute top-5 left-5 w-20 lg:opacity-25 md:opacity-10" />
  <img src={sktr} alt="" class="hidden md:block absolute top-5 right-5 w-20 lg:opacity-25 md:opacity-10" />
  <img src={skbl} alt="" class="hidden md:block absolute bottom-5 left-5 w-20 lg:opacity-25 md:opacity-10" />
  <img src={skbr} alt="" class="hidden md:block absolute bottom-5 right-5 w-20 lg:opacity-25 md:opacity-10" />

  <div class="relative max-w-5xl mx-auto">
    <!-- Desktop Header -->
    <div class="hidden md:flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">News</h1>
      <a href="/news" class="group inline-flex items-center gap-1 text-sm opacity-50 duration-200 text-black hover:opacity-100">
        <span>Mehr anzeigen</span>
        <span class="inline-block transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true">→</span>
      </a>
    </div>

    <!-- Mobile Header -->
    <div class="md:hidden mt-4 mb-4">
      <h1 class="text-xl font-semibold text-gray-800">News</h1>
    </div>

    <!-- Mobile: Vertical Stack -->
    <div class="flex flex-col gap-4 md:hidden">
      {#each posts.slice(0, 3) as post}
        <div class="w-full">
          <NewsCard {post} />
        </div>
      {/each}
    </div>

    <!-- Desktop: Horizontal Scroller -->
    <div class="relative hidden md:block">
              
      <!-- SCROLLER -->
      <div
        bind:this={scroller}
        class="flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth
               [-ms-overflow-style:none] [scrollbar-width:none]  /* Firefox/IE */
               [&::-webkit-scrollbar]:hidden                      /* WebKit */
        ">
        {#each posts as post}
          <!-- Jede Karte: calc((100% - 2 * gap) / 3) für die ersten 3 Cards -->
          <div class="flex-none w-[calc((100%-2*1rem)/3)] sm:w-[calc((100%-2*1rem)/3)] lg:w-[calc((100%-2*1rem)/3)] snap-start">
            <NewsCard {post} />
          </div>
        {/each}
      </div>
      <!-- Scroll Right Button, only visible if there are more than 3 posts and you're not at the end -->
      {#if posts.length > 3 && scrollPos < scroller?.clientWidth * (posts.length / 3 - 1)}
        <div class="hidden md:flex items-center gap-2 absolute -right-14 top-1/2 -translate-y-1/2">
          <button
            on:click={scrollRight}
            class="rounded border border-gray-300 bg-white/70 hover:bg-white hover:cursor-pointer p-2"
            aria-label="Nach rechts"
            title="Nach rechts"
          >
            <ChevronRight color="var(--color-red)" class="w-5 h-5 text-gray-600" />
          </button>
        </div>
      {/if}
      <!-- Scroll Left Button, only visible if there are more than 3 posts and you're not at the start -->
      {#if posts.length > 3 && scrollPos > 0}
          <div class="hidden md:flex items-center gap-2 absolute -left-14 top-1/2 -translate-y-1/2">
              <button
                  on:click={scrollLeft}
                  class="rounded border border-gray-300 bg-white/70 hover:bg-white hover:cursor-pointer p-2"
                  aria-label="Nach links"
                  title="Nach links"
              >
                  <ChevronLeft color="var(--color-red)" class="w-5 h-5 text-gray-600" />
              </button>
          </div>
      {/if}
    </div>

    <!-- Mobile "Mehr anzeigen" -->
    <div class="md:hidden mt-4">
      <ButtonOutlined href="/news" text="Mehr anzeigen"/>
    </div>
    

  </div>
</div>
{:else}
    <Welcome />
{/if}