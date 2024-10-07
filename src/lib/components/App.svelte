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

<style>
</style>
