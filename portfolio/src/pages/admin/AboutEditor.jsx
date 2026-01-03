import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Button } from '../../components/ui/Button';
import { Plus, Trash, Save } from 'lucide-react';

const AboutEditor = () => {
    const [data, setData] = useState({
        heading: '',
        overview: '',
        stats: [],
        values: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await api.get('/about');
            if (res.data.data) {
                setData(res.data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put('/about', data);
            alert('About Us updated successfully!');
        } catch (error) {
            alert('Failed to update: ' + error.message);
        }
    };

    // Helper for changing top-level fields
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Helper for updating items in an array
    const handleArrayChange = (index, field, value, arrayName) => {
        const newArray = [...data[arrayName]];
        newArray[index] = { ...newArray[index], [field]: value };
        setData({ ...data, [arrayName]: newArray });
    };

    // Helper for adding/removing items
    const addItem = (arrayName, template) => {
        setData({ ...data, [arrayName]: [...data[arrayName], template] });
    };

    const removeItem = (index, arrayName) => {
        const newArray = data[arrayName].filter((_, i) => i !== index);
        setData({ ...data, [arrayName]: newArray });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold">Edit 'About Us'</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Main Content */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <h2 className="text-lg font-semibold">Core Content</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Heading</label>
                        <input
                            name="heading"
                            className="w-full mt-1 px-4 py-2 border rounded-lg"
                            value={data.heading}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Overview</label>
                        <textarea
                            name="overview"
                            rows={4}
                            className="w-full mt-1 px-4 py-2 border rounded-lg"
                            value={data.overview}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Statistics (Key Metrics)</h2>
                        <Button type="button" size="sm" variant="secondary" onClick={() => addItem('stats', { value: '', label: '' })}>
                            <Plus size={16} /> Add Stat
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {data.stats.map((stat, i) => (
                            <div key={i} className="p-4 border rounded-lg relative bg-gray-50">
                                <button type="button" onClick={() => removeItem(i, 'stats')} className="absolute top-2 right-2 text-red-500">
                                    <Trash size={16} />
                                </button>
                                <div className="space-y-2">
                                    <input
                                        placeholder="Value (e.g. 150+)"
                                        className="w-full px-2 py-1 border rounded"
                                        value={stat.value}
                                        onChange={(e) => handleArrayChange(i, 'value', e.target.value, 'stats')}
                                    />
                                    <input
                                        placeholder="Label (e.g. Architects)"
                                        className="w-full px-2 py-1 border rounded"
                                        value={stat.label}
                                        onChange={(e) => handleArrayChange(i, 'label', e.target.value, 'stats')}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Corporate Values</h2>
                        <Button type="button" size="sm" variant="secondary" onClick={() => addItem('values', { title: '', description: '', icon: 'Shield' })}>
                            <Plus size={16} /> Add Value
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {data.values.map((val, i) => (
                            <div key={i} className="p-4 border rounded-lg relative flex gap-4 bg-gray-50">
                                <div className="flex-1 space-y-3">
                                    <div className="flex gap-4">
                                        <input
                                            placeholder="Title"
                                            className="flex-1 px-3 py-2 border rounded"
                                            value={val.title}
                                            onChange={(e) => handleArrayChange(i, 'title', e.target.value, 'values')}
                                        />
                                        <select
                                            className="px-3 py-2 border rounded"
                                            value={val.icon}
                                            onChange={(e) => handleArrayChange(i, 'icon', e.target.value, 'values')}
                                        >
                                            <option value="Shield">Shield</option>
                                            <option value="Zap">Zap</option>
                                            <option value="Users">Users</option>
                                            <option value="Globe">Globe</option>
                                        </select>
                                    </div>
                                    <textarea
                                        placeholder="Description"
                                        className="w-full px-3 py-2 border rounded"
                                        rows={2}
                                        value={val.description}
                                        onChange={(e) => handleArrayChange(i, 'description', e.target.value, 'values')}
                                    />
                                </div>
                                <button type="button" onClick={() => removeItem(i, 'values')} className="text-red-500 self-center">
                                    <Trash size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sticky bottom-6 flex justify-end">
                    <Button type="submit" variant="primary" className="shadow-lg flex items-center gap-2">
                        <Save size={20} /> Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AboutEditor;
