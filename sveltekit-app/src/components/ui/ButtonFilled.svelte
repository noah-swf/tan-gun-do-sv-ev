<script lang="ts">
  let props = $props();
  
</script>

<a 
href={props.href} 
class="flex items-center justify-center text-center gap-1 text-xs text-white border border-red bg-red rounded w-full px-6 py-2 hover:bg-red-800 font-semibold cursor-pointer duration-200">
{props.text}
</a>
