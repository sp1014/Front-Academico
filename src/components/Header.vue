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

  <v-navigation-drawer app v-model="drawer" temporary   absolute dark src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg">
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
         <v-list dense nav v-if="idRol==1" >
        <v-list-item  v-for="item in items" :key="item.title"  link  @click="redirect(item.path)">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav v-if="idRol==2" >
        <v-list-item  v-for="item in items2" :key="item.title"  link  @click="redirect(item.path)">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense nav v-if="idRol==3" >
        <v-list-item  v-for="item in items3" :key="item.title"  link  @click="redirect(item.path)">
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
         items:[
          { id:1, title: 'Home', icon: 'mdi-home', path:'home' },
          { title: 'Perfil', icon: 'mdi-account', path:'Perfil' },
          { title: 'Calificaciones', icon: 'mdi-spellcheck' ,path:'Calificaciones' },
          { title: 'Horario', icon: 'mdi-calendar-check', path:'Horario' },
          { title: 'Usuarios', icon: 'mdi-account-supervisor-circle', path:'Usuarios' },
          { title: 'Materias', icon: 'mdi-folder-account', path:'Materias' },
          { title: 'Grado - Curso', icon: 'mdi-view-dashboard', path:'Grado' },
          { id:1, title: 'Cerrar Sesión', icon: 'mdi-clock-start',path:'' }
  
        ],

          items2:[
          { id:1, title: 'Home', icon: 'mdi-home', path:'home' },
          { title: 'Perfil', icon: 'mdi-account', path:'Perfil' },
          { title: 'Calificaciones', icon: 'mdi-spellcheck' ,path:'Calificaciones' },
          { title: 'Materias', icon: 'mdi-folder-account', path:'Materias' },
          { id:1, title: 'Cerrar Sesión', icon: 'mdi-clock-start',path:'' }
        ],

          items3:[
          { title: 'Home', icon: 'mdi-home', path:'home' },
          { title: 'Perfil', icon: 'mdi-account', path:'Perfil' },
          { title: 'Calificaciones', icon: 'mdi-spellcheck' ,path:'CalificacionEstudiante' },
          { title: 'Horario', icon: 'mdi-calendar-check', path:'Horario' },
          { title: 'Cerrar Sesión', icon: 'mdi-clock-start', path:'' }
  
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