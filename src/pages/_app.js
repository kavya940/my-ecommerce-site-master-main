import "@/styles/globals.css";
import '../styles/index.css';
import '../styles/forcomponents/Header.css';
import '../styles/forcomponents/Footer.css'
import '../styles/forcomponents/Cart.css'
import '../styles/forcomponents/Filter.css'
import '../styles/forcomponents/ProductList.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
