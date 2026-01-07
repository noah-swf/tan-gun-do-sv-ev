<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children, href = "", onclick = () => {} }: { children : Snippet, href?: string, onclick?: () => void } = $props() 
  
</script>
{#if href}
  <a href={href} class="group flex items-center justify-center text-center gap-1 text-sm text-red border border-red bg-white rounded w-full px-6 py-2 hover:bg-gray-100 font-semibold duration-200">
  {#if children}
    {@render children()}
  {:else}
    <p>Whoops, something went wrong.</p>
  {/if}
  </a>
{:else}
  <button 
    class="group flex items-center justify-center text-center gap-1 text-sm text-red border border-red bg-white rounded w-full px-6 py-2 hover:bg-gray-100 font-semibold duration-200"
    type="button"
    onclick={onclick}
  >
    {#if children}
      {@render children()}
    {:else}
      <p>Whoops, something went wrong.</p>
    {/if}
  </button>
{/if}
