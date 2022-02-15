import '../styles/globals.css'
import '../styles/styles.css'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
// swiper bundle styles
import 'swiper/css/bundle'

// swiper core styles
import 'swiper/css'

// modules styles
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Layout from '../components/Layout'
import ShopProvider from '../context/shopContext'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  
  return (
    <ShopProvider>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </ShopProvider>
  )
}

export default MyApp
