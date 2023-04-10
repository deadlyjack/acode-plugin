declare module 'acode' {
  type Module = Object | Function;

  interface Acode {
    define(name: string, module: Module): void;
    require(module: string): Module | undefined;
    exec(key: string, val?: any): boolean | undefined;
    readonly exitAppMessage: string | undefined;
    setLoadingMessage(message: string): void;
    setPluginInit(id: string, initFunction: Function, settings: any): void;
    getPluginSettings(id: string): any;
    setPluginUnmount(id: string, unmountFunction: Function): void;
    initPlugin(id: string, baseUrl: Url, $page: HTMLElement, options: any): Promise<void>;
    unmountPlugin(id: string): void;
    registerFormatter(id: string, extensions: string[], format: () => Promise<void>): void;
    unregisterFormatter(id: string): void;
    format(selectIfNull?: boolean): Promise<void>;
    fsOperation(file: string): FileSystem;
    newEditorFile(filename: string, options?: any): EditorFile;
  }

  const acode: Acode;
  export default acode;
}
