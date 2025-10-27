<script lang="ts">
    import type { Event as SanityEvent } from '$lib/sanity/queries';
    import CalendarDays from '@lucide/svelte/icons/calendar-days';
    import CalendarPlus from '@lucide/svelte/icons/calendar-plus';
    import Clock from '@lucide/svelte/icons/clock-4';
    import MapPin from '@lucide/svelte/icons/map-pin';
    import MessageSquare from '@lucide/svelte/icons/message-square';

    interface Props {
        event: SanityEvent;
    }

    let { event }: Props = $props();

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

    const formattedDate = $derived(formatEventDate(event?.date));
    const formattedTime = $derived(formatEventTime(event?.date));

    const escapeICS = (value?: string) =>
        (value ?? '')
            .replace(/\\/g, '\\\\')
            .replace(/\r?\n/g, '\\n')
            .replace(/,/g, '\\,')
            .replace(/;/g, '\\;');

    const formatDateValue = (date: Date) => {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    };

    const formatDateTimeValue = (date: Date) =>
        date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const buildICSContent = (source: SanityEvent) => {
        const now = new Date();
        const rawDate = source.date ? new Date(source.date) : null;
        const hasTime = rawDate ? rawDate.getUTCHours() !== 0 || rawDate.getUTCMinutes() !== 0 || source.date?.includes('T') : false;

        let dtStart = '';
        let dtEnd = '';

        if (rawDate) {
            if (hasTime) {
                dtStart = `DTSTART:${formatDateTimeValue(rawDate)}`;
                const endDate = new Date(rawDate.getTime() + 60 * 60 * 1000);
                dtEnd = `DTEND:${formatDateTimeValue(endDate)}`;
            } else {
                dtStart = `DTSTART;VALUE=DATE:${formatDateValue(rawDate)}`;
                const endDate = new Date(rawDate.getTime() + 24 * 60 * 60 * 1000);
                dtEnd = `DTEND;VALUE=DATE:${formatDateValue(endDate)}`;
            }
        } else {
            const defaultDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            dtStart = `DTSTART;VALUE=DATE:${formatDateValue(defaultDate)}`;
            const endDate = new Date(defaultDate.getTime() + 24 * 60 * 60 * 1000);
            dtEnd = `DTEND;VALUE=DATE:${formatDateValue(endDate)}`;
        }

        const lines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Tan-Gun-Do//Event//DE',
            'BEGIN:VEVENT',
            `UID:${escapeICS(source._id)}@tan-gun-do`,
            `DTSTAMP:${formatDateTimeValue(now)}`,
            dtStart,
            dtEnd,
            `SUMMARY:${escapeICS(source.title ?? 'Event')}`,
            source.comment ? `DESCRIPTION:${escapeICS(source.comment)}` : undefined,
            source.ort ? `LOCATION:${escapeICS(source.ort)}` : undefined,
            'END:VEVENT',
            'END:VCALENDAR'
        ].filter(Boolean);

        return lines.join('\r\n');
    };

    function downloadICS() {
        if (typeof window === 'undefined') return;
        const icsContent = buildICSContent(event);
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${(event.title ?? 'event').replace(/[^a-z0-9-_]/gi, '')}.ics`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    }
</script>

<button 
onclick={downloadICS}
class="group rounded-xl border border-gray-200 bg-white/80 shadow-sm p-6 space-y-2 transition duration-200 ease-out hover:-translate-y-1 hover:border-red/40 hover:shadow-md hover:cursor-pointer text-left">
    <header class="space-y-1">
        <p class="inline-flex items-center gap-2 text-xs lg:text-sm font-semibold uppercase tracking-wide text-red">
            <CalendarDays class="w-4 h-4 transition-colors duration-200 group-hover:text-red-500" />
            {formattedDate}
        </p>
        <h2 class="text-lg font-semibold text-gray-900">{event?.title ?? 'Event'}</h2>
    </header>

    <div class="flex flex-col lg:flex-row items-start gap-2 mt-3 lg:gap-4 text-sm text-gray-600">
        {#if formattedTime}
            <div class="flex items-center gap-2 text-sm text-gray-600">
                <Clock class="w-4 h-4 text-red transition-colors duration-200 group-hover:text-red-500" />
                <span>{formattedTime} Uhr</span>
            </div>
        {/if}
        {#if event?.ort}
            <div class="flex items-center gap-2 text-sm text-gray-600">
                <MapPin class="w-4 h-4 text-red transition-colors duration-200 group-hover:text-red-500" />
                <span>{event.ort}</span>
            </div>
        {/if}
    </div>

    {#if event?.comment}
        <div class="flex items-center gap-2 text-sm text-gray-600">
            <MessageSquare class="w-4 h-4 text-red transition-colors duration-200 group-hover:text-red-500" />
            <span>{event.comment}</span>
        </div>
    {/if}

    </button>
