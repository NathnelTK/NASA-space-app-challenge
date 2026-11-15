import { lunarEquipment } from './lunar.ts';
import { marsDeepEquipment } from './mars-deep.ts';
import type { Destination, Equipment, EquipmentType } from './types';

export const equipment: Equipment[] = [...lunarEquipment, ...marsDeepEquipment];
export const destinations: Destination[] = ['Moon', 'Mars', 'Deep Space'];
export const equipmentTypes: EquipmentType[] = [
	'Rovers',
	'Landers',
	'Scientific instruments',
	'Spacecraft and probes',
	'Other mission hardware'
];
export const equipmentById: Record<string, Equipment> = Object.fromEntries(
	equipment.map((item) => [item.id, item])
);
