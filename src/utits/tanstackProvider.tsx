"use client";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function TanstackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const useQuery = new QueryClient();
  return (
    <QueryClientProvider client={useQuery}>{children}</QueryClientProvider>
  );
}
