import { Link } from 'react-router-dom';
import {
  CreditCard,
  AlertCircle,
  BookOpen,
  ChevronRight,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardHeader } from '../components/Card';
import { Badge } from '../components/Badge';
import { ScoreGauge } from '../components/ScoreGauge';
import { useUser } from '../context/UserContext';

export function DashboardParticulier() {
  const { user } = useUser();

  const creditHistory = [
    { id: 1, date: '15/01/2024', amount: 50000, status: 'Remboursé', installment: '3/3' },
    { id: 2, date: '01/12/2023', amount: 30000, status: 'Remboursé', installment: '6/6' },
    { id: 3, date: '15/10/2023', amount: 25000, status: 'En retard', installment: '4/6' },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'Remboursement dû dans 3 jours', date: '28/01/2024' },
    { id: 2, type: 'info', message: 'Votre score a augmenté de 50 points !', date: '20/01/2024' },
  ];

  const resources = [
    { id: 1, title: 'Comment améliorer votre score de crédit ?', category: 'Éducation' },
    { id: 2, title: '5 conseils pour bien gérer votre budget', category: 'Budget' },
    { id: 3, title: 'Questions fréquentes sur les microcrédits', category: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-surface-secondary pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">
            Bienvenue, {user?.firstName || 'Utilisateur'} 👋
          </h1>
          <p className="text-text-secondary mt-1">
            Voici un aperçu de votre situation financière
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Score Card */}
          <Card className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-text-primary">Score de crédit</h2>
              <Link to="/settings" className="text-sm text-primary hover:underline">
                Voir détails
              </Link>
            </div>
            <div className="flex justify-center mb-4">
              <ScoreGauge score={user?.score || 650} />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Mobile Money</span>
                <span className="font-medium">40%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Téléphone</span>
                <span className="font-medium">20%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Historique</span>
                <span className="font-medium">25%</span>
              </div>
            </div>
          </Card>

          {/* Credit Available */}
          <Card className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-text-primary">Crédit disponible</h2>
              <Link to="/credit/new">
                <Button size="sm">Faire une demande</Button>
              </Link>
            </div>
            <div className="text-center py-4">
              <p className="text-sm text-text-secondary mb-1">Montant maximal</p>
              <p className="text-4xl font-bold text-text-primary">
                {(user?.creditLimit || 250000).toLocaleString()} CDF
              </p>
              <p className="text-sm text-text-secondary mt-2">
                Taux à partir de 2.5% / mois
              </p>
            </div>
            <div className="bg-surface-secondary rounded-lg p-3 mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Score requis pour 500K</span>
                <span className="font-medium text-primary">750+</span>
              </div>
            </div>
          </Card>

          {/* Alerts */}
          <Card className="lg:col-span-1">
            <CardHeader title="Alertes" subtitle="Informations importantes" />
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-surface-secondary rounded-lg">
                  <AlertCircle className={`w-5 h-5 mt-0.5 ${
                    alert.type === 'warning' ? 'text-accent' : 'text-primary'
                  }`} />
                  <div>
                    <p className="text-sm text-text-primary">{alert.message}</p>
                    <p className="text-xs text-text-secondary">{alert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Credit History */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Historique des crédits</h2>
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
                  <th className="pb-3 font-medium">Statut</th>
                  <th className="pb-3 font-medium">Progression</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {creditHistory.map((credit) => (
                  <tr key={credit.id} className="text-sm">
                    <td className="py-3 text-text-primary">{credit.date}</td>
                    <td className="py-3 font-medium text-text-primary">
                      {credit.amount.toLocaleString()} CDF
                    </td>
                    <td className="py-3">
                      <Badge variant={
                        credit.status === 'Remboursé' ? 'success' :
                        credit.status === 'En retard' ? 'danger' : 'info'
                      }>
                        {credit.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-text-secondary">{credit.installment}</td>
                    <td className="py-3">
                      <ChevronRight className="w-4 h-4 text-text-secondary" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Educational Resources */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-text-primary">Ressources</h2>
              <BookOpen className="w-5 h-5 text-text-secondary" />
            </div>
            <div className="space-y-3">
              {resources.map((resource) => (
                <Link
                  key={resource.id}
                  to={`/resources/${resource.id}`}
                  className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-text-primary">{resource.title}</p>
                    <p className="text-xs text-text-secondary">{resource.category}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-secondary" />
                </Link>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h2 className="font-semibold text-text-primary mb-4">Actions rapides</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/credit/new">
                <div className="p-4 bg-primary/5 rounded-xl text-center hover:bg-primary/10 transition-colors cursor-pointer">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium text-text-primary">Nouveau crédit</p>
                </div>
              </Link>
              <Link to="/repayment">
                <div className="p-4 bg-secondary/5 rounded-xl text-center hover:bg-secondary/10 transition-colors cursor-pointer">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-secondary" />
                  <p className="text-sm font-medium text-text-primary">Rembourser</p>
                </div>
              </Link>
              <Link to="/settings">
                <div className="p-4 bg-accent/5 rounded-xl text-center hover:bg-accent/10 transition-colors cursor-pointer">
                  <CreditCard className="w-6 h-6 mx-auto mb-2 text-accent-dark" />
                  <p className="text-sm font-medium text-text-primary">Paramètres</p>
                </div>
              </Link>
              <Link to="/support">
                <div className="p-4 bg-gray-100 rounded-xl text-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 text-text-secondary" />
                  <p className="text-sm font-medium text-text-primary">Support</p>
                </div>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
