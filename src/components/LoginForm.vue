<template>
    <div class="login-form"
        >
        <v-card
            class="custom-card"
            color="#01092D"
            dark
            width="450px"
            >
            <v-card-title>
                <h1>Login Form</h1>
            </v-card-title>
            <v-card-subtitle>
                <h3 class="thin">Use the form below to login.</h3>
            </v-card-subtitle>
            <v-card-text>
                <v-form class="hours-form">
                <v-text-field
                    label="Email"
                    name="email"
                    type="email"
                    v-model="email"
                    outlined
                    required
                ></v-text-field>

                <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                    outlined
                    required
                />
                
                
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="#1E60E4"
                    @click="login"
                >
                Login
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        login: function() {
            firebase.auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then((user) => {
                this.$router.replace('/dashboard')
                this.$store.dispatch('changeState')
            }).catch((err) => {
                alert("error... " + err.message)
            })
        },
    }
}
</script>

<style>
    
</style>