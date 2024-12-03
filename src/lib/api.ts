import axios from 'axios';
import type { Contact, Opportunity, Company, User, Task } from '../types/models';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Auth
export const login = (email: string, password: string) => 
  api.post('/auth/login', { email, password });

export const verifyMfa = (email: string, code: string) =>
  api.post('/auth/verify-mfa', { email, code });

// Contacts
export const getContacts = (companyId: string) =>
  api.get<Contact[]>(`/companies/${companyId}/contacts`);

export const createContact = (companyId: string, contact: Partial<Contact>) =>
  api.post<Contact>(`/companies/${companyId}/contacts`, contact);

export const updateContact = (companyId: string, contactId: string, contact: Partial<Contact>) =>
  api.put<Contact>(`/companies/${companyId}/contacts/${contactId}`, contact);

// Opportunities
export const getOpportunities = (companyId: string) =>
  api.get<Opportunity[]>(`/companies/${companyId}/opportunities`);

export const createOpportunity = (companyId: string, opportunity: Partial<Opportunity>) =>
  api.post<Opportunity>(`/companies/${companyId}/opportunities`, opportunity);

export const updateOpportunity = (companyId: string, opportunityId: string, opportunity: Partial<Opportunity>) =>
  api.put<Opportunity>(`/companies/${companyId}/opportunities/${opportunityId}`, opportunity);

// Tasks
export const getTasks = (companyId: string, opportunityId: string) =>
  api.get<Task[]>(`/companies/${companyId}/opportunities/${opportunityId}/tasks`);

export const createTask = (companyId: string, opportunityId: string, task: Partial<Task>) =>
  api.post<Task>(`/companies/${companyId}/opportunities/${opportunityId}/tasks`, task);

export const updateTask = (companyId: string, opportunityId: string, taskId: string, task: Partial<Task>) =>
  api.put<Task>(`/companies/${companyId}/opportunities/${opportunityId}/tasks/${taskId}`, task);

// Companies
export const getCompany = (companyId: string) =>
  api.get<Company>(`/companies/${companyId}`);

export const updateCompany = (companyId: string, company: Partial<Company>) =>
  api.put<Company>(`/companies/${companyId}`, company);

// Users
export const getUsers = (companyId: string) =>
  api.get<User[]>(`/companies/${companyId}/users`);

export const createUser = (companyId: string, user: Partial<User>) =>
  api.post<User>(`/companies/${companyId}/users`, user);

export const updateUser = (companyId: string, userId: string, user: Partial<User>) =>
  api.put<User>(`/companies/${companyId}/users/${userId}`, user);

// Webhooks
export const handleContactWebhook = (data: any) =>
  api.post('/webhooks/contact', data);

export const handleKanbanWebhook = (data: any) =>
  api.post('/webhooks/kanban', data);

// Messages
export const sendMessage = (companyId: string, contactId: string, message: {
  content: string;
  mediaUrl?: string;
}) =>
  api.post(`/companies/${companyId}/contacts/${contactId}/messages`, message);

export const scheduleMessage = (companyId: string, contactId: string, message: {
  content: string;
  mediaUrl?: string;
  scheduleDate: string;
}) =>
  api.post(`/companies/${companyId}/contacts/${contactId}/schedule-message`, message);

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

    // Retorna os dados no formato esperado
    return {
      contactsTotal: contacts.length,
      contactsTrend: '+10%', // Exemplo fictício; ajuste conforme necessário
      openOpportunities: opportunities.length,
      opportunitiesTrend: '+5%', // Exemplo fictício
      totalValue,
      totalValueTrend: '+8%', // Exemplo fictício
      conversionRate,
      conversionRateTrend: '+2%', // Exemplo fictício
    };
  } catch (error) {
    console.error('Erro ao buscar dados do Dashboard:', error);
    throw error;
  }
};

export default api;
