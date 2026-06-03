"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import {
  type CategoryId,
  type Item,
  countItems,
  groupByCategory,
} from "@/lib/compras";
import { AddBar } from "@/components/AddBar";
import { ItemRow } from "@/components/ItemRow";

const STORAGE_KEY = "lista-de-compras:v1";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Carrega a lista salva.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* localStorage indisponível */
    }
    setHydrated(true);
  }, []);

  // Persiste a cada mudança.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* cota cheia / modo privado */
    }
  }, [items, hydrated]);

  const groups = useMemo(() => groupByCategory(items), [items]);
  const counts = useMemo(() => countItems(items), [items]);
  const progress = counts.total > 0 ? (counts.done / counts.total) * 100 : 0;

  function addItem(name: string, category: CategoryId) {
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, quantity: 1, category, done: false, createdAt: Date.now() },
    ]);
  }

  function updateItem(id: string, patch: Partial<Item>) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }

  function changeQty(id: string, delta: number) {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i,
      ),
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearDone() {
    setItems((prev) => prev.filter((i) => !i.done));
  }

  if (!hydrated) return null;

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 py-8">
      {/* Cabeçalho com progresso */}
      <header>
        <div className="flex items-center gap-2">
          <ShoppingCart size={26} style={{ color: "var(--color-accent)" }} />
          <h1 className="text-2xl font-extrabold tracking-tight">Lista de Compras</h1>
        </div>
        {counts.total > 0 && (
          <>
            <div className="mb-1 mt-3 flex items-center justify-between text-sm text-ink/50">
              <span>
                {counts.done} de {counts.total} no carrinho
              </span>
              <span className="tabular-nums">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-black/5">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "var(--color-accent)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </>
        )}
      </header>

      <AddBar onAdd={addItem} />

      {/* Lista agrupada por corredor */}
      {groups.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-center text-ink/40">
          <ShoppingCart size={30} strokeWidth={1.5} />
          <p className="text-sm">Sua lista está vazia. Adicione o primeiro item acima!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {groups.map((group) => (
            <section key={group.category.id}>
              <h2 className="mb-2 flex items-center gap-2 px-1 text-sm font-bold uppercase tracking-wide">
                <span aria-hidden>{group.category.emoji}</span>
                <span style={{ color: group.category.color }}>{group.category.label}</span>
                <span className="text-ink/30">{group.items.length}</span>
              </h2>
              <ul className="flex flex-col gap-2">
                <AnimatePresence initial={false}>
                  {group.items.map((item) => (
                    <ItemRow
                      key={item.id}
                      item={item}
                      onToggle={() => updateItem(item.id, { done: !item.done })}
                      onChangeQty={(delta) => changeQty(item.id, delta)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </AnimatePresence>
              </ul>
            </section>
          ))}
        </div>
      )}

      {/* Limpar pegos */}
      {counts.done > 0 && (
        <button
          onClick={clearDone}
          className="mx-auto mt-1 text-sm font-medium text-ink/40 underline-offset-4 transition hover:text-accent hover:underline"
        >
          Limpar {counts.done} {counts.done > 1 ? "itens pegos" : "item pego"}
        </button>
      )}
    </main>
  );
}
