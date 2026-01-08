<script lang="ts">
    import Logo from "../../lib/assets/logo.webp";
    import Check from '@lucide/svelte/icons/circle-check';
    import Warning from '@lucide/svelte/icons/circle-alert';
    import { slide } from 'svelte/transition';
    import { urlFor } from '../../lib/sanity/image';

    export let contact: any = null;

    let name = '';
    let email = '';
    let subject = '';
    let message = '';
    let confirmEmail = ''; // Honeypot field for spam prevention
    let success = false;
    let error = false;
    let privacyAccepted = false;


    async function handleSubmit(e: Event) {
        e.preventDefault();
        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message, confirmEmail })
            });
            const result = await res.json();

            if (result.success) {
                success = true;
                error = false;
                name = email = subject = message = '';
                setTimeout(() => (success = false), 4000);
            } else {
                throw new Error('Serverfehler');
            }
        } catch (err) {
            console.error(err);
            success = false;
            error = true;
            setTimeout(() => (error = false), 4000);
        }
    }
</script>

<section class="container mx-auto px-6 lg:px-4 py-8 max-w-6xl">
    <h1 class="text-2xl font-semibold text-gray-800 mb-2">Aktuelles</h1>
    <p class="mb-10">
        <span class="opacity-50">       
            Hier kannst du uns eine Nachricht mit deinem Anliegen schicken. Komm gerne auch persönlich zu den 
        </span>
        <a href="/trainingszeiten" class="text-red-600 hover:text-red-800 font-semibold duration-200 opacity-100">
            Trainingszeiten
        </a> 
        <span class="opacity-50">       
            vorbei. Die Adresse unserer Halle findest du weiter unten.
        </span>
    </p>
    <div class="flex flex-col md:flex-row md:gap-6">
        <div class="block md:flex-1 w-full md:w-1/2 border border-gray-300 rounded-lg p-6">
            <h2 class="text-lg font-semibold mb-6">Kontaktformular</h2>
            {#if success}
                <div 
                transition:slide={{duration:400}}
                class="flex items-center mb-4 p-4 rounded-lg border border-green-500 bg-green-100 text-green-800 text-sm font-thin animate-fadeIn">
                    <Check class="text-green-500 mx-2"/> Deine Nachricht wurde erfolgreich gesendet! Wir melden uns bald bei dir.
                </div>
            {/if}

            {#if error}
                <div 
                transition:slide={{duration: 400}}
                class="flex items-center mb-4 p-4 rounded-lg bg-red-100 border border-red text-red-800 text-sm animate-fadeIn">
                    <Warning class="text-red-800 mx-2"/>Beim Senden der Nachricht ist ein Fehler aufgetreten. Bitte versuche es später erneut.
                </div>
            {/if}
            <form on:submit={handleSubmit} class="space-y-4 text-sm">
                
                <!-- Hidden honeypot field -->
                <div class="hidden" aria-hidden="true">
                    <label for="confirm-email">Confirm email</label>
                    <input id="confirm-email" type="text" name="confirm-email" bind:value={confirmEmail} tabindex="-1" autocomplete="off" />
                </div>

                <div>
                    <label for="name" class="block mb-2 font-medium text-gray-700">Name</label>
                    <input id="name" type="text" bind:value={name} required
                        class="w-full p-2 px-4 border border-gray-300 rounded-lg bg-gray-100" placeholder="Dein vollständiger Name"/>
                </div>
              
                <div>
                    <label for="email" class="block mb-2 font-medium text-gray-700">E-Mail</label>
                    <input id="email" type="email" bind:value={email} required
                        class="w-full p-2 px-4 border border-gray-300 rounded-lg bg-gray-100" placeholder="name@beispiel.de"/>
                </div>
              
                <div>
                    <label for="subject" class="block mb-2 font-medium text-gray-700">Betreff</label>
                    <input id="subject" type="text" bind:value={subject} required
                        class="w-full p-2 px-4 border border-gray-300 rounded-lg bg-gray-100" placeholder="Worum geht es?"/>
                </div>
              
                <div>
                    <label for="message" class="block mb-2 font-medium text-gray-700">Nachricht</label>
                    <textarea id="message" bind:value={message} rows="5" required
                        class="w-full p-2 px-4 border border-gray-300 rounded-lg bg-gray-100" placeholder="Formuliere deine Nachricht"></textarea>
                </div>

                <div class="flex items-start space-x-2 py-2">
                    <input
                        id="privacy"
                        type="checkbox"
                        bind:checked={privacyAccepted}
                        required
                        class="mt-1 w-4 h-4 border-gray-300 rounded text-red-600 focus:ring-red-500"
                    />
                    <label for="privacy" class="text-sm text-gray-700">
                        Ich stimme der Verarbeitung meiner Daten zu Zwecken der Kontaktaufnahme zu. Weitere Informationen in der
                        <a
                            href="/datenschutz"
                            target="_blank"
                            class="text-red-600 hover:text-red-800 font-semibold"
                        >Datenschutzerklärung</a>
                        .
                    </label>
                </div>
              
              <button type="submit"
                class="flex items-center justify-center text-center gap-1 text-sm text-white border border-red bg-red rounded w-full px-6 py-2 hover:bg-red-800 font-semibold cursor-pointer duration-200">
                Nachricht senden
              </button>
            </form>
        </div>
        <div class="hidden md:flex md:flex-1 max-h-1/3 border border-gray-300 rounded-lg">
            {#if contact?.image}
                <img src={urlFor(contact.image).url()} alt="Contact" class="w-full h-full object-cover rounded-lg shadow-lg"/>
            {:else}
                <img src={Logo} alt="logo" class="w-full h-full object-cover rounded-lg shadow-lg"/>
            {/if}
        </div>
    </div>
</section>