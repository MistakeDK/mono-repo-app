'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
} from '@mono/ui-components';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useRegister } from '../../hooks/auth/useAuth';
import Logo from '../../../public/2do.png';

const RegisterPage = () => {
  const { mutate } = useRegister();
  const schemaRegister = z
    .object({
      username: z.string().min(1, 'Tên tài khoản là bắt buộc'),
      password: z.string().min(1, 'Mật khẩu là bắt buộc'),
      rePassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
      gmail: z.email('Email không hợp lệ'),
    })
    .refine((data) => data.password === data.rePassword, {
      message: 'Mật khẩu xác nhận không khớp',
      path: ['rePassword'],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schemaRegister>>({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      username: '',
      password: '',
      rePassword: '',
      gmail: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate({ body: data });
  });

  return (
    <div className="flex flex-col justify-center items-center p-4 w-full h-full">
      <form className="flex flex-col space-y-2 w-full" onSubmit={onSubmit}>
        <div className="flex justify-center items-center">
          <Image alt="Logo" src={Logo} className="scale-50" loading="eager" />
        </div>
        <div className="flex flex-col">
          <FieldSet className="w-full">
            <FieldGroup className="gap-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="Gmail">Gmail</FieldLabel>
                <Input placeholder="Gmail " {...register('gmail')} />
                <FieldError hidden={typeof errors.gmail?.message !== 'string'}>
                  {errors.username?.message}
                </FieldError>
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="username" required>
                  Tên tài khoản
                </FieldLabel>
                <Input placeholder="Tên tài khoản" {...register('username')} />
                <FieldError
                  hidden={typeof errors.username?.message !== 'string'}
                >
                  {errors.username?.message}
                </FieldError>
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="password" required>
                  Mật khẩu
                </FieldLabel>
                <Input
                  type="password"
                  placeholder="Mật khẩu"
                  {...register('password')}
                />
                <FieldError
                  hidden={typeof errors.password?.message !== 'string'}
                >
                  {errors.password?.message}
                </FieldError>
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="rePassword" required>
                  Xác nhận mật khẩu
                </FieldLabel>
                <Input
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  {...register('rePassword')}
                />
                <FieldError
                  hidden={typeof errors.rePassword?.message !== 'string'}
                >
                  {errors.rePassword?.message}
                </FieldError>
              </Field>
            </FieldGroup>
          </FieldSet>
        </div>
        <div className="flex justify-center items-center w-full">
          <Button children="Đăng nhập" className="w-full" />
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
