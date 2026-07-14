import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * DataTable — Tableau de données brandbook-compliant
 *
 * Variantes :
 * - default : fond blanc, entête cacao
 * - gold : entête or
 * - forest : entête vert profond
 * - bordered : bordures cacao sur toutes les cellules
 */

export interface DataTableColumn<T> {
  key: keyof T | string;
  label: string;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T) => React.ReactNode;
}

export type DataTableVariant = "default" | "gold" | "forest" | "bordered";

const headerClasses: Record<DataTableVariant, string> = {
  default: "bg-cri-cacao text-white",
  gold: "bg-cri-gold text-cri-humus",
  forest: "bg-cri-forest text-white",
  bordered: "bg-cri-parchment text-cri-forest border-b-2 border-cri-cacao",
};

export interface DataTableProps<T = Record<string, unknown>> {
  columns: DataTableColumn<T>[];
  rows: T[];
  variant?: DataTableVariant;
  caption?: string;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  variant = "default",
  caption,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        {caption && (
          <caption className="text-cri-humus mb-3 caption-top text-left text-sm italic">
            {caption}
          </caption>
        )}
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className={cn(
                  "text-label px-4 py-3 font-bold uppercase tracking-wider",
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right",
                  !col.align && "text-left",
                  headerClasses[variant]
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={cn(
                "transition-colors",
                rowIdx % 2 === 0 ? "bg-white" : "bg-cri-parchment/40",
                "hover:bg-cri-gold/10"
              )}
            >
              {columns.map((col) => {
                const value = row[col.key as keyof T];
                return (
                  <td
                    key={String(col.key)}
                    className={cn(
                      "text-cri-humus px-4 py-3",
                      variant === "bordered" && "border-cri-border border-b",
                      col.align === "center" && "text-center",
                      col.align === "right" && "text-right"
                    )}
                  >
                    {col.render ? col.render(value, row) : (value as React.ReactNode)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
