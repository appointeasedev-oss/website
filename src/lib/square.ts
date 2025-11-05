import { env } from '@/env.mjs';
import { Client, Environment } from 'square';

const mockSquareClient = {
    // Add mock implementations of the Square client methods that your application uses
    // For example:
    // paymentsApi: {
    //     createPayment: async (body) => ({
    //         result: { payment: { id: 'mock_payment_id' } },
    //         statusCode: 200,
    //     }),
    // },
    // locationsApi: {
    //     retrieveLocation: async (locationId) => ({
    //         result: { location: { id: locationId, name: 'Mock Location' } },
    //         statusCode: 200,
    //     })
    // }
};

export const squareClient = env.SQUARE_ACCESS_TOKEN
    ? new Client({
          accessToken: env.SQUARE_ACCESS_TOKEN,
          environment:
              process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox,
      })
    : (mockSquareClient as any);
