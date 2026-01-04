<script lang="ts">
  import type {BlockComponentProps} from '@portabletext/svelte'
	import type { Snippet } from 'svelte';

    interface Props {
        portableText: BlockComponentProps
        children: Snippet
    }

  let {portableText, children}: Props = $props()

</script>

<!-- Simple bullet point for lists -->
<ul class="list-disc list-inside my-2 space-y-1.5">
  {@render children()}
</ul>
