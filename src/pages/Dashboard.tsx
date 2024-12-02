import React from 'react';
import { BarChart, Users, DollarSign, Target } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total de Contatos"
          value="1,234"
          icon={Users}
          trend="+12.5%"
        />
        <DashboardCard
          title="Oportunidades Abertas"
          value="45"
          icon={Target}
          trend="+5.2%"
        />
        <DashboardCard
          title="Valor Total"
          value="R$ 123.456"
          icon={DollarSign}
          trend="+8.1%"
        />
        <DashboardCard
          title="Taxa de Conversão"
          value="32%"
          icon={BarChart}
          trend="+2.3%"
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
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
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