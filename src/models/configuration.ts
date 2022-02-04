import {BLOCKCHAIN_NAME} from "./BLOCKCHAIN_NAME";
import {IframeType} from "./iframe-type";

export type InjectTokensBlockchains = 'eth' | 'bsc' | 'polygon' | 'harmony' | 'avalanche';

export type InjectTokensQuery = Partial<{
    [key in InjectTokensBlockchains as `${key}_tokens`]: string;
}>;

export interface Configuration {
    language?: 'en' | 'ru';
    from?: string;
    to?: string;
    fromChain?: BLOCKCHAIN_NAME;
    toChain?: BLOCKCHAIN_NAME;
    amount?: number;
    iframe?: IframeType;
    hideSelectionFrom?: boolean;
    hideSelectionTo?: boolean;
    slippagePercent?: {
        instantTrades?: number;
        crossChain?: number;
    }
    background?: string;
    theme?: 'dark' | 'light';
    injectTokens?: Partial<Record<InjectTokensBlockchains, string[]>>;
    promoCode?: string;
    fee?: 0.1 | 0.2;
    feeTarget?: string;
}
