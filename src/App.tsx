import { FileUpload } from '@ark-ui/react/file-upload';
import { useEffect, useState } from 'react';

export default function App() {
    const [files, setFiles] = useState<File[]>([]);
    const [updates, setUpdates] = useState(0);

    // Trigger a parent re-render after selection.
    useEffect(() => {
        if (files.length > 0) setUpdates(count => count + 1);
    }, [files]);

    return (
        <>
            <output>Updates: {updates}</output>
            <FileUpload.Root
                accept="image/*"
                acceptedFiles={[...files]}
                onFileChange={({ acceptedFiles }) => setFiles(acceptedFiles)}
            >
                <FileUpload.Label>Images</FileUpload.Label>
                <FileUpload.Trigger>Choose image</FileUpload.Trigger>
                <FileUpload.Context>
                    {({ acceptedFiles }) => (
                        <FileUpload.ItemGroup>
                            {acceptedFiles.map(file => (
                                <FileUpload.Item
                                    key={`${file.name}_${file.lastModified}`}
                                    file={file}
                                >
                                    <FileUpload.ItemPreviewImage
                                        width={64}
                                        height={64}
                                    />
                                    <FileUpload.ItemName />
                                    <FileUpload.ItemDeleteTrigger>
                                        Remove
                                    </FileUpload.ItemDeleteTrigger>
                                </FileUpload.Item>
                            ))}
                        </FileUpload.ItemGroup>
                    )}
                </FileUpload.Context>
                <FileUpload.HiddenInput />
            </FileUpload.Root>
        </>
    );
}
