import { Inode } from "./inode";
export interface IInodeable {
    name: string;
    path: string;
    date: Date;
    isDir: boolean;
    setDate: (date: Date) => this;
    unixPermissions?: number | string | null;
    dosPermissions?: number | null;
}
export interface IVfsable<T> {
    mount(data: T, options?: {
        name: string;
    }): Promise<never>;
    ls(path: string): Promise<Inode[]>;
    read(path: string, encode?: string): Promise<string | Error>;
    mkdir(path: string): Promise<Inode | Error>;
    touch(path: string): Promise<Inode | Error>;
    write(path: string, options: {
        isAppend: boolean;
    }, content: string): Promise<never | Error>;
    exist(path: string): Promise<boolean>;
    cp(source: string, copyend: string): Promise<never | Error>;
    mv(source: string, target: string): Promise<never | Error>;
    rm(path: string, options: {
        isForce: boolean;
        isRecursive: boolean;
    }): Promise<never | Error>;
    isMount: () => boolean;
    getBlob: () => Promise<Blob>;
}
