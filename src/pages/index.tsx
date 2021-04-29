import { GetStaticProps } from 'next'
import { SubscribeButton } from '../components/SubscribeButtom';
import { stripe } from '../services/stripe';

import styles from './home.module.scss'
import Head from 'next/head';

interface HomeProps{
  product:{
    priceId:string,
    amount:number
  }
}
export default function Home({product} : HomeProps) {

  return (
      <>  
        <Head>
          <title>Home | ig.news</title>    
        </Head>

        <main className={styles.contentContainer}>
          <section className={styles.hero}>

            <span> 👏 Hey, welcome</span>
            <h1>News about the <span>React</span> World.</h1>
            <p>
              Get access to all publications <br/>
              <span>for {product.amount} month</span>
            </p>
            <SubscribeButton priceId={product.priceId}/>
          </section>
          
            <img src="/images/avatar.svg" alt=" Gilr Coding"/>
        </main>
      </>
  )
}


//SSG
export const getStaticProps: GetStaticProps = async()=>{
  
  const price = await stripe.prices.retrieve('price_1If8QRImqRtF91oF8pgybjNw')

  const product ={
    proceId:price.id,
    amount:new Intl.NumberFormat('en-US',{
      style:'currency',
      currency:'USD',
    }).format((price.unit_amount / 100)),
  }

  return{
    props:{
      product,
    },
    revalidate: 60 * 60  * 24 //24h
  }
}