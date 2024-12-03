// src/routes/authRoutes.ts
import express from 'express';
import { login, verifyMfa } from '../components/auth/authController';

const router = express.Router();

// Rota de login
router.post('/auth/login', login);

// Rota de verificação do código MFA
router.post('/auth/verify-mfa', verifyMfa);

export default router;
