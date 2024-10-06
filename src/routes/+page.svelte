<script lang="ts">
  import App from '$lib/components/App.svelte'
</script>

<div>
  <App />
</div>

<style>
  :global(body) {
    margin: 0;
  }

  div {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180deg, rgba(10, 15, 22, 1) 0%, rgba(0, 0, 0, 1) 100%);
  }
</style>
