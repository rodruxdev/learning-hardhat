"use client"
import React from 'react'
import { WagmiProvider } from "wagmi";
import { config } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Web3Provider = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
          {children}

          </QueryClientProvider>
        </WagmiProvider>
  )
}

export default Web3Provider