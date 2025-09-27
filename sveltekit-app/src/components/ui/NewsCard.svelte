<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { Post } from '$lib/sanity/queries';
	import logo from '$lib/assets/logo.webp';

	interface Props {
		post: Post;
	}

	let { post }: Props = $props();
</script>

<a class="inline-block p-2 lg:p-3 h-full border-1 rounded-lg border-black/15 bg-white hover:opacity-80 duration-200" href={`/post/${post.slug.current}`}>
	<!-- Post Cover Image -->
	<div class="aspect-[4/3]">
		<img
			class="h-full w-full rounded-md object-cover"
			src={post.mainImage ? urlFor(post.mainImage).url() : logo}
			alt="Cover image for {post.title}"
		/>
	</div>

	<!-- Post Date -->
	<p class="md:text-sm text-xs text-black/50 mt-3">
		{ formatDate(post._createdAt) }
	</p>

	<!-- Post Title -->
	<h3 class="text-base font-semibold mt-1 line-clamp-2">
		{post.title}
	</h3>
</a>
