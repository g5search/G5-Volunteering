<template>
    <v-app id="app">
      <Navigation></Navigation>
      <v-content id="content">
        <router-view></router-view>
      </v-content>
      <Footer></Footer>
    </v-app>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components: {
    Navigation,
    Footer
  },
  data: () => ({
    //

  }),
};
</script>

<style>  
    
  #app {
    background: #eee;  /* fallback for old browsers */
  }

  .custom-card {
    margin-bottom: 2em;
    padding: 1em;
    opacity: .9;
    }

    .custom-card .text-feild {
    margin-top: -1em;
    }

    h1, h2, h4, h5, h6, .brand {
    font-family: 'Alatsi', sans-serif;
    }

    p, h3 {
    font-family: 'Open Sans', sans-serif;
    }

    .title {
    font-weight: 800;
    }

    .thin {
    font-weight: 100;
    }

    .switches {
    display: flex;
    flex-flow: row wrap;
    margin-top: -1.5em;
    }
    .switches .switch {
    margin-left: 8px;
    margin-right: 8px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
