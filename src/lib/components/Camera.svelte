<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras';
  import { globalSunPos } from '../stores'
  import { Vector3 } from 'three';

  let sunPos_val: Vector3;

  globalSunPos.subscribe((value:Vector3) => {
		sunPos_val = value;
        console.log(value)
  });  

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
    maxDistance={1500}
    minDistance={2.5}
    enableDamping
    autoRotateSpeed={0.0}
    target={[sunPos_val.x, sunPos_val.y, sunPos_val.z]}
  />
</T.PerspectiveCamera>
