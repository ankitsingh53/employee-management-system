import { createRoot } from 'react-dom/client'
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from 'react-router-dom';
import { apolloClient } from './apollo/apolloClient.tsx';
import { Provider } from 'react-redux';
import App from './App.tsx'
import { store } from './golbalStore/store.tsx';

createRoot(document.getElementById('root')!).render(
  
    <Provider store={store}>
    <ApolloProvider client={apolloClient}>
    <BrowserRouter>
     <App />
    </BrowserRouter>
    </ApolloProvider>
    </Provider>
)
