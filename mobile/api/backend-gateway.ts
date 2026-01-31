import type { GetToken } from '@clerk/types';

const BASE_URL = `http://${process.env.EXPO_PUBLIC_BACKEND_HOST}`

class _BackendGateway {
    async _get(getToken: GetToken, path: string, body: any = null) {
        const token = await getToken();
        return await fetch(`${BASE_URL}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }
    
    async authTest(getToken: GetToken) {
        return await this._get(getToken, '/api/auth-test')
    }
}

export const BackendGateway = new _BackendGateway();