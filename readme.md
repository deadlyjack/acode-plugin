# acode-plugin

To create plugin for Acode editor use this template. To use this template create a github repository and add `https://github.com/deadlyjack/acode-plugin` as template.

<details open>
<summary><h2 style="display:inline;" id="toc">Table of Contents</h2></summary>

- [Required Files of a plugin](#required-files)
- [How to add a plugin to Acode](#add-your-plugin-to-acode)
- [Available plugin references](#plugin-development)
- [How to test a plugin](#testing)
  - [Requirement](#requirement)
- [Global APIs](#global-apis)
  - [editorManager](#editormanager)
  - [acode](#acode)
  - [actionStack](#actionstack)
  - [appSettings](#appsettings)
    - [Events](#events)
  - [Toast](#show-toast)
  - [Data Storage](#data-storage)
  - [Cache Storage](#cache-storage)
- [Native APIs](#native-apis)
  - [FsOperation](#fsoperation)
  - [WcPage](#wcpage)

</details>

## Required Files

[:arrow_up: TOC](#toc)

- plugin.json - contains information about the plugin.

  - id - plugin should have unique id. E.g. com.example.my-plugin
  - name - plugin name.
  - version - plugin version, if changes an update notificaiton will be sent to users.
  - main - path of plugin's main js file.
  - icon - plugin icon.
  - readme - readme file.
  - files - list of all files that are required by the plugin.
  - author - author of the plugin

    - name - name of the author
    - email - email of the author
    - github - github username of the author

- icon.png - icon for the plugin

Transpile your javascript file using babel so that your plugin can work on older android devices. This template already has all the configuration that is required to tranpile your javascipt file and scss file. You need to run `yarn build` command to bundle your code. To build for production run `yarn build --mode production`.

## Add your plugin to Acode

[:arrow_up: TOC](#toc)

To add your plugin, fork [this](https://github.com/deadlyjack/acode-plugins) repository, clone it, add your plugin information to `list.json` and make a pull request.

To initialize your plugin, use `acode.setPluginInit` method. This method requires two arguments.

- plugin id
- callback funtion, callback function will receive three arguments.

  - baseUrl, it contains the location of the plugin files. To get plugin files from the device, concat baseUrl and file name. E.G. `baseUrl + 'script.js'`.
  - [$page](#wcpage), a page that your plugin can use to show output if required.
  - cacheFile, an Object that contains url and fs for cacheFile

    - [cachefile](#fsoperation), use this write and read from cache file specially for this plugin.
    - cacheFileUrl, url of the cache file.

You also need to set an unmount function, this is called when user choose to uninstall the plugin. `acode.setPluginUnmount` method can be used to set unmount function. This method requires two arguments.

- plugin id
- callback function

## Plugin Development

You can take reference from already available plugins [acode-plugin-python](https://github.com/deadlyjack/acode-plugin-python), [acode-plugin-prettier](https://github.com/deadlyjack/acode-plugin-prettier) and [acode-plugin-snippets](https://github.com/deadlyjack/acode-plugin-snippets).

## Testing

[:arrow_up: TOC](#toc)

1. Open plugin project in VScode.

2. Install 'live server' extension. Enable 'https' for live server and start the server

3. Open Acode and go to `settings > plugins > tap '+' icon in top right corner`.

4. Add plugin locaion, e.g. `https://192.168.1.100:500` and click on install.

### Requirement

- [Nodejs](https://nodejs.org/en/)
- Cordova
- Android Studio

## Global APIs

[:arrow_up: TOC](#toc)

The global variables that you can use them directly in your plugin.

### editorManager

[:arrow_up: TOC](#toc)

- `editor: AceAjax.Editor` [Ace editor](https://ace.c9.io/#nav=api&api=editor)
- `addNewFile(filename?:string, options?): void` add a new file in workspace.

  - `options: Object` Optional object that you can pass.

    - `text: string` file content.
    - `isUnsaved: boolean` is file unsaved.
    - `render: boolean` switch to this file.
    - `id: string` unique id of tile.
    - `uri: string` file uri, location of file.
    - `record: Record`
    - `deletedFile: boolean` is file deleted.
    - `readOnly: boolean` is file readonly.
    - `mode: string` SAF (Storage access framework) mode, (TREE | SINGLE).
    - `type: string` file type, (regular | git | gist).
    - `encoding: string` file encoding.
    - `onsave(): void` callback function called when file is saved.

- `getFile(test: any, type: string)` gets files from opened files.

  - `test: any` file id, uri, repo, gist to find the file.
  - `type: string` type of test (uri | id | name | git | gist).

- `switchFile(id: string): void` switch tab to given file id.
- `activeFile:` [File](https://github.com/deadlyjack/Acode/blob/main/src/lib/editorFile.js) current file.
- `hasUnsavedFiles(): number` get the number of unsaved files.
- `files: Array<File>` list of all files.
- `setSubText(file: File): void` sets sub text of the header i.e. location of the file.
- `container: HTMLDivElement` container of the editor.
- `state: string` editor is blured or focused.
- `on(event: string, listener(): void): void` adds a listener.
- `off(event: string, listener(): void): void` removes a listener.
- `emit(event: string, ...args: ...any)` emits an event.

  - List of events

    - `switch-file`
    - `rename-file`
    - `save-file`
    - `file-content-changed`
    - `update`

### acode

[:arrow_up: TOC](#toc)

- `exec(command: string, value: any)`
- `setPluginInit(id: string, initfuntion(): void)`
- `setPluginUnmount(id: string, unmountFunction(): void)`
- `registerFormatter(id: string, externsions: Array<string>, format():Promise<void>)`
- `fsOperation(file: string): FsOperation`
- `require(moduleName): Module` **Available modules**

  - [fs](https://github.com/deadlyjack/Acode/blob/main/src/fileSystem/fsOperation.js)
  - [projects](https://github.com/deadlyjack/Acode/blob/main/src/lib/projects.js)
  - [selectionMenu](https://github.com/deadlyjack/Acode/blob/main/src/lib/selectionMenu.js)
  - [alert](https://github.com/deadlyjack/Acode/blob/main/src/components/dialogboxes/alert.js)
  - [confirm](https://github.com/deadlyjack/Acode/blob/main/src/components/dialogboxes/confirm.js)
  - [multiPrompt](https://github.com/deadlyjack/Acode/blob/main/src/components/dialogboxes/multiprompt.js)
  - [prompt](https://github.com/deadlyjack/Acode/blob/main/src/components/dialogboxes/prompt.js)
  - [select](https://github.com/deadlyjack/Acode/blob/main/src/components/dialogboxes/select.js)
  - [loader](https://github.com/deadlyjack/Acode/blob/main/src/components/dialogs.js#L10)
  - [fileBrowser](https://github.com/deadlyjack/Acode/blob/main/src/pages/fileBrowser/fileBrowser.include.js#L46)
  - [toInternalUrl](https://github.com/deadlyjack/Acode/blob/main/src/utils/helpers.js#L793)
  - [Url](https://github.com/deadlyjack/Acode/blob/main/src/utils/Url.js)

### actionStack

[:arrow_up: TOC](#toc)

- `push(action: Object): void` Pushes a callback function to actionStack. When use tap on physical/virtual back button, the given callback function is triggered.

  - action
    - `id`
    - `action():void`

- `pop(): Action` pops top item from the stack
- `remove(id: string):void` removes an item from stack
- `length: number` length of the stack
- `setMark(): void` sets a marker to current length of stack
- `clearfromMark(): void` clears all the items from stack form the marker.

### appSettings

[:arrow_up: TOC](#toc)

- `value` all settings.
- `on(event: string, listener(setting: any): void): void` attaches event listener.
- `off(event: string, listener(setting: any): void): void` removes event listener.
- `update(settings: Object, showToast: Boolean): void` update settings.
- `reset(setting: Object): void` reset settings.
- `get(setting: string): Object` gets settings value.

#### Events

- update:&lt;setting name&gt;

### Show toast

Function `window.toast(msg: string, milliSecond: number): void` will show a toast message for specified time.

### Data storage

`window.DATA_STORAGE` stores the url of data directory.

### Cache storage

`window.CACHE_STORAGE` stores the url of cache storage.

## Native APIs

[:arrow_up: TOC](#toc)

To access native features and method of device use these [plugins](https://github.com/deadlyjack/Acode/tree/main/src/plugins). For example to open a file using SAF

```javascript
sdCard.openDocumentFile(async (uri) => {
  const fs = acode.fsOperation(uri);
  const stat = await fs.stat();
  const text = await fs.readFile('utf8');
  editorManager.addNewFile(stat.name, {
    uri,
    text,
    render: true,
  });
});
```

To get more info api provided by these plugins see there `js` files in `www` directory.

### FsOperation

[:arrow_up: TOC](#toc)

- `lsDir(): Promise<Array<Entry>>`
- `readFile(encoding: string): Promise<string | ArrayBuffer>`
- `createFile(name: string, content?: string): Promise<string>`
- `writeFile(content: string | ArrayBuffer): Promise<void>`
- `createDirectory(name: string): Promise<string>`
- `delete(): Promise<void>`
- `copyTo(destination: string): Promise<string>`
- `moveTo(destination: string): Promise<string>`
- `renameTo(newName: string): Promise<string>`
- `exists(): Promise<Boolean>`
- `stat(): Promise<Stat>`

### WcPage

[See](https://github.com/deadlyjack/Acode/blob/main/src/components/WebComponents/wcPage.js) for more info.

- `show()`
- `hide()`
