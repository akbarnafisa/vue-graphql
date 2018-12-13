import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import Vue from 'vue';
// 2
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';
import { GC_USER_ID, GC_AUTH_TOKEN } from './constants/settings';

const userId = localStorage.getItem(GC_USER_ID);
Vue.config.productionTip = false;


const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjpjsafbnbe960100rur15c56',
});

const wsClient = new WebSocketLink({
  uri: 'wss://subscriptions.graph.cool/v1/cjpjsafbnbe960100rur15c56',
  options: {
    reconnect: true,
    authToken: localStorage.getItem(GC_AUTH_TOKEN),
  },
});
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(GC_AUTH_TOKEN);
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });

  return forward(operation);
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' &&
      operation === 'subscription'
  },
  wsClient,
  authMiddleware.concat(httpLink),
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});


Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading',
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  data: {
    userId,
  },
  provide: apolloProvider.provide(),
  render: h => h(App),
}).$mount('#app');
