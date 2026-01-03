import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Button } from '../../components/ui/Button';
import { Plus, Trash2, Edit2, GripVertical, CheckCircle2 } from 'lucide-react';

const ServicesEditor = () => {
    const [services, setServices] = useState([]);
    const [view, setView] = useState('LIST');
    const [editingService, setEditingService] = useState(null);
    const [loading, setLoading] = useState(true);

    const initialFormState = {
        title: '',
        description: '',
        icon: 'Globe',
        tag: 'Verification: Active',
        order: 0
    };
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await api.get('/services');
            setServices(res.data.data.sort((a, b) => a.order - b.order));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (view === 'NEW') {
                await api.post('/services', formData);
            } else {
                await api.put(`/services/${editingService._id}`, formData);
            }
            await fetchServices();
            setView('LIST');
        } catch (error) {
            alert('Failed: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Remove this service?')) return;
        try {
            await api.delete(`/services/${id}`);
            setServices(services.filter(s => s._id !== id));
        } catch (error) {
            alert('Error deleting service');
        }
    };

    if (loading) return <div>Loading...</div>;

    if (view === 'LIST') {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Services Engine</h1>
                    <Button onClick={() => { setFormData(initialFormState); setView('NEW'); }} variant="primary" className="flex items-center gap-2">
                        <Plus size={18} /> Add Service
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map(service => (
                        <div key={service._id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group relative">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { setFormData(service); setEditingService(service); setView('EDIT'); }} className="p-1.5 bg-gray-100 rounded hover:bg-secondary hover:text-white transition-colors">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(service._id)} className="p-1.5 bg-gray-100 rounded hover:bg-red-500 hover:text-white transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-4">
                                <span className="font-bold text-xs">{service.icon}</span>
                            </div>
                            <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                            <p className="text-sm text-gray-500 mb-4 h-10 overflow-hidden">{service.description}</p>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium uppercase tracking-wider">
                                <CheckCircle2 size={12} className="text-secondary" />
                                {service.tag}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-6">{view === 'NEW' ? 'Add Service' : 'Edit Service'}</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1">Service Title</label>
                    <input
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                        rows={3}
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Icon Name</label>
                        <select
                            className="w-full px-4 py-2 border rounded-lg"
                            value={formData.icon}
                            onChange={e => setFormData({ ...formData, icon: e.target.value })}
                        >
                            <option value="Globe">Globe</option>
                            <option value="Cloud">Cloud</option>
                            <option value="Settings">Settings</option>
                            <option value="Shield">Shield</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status Tag</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg"
                            value={formData.tag}
                            onChange={e => setFormData({ ...formData, tag: e.target.value })}
                        />
                    </div>
                </div>

                <div className="pt-4 flex gap-3 justify-end">
                    <Button type="button" variant="secondary" onClick={() => setView('LIST')} className="bg-gray-100 text-gray-700">Cancel</Button>
                    <Button type="submit" variant="primary">Save Service</Button>
                </div>
            </form>
        </div>
    );
};

export default ServicesEditor;
