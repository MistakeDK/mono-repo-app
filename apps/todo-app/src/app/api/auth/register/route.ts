import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase';
import { ApiResponse } from '@mono/utils';
import { IRegisterPayload } from '../../../../hooks/auth/auth.interface';

export const POST = async (request: NextRequest) => {
  try {
    const body: IRegisterPayload = await request.json();
    if (!body.username || !body.password) {
      return NextResponse.json(
        ApiResponse.badRequest('Thiếu tên tài khoản hoặc mật khẩu'),
      );
    }
    const { data, error } = await supabaseAdmin.from('User').insert({
      username: body.username,
      password: body.password,
      gmail: body.gmail,
    });
    if (error) {
      return NextResponse.json(
        ApiResponse.badRequest('Đăng ký không thành công', { data, error }),
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      ApiResponse.ok('Đăng ký thành công', { data, error }),
      {
        status: 201,
      },
    );
  } catch (err) {
    return NextResponse.json(
      ApiResponse.internalServerError('Lỗi máy chủ', {
        error: process.env.NODE_ENV === 'production' ? null : err,
      }),
      {
        status: 500,
      },
    );
  }
};
