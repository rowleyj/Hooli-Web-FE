<template>
    <v-dialog :value="dialog" @click:outside="closeDialog" width="600"> 
        <v-card>
        <v-card-title>
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="accent"
            text
            @click="closeDialog"
          >
            Close
          </v-btn>
          <v-btn
            color="secondary"
            @click="login()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    methods: {
        closeDialog(){
            this.$emit('close');
        },
        login(){
            // perform login logic
            this.$router.push('/dashboard')
        }
    },
    props: {
        dialog: {
            default: false
        }
    }
}
</script>