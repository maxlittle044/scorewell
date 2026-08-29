"use client";

import { Button } from "@/components/ui/button";

/**
 * Opens the browser's print dialog, which is also where "save as PDF" lives on every
 * major platform — so this covers both without shipping a PDF library.
 */
export function PrintButton() {
  return (
    <Button size="sm" onClick={() => window.print()}>
      Print or save as PDF
    </Button>
  );
}
