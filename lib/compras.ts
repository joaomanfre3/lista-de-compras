// Tipos, categorias e utilidades da lista de compras — lógica pura, sem React.

export type CategoryId =
  | "hortifruti"
  | "acougue"
  | "laticinios"
  | "padaria"
  | "mercearia"
  | "limpeza"
  | "bebidas"
  | "outros";

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
  color: string;
}

// Ordem reflete um percurso típico de supermercado.
export const CATEGORIES: Category[] = [
  { id: "hortifruti", label: "Hortifruti", emoji: "🥬", color: "#22c55e" },
  { id: "padaria", label: "Padaria", emoji: "🍞", color: "#f59e0b" },
  { id: "acougue", label: "Açougue", emoji: "🥩", color: "#ef4444" },
  { id: "laticinios", label: "Laticínios e Frios", emoji: "🧀", color: "#3b82f6" },
  { id: "mercearia", label: "Mercearia", emoji: "🛒", color: "#8b5cf6" },
  { id: "bebidas", label: "Bebidas", emoji: "🥤", color: "#ec4899" },
  { id: "limpeza", label: "Limpeza", emoji: "🧼", color: "#06b6d4" },
  { id: "outros", label: "Outros", emoji: "📦", color: "#64748b" },
];

export function categoryOf(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1];
}

export interface Item {
  id: string;
  name: string;
  quantity: number;
  category: CategoryId;
  done: boolean;
  createdAt: number;
}

export interface Group {
  category: Category;
  items: Item[];
}

/**
 * Agrupa os itens por categoria, na ordem do percurso. Dentro do grupo,
 * pendentes primeiro e pegos no fim. Categorias vazias são omitidas.
 */
export function groupByCategory(items: Item[]): Group[] {
  return CATEGORIES.map((category) => ({
    category,
    items: items
      .filter((i) => i.category === category.id)
      .sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        return a.createdAt - b.createdAt;
      }),
  })).filter((g) => g.items.length > 0);
}

export interface Counts {
  total: number;
  done: number;
}

export function countItems(items: Item[]): Counts {
  return { total: items.length, done: items.filter((i) => i.done).length };
}
