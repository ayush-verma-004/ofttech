import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import { Button } from '../../components/ui/Button';

const UserForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'CO_FOUNDER',
        permissions: []
    });
    const [loading, setLoading] = useState(isEditMode);

    const definedPermissions = [
        'CAREER_CREATE', 'CAREER_UPDATE', 'CAREER_DELETE',
        'PROJECT_CREATE', 'PROJECT_UPDATE', 'PROJECT_DELETE',
        'SERVICE_UPDATE',
        'ABOUT_UPDATE',
        'TEAM_UPDATE',
        'SETTINGS_UPDATE'
    ];

    useEffect(() => {
        if (isEditMode) {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            const res = await api.get(`/users/${id}`);
            const user = res.data.data;
            setFormData({
                username: user.username,
                password: '', // Don't show hash, allow blank
                role: user.role,
                permissions: user.permissions || []
            });
        } catch (error) {
            alert('Failed to load user');
            navigate('/admin/users');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                // If password is empty, remove it so we don't overwrite with empty string
                const payload = { ...formData };
                if (!payload.password) delete payload.password;

                await api.put(`/users/${id}`, payload);
            } else {
                await api.post('/users', formData);
            }
            navigate('/admin/users');
        } catch (error) {
            alert('Failed: ' + (error.response?.data?.message || error.message));
        }
    };

    const handlePermissionChange = (perm) => {
        if (formData.permissions.includes(perm)) {
            setFormData({ ...formData, permissions: formData.permissions.filter(p => p !== perm) });
        } else {
            setFormData({ ...formData, permissions: [...formData.permissions, perm] });
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit User' : 'Add New Team Member'}</h1>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                        value={formData.username}
                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isEditMode ? 'New Password (leave blank to keep current)' : 'Password'}
                    </label>
                    <input
                        type="password"
                        required={!isEditMode}
                        minLength={6}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                        disabled={formData.role === 'SUPER_ADMIN'} // Prevent modifying SUPER_ADMIN role completely or handle carefully
                    >
                        <option value="SUPER_ADMIN" disabled>Super Admin (Founder)</option>
                        <option value="CO_FOUNDER">Co-Founder</option>
                        <option value="HR_ADMIN">HR Admin</option>
                        <option value="CONTENT_MANAGER">Content Manager</option>
                        <option value="PROJECT_MANAGER">Project Manager</option>
                    </select>
                    {formData.role === 'SUPER_ADMIN' && <p className="text-xs text-gray-500 mt-1">Super Admin role cannot be changed.</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Permissions</label>
                    <div className="grid grid-cols-2 gap-3">
                        {definedPermissions.map(perm => (
                            <label key={perm} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-secondary rounded border-gray-300 focus:ring-secondary"
                                    checked={formData.permissions.includes(perm)}
                                    onChange={() => handlePermissionChange(perm)}
                                    disabled={formData.role === 'SUPER_ADMIN'} // Super admin has all anyway
                                />
                                <span className="ml-2 text-sm text-gray-600">{perm.replace(/_/g, ' ')}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex gap-4">
                    <Button type="button" onClick={() => navigate('/admin/users')} variant="secondary" className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" className="flex-1">
                        {isEditMode ? 'Update User' : 'Create User'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
