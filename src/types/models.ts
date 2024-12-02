export interface Contact {
  id: string;
  name: string;
  number: string;
  email: string;
  profilePicUrl?: string;
  kanban: string;
  tags: string[];
  cpf: string;
  birthdayDate?: string;
  firstName: string;
  lastName: string;
  businessName?: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Opportunity {
  id: string;
  contactId: string;
  value: number;
  kanbanStage: string;
  status: 'open' | 'won' | 'lost';
  creationDate: string;
  saleDate?: string;
  tags: string[];
  assignedTo?: string;
  tasks: Task[];
  companyId: string;
}

export interface Task {
  id: string;
  opportunityId: string;
  type: 'meeting' | 'call' | 'followup';
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  assignedTo: string;
}

export interface Company {
  id: string;
  name: string;
  users: User[];
  settings: CompanySettings;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  companyId: string;
  profilePicUrl?: string;
}

export interface CompanySettings {
  workingHours: {
    start: string;
    end: string;
  };
  workingDays: number[];
  messageTemplates: MessageTemplate[];
  automationRules: AutomationRule[];
}

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  greetings: string[];
  endings: string[];
  mediaAttachments?: string[];
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: {
    type: 'tag' | 'kanban_stage' | 'schedule';
    value: string;
  };
  action: {
    type: 'send_message' | 'create_task' | 'update_kanban';
    value: string;
  };
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time?: string;
    days?: number[];
  };
}

export interface KanbanStage {
  id: string;
  name: string;
  order: number;
  companyId: string;
}