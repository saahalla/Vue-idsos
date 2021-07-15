<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        
        
      </v-toolbar>
    </template>
    <template v-slot:item.acdations="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
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
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    // methods: {
    //   initialize () {
    //     this.desserts = [
    //       {
    //         name: 'Frozen Yogurt',
    //         calories: 159,
    //         fat: 6.0,
    //         carbs: 24,
    //         protein: 4.0,
    //       },
    //       {
    //         name: 'Ice cream sandwich',
    //         calories: 237,
    //         fat: 9.0,
    //         carbs: 37,
    //         protein: 4.3,
    //       }
    //     ]
    //   },

    //   editItem (item) {
    //     this.editedIndex = this.desserts.indexOf(item)
    //     this.editedItem = Object.assign({}, item)
    //     this.dialog = true
    //   },

    //   deleteItem (item) {
    //     this.editedIndex = this.desserts.indexOf(item)
    //     this.editedItem = Object.assign({}, item)
    //     this.dialogDelete = true
    //   },

    //   deleteItemConfirm () {
    //     this.desserts.splice(this.editedIndex, 1)
    //     this.closeDelete()
    //   },

    //   close () {
    //     this.dialog = false
    //     this.$nextTick(() => {
    //       this.editedItem = Object.assign({}, this.defaultItem)
    //       this.editedIndex = -1
    //     })
    //   },

    //   closeDelete () {
    //     this.dialogDelete = false
    //     this.$nextTick(() => {
    //       this.editedItem = Object.assign({}, this.defaultItem)
    //       this.editedIndex = -1
    //     })
    //   },

    //   save () {
    //     if (this.editedIndex > -1) {
    //       Object.assign(this.desserts[this.editedIndex], this.editedItem)
    //     } else {
    //       this.desserts.push(this.editedItem)
    //     }
    //     this.close()
    //   },
    // },
  }
</script>