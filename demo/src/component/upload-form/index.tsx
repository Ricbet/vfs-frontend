import React, { useState } from "react";
import { Form, Button, Upload, Icon } from "antd";
import { RcFile } from "antd/lib/upload/interface";

interface UploadFormProps {
    onUploadChange: (arg: Blob) => void;
}

const UploadForm = (prop: UploadFormProps): JSX.Element => {
    const [fileName, setFileName] = useState("");

    const { onUploadChange } = prop;

    const acceptUploadChange = (file: RcFile): boolean => {
        const { name } = file;
        setFileName(name);
        onUploadChange(new Blob([file], { type: "text/plain" }));
        return false;
    };

    return (
        <div className="upload-from-main">
            <Form layout="vertical">
                <Form.Item>
                    <Upload.Dragger
                        name="zipFiles"
                        accept=".zip,.tar"
                        beforeUpload={e => acceptUploadChange(e)}
                        showUploadList={false}
                    >
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
                        <p className="ant-upload-hint">仅支持 ZIP 压缩包</p>
                    </Upload.Dragger>
                </Form.Item>
                {/* <Form.Item>
                    <Button type="primary" style={{ width: "100%" }} onClick={() => onExportZip(fileName)}>
                        导出为新压缩包
                    </Button>
                </Form.Item> */}
            </Form>
        </div>
    );
};

export default UploadForm;
