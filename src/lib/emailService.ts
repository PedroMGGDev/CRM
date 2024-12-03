// src/libs/emailService.ts
import nodemailer from 'nodemailer';

// Criar o transporte de e-mail com as variáveis de ambiente
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,  // Exemplo: smtp.gmail.com
  port: Number(process.env.EMAIL_PORT), // Exemplo: 587
  secure: false, // Usar TLS
  auth: {
    user: process.env.EMAIL_USER, // Seu e-mail real
    pass: process.env.EMAIL_PASS, // Senha de aplicativo ou senha
  },
});

// Função para enviar o código de MFA
export const sendMfaCode = async (email: string, code: string) => {
  try {
    await transporter.sendMail({
      from: `"Sua Empresa" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Seu Código de Verificação',
      text: `Seu código de verificação é: ${code}`,
    });
    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw new Error('Erro ao enviar e-mail');
  }
};
