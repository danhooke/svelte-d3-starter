<script>
	export let height;
	export let margin;
	export let xScale;
	let xTicks = [0, 15, 30, 45, 60];
</script>

<g>
	{#each xTicks as tick}
		<text
			x={xScale(tick)}
			y={height - margin.bottom}
			dominant-baseline="hanging"
			dy="6"
			>{tick} {tick === 60 ? ' minutes' : ''}
		</text>
	{/each}
</g>
