<template>
  <div class="team mt-4">
    <h3 class="subheading grey--text">Peoples</h3>

    <v-container class="my-5">
      <v-row wrap justify="center">
        <v-flex xs12 sm8 md6 lg3 v-for="(user, i) in users" :key="i" class="mb-4 mr-1">
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
              <h4 class="blue--text">{{user.name}}</h4>
              <div class="grey--text mt-2">username: @{{user.username}}</div>
              <div class="grey--text">email: {{user.email}}</div>
            </v-card-text>
            
            <v-card-actions>
              <v-btn color="light-blue" small>
                <v-icon small left>
                  mdi-account-arrow-left
                </v-icon>
                <span>Followers: {{followings}} </span>
              </v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn color="light-blue" small>
                <v-icon small left>
                  mdi-account-arrow-right
                </v-icon>
                <span>Followings: {{followers}}</span>
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
      users: [],
      followers: [],
      followings: []
    }
  },
  mounted() { 
    this.$nextTick(function (){
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
    })
    
  },
  computed: {
    
  }

}
</script>