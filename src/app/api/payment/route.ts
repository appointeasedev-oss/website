/**
 * Payment API route
 *
 * This route is protected, meaning only authenticated users can access this. Auth.js is used to
 * verify that the user is signed in (see `src/middleware.ts`)
 */
import { auth } from '@/auth';
import { PRODUCTS } from '@/data/products';
import { ApiError } from 'square';
import { z } from 'zod';

// Create a Square payment link
// See: https://developer.squareup.com/reference/square/checkout-api/create-payment-link
export async function POST(request: Request) {
    const req = await request.json();
    const schema = z.object({
        product: z.string().min(1),
        customerId: z.string().min(1),
        redirectUrl: z.string().url().min(1),
    });

    // Ensure user is logged in
    const session = await auth();
    if (!session?.user) {
        return new Response(null, { status: 401 });
    }

    const reqBody = schema.safeParse(req);
    if (!reqBody.success) {
        return new Response(JSON.stringify(reqBody.error.format()), { status: 400 });
    }

    if (reqBody.data.product !== 'membership') {
        return new Response('Product does not exist', { status: 400 });
    }

    try {
        // The URL to direct the user is accessed from `url` and `long_url`
        return Response.json({
            url: 'https://example.com/mock-payment-link',
            longUrl: 'https://example.com/mock-payment-link-long',
        });
    } catch (e) {
        if (e instanceof ApiError) {
            return new Response(JSON.stringify(e.errors), { status: e.statusCode });
        }
        return new Response(null, { status: 500 });
    }
}

// Update member's payment status via admin console
export async function PUT(request: Request) {
    const req = await request.json();
    const schema = z.object({
        id: z.string().min(1),
        paid: z.boolean(),
    });

    const session = await auth();
    if (!session?.user?.isAdmin) {
        return new Response(null, { status: 401 });
    }

    const reqBody = schema.safeParse(req);
    if (!reqBody.success) {
        return new Response(JSON.stringify(reqBody.error.format()), { status: 400 });
    }

    return Response.json({ success: true });
}
