<script lang="ts">
    import ChevronRight from '@lucide/svelte/icons/chevron-right';

    let { onclick }: { onclick: () => void } = $props();
</script>

<button
    class="rounded border border-gray-300 bg-white/70 hover:bg-white hover:cursor-pointer p-2 z-1"
    aria-label="Nach rechts"
    title="Nach rechts"
    onclick={onclick}
>
<ChevronRight color="var(--color-red)" class="w-5 h-5 text-gray-600" />
</button>