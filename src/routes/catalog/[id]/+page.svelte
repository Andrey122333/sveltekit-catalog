<script lang="ts">
  import type { PageData } from './$types';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { formatPrice } from '$lib/products';
  import { cart } from '$lib/stores/cart.svelte';
  
  let { data }: { data: PageData } = $props();
  const { product, similar } = data;

  function addToCart() {
    cart.addItem(product.id, product.name, product.price, product.images[0], product.stockQuantity);
  }
</script>

<svelte:head>
  <title>{product.name} | Код и Кофе</title>
</svelte:head>

<Header />

<main class="main">
  <div class="container">
    <nav class="breadcrumbs">
      <a href="/catalog">Каталог</a>
      <span>/</span>
      <span>{product.categoryName}</span>
      <span>/</span>
      <span>{product.name}</span>
    </nav>

    <div class="layout">
      <div class="image">
        <div class="placeholder">{product.images[0] || 'Изображение'}</div>
      </div>

      <div class="info">
        <h1>{product.name}</h1>
        <div class="meta">
          <span>Артикул: #{product.id}</span>
          <span>★★★★★ {product.rating} ({product.reviewCount})</span>
        </div>

        <div class="price">{formatPrice(product.price)}</div>

        <div class="stock {product.inStock ? 'available' : 'unavailable'}">
          {product.inStock ? 'В наличии' : 'Нет в наличии'}
        </div>

        <button class="add-button" onclick={addToCart} disabled={!product.inStock}>
          Добавить в корзину
        </button>

        <div class="description">
          <h2>Описание</h2>
          <p>{product.fullDescription}</p>
        </div>

        <div class="specs">
          <h2>Характеристики</h2>
          <table>
            {#each Object.entries(product.specs) as [key, value]}
              <tr>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            {/each}
          </table>
        </div>
      </div>
    </div>

    {#if similar.length > 0}
      <section class="similar">
        <h2>Вам может понравиться</h2>
        <div class="similar-grid">
          {#each similar as product (product.id)}
            <ProductCard {product} />
          {/each}
        </div>
      </section>
    {/if}
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

  .breadcrumbs {
    display: flex;
    gap: 0.5rem;
    font-size: 0.875rem;
    margin-bottom: 2rem;
    color: var(--color-text-secondary);
  }

  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 4rem;
  }

  .image .placeholder {
    width: 100%;
    aspect-ratio: 1;
    background: var(--color-bg-secondary);
    border-radius: var(--border-radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .meta {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
  }

  .price {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .stock {
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius-sm);
    display: inline-block;
    margin-bottom: 1.5rem;
    font-weight: 600;
    color: white;
  }

  .stock.available {
    background: var(--color-success);
  }

  .stock.unavailable {
    background: var(--color-error);
  }

  .add-button {
    padding: 1rem 2rem;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--border-radius-md);
    font-weight: 600;
    margin-bottom: 2rem;
  }

  .add-button:hover:not(:disabled) {
    background: var(--color-primary-hover);
  }

  .add-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .description, .specs {
    margin-top: 2rem;
  }

  .specs table {
    width: 100%;
    border-collapse: collapse;
  }

  .specs td {
    padding: 0.75rem;
    border-bottom: 1px solid var(--color-border);
  }

  .specs td:first-child {
    font-weight: 600;
    width: 40%;
  }

  .similar {
    margin-top: 4rem;
  }

  .similar-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 1024px) {
    .layout {
      grid-template-columns: 1fr;
    }

    .similar-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
