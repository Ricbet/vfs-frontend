import React, { useState } from "react";
import { Layout, Typography, Input, Button, Spin } from "antd";
import UploadForm from "../component/upload-form";
import { ZipVFSService, Inode } from "vfs-frontend";
import TreeComp from "../component/tree";

import "./index.scss";
import { TInode } from "../component/tree/model";
import Details from "../component/details";

const vfsService = new ZipVFSService();

const Page = () => {
    const [treeData, setTreeData] = useState<Inode[]>([]);
    const [treeVfss, setTreeVfss] = useState<ZipVFSService>();
    const [blobUrl, setBlobUrl] = useState<string>("");
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [currentFileDetails, setCurrentFileDetails] = useState<string>("");

    const acceptUplodaChange = async (blob: Blob) => {
        vfsService.mount(blob).then(async () => {
            const treelist = await vfsService.ls("/");
            setTreeData(treelist || []);
            setTreeVfss(vfsService);
            (window as any).vfsService = vfsService
        });
    };

    const onCurrentFileContent = (content: string) => {
        setCurrentFileDetails(content);
    };

    const acquireBlobUrl = () => {
        setIsLoad(true)
        fetch(blobUrl, {
            headers: { "content-type": "application/zip" },
        }).then(async responData => {
            if (
                responData &&
                responData.status === 200 &&
                responData.headers.get("content-type") === "application/zip"
            ) {
                const data = await responData.blob();
                acceptUplodaChange(data);
            }
        }).finally(() => {
            setIsLoad(false)
        })
    };

    const renderFeatchUrlForm = (): JSX.Element => {
        return (
            <div className="feact-url">
                <Typography.Text>返回 Blob 数据格式的接口</Typography.Text>
                <Input style={{ marginTop: "10px" }} value={blobUrl} onChange={e => setBlobUrl(e.target.value)}></Input>
                <Button type="primary" style={{ width: "100%", marginTop: "10px" }} onClick={acquireBlobUrl}>
                    确定
                </Button>
            </div>
        );
    };

    return (
        <div className="page">
            <Layout style={{ height: "100vh" }}>
                <Layout.Content className="content">
                    <div className="left">
                        <UploadForm onUploadChange={acceptUplodaChange} />
                        <Typography.Text style={{ textAlign: "center", width: "100%", display: "inline-block" }}>
                            or
                        </Typography.Text>
                        {renderFeatchUrlForm()}
                    </div>
                    <div className="right">
                        <Spin spinning={isLoad} style={{marginTop: "20px"}}>
                            <TreeComp
                                data={treeData as TInode[]}
                                vfsService={treeVfss}
                                onLaunchFileDetails={onCurrentFileContent}
                            ></TreeComp>
                        </Spin>
                    </div>
                    <div className="file-details">
                        <Details content={currentFileDetails}></Details>
                    </div>
                </Layout.Content>
            </Layout>
        </div>
    );
};

export default Page;
