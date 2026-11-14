import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { getSession } from '@/lib/api/core/server';



export async function POST() {
      const UserSession = await getSession()
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
           price: 'price_1UbKdbRgEftXf3oaeTWekVo9',
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email:UserSession?.user.email,
      metadata:{
        user_id:UserSession?.user.email,
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      integration_identifier: 'hire-loop-web',
    });
    return NextResponse.redirect(session.url as string , 303)
  } catch (err) {
    const error= err instanceof Error? err : new Error (String(err))
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}