import type { GetToken } from '@clerk/types';

const BASE_URL = `http://${process.env.EXPO_PUBLIC_BACKEND_HOST}`

class _BackendGateway {
    async _do(method: string, path: string, getToken: GetToken, body: any = null) {
        const token = await getToken();
        return await fetch(`${BASE_URL}${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: body ? JSON.stringify(body) : null,
        });
    }
    
    async authTest(getToken: GetToken) {
        return await this._do('GET', '/api/auth-test', getToken)
    }

    async userLoggedIn(getToken: GetToken, userId: string, email: string) {
        return await this._do('PUT', '/api/user-logged-in', getToken, { userId, email } );
    }
}

export const BackendGateway = new _BackendGateway();