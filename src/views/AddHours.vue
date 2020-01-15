<template>
    <div class="hours-form">
        <v-container>
                <v-row>
                    <v-col cols="12" class="mx-auto opening">
                        <h1>Submit Your Hours</h1>
                        <p>Have you volunteered for an event recently? We want to know about it! Use the form below to tell us some details about the volunteer event. Prizes go out to the person with the most hours!</p>
                        
                    </v-col>
                </v-row>
            </v-container>
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                        sm="6"
                    >
                        <AddHoursForm/>
                    </v-col>
                </v-row>
            </v-container>
    </div>
</template>

<script>
import AddHoursForm from '@/components/AddHoursForm.vue'
export default {
    components: {
        AddHoursForm
    }
}
</script>

<style scoped>
    .hours-form {
        height: 100%;
        width: 100%;
        background-image: url('../assets/vBG.png');
        background-size: 60%;
        background-repeat: no-repeat;
        background-position: right;
        background-blend-mode: multiply;
    }
</style>>

</style>