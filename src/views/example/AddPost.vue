<template>
  <v-container fluid>
    <v-textarea
      clearable
      clear-icon="mdi-close-circle"
      label="Text"
      value="This is clearable text."
      v-model="content"
    ></v-textarea>
    <!-- {{ content}} -->
    <v-btn @click="addPost">
        <v-icon>mdi-plus</v-icon>
        <span>Add</span>
    </v-btn>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: function(){
    return {
      content: ''
    }
  },
  mounted() {

  },
  methods: {
    addPost: function(){
      const token = localStorage.getItem('token')
      const id = localStorage.getItem('userId')

      axios({
        method: 'post',
        url: 'http://localhost:3001/posts/addPost',
        headers: {
          authorization: 'Bearer '+token
        },
        data: {
          userId: id,
          content: this.content
        }
      }).then(response => {
        const results = response.data;
        if(results.status === true){
          console.log(results.data)
          this.$router.push('/frontend/MyPosts')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>