import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  Calendar,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';

import { useUser } from '../context/UserContext';

type Step = 'amount' | 'purpose' | 'review' | 'result';

export function CreditRequestPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [currentStep, setCurrentStep] = useState<Step>('amount');
  const [formData, setFormData] = useState({
    amount: 100000,
    duration: 3,
    purpose: '',
    purposeOther: '',
  });
  const [isApproved, setIsApproved] = useState(false);

  // Calculate credit details based on user profile
  const maxAmount = user?.creditLimit || 250000;
  const interestRate = 2.5;
  
  const calculateMonthlyPayment = () => {
    const principal = formData.amount;
    const rate = interestRate / 100;
    const months = formData.duration;
    return Math.round(principal * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1));
  };

  const durationOptions = [
    { value: 3, label: '3 mois' },
    { value: 6, label: '6 mois' },
    { value: 12, label: '12 mois' },
  ];

  const purposes = {
    particulier: [
      { value: 'personnel', label: 'Besoins personnels' },
      { value: 'urgence', label: 'Urgence médicale' },
      { value: 'education', label: 'Éducation' },
      { value: 'sante', label: 'Santé' },
      { value: 'logement', label: 'Logement' },
      { value: 'autre', label: 'Autre' },
    ],
    entrepreneur: [
      { value: 'tresorerie', label: 'Trésorerie' },
      { value: 'stock', label: 'Achat de stock' },
      { value: 'equipement', label: 'Équipement' },
      { value: 'investissement', label: 'Investissement' },
      { value: 'autre', label: 'Autre' },
    ],
  };

  const handleSubmit = () => {
    // Simulate credit approval decision
    setIsApproved(formData.amount <= maxAmount && (user?.score || 0) >= 400);
    setCurrentStep('result');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'amount':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary">
                Montant et durée
              </h2>
              <p className="text-text-secondary mt-2">
                Choisissez le montant que vous souhaitez emprunter
              </p>
            </div>

            {/* Amount Slider */}
            <div>
              <div className="flex justify-between mb-4">
                <span className="text-text-secondary">Montant du crédit</span>
                <span className="text-2xl font-bold text-primary">
                  {formData.amount.toLocaleString()} CDF
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max={maxAmount}
                step="10000"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-2 text-sm text-text-secondary">
                <span>10K</span>
                <span>{maxAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Duration Selection */}
            <div>
              <label className="label">Durée de remboursement</label>
              <div className="grid grid-cols-3 gap-3">
                {durationOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, duration: option.value })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.duration === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Calendar className={`w-6 h-6 mx-auto mb-2 ${
                      formData.duration === option.value ? 'text-primary' : 'text-text-secondary'
                    }`} />
                    <p className="font-medium text-text-primary">{option.label}</p>
                    <p className="text-xs text-text-secondary">
                      {(formData.amount / option.value / 30).toFixed(0)}K/jour
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Estimate */}
            <Card className="bg-primary/5 border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Mensualité estimée</p>
                  <p className="text-3xl font-bold text-text-primary">
                    {calculateMonthlyPayment().toLocaleString()} CDF
                  </p>
                  <p className="text-sm text-text-secondary">
                    Taux {interestRate}%/mois • Total: {(calculateMonthlyPayment() * formData.duration).toLocaleString()} CDF
                  </p>
                </div>
                <DollarSign className="w-12 h-12 text-primary/20" />
              </div>
            </Card>
          </div>
        );

      case 'purpose':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary">
                Motif du crédit
              </h2>
              <p className="text-text-secondary mt-2">
                Pour quoi allez-vous utiliser cet argent ?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(purposes[user?.type === 'entrepreneur' ? 'entrepreneur' : 'particulier'] as typeof purposes.particulier).map((purpose) => (
                <button
                  key={purpose.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, purpose: purpose.value })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.purpose === purpose.value
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FileText className={`w-6 h-6 mb-2 ${
                    formData.purpose === purpose.value ? 'text-primary' : 'text-text-secondary'
                  }`} />
                  <p className="font-medium text-text-primary">{purpose.label}</p>
                </button>
              ))}
            </div>

            {formData.purpose === 'autre' && (
              <div className="animate-fade-in">
                <Input
                  label="Précisez le motif"
                  placeholder="Décrivez votre besoin..."
                  value={formData.purposeOther}
                  onChange={(e) => setFormData({ ...formData, purposeOther: e.target.value })}
                />
              </div>
            )}
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary">
                Vérifiez votre demande
              </h2>
              <p className="text-text-secondary mt-2">
                Vérifiez les informations avant de soumettre
              </p>
            </div>

            <Card>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-text-secondary">Montant demandé</span>
                  <span className="font-semibold text-text-primary">
                    {formData.amount.toLocaleString()} CDF
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-text-secondary">Durée</span>
                  <span className="font-semibold text-text-primary">
                    {formData.duration} mois
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-text-secondary">Mensualité</span>
                  <span className="font-semibold text-text-primary">
                    {calculateMonthlyPayment().toLocaleString()} CDF
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-text-secondary">Taux d'intérêt</span>
                  <span className="font-semibold text-text-primary">{interestRate}%/mois</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-text-secondary">Total à rembourser</span>
                  <span className="font-bold text-primary text-lg">
                    {(calculateMonthlyPayment() * formData.duration).toLocaleString()} CDF
                  </span>
                </div>
              </div>
            </Card>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-primary rounded border-gray-300" />
              <span className="text-sm text-text-secondary">
                J'accepte les conditions générales de prêt et m'engage à rembourser selon les échéances prévues
              </span>
            </label>

            {/* Signature/PIN Input */}
            <div>
              <label className="label">Entrez votre code PIN pour signer</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <input
                    key={i}
                    type="password"
                    maxLength={1}
                    className="w-14 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="•"
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="text-center py-8">
            {isApproved ? (
              <>
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Félicitations ! 🎉
                </h2>
                <p className="text-text-secondary mb-6">
                  Votre demande de crédit a été approuvée !
                </p>
                <Card className="bg-secondary/5 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-text-secondary mb-1">Montant approuvé</p>
                    <p className="text-4xl font-bold text-text-primary">
                      {formData.amount.toLocaleString()} CDF
                    </p>
                    <p className="text-sm text-text-secondary mt-2">
                      Fonds envoyés vers votre Mobile Money dans 2-5 minutes
                    </p>
                  </div>
                </Card>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate('/dashboard')}>
                    Voir mon tableau de bord
                  </Button>
                  <Button variant="secondary" onClick={() => navigate('/repayment')}>
                    Voir les détails de remboursement
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">😔</span>
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Demande non approuvée
                </h2>
                <p className="text-text-secondary mb-6">
                  Votre score actuel ne permet pas d'obtenir ce montant
                </p>
                <Card className="bg-accent/5 mb-6 text-left">
                  <h3 className="font-semibold text-text-primary mb-3">Suggestions pour améliorer votre score :</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li className="flex items-start space-x-2">
                      <span>•</span>
                      <span>Augmentez votre activité Mobile Money</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span>•</span>
                      <span>Remboursez vos crédits en cours à temps</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span>•</span>
                      <span>Réduisez le montant demandé</span>
                    </li>
                  </ul>
                </Card>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="secondary" onClick={() => setCurrentStep('amount')}>
                    Modifier la demande
                  </Button>
                  <Button onClick={() => navigate('/dashboard')}>
                    Retour au dashboard
                  </Button>
                </div>
              </>
            )}
          </div>
        );
    }
  };

  const stepLabels = ['Montant', 'Motif', 'Vérification', 'Résultat'];

  return (
    <div className="min-h-screen bg-surface-secondary pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {stepLabels.map((label, index) => {
              const stepOrder: Step[] = ['amount', 'purpose', 'review', 'result'];
              const stepIndex = stepOrder.indexOf(currentStep);
              const isActive = index === stepIndex;
              const isCompleted = index < stepIndex;

              return (
                <React.Fragment key={label}>
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${isCompleted ? 'bg-secondary text-white' : ''}
                      ${isActive ? 'bg-primary text-white' : ''}
                      ${!isActive && !isCompleted ? 'bg-gray-200 text-text-secondary' : ''}
                    `}>
                      {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                    <span className={`text-xs mt-1 hidden sm:block ${isActive ? 'text-primary' : 'text-text-secondary'}`}>
                      {label}
                    </span>
                  </div>
                  {index < stepLabels.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      stepIndex > index ? 'bg-secondary' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card>
          {renderStep()}

          {/* Navigation Buttons */}
          {currentStep !== 'result' && (
            <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-100">
              {currentStep !== 'amount' && currentStep !== 'purpose' && (
                <Button variant="secondary" onClick={() => {
                  const stepOrder: Step[] = ['amount', 'purpose', 'review', 'result'];
                  const currentIndex = stepOrder.indexOf(currentStep);
                  setCurrentStep(stepOrder[currentIndex - 1]);
                }} fullWidth>
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Retour
                </Button>
              )}
              {currentStep === 'purpose' ? (
                <Button onClick={() => setCurrentStep('review')} fullWidth>
                  Suivant
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : currentStep === 'review' ? (
                <Button onClick={handleSubmit} fullWidth>
                  Soumettre ma demande
                </Button>
              ) : (
                <Button onClick={() => setCurrentStep('purpose')} fullWidth>
                  Suivant
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
