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
    background-color:rgb(5, 5, 56);
    opacity: 50%;
    position: absolute;
    bottom: 0%;
    right: 0%;
    color: azure;
  }

</style>
