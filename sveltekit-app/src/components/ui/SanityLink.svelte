<script lang="ts">
  import type { MarkComponentProps } from '@portabletext/svelte'
  import type { Snippet } from 'svelte';

  interface Props {
    portableText: MarkComponentProps<{
      url?: string
      newWindow?: boolean
    }>
    children: Snippet
  }

  // Property custom marks receive from @portabletext/svelte when rendered
  let {portableText, children}: Props = $props()

  let {value} = $derived(portableText)

  const href = $state(() => (value as { href: string }).href);

</script>
{#if href()}
  <a href={href()} target='_blank' class="text-red duration-200 hover:underline" >
    <!-- Marks receive children which you can render with Svelte's slots -->
    {@render children()}
  </a>
{:else}
  <!-- If no valid URL, render only the contents of the mark -->
  {@render children()}
{/if}