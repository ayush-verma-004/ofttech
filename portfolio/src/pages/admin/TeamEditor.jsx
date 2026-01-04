import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Button } from '../../components/ui/Button';
import { Plus, Trash2, Edit2, ArrowLeft, Upload } from 'lucide-react';

const TeamEditor = () => {
    const [members, setMembers] = useState([]);
    const [view, setView] = useState('LIST');
    const [editingMember, setEditingMember] = useState(null);
    const [loading, setLoading] = useState(true);

    const initialFormState = {
        name: '',
        role: '',
        bio: '',
        image: null, // File object
        socialLinks: { linkedin: '', twitter: '', email: '' }
    };
    const [formData, setFormData] = useState(initialFormState);
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await api.get('/team');
            setMembers(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (member) => {
        setFormData({
            ...initialFormState,
            name: member.name,
            role: member.role,
            bio: member.bio,
            socialLinks: member.socialLinks || initialFormState.socialLinks
        });
        setPreviewUrl(member.image);
        setEditingMember(member);
        setView('EDIT');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        payload.append('name', formData.name);
        payload.append('role', formData.role);
        payload.append('bio', formData.bio);
        payload.append('socialLinks', JSON.stringify(formData.socialLinks));

        if (formData.image instanceof File) {
            payload.append('image', formData.image);
        }

        try {
            const config = { headers: { 'Content-Type': undefined } };

            if (view === 'NEW') {
                await api.post('/team', payload, config);
            } else {
                await api.put(`/team/${editingMember._id}`, payload, config);
            }
            await fetchMembers();
            setView('LIST');
        } catch (error) {
            alert('Failed: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this team member?')) return;
        try {
            await api.delete(`/team/${id}`);
            setMembers(members.filter(m => m._id !== id));
        } catch (error) {
            alert('Error deleting member');
        }
    };

    if (loading) return <div>Loading...</div>;

    if (view === 'LIST') {
        return (

            <div className="space-y-6 relative">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10 py-4 border-b border-gray-200/50 mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Team Management</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage profiles and roles.</p>
                    </div>
                    <Button onClick={() => { setFormData(initialFormState); setPreviewUrl(''); setView('NEW'); }} variant="primary" className="flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all">
                        <Plus size={18} /> Add Member
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map(member => (
                        <div key={member._id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full mb-4 overflow-hidden border border-gray-200">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">No Img</div>
                                )}
                            </div>
                            <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                            <p className="text-sm text-secondary font-bold uppercase tracking-wider mb-2">{member.role}</p>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{member.bio}</p>

                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(member)} className="p-2 text-gray-400 hover:text-secondary border rounded-md transition-colors">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(member._id)} className="p-2 text-gray-400 hover:text-red-600 border rounded-md transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <button onClick={() => setView('LIST')} className="flex items-center gap-2 text-gray-500 mb-6 hover:text-primary">
                <ArrowLeft size={18} /> Back to Team
            </button>

            <h2 className="text-xl font-bold mb-6">{view === 'NEW' ? 'New Team Member' : 'Edit Member'}</h2>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">

                {/* Image Upload */}
                <div className="flex justify-center mb-6">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-gray-400 text-sm font-medium">Upload</span>
                            )}
                        </div>
                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity text-white font-bold text-xs uppercase tracking-wider">
                            <Upload size={20} className="mb-1" />
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                        {/* Edit badge if existing */}
                        <div className="absolute bottom-0 right-2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center border-2 border-white">
                            <Edit2 size={14} />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Role / Job Title</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                            value={formData.role}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                        rows={3}
                        value={formData.bio}
                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Social Links (Optional)</label>
                    <div className="grid md:grid-cols-3 gap-3">
                        <input
                            placeholder="LinkedIn URL"
                            className="px-3 py-2 border rounded text-sm"
                            value={formData.socialLinks?.linkedin || ''}
                            onChange={e => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, linkedin: e.target.value } })}
                        />
                        <input
                            placeholder="Twitter URL"
                            className="px-3 py-2 border rounded text-sm"
                            value={formData.socialLinks?.twitter || ''}
                            onChange={e => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, twitter: e.target.value } })}
                        />
                        <input
                            placeholder="Email Address"
                            className="px-3 py-2 border rounded text-sm"
                            value={formData.socialLinks?.email || ''}
                            onChange={e => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, email: e.target.value } })}
                        />
                    </div>
                </div>

                <div className="pt-4 flex gap-3 justify-end">
                    <Button type="button" variant="secondary" onClick={() => setView('LIST')} className="bg-gray-100 text-gray-700">Cancel</Button>
                    <Button type="submit" variant="primary">Save Member</Button>
                </div>
            </form>
        </div>
    );
};

export default TeamEditor;
