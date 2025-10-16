<script lang="ts">
    import type { Event as SanityEvent } from '$lib/sanity/queries';
    import CalendarDays from '@lucide/svelte/icons/calendar-days';
    import Clock from '@lucide/svelte/icons/clock-4';
    import MapPin from '@lucide/svelte/icons/map-pin';
    import MessageSquare from '@lucide/svelte/icons/message-square';
	import ButtonOutlined from '../ui/ButtonOutlined.svelte';

    export let events: SanityEvent[] = [];

    const formatEventDate = (value?: string) => {
        if (!value) return 'Datum folgt';

        const parsed = new Date(value);

        if (Number.isNaN(parsed.getTime())) return 'Datum folgt';

        return new Intl.DateTimeFormat('de-DE', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(parsed);
    };

    const formatEventTime = (value?: string) => {
        if (!value) return null;

        const parsed = new Date(value);
        
        if (Number.isNaN(parsed.getTime())) return null;

        return new Intl.DateTimeFormat('de-DE', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(parsed);
    };

    $: sortedEvents = [...events].sort((a, b) => {
        const aTime = a.date ? new Date(a.date).getTime() : Number.POSITIVE_INFINITY;
        const bTime = b.date ? new Date(b.date).getTime() : Number.POSITIVE_INFINITY;
        return aTime - bTime;
    });

    type DisplayEvent = SanityEvent & {
        formattedDate: string;
        formattedTime: string | null;
    };

    let displayEvents: DisplayEvent[] = [];

    $: displayEvents = sortedEvents.map((event) => ({
        ...event, // copy all original properties
        formattedDate: formatEventDate(event.date),
        formattedTime: formatEventTime(event.date)
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

        {#if displayEvents.length}
            <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                {#each displayEvents as event (event._id)}
                    <article
                        class="group rounded-xl border border-gray-200 bg-white/80 shadow-sm p-6 space-y-2 transition duration-200 ease-out hover:-translate-y-1 hover:border-red/40 hover:shadow-lg"
                    >
                        <header class="space-y-1 ">
                            <p class="inline-flex items-center gap-2 text-xs lg:text-sm font-semibold uppercase tracking-wide text-red">
                                <CalendarDays class="w-4 h-4 transition-colors duration-200 group-hover:text-red-500" />
                                {event.formattedDate}
                            </p>
                            <h2 class="text-lg font-semibold text-gray-900">{event.title ?? 'Event'}</h2>
                        </header>

                        <div class="flex flex-col lg:flex-row items-start gap-2 mt-3 lg:gap-4 text-sm text-gray-600">
                            {#if event.formattedTime}
                                <div class="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock class="w-4 h-4 text-red transition-colors duration-200 group-hover:text-red-500" />
                                    <span>{event.formattedTime} Uhr</span>
                                </div>
                            {/if}
                            {#if event.ort}
                                <div class="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin class="w-4 h-4 text-red transition-colors duration-200 group-hover:text-red-500" />
                                    <span>{event.ort}</span>
                                </div>
                            {/if}
                        </div>

                        {#if event.comment}
                            <div class="flex items-center gap-2 text-sm text-gray-600">
                                <MessageSquare class="w-4 h-4 text-red transition-colors duration-200 group-hover:text-red-500" />
                                <span>{event.comment}</span>
                            </div>
                        {/if}
                    </article>
                {/each}
            </div>
        {:else}
            <div class="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
                Aktuell sind keine Events geplant. Schau gern bald wieder vorbei!
            </div>
        {/if}
        <div class="md:hidden">
            <ButtonOutlined href="/termine" text="Alle Termine ansehen" class="mx-auto"/>
        </div>
    </div>
</section>