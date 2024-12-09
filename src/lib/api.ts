import axios from 'axios';
import type { Contact, Opportunity } from '../types/models';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Dashboard
export const getDashboardData = async (companyId: string) => {
  try {
    // Reutilizando APIs existentes
    const [contactsResponse, opportunitiesResponse] = await Promise.all([
      getContacts(companyId), // Retorna a lista de contatos
      getOpportunities(companyId), // Retorna a lista de oportunidades
    ]);

    const contacts = contactsResponse.data;
    const opportunities = opportunitiesResponse.data;

    // Cálculos agregados
    const totalValue = opportunities.reduce((sum, opp) => sum + (opp.value || 0), 0);
    const conversionRate =
      opportunities.length > 0
        ? ((contacts.length / opportunities.length) * 100).toFixed(2)
        : '0';

    // Considerando os dados históricos (valores anteriores)
    const previousContactsTotal = 100; // Exemplo fictício, substitua com dados reais
    const previousOpenOpportunities = 50; // Exemplo fictício, substitua com dados reais
    const previousTotalValue = 15000; // Exemplo fictício, substitua com dados reais
    const previousConversionRate = 50; // Exemplo fictício, substitua com dados reais

    // Retorna os dados no formato esperado
    return {
      contactsTotal: contacts.length,
      previousContactsTotal,
      openOpportunities: opportunities.length,
      previousOpenOpportunities,
      totalValue,
      previousTotalValue,
      conversionRate,
      previousConversionRate,
    };
  } catch (error) {
    console.error('Erro ao buscar dados do Dashboard:', error);
    throw error;
  }
};

// API de contatos e oportunidades
export const getContacts = (companyId: string) =>
  api.get<Contact[]>(`/companies/${companyId}/contacts`);

export const getOpportunities = (companyId: string) =>
  api.get<Opportunity[]>(`/companies/${companyId}/opportunities`);

export default api;
