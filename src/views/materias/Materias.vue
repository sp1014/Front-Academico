<template>
<div class="container-home">
<Header/>
<div class="home">
  <section class="form-register">
    <div clase="tabla">
  <v-data-table :headers="headers" :items="datos" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Materias</v-toolbar-title>
       <v-btn @click="agregar()" color="blue">Agregar</v-btn>
        <v-divider class="mx-4" inset  vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="800px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
        
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col >
                     <v-text-field  v-model="editedItem.nameCourse" :rules="nameRules" label="Nombre Materia" required></v-text-field>
                  </v-col>
                  <v-col>
                       <v-text-field  v-model="editedItem.weeklyHours" :rules="nameRules" label="Horas Semanales" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text  @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
          
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
   </div>
  </section>

</div>
<Footer/>
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
         dialog: false,
        headers: [
          {text: 'Id', value: 'id'},
          {text: 'Materia', value: 'nameCourse'},
          { text: 'Horas', value: 'weeklyHours' },
          { text: 'Estado', value: 'status' },
          { text: 'Actions', value: 'actions', sortable: false },
    
        ],
         editedIndex: -1,
         editedItem: {
        nameCourse: '',
        weeklyHours: Number(0),

      },
        datos:[]
      }      
    },
      created(){
      this.getUser()
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    methods:{

     async getUser(){
       let config = {
        headers: {
          "Authorization": "Bearer "+this.$store.state.data.data,
        },
      };
      axios.get('http://www.apiacademico.somee.com/api/Course', config).then((response) => {
       this.datos=response.data
       console.log(this.datos)
      // this.desserts=datos.data;
     })
     },
      agregar(){
        this.$router.push(`/NuevaMateria`);
     },

      editItem (item) {
        console.log(item.id)
        //this.editedIndex = this.desserts.indexOf(item.califications)
        this.editedIndex= item.id
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {     
      axios.put('http://www.apiacademico.somee.com/api/Course/'+this.editedIndex,this.editedItem).then((response) => {
       console.log(response)
         this.initialize()
        })
        this.close()
      },

    },
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

.blue{
  position: absolute;
  top: 2em;
  right: 2em;
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


.v-card{
    background: #fff;
    margin: 1em;
border: 80px solid #fff;
}
</style>

