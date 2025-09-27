<script lang="ts">
	import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet
  }

  let {children}: Props = $props()

</script>

<blockquote class="border-l-3 border-red bg-red-50 italic p-5 my-5">
  "<span> {@render children()} </span>"
</blockquote>