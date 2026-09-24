// AI-GENERATED: Qoder
import { useEffect, useMemo, useState } from "react";

import api from "../api/client";
import ProductCard from "../components/ProductCard";
import type { Category, Product } from "../types";

type SortKey = "-created_at" | "price" | "-price" | "name";

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("-created_at");

  useEffect(() => {
    api
      .get<Category[]>("/categories/")
      .then((r) => setCategories(r.data))
      .catch(() => setError("Не удалось загрузить категории."));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    const timeout = setTimeout(() => {
      api
        .get<Product[]>("/products/", {
          params: {
            search: search || undefined,
            category: category !== "all" ? category : undefined,
            ordering: sort,
          },
        })
        .then((r) => {
          if (!cancelled) setProducts(r.data);
        })
        .catch(() => {
          if (!cancelled) setError("Не удалось загрузить товары.");
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [search, category, sort]);

  const total = useMemo(() => products.length, [products]);

  return (
    <main className="container">
      <section className="hero">
        <p>ZhoraStore</p>
        <h1>Интернет-магазин техники</h1>
        <p>Найдите нужный товар быстро и удобно. Цены в тенге.</p>
      </section>

      <div className="filters">
        <input
          type="text"
          placeholder="Поиск товара..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">Все категории</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
          <option value="-created_at">Сначала новые</option>
          <option value="price">Цена: по возрастанию</option>
          <option value="-price">Цена: по убыванию</option>
          <option value="name">Название: А-Я</option>
        </select>
      </div>

      <div className="section-title">
        <h2>Каталог</h2>
        <p>Найдено товаров: {total}</p>
      </div>

      {loading ? (
        <div className="status">Загрузка товаров...</div>
      ) : error ? (
        <div className="status">Ошибка: {error}</div>
      ) : products.length === 0 ? (
        <div className="empty">
          <h2>Товары не найдены</h2>
          <p>Попробуйте изменить поиск или категорию.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Catalog;
