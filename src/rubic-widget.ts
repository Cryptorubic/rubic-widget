import {Configuration} from "./models/configuration";
import {IframeType} from "./models/iframe-type";
import queryString from 'query-string';

export class RubicWidget {
    private static widthBreakpoint = 1180;

    private static sizes = {
        vertical: {
            height: 500,
            width: 375
        },
        horizontal: {
            height: 180,
            width: 1180
        }
    }

    private static rootId = 'rubic-widget-root';

    public init(configuration: Configuration) {
        const root = document.getElementById(RubicWidget.rootId);
        if (!root) {
            console.error(`You should place <div id="${RubicWidget.rootId}"></div> into <body></body>`);
            return;
        }
        const positionInfo = root.getBoundingClientRect();
        root.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center
        `;

        const { injectTokens, iframe, ...parameters } = configuration;

        let iframeType: IframeType;
        if (iframe === 'horizontal' || iframe == 'vertical') {
            iframeType = iframe;
        } else {
            iframeType = positionInfo.width < RubicWidget.widthBreakpoint ? 'vertical' : 'horizontal';
        }

        if (injectTokens) {
            Object.entries(injectTokens).forEach(([key, value]) => {
                (<any>parameters)[`${key}_tokens`] = JSON.stringify(value);
            })
        }



        const query = queryString.stringify(parameters).replaceAll('&', '&amp;');

        const iframeNode = `
        <iframe
            frameborder="0"
            height="${RubicWidget.sizes[iframeType].height}"
            width="${RubicWidget.sizes[iframeType].width}"
            style="border-radius: 19px"
            src="https://${process.env.API_BASE_URL}/?iframe=${iframeType}${query ? '&amp;' + query : ''}">
        </iframe>
        `;

        root.insertAdjacentHTML('afterbegin', iframeNode);
    }
}
