"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PrintButtonProps {
  targetRef?: React.RefObject<HTMLElement>;
  label?: string;
  variant?: "default" | "outline" | "ghost";
  className?: string;
}

export function PrintButton({
  targetRef,
  label,
  variant = "outline",
  className,
}: PrintButtonProps) {
  function handlePrint() {
    if (targetRef?.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print</title>
              <style>
                body { font-family: system-ui, sans-serif; padding: 20px; }
              </style>
            </head>
            <body>
              ${targetRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    } else {
      window.print();
    }
  }

  return (
    <Button
      variant={variant}
      onClick={handlePrint}
      className={cn("gap-2", className)}
    >
      <Printer className="h-4 w-4" />
      {label ?? "Print"}
    </Button>
  );
}
