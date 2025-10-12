<script lang="ts">
  let props = $props();
  
</script>

<a href={props.href} class="flex items-center justify-center text-center gap-1 text-xs text-red border border-red bg-white rounded w-full px-6 py-2 hover:bg-gray-100 font-semibold duration-200">
{props.text}
</a>
