<template>
<div>
 <v-toolbar app dark src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg">
 <v-toolbar-side-icon @click="drawer =!drawer"><v-icon>mdi-menu</v-icon></v-toolbar-side-icon>
<v-toolbar-title></v-toolbar-title>
<v-spacer></v-spacer>    
      <h5 class="white--text" style="margin: 1em;">{{datos.name}} {{datos.lastName}}</h5>
       <v-avatar>
        <img src="https://e7.pngegg.com/pngimages/184/821/png-clipart-mangalore-united-states-management-computer-science-business-profile-angle-white.png">
       </v-avatar>
</v-toolbar>

  <v-navigation-drawer app v-model="drawer" temporary   absolute
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg">
    <v-layout mt-4 column align-center>
          <v-divider></v-divider>
      <v-flex>
       <v-avatar>
        <img src="https://e7.pngegg.com/pngimages/184/821/png-clipart-mangalore-united-states-management-computer-science-business-profile-angle-white.png">
       </v-avatar>
      </v-flex>
      <v-flex>
        <p class="white--text mt-3 headline">{{datos.rol.nameRole}}</p>
        <p class="white--text">{{datos.name}} {{datos.lastName}}</p>
      </v-flex>
     
    </v-layout>
         <v-divider></v-divider>
         <v-list dense nav >
        <v-list-item  v-for="item in items" :key="item.title"  link  @click="redirect(item.path)">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
   </v-navigation-drawer>
</div>
</template>
<script>
import axios from "axios";
  export default {

    data () {
      return{
        drawer:true,
        datos: '',
        redic:'',
          idRol:'',  
        rol:'',
         items: [
          { title: this.idRol==1?'Home':'Home', icon: 'mdi-home', path:'home' },
          { title: this.idRol==1? 'Perfil':'Perfil', icon: 'mdi-account', path:'Perfil' },
          { title: 'Calificaciones', icon: 'mdi-spellcheck' ,path:'Calificaciones' },
          { title: this.idRol==1?'Horario':'Horario', icon: 'mdi-calendar-check', path:'Horario' },
          this.idrol==1?{ title: this.idRol==1?'Usuarios':'', icon: 'mdi-account-supervisor-circle', path:'Usuarios' }:
          this.idRol==1?{ title: 'Materias', icon: 'mdi-folder-account', path:'Materias' }:
          this.idRol==1?{ title: this.idRol==1?'Grado - Curso':'', icon: 'mdi-view-dashboard', path:'Grado' }:
          { id:'1', title: 'Cerrar Sesión', icon: 'mdi-clock-start' },
        ],
      }
      
    },
    
      created(){
        this.rol=this.$store.state.data.data
      this.getUser()
    },
    methods:{
     async getUser(){
       let config = {
        headers: {
          "Authorization": "Bearer "+this.$store.state.data.data,
        },
      };

      axios.get('http://www.apiacademico.somee.com/api/Login', config).then((response) => {
       this.datos=response.data
       this.idRol=this.datos.idRol
      // this.desserts=datos.data;
     })
     },
     redirect (porta) {
        this.$router.push(`/${porta}`);
          }
    },
        computed:{
        
      },
  

        
  }
</script>