import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Button } from '../../components/ui/Button';
import { Save, Loader } from 'lucide-react';

const SettingsEditor = () => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        address: '',
        socials: { linkedin: '', twitter: '', github: '', facebook: '', instagram: '' },
        hero: { tagline: '', title: '', subtitle: '', ctaPrimary: '', ctaSecondary: '' }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get('/general');
            setFormData(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put('/general', formData);
            alert('Settings updated successfully');
        } catch (error) {
            alert('Update failed: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleSocialChange = (key, value) => {
        setFormData({
            ...formData,
            socials: { ...formData.socials, [key]: value }
        });
    };

    if (loading) return <div>Loading settings...</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Global Contact Settings</h1>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">

                {/* Contact Info */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold border-b pb-2">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Company Phone</label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Support Email</label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Physical Address</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg"
                            value={formData.address}
                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                </div>

                {/* Hero Content */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold border-b pb-2">Hero Section Content</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Small Tagline</label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg"
                                value={formData.hero?.tagline || ''}
                                onChange={e => setFormData({ ...formData, hero: { ...formData.hero, tagline: e.target.value } })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Main Heading (Use \n for line breaks)</label>
                            <textarea
                                className="w-full px-4 py-2 border rounded-lg"
                                rows={3}
                                value={formData.hero?.title || ''}
                                onChange={e => setFormData({ ...formData, hero: { ...formData.hero, title: e.target.value } })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Subtitle / Description</label>
                            <textarea
                                className="w-full px-4 py-2 border rounded-lg"
                                rows={2}
                                value={formData.hero?.subtitle || ''}
                                onChange={e => setFormData({ ...formData, hero: { ...formData.hero, subtitle: e.target.value } })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Primary Button Text</label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg"
                                value={formData.hero?.ctaPrimary || ''}
                                onChange={e => setFormData({ ...formData, hero: { ...formData.hero, ctaPrimary: e.target.value } })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Secondary Button Text</label>
                            <input
                                className="w-full px-4 py-2 border rounded-lg"
                                value={formData.hero?.ctaSecondary || ''}
                                onChange={e => setFormData({ ...formData, hero: { ...formData.hero, ctaSecondary: e.target.value } })}
                            />
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold border-b pb-2">Social Media Links</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {['linkedin', 'twitter', 'github', 'facebook', 'instagram'].map(platform => (
                            <div key={platform}>
                                <label className="block text-sm font-medium mb-1 capitalize">{platform}</label>
                                <input
                                    className="w-full px-4 py-2 border rounded-lg text-sm"
                                    placeholder={`https://${platform}.com/...`}
                                    value={formData.socials?.[platform] || ''}
                                    onChange={e => handleSocialChange(platform, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button type="submit" variant="primary" className="flex items-center gap-2" disabled={saving}>
                        {saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SettingsEditor;
