<template>
  <div class="mt-4">
    <subheader class="mb-4">Users Dashboard</subheader>
    <v-simple-table> 
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Username</th>
            <th class="text-left">Email</th>
            <th class="text-left">Password</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user._id"
          >
            <td>{{ user.name }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ '************' }}</td>
            <td>
              <v-btn small color="error" class="mr-2">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn small color="info">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        users: [
          {
            name: 'Saahalla',
            username: 'saahalla',
            email: 'sahal@gmail.com',
            password: '*******'
          },
        ],
      }
    },
    mounted() {
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
    console.log(token)
    }
  }
</script>

