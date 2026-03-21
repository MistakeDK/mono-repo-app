'use client';

import Image from 'next/image';
import {
  Input,
  Button,
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@mono/ui-components';
import * as z from 'zod';
import Logo from '../../../public/2do.png';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../hooks/auth/useAuth';
import Link from 'next/link';

const LoginPage = () => {
  const { mutate } = useLogin();
  const schemaLogin = z.object({
    username: z.string().min(1, 'Tên tài khoản là bắt buộc'),
    password: z.string().min(1, 'Mật khẩu là bắt buộc'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schemaLogin>>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate({ body: data });
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <form className="w-full flex flex-col space-y-2" onSubmit={onSubmit}>
        <div className="flex justify-center items-center">
          <Image alt="Logo" src={Logo} className="scale-50" loading="eager" />
        </div>
        <div className="flex flex-col">
          <FieldSet className="w-full">
            <FieldGroup className="gap-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="username" required>
                  Tên tài khoản
                </FieldLabel>
                <Input placeholder="Tên tài khoản" {...register('username')} />
                {
                  <FieldError
                    hidden={typeof errors.username?.message !== 'string'}
                  >
                    {errors.username?.message}
                  </FieldError>
                }
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="password" required>
                  Mật khẩu
                </FieldLabel>
                <Input placeholder="Mật khẩu" {...register('password')} />
                {
                  <FieldError
                    hidden={typeof errors.password?.message !== 'string'}
                  >
                    {errors.password?.message}
                  </FieldError>
                }
              </Field>
            </FieldGroup>
          </FieldSet>
        </div>
        <div className="flex justify-end py-1">
          <Link href="/register" className="text-sm text-blue-500">
            Chưa có tài khoản? Đăng ký
          </Link>
        </div>
        <div className="w-full justify-center items-center flex ">
          <Button children="Đăng nhập" className="w-full" />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
