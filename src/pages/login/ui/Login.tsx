import React, { useEffect, useState } from 'react';

import logo from '@/assets/logo.svg';
import { useLogin } from '@/entities/place';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

export function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: login } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ loginId, password });
  };

  const disabled = loginId.trim() === '' || password.trim() === '';

  useEffect(() => {
    localStorage.removeItem('accessToken');
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-50 px-6 py-8 lg:px-8">
      <div className="w-full max-w-[400px] animate-fade-in">
        <div className="animate-slide-down rounded-2xl bg-white p-6 shadow-lg shadow-primary-200/30 sm:p-8 md:p-10">
          {/* 헤더 */}
          <div className="mb-8 flex items-center gap-3">
            <img
              src={logo}
              alt="KUROOM Logo"
              className="w-10 transition-transform duration-200 hover:scale-105"
            />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-tight text-gray-900">
                KUROOM
              </h1>
              <span className="text-sm font-semibold text-primary-600">
                Admin
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-4">
              <Input
                id="login-id"
                type="text"
                label="아이디"
                placeholder="아이디를 입력하세요"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                autoComplete="username"
              />

              <Input
                id="login-password"
                type="password"
                label="비밀번호"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3"
              disabled={disabled}
            >
              로그인하기
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
