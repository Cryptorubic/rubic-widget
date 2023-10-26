export interface Configuration {
    // Trade Params
    from?: string;
    to?: string;
    fromChain?: string;
    toChain?: string;
    amount?: number;
    // UIU Params
    iframe?: boolean;
    hideSelectionFrom?: boolean;
    hideSelectionTo?: boolean;
    language?: 'en' | 'es' | 'ko' | 'ru' | 'zh' | 'tr' | 'fr';
    theme?: 'dark' | 'light';
    // Swap Params
    injectTokens?: Record<string, string[]>;
    slippagePercent?: {
        instantTrades?: number;
        crossChain?: number;
    }
    enabledProviders?: string[];
    enabledBlockchains?: string[];
    crossChainIntegratorAddress?: string;
    onChainIntegratorAddress?: string;
}
