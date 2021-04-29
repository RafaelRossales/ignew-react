import { useSession, signIn} from 'next-auth/client';
import { api } from '../../services/api';
import { stripe } from '../../services/stripe'
import { getStripeJS } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface SubscribeButtonProps{
    priceId:string
}

// Onde operações que precisam de segurança devem ser feitas (VARIAVEIS DE AMBIENTE):
// Funções numca serao visiveis para o usuario final
// - getServerSideProps(SSR) só é utilizado quando a pagina é renderizada
// - getStaticProps(SSG) só é utilizado quando a pagina é renderizada
// - API routes

export function SubscribeButton({priceId}:SubscribeButtonProps){

    const [session] = useSession()
    // 
    async function handleSubscribe(){

        if(!session)
        {
            signIn('github')
            return;
        }

        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await getStripeJS()

            await stripe.redirectToCheckout({sessionId})

        } 
        catch (error) {
            alert(error.message)
        }

        // Redirecionando para strip ver: stipe chechout sessions
    }
    return(
        <button
        type="button"
        className={styles.subscribeButton}
        onClick={()=>{handleSubscribe()}}
        >
            Subscribe Now
        </button>
    )
}