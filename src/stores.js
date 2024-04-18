import { readable, derived } from 'svelte/store';
import { autoType, csv, groups, extent } from 'd3';

const dataPath =
	'https://raw.githubusercontent.com/higsch/data/main/daily_surface_temperatures/daily_surface_temperatures.csv';

export const data = readable([], async (set) => {
	const loadedData = await csv(dataPath, autoType);

	set(loadedData);
});

export const dataByYear = derived(data, ($data) => {
	return groups($data, (d) => d.year).map(([key, values]) => {
		const filteredValues = values.filter((d) => d.value !== 'NA');
		return {
			key,
			values: filteredValues,
		};
	});
});

export const dayOfYearDomain = derived(data, ($data) => {
	return extent($data, (d) => d.day_of_year);
});

export const valueDomain = derived(data, ($data) => {
	return extent($data, (d) => d.value);
});
