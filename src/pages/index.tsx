import Head from "next/head"
import { GetServerSideProps } from "next"
import { SubscribeButton } from "../components/SubscribeButton"
import styles from './home.module.scss'
import { stripe } from "../services/stripe"

interface HomeProps{
  product:{
    priceId: string,
    amount: number
  }
}

export default function Home({ product }:HomeProps) {
  return (
    <>
      <Head>
          <title>Home | share.news</title>
      </Head>
      <main className={styles.containerContent}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the 
              <span> React </span>
            World
          </h1>
          <p>
            Get acess to all the publication <br/>
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId = {product.priceId}/>
        </section>
        <img src="/images/avatar.svg" alt="Avatar" />
      </main>
    </>  
  )
}

export const getServerSideProps : GetServerSideProps = async () => {
 const price = await stripe.prices.retrieve('price_1KxfhSKanPmOYKpp1LjsBa3G');

 const product = {
   priceId: price.id,
   amount: Intl.NumberFormat('en-US',{
     currency: 'USD',
     style:'currency'
   }).format(price.unit_amount/100),
 }

 return {
   props:{
     product,
   }
 }
}