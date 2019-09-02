# VFS-frontend

VFS-frontend 是一个纯前端实现的简易虚拟文件系统，只需传递带有 zip 属性的 blob 二进制数据即可在前端构建出一个虚拟文件系统，解析 blob 数据用的是 [JSZip](https://github.com/Stuk/jszip) 这个库


# 如何使用

```typescript
const vfsService = new ZipVFSService();

// 仅接收 blob 数据
vfsService.mount(blob).then(async () => {
    // do it
});

```
此时 vfsService 已经被挂载了, 例如

![demo](/assets/vfs-mount.png)

根目录默认为 '/', 你可以使用 ls 方法查看某个目录下的所有文件， 例如

```typescript
vfsService.ls('/').then((data: Inode[]) => {
    // do ite
})
```

![ls](/assets/vfs-ls.png)

🌈enjoy😊🌈

# API

