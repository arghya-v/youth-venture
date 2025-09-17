import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import type { UserDoc, Role } from '@/types';
import { toast } from 'react-toastify';

export default function UserManagement() {
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const snap = await getDocs(collection(db, 'users'));
      const userList = snap.docs.map((d) => ({ uid: d.id, ...(d.data() as Omit<UserDoc, 'uid'>) }));
      setUsers(userList);
      setLoading(false);
    } catch (e) {
      console.error(e);
      toast.error('Failed to load users');
      setLoading(false);
    }
  };

  const updateUserRoles = async (uid: string, roles: Role[]) => {
    try {
      await updateDoc(doc(db, 'users', uid), { roles });
      setUsers(users.map(u => u.uid === uid ? { ...u, roles } : u));
      toast.success('User roles updated');
    } catch (e) {
      console.error(e);
      toast.error('Failed to update user roles');
    }
  };

  const toggleRole = (uid: string, role: Role) => {
    const user = users.find(u => u.uid === uid);
    if (!user) return;
    
    const currentRoles = user.roles || [];
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter(r => r !== role)
      : [...currentRoles, role];
    
    updateUserRoles(uid, newRoles);
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">User</th>
              <th className="p-2">Email</th>
              <th className="p-2">Participant</th>
              <th className="p-2">Voter</th>
              <th className="p-2">Judge</th>
              <th className="p-2">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid} className="border-b hover:bg-gray-50">
                <td className="p-2 font-medium">{user.displayName || 'No name'}</td>
                <td className="p-2 text-gray-600">{user.email}</td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={user.roles?.includes('participant') || false}
                    onChange={() => toggleRole(user.uid, 'participant')}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={user.roles?.includes('voter') || false}
                    onChange={() => toggleRole(user.uid, 'voter')}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={user.roles?.includes('judge') || false}
                    onChange={() => toggleRole(user.uid, 'judge')}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={user.roles?.includes('admin') || false}
                    onChange={() => toggleRole(user.uid, 'admin')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
