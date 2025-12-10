'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUploader({ value, onChange, label = 'Image' }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        await uploadFile(file);
    };

    const uploadFile = async (file: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            onChange(data.url);
        } catch (error) {
            console.error(error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            await uploadFile(file);
        }
    };

    return (
        <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#444' }}>
                {label}
            </label>

            {value ? (
                <div style={{ position: 'relative', width: '100%', height: '200px', background: '#f8f9fa', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
                    <img
                        src={value}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'rgba(0,0,0,0.6)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <X size={18} />
                    </button>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        padding: '8px 12px',
                        fontSize: '0.8rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        {value}
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{
                        border: `2px dashed ${dragging ? '#FF4A57' : '#ddd'}`,
                        borderRadius: '8px',
                        padding: '40px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: dragging ? '#fff5f5' : '#fafafa',
                        transition: 'all 0.2s'
                    }}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    {uploading ? (
                        <div style={{ color: '#666' }}>Uploading...</div>
                    ) : (
                        <div style={{ color: '#666', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            <Upload size={32} color={dragging ? '#FF4A57' : '#ccc'} />
                            <span>Click or drag image to upload</span>
                            <span style={{ fontSize: '0.8rem', color: '#999' }}>Max file size: 5MB</span>
                        </div>
                    )}
                </div>
            )}

            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Or paste image URL directly..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '0.9rem'
                    }}
                />
            </div>
        </div>
    );
}
