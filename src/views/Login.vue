<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                          <v-form ref="form" v-model="valid" lazy-validation>
                           <v-text-field prepend-icon="person" v-model="email" :rules="emailRules" name="login" label="Login" type="text" required></v-text-field>
                           <v-text-field id="password"  v-model="password"  :rules="paswwordRules" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn  color="primary" @click="validate">Login</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
import axios from "axios";
import swal from 'sweetalert';
   export default {

    data: () => ({
      password:'',
      paswwordRules: [
        v => !!v || 'Password is required'
      ],
      email:'',
      emailRules: [
        v => !!v || 'E-mail is required'
      ]
    }),

    methods: {
      validate () {
        this.$refs.form.validate()

          let json = {
          "email" : this.email,
          "password": this.password
        };
        axios.post('http://www.apiacademico.somee.com/api/Login', json)
        .then( data =>{
           if(data.status == "200"){
       
           this.$store.commit("getUser", data);
         this.$router.push('/Home');

           }else{
            // console.log(data);
                swal({title: "Warning",  text: "The email or password is not correct",
                   icon: "warning",
                   })              
             this.error = true;
           
           }
        })
      },
  
   

    },
  }
</script>

