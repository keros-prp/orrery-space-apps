<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte' 
  import { huevo } from './store';
  import { vision } from './store'
  import { tamaño } from './store';
  import { satelites } from './store';
  import { distancia } from './store';
  import { duracion } from './store';
  import { tiempo } from './store';
  import { name } from './store';
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<Canvas>
  <Scene />
</Canvas>

<div>
  {#if $vision}
    <h2>{$huevo}</h2>
    Distance from the sun: {$distancia}<br>
    
    Time to complete a orbit: {$tiempo}<br>
    
    Size: {$tamaño}<br>

    Day duration: {$duracion}<br>

    Number of satelites: {$satelites}<br>

    {$name}

  {/if}
</div>

<style>

  div{
    font-family: 'Montserrat', sans-serif; /* Cambia a fuente Montserrat */
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
