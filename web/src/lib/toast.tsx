import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

export type ToastVariant = "success" | "info" | "warning" | "error";

interface Toast {
  id: number;
  variant: ToastVariant;
  message: string;
  duration: number;
}

interface ToastContextValue {
  toast: (
    message: string,
    opts?: { variant?: ToastVariant; duration?: number },
  ) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback<ToastContextValue["toast"]>(
    (message, opts) => {
      const id = ++idRef.current;
      const variant = opts?.variant ?? "success";
      const duration = opts?.duration ?? 3000;
      setToasts((t) => [...t, { id, variant, message, duration }]);
    },
    [],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

const variantConfig: Record<
  ToastVariant,
  { icon: typeof CheckCircle2; bg: string; iconColor: string }
> = {
  success: {
    icon: CheckCircle2,
    bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  info: {
    icon: Info,
    bg: "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  error: {
    icon: AlertTriangle,
    bg: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
};

function Toaster({
  toasts,
  dismiss,
}: {
  toasts: Toast[];
  dismiss: (id: number) => void;
}) {
  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  const config = variantConfig[toast.variant];
  const Icon = config.icon;

  useEffect(() => {
    const t = setTimeout(onDismiss, toast.duration);
    return () => clearTimeout(t);
  }, [onDismiss, toast.duration]);

  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-start gap-2.5 max-w-sm rounded-lg border shadow-lg backdrop-blur-sm px-3.5 py-2.5 text-sm animate-slide-up ${config.bg}`}
      data-testid={`toast-${toast.variant}`}
    >
      <Icon
        className={`flex-shrink-0 mt-0.5 ${config.iconColor}`}
        size={18}
        aria-hidden="true"
      />
      <p className="flex-1 text-slate-800 dark:text-slate-100 leading-snug">
        {toast.message}
      </p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
