<script>
  import { T, useTask } from '@threlte/core'
  import { interactivity } from '@threlte/extras'
  import { spring } from 'svelte/motion'
  import { TextureLoader } from 'three'
  import { useLoader } from '@threlte/core'


  interactivity()
  const scale = spring(1)
  let rotation = 0
  useTask((delta) => {
    rotation += delta
  })
  const texture = useLoader(TextureLoader).load('/models/textures/lambert2_baseColor.jpeg')
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}
/>

<T.DirectionalLight position={[0, 10, 10]} />

<T.Mesh


>
  <T.SphereGeometry args={[10, 32, 32]} />
  {#if $texture}
  <T.MeshStandardMaterial map={$texture} />
{/if}
</T.Mesh>

