import { useEffect, useState } from "react";

export function useHashRoute(): string {
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#/, "") || "/");
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export function routeParts(route: string): string[] {
  return route.replace(/^\/+/, "").split("/").filter(Boolean);
}

export function navigate(path: string) {
  window.location.hash = path;
}

export function Link({
  to,
  className,
  children,
  onClick,
  style,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <a href={"#" + to} onClick={onClick} className={className} style={style}>
      {children}
    </a>
  );
}
