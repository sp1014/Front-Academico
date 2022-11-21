<template>
<div class="container-home">
<Header/>
<h3> Hello {{datos.name}}, {{datos.rol.nameRole}}</h3>
<div style="display:flex; margin-top: 3em">
 <v-card class="mt-4 mx-auto" width="40%">
    <v-sheet class="v-sheet--offset mx-auto" color="cyan"  elevation="12"   max-width="calc(100% - 3em)">
      <v-sparkline :labels="labels" :value="Notas" color="white" line-width="2" padding="25"></v-sparkline>
    </v-sheet>
    <v-card-text class="pt-0">
      <div class="text-h6 font-weight-light mb-2">Notas de {{Materia}}</div>
      <div class="subheading font-weight-light grey--text">{{Estudiante}} - {{Curso}}</div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>mdi-clock</v-icon>
      <span class="text-caption grey--text font-weight-light">Ultimo Registro {{Fecha}}</span>
    </v-card-text>
  </v-card>
  <!--2° Diagrama-->
   <v-card class="mt-4 mx-auto" width="40%">
    <v-sheet class="v-sheet--offset mx-auto" color="green"  elevation="12"   max-width="calc(100% - 3em)">
      <v-sparkline :labels="labels" :value="Notas1" color="white" line-width="2" padding="25"></v-sparkline>
    </v-sheet>
    <v-card-text class="pt-0">
      <div class="text-h6 font-weight-light mb-2">Notas de {{Materia1}}</div>
      <div class="subheading font-weight-light grey--text">{{Estudiante}} - {{Curso}}</div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>mdi-clock</v-icon>
      <span class="text-caption grey--text font-weight-light">Ultimo Registro {{Fecha1}}</span>
    </v-card-text>
  </v-card>
</div>

<div style="display:flex; margin-top: 3em">
 <v-card class="mt-4 mx-auto" width="40%">
    <v-sheet class="v-sheet--offset mx-auto" color="cyan"  elevation="12"   max-width="calc(100% - 3em)">
      <v-sparkline :labels="labels" :value="Notas2" color="white" line-width="2" padding="25"></v-sparkline>
    </v-sheet>
    <v-card-text class="pt-0">
      <div class="text-h6 font-weight-light mb-2">Notas de {{Materia2}}</div>
      <div class="subheading font-weight-light grey--text">{{Estudiante}} - {{Curso}}</div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>mdi-clock</v-icon>
      <span class="text-caption grey--text font-weight-light">Ultimo Registro {{Fecha2}}</span>
    </v-card-text>
  </v-card>
  <!--2° Diagrama-->
   <v-card class="mt-4 mx-auto" width="40%">
    <v-sheet class="v-sheet--offset mx-auto" color="green"  elevation="12"   max-width="calc(100% - 3em)">
      <v-sparkline :labels="labels" :value="Notas3" color="white" line-width="2" padding="25"></v-sparkline>
    </v-sheet>
    <v-card-text class="pt-0">
      <div class="text-h6 font-weight-light mb-2">Notas de {{Materia3}}</div>
      <div class="subheading font-weight-light grey--text">{{datos.idRol==3?Estudiante:'Notas Promedio'}} - {{datos.idRol==3?Curso:'Academica'}}</div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>mdi-clock</v-icon>
      <span class="text-caption grey--text font-weight-light">Ultimo Registro {{Fecha3}}</span>
    </v-card-text>
  </v-card>
</div>

 <Footer/> 
 </div>
</template>

<script>
import axios from "axios";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
   export default {
     components:{
       Header,
       Footer
     },
    
   data: () => ({
      datos:'',
      labels: [
        'Nota 1',
        'Nota 2',
        'Nota 3',
        'Nota Final'
      ],
      Notas:[],
      Materia:'',
      Materia1:'',
      Fecha: '',
      Fecha1: '',
      Fecha2: '',
      Fecha3: '',
      Estudiante:'',
      Curso:'',

      Notas1:[],
      Notas2:[],
      Notas3:[],
    }),

   

    created(){
      this.getUser()
    },
    methods:{
         NewUser(){
       this.$router.push('/Nuevo');
    },
     async getUser(){
       let config = {
        headers: {
          "Authorization": "Bearer "+this.$store.state.data.data,
        },
      };
      axios.get('http://www.apiacademico.somee.com/api/Login', config).then((response) => {
       this.datos=response.data
      axios.get('http://www.apiacademico.somee.com/api/AllocationLoad/idUser/'+this.datos.id, config).then((response) => {
       console.log(response.data)

        var Nota1 = response.data[0].califications.calification1
        var Nota2 = response.data[0].califications.calification2
        var Nota3 = response.data[0].califications.calification3
        var Nota = response.data[0].califications.calificationFinal
        this.Notas=[
          Nota1,
          Nota2,
          Nota3,
          Nota
        ] 
         this.Materia=response.data[0].course.nameCourse
         this.Fecha=response.data[0].dateAllocationLoad
         this.Estudiante=response.data[0].user.name+' '+response.data[0].user.lastName
         this.Curso=response.data[0].grade.codGrade

        var NotaM1 = response.data[1].califications.calification1
        var NotaM2 = response.data[1].califications.calification2
        var NotaM3 = response.data[1].califications.calification3
        var NotaM = response.data[1].califications.calificationFinal
        this.Notas1=[
          NotaM1,
          NotaM2,
          NotaM3,
          NotaM
        ] 
         this.Materia1=response.data[1].course.nameCourse
         this.Fecha1=response.data[1].dateAllocationLoad

        
        var NotaM11 = response.data[2].califications.calification1
        var NotaM12 = response.data[2].califications.calification2
        var NotaM13 = response.data[2].califications.calification3
        var NotaM01 = response.data[2].califications.calificationFinal
        this.Notas2=[
          NotaM11,
          NotaM12,
          NotaM13,
          NotaM01
        ] 
         this.Materia2=response.data[2].course.nameCourse
         this.Fecha2=response.data[2].dateAllocationLoad

     })

})


     }
    },
     computed:{
        
      }
  }
</script>
<style scoped>
.container-home{
  width: 95%;
  margin: 3em;
  margin-top: 0em;
}
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>

