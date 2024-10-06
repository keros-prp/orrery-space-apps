<script lang="ts">
  import Camera from './Camera.svelte'
  import Planets from './models/planets.svelte'
  import { Stars } from '@threlte/extras'

</script>

<Camera />
<Stars radius={1000} depth={1} speed={0} factor={40} />
<Planets />
