import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, MapPin, CreditCard, Bell, Shield, SignOut,
  PencilSimple, CheckCircle, Star,
} from '@phosphor-icons/react';

const SECTIONS = [
  { icon: User, label: 'Personal Info' },
  { icon: MapPin, label: 'Saved Addresses' },
  { icon: CreditCard, label: 'Payment Methods' },
  { icon: Bell, label: 'Notifications' },
  { icon: Shield, label: 'Privacy & Security' },
];

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('Personal Info');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: 'Manan Shah', phone: '9876543210', email: 'manan@email.com' });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-satoshi font-black text-3xl text-zinc-900 mb-8">Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-4">
            {/* Avatar card */}
            <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white font-satoshi"
                  style={{ background: 'linear-gradient(135deg, #FF5722, #FF8A65)' }}
                >
                  M
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center">
                  <PencilSimple size={14} style={{ color: '#FF5722' }} />
                </button>
              </div>
              <h2 className="font-satoshi font-bold text-zinc-900">{form.name}</h2>
              <p className="text-zinc-500 text-sm">{form.email}</p>
              <div className="flex items-center gap-1 mt-2">
                <Star size={14} className="text-yellow-400" weight="fill" />
                <span className="text-xs text-zinc-500">Gold Member</span>
              </div>
            </div>

            {/* Nav */}
            <div className="bg-white rounded-2xl shadow-card p-3 space-y-1">
              {SECTIONS.map((s) => {
                const Icon = s.icon;
                const isActive = activeSection === s.label;
                return (
                  <button
                    key={s.label}
                    onClick={() => setActiveSection(s.label)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive ? 'text-white' : 'text-zinc-700 hover:bg-zinc-50'
                    }`}
                    style={isActive ? { backgroundColor: '#FF5722' } : {}}
                  >
                    <Icon size={18} />
                    {s.label}
                  </button>
                );
              })}
              <div className="pt-2 border-t border-zinc-100">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                  <SignOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3">
            {activeSection === 'Personal Info' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-satoshi font-bold text-xl text-zinc-900">Personal Information</h2>
                  <button
                    onClick={() => editMode ? handleSave() : setEditMode(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={editMode ? { backgroundColor: '#FF5722', color: 'white' } : { backgroundColor: '#FFF3EE', color: '#FF5722' }}
                  >
                    {saved ? <CheckCircle size={16} /> : <PencilSimple size={16} />}
                    {saved ? 'Saved!' : editMode ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Full Name', key: 'name', placeholder: 'Your name' },
                    { label: 'Mobile Number', key: 'phone', placeholder: '10-digit mobile' },
                    { label: 'Email Address', key: 'email', placeholder: 'email@example.com' },
                  ].map((f) => (
                    <div key={f.key} className={f.key === 'email' ? 'sm:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-zinc-500 mb-1.5">{f.label}</label>
                      <input
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                        disabled={!editMode}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none transition-all disabled:bg-zinc-50 disabled:text-zinc-500 focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-zinc-100">
                  {[
                    { label: 'Total Orders', value: '47' },
                    { label: 'Total Spent', value: '₹12,480' },
                    { label: 'Avg Rating Given', value: '4.2 ⭐' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 rounded-xl bg-zinc-50">
                      <p className="font-satoshi font-black text-2xl text-zinc-900">{stat.value}</p>
                      <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === 'Saved Addresses' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-card p-6"
              >
                <h2 className="font-satoshi font-bold text-xl text-zinc-900 mb-6">Saved Addresses</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Home', address: '42A, Coral Residency, MG Road, Bangalore 560001', icon: '🏠' },
                    { label: 'Work', address: '5th Floor, Embassy Tech Village, Bellandur, Bangalore', icon: '🏢' },
                  ].map((addr) => (
                    <div key={addr.label} className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 hover:border-zinc-200 transition-colors">
                      <span className="text-2xl">{addr.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-zinc-900 text-sm">{addr.label}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{addr.address}</p>
                      </div>
                      <button className="text-zinc-400 hover:text-zinc-600">
                        <PencilSimple size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    className="w-full py-3 rounded-xl border-2 border-dashed border-zinc-200 text-sm font-medium text-zinc-400 hover:border-zinc-300 hover:text-zinc-600 transition-colors"
                  >
                    + Add New Address
                  </button>
                </div>
              </motion.div>
            )}

            {(activeSection !== 'Personal Info' && activeSection !== 'Saved Addresses') && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-card p-6 flex flex-col items-center justify-center h-64"
              >
                <div className="w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center mb-4">
                  {(() => {
                    const section = SECTIONS.find(s => s.label === activeSection);
                    const Icon = section?.icon ?? User;
                    return <Icon size={28} className="text-zinc-300" />;
                  })()}
                </div>
                <h3 className="font-satoshi font-semibold text-zinc-900 mb-1">{activeSection}</h3>
                <p className="text-sm text-zinc-400">Coming soon in the next update</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
