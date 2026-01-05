<script lang="ts">
    import type { PageData } from './$types';
    import ContactSection from '../../components/sections/ContactSection.svelte';
    import MapSection from '../../components/sections/MapSection.svelte';
    import SEO from '../../components/SEO.svelte';

    export let data: PageData;
</script>

<SEO title="Kontakt" description="Kontaktieren Sie uns für Fragen oder Anmeldungen." />

<main> 
    <ContactSection contact={data.contact} />
    <MapSection />
</main>