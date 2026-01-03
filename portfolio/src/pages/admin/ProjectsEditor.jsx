import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Button } from '../../components/ui/Button';
import { Plus, Trash2, Edit2, ArrowLeft } from 'lucide-react';

const ProjectsEditor = () => {
    const [projects, setProjects] = useState([]);
    const [view, setView] = useState('LIST');
    const [editingProject, setEditingProject] = useState(null);
    const [loading, setLoading] = useState(true);

    const initialFormState = {
        title: '',
        industry: '',
        problem: '',
        solution: '',
        outcome: '',
        imageUrls: [],
    };
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data.data);
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
                await api.post('/projects', formData);
            } else {
                await api.put(`/projects/${editingProject._id}`, formData);
            }
            await fetchProjects();
            setView('LIST');
        } catch (error) {
            alert('Failed: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this case study?')) return;
        try {
            await api.delete(`/projects/${id}`);
            setProjects(projects.filter(p => p._id !== id));
        } catch (error) {
            alert('Error deleting project');
        }
    };

    if (loading) return <div>Loading...</div>;

    if (view === 'LIST') {
        return (
            <div className="space-y-6 relative">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10 py-4 border-b border-gray-200/50 mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Portfolio Projects</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage case studies.</p>
                    </div>
                    <Button onClick={() => { setFormData(initialFormState); setView('NEW'); }} variant="primary" className="flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all">
                        <Plus size={18} /> Add Case Study
                    </Button>
                </div>

                <div className="grid gap-6">
                    {projects.map(project => (
                        <div key={project._id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded">{project.industry}</span>
                                    <h3 className="font-bold text-lg text-primary">{project.title}</h3>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4 text-sm mt-4">
                                    <div className="bg-gray-50 p-3 rounded">
                                        <div className="font-bold text-gray-900 mb-1">Problem</div>
                                        <div className="text-gray-600 line-clamp-2">{project.problem}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded">
                                        <div className="font-bold text-gray-900 mb-1">Solution</div>
                                        <div className="text-gray-600 line-clamp-2">{project.solution}</div>
                                    </div>
                                    <div className="bg-blue-50/50 p-3 rounded border border-blue-100">
                                        <div className="font-bold text-secondary mb-1">Outcome</div>
                                        <div className="text-gray-700 line-clamp-2">{project.outcome}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 pt-4 md:pt-0">
                                <button onClick={() => { setFormData(project); setEditingProject(project); setView('EDIT'); }} className="p-2 text-gray-400 hover:text-secondary border rounded-md hover:border-secondary transition-all">
                                    <Edit2 size={18} />
                                </button>
                                <button onClick={() => handleDelete(project._id)} className="p-2 text-gray-400 hover:text-red-600 border rounded-md hover:border-red-600 transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <button onClick={() => setView('LIST')} className="flex items-center gap-2 text-gray-500 mb-6 hover:text-primary">
                <ArrowLeft size={18} /> Back to Projects
            </button>

            <h2 className="text-xl font-bold mb-6">{view === 'NEW' ? 'New Case Study' : 'Edit Case Study'}</h2>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Project Title</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Industry</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                            value={formData.industry}
                            onChange={e => setFormData({ ...formData, industry: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">The Problem</label>
                    <textarea
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                        rows={3}
                        value={formData.problem}
                        onChange={e => setFormData({ ...formData, problem: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Our Solution</label>
                    <textarea
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                        rows={3}
                        value={formData.solution}
                        onChange={e => setFormData({ ...formData, solution: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-secondary mb-1">Business Outcome</label>
                    <textarea
                        className="w-full px-4 py-2 border border-secondary/30 rounded-lg bg-secondary/5"
                        required
                        rows={2}
                        value={formData.outcome}
                        onChange={e => setFormData({ ...formData, outcome: e.target.value })}
                    />
                </div>

                <div className="pt-4 flex gap-3 justify-end">
                    <Button type="button" variant="secondary" onClick={() => setView('LIST')} className="bg-gray-100 text-gray-700">Cancel</Button>
                    <Button type="submit" variant="primary">Save Project</Button>
                </div>
            </form>
        </div>
    );
};

export default ProjectsEditor;
