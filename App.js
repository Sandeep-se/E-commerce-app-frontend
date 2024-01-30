import Navigation from './Navigation'
import axios from 'axios'
import { CartProvider} from './CartProvider';
import React,{ useState,useEffect,useCallback} from 'react';
import * as SplashScreen from 'expo-splash-screen';

axios.defaults.baseURL="https://shop-daily-backend.onrender.com"


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <>
      <CartProvider>
        <Navigation/>
      </CartProvider> 
    </>
  );
}

