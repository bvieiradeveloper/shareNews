import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../services/faunadb";
import { query as q} from "faunadb";
import { stripe } from "../../services/stripe";

type User = {
  data:{
    stripe_customer_id: string
  }
  ref:{
    id: string
  }
}
export default async (request: NextApiRequest, response: NextApiResponse) => {

  if(request.method === "POST"){

    const session = await getSession({ req:  request})

    const user = await fauna.query<User>(q.Get(
      q.Match(
        q.Index('user_by_email'),
        q.Casefold(session.user.email)
      )
    ))

    let customerId = user.data.stripe_customer_id;

    if(!customerId){
      const stripeCustomer = await stripe.customers.create({
        email: session.user?.email
      });

      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data:{
              stripe_customer_id: stripeCustomer.id
            }
          }
        )
      )
      customerId: stripeCustomer.id
    }
  

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      line_items:[{
        price: 'price_1KxfhSKanPmOYKpp1LjsBa3G',quantity: 1
      }],
      mode: "subscription",
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })

    return response.status(200).json({sessionId: stripeCheckoutSession.id});
  }
  else{
     response.setHeader('Allow','POST');
     response.status(405).end('Method Not Allowed');
  }
}

