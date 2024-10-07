import { writable } from 'svelte/store';
import { Vector3 } from 'three';

export type PlanetPosition = {
  name: string;
  pos: Vector3;
};

export const globalSunPos = writable(new Vector3(0, 0, 0));
export const simSpeed = writable(5);
export const planetPositions = writable<PlanetPosition[]>([]);
export const currTarget = writable<Vector3>(new Vector3(0, 0, 0));
