import type { Ref } from "vue";

import type { Cluster } from "@solana/web3.js";
import type { WalletName } from "@solana/wallet-adapter-base";
import type { Adapter, WalletError } from "@solana/wallet-adapter-base";

export type WalletStoreProps = {
  defaultWalletName?: WalletName | null,
  wallets?: Adapter[] | Ref<Adapter[]>;
  autoConnect?: boolean | Ref<boolean>;
  cluster?: Cluster | Ref<Cluster>;
  onError?: (error: WalletError, adapter?: Adapter) => void;
  localStorageKey?: string;
};
