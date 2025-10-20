<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import NewsCard from '$lib/../components/ui/NewsCard.svelte';
    import ButtonLeft from '$lib/../components/ui/ButtonLeft.svelte';
    import ButtonRight from '$lib/../components/ui/ButtonRight.svelte';
    import ButtonOutlined from '../../components/ui/ButtonOutlined.svelte';
    import type { PageData } from './$types';

    const POSTS_PER_PAGE = 6;

    const { data } = $props<{ data: PageData }>();
    
    let isMobile = $state(false);
    let loading = $state(false);
    
    const currentPage = $derived(data.currentPage ?? 0);
    const totalPages = $derived(Math.ceil(data.totalPosts / POSTS_PER_PAGE));
    const hasMorePosts = $derived(data.posts.length < data.totalPosts);

    onMount(() => {
        const checkMobile = () => {
            isMobile = window.innerWidth < 1024;
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    });

    async function goToPage(newPage: number) {
        if (newPage >= 0 && newPage < totalPages && !loading) {
            loading = true;
            await goto(`?page=${newPage}`, { keepFocus: true });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            loading = false;
        }
    }

    async function loadMoreMobile() {
        if (hasMorePosts && !loading) {
            loading = true;
            const nextPage = Math.floor(data.posts.length / POSTS_PER_PAGE);
            await goto(`?page=${nextPage}&loadMore=true`, { keepFocus: true });
            loading = false;
        }
    }
</script>

<div class="container mx-auto px-6 lg:px-4 py-8 max-w-6xl">
    <h1 class="text-2xl font-semibold text-gray-800">Aktuelles</h1>
    <p class="opacity-50 mb-10">
        Bleibe auf dem Laufenden mit den neuesten Nachrichten und Updates aus unserem Verein.
    </p>
    
    {#if data.posts.length === 0}
        <div class="text-center py-12">
            <p class="text-gray-500">Keine Beiträge verfügbar.</p>
        </div>
    {:else}
        <!-- News Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {#each data.posts as post (post.slug.current)}
                <NewsCard {post} />
            {/each}
        </div>

        <!-- Desktop Pagination -->
        {#if !isMobile && totalPages > 1}
            <div class="flex justify-end gap-2">
                <ButtonLeft 
                    onclick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 0 || loading}
                />
                
                <div class="flex gap-1">
                    {#each Array(totalPages) as _, index}
                        <button
                            class="px-4 py-1 rounded transition-colors duration-200 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed {currentPage === index 
                                ? 'bg-red text-white' 
                                : 'bg-gray-100 hover:bg-gray-300'}"
                            onclick={() => goToPage(index)}
                            disabled={loading}
                        >
                            {index + 1}
                        </button>
                    {/each}
                </div>
                
                <ButtonRight 
                    onclick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages - 1 || loading}
                />
            </div>
        {/if}

        <!-- Mobile Load More -->
        {#if isMobile && hasMorePosts}
            <div class="flex justify-center">
                <ButtonOutlined onclick={loadMoreMobile} >
                    {loading ? 'Lädt...' : 'Mehr anzeigen'}
                </ButtonOutlined>
            </div>
        {/if}
    {/if}
</div>