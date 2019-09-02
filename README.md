# vfs-frontend

VFS-frontend is a simple virtual file system implemented purely on the frontend, where a virtual file system is built by simply passing blob binary data with a zip attribute，The [JSZip](https://github.com/Stuk/jszip) library is used for parsing blob data

English | [简体中文](README-zh_CN.md)

# demo

https://ricbet.github.io/vfs-frontend/


# How to use

```typescript
const vfsService = new ZipVFSService();

vfsService.mount(blob).then(async () => {
    // do it
});

```
Now, vfsService has been mounted, for example

<img src="https://raw.githubusercontent.com/Ricbet/vfs-frontend/master/assets/vfs-mount.png" alt="mount" width=520 />

The root directory defaults to '/', you can use the 'ls' method to view all files in a directory， for example

```typescript
vfsService.ls('/').then((data: Inode[]) => {
    // do it
})
```

<img src="https://raw.githubusercontent.com/Ricbet/vfs-frontend/master/assets/vfs-ls.png" alt="ls" width=520 />

🌈enjoy😊🌈

# API

```typescript
interface IVfsable<T> {
    mount(
        data: T,
        options?: {
            name: string;
        }
    ): Promise<never>;

    ls(path: string): Promise<Inode[]>;

    read(path: string, encode?: string): Promise<string | Error>;

    mkdir(path: string): Promise<Inode | Error>;

    touch(path: string): Promise<Inode | Error>;

    write(path: string, options: { isAppend: boolean }, content: string): Promise<never | Error>;

    exist(path: string): Promise<boolean>;

    cp(source: string, copyend: string): Promise<never | Error>;

    mv(source: string, target: string): Promise<never | Error>;

    rm(path: string, options: { isForce: boolean; isRecursive: boolean }): Promise<never | Error>;

    isMount: () => boolean;

    getBlob: () => Promise<Blob>;
}

```

# LICENSE

MIT
