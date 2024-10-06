import { writable } from 'svelte/store';
import { Vector3 } from 'three';

export const globalSunPos = writable(new Vector3(0, 0, 0));
export const simSpeed = writable(5);
