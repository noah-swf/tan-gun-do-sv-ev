<script lang="ts">
    import Picture from '$lib/assets/testPic.png';
</script>

<section class="mx-6 md:mx-32 my-16">
    <h1 class="text-3xl md:text-4xl font-extrabold text-center md:text-left mb-12 tracking-tight">
        Probetraining vereinbaren?
    </h1>

    <div class="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">

        <img
            src={Picture}
            alt="Probetraining"
            class="w-56 md:w-64 lg:w-72 rounded-xl shadow-md object-cover hidden md:block"
        />

        <div class="max-w-xl">
            <h2 class="text-2xl font-semibold mb-3 text-gray-900">
                Komm einfach vorbei!
            </h2>

            <p class="text-gray-700 leading-relaxed text-lg">
                Ein kostenloses Probetraining ist bei uns zu den jeweiligen
                <a
                    href="/trainingszeiten"
                    class="font-semibold text-red-600 hover:text-red-800 transition-colors"
                >
                    Trainingszeiten
                </a>
                immer möglich!  
                Komm einfach zu einem unserer Trainings vorbei und mach mit.  
                Wir freuen uns auf dich!
            </p>
        </div>
    </div>
</section>
