import { useHref, useNavigate, NavigateOptions } from "react-router-dom";
import { HeroUIProvider } from "@heroui/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { FileProvider } from "@/context/FileContext";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <QueryClientProvider client={queryClient}>
        <FileProvider>{children}</FileProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
