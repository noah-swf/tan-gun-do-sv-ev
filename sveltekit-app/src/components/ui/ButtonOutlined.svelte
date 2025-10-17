<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children, href }: { children : Snippet, href: string } = $props() 
  
</script>

<a href={href} class="flex items-center justify-center text-center gap-1 text-xs text-red border border-red bg-white rounded w-full px-6 py-2 hover:bg-gray-100 font-semibold duration-200">
{#if children}
	{@render children()}
{:else}
	<p>Whoops, something went wrong.</p>
{/if}
</a>
