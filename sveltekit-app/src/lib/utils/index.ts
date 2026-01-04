export function formatDate(date: string) {
	return new Date(date).toLocaleDateString('de-DE', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});
}

export function toPlainText(blocks: any[] = []) {
	return (
		blocks
			// loop through each block
			.map((block) => {
				// if it's not a text block with children, return nothing
				if (block._type !== 'block' || !block.children) {
					return '';
				}
				// loop through the children spans, and join them
				return block.children.map((child: any) => child.text).join('');
			})
			// join the paragraphs leaving split by two linebreaks
			.join('\n\n')
	);
}

export function truncateText(text: string, length: number) {
	if (text.length <= length) return text;
	return text.slice(0, length).trim() + '...';
}
