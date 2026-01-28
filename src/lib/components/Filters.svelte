<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { FilterOptions } from '$lib/types';
  import { formatPrice } from '$lib/products';

  let { filterOptions }: { filterOptions: FilterOptions } = $props();

  // Реактивное состояние фильтров
  let selectedCategories = $state<string[]>([]);
  let selectedBrands = $state<string[]>([]);
  let priceMin = $state(filterOptions.priceRange.min);
  let priceMax = $state(filterOptions.priceRange.max);
  let availability = $state<'all' | 'in_stock' | 'out_of_stock'>('all');

  // Инициализация из URL (только при загрузке)
  let isInitialized = $state(false);
  
  $effect(() => {
    if (!isInitialized) {
      const params = $page.url.searchParams;
      selectedCategories = params.getAll('category');
      selectedBrands = params.getAll('brand');
      priceMin = Number(params.get('price_min')) || filterOptions.priceRange.min;
      priceMax = Number(params.get('price_max')) || filterOptions.priceRange.max;
      availability = (params.get('availability') as any) || 'all';
      isInitialized = true;
    }
  });

  // Автоматическое применение фильтров при изменении
  $effect(() => {
    if (!isInitialized) return;

    const params = new URLSearchParams();

    selectedCategories.forEach(cat => params.append('category', cat));
    selectedBrands.forEach(brand => params.append('brand', brand));

    if (priceMin > filterOptions.priceRange.min) {
      params.set('price_min', priceMin.toString());
    }
    if (priceMax < filterOptions.priceRange.max) {
      params.set('price_max', priceMax.toString());
    }
    if (availability !== 'all') {
      params.set('availability', availability);
    }

    const sort = $page.url.searchParams.get('sort');
    if (sort) params.set('sort', sort);

    const newUrl = `/catalog?${params.toString()}`;
    const currentPath = $page.url.pathname + '?' + $page.url.searchParams.toString();
    
    if (newUrl !== currentPath) {
      goto(newUrl, { replaceState: false, noScroll: true });
    }
  });

  function resetFilters() {
    selectedCategories = [];
    selectedBrands = [];
    priceMin = filterOptions.priceRange.min;
    priceMax = filterOptions.priceRange.max;
    availability = 'all';
    goto('/catalog');
  }

  function toggleCategory(categoryId: string) {
    if (selectedCategories.includes(categoryId)) {
      selectedCategories = selectedCategories.filter(id => id !== categoryId);
    } else {
      selectedCategories = [...selectedCategories, categoryId];
    }
  }

  function toggleBrand(brandId: string) {
    if (selectedBrands.includes(brandId)) {
      selectedBrands = selectedBrands.filter(id => id !== brandId);
    } else {
      selectedBrands = [...selectedBrands, brandId];
    }
  }
</script>

<aside class="filters">
  <div class="filter-header">
    <h3>Фильтры</h3>
    <button onclick={resetFilters} class="reset-button">Сбросить</button>
  </div>

  <!-- Категории -->
  <div class="filter-section">
    <h4>Категории</h4>
    {#each filterOptions.categories as cat}
      <label class="checkbox">
        <input
          type="checkbox"
          checked={selectedCategories.includes(cat.id)}
          onchange={() => toggleCategory(cat.id)}
        />
        <span>{cat.name}</span>
        <span class="count">({cat.count})</span>
      </label>
    {/each}
  </div>

  <!-- Цена -->
  <div class="filter-section">
    <h4>Цена</h4>
    <div class="price-inputs">
      <div class="price-input">
        <label>От</label>
        <input
          type="number"
          bind:value={priceMin}
          min={filterOptions.priceRange.min}
          max={priceMax}
        />
      </div>
      <div class="price-input">
        <label>До</label>
        <input
          type="number"
          bind:value={priceMax}
          min={priceMin}
          max={filterOptions.priceRange.max}
        />
      </div>
    </div>
    <div class="price-range">
      <input
        type="range"
        min={filterOptions.priceRange.min}
        max={filterOptions.priceRange.max}
        bind:value={priceMax}
        class="range-slider"
      />
    </div>
    <div class="price-labels">
      <span>{formatPrice(filterOptions.priceRange.min)}</span>
      <span>{formatPrice(filterOptions.priceRange.max)}</span>
    </div>
  </div>

  <!-- Бренды -->
  <div class="filter-section">
    <h4>Бренд</h4>
    {#each filterOptions.brands as brand}
      <label class="checkbox">
        <input
          type="checkbox"
          checked={selectedBrands.includes(brand.id)}
          onchange={() => toggleBrand(brand.id)}
        />
        <span>{brand.name}</span>
        <span class="count">({brand.count})</span>
      </label>
    {/each}
  </div>

  <!-- Наличие -->
  <div class="filter-section">
    <h4>Наличие</h4>
    <label class="radio">
      <input
        type="radio"
        checked={availability === 'all'}
        onchange={() => (availability = 'all')}
      />
      <span>Все товары</span>
    </label>
    <label class="radio">
      <input
        type="radio"
        checked={availability === 'in_stock'}
        onchange={() => (availability = 'in_stock')}
      />
      <span>В наличии</span>
    </label>
    <label class="radio">
      <input
        type="radio"
        checked={availability === 'out_of_stock'}
        onchange={() => (availability = 'out_of_stock')}
      />
      <span>Нет в наличии</span>
    </label>
  </div>
</aside>

<style>
  .filters {
    background: var(--white);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-sm);
  }

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--gray-200);
  }

  .filter-header h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .reset-button {
    background: none;
    border: none;
    color: var(--primary);
    cursor: pointer;
    font-size: 0.875rem;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    transition: var(--transition);
  }

  .reset-button:hover {
    background: var(--primary-light);
  }

  .filter-section {
    margin-bottom: var(--spacing-xl);
    padding-bottom: var(--spacing-lg);
    border-bottom: 1px solid var(--gray-200);
  }

  .filter-section:last-of-type {
    border-bottom: none;
  }

  .filter-section h4 {
    margin: 0 0 var(--spacing-md) 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--gray-900);
  }

  .checkbox,
  .radio {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) 0;
    cursor: pointer;
    transition: var(--transition);
  }

  .checkbox:hover,
  .radio:hover {
    color: var(--primary);
  }

  .checkbox input[type='checkbox'],
  .radio input[type='radio'] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: var(--primary);
  }

  .checkbox span,
  .radio span {
    flex: 1;
  }

  .count {
    color: var(--gray-500);
    font-size: 0.875rem;
  }

  .price-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  .price-input {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .price-input label {
    font-size: 0.875rem;
    color: var(--gray-600);
  }

  .price-input input[type='number'] {
    padding: var(--spacing-sm);
    border: 1px solid var(--gray-300);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
  }

  .price-range {
    margin-bottom: var(--spacing-sm);
  }

  .range-slider {
    width: 100%;
    height: 6px;
    cursor: pointer;
    accent-color: var(--primary);
  }

  .price-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--gray-500);
  }

  @media (max-width: 768px) {
    .filters {
      padding: var(--spacing-md);
    }

    .filter-section {
      margin-bottom: var(--spacing-lg);
    }
  }
</style>
