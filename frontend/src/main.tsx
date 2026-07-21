import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "./apollo/apolloClient.tsx";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./golbalStore/store.tsx";
import Authinitializer  from "./components/AuthInitializer/Authinitializer.tsx";
import './index.css';

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Authinitializer>
          <App />
        </Authinitializer>
      </Provider>
    </ApolloProvider>
  </BrowserRouter>,
);
