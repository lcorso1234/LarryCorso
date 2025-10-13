import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function verifyAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    
    if (!token) {
      return false;
    }
    
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return false;
    }
    
    jwt.verify(token, jwtSecret);
    return true;
  } catch (error) {
    return false;
  }
}

export function verifyAdminAuthFromRequest(request: Request): boolean {
  try {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) return false;
    
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(cookie => {
        const [key, value] = cookie.trim().split('=');
        return [key, value];
      })
    );
    
    const token = cookies['admin-token'];
    if (!token) return false;
    
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) return false;
    
    jwt.verify(token, jwtSecret);
    return true;
  } catch (error) {
    return false;
  }
}