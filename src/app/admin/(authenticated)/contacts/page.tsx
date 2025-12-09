'use client';

import { useState, useEffect } from 'react';
import styles from './contacts.module.css';
import { Mail, Search, Trash2, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState<PaginationInfo>({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    useEffect(() => {
        fetchContacts();
    }, [filter, search, pagination.page]);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: pagination.page.toString(),
                limit: pagination.limit.toString(),
            });

            if (filter !== 'all') {
                params.append('isRead', filter === 'read' ? 'true' : 'false');
            }

            if (search) {
                params.append('search', search);
            }

            const res = await fetch(`/api/admin/contacts?${params}`);
            const data = await res.json();

            if (res.ok) {
                setContacts(data.contacts);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleReadStatus = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/admin/contacts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isRead: !currentStatus }),
            });

            if (res.ok) {
                fetchContacts();
                if (selectedContact?._id === id) {
                    setSelectedContact({ ...selectedContact, isRead: !currentStatus });
                }
            }
        } catch (error) {
            console.error('Failed to update contact:', error);
        }
    };

    const deleteContact = async (id: string) => {
        if (!confirm('Are you sure you want to delete this contact?')) return;

        try {
            const res = await fetch(`/api/admin/contacts/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setSelectedContact(null);
                fetchContacts();
            }
        } catch (error) {
            console.error('Failed to delete contact:', error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const unreadCount = contacts.filter(c => !c.isRead).length;

    return (
        <div className={styles.contactsPage}>
            <div className={styles.header}>
                <div>
                    <h1>Contact Submissions</h1>
                    <p>{pagination.total} total submissions {unreadCount > 0 && `• ${unreadCount} unread`}</p>
                </div>
            </div>

            {/* Filters and Search */}
            <div className={styles.controls}>
                <div className={styles.filters}>
                    <button
                        className={filter === 'all' ? styles.active : ''}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={filter === 'unread' ? styles.active : ''}
                        onClick={() => setFilter('unread')}
                    >
                        Unread {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
                    </button>
                    <button
                        className={filter === 'read' ? styles.active : ''}
                        onClick={() => setFilter('read')}
                    >
                        Read
                    </button>
                </div>

                <div className={styles.searchBox}>
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or message..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Contacts Table */}
            {loading ? (
                <div className={styles.loading}>Loading contacts...</div>
            ) : contacts.length === 0 ? (
                <div className={styles.empty}>
                    <Mail size={48} />
                    <p>No contact submissions found</p>
                </div>
            ) : (
                <>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr
                                        key={contact._id}
                                        className={contact.isRead ? '' : styles.unread}
                                    >
                                        <td>
                                            <div className={styles.statusIndicator}>
                                                {!contact.isRead && <span className={styles.unreadDot}></span>}
                                            </div>
                                        </td>
                                        <td className={styles.name}>{contact.name}</td>
                                        <td className={styles.email}>{contact.email}</td>
                                        <td>{contact.phone || '—'}</td>
                                        <td className={styles.message}>
                                            {contact.message.substring(0, 50)}
                                            {contact.message.length > 50 && '...'}
                                        </td>
                                        <td className={styles.date}>{formatDate(contact.createdAt)}</td>
                                        <td className={styles.actions}>
                                            <button
                                                onClick={() => setSelectedContact(contact)}
                                                className={styles.viewBtn}
                                                title="View details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => toggleReadStatus(contact._id, contact.isRead)}
                                                className={styles.markBtn}
                                                title={contact.isRead ? 'Mark as unread' : 'Mark as read'}
                                            >
                                                {contact.isRead ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                            <button
                                                onClick={() => deleteContact(contact._id)}
                                                className={styles.deleteBtn}
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button
                                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                                disabled={pagination.page === 1}
                            >
                                <ChevronLeft size={18} />
                                Previous
                            </button>
                            <span>
                                Page {pagination.page} of {pagination.totalPages}
                            </span>
                            <button
                                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                                disabled={pagination.page === pagination.totalPages}
                            >
                                Next
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Contact Detail Modal */}
            {selectedContact && (
                <div className={styles.modal} onClick={() => setSelectedContact(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Contact Details</h2>
                            <button onClick={() => setSelectedContact(null)} className={styles.closeBtn}>
                                ×
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.detailRow}>
                                <label>Name:</label>
                                <span>{selectedContact.name}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <label>Email:</label>
                                <span>{selectedContact.email}</span>
                            </div>
                            {selectedContact.phone && (
                                <div className={styles.detailRow}>
                                    <label>Phone:</label>
                                    <span>{selectedContact.phone}</span>
                                </div>
                            )}
                            <div className={styles.detailRow}>
                                <label>Date:</label>
                                <span>{formatDate(selectedContact.createdAt)}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <label>Status:</label>
                                <span className={selectedContact.isRead ? styles.readBadge : styles.unreadBadge}>
                                    {selectedContact.isRead ? 'Read' : 'Unread'}
                                </span>
                            </div>
                            <div className={styles.messageSection}>
                                <label>Message:</label>
                                <p>{selectedContact.message}</p>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button
                                onClick={() => toggleReadStatus(selectedContact._id, selectedContact.isRead)}
                                className={styles.secondaryBtn}
                            >
                                Mark as {selectedContact.isRead ? 'Unread' : 'Read'}
                            </button>
                            <button
                                onClick={() => deleteContact(selectedContact._id)}
                                className={styles.dangerBtn}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
