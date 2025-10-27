<script lang="ts">
    import type { Event as SanityEvent } from '$lib/sanity/queries';
    import ButtonOutlined from '../ui/ButtonOutlined.svelte';
    import EventCard from '../ui/EventCard.svelte';

    interface Props {
        events?: SanityEvent[];
    }

    let { events = [] }: Props = $props();

    const sortedEvents = $derived([...events].sort((a, b) => {
        const aTime = a.date ? new Date(a.date).getTime() : Number.POSITIVE_INFINITY;
        const bTime = b.date ? new Date(b.date).getTime() : Number.POSITIVE_INFINITY;
        return aTime - bTime;
    }));
</script>

<section class="px-6 md:px-10 py-10 mt-20 md:mt-30 bg-white">
    <div class="max-w-6xl mx-auto space-y-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 class="text-2xl font-semibold text-gray-800">Events & Termine</h1>
            <a
                href="/termine"
                class="group hidden md:inline-flex items-center gap-1 text-sm opacity-60 duration-200 text-black hover:opacity-100"
            >
                <span>Alle Termine</span>
                <span
                    class="inline-block transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                    aria-hidden="true"
                >
                    →
                </span>
            </a>
        </div>

        {#if sortedEvents.length}
            <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                {#each sortedEvents as event (event._id)}
                    <EventCard {event} />
                {/each}
            </div>
        {:else}
            <div class="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
                Aktuell sind keine Events geplant. Schau gern bald wieder vorbei!
            </div>
        {/if}
        <div class="md:hidden mx-auto">
            <ButtonOutlined href="/termine">Alle Termine ansehen</ButtonOutlined>
        </div>
    </div>
</section>