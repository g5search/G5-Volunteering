<template>
    <div id="navigation">
     <v-navigation-drawer
      v-model="drawer"
      app
      disable-resize-watcher
    >
     <div class="brand top-dash">
       <h1 class="text-center">G5</h1>
     </div>
      <v-list dense>
        <v-list-item link to="/dashboard">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Edit Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item link to="/add-post">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add Event</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      elevation="0"
      color="rgba(0,0,0,0)"
      hide-on-scroll
    >
        <v-app-bar-nav-icon v-if="loggedIn" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <a href="/">
          <v-toolbar-title class="brand">
            G5 Volunteering
          </v-toolbar-title>
        </a>
      <v-spacer></v-spacer>

      <v-menu
        left
        bottom
        dark
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
            <v-list-item to="/add-hours" link>
              <v-list-item-title>Submit Volunteer Hours</v-list-item-title>
            </v-list-item>
            <v-list-item to="/dashboard" link>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
          <!-- <a href="/login">
          <v-list-item v-if="!loggedIn">
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          </a> -->
          <!-- <v-list-item @click="logout" v-if="loggedIn">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item> -->
        </v-list>
      </v-menu>
      <!-- <v-toolbar-items>
        <v-btn class="btn" text to="/add-hours">Submit Volunteer Hours</v-btn>
        <v-btn class="btn" text to="/login" v-if="!loggedIn">Login</v-btn>
        <v-btn class="btn" @click="logout" text v-if="loggedIn">Logout</v-btn>
      </v-toolbar-items> -->
    </v-app-bar>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    data: () => ({
        drawer: false,
    }),
    computed: {
      loggedIn () {
        return this.$store.state.loggedIn
      }
    },
    methods: {
      logout() {
          this.$store.dispatch('logout')
          this.$router.replace('/home')
        },
    }

}
</script>

<style >
    .brand, .btn {
    font-family: 'Alatsi', sans-serif;
    }
    .top-dash {
    background: #eee;
    padding-top: 1em;
    padding-bottom: 1em;
    }
    a {
      text-decoration: none;
      color: rgb(255, 103, 103) !important;
    }
</style>