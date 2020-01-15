<template>
    <div class="event-posts">
        <v-container>
                <v-row>
                    <v-col cols="12" class="mx-auto opening">
                        <h1>Add Volunteer Event To Hompage</h1>
                        <p>Do you have a volunteer event that you would like to promote? Do it here! Use this form to fill out a few details about the event.</p>
                        
                    </v-col>
                </v-row>
            </v-container>
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        class="post-container"
                    >
                        <PostsForm/>
                    </v-col>
                </v-row>
            </v-container>
    </div>
</template>

<script>
import PostsForm from '@/components/PostsForm.vue'

export default {
    components: {
        PostsForm
    }
}
</script>

<style>
     .event-posts {
        height: 100%;
        width: 100%;
        background-image: url('../assets/treeplant.svg');
        background-size: 60%;
        background-repeat: no-repeat;
        background-position: left;
        background-blend-mode: multiply;
    }
    .post-container {
        display: flex;
        justify-content: flex-end;
    }
</style>