import { IInodeable } from "./types";

export class Inode implements IInodeable {

    name: string;
    path: string;
    date: Date;
    parentPath: string;
    isDir: boolean;
    unixPermissions?: number | string | null;
    dosPermissions?: number | null;

    constructor() { }

    public setName(name: string): this {
        this.name = name;
        return this
    }

    public setPath(path: string): this {
        this.path = path;
        return this
    }

    public setDate(date: Date): this {
        this.date = date;
        return this
    }

    public setParentPath(path: string): this {
        this.parentPath = path;
        return this
    }

    public setIsDir(b: boolean): this {
        this.isDir = b
        return this
    }

    public setUnixPermissions(p: number | string | null): this {
        this.unixPermissions = p || null
        return this
    }

    public setDosPermissions(p: number | null): this {
        this.dosPermissions = p || null
        return this
    }

}