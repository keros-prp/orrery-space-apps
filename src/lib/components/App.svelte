<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Slider, Button } from 'svelte-tweakpane-ui';
  import { currTarget, simSpeed, planetPositions, type PlanetPosition } from '../stores'
  import Modal from './modal.svelte'

  function handleButtonClick(buttonData: PlanetPosition) {
    $simSpeed = 0;
    $currTarget = buttonData.pos;
  }

</script>

<Pane title="Simulation controls" >
  <Slider
    bind:value={$simSpeed}
    min={0}
    max={365.25}
    label="Sim. speed (days/second)"
  />
  {#each $planetPositions as element}
      <Button on:click={() => handleButtonClick(element)} title='Go to {element.name}' />
  {/each}
</Pane>


<Modal />
<Canvas>
  <Scene />
</Canvas>

<div>
  <a href="https://github.com/keros-prp/orrery-space-apps">
    <img src="/icons/github-mark/github-mark-white.svg" alt="Credits and repo">
  </a>
</div>

<style>
  div {
    font-family: sans-serif;
    background: rgba(255, 255, 255, 0.1); /* Fondo blanco con transparencia */
    opacity: 80%;
    position: absolute;
    bottom: 0%;
    left: 0%;
    color: azure;
    border-radius: 1em; /* Bordes redondeados */
    padding: 1em; /* Espaciado interno */
    margin: 1em;
  }

  img {
    height: 2em;
  }
</style>
