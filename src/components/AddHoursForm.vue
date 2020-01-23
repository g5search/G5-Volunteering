<template>
    <div class="wrapper">
        <div class="add-hours-form">
                        <v-card
                class="custom-card mx-auto"
                max-width="500px"
                color="#01092D"
                dark
                >
                <v-card-title>
                    <h1>Add Hours</h1>
                </v-card-title>
                <v-card-subtitle>
                    <h3 class="thin">Use the form below to add a your volunteer hours.</h3>
                </v-card-subtitle>
                <v-card-text>
                    <v-form 
                        class="hours-form"
                        ref="form"
                        v-model="valid"
                    >
                        <v-select
                            v-model="select"
                            :items="users"
                            :rules="[v => !!v || 'User is required']"
                            label="Select User"
                            outlined
                        ></v-select>
                        <v-text-field
                        class="text-feild"
                        type="number"
                        v-model="hours"
                        label="Hours"
                        outlined
                        required
                    ></v-text-field>
                    
                    <v-dialog
                        v-model="modal"
                        ref="dialog"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                        >
                            <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="date"
                                class="text-feild"
                                label="Event Date"
                                outlined
                                readonly
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker 
                                type="month"
                                v-model="date" 
                                ref="picker"
                                scrollable
                                :max="new Date().toISOString().substr(0, 10)"
                                min="2019-01">
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                    
                    <v-textarea
                        class="text-feild"
                        v-model="eventDetails"
                        label="Event Details"
                        outlined
                        >
                    </v-textarea>
                    <h2>Choose a Catagory</h2>
                    <p>You may choose more than one.</p>
                    <div class="switches">
                        <v-switch  class="switch" color="#7BD49F" v-model="catagories" label="Youth & Families" value="Youth & Families"></v-switch>
                        <v-switch class="switch" color="#7BD49F" v-model="catagories" label="Innovation & Technology" value="Innovation & Technology"></v-switch>
                        <v-switch class="switch" color="#7BD49F" v-model="catagories" label="Environment & Animals" value="Environment & Animals"></v-switch>
                        <v-switch class="switch" color="#7BD49F" v-model="catagories" label="Health & Wellbeing" value="Health & Wellbeing"></v-switch>
                        <v-switch class="switch" color="#7BD49F" v-model="catagories" label="Other" value="Other"></v-switch>
                        </div>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        color="#1E60E4"
                        @click="submitHours"
                    >
                    Submit Hours
                    </v-btn>
                </v-card-actions>
                <p v-if="writeSuccess">Event has been added!</p>
            </v-card>
                
        </div>
    </div>
</template>

<script>
import { fireDb } from '../plugins/firebaseConfig.js'

export default {
    data: () => ({
        modal: false,
        users: [],
        select: "Username",
        picker: new Date().toISOString().substr(0, 10),
        date: null,
        hours: null,
        eventDetails: null,
        catagories: [],
        writeSuccess: false,
        valid: true,

    }),
    created: function() {
        // get usernames for v-select options
        fireDb.collection('users').get()
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
        });
    },
    methods: {
        submitHours() {
            let ref = fireDb.collection("volunteer-events").add({
                date: this.date,
                hours: parseInt(this.hours, 10),
                notes: this.eventDetails,
                catagories: this.catagories,
                userId: this.select,
            })
            this.$refs.form.reset()
            this.writeSuccess = true
        },
        reset () {
            this.$refs.form.reset()
        },
    }
}
</script>

<style >

</style>
