import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReleaseTable = ({ releases, onEdit, onDuplicate, onDelete, onViewDetails }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (releaseId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(releaseId)) {
      newExpanded?.delete(releaseId);
    } else {
      newExpanded?.add(releaseId);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-success text-success-foreground';
      case 'processing':
        return 'bg-warning text-warning-foreground';
      case 'pending':
        return 'bg-secondary text-secondary-foreground';
      case 'failed':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('pt-BR');
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('pt-BR')?.format(num);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">Faixa</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Data de Lançamento</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Plataformas</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Streams</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Receita</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody>
            {releases?.map((release) => (
              <React.Fragment key={release?.id}>
                <tr className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={release?.artwork}
                        alt={release?.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-foreground">{release?.title}</h3>
                        <p className="text-sm text-muted-foreground">{release?.artist}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{formatDate(release?.releaseDate)}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(release?.status)}`}>
                      {release?.status === 'live' && 'Ativo'}
                      {release?.status === 'processing' && 'Processando'}
                      {release?.status === 'pending' && 'Pendente'}
                      {release?.status === 'failed' && 'Falhou'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      {release?.platforms?.slice(0, 3)?.map((platform, index) => (
                        <div
                          key={index}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            platform?.status === 'live' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                          }`}
                          title={platform?.name}
                        >
                          {platform?.name?.charAt(0)}
                        </div>
                      ))}
                      {release?.platforms?.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{release?.platforms?.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{formatNumber(release?.totalStreams)}</td>
                  <td className="p-4 text-foreground">R$ {formatNumber(release?.totalRevenue)}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpansion(release?.id)}
                        iconName={expandedRows?.has(release?.id) ? "ChevronUp" : "ChevronDown"}
                        iconSize={16}
                      >
                        Detalhes
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(release)}
                        iconName="Edit"
                        iconSize={16}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDuplicate(release)}
                        iconName="Copy"
                        iconSize={16}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(release)}
                        iconName="Trash2"
                        iconSize={16}
                      />
                    </div>
                  </td>
                </tr>
                {expandedRows?.has(release?.id) && (
                  <tr>
                    <td colSpan="7" className="p-0">
                      <div className="bg-muted/10 p-6 border-t border-border">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-medium text-foreground mb-3">Status das Plataformas</h4>
                            <div className="space-y-2">
                              {release?.platforms?.map((platform, index) => (
                                <div key={index} className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">{platform?.name}</span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(platform?.status)}`}>
                                    {platform?.status === 'live' && 'Ativo'}
                                    {platform?.status === 'processing' && 'Processando'}
                                    {platform?.status === 'pending' && 'Pendente'}
                                    {platform?.status === 'failed' && 'Falhou'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-3">Métricas de Performance</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Streams Totais:</span>
                                <span className="text-sm text-foreground">{formatNumber(release?.totalStreams)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Receita Total:</span>
                                <span className="text-sm text-foreground">R$ {formatNumber(release?.totalRevenue)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">RPM Médio:</span>
                                <span className="text-sm text-foreground">R$ {(release?.totalRevenue / release?.totalStreams * 1000)?.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-3">Recomendações de Otimização</h4>
                            <div className="space-y-2">
                              {release?.optimizationTips?.map((tip, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                  <Icon name="Lightbulb" size={14} className="text-warning mt-0.5" />
                                  <span className="text-xs text-muted-foreground">{tip}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {releases?.map((release) => (
          <div key={release?.id} className="border-b border-border last:border-b-0">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Image
                  src={release?.artwork}
                  alt={release?.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{release?.title}</h3>
                  <p className="text-sm text-muted-foreground">{release?.artist}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(release?.releaseDate)}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(release?.status)}`}>
                  {release?.status === 'live' && 'Ativo'}
                  {release?.status === 'processing' && 'Processando'}
                  {release?.status === 'pending' && 'Pendente'}
                  {release?.status === 'failed' && 'Falhou'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Streams</p>
                  <p className="text-sm font-medium text-foreground">{formatNumber(release?.totalStreams)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Receita</p>
                  <p className="text-sm font-medium text-foreground">R$ {formatNumber(release?.totalRevenue)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {release?.platforms?.slice(0, 4)?.map((platform, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        platform?.status === 'live' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                      }`}
                      title={platform?.name}
                    >
                      {platform?.name?.charAt(0)}
                    </div>
                  ))}
                  {release?.platforms?.length > 4 && (
                    <span className="text-xs text-muted-foreground">+{release?.platforms?.length - 4}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRowExpansion(release?.id)}
                    iconName={expandedRows?.has(release?.id) ? "ChevronUp" : "ChevronDown"}
                    iconSize={16}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(release)}
                    iconName="Edit"
                    iconSize={16}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDuplicate(release)}
                    iconName="Copy"
                    iconSize={16}
                  />
                </div>
              </div>

              {expandedRows?.has(release?.id) && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Status das Plataformas</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {release?.platforms?.map((platform, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{platform?.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(platform?.status)}`}>
                              {platform?.status === 'live' && 'Ativo'}
                              {platform?.status === 'processing' && 'Processando'}
                              {platform?.status === 'pending' && 'Pendente'}
                              {platform?.status === 'failed' && 'Falhou'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Recomendações</h4>
                      <div className="space-y-1">
                        {release?.optimizationTips?.slice(0, 2)?.map((tip, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Icon name="Lightbulb" size={12} className="text-warning mt-0.5" />
                            <span className="text-xs text-muted-foreground">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReleaseTable;