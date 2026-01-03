import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { Plus, Trash2, Edit2, Shield } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsers(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this user?')) return;
        try {
            await api.delete(`/users/${id}`);
            setUsers(users.filter(u => u._id !== id));
        } catch (error) {
            alert('Failed to delete user');
        }
    };

    if (loading) return <div>Loading users...</div>;

    return (
        <div>
            <div className="relative">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10 py-4 border-b border-gray-200/50">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage admin access and roles.</p>
                    </div>
                    <Link to="/admin/users/new">
                        <Button variant="primary" className="flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all">
                            <Plus size={18} /> Add New User
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs mr-3">
                                                {user.username[0].toUpperCase()}
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                            {user.role.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {user.role === 'SUPER_ADMIN' ? (
                                                <span className="text-xs text-gray-400 italic">Full Access</span>
                                            ) : user.permissions.slice(0, 3).map((p, i) => (
                                                <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                    {p.split('_')[0]}
                                                </span>
                                            ))}
                                            {user.permissions.length > 3 && (
                                                <span className="text-xs text-gray-400">+{user.permissions.length - 3} more</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/admin/users/${user._id}`}>
                                            <button className="text-secondary hover:text-secondary-dark transition-colors">
                                                <Edit2 size={18} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="text-red-500 hover:text-red-700 ml-4 disabled:opacity-30"
                                            disabled={user.role === 'SUPER_ADMIN'}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersList;
