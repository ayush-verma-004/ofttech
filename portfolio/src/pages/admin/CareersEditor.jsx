import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Button } from '../../components/ui/Button';
import { Plus, Trash2, Edit2, ArrowLeft, Briefcase } from 'lucide-react';

const CareersEditor = () => {
    const [jobs, setJobs] = useState([]);
    const [view, setView] = useState('LIST'); // LIST | EDIT | NEW
    const [editingJob, setEditingJob] = useState(null);
    const [loading, setLoading] = useState(true);

    const initialFormState = {
        title: '',
        location: '',
        type: 'Full-time',
        description: '',
        requirements: [''] // Array of strings
    };
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await api.get('/careers');
            setJobs(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setFormData(initialFormState);
        setView('NEW');
    };

    const handleEdit = (job) => {
        setFormData(job);
        setEditingJob(job);
        setView('EDIT');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this job posting?')) return;
        try {
            await api.delete(`/careers/${id}`);
            setJobs(jobs.filter(j => j._id !== id));
        } catch (error) {
            alert('Failed to delete: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (view === 'NEW') {
                await api.post('/careers', formData);
            } else {
                await api.put(`/careers/${editingJob._id}`, formData);
            }
            await fetchJobs();
            setView('LIST');
        } catch (error) {
            alert('Operation failed: ' + error.message);
        }
    };

    // Form inputs handling
    const handleReqChange = (idx, val) => {
        const newReqs = [...formData.requirements];
        newReqs[idx] = val;
        setFormData({ ...formData, requirements: newReqs });
    };

    const addReq = () => setFormData({ ...formData, requirements: [...formData.requirements, ''] });
    const removeReq = (idx) => {
        const newReqs = formData.requirements.filter((_, i) => i !== idx);
        setFormData({ ...formData, requirements: newReqs });
    };

    if (loading) return <div>Loading...</div>;

    if (view === 'LIST') {
        return (
            <div className="space-y-6 relative">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10 py-4 border-b border-gray-200/50 mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Careers Management</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage open positions.</p>
                    </div>
                    <Button onClick={handleCreate} variant="primary" className="flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all">
                        <Plus size={18} /> Post Job
                    </Button>
                </div>

                <div className="grid gap-4">
                    {jobs.map(job => (
                        <div key={job._id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg text-primary">{job.title}</h3>
                                <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(job)} className="p-2 text-gray-400 hover:text-secondary border rounded-md hover:border-secondary transition-all">
                                    <Edit2 size={18} />
                                </button>
                                <button onClick={() => handleDelete(job._id)} className="p-2 text-gray-400 hover:text-red-600 border rounded-md hover:border-red-600 transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {jobs.length === 0 && <div className="text-center text-gray-500 py-10">No active job postings.</div>}
                </div>
            </div>
        );
    }

    // FORM VIEW
    return (
        <div className="max-w-3xl mx-auto">
            <button onClick={() => setView('LIST')} className="flex items-center gap-2 text-gray-500 mb-6 hover:text-primary">
                <ArrowLeft size={18} /> Back to List
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-bold mb-6">{view === 'NEW' ? 'Create New Position' : 'Edit Position'}</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                            <input
                                required
                                className="w-full px-4 py-2 border rounded-lg"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                required
                                className="w-full px-4 py-2 border rounded-lg"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option>Full-time</option>
                                <option>Contract</option>
                                <option>Remote</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">Requirements / Tech Stack</label>
                            <button type="button" onClick={addReq} className="text-xs text-secondary font-bold uppercase tracking-wider">+ Add Item</button>
                        </div>
                        <div className="space-y-2">
                            {formData.requirements.map((req, i) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        className="flex-1 px-3 py-2 border rounded-lg text-sm"
                                        value={req}
                                        onChange={(e) => handleReqChange(i, e.target.value)}
                                        placeholder="e.g. 5+ years Java experience"
                                    />
                                    <button type="button" onClick={() => removeReq(i)} className="text-red-400 hover:text-red-600">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="secondary" onClick={() => setView('LIST')} className="bg-gray-100 text-gray-700">Cancel</Button>
                        <Button type="submit" variant="primary">Save Position</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CareersEditor;
