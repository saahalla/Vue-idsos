<template>
  <div class="mt-4">
    <v-subheader class="mb-4">Follow Dashboard</v-subheader>
    <v-data-table
      :headers="headers"
      :items="follows"
      :items-per-page="10"
      class="elevation-1"
    > 
      <!-- <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">User ID</th>
            <th class="text-left">Follower ID</th>
            <th class="text-left">Creation Date</th>
            <th class="text-left">Last Update</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="follow in follows"
            :key="follow._id"
          >
            <td>{{ follow.userId }}</td>
            <td>{{ follow.followerId }}</td>
            <td>{{ follow.createAt }}</td>
            <td>{{ follow.updateAt }}</td>
            <td>
              <v-btn small color="error" class="mr-2" @click="deleteFollow(follow.userId, follow.followerId)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn small color="info">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        follows: [],
        headers: [
          {text: 'Id', value: '_id'},
          {text: 'User Id', value: 'userId'},
          {text: 'Follower Id', value: 'followerId'},
          {text: 'Creation Date', value: 'createAt'},
          {text: 'Last Update', value: 'updateAt'},
        ],
        token: ''
      }
    },
    mounted() {
      this.getAllFollow()
    },
    methods: {
      getAllFollow: function(){
        const token = localStorage.getItem('token')
        this.token = token
        axios({
          method: 'get',
          url: 'http://localhost:3001/follow/showData',
          headers: {
            authorization: 'Bearer '+token
          }
        }).then(response => {
          const results = response.data;
          if(results.status === true){
            console.log(results.data)
            this.follows = results.data
          }
        }).catch(error => {
          console.log(error)
        })
        console.log(token)
      },
      deleteFollow: function(userId, followerId){
        console.log('delete')
        const token = this.token
        axios({
          method: 'post',
          url: 'http://localhost:3001/follow/unfollow',
          headers: {
            authorization: 'Bearer '+token
          },
          data: {
            userId,
            followerId
          }
        }).then(response => {
          const results = response.data;
          if(results.status === true){
            console.log(results.data)
            this.getAllFollow()
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>