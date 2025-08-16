import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PaymentProcessing = () => {
  const [selectedMethod, setSelectedMethod] = useState('pix');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);

  const paymentMethods = [
    {
      id: 'pix',
      name: 'PIX',
      icon: 'Zap',
      description: 'Transferência instantânea',
      processingTime: 'Imediato',
      minAmount: 10,
      fees: 'Grátis',
      available: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'CreditCard',
      description: 'Pagamento internacional',
      processingTime: '1-3 dias úteis',
      minAmount: 50,
      fees: '2.9% + R$ 0,60',
      available: true
    },
    {
      id: 'crypto',
      name: 'Criptomoeda',
      icon: 'Bitcoin',
      description: 'Bitcoin, Ethereum',
      processingTime: '10-30 minutos',
      minAmount: 100,
      fees: 'Taxa de rede',
      available: true
    },
    {
      id: 'bank',
      name: 'Transferência Bancária',
      icon: 'Building2',
      description: 'TED/DOC tradicional',
      processingTime: '1-2 dias úteis',
      minAmount: 25,
      fees: 'R$ 3,50',
      available: false
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'withdrawal',
      method: 'PIX',
      amount: 'R$ 2.500,00',
      status: 'completed',
      date: '15/08/2025',
      reference: 'WD-2025-001'
    },
    {
      id: 2,
      type: 'deposit',
      method: 'Spotify',
      amount: 'R$ 892,50',
      status: 'completed',
      date: '14/08/2025',
      reference: 'DP-2025-045'
    },
    {
      id: 3,
      type: 'withdrawal',
      method: 'PayPal',
      amount: 'R$ 1.200,00',
      status: 'processing',
      date: '13/08/2025',
      reference: 'WD-2025-002'
    }
  ];

  const availableBalance = 12567.25;

  const methodOptions = paymentMethods?.filter(method => method?.available)?.map(method => ({
      value: method?.id,
      label: method?.name
    }));

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success/10 text-success', label: 'Concluído', icon: 'CheckCircle' },
      processing: { color: 'bg-warning/10 text-warning', label: 'Processando', icon: 'Clock' },
      failed: { color: 'bg-error/10 text-error', label: 'Falhou', icon: 'XCircle' }
    };

    const config = statusConfig?.[status] || statusConfig?.processing;
    return (
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </div>
    );
  };

  const getTransactionIcon = (type) => {
    return type === 'withdrawal' ? 'ArrowUpRight' : 'ArrowDownLeft';
  };

  const selectedMethodData = paymentMethods?.find(method => method?.id === selectedMethod);

  const handleWithdrawal = () => {
    const amount = parseFloat(withdrawalAmount);
    if (amount >= selectedMethodData?.minAmount && amount <= availableBalance) {
      // Process withdrawal
      setShowWithdrawalForm(false);
      setWithdrawalAmount('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Payment Methods */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Métodos de Pagamento</h2>
          <Button 
            variant="default" 
            onClick={() => setShowWithdrawalForm(true)}
            iconName="Download"
            iconPosition="left"
          >
            Sacar
          </Button>
        </div>

        <div className="space-y-4">
          {paymentMethods?.map((method) => (
            <div 
              key={method?.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                method?.available 
                  ? selectedMethod === method?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50' :'border-border bg-muted/20 cursor-not-allowed opacity-60'
              }`}
              onClick={() => method?.available && setSelectedMethod(method?.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    method?.available ? 'bg-primary/10' : 'bg-muted/30'
                  }`}>
                    <Icon 
                      name={method?.icon} 
                      size={20} 
                      color={method?.available ? "var(--color-primary)" : "var(--color-muted-foreground)"}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{method?.name}</h3>
                    <p className="text-sm text-muted-foreground">{method?.description}</p>
                  </div>
                </div>
                
                {method?.available && selectedMethod === method?.id && (
                  <Icon name="Check" size={20} color="var(--color-primary)" />
                )}
                
                {!method?.available && (
                  <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                    Em breve
                  </span>
                )}
              </div>
              
              {method?.available && (
                <div className="mt-3 grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <p className="text-muted-foreground">Tempo</p>
                    <p className="font-medium text-foreground">{method?.processingTime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Mínimo</p>
                    <p className="font-medium text-foreground">R$ {method?.minAmount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Taxa</p>
                    <p className="font-medium text-foreground">{method?.fees}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Withdrawal Form Modal */}
        {showWithdrawalForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Solicitar Saque</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowWithdrawalForm(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Saldo disponível</p>
                  <p className="text-xl font-semibold text-foreground">
                    R$ {availableBalance?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                
                <Select
                  label="Método de pagamento"
                  options={methodOptions}
                  value={selectedMethod}
                  onChange={setSelectedMethod}
                />
                
                <Input
                  label="Valor do saque"
                  type="number"
                  placeholder="0,00"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e?.target?.value)}
                  description={`Mínimo: R$ ${selectedMethodData?.minAmount || 0}`}
                />
                
                {selectedMethodData && (
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Info" size={16} color="var(--color-accent)" />
                      <span className="text-sm font-medium text-accent">Informações do método</span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>• Tempo de processamento: {selectedMethodData?.processingTime}</p>
                      <p>• Taxa: {selectedMethodData?.fees}</p>
                      <p>• Valor mínimo: R$ {selectedMethodData?.minAmount}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3 pt-4">
                  <Button 
                    variant="default" 
                    onClick={handleWithdrawal}
                    disabled={!withdrawalAmount || parseFloat(withdrawalAmount) < (selectedMethodData?.minAmount || 0)}
                    fullWidth
                  >
                    Confirmar Saque
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowWithdrawalForm(false)}
                    fullWidth
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Transaction History */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Histórico de Transações</h2>
          <Button variant="outline" size="sm">
            Ver Tudo
          </Button>
        </div>

        <div className="space-y-4">
          {recentTransactions?.map((transaction) => (
            <div key={transaction?.id} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  transaction?.type === 'withdrawal' ? 'bg-warning/10' : 'bg-success/10'
                }`}>
                  <Icon 
                    name={getTransactionIcon(transaction?.type)} 
                    size={16} 
                    color={transaction?.type === 'withdrawal' ? "var(--color-warning)" : "var(--color-success)"}
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {transaction?.type === 'withdrawal' ? 'Saque' : 'Depósito'} - {transaction?.method}
                  </p>
                  <p className="text-xs text-muted-foreground">{transaction?.reference}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction?.type === 'withdrawal' ? 'text-warning' : 'text-success'
                }`}>
                  {transaction?.type === 'withdrawal' ? '-' : '+'}{transaction?.amount}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  {getStatusBadge(transaction?.status)}
                  <span className="text-xs text-muted-foreground">{transaction?.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Últimas 3 transações • <span className="text-primary cursor-pointer hover:underline">Ver histórico completo</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;