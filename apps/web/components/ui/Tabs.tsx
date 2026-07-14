"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Tabs — Onglets animés (Brandbook CRI v6)
 *
 * Accessible (role="tablist", keyboard nav), animé au changement.
 *
 * Usage :
 *   const tabs = [
 *     { id: "cacao", label: "Cacao", content: <CacaoPanel /> },
 *     { id: "provendes", label: "Provendes", content: <ProvendesPanel /> },
 *   ];
 *   <Tabs items={tabs} defaultValue="cacao" />
 */

export interface TabsItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabsItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (id: string) => void;
  variant?: "default" | "pills" | "underline";
  className?: string;
  tabsClassName?: string;
  contentClassName?: string;
}

const variantClasses = {
  default: {
    list: "bg-cri-parchment border-b-2 border-cri-cacao/20",
    trigger:
      "data-[active=true]:bg-cri-cacao data-[active=true]:text-cri-parchment data-[active=true]:shadow-cri",
    triggerInactive: "text-cri-humus hover:text-cri-cacao",
  },
  pills: {
    list: "bg-cri-cream/60 rounded-cri p-1.5 gap-1.5",
    trigger:
      "data-[active=true]:bg-cri-forest data-[active=true]:text-white data-[active=true]:shadow-cri",
    triggerInactive: "text-cri-humus hover:text-cri-forest",
  },
  underline: {
    list: "border-b-2 border-cri-cacao/30 gap-0",
    trigger:
      "data-[active=true]:border-b-2 data-[active=true]:border-cri-cacao data-[active=true]:text-cri-cacao",
    triggerInactive: "text-cri-humus hover:text-cri-canopy border-b-2 border-transparent",
  },
} as const;

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultValue,
  value: controlledValue,
  onValueChange,
  variant = "pills",
  className,
  tabsClassName,
  contentClassName,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? items[0]?.id);
  const value = controlledValue ?? internalValue;
  const prefersReducedMotion = useReducedMotion();

  const setValue = (id: string) => {
    if (controlledValue === undefined) setInternalValue(id);
    onValueChange?.(id);
  };

  // Keyboard nav
  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    const item = items[next];
    if (item && !item.disabled) setValue(item.id);
  };

  const current = items.find((i) => i.id === value);
  const styles = variantClasses[variant];

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn("flex flex-wrap items-center", styles.list, tabsClassName)}
      >
        {items.map((item, idx) => {
          const isActive = item.id === value;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.id}`}
              id={`tab-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => !item.disabled && setValue(item.id)}
              onKeyDown={(e) => onKeyDown(e, idx)}
              data-active={isActive}
              className={cn(
                "rounded-cri inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold uppercase tracking-wider transition-all",
                isActive ? styles.trigger : styles.triggerInactive,
                item.disabled && "cursor-not-allowed opacity-40"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        className={cn("mt-6", contentClassName)}
      >
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {current.content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/**
 * Accordion — Panneau dépliable animé
 */
export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  type = "single",
  defaultValue,
  className,
}) => {
  const [open, setOpen] = React.useState<string[]>(() => {
    if (Array.isArray(defaultValue)) return defaultValue;
    if (typeof defaultValue === "string") return [defaultValue];
    return [];
  });
  const prefersReducedMotion = useReducedMotion();

  const toggle = (id: string) => {
    setOpen((prev) => {
      const isOpen = prev.includes(id);
      if (type === "single") {
        return isOpen ? [] : [id];
      }
      return isOpen ? prev.filter((p) => p !== id) : [...prev, id];
    });
  };

  return (
    <div className={cn("divide-cri-cacao/20 border-cri-cacao/20 divide-y border-y", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`acc-${item.id}`}
              className="hover:bg-cri-cream/40 rounded-cri -mx-2 flex w-full items-center justify-between gap-4 px-2 py-4 text-left transition-colors"
            >
              <span className="text-cri-forest flex items-center gap-3 font-serif text-lg font-bold">
                {item.icon}
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-cri-cacao flex-shrink-0"
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`acc-${item.id}`}
                  initial={
                    prefersReducedMotion
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  animate={{ height: "auto", opacity: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="text-cri-humus pb-5 leading-relaxed">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
