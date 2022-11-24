<template>
<div class="container-home">
<Header/>
<div class="home">
  <section class="form-register">
    <div clase="tabla">
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Grado - Curso</v-toolbar-title>
       <v-btn @click="editItem(0)" color="blue">Agregar</v-btn>
        <v-divider class="mx-4" inset  vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.codGrade" type="number" label="Curso"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                         <v-select :items="items1" v-model="editedItem.status" item-text="name" label="Estado" item-value="id"></v-select>
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
import Footer from '@/components/Footer';
import axios from "axios";
   export default {
     components:{
       Header,
       Footer
     },
    data: () => ({
      formTitle:'',
      dialog: false,
      headers: [
            {text: 'Id', value: 'id'},
          {text: 'Grado', value: 'codGrade'},
          { text: 'Estado', value: 'status' },
          { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        codGrade: Number(0),
        status: Number(0),

      },
      defaultItem: {
        codGrade: 0,
        status: 0,

      },
      items1: [{
            id: 1,
            name: 'Activo'
          },
          {
            id: 2,
            name: 'Inactivo'
          }
        ]
    }),

    computed: {
    },

    watch: {
      dialog (val) {
        val || this.close()
      },

    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
    
       let config = {
        headers: {
          "Authorization": "Bearer "+this.$store.state.data.data,
        },
      };
           axios.get('http://www.apiacademico.somee.com/api/Grade', config).then((response) => {
       this.desserts=response.data
     //  console.log(this.desserts)
      // this.desserts=datos.data;
     })
      },

      editItem (item) {
       
          this.formTitle = item=== 0 ? 'New Item' : 'Edit Item'
       // console.log(item)
        //this.editedIndex = this.desserts.indexOf(item.califications)
        this.editedIndex= item.id
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
         // console.log(this.editedItem)
          this.editedIndex = -1
        })
      },

      save() {

        if(this.editedIndex >0){
           axios.put('http://www.apiacademico.somee.com/api/Grade/'+this.editedIndex,this.editedItem).then((response) => {
           console.log(response)
           });
        }else{
          console.log(this.editedItem)
           axios.post('http://www.apiacademico.somee.com/api/Grade/',this.editedItem).then((response) => {
           // console.log(response)
           });
      
        }
        this.initialize()
      /*
     })*/
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
