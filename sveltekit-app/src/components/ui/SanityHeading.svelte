<script lang="ts">
  import type {BlockComponentProps} from '@portabletext/svelte'
	import type { Snippet } from 'svelte';

  interface Props {
      portableText: BlockComponentProps
      children: Snippet
  }

  let {portableText, children}: Props = $props()
  let {indexInParent, global, value} = $derived(portableText)
  let {ptBlocks} = $derived(global)
  let {style} = $derived(value)

  const headings = ['h1', 'h2', 'h3', 'h4', 'h5']

  let precededByHeading = $derived(headings.includes(ptBlocks[indexInParent - 1]?._key || ''))

  let anchorId = $derived(`heading-${value._key}`)
</script>

<!-- If preceded by heading, have a higher margin top -->
<div class="relative {precededByHeading ? 'mt-10' : 'mt-4'}" id={anchorId}>
  {#if style === 'h1'}
    <h1 class="text-3xl font-semibold mt-4">
      {@render children()}
    </h1>
  {:else if style === 'h2'}
    <h2 class="text-2xl font-semibold mt-4">
      {@render children()}
    </h2>
  {:else if style === 'h3'}
    <h3 class="text-xl font-semibold mt-2">
      {@render children()}
    </h3>
  {:else}
    <h4 class="text-lg mt-2">
      {@render children()}
    </h4>
  {/if}
</div>