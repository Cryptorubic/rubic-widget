import { availableFeeValues } from './constants/available-fee-values';
import {Configuration, InjectTokensBlockchains, InjectTokensQuery} from './models/configuration';
import {IframeType} from './models/iframe-type';
import queryString from 'query-string';
import stringify from 'stringify-object';
import { BLOCKCHAIN_NAME } from './models/BLOCKCHAIN_NAME';

export class RubicWidget {
    private static widthBreakpoint = 1180;

    private static sizes = {
        vertical: {
            height: 500,
            width: 350
        },
        horizontal: {
            height: 180,
            width: 1180
        }
    }

    private static rootId = 'rubic-widget-root';

    private static iframeId = 'rubic-widget-iframe';

    private static placeholderId = 'rubic-widget-placeholder';

    private iframeAppearance: IframeType;

    private isWidgetIntoViewport: boolean;

    private resizeObserver: ResizeObserver;

    private configuration: Configuration = {
        language: 'en',
        from: 'ETH',
        to: 'RBC',
        fromChain: 'ETH' as BLOCKCHAIN_NAME,
        toChain: 'ETH' as BLOCKCHAIN_NAME,
        amount: 1,
        iframe: 'flex' as IframeType,
        hideSelectionFrom: false,
        hideSelectionTo: true,
        background: 'linear-gradient(45deg, black, #4aa956)',
        theme: 'dark',
        injectTokens: {},
        slippagePercent: {}
    }

    private get root(): HTMLElement | null {
        return document.getElementById(RubicWidget.rootId);
    }

    private get iframe(): HTMLElement | null {
        return document.getElementById(RubicWidget.iframeId);
    }

    private get placeholder(): HTMLElement | null {
        return document.getElementById(RubicWidget.placeholderId);
    }

    constructor() {
        (<any>window).onFrameLoad = () => {
            this.iframe.style.display = 'block';
            this.placeholder.remove();
            setTimeout(() => this.onViewportChange(true), 5000);
        }

        const fadeinAnimation = `
            <style>
                @keyframes fadein {
                    0%   { opacity:1; }
                    50%  { opacity:0.3; }
                    100% { opacity:1; }
                }
            </style>
        `;

        const rootStyles = `
           <style>
               #${RubicWidget.rootId} {
                   display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
               }
           </style>
        `

        this.addStyle([fadeinAnimation, rootStyles]);
    }

    public init(configuration?: Configuration, initialize = true): void {
        if (!configuration) {
            configuration = this.configuration;
        } else {
            this.checkConfiguration(configuration);
            this.configuration = configuration;
        }
        const root = this.tryGetRoot();
        this.iframe?.remove()
        this.placeholder?.remove()

        setTimeout(() => {
            if (initialize && configuration.iframe !== 'vertical' && configuration.iframe !== 'horizontal') {
                this.disable();
                this.addViewportChangeListener();
                this.resizeObserver = new ResizeObserver(this.onResize.bind(this));
                this.resizeObserver.observe(root);
            }

            let { injectTokens, iframe, slippagePercent, ...parameters } = configuration;
            const iframeType = this.getIframeType();
            this.iframeAppearance = iframeType;
            const device = window.innerWidth < 600 ? 'mobile' : 'desktop';
            parameters = {
                ...parameters,
                ...(slippagePercent?.instantTrades && { slippageIt:  slippagePercent.instantTrades }),
                ...(slippagePercent?.crossChain && { slippageCcr:  slippagePercent.crossChain }),
                ...this.getInjectedTokensObject(),
                device
            } as any;

            const query = queryString.stringify(parameters).replaceAll('&', '&amp;');

            const iframeNode = `
            <div id="rubic-widget-placeholder" style="
                background-color: ${configuration.theme === 'light' ? '#fbfbfb' : '#28372e'};
                height: ${RubicWidget.sizes[iframeType].height}px;
                width: ${RubicWidget.sizes[iframeType].width}px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 19px; 
                box-shadow: 3px 3px 10px 4px rgba(0, 0, 0, 0.1);
            ">
                <svg width="237" height="39" viewBox="0 0 237 39" fill="none" xmlns="http://www.w3.org/2000/svg" style="animation: fadein 1s infinite;">
                    <path d="M51.54 5.92C54.32 5.92 56.45 6.6 57.93 7.96C59.43 9.3 60.18 11.1 60.18 13.36C60.18 14.62 59.91 15.86 59.37 17.08C58.85 18.3 57.96 19.27 56.7 19.99L61.83 28H56.76L52.11 20.98H49.2V28H44.85V5.92H51.54ZM52.29 16.78C53.17 16.78 53.85 16.6 54.33 16.24C54.83 15.86 55.18 15.42 55.38 14.92C55.58 14.4 55.68 13.93 55.68 13.51C55.68 13.27 55.64 12.97 55.56 12.61C55.5 12.23 55.36 11.85 55.14 11.47C54.92 11.09 54.58 10.77 54.12 10.51C53.68 10.25 53.08 10.12 52.32 10.12H49.2V16.78H52.29ZM68.9564 28.63C67.7764 28.63 66.7864 28.27 65.9864 27.55C65.1864 26.81 64.7664 25.86 64.7264 24.7V14.89H68.9264V23.14C68.9664 23.72 69.1164 24.19 69.3764 24.55C69.6364 24.89 70.0764 25.06 70.6964 25.06C71.6364 25.06 72.3764 24.61 72.9164 23.71C73.4564 22.79 73.7264 21.63 73.7264 20.23V14.89H77.9264V28H74.1164L73.8164 25.9C73.3764 26.72 72.7464 27.38 71.9264 27.88C71.1064 28.38 70.1164 28.63 68.9564 28.63ZM90.8559 28.36C89.8559 28.36 88.9959 28.21 88.2759 27.91C87.5759 27.61 86.9659 27.2 86.4459 26.68V28H82.2459V4.33H86.4159V15.79C86.9359 15.35 87.6259 14.98 88.4859 14.68C89.3459 14.38 90.3259 14.23 91.4259 14.23C92.5659 14.23 93.6059 14.5 94.5459 15.04C95.4859 15.58 96.2359 16.37 96.7959 17.41C97.3759 18.43 97.6659 19.68 97.6659 21.16C97.6659 22.64 97.3459 23.92 96.7059 25C96.0859 26.08 95.2559 26.91 94.2159 27.49C93.1759 28.07 92.0559 28.36 90.8559 28.36ZM89.9259 24.82C90.5459 24.82 91.1159 24.66 91.6359 24.34C92.1759 24.02 92.6059 23.58 92.9259 23.02C93.2459 22.46 93.4059 21.83 93.4059 21.13C93.4059 20.43 93.2459 19.81 92.9259 19.27C92.6059 18.73 92.1759 18.31 91.6359 18.01C91.1159 17.69 90.5459 17.53 89.9259 17.53C89.1059 17.53 88.3859 17.72 87.7659 18.1C87.1459 18.48 86.7059 18.99 86.4459 19.63V22.84C87.1659 24.16 88.3259 24.82 89.9259 24.82ZM100.967 14.89H105.167V28H100.967V14.89ZM100.877 10.24C100.877 9.62 101.117 9.11 101.597 8.71C102.097 8.31 102.627 8.11 103.187 8.11C103.747 8.11 104.257 8.31 104.717 8.71C105.197 9.11 105.437 9.62 105.437 10.24C105.437 10.86 105.197 11.37 104.717 11.77C104.257 12.15 103.747 12.34 103.187 12.34C102.627 12.34 102.097 12.15 101.597 11.77C101.117 11.37 100.877 10.86 100.877 10.24ZM120.622 26.83C120.042 27.29 119.312 27.66 118.432 27.94C117.572 28.22 116.722 28.36 115.882 28.36C113.642 28.36 111.842 27.75 110.482 26.53C109.142 25.31 108.472 23.61 108.472 21.43C108.472 19.97 108.802 18.73 109.462 17.71C110.122 16.67 110.982 15.88 112.042 15.34C113.122 14.8 114.252 14.53 115.432 14.53C116.612 14.53 117.632 14.69 118.492 15.01C119.372 15.33 120.122 15.75 120.742 16.27L118.702 18.97C118.422 18.75 118.032 18.53 117.532 18.31C117.052 18.07 116.482 17.95 115.822 17.95C114.962 17.95 114.222 18.28 113.602 18.94C112.982 19.58 112.672 20.41 112.672 21.43C112.672 22.41 112.992 23.24 113.632 23.92C114.292 24.6 115.162 24.94 116.242 24.94C117.162 24.94 117.922 24.69 118.522 24.19L120.622 26.83ZM132.403 6.07H137.503L141.853 18.85L145.213 10.42L143.473 6.07H147.793L152.743 18.34L156.493 6.07H161.173L152.653 28.96L147.403 15.88L141.283 29.02L132.403 6.07ZM164.306 14.89H168.506V28H164.306V14.89ZM164.216 10.24C164.216 9.62 164.456 9.11 164.936 8.71C165.436 8.31 165.966 8.11 166.526 8.11C167.086 8.11 167.596 8.31 168.056 8.71C168.536 9.11 168.776 9.62 168.776 10.24C168.776 10.86 168.536 11.37 168.056 11.77C167.596 12.15 167.086 12.34 166.526 12.34C165.966 12.34 165.436 12.15 164.936 11.77C164.456 11.37 164.216 10.86 164.216 10.24ZM178.172 28.36C176.952 28.36 175.862 28.08 174.902 27.52C173.942 26.94 173.182 26.11 172.622 25.03C172.082 23.95 171.812 22.67 171.812 21.19C171.812 19.71 172.112 18.45 172.712 17.41C173.312 16.37 174.132 15.58 175.172 15.04C176.212 14.5 177.392 14.23 178.712 14.23C179.552 14.23 180.352 14.36 181.112 14.62C181.892 14.88 182.542 15.28 183.062 15.82V4.33H187.232V28H183.032V26.62C182.392 27.12 181.672 27.54 180.872 27.88C180.072 28.2 179.172 28.36 178.172 28.36ZM179.552 24.82C180.392 24.82 181.092 24.66 181.652 24.34C182.212 24 182.672 23.5 183.032 22.84V19.63C182.792 18.99 182.362 18.48 181.742 18.1C181.122 17.72 180.392 17.53 179.552 17.53C178.932 17.53 178.352 17.69 177.812 18.01C177.292 18.31 176.872 18.73 176.552 19.27C176.232 19.81 176.072 20.43 176.072 21.13C176.072 21.83 176.232 22.46 176.552 23.02C176.872 23.58 177.292 24.02 177.812 24.34C178.352 24.66 178.932 24.82 179.552 24.82ZM198.333 34.6C197.153 34.6 196.153 34.46 195.333 34.18C194.533 33.9 193.853 33.56 193.293 33.16C192.733 32.76 192.233 32.38 191.793 32.02L194.253 29.14C194.713 29.56 195.243 29.96 195.843 30.34C196.463 30.74 197.273 30.94 198.273 30.94C199.273 30.94 200.143 30.68 200.883 30.16C201.643 29.66 202.023 28.92 202.023 27.94V26.08C201.643 26.7 201.053 27.24 200.253 27.7C199.453 28.14 198.413 28.36 197.133 28.36C195.953 28.36 194.853 28.06 193.833 27.46C192.833 26.84 192.033 26.01 191.433 24.97C190.833 23.91 190.533 22.71 190.533 21.37C190.533 19.99 190.853 18.77 191.493 17.71C192.133 16.63 192.963 15.78 193.983 15.16C195.003 14.54 196.083 14.23 197.223 14.23C198.363 14.23 199.343 14.4 200.163 14.74C201.003 15.06 201.623 15.45 202.023 15.91L202.353 14.89H206.223V28C206.223 29.28 205.863 30.41 205.143 31.39C204.423 32.39 203.463 33.17 202.263 33.73C201.083 34.31 199.773 34.6 198.333 34.6ZM194.763 21.25C194.763 22.29 195.113 23.17 195.813 23.89C196.513 24.59 197.373 24.94 198.393 24.94C200.073 24.94 201.283 24.28 202.023 22.96V19.75C201.743 19.11 201.283 18.6 200.643 18.22C200.003 17.84 199.253 17.65 198.393 17.65C197.373 17.65 196.513 17.99 195.813 18.67C195.113 19.33 194.763 20.19 194.763 21.25ZM216.987 28.36C215.387 28.36 214.027 28.06 212.907 27.46C211.807 26.86 210.967 26.03 210.387 24.97C209.807 23.91 209.517 22.69 209.517 21.31C209.517 19.99 209.857 18.8 210.537 17.74C211.217 16.68 212.127 15.84 213.267 15.22C214.407 14.58 215.677 14.26 217.077 14.26C218.957 14.26 220.497 14.81 221.697 15.91C222.917 16.99 223.707 18.56 224.067 20.62L214.467 23.68C215.107 24.42 215.977 24.79 217.077 24.79C217.537 24.79 217.977 24.71 218.397 24.55C218.837 24.39 219.267 24.18 219.687 23.92L221.547 27.04C220.847 27.44 220.087 27.76 219.267 28C218.467 28.24 217.707 28.36 216.987 28.36ZM213.657 21.07C213.657 21.17 213.657 21.26 213.657 21.34L219.417 19.39C219.237 18.89 218.947 18.46 218.547 18.1C218.147 17.72 217.547 17.53 216.747 17.53C215.807 17.53 215.057 17.85 214.497 18.49C213.937 19.13 213.657 19.99 213.657 21.07ZM228.349 9.13H232.549V14.83H235.729V18.1H232.549V28H228.349V18.1H226.309V14.83H228.349V9.13Z" fill="#4AA956"/>
                    <path d="M33 9.72116L16.3095 0L0.0346275 9.54632L0 28.7788L16.4134 38.5L33 28.9886V9.72116ZM16.3442 2.93733L28.6716 10.1408L16.4134 17.3442L4.08604 10.1408L16.3442 2.93733ZM14.9244 34.5136L2.52781 27.3451V13.0082L14.8898 20.2116V34.5136H14.9244ZM18.1102 20.4214L30.4722 13.218V27.52L18.1102 34.7584V20.4214Z" fill="#4AA956"/>
                </svg>
            </div>
            <iframe
                id="rubic-widget-iframe"
                title="Rubic Widget"
                height="${RubicWidget.sizes[iframeType].height}"
                width="${RubicWidget.sizes[iframeType].width}"
                style="border: none; border-radius: 19px; box-shadow: 3px 3px 10px 4px rgba(0, 0, 0, 0.1); display: none;"
                src="https://${process.env.API_BASE_URL}/?iframe=${iframeType}${query ? '&amp;' + query : ''}"
                onload="onFrameLoad()"
            >
            </iframe>
            `;

            root.insertAdjacentHTML('afterbegin', iframeNode);
        })
    }

    public disable() {
        removeEventListener('DOMContentLoaded',this.onViewportChange, false);
        removeEventListener('load', this.onViewportChange, false);
        removeEventListener('scroll', this.onViewportChange, false);
        this.resizeObserver?.disconnect();
    }

    private onResize(): void {
        setTimeout(() => {
            if (this.configuration.iframe !== 'vertical' && this.configuration.iframe !== 'horizontal') {
                const rootWidth = this.root.getBoundingClientRect().width;
                if (
                    (this.iframeAppearance === 'vertical' && rootWidth >= RubicWidget.widthBreakpoint) ||
                    (this.iframeAppearance === 'horizontal' && rootWidth < RubicWidget.widthBreakpoint)
                ) {
                    this.init(null, false);
                } else {
                    setTimeout(this.onViewportChange);
                }
            }
        });
    }

    private getIframeType(): IframeType {
        const { iframe } = this.configuration;
        let iframeType: IframeType;
        if (iframe === 'horizontal' || iframe == 'vertical') {
            iframeType = iframe;
        } else {
            const positionInfo = this.root.getBoundingClientRect();
            iframeType = positionInfo.width < RubicWidget.widthBreakpoint ? 'vertical' : 'horizontal';
        }

        return iframeType;
    }

    private getInjectedTokensObject(): InjectTokensQuery {
        const result: InjectTokensQuery = {};
        const { injectTokens } = this.configuration;

        if (injectTokens) {
            Object.entries(injectTokens).forEach(([key, value]) => {
                const resultKey = `${key}_tokens` as `${InjectTokensBlockchains}_tokens`;
                result[resultKey] = JSON.stringify(value);
            })
        }

        return result;
    }

    private tryGetRoot(): HTMLElement {
        const root = this.root;
        if (!root) {
            console.error(`[RUBIC WIDGET] You should place <div id="${RubicWidget.rootId}"></div> into <body></body>`);
            throw new Error(`You should place <div id="${RubicWidget.rootId}"></div> into <body></body>`);
        }

        return root;
    }

    private addStyle(style: string | string[]) {
        if (Array.isArray(style)) {
            style.forEach(item => document.head.insertAdjacentHTML("beforeend", item))
            return;
        }
        document.head.insertAdjacentHTML("beforeend", style);
    }

    private addViewportChangeListener() {
        addEventListener('DOMContentLoaded',this.onViewportChange, false);
        addEventListener('load', this.onViewportChange, false);
        addEventListener('scroll', this.onViewportChange, false);
    }

    private onViewportChange = (force?: boolean | unknown) => {
        const root = this.tryGetRoot();
        const iframe = root.querySelector('iframe');
        if (!iframe || iframe?.style.display === 'none') {
         return;
        }

        const isWidgetIntoViewport = RubicWidget.isElementInViewport(iframe);
        if (this.isWidgetIntoViewport === isWidgetIntoViewport && force !== true) {
            return;
        }

        this.isWidgetIntoViewport = isWidgetIntoViewport;
        const msg = {
            name: 'widget-into-viewport',
            widgetIntoViewport: isWidgetIntoViewport
        }
        try {
            iframe.contentWindow.postMessage(msg, `https://${process.env.API_BASE_URL}`)
        } catch (e) {
            console.debug(e);
        }
    }

    private static isElementInViewport(element: HTMLElement) {
        const box = element.getBoundingClientRect();

        return (
            box.bottom > 0 &&
            box.right > 0 &&
            box.top < (window.innerHeight || document.documentElement.clientHeight) &&
            box.left < (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    private checkConfiguration(configuration: Configuration) {
        this.checkFee(configuration);
        const checkTokenIncluded = (token: string, blockchain: InjectTokensBlockchains) => {
            if(!configuration.injectTokens?.[blockchain]?.some(item => item.toLowerCase() === token.toLowerCase())) {
                const configurationClone = JSON.parse(JSON.stringify(configuration));
                configurationClone.injectTokens = {
                    [blockchain]: [token]
                };
                const prettyConfigurationClone = stringify(configurationClone, {
                    indent: '  ',
                    singleQuotes: false
                });

                console.error(
                    `[RUBIC WIDGET]  ERROR: if you are using a custom token (${token}) you must include it in the injected tokens in the configuration. Try adding the following code to the config:` +
                    '\n\n' +
                    `var configuration = ${prettyConfigurationClone}` +
                    '\n\n' +
                    'Please visit https://github.com/Cryptorubic/rubic-widget for more details.'
                )
            }
        }

        configuration.from.startsWith('0x') && checkTokenIncluded(configuration.from, configuration.fromChain.toLowerCase() as InjectTokensBlockchains);
        configuration.to.startsWith('0x') && checkTokenIncluded(configuration.to, configuration.toChain.toLowerCase() as InjectTokensBlockchains);
    }

    private checkFee(configuration: Configuration): void {
        if (configuration.promoCode && !(configuration.fee || configuration.feeTarget)) {
            this.feeAndFeeTargetAreNotSet(configuration);
        }

        if (configuration.promoCode && !configuration.fee) {
            this.feeIsNotSet(configuration);
        }

        if (configuration.promoCode && !configuration.feeTarget) {
            this.feeTargetIsNotSet(configuration);
        }

        if (configuration.fee && !configuration.feeTarget) {
            this.feeTargetIsNotSet(configuration);
        }

        if (configuration.feeTarget && !configuration.fee) {
            this.feeIsNotSet(configuration);
        }

        if (configuration.fee && !(availableFeeValues as ReadonlyArray<number>).includes(Number(configuration.fee))) {
            this.wrongFeeValue(configuration);
        }
    }

    private feeAndFeeTargetAreNotSet(configuration: Configuration): never {
        const configurationClone = JSON.parse(JSON.stringify(configuration));
        configurationClone.fee = this.getAvailableFeeValuesString();
        configurationClone.feeTarget = `<the address to which fee will be sent>`;
        this.throw('When using promocode you must specify fee and feeTarget', configurationClone);
    }

    private feeIsNotSet(configuration: Configuration): never {
        const configurationClone = JSON.parse(JSON.stringify(configuration));
        configurationClone.fee = this.getAvailableFeeValuesString();
        this.throw('Fee is not specified', configurationClone);
    }

    private feeTargetIsNotSet(configuration: Configuration): never {
        const configurationClone = JSON.parse(JSON.stringify(configuration));
        configurationClone.feeTarget = `<the address to which fee will be sent>`;
        this.throw('Fee target is not specified', configurationClone);
    }

    private wrongFeeValue(configuration: Configuration): never {
        const configurationClone = JSON.parse(JSON.stringify(configuration));
        configurationClone.fee = this.getAvailableFeeValuesString();
        this.throw('Wrong fee value set', configurationClone);
    }

    private throw(message: string, correctConfiguration: object): never {
        const prettyConfigurationClone = stringify(correctConfiguration, {
            indent: '  ',
            singleQuotes: false
        });

        throw new Error(
            `[RUBIC WIDGET] ERROR: ${message}. Try adding the following code to the config:` +
            '\n\n' +
            `var configuration = ${prettyConfigurationClone}` +
            '\n\n' +
            'Please visit https://github.com/Cryptorubic/rubic-widget for more details.'
        );
    }

    private getAvailableFeeValuesString(): string | number {
        if (availableFeeValues.length > 1) {
            return `<${availableFeeValues.join(' or ')}>`;
        }
        return availableFeeValues[0];
    }
}
