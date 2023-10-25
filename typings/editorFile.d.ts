//declare var EditorFile: EditorFile;

declare class EditorFile {
    focusedBefore: boolean;
    focused: boolean;
    loaded: boolean;
    loading: boolean;
    deletedFile: boolean;
    session: AceAjax.IEditSession | null;
    encoding: string;
    readOnly: boolean;
    markChanged: boolean;

    constructor(filename?: string, options?: FileOptions);
  
    get id(): string;
    set id(value: string);
  
    get filename(): string;
    set filename(value: string);
  
    get location(): string | null;
    set location(value: string);
  
    get uri(): string;
    set uri(value: string);
  
    get eol(): 'windows' | 'unix';
  
    set eol(value: 'windows' | 'unix');
  
    get editable(): boolean;
    set editable(value: boolean);
  
    get isUnsaved(): boolean;
    set isUnsaved(value: boolean);
  
    get name(): string;
  
    get cacheFile(): string;
  
    get icon(): string;
  
    get tab(): HTMLElement;
  
    get SAFMode(): SAFMode;
  
    writeToCache(): Promise<void>;
  
    isChanged(): Promise<boolean>;
  
    canRun(): Promise<boolean>;
  
    readCanRun(): Promise<void>;
  
    writeCanRun(cb: () => boolean | Promise<boolean>): Promise<void>;
  
    remove(force?: boolean): Promise<void>;
  
    save(): Promise<boolean>;
  
    saveAs(): Promise<boolean>;
  
    setMode(mode?: string): void;
  
    makeActive(): void;
  
    removeActive(): void;
  
    openWith(): void;
  
    editWith(): void;
  
    share(): void;
  
    runAction(): void;
  
    run(): void;
  
    runFile(): void;
  
    render(): void;
  
    on(event: FileEvent, callback: () => void): void;
  
    off(event: FileEvent, callback: () => void): void;
  }
