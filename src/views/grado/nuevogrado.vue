<template>
<div class="container-home">
<Header/>
<div class="home">
    <section class="form-register">
    <div clase="tabla">
     <v-card>
    <v-card-title>
      Grados
      <v-spacer></v-spacer>
      <v-text-field  v-model="searchCourse" append-icon="mdi-magnify" label="Buscar" single-line hide-details ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headersCourse"  :items="datosCourse" :search="searchCourse">        
    </v-data-table>
  </v-card> 
    </div>
  </section>
</div>
</div>
</template>

<script>
import Header from '@/components/Header'
import axios from "axios";
   export default {
     components:{
       Header
     },
      data () {
      return {
        searchCourse:'',
         headersCourse: [
          {text: 'Id', value: 'id'},
          {text: 'Grado', value: 'codGrade'},
          { text: 'Estado', value: 'status' },
          { text: 'Actions', value: 'actions', sortable: false },
    
        ],

        datos:[],
        datosCourse:[]
      }      
    },
      created(){
      this.getUser()
    },
    methods:{
        getColor (califications) {
        if (califications.calification1 > 29) return 'red'
        else if (calories > 200) return 'orange'
        else return 'green'
      },
     async getUser(){
       let config = {
        headers: {
          "Authorization": "Bearer "+this.$store.state.data.data,
        },
      };
        axios.get('http://www.apiacademico.somee.com/api/Grade', config).then((response) => {
       this.datosCourse=response.data
       console.log(this.datos)
      // this.desserts=datos.data;
     })
     }
    },
   }
</script>
