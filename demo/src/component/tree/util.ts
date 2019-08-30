import { TInode } from "./model";

export const generateInode = (e: TInode): TInode => {
    return new TInode()
        .setName(e.name)
        .setDate(e.date || new Date())
        .setDosPermissions(e.dosPermissions!)
        .setIsDir(e.isDir)
        .setParentPath(e.parentPath)
        .setPath(e.path)
        .setUnixPermissions(e.unixPermissions!);
};

// 文件排序
export const handleSortFileList = (data: TInode[]): TInode[] => {
    // 比较首字母ACS编码排序
    const sliceData = data.slice(0);
    const sortCharCode = (pre: TInode, cur: TInode): boolean => cur.name.localeCompare(pre.name) > 0;
    const quickSort = (arr: TInode[]): TInode[] => {
        if (arr.length <= 1) return arr;
        const pivotFile = arr.splice(Math.floor(arr.length / 2), 1)[0];
        const left = [];
        const right = [];
        for (let i = 0; i < arr.length; i++) {
            const currentFile = arr[i];
            if (currentFile.isDir === true && pivotFile.isDir === false) left.push(currentFile);
            else {
                if (currentFile.isDir === pivotFile.isDir) {
                    sortCharCode(currentFile, pivotFile) ? left.push(currentFile) : right.push(currentFile);
                } else right.push(currentFile);
            }
        }
        return quickSort(left).concat([pivotFile], quickSort(right));
    };
    const result = quickSort(sliceData);
    return result;
};

export const findTreeData = (source: TInode[], target: string): TInode | undefined => {
    const flat = (arr: TInode[]): TInode[] => {
        return arr.reduce(
            (pre: TInode[], cur) =>
                Array.isArray(cur.children) && cur.children.length > 0
                    ? pre.concat(flat(cur.children))
                    : pre.concat(cur),
            []
        );
    };
    const dimenList = flat(source);
    return dimenList.find(e => e.path === target);
};
