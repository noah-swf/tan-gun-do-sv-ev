<script>
    import Picture from '$lib/assets/testPic.png';
    let DropdownFAQ1Open = false;
    let DropdownFAQ2Open = false;
    let DropdownFAQ3Open = false;
    let DropdownFAQ4Open = false;
</script>

<section class="text-center md:text-start mx-10 md:mx-30">
    <h1 class="text-2xl font-bold my-10">Probetraining vereinbaren?</h1>

    <div class="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
        <div class="flex-1 w-full text-center md:text-left space-y-4">
            <h2 class="text-xl font-semibold">Komm einfach vorbei!</h2>
            <p class="text-gray-700 leading-relaxed">
                Ein kostenloses Probetraining ist bei uns zu den jeweiligen
                <a href="/trainingszeiten" class="font-bold text-red-600 hover:text-red-800 duration-200">
                    Trainingszeiten
                </a>
                immer möglich!<br />
                Komm einfach zu einem unserer Trainings vorbei und mach mit.<br />
                Wir freuen uns auf dich!
            </p>
        </div>
        <div class="flex-1 w-full flex justify-center">
            <img
                src={Picture}
                alt="TestPic"
                class="object-cover w-full max-w-md rounded-xl border border-gray-200"
            />
        </div>
    </div>
    <div class="my-10">
        <h1 class="text-xl font-bold">Häufig gestellte Fragen (FAQ)</h1>
        <div class="mt-6 border border-gray-300 rounded-lg overflow-hidden">
			<button
				class="w-full flex justify-between items-center text-left p-4 hover:bg-gray-100 transition"
				on:click={() => (DropdownFAQ1Open = !DropdownFAQ1Open)}
			>
				<span class="font-medium">Was muss ich mitnehmen?</span>
				<span
					class="text-3xl p-0 font-thin text-gray-500 transition-transform duration-200"
					class:rotate-180={DropdownFAQ1Open}
				>
					{DropdownFAQ1Open ? '−' : '+'}
				</span>
			</button>

			{#if DropdownFAQ1Open}
				<div class="p-4 border-t border-gray-200 bg-gray-100">
					<p class="text-gray-700">
						Zum Probetraining solltest du bequeme Sportkleidung und etwas zu trinken mitbringen.
						Alles Weitere, wie z.B. Schutzausrüstung, wird von uns gestellt.
					</p>
				</div>
			{/if}
            <hr class="border-t-1.5 border-gray-300 mx-6"/>
			<button
            class="w-full flex justify-between items-center text-left p-4 hover:bg-gray-100 transition"
            on:click={() => (DropdownFAQ2Open = !DropdownFAQ2Open)}
			>
            <span class="font-medium">Kostet das Probetraining etwas?</span>
            <span
            class="text-3xl p-0 font-thin text-gray-500 transition-transform duration-200"
            class:rotate-180={DropdownFAQ2Open}
		
				>
					{DropdownFAQ2Open ? '−' : '+'}
				</span>
			</button>

			{#if DropdownFAQ2Open}
				<div class="p-4 border-t border-gray-200 bg-gray-100">
					<p class="text-gray-700">
						Nein, das Probetraining ist vollkommen kostenlos und unverbindlich. <br>
                        Du kannst alles erstmal kennenlernen und dann entscheiden, ob du weitermachen möchtest.
					</p>
				</div>
			{/if}
            <hr class="border-t-1.5 border-gray-300 mx-6"/>
            <button
            class="w-full flex justify-between items-center text-left p-4 hover:bg-gray-100 transition"
            on:click={() => (DropdownFAQ3Open = !DropdownFAQ3Open)}
			>
            <span class="font-medium">Brauche ich Ausrüstung?</span>
            <span
            class="text-3xl p-0 font-thin text-gray-500 transition-transform duration-200"
            class:rotate-180={DropdownFAQ3Open}
		
				>
					{DropdownFAQ3Open ? '−' : '+'}
				</span>
			</button>

			{#if DropdownFAQ3Open}
				<div class="p-4 border-t border-gray-200 bg-gray-100">
					<p class="text-gray-700">
						Nein, für dein erstes Probetraining brauchst du nichts weiter. <br>
                        Wir haben (falls doch nötig) Ausrüstung in allen Größen vor Ort, die du für dein Probetraining benutzen kannst.
					</p>
				</div>
			{/if}
            <hr class="border-t-1.5 border-gray-300 mx-6"/>
            <button
            class="w-full flex justify-between items-center text-left p-4 hover:bg-gray-100 transition"
            on:click={() => (DropdownFAQ4Open = !DropdownFAQ4Open)}
			>
            <span class="font-medium">Kann ich ohne Vorerfahrung mitmachen?</span>
            <span
            class="text-3xl p-0 font-thin text-gray-500 transition-transform duration-200"
            class:rotate-180={DropdownFAQ4Open}
		
				>
					{DropdownFAQ4Open ? '−' : '+'}
				</span>
			</button>

			{#if DropdownFAQ4Open}
				<div class="p-4 border-t border-gray-200 bg-gray-100">
					<p class="text-gray-700">
						Auf jeden Fall! <br>
                        Unsere Trainings sind für alle geeignet, egal ob jung oder alt, Anfänger oder Fortgeschrittene. <br>
                        Wir kümmern uns um dich und dorgen dafür, dass du dich wohlfühlst und am Training teilnehmen kannst.
					</p>
				</div>
			{/if}
		</div>
    </div>
</section>