import React from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Store,
  ChevronRight,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardHeader } from '../components/Card';
import { Badge } from '../components/Badge';
import { ScoreGauge } from '../components/ScoreGauge';
import { useUser } from '../context/UserContext';

export function DashboardEntrepreneur() {
  const { user } = useUser();

  // Mock business data
  const businessMetrics = {
    weeklyRevenue: 145000,
    monthlyGrowth: 12.5,
    transactionsCount: 89,
    averageTransaction: 1630,
  };

  const creditOptions = {
    min: 500000,
    max: 5000000,
    recommended: 2000000,
  };

  const recentCredits = [
    { id: 1, date: '10/01/2024', amount: 1500000, status: 'Actif', purpose: 'Stock' },
    { id: 2, date: '01/12/2023', amount: 800000, status: 'Remboursé', purpose: 'Équipement' },
    { id: 3, date: '15/10/2023', amount: 500000, status: 'Remboursé', purpose: 'Trésorerie' },
  ];

  const cashFlowData = [
    { day: 'Lun', in: 25000, out: 18000 },
    { day: 'Mar', in: 32000, out: 22000 },
    { day: 'Mer', in: 28000, out: 25000 },
    { day: 'Jeu', in: 35000, out: 20000 },
    { day: 'Ven', in: 42000, out: 30000 },
    { day: 'Sam', in: 38000, out: 28000 },
    { day: 'Dim', in: 15000, out: 12000 },
  ];

  return (
    <div className="min-h-screen bg-surface-secondary pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Store className="w-6 h-6 text-secondary" />
            <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">
              Bienvenue dans votre espace Business, {user?.firstName || ' Entrepreneur'}
            </h1>
          </div>
          <p className="text-text-secondary">
            Suivez la performance de votre activité et gérez vos crédits
          </p>
        </div>

        {/* Business Score & Credit */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Business Score */}
          <Card className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-text-primary">Score Business</h2>
              <Badge variant="success">Excellent</Badge>
            </div>
            <div className="flex justify-center mb-4">
              <ScoreGauge score={user?.score || 780} />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Ventes</span>
                <span className="font-medium">35%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Croissance</span>
                <span className="font-medium">25%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Stabilité</span>
                <span className="font-medium">20%</span>
              </div>
            </div>
          </Card>

          {/* Credit Range */}
          <Card className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-text-primary">Crédit disponible</h2>
              <Link to="/credit/new">
                <Button size="sm">Demander</Button>
              </Link>
            </div>
            <div className="text-center py-4">
              <p className="text-sm text-text-secondary mb-1">Range disponible</p>
              <p className="text-3xl font-bold text-text-primary">
                {(creditOptions.min / 1000).toFixed(0)}K - {(creditOptions.max / 1000000).toFixed(1)}M CDF
              </p>
              <p className="text-sm text-text-secondary mt-2">
                Recommandé: {(creditOptions.recommended / 1000000).toFixed(1)}M CDF
              </p>
            </div>
            <div className="bg-surface-secondary rounded-lg p-3 mt-4">
              <p className="text-xs text-text-secondary mb-2">Types de crédit recommandés:</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="info">Trésorerie</Badge>
                <Badge variant="info">Stock</Badge>
                <Badge variant="info">Équipement</Badge>
              </div>
            </div>
          </Card>

          {/* Cash Flow */}
          <Card className="lg:col-span-1">
            <CardHeader title="Trésorerie" subtitle="Cette semaine" />
            <div className="text-center py-4">
              <p className="text-3xl font-bold text-text-primary">
                {(businessMetrics.weeklyRevenue / 1000).toFixed(0)}K CDF
              </p>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span className="text-sm text-secondary font-medium">+{businessMetrics.monthlyGrowth}%</span>
                <span className="text-xs text-text-secondary">vs semaine dernière</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">{businessMetrics.transactionsCount}</p>
                <p className="text-xs text-text-secondary">Transactions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">
                  {(businessMetrics.averageTransaction / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-text-secondary">Moyenne</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Cash Flow Chart */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Flux de trésorerie</h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full" />
                <span className="text-text-secondary">Entrées</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-danger rounded-full" />
                <span className="text-text-secondary">Sorties</span>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between h-48 space-x-2">
            {cashFlowData.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex flex-col items-center space-y-1">
                  <div
                    className="w-full bg-secondary rounded-t"
                    style={{ height: `${(day.in / 50000) * 100}px` }}
                  />
                  <div
                    className="w-full bg-danger rounded-b"
                    style={{ height: `${(day.out / 50000) * 100}px` }}
                  />
                </div>
                <span className="text-xs text-text-secondary">{day.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <Activity className="w-8 h-8 mx-auto mb-3 text-primary" />
            <p className="text-2xl font-bold text-text-primary">A+</p>
            <p className="text-sm text-text-secondary">Score de risque</p>
          </Card>
          <Card className="text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-secondary" />
            <p className="text-2xl font-bold text-text-primary">+23%</p>
            <p className="text-sm text-text-secondary">Croissance mensuelle</p>
          </Card>
          <Card className="text-center">
            <DollarSign className="w-8 h-8 mx-auto mb-3 text-accent-dark" />
            <p className="text-2xl font-bold text-text-primary">145</p>
            <p className="text-sm text-text-secondary">Jours d'activité</p>
          </Card>
          <Card className="text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-3 text-text-secondary" />
            <p className="text-2xl font-bold text-text-primary">4.8</p>
            <p className="text-sm text-text-secondary">Note de stabilité</p>
          </Card>
        </div>

        {/* Recent Credits */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Historique des crédits business</h2>
            <Link to="/repayment" className="text-sm text-primary hover:underline">
              Voir tout
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-text-secondary border-b border-gray-100">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Montant</th>
                  <th className="pb-3 font-medium">Usage</th>
                  <th className="pb-3 font-medium">Statut</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentCredits.map((credit) => (
                  <tr key={credit.id} className="text-sm">
                    <td className="py-3 text-text-primary">{credit.date}</td>
                    <td className="py-3 font-medium text-text-primary">
                      {credit.amount.toLocaleString()} CDF
                    </td>
                    <td className="py-3 text-text-secondary">{credit.purpose}</td>
                    <td className="py-3">
                      <Badge variant={
                        credit.status === 'Remboursé' ? 'success' :
                        credit.status === 'En retard' ? 'danger' : 'info'
                      }>
                        {credit.status}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <ChevronRight className="w-4 h-4 text-text-secondary" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/credit/new">
            <Card hover className="text-center py-6">
              <CreditCard className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-text-primary mb-1">Nouveau crédit</h3>
              <p className="text-sm text-text-secondary">Pour votre activité</p>
            </Card>
          </Link>
          <Link to="/repayment">
            <Card hover className="text-center py-6">
              <DollarSign className="w-10 h-10 mx-auto mb-3 text-secondary" />
              <h3 className="font-semibold text-text-primary mb-1">Rembourser</h3>
              <p className="text-sm text-text-secondary">Gérez vos échéances</p>
            </Card>
          </Link>
          <Link to="/analytics">
            <Card hover className="text-center py-6">
              <BarChart3 className="w-10 h-10 mx-auto mb-3 text-accent-dark" />
              <h3 className="font-semibold text-text-primary mb-1">Analytiques</h3>
              <p className="text-sm text-text-secondary">Performance détaillée</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
