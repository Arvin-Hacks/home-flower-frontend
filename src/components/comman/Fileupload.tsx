// UploadButton.tsx
import { Upload } from 'lucide-react';
import React, { ChangeEvent } from 'react';

interface UploadButtonProps {
    onUpload: (files: FileList | null) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        onUpload(event.target.files);
    };

    return (
        <label className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
            <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/png, image/gif, image/jpeg"
            />
            <Upload className="h-4 w-4 text-muted-foreground" />

            <span className="sr-only">Upload</span>
        </label>
    );
};

export default UploadButton;
