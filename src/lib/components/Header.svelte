<script lang="ts">
  import { cart } from '$lib/stores/cart.svelte';
</script>

<header class="header">
  <div class="container">
    <a href="/catalog" class="logo">
      <span class="icon">☕</span>
      <span>Код и Кофе</span>
    </a>

    <nav class="nav">
      <a href="/catalog">Каталог</a>
      <a href="/about">О нас</a>
      <a href="/contacts">Контакты</a>
    </nav>

    <div class="cart">
      <button class="cart-button">
        🛒
        {#if cart.itemCount > 0}
          <span class="badge">{cart.itemCount}</span>
        {/if}
      </button>
    </div>
  </div>
</header>

<style>
  .header {
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .icon {
    font-size: 1.5rem;
  }

  .nav {
    display: flex;
    gap: 1.5rem;
  }

  .nav a {
    color: var(--color-text-secondary);
    font-weight: 500;
  }

  .nav a:hover {
    color: var(--color-primary);
  }

  .cart-button {
    position: relative;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    padding: 0.5rem;
  }

  .badge {
    position: absolute;
    top: 0;
    right: 0;
    background: var(--color-error);
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
  }
</style>
