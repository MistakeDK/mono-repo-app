import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase';
import { ApiResponse } from '@mono/utils';

interface LoginPayload {
  username: string;
  password: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const body: LoginPayload = await request.json();
    if (!body.username || !body.password) {
      return NextResponse.json(
        ApiResponse.badRequest('Thiếu tên tài khoản hoặc mật khẩu'),
      );
    }

    const { data: user, error: queryError } = await supabaseAdmin
      .from('User')
      .select('*')
      .eq('username', body.username)
      .single();

    if (queryError || !user) {
      return NextResponse.json(
        ApiResponse.badRequest('Tên tài khoản hoặc mật khẩu không chính xác'),
      );
    }

    if (user.password !== body.password) {
      return NextResponse.json(
        ApiResponse.badRequest('Tên tài khoản hoặc mật khẩu không chính xác'),
      );
    }

    const response = NextResponse.json(
      ApiResponse.ok('Đăng nhập thành công', { user }),
    );

    response.cookies.set('user_session', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(ApiResponse.internalServerError('Lỗi máy chủ'));
  }
};
