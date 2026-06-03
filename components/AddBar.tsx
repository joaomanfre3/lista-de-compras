"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { type CategoryId, CATEGORIES } from "@/lib/compras";

interface AddBarProps {
  onAdd: (name: string, category: CategoryId) => void;
}

export function AddBar({ onAdd }: AddBarProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<CategoryId>("hortifruti");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, category);
    setName(""); // mantém a categoria pra adicionar vários do mesmo corredor
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Adicionar item..."
          maxLength={40}
          className="flex-1 bg-transparent px-2 py-2 text-base outline-none placeholder:text-ink/40"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          aria-label="Adicionar item"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition active:scale-90 disabled:opacity-30"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          <Plus size={22} />
        </button>
      </div>

      {/* Escolha do corredor */}
      <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => {
          const active = c.id === category;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                active ? "text-white" : "bg-black/5 text-ink/60 hover:bg-black/10"
              }`}
              style={active ? { backgroundColor: c.color } : undefined}
            >
              <span aria-hidden>{c.emoji}</span>
              {c.label}
            </button>
          );
        })}
      </div>
    </form>
  );
}
