// src/components/auth/authController.ts
import { sendMfaCode } from '../../libs/emailService';  // Importa o serviço de envio de e-mail

// Função de login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Lógica de verificação de credenciais (aqui você pode personalizar conforme o banco de dados)
  if (email === 'teste@exemplo.com' && password === '123456') {
    // Gerar código de MFA
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos

    // Enviar código de MFA para o e-mail
    try {
      await sendMfaCode(email, code);
      return res.status(200).json({ message: 'Código de verificação enviado!' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao enviar o código de verificação.' });
    }
  } else {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
};

// Função de verificação do código MFA
export const verifyMfa = async (req, res) => {
  const { email, code } = req.body;

  // Verifique o código de MFA aqui (você pode armazenar isso em um banco de dados ou cache)
  if (code === '123456') {
    return res.status(200).json({ message: 'MFA verificado com sucesso!' });
  } else {
    return res.status(400).json({ error: 'Código inválido' });
  }
};
