import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Card, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

// Mock data for charts
const monthlyData = [
  { name: 'Jan', amount: 4500000 },
  { name: 'Fév', amount: 5200000 },
  { name: 'Mar', amount: 4800000 },
  { name: 'Avr', amount: 6100000 },
  { name: 'Mai', amount: 5500000 },
  { name: 'Juin', amount: 6700000 },
];

const genderData = [
  { name: 'Hommes', value: 62 },
  { name: 'Femmes', value: 35 },
  { name: 'Autre', value: 3 },
];

const COLORS = ['#0066CC', '#00B8A9', '#FFB81C'];

// Mock users data
const mockUsers = [
  { id: 1, name: 'Jean Dupont', type: 'Particulier', phone: '+243 81 123 4567', amount: 500000, date: '2026-01-15', status: 'À jour', nextDue: '2026-02-15' },
  { id: 2, name: 'Marie Kapinga', type: 'Entrepreneur', phone: '+243 89 234 5678', amount: 2500000, date: '2026-01-20', status: 'En retard', nextDue: '2026-01-20' },
  { id: 3, name: 'Pierre Mweze', type: 'Particulier', phone: '+243 97 345 6789', amount: 300000, date: '2026-01-10', status: 'À jour', nextDue: '2026-02-10' },
  { id: 4, name: 'Sophie Ngalula', type: 'Entrepreneur', phone: '+243 85 456 7890', amount: 1800000, date: '2026-01-22', status: 'À jour', nextDue: '2026-02-22' },
  { id: 5, name: 'Thomas Bemba', type: 'Particulier', phone: '+243 84 567 8901', amount: 750000, date: '2026-01-18', status: 'Défaut', nextDue: '2026-01-18' },
  { id: 6, name: 'Claire Wemba', type: 'Entrepreneur', phone: '+243 82 678 9012', amount: 3200000, date: '2026-01-25', status: 'À jour', nextDue: '2026-02-25' },
];

const menuItems = [
  { icon: '📊', label: 'Dashboard' },
  { icon: '👥', label: 'Utilisateurs' },
  { icon: '💰', label: 'Crédits' },
  { icon: '📈', label: 'Analytics' },
  { icon: '⚙️', label: 'Paramètres' },
];

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesType = filterType === 'all' || user.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'À jour':
        return <span className="badge badge-success">À jour</span>;
      case 'En retard':
        return <span className="badge badge-warning">En retard</span>;
      case 'Défaut':
        return <span className="badge badge-danger">Défaut</span>;
      default:
        return <span className="badge badge-info">{status}</span>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CD', {
      style: 'currency',
      currency: 'CDF',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-surface-secondary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface shadow-heavy fixed h-full z-10">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="text-lg font-bold text-text-primary">RawFinance</span>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => setActiveMenu(item.label)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    item.label === activeMenu 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-text-secondary hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-text-secondary hover:bg-gray-50 rounded-lg transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Dashboard Administration</h1>
            <p className="text-text-secondary mt-1">Vue d'ensemble des performances</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-medium">AD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Admin</p>
                <p className="text-xs text-text-secondary">Super Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary to-primary-dark text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Prêté</p>
                <p className="text-3xl font-bold mt-1">32.5M CDF</p>
                <p className="text-white/80 text-sm mt-2">+12% ce mois</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-secondary-dark text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Taux de Remboursement</p>
                <p className="text-3xl font-bold mt-1">94.2%</p>
                <p className="text-white/80 text-sm mt-2">+2.1% ce mois</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-accent to-accent-dark text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Utilisateurs Actifs</p>
                <p className="text-3xl font-bold mt-1">8,547</p>
                <p className="text-white/80 text-sm mt-2">+156 cette semaine</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <Card>
            <CardHeader 
              title="Montants des Crédits Accordés" 
              subtitle="Répartition mensuelle (en CDF)"
            />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#718096" fontSize={12} />
                  <YAxis stroke="#718096" fontSize={12} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    formatter={(value: number | undefined) => [value ? formatCurrency(value) : '0', 'Montant']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0' }}
                  />
                  <Bar dataKey="amount" fill="#0066CC" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardHeader 
              title="Répartition par Genre" 
              subtitle="Distribution des utilisateurs"
            />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {genderData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number | undefined) => [`${value || 0}%`, 'Pourcentage']} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* User Management Table */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <CardHeader 
              title="Gestion des Utilisateurs" 
              subtitle="Historique des crédits et statuts"
            />
            <div className="flex items-center space-x-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input py-2 px-4 text-sm"
              >
                <option value="all">Tous les types</option>
                <option value="Particulier">Particuliers</option>
                <option value="Entrepreneur">Entrepreneurs</option>
              </select>
              <Button variant="secondary" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Exporter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-secondary">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Identité</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Montant</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Date Prêt</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Prochaine Échéance</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Statut</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr 
                    key={user.id} 
                    className={`${index % 2 === 0 ? 'bg-surface' : 'bg-surface-secondary/50'} hover:bg-gray-50 transition-colors`}
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-text-primary">{user.name}</p>
                        <p className="text-sm text-text-secondary">{user.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`badge ${user.type === 'Entrepreneur' ? 'badge-info' : 'badge-primary/10 text-primary'}`}>
                        {user.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium">{formatCurrency(user.amount)}</td>
                    <td className="py-4 px-4 text-text-secondary">{user.date}</td>
                    <td className="py-4 px-4 text-text-secondary">{user.nextDue}</td>
                    <td className="py-4 px-4">{getStatusBadge(user.status)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Voir dossier">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-2 text-text-secondary hover:text-primary hover:bg-gray-100 rounded-lg transition-colors" title="Contacter">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button className="p-2 text-text-secondary hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors" title="Ajuster limite">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-text-secondary">
              Affichage de <span className="font-medium">{filteredUsers.length}</span> sur <span className="font-medium">{mockUsers.length}</span> résultats
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="sm" disabled>Précédent</Button>
              <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm">1</button>
              <Button variant="secondary" size="sm">Suivant</Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
