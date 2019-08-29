import React, { useState } from "react";
import { Layout } from "antd";
import UploadForm from "../component/upload-form";
import { ZipVFSService, IInodeable } from "../../public/lib";
import TreeComp from "../component/tree";
import { blobDownload } from "../util";

import "./index.scss";

const vfsService = new ZipVFSService();

const Page = () => {
    const [treeData, setTreeData] = useState<IInodeable[]>([]);

    const acceptUplodaChange = async (blob: Blob) => {
        vfsService.mount(blob).then(async () => {
            const treelist = await vfsService.ls("/");
            setTreeData(treelist || []);
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
                        <TreeComp data={treeData}></TreeComp>
                    </div>
                </Layout.Content>
            </Layout>
        </div>
    );
};

export default Page;
