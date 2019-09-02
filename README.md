# vfs-frontend

vfs-frontend 是一个纯前端实现的简易虚拟文件系统，只需传递带有 zip 属性的 blob 二进制数据即可在前端构建出一个虚拟文件系统，解析 blob 数据用的是 [JSZip](https://github.com/Stuk/jszip) 这个库


# 如何使用

```typescript
const vfsService = new ZipVFSService();

// 仅接收 blob 数据
vfsService.mount(blob).then(async () => {
    // do it
});

```
此时 vfsService 已经被挂载了, 例如

<img src="https://raw.githubusercontent.com/Ricbet/vfs-frontend/master/assets/vfs-mount.png" alt="mount" width=520 />

根目录默认为 '/', 你可以使用 ls 方法查看某个目录下的所有文件， 例如

```typescript
vfsService.ls('/').then((data: Inode[]) => {
    // do ite
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

# demo

https://ricbet.github.io/vfs-frontend/


