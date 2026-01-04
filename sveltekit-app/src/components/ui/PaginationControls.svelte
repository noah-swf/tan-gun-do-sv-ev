<script lang="ts">
    import ButtonLeft from './ButtonLeft.svelte';
    import ButtonRight from './ButtonRight.svelte';
    import ButtonOutlined from './ButtonOutlined.svelte';

    interface Props {
        currentPage: number;
        totalPages: number;
        isMobile: boolean;
        loading?: boolean;
        hasMore?: boolean;
        onSelectPage: (page: number) => void;
        onLoadMore?: () => void;
        loadMoreLabel?: string;
    }

    let {
        currentPage,
        totalPages,
        isMobile,
        loading = false,
        hasMore = false,
        onSelectPage,
        onLoadMore,
        loadMoreLabel = 'Mehr anzeigen'
    }: Props = $props();

    const pages = $derived(Array.from({ length: totalPages }, (_, index) => index));
</script>

{#if !isMobile && totalPages > 1}
    <div class="flex justify-end gap-2">
        <ButtonLeft
            disabled={currentPage === 0 || loading}
            onclick={() => onSelectPage(currentPage - 1)}
        />

        <div class="flex gap-1">
            {#each pages as index}
                <button
                    class="px-4 py-1 rounded transition-colors duration-200 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed {currentPage === index ? 'bg-red text-white' : 'bg-gray-100 hover:bg-gray-300'}"
                    onclick={() => onSelectPage(index)}
                    disabled={loading}
                >
                    {index + 1}
                </button>
            {/each}
        </div>

        <ButtonRight
            disabled={currentPage === totalPages - 1 || loading}
            onclick={() => onSelectPage(currentPage + 1)}
        />
    </div>
{/if}

{#if isMobile && hasMore && onLoadMore}
    <div class="flex justify-center">
        <ButtonOutlined onclick={onLoadMore}>
            {loading ? 'Lädt...' : loadMoreLabel}
        </ButtonOutlined>
    </div>
{/if}
