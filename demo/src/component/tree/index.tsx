import React, { useEffect } from "react";
import { Tree } from "antd";
import { IInodeable } from '../../../public/lib';

const { TreeNode, DirectoryTree } = Tree;

interface PropsTreeComp {
    data?: IInodeable[]
}

const TreeComp = (props: PropsTreeComp): JSX.Element => {

    const { data } = props;

    useEffect(() => {
        console.log(data, 'dataa')
    }, [data])

    return (
        <div className="tree-comp">
            <DirectoryTree multiple defaultExpandAll>
            </DirectoryTree>
        </div>
    );
};

export default TreeComp;
