<script>
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras';
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 1500]}
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
