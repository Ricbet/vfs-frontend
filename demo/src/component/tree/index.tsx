import React, { useEffect, useState } from "react";
import { Tree } from "antd";
import { TInode } from "./model";
import { ZipVFSService } from "../../../public/lib";
import { generateInode, handleSortFileList, findTreeData } from "./util";
import "../../file-icons-js.css";

const { TreeNode, DirectoryTree } = Tree;
const fileIcons = require("file-icons-js");

interface PropsTreeComp {
    data: TInode[];
    vfsService?: ZipVFSService;
}

const TreeComp = (props: PropsTreeComp): JSX.Element => {
    const { data, vfsService } = props;

    const [inodeData, setInodeData] = useState<TInode[]>([]);

    useEffect(() => {
        if (Array.isArray(data)) {
            setInodeData(data.map(cur => generateInode(cur)));
        }
    }, [data]);

    const selectNode = (e: string[]): void => {
        if (!vfsService) return;

        const [path] = e;

        if (vfsService.exist(path)) {
            const curTree = findTreeData(inodeData, path);
            if (!curTree) return;

            if (curTree.isDir) {
                expandDir(curTree);
            } else {
                checkFile(curTree);
            }
        }
    };

    const expandDir = (d: TInode) => {
        if (!vfsService) return;
        vfsService.ls(d.path).then(ls => {
            const llist = ls.map(l => generateInode(l as TInode));
            d.setChildren(handleSortFileList(llist));
            setInodeData([...inodeData]);
        });
    };

    const checkFile = (f: TInode) => {
        console.log(f, "f");
    };

    const renderTreeNodes = (data: TInode[]): JSX.Element[] => {
        return data.map(item => {
            return (
                <TreeNode
                    icon={item.isDir ? null : <i className={fileIcons.getClassWithColor(item.name) || "fa-file-o"}></i>}
                    title={item.name}
                    key={item.path}
                    dataRef={item}
                    isLeaf={!item.isDir}
                >
                    {renderTreeNodes(item.children)}
                </TreeNode>
            );
        });
    };

    return (
        <div className="tree-comp" style={{ overflow: "auto", height: "100%", maxWidth: "300px" }}>
            {inodeData.length ? (
                <DirectoryTree onSelect={selectNode}>{renderTreeNodes(inodeData)}</DirectoryTree>
            ) : null}
        </div>
    );
};

export default TreeComp;
