<script lang="ts">
  import { info } from './store';
  import type { Info } from './store'
  
  let infoPlanet: Info;

  info.subscribe((value) => {
    infoPlanet = value;
  });

  const closeModal = () => {
    info.update(()=>{
      return {... infoPlanet, vision: false}
    })
  }
</script>

{#if infoPlanet.vision}
  <div>
    <button on:click={closeModal}>Close</button>
    <h2>{infoPlanet.nombre}</h2>
    {infoPlanet.name}<br><br>
     
    <strong>Size:</strong> {infoPlanet.tamaño}<br>
    <strong>Distance from the sun:</strong> {infoPlanet.distancia}<br>
    <strong>Time to complete a orbit:</strong> {infoPlanet.tiempo}<br>
    <strong>Day duration:</strong> {infoPlanet.duracion}<br>
    <strong>Number of satelites:</strong> {infoPlanet.satelites}<br>
    <img src={infoPlanet.image} alt="Italian Trulli">
  </div>
{/if}

<style>

  div{
    margin: 20px 20px 0 0;
    font-family: sans-serif; /* Cambia a fuente Montserrat */
    background: rgba(100, 100, 255, 0.1); /* Fondo blanco con transparencia */
    opacity: 80%;
    position: absolute;
    top: 0%;
    right: 0%;
    color: azure;
    border-radius: 10px; /* Bordes redondeados */
    padding: 10px 20px 20px 20px; /* Espaciado interno */
    width: 500px; /* Ancho del modal */
    height: 90vh;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); /* Sombra */
  }

  /* Estilo para el título h2 dentro del div */
  div h2 {
    text-align: center; /* Centra el título */
    margin-bottom: 20px; /* Espacio debajo del título */
  }

  button {
    position: absolute;
    color: white;
    border: 0;
    background-color: transparent;
    right: 1em;
    top: 1em;
    cursor: pointer;
  }

  img {
    position: absolute; 
    bottom: 20px;
    width: 500px;
    max-height: 500px;
  }

</style>
