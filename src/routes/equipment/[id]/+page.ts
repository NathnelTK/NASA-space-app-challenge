import { error } from '@sveltejs/kit';
import { equipment, equipmentById } from '$lib/data/equipment';
import type { PageLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => equipment.map((item) => ({ id: item.id }));

export const load: PageLoad = ({ params }) => {
	const item = equipment.find((record) => record.id === params.id);
	if (!item) error(404, 'This object is not in our collection.');
	return { item, related: item.relatedIds.map((id) => equipmentById[id]).filter(Boolean) };
};
