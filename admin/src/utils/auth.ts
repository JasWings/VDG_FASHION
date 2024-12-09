
// export function isAuthenticated(): boolean {
//     const token = localStorage.getItem('token');
//     return !!token;
//   }
  
//   export function requireAuth(ctx): void {
//     if (!isAuthenticated()) {
//       ctx.res.writeHead(302, { Location: 'auth/sign-in' });
//       ctx.res.end();
//     }
//   }
// src/utils/auth.ts

// src/utils/auth.ts

// src/utils/auth.ts

import { NextPageContext } from 'next';

export function isAuthenticated(): boolean {
  const token = localStorage.getItem('token');
  return !!token;
}

export function requireAuth(ctx: NextPageContext): void {
  const { res } = ctx;

  if (!isAuthenticated()) {
    if (res) {
      if (window.location.pathname !== '/auth/sign-in') {
        window.location.href = '/auth/sign-in';
      }
    }
  }
}






  