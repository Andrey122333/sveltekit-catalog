<script lang="ts">
  import type { PageData } from './$types';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import Filters from '$lib/components/Filters.svelte';
  import Sort from '$lib/components/Sort.svelte';
  
  let { data }: { data: PageData } = $props();
</script>

<Header />

<main class="main">
  <div class="container">
    <section class="hero">
      <h1>Каталог товаров для разработчиков</h1>
      <p>Всё необходимое для продуктивной работы</p>
      <div class="count">В наличии: {data.total} товаров</div>
    </section>

    <div class="catalog-layout">
      <Filters filterOptions={data.filterOptions} />

      <div class="content">
        <div class="toolbar">
          <Sort />
          <div class="count-toolbar">Всего: {data.total}</div>
        </div>

        <div class="grid">
          {#each data.products as product (product.id)}
            <ProductCard {product} />
          {/each}
        </div>
      </div>
    </div>
  </div>
</main>

<Footer />

<style>
  .main {
    min-height: 100vh;
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .hero {
    text-align: center;
    margin-bottom: 3rem;
  }

  .hero h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .count {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
  }

  .catalog-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 2rem;
    align-items: start;
  }

  .content {
    flex: 1;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--gray-200);
  }

  .count-toolbar {
    font-weight: 500;
    color: var(--gray-700);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 1024px) {
    .catalog-layout {
      grid-template-columns: 1fr;
    }

    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
