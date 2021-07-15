<template>
  <div class="mt-4">
    <v-subheader class="mb-4">Users Dashboard</v-subheader>
    <!-- <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="10"
      class="elevation-1"
    > 
      <!-- <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Name</th>
            <th class="text-left">Username</th>
            <th class="text-left">Email</th>
            <th class="text-left">Role</th>
            <th class="text-left">Creation Date</th>
            <th class="text-left">Last Update</th>
            <th class="text-left">Password</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user._id"
          >
            <td>{{ user._id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.createAt }}</td>
            <td>{{ user.updateAt }}</td>
            <td>{{ '************' }}</td>
            <td>
              <v-btn small color="error" class="mr-2" @click="deleteUser(user._id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn small color="info">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template> -->

      <!-- Modal Edit -->
      

      <!-- Action update and delete -->
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2 blue--text"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          class="red--text"
          @click="deleteUser(item._id)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        users: [],
        headers: [
          { text: 'Actions', value: 'actions', sortable: false },
          {text: 'Id', value: '_id'},
          {text: 'Username', value: 'username'},
          {text: 'Name', value: 'name'},
          {text: 'Email', value: 'email'},
          {text: 'Role', value: 'role'},
          {text: 'Password', value: 'password'},
          {text: 'Creation Date', value: 'createAt'},
          {text: 'Last Update', value: 'updateAt'},
        ]
      }
    },
    mounted() {
      this.getUsers()

    },
    methods: {
      deleteUser: function(id) {
        // alert(id)
        const token = localStorage.getItem('token')
        console.log('deleted')
        axios({
          method: 'get',
          url: 'http://localhost:3001/users/delete/'+id,
          headers: {
            authorization: 'Bearer '+token
          }
        }).then(response => {
          const results = response.data;
          if(results.status === true){
            console.log(results.data)
            this.getUsers()
          }
        }).catch(error => {
          console.log(error)
        })
        console.log(token)
      },
      getUsers: function(){
        const token = localStorage.getItem('token')
        axios({
          method: 'get',
          url: 'http://localhost:3001/users',
          headers: {
            authorization: 'Bearer '+token
          }
        }).then(response => {
          const results = response.data;
          if(results.status === true){
            console.log(results.data)
            this.users = results.data
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

