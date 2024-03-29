import { http, createConfig } from "wagmi";
import { localhost } from "wagmi/chains";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [localhost],
  transports: {
    [localhost.id]: http(),
    // [sepolia.id]: http(),
  },
});
