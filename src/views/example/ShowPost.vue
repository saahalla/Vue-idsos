<template>
  <div class="posts mt-4">
    <h3 class="subheading grey--text">My Posts</h3>
    <v-btn router to="/frontend/MyPosts" color="primary">
      <v-icon>
        mdi-view-compact-outline
      </v-icon>
      <span>View All Post</span>
    </v-btn>

    <v-container class="my-5">
      <!-- Card Account -->
      <v-row wrap justify="center" class="xs12 sm6 md6 lg6" v-if="post">
        <v-flex class="ml-4 mt-2">
          <v-card
            class="mx-auto"
            max-width="600"
            outlined
            elevation="10"
          >
            <v-card-text>
              <div class="text-capitalize">
                <strong>{{ users.name }}</strong>
              </div>
              <div class="text--primary">
                {{ post.content }}
              </div>
              <!-- Show hashtag -->
              <div class="mt-2 blue--text" v-if="post.hashtag.length > 0">
                <v-item-group multiple>
                  <v-subheader>Tags</v-subheader>
                  <v-item
                    v-for="(ht, i) in post.hashtag"
                    :key="i"
                    v-slot="{active, toggle}"
                  >
                    <v-chip 
                      active-class="blue--text"
                      :input-value="active"
                      @click="toggle"
                      x-small
                    >
                      {{ ht }}
                    </v-chip>
                  </v-item>
                </v-item-group>
                <!-- {{ post.hashtag.length > 0 ? post.hashtag : '' }} -->
              </div>
              
              <div class="mt-4 ml-4" v-if="comments.length > 0">
                <strong>Comments : </strong>
                <div v-for="comment in comments" :key="comment._id">
                  <p>
                    {{comment.userId }}: {{comment.comment}} 
                    <v-btn class="blue--text" x-small @click="comment.likes++">
                      <v-icon x-small>
                        mdi-thumb-up
                      </v-icon>
                      <span>{{comment.likes > 0 ? comment.likes : ''}}</span>
                    </v-btn>
                  </p>
                  
                </div>
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
          <v-subheader>The post has been deleted</v-subheader>
        </v-flex>
        <!-- <AddPost /> -->
      </v-row>

    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      users: {},
      post: null,
      token: localStorage.getItem('token'),
      postId: '',
      comments: []
    }
  },
  mounted() {
    this.getUser()
    this.showPost()
    console.log(this.post)
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
    showPost: function() {
      const id = this.$route.params.id;
      this.postId = id;
      // alert(id)
      axios({
        method: 'get',
        url: 'http://localhost:3001/posts/showPost/' + id,
        headers: {
            authorization: 'Bearer '+this.token
        }
      }).then(response => {
        const results = response.data;
        if(results.status === true){
            console.log(results.data)
            this.post = results.data
            this.comments = results.comments
        }else{
          this.post = null
        }
      }).catch(error => {
        console.log(error)
        this.post = null
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
            this.showPost()

        }
      }).catch(error => {
        this.showPost()
        console.log(error)
      })
    }
  }
}
</script>