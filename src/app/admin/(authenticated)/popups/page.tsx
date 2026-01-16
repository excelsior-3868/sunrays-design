'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

interface Popup {
    _id: string;
    title: string;
    description?: string;
    imageUrl: string;
    linkUrl?: string;
    isActive: boolean;
    priority: number;
    startDate?: string;
    endDate?: string;
    createdAt: string;
    updatedAt: string;
}

export default function PopupsPage() {
    const [popups, setPopups] = useState<Popup[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPopup, setEditingPopup] = useState<Popup | null>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        linkUrl: '',
        isActive: true,
        priority: 0,
        startDate: '',
        endDate: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    useEffect(() => {
        fetchPopups();
    }, []);

    const fetchPopups = async () => {
        try {
            const response = await fetch('/api/admin/popups');
            if (response.ok) {
                const data = await response.json();
                setPopups(data.popups);
            }
        } catch (error) {
            console.error('Error fetching popups:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data.url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = formData.imageUrl;

            // Upload image if a new file is selected
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const payload = {
                ...formData,
                imageUrl,
            };

            const url = editingPopup
                ? `/api/admin/popups/${editingPopup._id}`
                : '/api/admin/popups';

            const method = editingPopup ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                await fetchPopups();
                handleCloseModal();
                alert(editingPopup ? 'Popup updated successfully!' : 'Popup created successfully!');
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'Failed to save popup'}`);
            }
        } catch (error) {
            console.error('Error saving popup:', error);
            alert('Failed to save popup');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this popup?')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/popups/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchPopups();
                alert('Popup deleted successfully!');
            } else {
                alert('Failed to delete popup');
            }
        } catch (error) {
            console.error('Error deleting popup:', error);
            alert('Failed to delete popup');
        }
    };

    const handleEdit = (popup: Popup) => {
        setEditingPopup(popup);
        setFormData({
            title: popup.title,
            description: popup.description || '',
            imageUrl: popup.imageUrl,
            linkUrl: popup.linkUrl || '',
            isActive: popup.isActive,
            priority: popup.priority,
            startDate: popup.startDate ? popup.startDate.split('T')[0] : '',
            endDate: popup.endDate ? popup.endDate.split('T')[0] : '',
        });
        setPreviewUrl(popup.imageUrl);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingPopup(null);
        setFormData({
            title: '',
            description: '',
            imageUrl: '',
            linkUrl: '',
            isActive: true,
            priority: 0,
            startDate: '',
            endDate: '',
        });
        setImageFile(null);
        setPreviewUrl('');
    };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Event Popups Management</h1>
                <button className={styles.addButton} onClick={() => setShowModal(true)}>
                    + Add New Popup
                </button>
            </div>

            <div className={styles.grid}>
                {popups.map((popup) => (
                    <div key={popup._id} className={styles.card}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={popup.imageUrl}
                                alt={popup.title}
                                fill
                                className={styles.image}
                            />
                            {popup.isActive && <span className={styles.activeBadge}>Active</span>}
                        </div>
                        <div className={styles.cardContent}>
                            <h3>{popup.title}</h3>
                            {popup.description && <p>{popup.description}</p>}
                            <div className={styles.meta}>
                                <span>Priority: {popup.priority}</span>
                                {popup.startDate && (
                                    <span>From: {new Date(popup.startDate).toLocaleDateString()}</span>
                                )}
                                {popup.endDate && (
                                    <span>To: {new Date(popup.endDate).toLocaleDateString()}</span>
                                )}
                            </div>
                            <div className={styles.actions}>
                                <button
                                    className={styles.editButton}
                                    onClick={() => handleEdit(popup)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(popup._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className={styles.modalBackdrop} onClick={handleCloseModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{editingPopup ? 'Edit Popup' : 'Create New Popup'}</h2>
                            <button className={styles.closeButton} onClick={handleCloseModal}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Upload Image *</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {previewUrl && (
                                    <div className={styles.preview}>
                                        <Image src={previewUrl} alt="Preview" width={200} height={150} />
                                    </div>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label>Link URL (Optional)</label>
                                <input
                                    type="url"
                                    value={formData.linkUrl}
                                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Priority</label>
                                    <input
                                        type="number"
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.checkbox}>
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        />
                                        <span>Active</span>
                                    </label>
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Start Date (Optional)</label>
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>End Date (Optional)</label>
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={handleCloseModal}
                                    disabled={uploading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                    disabled={uploading}
                                >
                                    {uploading ? 'Saving...' : editingPopup ? 'Update Popup' : 'Create Popup'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
