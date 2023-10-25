type Strings = string[];
declare var acode: Acode;


interface WCPage extends HTMLElement {
    on(event: 'hide' | 'show', cb: (this: WCPage) => void): void;
    off(event: 'hide' | 'show', cb: (this: WCPage) => void): void;
    
    settitle(title: string): void;
    
    id: string;
    
    hide(): void;
    show(): void;
    
    get body(): HTMLElement | null;
    set body($el: HTMLElement | null);
    
    get innerHTML(): string;
    set innerHTML(html: string);
    
    get textContent(): string | null;
    set textContent(text: string);
    
    get lead(): HTMLElement;
    set lead($el: HTMLElement);
    
    get header(): HTMLElement;
    set header($el: HTMLElement);
}

interface Input {
    id: string;
    required?: boolean;
    type: string;
    match?: RegExp;
    value?: string;
    placeholder?: string;
    hints?: string;
    name?: string;
    disabled?: boolean;
    readOnly?: boolean;
    autofocus?: boolean;
    hidden?: boolean;
    onclick?: (event: Event) => void;
    onchange?: (event: Event) => void;
}


interface Acode {
    /**
     * Define a module
     * @param {string} name
     * @param {Object|function} module
     */
    define(name: string, module: any): void;

    require(module: string): any;

    exec(key: string, val: any): boolean | undefined;

    get exitAppMessage(): string | undefined;

    setLoadingMessage(message: string): void;

    setPluginInit(
        id: string,
        initFunction: (baseUrl: string, $page: WCPage, options?: any) => Promise<void>,
        settings?: any
    ): void;

    getPluginSettings(id: string): any;

    setPluginUnmount(id: string, unmountFunction: () => void): void;

    /**
     * @param {string} id plugin id
     * @param {string} baseUrl local plugin url
     * @param {WCPage} $page
     */
    initPlugin(id: string, baseUrl: string, $page: WCPage, options?: any): Promise<void>;

    unmountPlugin(id: string): void;

    registerFormatter(id: string, extensions: string[], format: () => Promise<void>): void;

    unregisterFormatter(id: string): void;

    format(selectIfNull?: boolean): Promise<void>;

    fsOperation(file: string): any;

    newEditorFile(filename: string, options?: any): void;

    // readonly formatters(): { id: string; name: string; exts: string[] }[];

    /**
     * @param {string[]} extensions
     * @returns {Array<[id: string, name: string]>} options
     */
    getFormatterFor(extensions: string[]): [id: string, name: string][];

    alert(title: string, message: string, onhide: ()=>void): void;
    
    loader(title: string, message: string, cancel: { timeout: number,callback: ()=>void }): void;
    
    joinUrl(...args: string[]): string;
    
    addIcon(className: string, src: string): void;
    
    prompt(
        message: string,
        defaultValue: string,
        type: 'textarea' | 'text' | 'number' | 'tel' | 'search' | 'email' | 'url',
        options?: {
            match: RegExp,
            required: boolean,
            placeholder: string,
            test: (value: string)=>boolean
        }
    ): Promise<any>;
    
    confirm(title: string, message: string): Promise<boolean>;
    
    select(
        title: string,
        options: [string, string, string, boolean][] | string,
        opts?: {
            onCancel?: () => void;
            onHide?: () => void;
            hideOnSelect?: boolean;
            textTransform?: boolean;
            default?: string;
        } | boolean
    ): Promise<any>;
    
    multiPrompt(title: string, inputs: Array<Input | Input[]>, help: string): Promise<Strings>;
    
    fileBrowser(mode: 'file' | 'folder' | 'both', info: string, doesOpenLast: boolean): Promise<
    | {
        name: string;
        type: 'file';
        url: string;
      }
    | {
        list: {
          icon: string;
          isDirectory: boolean;
          isFile: boolean;
          mime: string;
          name: string;
          type: 'file' | 'folder';
          uri: string;
          url: string;
        }[];
        scroll: number;
        name: string;
        type: 'folder';
        url: string;
      }
    >;
    
    toInternalUrl(url: string): Promise<string>;
}
