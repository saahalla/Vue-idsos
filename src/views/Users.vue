<template>
  <div class="mt-4">
    <v-subheader class="mb-4">Users Dashboard</v-subheader>
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

