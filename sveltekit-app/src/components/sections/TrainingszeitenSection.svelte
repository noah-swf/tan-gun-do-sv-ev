<script lang="ts">
    import {onMount} from 'svelte';
    import {client} from '$lib/sanity/client';
    import {trainingszeitenQuery} from '$lib/sanity/queries';
    import Clock from '@lucide/svelte/icons/clock-4';
    import Pin from '@lucide/svelte/icons/map-pin';
    import Person from '@lucide/svelte/icons/person-standing';

    type Unit = {
        ageGroup: string;
        timeslot: string;
        location: string;
        trainer: string;
    };

    type Trainingszeiten = {
        _id?: string;
        day: string;
        units: Unit[];
    };

    let trainingszeiten: Trainingszeiten[] = [];

    onMount(async() => {
        trainingszeiten = await client.fetch<Trainingszeiten[]>(trainingszeitenQuery);

        const dayOrder = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
        trainingszeiten.sort(
            (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
        );
    });
</script>

<section class="px-6 md:px-10 py-10">
    <div class="hidden md:flex justify-between items-center mb-10">
      <h1 class="text-2xl font-semibold text-gray-800">Unsere Trainingszeiten</h1>
      <a href="/news" class="group inline-flex items-center gap-1 text-sm opacity-50 duration-200 text-black hover:opacity-100">
        <span>Probetraining vereinbaren</span>
        <span class="inline-block transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true">→</span>
      </a>
    </div>

    <div class="md:hidden">
        <h1 class="text-2xl font-semibold text-gray-800 mb-10">Unsere Trainingszeiten</h1>
    </div>

    <div class="relative flex md:items-center text-left md:text-center bg-yellow-100 border-2 border-yellow-200 rounded-lg p-4 mb-10">
        <Clock color="var(--color-yellow-600)" class="w-5 h-5 text-yellow-600 absolute left-4" />
        <span class="text-yellow-600 text-center w-full">
            <strong>Hinweis:</strong> Sollten Trainingszeiten abweichen, informieren wir euch immer rechtzeitig über WhatsApp.
        </span>
    </div>

    <div class="md:hidden items-center mb-6 flex justify-center">
        <a href="/probetraining" class="group inline-flex items-center justify-center gap-1 text-sm font-semibold duration-200 text-red border border-red w-full rounded px-4 py-2 hover:opacity-100">
            <span>Probetraining vereinbaren</span>
            <span class="inline-block transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true">→</span>
        </a>
    </div>


    {#each trainingszeiten as day}
        <section class="mb-12">
            <h2 class="text-2xl font-semibold mb-6 capitalize">{day.day}</h2>
            

            <div class="flex flex-wrap gap-6 justify-start">

                {#each day.units as unit}
                    <div class="border border-gray-300 rounded-xl p-4 w-100">
                        <p class="font-bold text-lg">{unit.ageGroup}</p>
                        <hr class="border-t-1.5 border-gray-300 my-2">
                        <div class="flex items-center">
                            <Clock color="var(--color-red)" class="w-5 h-5 mr-2"/>
                            <p class="text-gray-700">{unit.timeslot}</p>
                        </div>
                        <div class="flex items-center">
                            <Pin color="var(--color-red)" class="w-5 h-5 mr-2"/>
                            <p class="text-gray-700">{unit.location}</p>
                        </div>
                        <div class="flex items-center">
                            <Person color="var(--color-red)" class="w-5 h-5 mr-2"/>
                            <p class="text-gray-700">Trainer: {unit.trainer}</p>
                        </div>
                        {#if day.day === 'Samstag'}
                            <p class="text-sm text-gray-500 mt-2"><strong>Kapftraining:</strong> Schutzausrüstung mitbringen</p>
                        {/if}
                    </div>
                {/each}
            </div>
        </section>
    {/each}
</section>