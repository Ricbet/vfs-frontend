import { IInodeable } from "./types";
export declare class Inode implements IInodeable {
    name: string;
    path: string;
    date: Date;
    parentPath: string;
    isDir: boolean;
    unixPermissions?: number | string | null;
    dosPermissions?: number | null;
    constructor();
    setName(name: string): this;
    setPath(path: string): this;
    setDate(date: Date): this;
    setParentPath(path: string): this;
    setIsDir(b: boolean): this;
    setUnixPermissions(p: number | string | null): this;
    setDosPermissions(p: number | null): this;
}
