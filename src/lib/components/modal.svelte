<script lang="ts">
  import { info } from './store';
  import type { Info } from './store'
  
  let infoPlanet: Info;

  info.subscribe((value) => {
    infoPlanet = value;
  });

</script>

{#if infoPlanet.vision}
  <div>
    <h2>{infoPlanet.nombre}</h2>
    Distance from the sun: {infoPlanet.distancia}<br>
    
    Time to complete a orbit: {infoPlanet.tiempo}<br>
    
    Size: {infoPlanet.tamaño}<br>

    Day duration: {infoPlanet.duracion}<br>

    Number of satelites: {infoPlanet.satelites}<br>

    {infoPlanet.name}
  </div>
{/if}
<style>

  div{
    font-family: sans-serif; /* Cambia a fuente Montserrat */
    background: rgba(255, 255, 255, 0.1); /* Fondo blanco con transparencia */
    opacity: 80%;
    position: absolute;
    bottom: 0%;
    right: 0%;
    color: azure;
    border-radius: 10px; /* Bordes redondeados */
    padding: 20px; /* Espaciado interno */
    max-width: 600px; /* Ancho máximo */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); /* Sombra */
    transition: transform 0.3s; /* Efecto de transformación al pasar el mouse */
  }

  div:hover {
    transform: scale(1.05); /* Aumenta ligeramente al pasar el mouse */
  }

  /* Estilo para el título h2 dentro del div */
  div h2 {
    text-align: center; /* Centra el título */
    margin-bottom: 20px; /* Espacio debajo del título */
  }

</style>
