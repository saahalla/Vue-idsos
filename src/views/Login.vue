<template>
  <v-container id="login">
    <v-row wrap>
      <v-col class="xs12 sm8 md6 lg6" justify="center">
        <v-card light class="pa-4" justify="center">
          <h2 class="mb-4">Login</h2>
          <v-form
              ref="form"
              lazy-validation
          >
              <v-text-field
              v-model="username"
              :counter="10"
              label="Username"
              :rules="usernameRules"
              required
              ></v-text-field>

              <v-text-field type="password"
              v-model="password"
              :counter="10"
              label="Password"
              required
              :rules="passwordRules"
              @keyup.enter="username !== '' && password !== '' ? login() : ''"
              ></v-text-field>

              <v-btn
              color="primary"
              @click="login"
              >
              Login
              </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: function(){
		return {
			username: '',
			password: '',
      usernameRules: [
        value => !!value || 'Required.',
      ],
      passwordRules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 4) || 'Min 4 characters',
      ]
		}
	},
	methods: {
		login: async function(){
			const data = {
				username: this.username,
				password: this.password
			}
      if(this.username && this.password){
        console.log(data)
        await axios({
          method: 'post',
          url: 'http://localhost:3001/users/login',
          data: data,

        }).then(response => {
          const status = response.data.status

          if(status === true) {
            const token = response.data.data.token
            const user = {
              token,
              login: true,
              user: response.data.data.userId
            }
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
            localStorage.setItem('login', true)
            localStorage.setItem('userId', response.data.data.userId)

            console.log(localStorage.getItem('token'))
            try {
              this.$router.push('/frontend/MyProfile')
            } catch (error) {
              console.log(error)
            }
            
          }else{
            alert('The password you entered is incorrect.')
          }

        }).catch(err=>{
          console.log(err)
        })
      }
		}
	},
	mounted() {
		console.log(this.username)
	}
}
</script>

<style scoped>
#login {
  max-width: 440px;
}
</style>