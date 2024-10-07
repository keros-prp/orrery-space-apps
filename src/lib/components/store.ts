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

export const datos: Info[] = [
{
  nombre: "Mercury",  
  vision: true,
  distancia:"57.9 million km",
  tiempo: '0.24 years',
  tamaño: '4,880 km',
  duracion: '58.6 hours',
  satelites: 0,
  name: 'Named after the Roman messenger god, Mercury, who was associated with speed and communication.',
  image: '/assets/Mercury.png'
},
{
  nombre: "Venus",
  vision: true,
  distancia: '108.2 million km',
  tiempo: '0.615 years',
  tamaño: '12,104 km',
  duracion: '243 hours',
  satelites: 0,
  name: 'Named after the Roman goddess of love and beauty, Venus.',
  image: '/assets/Venus.jpg'
},
{
    nombre: "Earth",
  vision: true,
  distancia: '149.6 million km',
  tiempo: '1 year',
  tamaño: '12,742 km',
  duracion: '24 hours',
  satelites: 1,
  name: 'The name "Earth" comes from Old English "eorðe" and the Anglo-Saxon word "erda," meaning ground or soil. The name reflects the planet\'s nature as the ground we stand on.',
  image: '/assets/Earth.jpg'
},
{
    nombre: "Mars",
  vision: true,
  distancia: '227.9 million km',
  tiempo: '1.88 years',
  tamaño: '6,779 km',
  duracion: '24.6 hours',
  satelites: 2,
  name: 'Named after the Roman god of war, Mars. The planet\'s reddish color led to its association with blood and warfare',
  image: '/assets/Mars.jpg'
},
{
  nombre: "Jupiter",
  vision: true,
  distancia: '778.5 million km',
  tiempo: '11.86 years',
  tamaño: '139,822 km',
  duracion: '9.9 hours',
  satelites: 95,
  name: 'Named after the king of the Roman gods, Jupiter, who was associated with thunder and the sky.',
  image: '/assets/Jupiter.png'
},
{
  nombre: "Saturn",
  vision: true,
  distancia: '1,434.0 million km',
  tiempo: '29.46 years',
  tamaño: '116,464 km',
  duracion: '10.7 hours',
  satelites: 146,
  name: 'Named after the Roman god of time, Saturn, who was also associated with wealth and abundance.',
  image: '/assets/Saturn.jpg'
},
{
    nombre: "Uranus",
  vision: true,
  distancia: '2,871.0 million km',
  tiempo: '84.01 years',
  tamaño: '50,724 km',
  duracion: '17.2 hours',
  satelites: 28,
  name: 'Named after the Greek god Uranus, the personification of the sky. The name was suggested by astronomer Johann Bode.',
  image: '/assets/Uranus.png'
},
{
    nombre: "Neptune",
  vision: true,
  distancia: '	4,495.1 million km',
  tiempo: '164.8 years',
  tamaño: '49,244 km',
  duracion: '16.1 hours',
  satelites: 16,
  name: 'Named after the Roman messenger god, Mercury, who was associated with speed and communication.Named after the Roman god of the sea, Neptune. The name reflects the planet\'s deep blue color.',
  image: '/assets/Neptune.jpg'
},
{
    nombre: "Pluto",
  vision: true,
  distancia: '5,906.4 million km',
  tiempo: '248 years',
  tamaño: '2,377 km',
  duracion: '153.3 hours',
  satelites: 5,
  name: 'Named after the Roman god of the underworld, Pluto. The name reflects the cold and distant nature of the dwarf planet.',
  image: '/assets/Pluto.jpg'
}
];
