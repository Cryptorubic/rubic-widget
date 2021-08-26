import {Configuration} from "./models/configuration";
import {IframeType} from "./models/iframe-type";
import queryString from 'query-string';
import breakpoints from './styles/_vars.scss';

export class RubicWidget {
    private static rootId = 'rubic-widget-root';

    public init(configuration: Configuration) {
        const root = document.getElementById(RubicWidget.rootId);
        const iframeType: IframeType = window.innerWidth < 1180 ? 'vertical' : 'horizontal';

        const query = queryString.stringify(configuration);

        const iframe = `
        <iframe src="https://dev2.rubic.exchange/?iframe=${iframeType}${query ? '&' + query : ''}">
        </iframe>
        `;

        root.insertAdjacentHTML('afterend', iframe);
    }
}
