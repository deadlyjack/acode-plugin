/// <reference path="acode.d.ts" />
/// <reference path="editorManager.d.ts" />
/// <reference path="editorFile.d.ts" />
/// <reference path="settings.d.ts" />

declare var ace: AceAjax.Ace;

declare global {
    interface Window {
        toast(message: string, duration: number): void;
        ASSETS_DIRECTORY: string;
        CACHE_STORAGE: string;
        DATA_STORAGE: string;
        PLUGIN_DIR: string;
        DOES_SUPPORT_THEME: boolean;
        IS_FREE_VERSION: boolean;
        KEYBINDING_FILE: string;
        ANDROID_SDK_INT: number;
        addedFolder: AddedFolder;
    }
}

interface AddedFolder {
    url: string;
    remove: () => void;
    $node: HTMLElement;
    reload: () => void;
    listState: Map<string, boolean>;
    reloadOnResume: boolean;
    saveState: boolean;
    title: string;
    id: string;
  }

export {};
