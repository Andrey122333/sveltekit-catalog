/**
 * Корзина на Svelte 5 runes
 */

import type { CartItem } from '../types';

const STORAGE_KEY = 'kod-i-kofe-cart';

class CartStore {
  items = $state<CartItem[]>([]);

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          this.items = JSON.parse(stored);
        } catch (e) {
          console.error('Ошибка загрузки корзины:', e);
        }
      }
    }
  }

  get total() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get itemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  addItem(id: number, name: string, price: number, image: string, maxQuantity: number) {
    const existing = this.items.find(item => item.id === id);

    if (existing) {
      existing.quantity = Math.min(existing.quantity + 1, maxQuantity);
    } else {
      this.items.push({ id, name, price, quantity: 1, image, maxQuantity });
    }

    this.save();
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.save();
  }

  updateQuantity(id: number, quantity: number) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.quantity = Math.min(Math.max(1, quantity), item.maxQuantity);
      this.save();
    }
  }

  toggleItem(id: number, name: string, price: number, image: string, maxQuantity: number) {
    if (this.isInCart(id)) {
      this.removeItem(id);
    } else {
      this.addItem(id, name, price, image, maxQuantity);
    }
  }

  isInCart(id: number): boolean {
    return this.items.some(item => item.id === id);
  }

  private save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    }
  }
}

export const cart = new CartStore();
