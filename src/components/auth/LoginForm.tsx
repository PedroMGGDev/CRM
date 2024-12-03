import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import api from '../../lib/api'; // Certifique-se de que o arquivo API está configurado corretamente

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

const mfaSchema = z.object({
  code: z.string().length(6, 'Código deve ter 6 dígitos'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type MfaFormData = z.infer<typeof mfaSchema>;

export default function LoginForm() {
  const [needsMfa, setNeedsMfa] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerMfa,
    handleSubmit: handleMfaSubmit,
    formState: { errors: mfaErrors },
  } = useForm<MfaFormData>({
    resolver: zodResolver(mfaSchema),
  });

  // Submeter o formulário de login
  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      });

      // Salvar o e-mail e habilitar o segundo passo de MFA
      setEmail(data.email);
      setNeedsMfa(true);

      console.log('Código enviado ao e-mail com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data || error.message);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  // Submeter o formulário de verificação MFA
  const onMfaSubmit = async (data: MfaFormData) => {
    try {
      const response = await api.post('/auth/verify-mfa', {
        email: email,
        code: data.code,
      });

      // Salvar o usuário autenticado no estado global
      setCurrentUser(response.data.user);
      navigate('/');

      console.log('Login realizado com sucesso!');
    } catch (error) {
      console.error('Erro na verificação MFA:', error.response?.data || error.message);
      alert('Erro na verificação MFA. Verifique o código e tente novamente.');
    }
  };

  if (needsMfa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verificação em duas etapas
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Digite o código enviado para seu email
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleMfaSubmit(onMfaSubmit)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="code" className="sr-only">
                  Código de verificação
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...registerMfa('code')}
                    type="text"
                    className="appearance-none rounded-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Digite o código de 6 dígitos"
                  />
                </div>
                {mfaErrors.code && (
                  <p className="mt-2 text-sm text-red-600">{mfaErrors.code.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verificar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entre na sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit(onLoginSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  {...registerLogin('email')}
                  type="email"
                  className="appearance-none rounded-t-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              {loginErrors.email && (
                <p className="mt-2 text-sm text-red-600">{loginErrors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  {...registerLogin('password')}
                  type="password"
                  className="appearance-none rounded-b-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                />
              </div>
              {loginErrors.password && (
                <p className="mt-2 text-sm text-red-600">{loginErrors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
