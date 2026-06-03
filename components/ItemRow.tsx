"use client";

import { motion } from "framer-motion";
import { Check, Minus, Plus, X } from "lucide-react";
import type { Item } from "@/lib/compras";

interface ItemRowProps {
  item: Item;
  onToggle: () => void;
  onChangeQty: (delta: number) => void;
  onRemove: () => void;
}

export function ItemRow({ item, onToggle, onChangeQty, onRemove }: ItemRowProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -12 }}
      className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-black/5"
    >
      {/* Marcar como pego */}
      <button
        onClick={onToggle}
        aria-label={item.done ? "Desmarcar item" : "Marcar como pego"}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
          item.done ? "border-transparent text-white" : "border-black/20 text-transparent"
        }`}
        style={item.done ? { backgroundColor: "var(--color-accent)" } : undefined}
      >
        <Check size={14} strokeWidth={3} />
      </button>

      {/* Nome */}
      <span
        className={`flex-1 truncate text-base transition ${
          item.done ? "text-ink/40 line-through" : "text-ink"
        }`}
      >
        {item.name}
      </span>

      {/* Quantidade */}
      {!item.done && (
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            onClick={() => onChangeQty(-1)}
            aria-label="Diminuir quantidade"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5 text-ink/60 transition active:scale-90 hover:bg-black/10"
          >
            <Minus size={14} />
          </button>
          <span className="w-5 text-center text-sm font-bold tabular-nums">{item.quantity}</span>
          <button
            onClick={() => onChangeQty(1)}
            aria-label="Aumentar quantidade"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5 text-ink/60 transition active:scale-90 hover:bg-black/10"
          >
            <Plus size={14} />
          </button>
        </div>
      )}

      {/* Quantidade fixa quando já pego */}
      {item.done && item.quantity > 1 && (
        <span className="shrink-0 text-sm font-medium text-ink/40">×{item.quantity}</span>
      )}

      {/* Remover */}
      <button
        onClick={onRemove}
        aria-label="Remover item"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink/30 transition hover:text-red-500"
      >
        <X size={16} />
      </button>
    </motion.li>
  );
}
