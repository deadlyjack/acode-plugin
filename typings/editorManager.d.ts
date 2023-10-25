declare var editorManager: EditorManager;

type FileEvent = "switch-file" | "rename-file" | "save-file" | "file-loaded" | "file-content-changed" | "add-folder" | "remove-folder" | "new-file" | "init-open-file-list" | "update";

interface EditorManager {
    editor: AceAjax.Editor | null;
    getFile(checkFor: string | number, type: "id" | "name" | "uri"): EditorFile;
    addFile(file: EditorFile): void;
    switchFile(id: string): void;
    activeFile: EditorFile;
    hasUnsavedFiles(): number | null;
    files: Array<EditorFile>;
    container: HTMLElement;
    isScrolling: boolean;
    on(event: FileEvent, callback: () => void): void;
    off(event: FileEvent, callback: () => void): void;
    emit(event: FileEvent, ...args: any[]): any;
}

type SAFMode = 'single' | 'tree' | null;

interface CursorPosition {
  row: number;
  column: number;
}

interface FoldOptions {
  start: CursorPosition;
  end: CursorPosition;
  placeholder: string;
  ranges: FoldOptions[];
}

type FileAction = 'VIEW' | 'EDIT' | 'SEND' | 'RUN';

interface FileOptions {
  isUnsaved?: boolean;
  render?: boolean;
  id?: string;
  uri?: string;
  text?: string;
  editable?: boolean;
  deletedFile?: boolean;
  SAFMode?: SAFMode;
  encoding?: string;
  cursorPos?: CursorPosition;
  scrollLeft?: number;
  scrollTop?: number;
  folds?: FoldOptions[];
}
