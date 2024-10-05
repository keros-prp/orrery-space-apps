<script lang="ts">
  import type * as THREE from 'three';
  import { Group } from 'three';
  import { T, type Props, type Events, type Slots, forwardEventHandlers } from '@threlte/core';
  import { useGltf } from '@threlte/extras';
  import { OrbitControls } from '@threlte/extras';
  import { writable } from 'svelte/store';
  import { interactivity } from '@threlte/extras'
  type $$Props = Props<THREE.Group>;
  type $$Events = Events<THREE.Group>;
  type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } };

  interactivity()
  export const ref = new Group();

  type GLTFResult = {
    nodes: {
      Sol1_lambert2_0: THREE.Mesh;
      Sol1_lambert3_0: THREE.Mesh;
      Sol1_lambert4_0: THREE.Mesh;
      Sol1_lambert5_0: THREE.Mesh;
      Sol1_lambert6_0: THREE.Mesh;
      Sol1_lambert7_0: THREE.Mesh;
      Sol1_lambert10_0: THREE.Mesh;
      Sol1_lambert11_0: THREE.Mesh;
      Sol1_lambert12_0: THREE.Mesh;
      Sol1_lambert13_0: THREE.Mesh;
      Sol1_lambert9_0: THREE.Mesh;
    };
    materials: {
      lambert2: THREE.MeshBasicMaterial;
      lambert3: THREE.MeshBasicMaterial;
      lambert4: THREE.MeshBasicMaterial;
      lambert5: THREE.MeshBasicMaterial;
      lambert6: THREE.MeshBasicMaterial;
      lambert7: THREE.MeshBasicMaterial;
      lambert10: THREE.MeshBasicMaterial;
      lambert11: THREE.MeshBasicMaterial;
      lambert12: THREE.MeshBasicMaterial;
      lambert13: THREE.MeshBasicMaterial;
      lambert9: THREE.MeshBasicMaterial;
    };
  };

  const gltf = useGltf<GLTFResult>('/models/scene.gltf');
  const component = forwardEventHandlers();

  // Estado para almacenar la información del planeta seleccionado
  const selectedPlanet = writable(null);

  // Función para manejar el clic en un planeta
  function handlePlanetClick(planet) {
    console.log(planet);
    selectedPlanet.set(planet);
  }

</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, -1500, 0]}
  fov={50}
  far={10000}
>
  <OrbitControls
    autoRotate
    enableZoom={true}
    enableDamping
    autoRotateSpeed={0.0}
    target.y={1.5}
  />
</T.PerspectiveCamera>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Mesh
      geometry={gltf.nodes.Sol1_lambert2_0.geometry}
      material={gltf.materials.lambert2}
      on:click={() => handlePlanetClick('Sol')}
    />
    <T.Mesh
      geometry={gltf.nodes.Sol1_lambert3_0.geometry}
      material={gltf.materials.lambert3}
      onClick={() => handlePlanetClick('Mercurio')} 
    />
    <T.Mesh
      geometry={gltf.nodes.Sol1_lambert4_0.geometry}
      material={gltf.materials.lambert4}
      onClick={() => handlePlanetClick('Venus')} 
    />
    <T.Mesh
      geometry={gltf.nodes.Sol1_lambert5_0.geometry}
      material={gltf.materials.lambert5}
      onClick={() => handlePlanetClick('Tierra')} 
    />
    <T.Mesh
      geometry={gltf.nodes.Sol1_lambert6_0.geometry}
      material={gltf.materials.lambert6}
      onClick={() => handlePlanetClick('Marte')} 
    />
    <T.Mesh
      geometry={gltf.nodes.Sol1_lambert7_0.geometry}
      material={gltf.materials.lambert7}
      onClick={() => handlePlanetClick('Júpiter')} 
    />
    <T.Mesh
      geometry={gltf.nodes.Sol1_lambert10_0.geometry}
      material={gltf.materials.lambert10}
      onClick={() => handlePlanetClick('Saturno')}
    />
    <T.Mesh
      geometry={gltf.nodes.Sol1_lambert11_0.geometry}
      material={gltf.materials.lambert11}
      onClick={() => handlePlanetClick('Urano')} 
    />
    <T.Mesh
      geometry={gltf.nodes.Sol1_lambert12_0.geometry}
      material={gltf.materials.lambert12}
      onClick={() => handlePlanetClick('Neptuno')}
    />
    <T.Mesh
      geometry={gltf.nodes.Sol1_lambert13_0.geometry}
      material={gltf.materials.lambert13}
      onClick={() => handlePlanetClick('Plutón')}
    />
    <T.Mesh
      geometry={gltf.nodes.Sol1_lambert9_0.geometry}
      material={gltf.materials.lambert9}
      onClick={() => handlePlanetClick('Otro')} 
    />
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>

<!-- Mostrar información del planeta seleccionado -->
{#if $selectedPlanet}
  <div class="info-box">
    <h3>Información sobre {$selectedPlanet}</h3>
    <p>
      <!-- Aquí puedes agregar información específica para cada planeta -->
      {#if $selectedPlanet === 'Sol'}
        El Sol es la estrella en el centro de nuestro sistema solar.
      {:else if $selectedPlanet === 'Mercurio'}
        Mercurio es el planeta más cercano al Sol.
      {:else if $selectedPlanet === 'Venus'}
        Venus es el planeta más caliente del sistema solar.
      {:else if $selectedPlanet === 'Tierra'}
        La Tierra es el único planeta conocido que alberga vida.
      {:else if $selectedPlanet === 'Marte'}
        Marte es conocido como el planeta rojo.
      {:else if $selectedPlanet === 'Júpiter'}
        Júpiter es el planeta más grande del sistema solar.
      {:else if $selectedPlanet === 'Saturno'}
        Saturno es famoso por sus anillos.
      {:else if $selectedPlanet === 'Urano'}
        Urano es un planeta gaseoso y tiene un tono azul.
      {:else if $selectedPlanet === 'Neptuno'}
        Neptuno es el planeta más lejano del Sol.
      {:else if $selectedPlanet === 'Plutón'}
        Plutón es considerado un planeta enano.
      {:else}
        Información no disponible.
      {/if}
    </p>
  </div>
{/if}

<style>
  .info-box {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
</style>


