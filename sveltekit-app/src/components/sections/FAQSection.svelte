<script lang="ts">
    import {onMount} from 'svelte';
    import { slide } from 'svelte/transition';
    import {client} from '$lib/sanity/client';
    import {FAQQuery} from '$lib/sanity/queries';

    type FAQ = {
        _id: string;
        question: string;
        answer: string;
    };
    export let faq: FAQ[] = [];

    let openItems: Record<string, boolean> = {};

    function toggle(id: string) {
        openItems = {
          ...openItems,
          [id]: !openItems[id]
     };
    }

    onMount(async() => {
        faq = await client.fetch<FAQ[]>(FAQQuery);
    });
</script>

<section class="my-10 mx-10 md:mx-20">
  <h1 class="text-xl font-bold">Häufig gestellte Fragen (FAQ)</h1>

  {#each faq as item}
    <div class="mt-6 border border-gray-300 rounded-lg overflow-hidden">

      <button
        class="w-full flex justify-between items-center text-left p-4 hover:bg-gray-100 transition"
        on:click={() => toggle(item._id)}
      >
        <span class="font-medium">{item.question}</span>

        <span
          class="text-3xl p-0 font-thin text-gray-500 transition-transform duration-200"
          class:rotate-180={openItems[item._id]}
        >
          {openItems[item._id] ? '−' : '+'}
        </span>
      </button>

      {#if openItems[item._id]}
        <div 
        transition:slide={{ duration: 200}} 
        class="p-4 border-t border-gray-200 bg-gray-100">
          <p class="text-gray-700">
            {item.answer}
          </p>
        </div>
      {/if}
    </div>
  {/each}
</section>