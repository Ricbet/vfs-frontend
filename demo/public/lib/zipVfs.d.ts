import * as JSZip from "jszip";
import { IVfsable } from "./types";
import { Inode } from "./inode";
export declare class ZipVFSService implements IVfsable<Blob> {
    private _sourceJSZip;
    readonly sourceJSZip: JSZip;
    readonly diskFiles: {
        [key in string]: JSZip.JSZipObject;
    };
    private isMounted;
    private findAllLs;
    private readonly inodeMap;
    constructor();
    isMount(): boolean;
    private setSourceJSZip;
    getBlob(): Promise<Blob>;
    private generateInode;
    mount(devBlob: Blob): Promise<never>;
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
}
