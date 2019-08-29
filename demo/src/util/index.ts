export const blobDownload = (blob: Blob, name?: string): void => {
    let a = document.createElement("a");
    const url = window.URL.createObjectURL(blob);
    const filename = name || "test.zip";
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
};