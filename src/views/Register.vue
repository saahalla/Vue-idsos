<template>
  <v-container id="register">
    <v-row wrap>
      <v-col class="xs12 sm8 md6 lg6" justify="center">
        <v-card light class="pa-4" justify="center">
          <h2 class="mb-4">Register</h2>
          <v-form
              ref="form"
              lazy-validation
          >
              <v-text-field
              v-model="name"
              :counter="10"
              label="Name"
              :rules="nameRules"
              required
              ></v-text-field>

              <v-text-field
              v-model="username"
              :counter="10"
              label="Username"
              required
              :rules="usernameRules"
              ></v-text-field>

              <v-text-field
              v-model="email"
              label="E-mail"
              required
              :rules="emailRules"
              ></v-text-field>

              <v-text-field type="password"
              v-model="password"
              :counter="10"
              label="Password"
              required
              :rules="passwordRules"
              ></v-text-field>

              <v-btn
              color="primary"
              @click="register"
              >
              Register
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
			name: '',
			email: '',
			password: '',
      usernameRules: [
        value => !!value || 'Required.',
      ],
      passwordRules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 4) || 'Min 4 characters',
      ],
      emailRules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 8) || 'Min 8 characters',
      ],
      nameRules: [
        value => !!value || 'Required.',
      ]
		}
	},
	methods: {
		register: function(){
			const dataSignUp = {
				username: this.username,
				name: this.name,
				email: this.email,
				password: this.password
			}
			console.log(dataSignUp)
			axios({
				method: 'post',
				url: 'http://localhost:3001/users/addUser',
				data: dataSignUp,

			}).then(response => {
				const status = response.data.status

				if(status === true) {
					this.$router.push('/login')
				}

			}).catch(err=>{
				console.log(err)
			})
		}
	},
	mounted() {
		console.log(this.username)
	}
}
</script>

<style scoped>
#register {
  max-width: 400px;
}
</style>