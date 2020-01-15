<template id="login">
    <div class="login-forms">
        <v-container class="fill-height">
                <v-row>
                    <v-col
                        cols="12"
                        align="center"
                        justify="center"
                    >   
                        <LoginForm/>
                    </v-col>
                </v-row>
        </v-container>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
    components: {
        LoginForm
    }

}
</script>

<style>
   .login-forms {
        height: 100%;
        width: 100%;
   }

</style>