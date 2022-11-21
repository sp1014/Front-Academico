<template>
<div class="container-home">
<Header/>
<div class="home">
  <section class="form-register">
    <v-form v-model="valid">
    <v-container>
    <div class="form">
    <v-layout>
    <v-flex  xs12 md4>
      <v-text-field  v-model="NameMateria" :rules="nameRules" label="Nombre Materia" required></v-text-field>
    </v-flex> 
    
    <v-flex  xs12 md4>
      <v-text-field  v-model="Horas" :rules="nameRules" label="Horas Semanales" required></v-text-field>
    </v-flex> 
          
    </v-layout>
    <br>

    </div>
    </v-container>
      <v-btn  class="mr-4 btn"  @click="Update()">submit</v-btn>
  </v-form>
  </section>
</div>
</div>
</template>

<script>
import Header from '@/components/Header';
import axios from "axios";
   export default {
     components:{
       Header
     },
    data () {
        return {
            dialog: false,
            data:'',
            valid: false,
            nameRules: [v => !!v || 'Name is required',v => v.length <= 10 || 'Name must be less than 10 characters'],
   
            NameMateria:'',
            Horas:'',
        }
    },

    created(){
    this.getUserId()
    },
   
   methods:{
       async getUserId(){
     },
     Update(){
       const data = {
        nameCourse : this.NameMateria,
        weeklyHours :  this.Horas,
        status : true
       
        }
       console.log(data)
        let config = {
        headers: {
          "Authorization": "Bearer "+this.$store.state.data.data,
        },
      };

     axios.post("http://www.apiacademico.somee.com/api/Course",data,config).then((response) => {
           this.$router.push(`/Materias`);
      })
     
     },
      }
   }
</script>
<style scoped>
.container-home{
  width: 98%;
  margin: 1em;
  margin-top: 0em; 
}
.home{
  margin: 0em;
}

.foto{
    margin-top: 2em;
}
.label{
    color: black;
     background: black;
}
.form-register {
  width: 100%;
  background: #f1f7f7;
  padding: 10px;
  margin: auto;
  margin-top: 1em;
  border-radius: 2px;
  font-family: 'calibri';
  color: white;
  box-shadow: 7px 13px 37px rgb(144, 166, 180);

}
.form{
    margin-top: 4em;
    height: 35em;
}
.layout{
     grid-gap: 3em;
    
}
.btn{
    position: absolute;
    right: 20em;
    top: 40em;
}

</style>
