import { Upload } from "antd";
import type { UploadFile, UploadProps, GetProp } from "antd";
import { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface Props {
    fileList: UploadFile[];
    setFileList: (files: UploadFile[]) => void;
    videoError?: boolean;
    setVideoError?: (value: boolean) => void;
}

const VideoUploader: React.FC<Props> = ({
                                            fileList,
                                            setFileList,
                                            videoError,
                                            setVideoError,
                                        }) => {
    const [uploading, setUploading] = useState(false);

    const beforeUpload = (file: FileType) => {
        const isVideo = file.type.startsWith("video/");
        if (!isVideo) {
            setVideoError?.(true);
            return Upload.LIST_IGNORE;
        }
        return false;
    };

    return (
        <div>
            <Upload
                accept="video/*"
                listType="picture-card"
                fileList={fileList}
                beforeUpload={beforeUpload}
                onChange={({ fileList }) => {
                    setFileList(fileList);
                    setVideoError && setVideoError(false);
                }}
                showUploadList={{
                    showPreviewIcon: false,
                    showRemoveIcon: true,
                }}
                customRequest={({ onSuccess }) => {
                    setUploading(true);
                    setTimeout(() => {
                        setUploading(false);
                        onSuccess?.("ok");
                    }, 500);
                }}
            >
                {fileList.length < 1 && (
                    <span className="text-gray-900 dark:text-gray-100">
                        + Upload Video
                    </span>
                )}
            </Upload>

            {videoError && (
                <div className="text-red-500 text-sm mt-1">
                    Оберіть відеофайл
                </div>
            )}
        </div>
    );
};

export default VideoUploader;