<template>
<div class="container-home">
<Header/>
<div class="home">
  <section class="form-register">
    <div clase="tabla">
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My CRUD</v-toolbar-title>
       <v-btn @click="agregar()" color="blue">Agregar</v-btn>
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
                    <v-text-field v-model="editedItem.calification1" type="number" label="Nota #1"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calification2" type="number" label="Nota #2"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calification3" type="number" label="Nota #3"></v-text-field>
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
      dialog: false,
      headers: [
        {text: 'Nombre',align: 'start',sortable: false,value: 'user.name'},
        {text: 'Apellido', value: 'user.lastName'},
        { text: 'Curso', value: 'grade.codGrade' },
        { text: 'Materia', value: 'course.nameCourse' },
        { text: 'Nota 1', value: 'califications.calification1' },
        { text: 'Nota 2', value: 'califications.calification2' },
        { text: 'Nota 3', value: 'califications.calification3' },
        { text: 'Nota Final', value: 'califications.calificationFinal' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        calification1: Number(0),
        calification2: Number(0),
        calification3: Number(0),
      },
      defaultItem: {
        calification1: 0,
        calification2: 0,
        calification3: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
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
       /* this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
          },
        ]*/
       let config = {
        headers: {
          "Authorization": "Bearer "+this.$store.state.data.data,
        },
      };
      axios.get('https://localhost:44394/api/AllocationLoad', config).then((response) => {
       this.desserts=response.data
       console.log(this.datos)
      // this.desserts=datos.data;
     })
      },

      editItem (item) {
        //this.editedIndex = this.desserts.indexOf(item.califications)
        this.editedIndex= item.califications.id
        this.editedItem = Object.assign({}, item.califications)
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
      axios.put('https://localhost:44394/api/Calificacions/'+this.editedIndex,this.editedItem).then((response) => {
       console.log(response)
         this.initialize()
     })
        this.close()
      },
           agregar(){
        this.$router.push(`/NuevaCalificacion`);
     }
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
  top: -2em;
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
