<script lang="ts">
  import { urlFor } from "$lib/sanity/image";

  let node = $props();
  const value = node.portableText?.value;
  let altText = $derived(value?.alt || "Image");
</script>

{#if value?.asset?._ref}
  <figure class="my-6">
    <img src={urlFor(value).auto("format").url()} alt={altText} loading="lazy" class="rounded-sm" />
    {#if value?.caption}
      <figcaption class="mt-2 text-sm text-gray-600 z-1">{value.caption}</figcaption>
    {/if}
  </figure>
{:else}
  <div class="my-6 rounded bg-gray-100 p-4 z-0">
    <p class="text-gray-500">Image could not be loaded</p>
  </div>
{/if}