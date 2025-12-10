'use client';

import { useState, useRef } from 'react';
import { Upload, X, Plus } from 'lucide-react';

interface MultiImageUploaderProps {
    images: string[];
    onChange: (urls: string[]) => void;
}

export default function MultiImageUploader({ images, onChange }: MultiImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        await uploadFiles(Array.from(files));
    };

    const uploadFiles = async (files: File[]) => {
        setUploading(true);
        const newUrls: string[] = [];

        try {
            // Upload sequentially or parallel
            const uploadPromises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) throw new Error(`Failed to upload ${file.name}`);
                const data = await res.json();
                return data.url;
            });

            const results = await Promise.all(uploadPromises);
            onChange([...images, ...results]);
        } catch (error) {
            console.error(error);
            alert('Some images failed to upload');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const removeImage = (indexToRemove: number) => {
        const newImages = images.filter((_, index) => index !== indexToRemove);
        onChange(newImages);
    };

    return (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', marginBottom: '15px' }}>
                {images.map((url, index) => (
                    <div key={index} style={{ position: 'relative', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
                        <img src={url} alt={`Uploaded ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                background: 'rgba(0,0,0,0.6)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '12px'
                            }}
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    style={{
                        height: '100px',
                        borderRadius: '8px',
                        border: '2px dashed #ddd',
                        background: '#fafafa',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#666'
                    }}
                >
                    {uploading ? (
                        <span style={{ fontSize: '0.8rem' }}>Uploading...</span>
                    ) : (
                        <>
                            <Plus size={24} />
                            <span style={{ fontSize: '0.8rem', marginTop: '4px' }}>Add Photos</span>
                        </>
                    )}
                </button>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept="image/*"
                style={{ display: 'none' }}
            />
            <p style={{ fontSize: '0.85rem', color: '#888' }}>
                Supported: JPG, PNG, WEBP. Max 5MB per file.
            </p>
        </div>
    );
}
