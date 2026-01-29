import React from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  Calendar,
  CreditCard,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardHeader } from '../components/Card';
import { Badge } from '../components/Badge';

export function RepaymentPage() {
  // Mock data
  const activeCredits = [
    {
      id: 1,
      amount: 150000,
      monthlyPayment: 52750,
      remainingPayments: 4,
      totalPayments: 6,
      nextDueDate: '15/02/2024',
      status: 'À jour',
    },
  ];

  const upcomingPayments = [
    {
      id: 1,
      creditId: 1,
      amount: 52750,
      dueDate: '15/02/2024',
      daysUntil: 3,
    },
  ];

  const paymentHistory = [
    { id: 1, date: '15/01/2024', amount: 52750, method: 'Mobile Money', status: 'Confirmé' },
    { id: 2, date: '15/12/2023', amount: 52750, method: 'Mobile Money', status: 'Confirmé' },
    { id: 3, date: '15/11/2023', amount: 52750, method: 'Mobile Money', status: 'Confirmé' },
    { id: 4, date: '15/10/2023', amount: 52750, method: 'Mobile Money', status: 'Confirmé' },
  ];

  const totalDue = 52750;
  const totalOverdue = 0;

  const handleRepayment = (creditId: number) => {
    // Simulate payment redirect to Mobile Money
    alert('Redirection vers Mobile Money pour le paiement...');
  };

  return (
    <div className="min-h-screen bg-surface-secondary pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">
            Remboursements
          </h1>
          <p className="text-text-secondary mt-1">
            Gérez vos échéances et suivez vos remboursements
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-primary/5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Montant dû</p>
                <p className="text-2xl font-bold text-text-primary">
                  {totalDue.toLocaleString()} CDF
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-secondary/5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Prochaine échéance</p>
                <p className="text-2xl font-bold text-text-primary">15/02/2024</p>
              </div>
            </div>
          </Card>

          <Card className={totalOverdue > 0 ? 'bg-danger/5' : 'bg-surface'}>
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                totalOverdue > 0 ? 'bg-danger/20' : 'bg-gray-100'
              }`}>
                {totalOverdue > 0 ? (
                  <AlertTriangle className="w-6 h-6 text-danger" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-success" />
                )}
              </div>
              <div>
                <p className="text-sm text-text-secondary">Retard</p>
                <p className={`text-2xl font-bold ${
                  totalOverdue > 0 ? 'text-danger' : 'text-success'
                }`}>
                  {totalOverdue > 0 ? `${totalOverdue.toLocaleString()} CDF` : 'Aucun'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Active Credits */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Crédits en cours</h2>
            <Badge variant="info">{activeCredits.length} actif(s)</Badge>
          </div>
          
          {activeCredits.map((credit) => (
            <div key={credit.id} className="border border-gray-100 rounded-xl p-5 mb-4 last:mb-0">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-text-primary">
                    Crédit #{credit.id} - {credit.amount.toLocaleString()} CDF
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {credit.remainingPayments}/{credit.totalPayments} échéances restantes
                  </p>
                </div>
                <Badge variant="success">{credit.status}</Badge>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Progression</span>
                  <span className="font-medium text-text-primary">
                    {Math.round((1 - credit.remainingPayments / credit.totalPayments) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full transition-all"
                    style={{ width: `${(1 - credit.remainingPayments / credit.totalPayments) * 100}%` }}
                  />
                </div>
              </div>
              
              {/* Payment Schedule */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-text-secondary">Mensualité</p>
                  <p className="font-semibold text-text-primary">
                    {credit.monthlyPayment.toLocaleString()} CDF
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary">Prochaine date</p>
                  <p className="font-semibold text-text-primary">{credit.nextDueDate}</p>
                </div>
                <div>
                  <p className="text-text-secondary">Restant dû</p>
                  <p className="font-semibold text-text-primary">
                    {(credit.monthlyPayment * credit.remainingPayments).toLocaleString()} CDF
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary">Échéances</p>
                  <p className="font-semibold text-text-primary">
                    {credit.remainingPayments} sur {credit.totalPayments}
                  </p>
                </div>
              </div>
              
              <Button onClick={() => handleRepayment(credit.id)} fullWidth>
                <CreditCard className="mr-2 w-4 h-4" />
                Rembourser maintenant
              </Button>
            </div>
          ))}
        </Card>

        {/* Upcoming Payments Alert */}
        {upcomingPayments.length > 0 && (
          <Card className="mb-8 bg-accent/5 border border-accent/20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent-dark" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary">
                  Échéance dans {upcomingPayments[0].daysUntil} jour{upcomingPayments[0].daysUntil > 1 ? 's' : ''}
                </h3>
                <p className="text-sm text-text-secondary">
                  {upcomingPayments[0].amount.toLocaleString()} CDF - Due le {upcomingPayments[0].dueDate}
                </p>
              </div>
              <Button onClick={() => handleRepayment(upcomingPayments[0].creditId)}>
                Payer maintenant
              </Button>
            </div>
          </Card>
        )}

        {/* Payment History */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Historique des paiements</h2>
            <button className="text-sm text-primary hover:underline flex items-center">
              Tout voir
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-text-secondary border-b border-gray-100">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Montant</th>
                  <th className="pb-3 font-medium">Méthode</th>
                  <th className="pb-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="text-sm">
                    <td className="py-3 text-text-primary">{payment.date}</td>
                    <td className="py-3 font-medium text-text-primary">
                      {payment.amount.toLocaleString()} CDF
                    </td>
                    <td className="py-3 text-text-secondary">{payment.method}</td>
                    <td className="py-3">
                      <Badge variant="success">{payment.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Renewal Option */}
        <Card className="mt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Renouveler votre crédit</h3>
                <p className="text-sm text-text-secondary">
                  Vous avez un bon historique, augmentez votre limite !
                </p>
              </div>
            </div>
            <Link to="/credit/new">
              <Button variant="secondary">
                Demander plus
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
