"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ToastVariant = "default" | "success" | "error";
type Toast = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  notify: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string, variant: ToastVariant = "default") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, variant }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2800);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ message: string; variant?: ToastVariant }>;
      if (ce.detail?.message) notify(ce.detail.message, ce.detail.variant);
    };
    window.addEventListener("babymo:toast", handler as EventListener);
    return () =>
      window.removeEventListener("babymo:toast", handler as EventListener);
  }, [notify]);

  const value = useMemo<ToastContextValue>(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto animate-slide-up rounded-full px-5 py-3 text-sm font-bold shadow-pop backdrop-blur ${
              t.variant === "success"
                ? "bg-grass-400 text-white ring-2 ring-white"
                : t.variant === "error"
                  ? "bg-tangerine-400 text-white ring-2 ring-white"
                  : "bg-white text-ink-900 ring-2 ring-grass-200"
            }`}
            role="status"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
