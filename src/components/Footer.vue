<template>
    <div id="footer">
        <v-footer
        color="#0D2240"
        padless
        >
            <v-row
            justify="center"
            no-gutters
            >
            
                <v-col
                    class="py-4 text-center white--text"
                    cols="12"
                >
                    {{ new Date().getFullYear() }} — <strong>G5 - Let's Build Something Team</strong>
                </v-col>
            </v-row>
        </v-footer>
    </div>
</template>

<script>
export default {
    
}
</script>