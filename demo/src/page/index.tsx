import React, { useState } from "react";
import { Layout } from "antd";
import UploadForm from "../component/upload-form";
import { ZipVFSService, Inode } from "../../public/lib";
import TreeComp from "../component/tree";
import { blobDownload } from "../util";

import "./index.scss";
import { TInode } from "../component/tree/model";

const vfsService = new ZipVFSService();

const Page = () => {
    const [treeData, setTreeData] = useState<Inode[]>([]);
    const [treeVfss, setTreeVfss] = useState<ZipVFSService>();

    const acceptUplodaChange = async (blob: Blob) => {
        vfsService.mount(blob).then(async () => {
            const treelist = await vfsService.ls("/");
            setTreeData(treelist || []);
            setTreeVfss(vfsService)
        });
    };

    const exportNewZip = (name: string) => {
        console.log(name);
    };

    return (
        <div className="page">
            <Layout style={{ height: "100vh" }}>
                <Layout.Content className="content">
                    <div className="left">
                        <UploadForm onUploadChange={acceptUplodaChange} onExportZip={exportNewZip} />
                    </div>
                    <div className="right">
                        <TreeComp data={treeData as TInode[]} vfsService={treeVfss}></TreeComp>
                    </div>
                </Layout.Content>
            </Layout>
        </div>
    );
};

export default Page;
