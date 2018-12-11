import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';

const httpLink = new HttpLink({
  // URL to graphql server, you should use an absolute URL here
  uri: 'http://localhost:4000/graphql',
});

// create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// install the vue plugin
Vue.use(VueApollo);

Vue.config.productionTip = false;

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

// update Vue instance by adding `apolloProvider`

new Vue({
  router,
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
