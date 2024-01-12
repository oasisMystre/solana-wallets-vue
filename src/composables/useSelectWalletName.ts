import { computed, Ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

import type { WalletName } from "@solana/wallet-adapter-base";
import { SolanaMobileWalletAdapterWalletName } from "@solana-mobile/wallet-adapter-mobile";

/**
 * Selects a wallet from its name and stores it in local storage.
 */
export function useSelectWalletName(
  localStorageKey: string,
  isMobile: Ref<boolean>,
  defaultWalletName: WalletName | null = SolanaMobileWalletAdapterWalletName
): {
  name: Ref<string | null>;
  isUsingMwaAdapter: Ref<boolean>;
  isUsingMwaAdapterOnMobile: Ref<boolean>;
  select: (name: WalletName) => void;
  deselect: (force?: boolean) => void;
} {
  const name: Ref<WalletName | null> = useLocalStorage<WalletName | null>(
    localStorageKey,
    isMobile.value ? defaultWalletName : null
  );

  const isUsingMwaAdapter = computed<boolean>(
    () => name.value === SolanaMobileWalletAdapterWalletName
  );

  const isUsingMwaAdapterOnMobile = computed<boolean>(
    () => isUsingMwaAdapter.value && isMobile.value
  );

  const select = (walletName: WalletName): void => {
    if (name.value !== walletName) {
      name.value = walletName;
    }
  };

  const deselect = (force = true): void => {
    if (force || isUsingMwaAdapter.value) {
      name.value = null;
    }
  };

  return {
    name,
    isUsingMwaAdapter,
    isUsingMwaAdapterOnMobile,
    select,
    deselect,
  };
}
