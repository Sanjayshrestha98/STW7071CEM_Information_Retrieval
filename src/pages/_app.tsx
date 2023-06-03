import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from './navbar/Navbar'
import { Provider } from 'react-redux';
import store from './store/store';

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <Component {...pageProps} />
    </div>
  </Provider>
}
