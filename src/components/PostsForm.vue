<template>
    <div class="event-form">
        <v-card
            class="custom-card mx-auto"
            max-width="500px"
            color="#01092D"
            dark
            >
            <v-card-title>
                <h1>Add Event</h1>
            </v-card-title>

            <v-card-subtitle>
                <h3 class="thin">Use the form below to add a volunteer opportunity to the home page.</h3>
            </v-card-subtitle>

            <v-card-text>
                <v-form class="post-form">

                    <v-text-field
                    class="text-feild"
                    v-model="organization"
                    label="Organization"
                    outlined
                    ></v-text-field>

                    <v-text-field
                    class="text-feild"
                    v-model="url"
                    label="Organization Website"
                    outlined
                    ></v-text-field>
                    
                    
                    
                    <v-textarea
                    class="text-feild"
                    v-model="description"
                    label="Event Details"
                    outlined
                    required
                    >

                    </v-textarea>

                    <h2>Choose a Catagory</h2>
                    <p>You may choose more than one.</p>
                    
                    <div class="switches">
                    <v-switch  class="switch" color="#7BD49F" v-model="catagories" label="Family" value="John"></v-switch>
                    <v-switch class="switch" color="#7BD49F" v-model="catagories" label="Tech" value="Jacob"></v-switch>
                    <v-switch class="switch" color="#7BD49F" v-model="catagories" label="Animals" value="Jacob"></v-switch>
                    <v-switch class="switch" color="#7BD49F" v-model="catagories" label="Youth" value="Jacob"></v-switch>
                    </div>
                </v-form>
            </v-card-text>

            <v-card-actions>
            <v-btn
                color="#1E60E4"
                @click="submit"
            >
                Post
            </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { fireDb } from '../plugins/firebaseConfig.js'

export default {
    data: () => ({
        date: null,    
        loggedIn: false,
        drawer: false,
        description: null,
        organization: null,
        url: null,
    }),
    created: function() {
        fireDb.collection('users').orderBy('Name').get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching documents.');
            return;
            }  
            snapshot.forEach(doc => {
                this.users.push((doc.id, '=>', doc.data().Name))
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        })
    },
    methods: {
        reset () {
            this.$refs.form.reset()
        },
        addPost() {
            try {
                const ref = fireDb.collection("posts").add({
                    date: this.date,
                    eventName: this.eventName,
                    description: this.description,
                    location: this.location,
                    organization: this.organization,
                    url: this.url,
                    catagories: this.catagories,
                })
                this.$refs.form.reset()
                this.writeSuccessful = true
            }
            catch(err) {
                console.log(err)
            }
        }
    }
}
</script>

<style>

</style>
