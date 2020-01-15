<template>
  <div class="home">
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
      >
        <div class="intro">
          <div class="g5logo-container d-none d-md-block">
            <v-img
                  :src="require('../assets/g5Logo.png')"
                  class="my-3"
                  contain
                  height="200"
            ></v-img>
          </div>
          <div class="intro-text">
            <h1>Volunteering<br>At G5</h1>
            <br>
            <p>At G5, we believe in giving back to our community. Many of our employees volunteer reguarly and for all sorts of causes.
              From soup kitchens to trail cleanups, there is always something going on in our little community.
            </p>
          </div>
           <hr style="border-color: #fff;">
        </div>
        <!-- Volunteer Events -->
        <div class="post-area">
          <h2>Volunteer Opportunities</h2>
          <p>Looking for places to volunteer? Look no further! If you have a place you want to add, contact anyone on the Giving Committee.</p>
          <div class="post" v-for="post in posts">
            <v-card
              elevation="0"
              color="rgba(255, 255, 255, .4)"
              class="custom-form"
            >
              <h3 class="event-title">{{post.organization}}</h3>
              <p class="event-info">
              <strong>Website:</strong> {{post.url}}<br>
              </p>
              <p class="event-datails">{{post.description}}</p>
            </v-card>
          </div>
        </div>

      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { fireDb } from '../plugins/firebaseConfig.js'

export default {
  name: 'home',
  data: () => ({
    posts: []
  }),
  created: function() {
        try {
        fireDb.collection('posts').get()
            .then(snapshot => {
            if (snapshot.empty) {
                console.log('No posts to display')
            }
            snapshot.forEach(doc => {
                this.posts.push((doc.id, '=>', doc.data()))
            })
            })
        } catch(err) {
        console.log(err)
        }
    }
}
</script>

<style>
  .post-area {
    padding: 4em;

  }
  .post-area h2 {
    font-size: 5rem;
  }
  .home {
    font-family: 'Montserrat', sans-serif;
    opacity: .8;
  }
  .intro {
    padding-top: 2em;
  }
  .intro-text h1 {
    font-size: 8em;
    line-height: .9em;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
  }

  .intro-text p {
    font-family: 'Montserrat', sans-serif;
    font-weight: 100;
    font-size: 1.5em;
  }

  .intro-text {
    padding: 1em 4em 4em 4em;
  }

  .g5logo-container {
    position: absolute;
    opacity: .8;
    right: 4em;
    top: 12px;
  }
  .post h3 {
        font-size: 2rem;
    }
    .post {
      margin-bottom: 1em;
    }
    .custom-form {
      padding: 2em;
    }
</style>
