<script lang="ts">
    import ChevronLeft from '@lucide/svelte/icons/chevron-left';

    let { onclick, disabled = false } = $props();
</script>

<button
    class="rounded border border-gray-300 bg-white/70 hover:bg-white hover:cursor-pointer p-2 z-1"
    aria-label="Nach links"
    title="Nach links"
    type="button"
    onclick={onclick}
    disabled={disabled}
>
    <ChevronLeft color="var(--color-red)" class="w-5 h-5 text-gray-600" />
</button>