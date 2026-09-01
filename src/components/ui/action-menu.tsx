"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Trash2, Eye, Copy, Download, ExternalLink } from "lucide-react";

interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
  disabled?: boolean;
  separator?: boolean;
}

interface ActionMenuProps {
  actions: ActionItem[];
  className?: string;
}

export function ActionMenu({ actions, className = "" }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleActionClick = (action: ActionItem) => {
    if (!action.disabled) {
      action.onClick();
      setIsOpen(false);
    }
  };

  return (
    <div ref={menuRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Actions"
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="py-1">
            {actions.map((action, index) => {
              if (action.separator) {
                return (
                  <div
                    key={`separator-${index}`}
                    className="my-1 border-t border-gray-100"
                  />
                );
              }

              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => handleActionClick(action)}
                  disabled={action.disabled}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors ${
                    action.variant === "danger"
                      ? "text-red-600 hover:bg-red-50"
                      : "text-gray-700 hover:bg-gray-50"
                  } ${action.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {action.icon}
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function createActionItems(config: {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  onOpenExternal?: () => void;
}): ActionItem[] {
  const actions: ActionItem[] = [];

  if (config.onView) {
    actions.push({
      label: "View",
      icon: <Eye className="h-4 w-4" />,
      onClick: config.onView,
    });
  }

  if (config.onEdit) {
    actions.push({
      label: "Edit",
      icon: <Pencil className="h-4 w-4" />,
      onClick: config.onEdit,
    });
  }

  if (config.onCopy) {
    actions.push({
      label: "Copy",
      icon: <Copy className="h-4 w-4" />,
      onClick: config.onCopy,
    });
  }

  if (config.onDownload) {
    actions.push({
      label: "Download",
      icon: <Download className="h-4 w-4" />,
      onClick: config.onDownload,
    });
  }

  if (config.onOpenExternal) {
    actions.push({
      label: "Open in new tab",
      icon: <ExternalLink className="h-4 w-4" />,
      onClick: config.onOpenExternal,
    });
  }

  if (config.onDelete) {
    actions.push({ label: "", onClick: () => {}, separator: true });
    actions.push({
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: config.onDelete,
      variant: "danger",
    });
  }

  return actions;
}
