<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PageData } from './$types';
	import SanityImage from '../../components/ui/SanityImage.svelte';
	import CustomHeading from '../../components/ui/SanityHeading.svelte';
	import SanityBullet from '../../components/ui/SanityBullet.svelte';
	import SanityLink from '../../components/ui/SanityLink.svelte';
	import SanityQuote from '../../components/ui/SanityQuote.svelte';
    
	export let data: PageData;
    $: datenschutz = data.datenschutz;
</script>

<div class="container mx-auto px-6 lg:px-4 py-8 max-w-6xl">
    {#if datenschutz}
        <h1 class="text-2xl font-semibold text-gray-800 mb-6">{datenschutz.title}</h1>
        
        <div class="prose max-w-none text-gray-600">
            <PortableText value={datenschutz.content} 
                components={{
                    block: {
                        h1: CustomHeading,
                        h2: CustomHeading,
                        h3: CustomHeading,
                        h4: CustomHeading,
                        h5: CustomHeading,
                        blockquote: SanityQuote,
                    },
                    marks: {
                        link: SanityLink,
                    },
                    list: {
                        bullet: SanityBullet,
                    },
                    types: {
                        image: SanityImage,
                    }
                }}
            />
        </div>
    {:else}
        <p>Lade Datenschutzerklärung...</p>
    {/if}
</div>
