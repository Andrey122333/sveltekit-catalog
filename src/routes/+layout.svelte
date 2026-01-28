<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  
  interface Props {
    children: Snippet;
  }
  
  let { children }: Props = $props();
</script>

<svelte:head>
  <title>Код и Кофе — Интернет-магазин для разработчиков</title>
  <meta name="description" content="Интернет-магазин товаров для разработчиков" />
</svelte:head>

{@render children()}
