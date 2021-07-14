<template>
  <div class="posts mt-4">
    <h3 class="subheading grey--text">My Posts</h3>
    <v-btn router to="/frontend/addPost" color="primary">
      <v-icon>
        mdi-note-plus
      </v-icon>
      <span>Add Post</span>
    </v-btn>

    <v-container class="my-5">
      <!-- Card Account -->
      <v-row wrap justify="center" class="xs12 sm6 md4 lg4" v-if="posts.length > 0">
        <v-flex xs12 sn8 md3 lg3 class="ml-4 mt-2"
            v-for="post in posts" :key="post._id">
          <v-card
            class="mx-auto"
            max-width="300"
            outlined
            shaped
            elevation="10"
          >
            <v-card-text>
              <div>{{ users.name }}</div>
              <div class="text--primary">
                {{ post.content }}
              </div>
              <div class="mt-2">
                {{ post.hashtag.length > 0 ? post.hashtag : '' }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn class="blue--text" small @click="post.likes++">
                <v-icon>
                  mdi-thumb-up
                </v-icon>
                <span>{{post.likes > 0 ? post.likes : ''}}</span>
              </v-btn>
              <v-btn class="blue--text" small @click="post.comments++">
                <v-icon>mdi-comment</v-icon>
                <span>{{post.comments > 0 ? post.comments : ''}}</span>

              </v-btn>
              <v-btn class="red--text" small @click="deletePost(post._id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-flex>
      </v-row>

      <!-- else jika belum ada post -->
      <v-row wrap justify="center" v-else>
        <v-flex class="ml-4 mt-2">
          <v-subheader>There are no posts available yet, please make a post first</v-subheader>
        </v-flex>
        <!-- <AddPost /> -->
      </v-row>

    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
// import AddPost from './AddPost.vue'

export default {
  data: function(){
    return {
      users: {},
      followers: 0,
      followings: 0,
      posts: [],
      likes: 2,
      comments: 3,
      token: ''

    }
  },
  components: {
    // AddPost
  },
  mounted() { 
    this.$nextTick(function (){
      this.getUser()
      this.getUserPosts()
    })
    
  },
  methods: {
    getUser: function(){
      const token = localStorage.getItem('token')
      const id = localStorage.getItem('userId')
      axios({
        method: 'get',
        url: 'http://localhost:3001/users/show/'+id,
        headers: {
          authorization: 'Bearer '+token
        }
      }).then(response => {
        const results = response.data;
        if(results.status === true){
          console.log(results.data)
          this.users = results.data

          this.followers = results.follow.count.followers
          this.followings = results.follow.count.following
          console.log({
            follow: results.follow
          })

        }
      }).catch(error => {
        console.log(error)
      })
    },
    getUserPosts: function(){ 
      const token = localStorage.getItem('token')
      this.token = token;
      const id = localStorage.getItem('userId')
      axios({
        method: 'get',
        url: 'http://localhost:3001/posts/showUserPosts/'+id,
        headers: {
          authorization: 'Bearer '+token
        }
      }).then(response => {
        const results = response.data;
        if(results.status === true){
          console.log(results.data)
          
          this.posts = results.data

        }else{
          this.posts = []
        }
      }).catch(error => {
        console.log(error)
      })
    },
    deletePost: function(id){
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
            this.getUserPosts()

        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  computed: {
    
  }

}
</script>