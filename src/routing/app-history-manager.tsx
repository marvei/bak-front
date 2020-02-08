import { createBrowserHistory, BrowserHistoryBuildOptions, History } from "history";

export class AppHistoryManager {
    constructor(options?: BrowserHistoryBuildOptions) {
        const defaultHistory = (): History => createBrowserHistory(options);

        if (options != null && options.basename != null) {
            // tslint:disable-next-line:backing-field
            this._history = defaultHistory();
            return;
        }

        const baseElements = document.head.getElementsByTagName("base");
        // If there is at least one base element.
        if (baseElements.length) {
            // Take the last one.
            const base = baseElements.item(baseElements.length - 1);

            if (base == null || !base.href) {
                // tslint:disable-next-line:backing-field
                this._history = defaultHistory();
                return;
            }

            const baseHref = base.href;

            const baseUriRegex = new RegExp("https?://.*?(/.*)");
            const baseUriGroups = baseUriRegex.exec(baseHref);

            const baseUri = baseUriGroups != null ? baseUriGroups[1] : undefined;
            // tslint:disable-next-line:backing-field
            this._history = createBrowserHistory({
                ...options,
                basename: baseUri
            });
        } else {
            // tslint:disable-next-line:backing-field
            this._history = defaultHistory();
        }
    }

    private _history: History;

    public get history(): History {
        return this._history;
    }
}
