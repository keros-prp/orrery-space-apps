<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { MeshLineGeometry, MeshLineMaterial, FakeGlowMaterial, Outlines } from '@threlte/extras'
  import { CuerpoCeleste } from '../../propagate-kepler'
  import { Vector3 } from 'three'
  import { TextureLoader } from 'three'
  import { useLoader } from '@threlte/core'
  import type { AsyncWritable } from '@threlte/core';    
  import { Texture } from 'three';
  import { globalSunPos, simSpeed, planetPositions, type PlanetPosition } from '../../stores'
  import { info, datos } from '../store';
  import { interactivity } from '@threlte/extras'
  interactivity()

  const textureMercury = useLoader(TextureLoader).load('/models/textures/lambert3_baseColor.jpeg')
  const textureVenus = useLoader(TextureLoader).load('/models/textures/lambert4_baseColor.jpeg')
  const textureEarth = useLoader(TextureLoader).load('/models/textures/lambert5_baseColor.jpeg')
  const textureMars = useLoader(TextureLoader).load('/models/textures/lambert6_baseColor.jpeg')
  const textureJupyter = useLoader(TextureLoader).load('/models/textures/lambert7_baseColor.jpeg')
  const textureSaturn = useLoader(TextureLoader).load('/models/textures/lambert9_baseColor.jpeg')
  const textureUranus = useLoader(TextureLoader).load('/models/textures/lambert10_baseColor.jpeg')
  const textureNeptune = useLoader(TextureLoader).load('/models/textures/lambert11_baseColor.png')
  const texturePluto = useLoader(TextureLoader).load('/models/textures/lambert12_baseColor.jpeg')
  const textureSaturnR = useLoader(TextureLoader).load('/models/textures/lambert13_baseColor.jpeg')


  const handlePlanetClick = (planeta: { name: string; pos: Vector3  }) => {
    let datosPlaneta = datos.find(element => element.nombre === planeta.name);
    info.update(() => {
        return { nombre: datosPlaneta?.nombre, vision: true, tamaño: datosPlaneta?.tamaño, distancia: datosPlaneta?.distancia, tiempo: datosPlaneta?.tiempo, duracion: datosPlaneta?.duracion, satelites: datosPlaneta?.satelites, name: datosPlaneta?.name }
    })
  };

  // Keplerian element data gotten from
  // https://ssd.jpl.nasa.gov/planets/approx_pos.html
  // Originally from Standish and Williams (1992)
  const mercurio = new CuerpoCeleste("Mercury", 0.38709927, 0.00000037,
      0.20563593, 0.00001906, 7.00497902, -0.00594749, 252.25032350,
      149472.67411175, 77.45779628, 0.16047689, 48.33076593, -0.12534081, 0.240846, textureMercury,0.38);
  const venus = new CuerpoCeleste("Venus", 0.72333566, 0.00000390, 0.00677672,
      -0.00004107, 3.39467605, -0.00078890, 181.97909950, 58517.81538729,
      131.60246718, 0.00268329, 76.67984255, -0.27769418, 0.615, textureVenus,0.95);
  const tierra = new CuerpoCeleste("Earth", 1.00000261, 0.00000562, 0.01671123,
      -0.00004392, -0.00001531, -0.01294668, 100.46457166, 35999.37244981,
      102.93768193, 0.32327364, 0, 0, 1, textureEarth,1);
  const marte = new CuerpoCeleste("Mars", 1.52371243, 0.00000097, 0.09336511, 0.00009149, 1.85181869, -0.00724757, -4.56813164, 19140.29934243, -23.91744784, 0.45223625, 49.71320984, -0.26852431, 1.881, textureMars,0.53);
  const jupiter = new CuerpoCeleste("Jupiter", 5.20288700, -0.00011607,
      0.04838624, -0.00013253, 1.30439695, -0.00183714, 34.39644051, 3034.74612775,
      14.72847983, 0.21252668, 100.47390909, 0.20469106, 11.86, textureJupyter,11.2);
  const saturno = new CuerpoCeleste("Saturn", 9.53667594, -0.00125060,
      0.05386179, -0.00050991, 2.48599187, 0.00193609, 49.95424423, 1222.49362201,
      92.59887831, -0.41897216, 113.66242448, -0.28867794, 29.46, textureSaturn,9.4);
  const urano = new CuerpoCeleste("Uranus", 19.18916464, -0.00196176, 0.04725744,
      -0.00004397, 0.77263783, -0.00242939, 313.23810451, 428.48202785, 170.95427630,
      0.40805281, 74.01692503, 0.04240589, 84.01, textureUranus,4);
  const neptuno = new CuerpoCeleste("Neptune", 30.06952752, 0.00006447, 0.00895439, 0.00000818, 1.77005520, 0.00022400, 304.22289287, 218.46515314, 46.68158724, 0.01009938, 131.78635853, -0.00606302, 164.8, textureNeptune,3.9);
  const pluton = new CuerpoCeleste("Pluto", 39.76117, 0, 2.502879951216484e-01, 0, 1.732559807118311e+01, 0, 0, 0, 1.151409620637363E+02, 0, 1.104336423551854E+02, 0, 248.1, texturePluto,0.18);

  let planetas: CuerpoCeleste[] = [mercurio, venus, tierra, marte, jupiter, saturno, urano, neptuno, pluton]

  const planetOrbitPoints: Vector3[][] = []
  for (const planeta of planetas) {
    const points = [];
    for (const vec of planeta.calcTrajectory()) {
      points.push(new Vector3(vec[0], vec[1], vec[2]));
    }
    planetOrbitPoints.push(points);
  }

  let planetMetaInfo: { name: string; pos: Vector3; texture:AsyncWritable<Texture>, size:number}[] = [];

  let saturnPos: Vector3 = new Vector3();

  let cont = 0;
  useTask((delta) => {
    planetMetaInfo = [];
    for (let planeta of planetas) {
      const pos = planeta.propagateOnTime(cont);
      planetMetaInfo!.push({name: planeta.name, pos: new Vector3(pos[0], pos[1], pos[2]), texture:planeta.texture,size:planeta.relative_size});
      if (planeta.name === "Saturn") {
         saturnPos = new Vector3(pos[0], pos[1], pos[2]);
      }
    }
    cont += delta * $simSpeed / 365.25;
    let positionArr: PlanetPosition[] = [];
    for (const meta of planetMetaInfo) {
    positionArr.push({
      name: meta.name,
      pos: meta.pos,
    });
    }
    planetPositions.set(positionArr);

  })

  const sunPosArr: number[] = planetas[planetas.length -2].getSunPos();
  const sunPos: Vector3 = new Vector3(sunPosArr[0], sunPosArr[1], sunPosArr[2]);
  globalSunPos.update(()=>sunPos);

</script>

<T.PointLight position={[sunPos.x, sunPos.y, sunPos.z]} color="white" intensity={5} decay={0} />

{#each planetOrbitPoints as points}
<T.Mesh>
  <MeshLineGeometry {points} />
  <MeshLineMaterial
    width={0.05}
    color="#aaaaaa"
  />
</T.Mesh>
{/each}
<T.Mesh position={[sunPos.x, sunPos.y, sunPos.z]}>
  <T.SphereGeometry args={[4, 24, 24]} />
  <T.MeshBasicMaterial color="yellow" />
</T.Mesh>
<T.Mesh position={[sunPos.x, sunPos.y, sunPos.z]}>
  <FakeGlowMaterial glowColor="yellow"/>
  <T.IcosahedronGeometry args={[8, 8]} />
</T.Mesh>
{#each planetMetaInfo as planeta}
    <T.Mesh position.x={planeta.pos.x} position.y={planeta.pos.y} position.z={planeta.pos.z} interactive on:click={() => handlePlanetClick({name: planeta.name, pos: planeta.pos})}>
    <T.SphereGeometry args={[0.3*planeta.size, 24, 24]} />
    {#await planeta.texture then texture}
      <T.MeshStandardMaterial map={texture} />  
    {/await}  
    <!-- <Outlines color="white" thickness={0.25} screenspace={false} opacity={0.2} /> -->
  </T.Mesh>
{/each}
<T.Mesh position={[saturnPos.x, saturnPos.y, saturnPos.z]}>
  <T.RingGeometry args={[3.5, 5, 24]} />
  <T.MeshStandardMaterial map={$textureSaturnR} />  
  <Outlines color="#A1A152" thickness={0.2} screenspace={false} opacity={0.2} />
</T.Mesh>
