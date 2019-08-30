import * as JSZip from "jszip";
import { IInodeable, IVfsable } from "./types";
import { Inode } from "./inode";

export class ZipVFSService implements IVfsable<Blob> {
    // 源文件
    private _sourceJSZip: JSZip;
    public get sourceJSZip(): JSZip {
        return this._sourceJSZip;
    }

    // 源文件的 key value 列表
    public get diskFiles(): { [key in string]: JSZip.JSZipObject } {
        return this.sourceJSZip ? this.sourceJSZip.files : {};
    }

    private isMounted: boolean = false;

    // 找到所有子目录
    private async findAllLs(path: string): Promise<string[]> {
        let resultList: string[] = [path];
        const lsInode = async (inodePath: string): Promise<void> => {
            const ls = await this.ls(inodePath);
            if (ls.length !== 0) {
                resultList = resultList.concat(ls.map(l => l.path));
                for (const l of ls) {
                    if (l.isDir === true) await lsInode(l.path);
                }
            }
        };

        await lsInode(path);
        return Promise.resolve(resultList);
    }

    private readonly inodeMap: Map<string, IInodeable> = new Map();

    constructor() {}

    public isMount(): boolean {
        return this.isMounted;
    }

    private setSourceJSZip(jszip: JSZip): this {
        this._sourceJSZip = jszip;
        return this;
    }

    public getBlob(): Promise<Blob> {
        return new Promise(res => {
            res(
                this.sourceJSZip.generateAsync({
                    type: "blob",
                    compression: "DEFLATE",
                    platform: "UNIX",
                })
            );
        });
    }

    private generateInode(key: {
        name: string;
        date?: Date;
        dir: boolean;
        unixPermissions?: number | string | null;
        dosPermissions?: number | null;
    }): {
        key: string;
        value: Inode;
    } {
        const nameSplit = key.name.split("/").filter(Boolean);
        const inode = new Inode()
            .setPath(nameSplit.join("/"))
            .setDate(key.date || new Date())
            .setUnixPermissions(key.unixPermissions)
            .setDosPermissions(key.dosPermissions);

        const name = nameSplit[nameSplit.length - 1];
        nameSplit.pop();

        inode.setName(name)
            .setParentPath(nameSplit.length == 0 ? "/" : nameSplit.join("/"))
            .setIsDir(key.dir);

        return {
            key: inode.path,
            value: inode,
        };
    }

    /**
     * devBlob: 源文件二进制流
     * dir: 压缩根目录名称
     */
    public async mount(devBlob: Blob): Promise<never> {
        const jszip = new JSZip();
        return new Promise(res => {
            jszip.loadAsync(devBlob, {
                createFolders: true
            }).then((data: JSZip) => {
                this.setSourceJSZip(data);
                this.inodeMap.set(
                    "/",
                    new Inode()
                        .setPath("/")
                        .setDate(new Date())
                        .setIsDir(true)
                        .setName("/")
                        .setParentPath("")
                );

                for (const d in this.diskFiles) {
                    const inode = this.generateInode(this.diskFiles[d]);
                    this.inodeMap.set(inode.key, inode.value);
                }
                this.isMounted = true;
                res();
            });
        });
    }

    public async ls(path: string): Promise<Inode[]> {
        return await Array.from(this.inodeMap.values()).reduce((pre: Inode[], cur: Inode) => {
            if (cur.parentPath === path) return pre.concat(cur);
            return pre;
        }, []);
    }

    public async read(path: string, encode?: string): Promise<string | Error> {
        if (this.inodeMap.has(path) && this.inodeMap.get(path).isDir === false && this.diskFiles[path]) {
            return await this.diskFiles[path].async("text");
        } else {
            return await Error(`No such file or directory`);
        }
    }

    public async mkdir(path: string): Promise<Inode | Error> {
        if (!path.trim()) return await Error(`${path}: No such file or directory`);

        const { key, value: inode } = this.generateInode({ name: path, dir: true });

        if (this.inodeMap.has(inode.path)) return await Error(`${path}: File exists`);

        if (!this.inodeMap.has(inode.parentPath)) return await Error(`${inode.parentPath}: No such file or directory`);

        if (this.inodeMap.get(inode.parentPath).isDir === false) {
            return await Error(`${inode.parentPath}: No such file or directory`);
        }

        return new Promise(res => {
            this.sourceJSZip.folder(path);
            this.inodeMap.set(key, inode);
            res(inode);
        });
    }

    public async touch(path: string): Promise<Inode | Error> {
        if (!path.trim()) return await Error(`${path}: No such file or directory`);

        const { key, value: inode } = this.generateInode({ name: path, dir: false });

        if (this.inodeMap.has(inode.path)) {
            this.inodeMap.get(inode.path).setDate(new Date());
            return;
        }

        if (!this.inodeMap.has(inode.parentPath)) return await Error(`${inode.parentPath}: No such file or directory`);

        if (this.inodeMap.get(inode.parentPath).isDir === false) {
            return await Error(`${inode.parentPath}: Not a directory`);
        }

        return new Promise(res => {
            if (inode.parentPath === "/") {
                this.sourceJSZip.file(inode.name, "");
            } else {
                this.sourceJSZip.folder(inode.parentPath).file(inode.name, "");
            }
            this.inodeMap.set(key, inode);
            res(inode);
        });
    }

    public async write(path: string, options: { isAppend: boolean }, content: string): Promise<never | Error> {
        if (!path.trim()) return await Error(`${path}: No such file or directory`);

        const curInode = this.inodeMap.get(path);

        if (curInode && curInode.isDir === true) return await Error(`${path}: Is a directory`);

        return new Promise(res => {
            this.sourceJSZip.file(curInode.path, content, {
                dosPermissions: curInode.dosPermissions,
                unixPermissions: curInode.unixPermissions,
            });
            res();
        });
    }

    public async exist(path: string): Promise<boolean> {
        if (!path.trim()) return await false;

        const curInode = this.inodeMap.get(path);

        if (!curInode) return await false;

        if (curInode) return await true;

        return await false;
    }

    public async cp(source: string, copyend: string): Promise<never | Error> {
        // TODO
        return;
    }

    public async mv(source: string, target: string): Promise<never | Error> {
        if (!source || !target) return await Error(`${source} rename to ${target}: No such file or directory`);

        const sourceInode = this.inodeMap.get(source);
        const targetInode = this.inodeMap.get(target);

        if (!sourceInode) return await Error(`${source} rename to ${target}: No such file or directory`);

        // 文件名 to 文件名 改名
        if (sourceInode.isDir === false && !targetInode) {
            const { key, value: inode } = this.generateInode({
                name: target,
                dir: false,
                unixPermissions: targetInode.unixPermissions,
                dosPermissions: targetInode.dosPermissions,
            });

            const oldContent = await this.read(source);
            await this.rm(source, { isForce: true, isRecursive: false });
            await this.touch(inode.path);
            await this.write(
                inode.path,
                {
                    isAppend: true,
                },
                oldContent + ""
            );

            return await new Promise(res => res());
        }

        // 文件夹 to 文件夹 改名
        if (sourceInode.isDir === true && !targetInode) {
            const allLs = await this.findAllLs(source);

            for (let e of allLs) {
                const newPath = e.replace(source, target);
                const inMapInode = this.inodeMap.get(e);

                if (inMapInode.isDir === false) {
                    const oldContent = await this.read(e);
                    await this.touch(newPath);
                    await this.write(
                        newPath,
                        {
                            isAppend: true,
                        },
                        oldContent + ""
                    );
                } else {
                    await this.mkdir(newPath);
                }
            }

            await this.rm(source, { isForce: true, isRecursive: true });
            return await new Promise(res => res());
        }
    }

    public async rm(
        path: string,
        options: {
            isForce: boolean;
            isRecursive: boolean;
        }
    ): Promise<never | Error> {
        if (!path.trim()) return await Error(`${path}: No such file or directory`);

        const curInode = this.inodeMap.get(path);

        if (!curInode) return await Error(`${path}: No such file or directory`);

        if ((!options || options.isForce === false) && curInode.isDir === true) {
            return await Error(`${path}: is a directory`);
        }

        return new Promise(async res => {
            this.sourceJSZip.remove(curInode.path);

            if (curInode.isDir === false) {
                this.inodeMap.delete(curInode.path);
                res();
            } else if (curInode.isDir === true && options.isRecursive === true) {
                // 递归筛选待删除 inode 列表
                let waitRmList: string[] = await this.findAllLs(curInode.path);
                waitRmList.forEach(s => this.inodeMap.delete(s));
                res();
            }
        });
    }
}
