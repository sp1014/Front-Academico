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
    <v-text-field v-model="name" type="text" label="Nombre"></v-text-field>
    </v-flex> 
    
    <v-flex  xs12 md4>
     <v-text-field v-model="lastName" type="text" label="Apellido"></v-text-field>
    </v-flex> 
       <v-flex  xs12 md4>
    <v-text-field v-model="email" type="email" label="Email"></v-text-field>
    </v-flex> 
    
    <v-flex  xs12 md4>
     <v-text-field v-model="password" type="password" label="Password"></v-text-field>
    </v-flex>     
    </v-layout>
    <v-layout>
    <v-flex  xs12 md4>
    <v-text-field v-model="doc" type="number" label="Documento"></v-text-field>
    </v-flex> 
        
    <v-flex  xs12 md4>
     <v-select :items="items1" v-model="status" item-text="name" label="Estado" item-value="id"></v-select>
    </v-flex>   
        <v-flex  xs12 md4>
    <v-select  v-model="idRol" :items="listRol"
    item-text="nameRole" item-value="id" label="Rol" persistent-hint return-object single-line  required></v-select>
    </v-flex>   
        <v-flex  xs12 md4>
    <v-select  v-model="idTypeDoc"  :items="listDoc"
    item-text="nameTypeDoc" item-value="id" label="Tipo Documento" persistent-hint return-object single-line  required></v-select>
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
            listRol:[],
            listUser:[],
            listDoc:[],
            dialog: false,
            data:'',
            valid: false,
            nameRules: [v => !!v || 'Name is required',v => v.length <= 10 || 'Name must be less than 10 characters'],
 
         items1: [{
            id: 1,
            name: 'Activo'
          },
          {
            id: 2,
            name: 'Inactivo'
          }
        ],
        name:'',
        lastName:'',
        email:'',
        password:'',
        doc:'',
        idRol:'',
        status:'',
        idTypeDoc:''


        }
    },

    created(){
    this.getUserId()
    },
   
   methods:{
       async getUserId(){
       let config = {
        headers: {
          "Authorization": "Bearer "+this.$store.state.data.data,
        },
      };
      axios.get('http://www.apiacademico.somee.com/api/UserData/Rol', config).then((response) => {
       this.listRol=response.data
       console.log(this.listRol)
     })

      axios.get('http://www.apiacademico.somee.com/api/UserData/Doc', config).then((response) => {
       this.listDoc=response.data
       console.log(this.listRol)
     })
     },
     Update(){
       const data = {
           name: this.name,
           lastName: this.lastName,
           email: this.email,
           password: this.password,
           doc: this.doc,
           status: this.status,
           idRol: this.idRol.id,
           idTypeDoc: this.idTypeDoc.id
        }
       console.log(data)
        let config = {
        headers: {
          "Authorization": "Bearer "+this.$store.state.data.data,
        },
      };
          axios.post("http://www.apiacademico.somee.com/api/User",data,config).then((response) => {
           this.$router.push(`/Usuarios`);
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
