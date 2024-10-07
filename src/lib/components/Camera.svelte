<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras';
  import { currTarget } from '../stores'

</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 50]}
  fov={50}
  far={10000}
>
  <OrbitControls
    autoRotate
    enableZoom={true}
    maxDistance={1500}
    minDistance={2.5}
    enableDamping
    autoRotateSpeed={0.0}
    target={[$currTarget.x, $currTarget.y, $currTarget.z]}
  />
</T.PerspectiveCamera>
