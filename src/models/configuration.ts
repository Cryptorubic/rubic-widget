import {BLOCKCHAIN_NAME} from "./BLOCKCHAIN_NAME";
import {IframeType} from "./iframe-type";

export interface Configuration {
    language: 'en' | 'ru';
    from: string;
    to: string;
    fromChain: BLOCKCHAIN_NAME;
    toChain: BLOCKCHAIN_NAME;
    amount: string;
    iframe: IframeType;
    hideSelectionFrom: boolean;
    hideSelectionTo: boolean;
    background: string;
    theme: 'dark' | 'light';
}
