<template>
  <div class="team mt-4">
    <h3 class="subheading grey--text">My Profile</h3>

    <v-container class="my-5">
      <!-- Card Account -->
      <v-row wrap justify="center" class="xs12 sm6 md4 lg4">
        <v-flex xs12 sm8 md6 lg3 class="mb-4 mr-1">
          <v-card plain>
            <v-responsive fluid>
              <v-img
                lazy-src="@/assets/img_avatar_m.png"
                max-height="200"
                max-width="300"
                src="@/assets/img_avatar_m.png"
              ></v-img>
            </v-responsive>

            <v-card-text>
              <v-subheader>{{users.name}}</v-subheader>
              <div class="grey--text">{{users.email}}</div>
            </v-card-text>
            
            <v-card-actions>
              <v-btn color="light-blue">
                <v-icon small left>
                  mdi-account-arrow-left
                </v-icon>
                <span>Followers: {{followers}} </span>
              </v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn color="light-blue">
                <v-icon small left>
                  mdi-account-arrow-right
                </v-icon>
                <span>Followings: {{followings}}</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        
      </v-row>

    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function(){
    return {
      users: {},
      followers: 0,
      followings: 0,
      posts: [],
      likes: 2,
      comments: 3

    }
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
          this.followings = results.follow.count.followings
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