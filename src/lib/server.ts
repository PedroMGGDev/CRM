// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();  // Carregar as variáveis de ambiente

const app = express();
app.use(express.json());  // Para processar JSON no corpo das requisições

// Usar as rotas de autenticação
app.use(authRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
