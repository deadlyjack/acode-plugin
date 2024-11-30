
declare type fileBrowserSettings = {
  showHiddenFiles: string;
  sortByName: string;
};

declare type searchAndFindSettings = {
  wrap: boolean;
  caseSensitive: boolean;
  regExp: boolean;
};

declare class Settings {
  update(
    settings?: { [key: string]: any } | boolean,
    showToast?: boolean,
    saveFile?: boolean
  ): Promise<void>;
  reset(setting?: string): Promise<boolean>;
  on(event: `update:${string}` | `update:${string}:after` | 'reset', callback: () => void): void;
  off(event: 'update' | 'reset', callback: () => void): void;
  get(key: string): any;

  applyAnimationSetting(): Promise<void>;
  applyLangSetting(): Promise<void>;
}
