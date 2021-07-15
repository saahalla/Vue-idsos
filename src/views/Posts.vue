<template>
  <div class="mt-4">
    <v-subheader class="mb-4">Posts Dashboard</v-subheader>
    <v-data-table
      :headers="headers"
      :items="posts"
      :items-per-page="10"
      class="elevation-1"
    > 
      <!-- <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Post Id</th>
            <th class="text-left">User Id</th>
            <th class="text-left">Post Content</th>
            <th class="text-left">Hashtag</th>
            <th class="text-left">Likes</th>
            <th class="text-left">Comments</th>
            <th class="text-left">Creation Date</th>
            <th class="text-left">Last Update</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="post in posts"
            :key="post._id"
          >
            <td>{{ post._id }}</td>
            <td>{{ post.userId }}</td>
            <td><div style="max-width: 350px; word-wrap: break-word">{{ post.content }}</div></td>
            <td>{{ post.hashtag.length > 0 ? post.hashtag : 'no hashtag' }}</td>
            <td>{{ post.likes }}</td>
            <td>{{ post.comments }}</td>
            <td>{{ post.createAt }}</td>
            <td>{{ post.updateAt }}</td>
            <td>
              <v-btn small color="error" class="mr-2" @click="deletePost(post._id)">
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
          @click="deletePost(item._id)"
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
        posts: [],
        headers: [
          { text: 'Actions', value: 'actions', sortable: false },
          {text: 'Post Id', value: '_id'},
          {text: 'User Id', value: 'userId'},
          {text: 'Post Content', value: 'content'},
          {text: 'Hashtag', value: 'hashtag'},
          {text: 'Likes', value: 'likes'},
          {text: 'Comments', value: 'comments'},
          {text: 'Creation Date', value: 'createAt'},
          {text: 'Last Update', value: 'updateAt'},
        ],
        token: ''
      }
    },
    mounted() {
      this.getAllPosts()      
    },
    methods: {
      getAllPosts: function(){
        const token = localStorage.getItem('token')
        this.token = token
        axios({
          method: 'get',
          url: 'http://localhost:3001/posts/getAll',
          headers: {
              authorization: 'Bearer '+token
          }
        }).then(response => {
          const results = response.data;
          if(results.status === true){
              console.log(results.data)
              this.posts = results.data
          }
        }).catch(error => {
          console.log(error)
        })
      },
      deletePost: function(id){
        // alert(id)
        axios({
          method: 'get',
          url: 'http://localhost:3001/posts/delete/' + id,
          headers: {
              authorization: 'Bearer '+this.token
          }
        }).then(response => {
          const results = response.data;
          if(results.status === true){
              console.log(results.data)
              //reload posts
              this.getAllPosts()

          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>