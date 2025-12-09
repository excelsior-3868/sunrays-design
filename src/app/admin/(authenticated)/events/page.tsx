'use client';

import { useState, useEffect } from 'react';
import styles from './events.module.css';
import { Calendar, MapPin, Search, Plus, Edit, Trash2, Eye, EyeOff, X } from 'lucide-react';

interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    imageUrl?: string;
    status: 'draft' | 'published';
    createdAt: string;
    updatedAt: string;
}

interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
    const [timeFilter, setTimeFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState<PaginationInfo>({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    });
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        imageUrl: '',
        status: 'draft' as 'draft' | 'published',
    });

    useEffect(() => {
        fetchEvents();
    }, [filter, timeFilter, search, pagination.page]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: pagination.page.toString(),
                limit: pagination.limit.toString(),
            });

            if (filter !== 'all') {
                params.append('status', filter);
            }

            if (timeFilter === 'upcoming') {
                params.append('upcoming', 'true');
            } else if (timeFilter === 'past') {
                params.append('upcoming', 'false');
            }

            if (search) {
                params.append('search', search);
            }

            const res = await fetch(`/api/admin/events?${params}`);
            const data = await res.json();

            if (res.ok) {
                setEvents(data.events);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingEvent
                ? `/api/admin/events/${editingEvent._id}`
                : '/api/admin/events';

            const method = editingEvent ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                closeModal();
                fetchEvents();
            }
        } catch (error) {
            console.error('Failed to save event:', error);
        }
    };

    const deleteEvent = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            const res = await fetch(`/api/admin/events/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchEvents();
            }
        } catch (error) {
            console.error('Failed to delete event:', error);
        }
    };

    const toggleStatus = async (event: Event) => {
        try {
            const res = await fetch(`/api/admin/events/${event._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: event.status === 'published' ? 'draft' : 'published',
                }),
            });

            if (res.ok) {
                fetchEvents();
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const openModal = (event?: Event) => {
        if (event) {
            setEditingEvent(event);
            setFormData({
                title: event.title,
                description: event.description,
                date: new Date(event.date).toISOString().split('T')[0],
                location: event.location,
                imageUrl: event.imageUrl || '',
                status: event.status,
            });
        } else {
            setEditingEvent(null);
            setFormData({
                title: '',
                description: '',
                date: '',
                location: '',
                imageUrl: '',
                status: 'draft',
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingEvent(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const publishedCount = events.filter(e => e.status === 'published').length;
    const draftCount = events.filter(e => e.status === 'draft').length;

    return (
        <div className={styles.eventsPage}>
            <div className={styles.header}>
                <div>
                    <h1>Events Management</h1>
                    <p>{pagination.total} total events • {publishedCount} published • {draftCount} drafts</p>
                </div>
                <button onClick={() => openModal()} className={styles.createBtn}>
                    <Plus size={20} />
                    Create Event
                </button>
            </div>

            {/* Filters and Search */}
            <div className={styles.controls}>
                <div className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <button
                            className={filter === 'all' ? styles.active : ''}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={filter === 'published' ? styles.active : ''}
                            onClick={() => setFilter('published')}
                        >
                            Published
                        </button>
                        <button
                            className={filter === 'draft' ? styles.active : ''}
                            onClick={() => setFilter('draft')}
                        >
                            Drafts
                        </button>
                    </div>

                    <div className={styles.filterGroup}>
                        <button
                            className={timeFilter === 'upcoming' ? styles.active : ''}
                            onClick={() => setTimeFilter('upcoming')}
                        >
                            Upcoming
                        </button>
                        <button
                            className={timeFilter === 'all' ? styles.active : ''}
                            onClick={() => setTimeFilter('all')}
                        >
                            All Time
                        </button>
                        <button
                            className={timeFilter === 'past' ? styles.active : ''}
                            onClick={() => setTimeFilter('past')}
                        >
                            Past
                        </button>
                    </div>
                </div>

                <div className={styles.searchBox}>
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Events Grid */}
            {loading ? (
                <div className={styles.loading}>Loading events...</div>
            ) : events.length === 0 ? (
                <div className={styles.empty}>
                    <Calendar size={48} />
                    <p>No events found</p>
                    <button onClick={() => openModal()} className={styles.emptyBtn}>
                        Create your first event
                    </button>
                </div>
            ) : (
                <div className={styles.eventsGrid}>
                    {events.map((event) => (
                        <div key={event._id} className={styles.eventCard}>
                            {event.imageUrl && (
                                <div className={styles.eventImage}>
                                    <img src={event.imageUrl} alt={event.title} />
                                </div>
                            )}
                            <div className={styles.eventContent}>
                                <div className={styles.eventHeader}>
                                    <h3>{event.title}</h3>
                                    <span className={`${styles.statusBadge} ${styles[event.status]}`}>
                                        {event.status}
                                    </span>
                                </div>
                                <p className={styles.description}>
                                    {event.description.substring(0, 100)}
                                    {event.description.length > 100 && '...'}
                                </p>
                                <div className={styles.eventMeta}>
                                    <div className={styles.metaItem}>
                                        <Calendar size={16} />
                                        {formatDate(event.date)}
                                    </div>
                                    <div className={styles.metaItem}>
                                        <MapPin size={16} />
                                        {event.location}
                                    </div>
                                </div>
                                <div className={styles.eventActions}>
                                    <button
                                        onClick={() => toggleStatus(event)}
                                        className={styles.actionBtn}
                                        title={event.status === 'published' ? 'Unpublish' : 'Publish'}
                                    >
                                        {event.status === 'published' ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                    <button
                                        onClick={() => openModal(event)}
                                        className={styles.actionBtn}
                                        title="Edit"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteEvent(event._id)}
                                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                        disabled={pagination.page === 1}
                    >
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
                    </button>
                </div>
            )}

            {/* Create/Edit Modal */}
            {showModal && (
                <div className={styles.modal} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
                            <button onClick={closeModal} className={styles.closeBtn}>
                                <X size={24} />
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
                                <label>Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    required
                                />
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>Date *</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Location *</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Image URL</label>
                                <input
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            <div className={styles.formActions}>
                                <button type="button" onClick={closeModal} className={styles.cancelBtn}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles.saveBtn}>
                                    {editingEvent ? 'Update Event' : 'Create Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
