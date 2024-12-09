import React from 'react';
import { BarChart, Users, DollarSign, Target } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '../lib/api'; // API para buscar os dados do Dashboard

interface DashboardProps {
  companyId: string; // Adicionando o parâmetro companyId
}

export default function Dashboard({ companyId }: DashboardProps) {
  const { data: dashboardData, error, isLoading } = useQuery({
    queryKey: ['dashboard', companyId], // Incluindo companyId na chave da query
    queryFn: () => getDashboardData(companyId), // Passando companyId para a API
  });

  if (isLoading) {
    return <div>Carregando...</div>; // Exibindo loading enquanto os dados estão sendo carregados
  }

  if (error instanceof Error) {
    return <div>Erro ao carregar dados: {error.message}</div>; // Exibindo mensagem de erro caso ocorra algum problema
  }

  // Calcular tendência com base nos dados reais
  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return '+0%'; // Se não houver dado anterior, não há tendência
    const trend = ((current - previous) / previous) * 100;
    return `${trend.toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total de Contatos"
          value={dashboardData?.contactsTotal || '0'}
          icon={Users}
          trend={calculateTrend(dashboardData?.contactsTotal, dashboardData?.previousContactsTotal)}
        />
        <DashboardCard
          title="Oportunidades Abertas"
          value={dashboardData?.openOpportunities || '0'}
          icon={Target}
          trend={calculateTrend(dashboardData?.openOpportunities, dashboardData?.previousOpenOpportunities)}
        />
        <DashboardCard
          title="Valor Total"
          value={`R$ ${dashboardData?.totalValue || '0'}`}
          icon={DollarSign}
          trend={calculateTrend(dashboardData?.totalValue, dashboardData?.previousTotalValue)}
        />
        <DashboardCard
          title="Taxa de Conversão"
          value={`${dashboardData?.conversionRate || '0'}%`}
          icon={BarChart}
          trend={calculateTrend(
            parseFloat(dashboardData?.conversionRate || '0'),
            parseFloat(dashboardData?.previousConversionRate || '0')
          )}
        />
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend: string;
}

function DashboardCard({ title, value, icon: Icon, trend }: DashboardCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  {trend}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
