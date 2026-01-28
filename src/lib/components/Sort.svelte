<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let currentSort = $derived($page.url.searchParams.get('sort') || 'default');

  function handleSortChange(value: string) {
    const params = new URLSearchParams($page.url.searchParams);
    if (value === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    goto(`/catalog?${params.toString()}`);
  }
</script>

<div class="sort">
  <label for="sort">Сортировка:</label>
  <select
    id="sort"
    value={currentSort}
    onchange={(e) => handleSortChange(e.currentTarget.value)}
    class="select"
  >
    <option value="default">По умолчанию</option>
    <option value="price_asc">Цена: по возрастанию</option>
    <option value="price_desc">Цена: по убыванию</option>
    <option value="name_asc">Название: А-Я</option>
    <option value="name_desc">Название: Я-А</option>
    <option value="rating">По рейтингу</option>
  </select>
</div>

<style>
  .sort {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .sort label {
    font-weight: 500;
    color: var(--gray-700);
    white-space: nowrap;
  }

  .select {
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid var(--gray-300);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
    background: white;
    cursor: pointer;
    transition: var(--transition);
    min-width: 200px;
  }

  .select:hover {
    border-color: var(--primary);
  }

  .select:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-light);
  }

  @media (max-width: 768px) {
    .sort {
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-sm);
    }

    .select {
      width: 100%;
      min-width: auto;
    }
  }
</style>
