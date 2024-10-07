import { writable } from 'svelte/store';

export type Info = {
  nombre: string | undefined;
  vision: boolean | undefined;
  tamaño: string | undefined;
  distancia: string | undefined;
  tiempo: string | undefined;
  duracion: string | undefined;
  satelites: number | undefined;
  name: string | undefined;
  image: string | undefined;
};

export const info = writable<Info>({
  nombre: "",
  vision: false,
  tamaño: "",
  distancia: "",
  tiempo: "",
  duracion: "",
  satelites: 1,
  name: "",
  image: ""
});
