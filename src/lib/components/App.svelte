<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Slider } from 'svelte-tweakpane-ui';
  import { simSpeed } from '../stores'
  import Modal from './modal.svelte'

  let simSpeedVal:number = 0;

  simSpeed.subscribe((value: number) => {
		simSpeedVal = value;
  });  

  $: simSpeed.update(()=>simSpeedVal);

</script>

<Pane>
  <Slider
    bind:value={simSpeedVal}
    min={0}
    max={365.25}
    label="Sim. speed (days/second)"
  />
</Pane>


<Modal />
<Canvas>
  <Scene />
</Canvas>

<style>
</style>
