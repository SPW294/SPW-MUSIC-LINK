import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RoyaltyDistribution = () => {
  const [collaborators, setCollaborators] = useState([
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      role: "Compositor",
      percentage: 40,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      role: "Vocalista",
      percentage: 35,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@email.com",
      role: "Produtor",
      percentage: 25,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ]);

  const [newCollaborator, setNewCollaborator] = useState({
    name: '',
    email: '',
    role: '',
    percentage: 0
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const totalPercentage = collaborators?.reduce((sum, collab) => sum + collab?.percentage, 0);

  const handlePercentageChange = (id, newPercentage) => {
    setCollaborators(prev => 
      prev?.map(collab => 
        collab?.id === id 
          ? { ...collab, percentage: Math.max(0, Math.min(100, newPercentage)) }
          : collab
      )
    );
  };

  const handleAddCollaborator = () => {
    if (newCollaborator?.name && newCollaborator?.email && newCollaborator?.percentage > 0) {
      const newId = Math.max(...collaborators?.map(c => c?.id)) + 1;
      setCollaborators(prev => [...prev, { ...newCollaborator, id: newId, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face" }]);
      setNewCollaborator({ name: '', email: '', role: '', percentage: 0 });
      setShowAddForm(false);
    }
  };

  const handleRemoveCollaborator = (id) => {
    setCollaborators(prev => prev?.filter(collab => collab?.id !== id));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Distribuição de Royalties</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie a divisão de receitas entre colaboradores
          </p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setShowAddForm(!showAddForm)}
          iconName="Plus"
          iconPosition="left"
        >
          Adicionar Colaborador
        </Button>
      </div>
      {/* Total Percentage Indicator */}
      <div className={`mb-6 p-4 rounded-lg border ${
        totalPercentage === 100 
          ? 'bg-success/10 border-success/20' :'bg-warning/10 border-warning/20'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon 
              name={totalPercentage === 100 ? "CheckCircle" : "AlertTriangle"} 
              size={20} 
              color={totalPercentage === 100 ? "var(--color-success)" : "var(--color-warning)"}
            />
            <span className={`font-medium ${
              totalPercentage === 100 ? 'text-success' : 'text-warning'
            }`}>
              Total: {totalPercentage}%
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {totalPercentage === 100 ? 'Distribuição completa' : 'Ajuste necessário'}
          </span>
        </div>
      </div>
      {/* Add Collaborator Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-muted/20 rounded-lg border border-border">
          <h3 className="text-lg font-medium text-foreground mb-4">Novo Colaborador</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome"
              type="text"
              placeholder="Nome do colaborador"
              value={newCollaborator?.name}
              onChange={(e) => setNewCollaborator(prev => ({ ...prev, name: e?.target?.value }))}
            />
            <Input
              label="Email"
              type="email"
              placeholder="email@exemplo.com"
              value={newCollaborator?.email}
              onChange={(e) => setNewCollaborator(prev => ({ ...prev, email: e?.target?.value }))}
            />
            <Input
              label="Função"
              type="text"
              placeholder="Ex: Compositor, Vocalista"
              value={newCollaborator?.role}
              onChange={(e) => setNewCollaborator(prev => ({ ...prev, role: e?.target?.value }))}
            />
            <Input
              label="Porcentagem (%)"
              type="number"
              placeholder="0"
              min="0"
              max="100"
              value={newCollaborator?.percentage}
              onChange={(e) => setNewCollaborator(prev => ({ ...prev, percentage: parseInt(e?.target?.value) || 0 }))}
            />
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <Button variant="default" onClick={handleAddCollaborator}>
              Adicionar
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
      {/* Collaborators List */}
      <div className="space-y-4">
        {collaborators?.map((collaborator) => (
          <div key={collaborator?.id} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg border border-border">
            <div className="flex items-center space-x-4">
              <img
                src={collaborator?.avatar}
                alt={collaborator?.name}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
              <div>
                <h4 className="font-medium text-foreground">{collaborator?.name}</h4>
                <p className="text-sm text-muted-foreground">{collaborator?.email}</p>
                <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mt-1">
                  {collaborator?.role}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={collaborator?.percentage}
                  onChange={(e) => handlePercentageChange(collaborator?.id, parseInt(e?.target?.value) || 0)}
                  className="w-20 text-center"
                />
                <span className="text-muted-foreground">%</span>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-foreground">
                  R$ {(12567.25 * collaborator?.percentage / 100)?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground">Valor estimado</p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveCollaborator(collaborator?.id)}
                className="text-error hover:text-error hover:bg-error/10"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          {collaborators?.length} colaborador(es) • Total disponível: R$ 12.567,25
        </div>
        <Button variant="default" disabled={totalPercentage !== 100}>
          Salvar Distribuição
        </Button>
      </div>
    </div>
  );
};

export default RoyaltyDistribution;