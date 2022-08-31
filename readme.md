# acode-plugin

To create plugin for Acode editor use this template. To use this template create a github repository and add `https://github.com/deadlyjack/acode-plugin` as template.

## Required Files

- plugin.json - contains information about the plugin.

  - id - plugin should have unique id. E.g. com.example.my-plugin
  - name - plugin name.
  - version - plugin version, if changes an update notificaiton will be sent to users.
  - main - plugins main js file.
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

You can take reference from already available plugins [acode-plugin-python](https://github.com/deadlyjack/acode-plugin-python), [acode-plugin-prettier](https://github.com/deadlyjack) and [acode-plugin-snippets](https://github.com/deadlyjack/acode-plugin-snippets).

## Testing

1. Open plugin project in VScode.

2. Install 'live server' extension. Enable 'https' for live server and start the server

3. Go to `settings > plugin > tap '+' icon in top right corner`.

4. Add plugin locaion, e.g. https: &frasl; &frasl; 192.168.1.100:500 and click on install.

### Requirement

- [Nodejs](https://nodejs.org/en/)
- Cordova
- Android Studio

## Global API

The global variables that you can use them directly in your plugin.

### editorManager

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
- `activeFile: File` current file.
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

- `exec(command: string, value: any)`
- `setPluginInit(id: string, initfuntion(): void)`
- `setPluginUnmount(id: string, unmountFunction(): void)`
- `registerFormatter(id: string, externsions: Array<string>, format():Promise<void>)`
- `fsOperation(file: string): FsOperation`

### actionStack

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

- `lsDir(): Promise<Array<Entry>>`
- `readFile(encoding: string | ArrayBuffer): Promise<string | ArrayBuffer>`
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
