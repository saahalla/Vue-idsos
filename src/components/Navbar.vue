<template>
  <nav> 
    <v-toolbar color="blue-grey lighten-3" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="text-uppercase black--text">
        <span class="font-weight-light">ID</span>
        <span>Sos</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="logout" plain class="black--text">
        <span>sign out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-spacer></v-spacer>
    
    <v-navigation-drawer app v-model="drawer" temporary color="blue-grey lighten-4">
      <v-list class="blue--text" v-for="(link, i) in links" :key="i">
        <v-list-group v-if="link.children.length > 0" router :to="link.route" :value="true" :prepend-icon="link.icon">

          <template v-slot:activator>
            <v-list-item-title>{{link.text}}</v-list-item-title>
          </template>

          <v-list-item
            v-for="(child, i) in link.children"
            :key="i"
            router :to="child.route"
          >
            <v-list-item-icon>
              <v-icon>{{child.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{child.name}}</v-list-item-title>
          </v-list-item>

        </v-list-group>
        
        <v-list-item v-else router :to="link.route">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
  </nav>
</template>

<script>

export default {
    data: function(){
      return {
        drawer: false,
        links: [
          { 
            icon: 'mdi-view-dashboard', 
            text: 'Admin Dashboard', 
            route: '/',
            children: [
              {
                icon: 'mdi-account',
                name: 'User',
                route: '/dashboard/users'
              },
              {
                icon: 'mdi-note-plus',
                name: 'Post',
                route: '/dashboard/posts'
              },
              {
                icon: 'mdi-account-plus',
                name: 'Follow',
                route: '/dashboard/follow'
              },
            ]
          },
          {
            icon: 'mdi-view-dashboard', 
            text: 'Users FrontEnd', 
            route: '/frontend',
            children: [
              // {
              //   icon: 'mdi-card-account-details',
              //   name: 'Card',
              //   route: '/frontend/card'
              // },
              // {
              //   icon: 'mdi-arrow-up-bold-box',
              //   name: 'Modal',
              //   route: '/frontend/modal'
              // },
              {
                icon: 'mdi-account',
                name: 'My Profile',
                route: '/frontend/MyProfile'
              },
              {
                icon: 'mdi-note-plus-outline',
                name: 'My Posts',
                route: '/frontend/MyPosts'
              },
              {
                icon: 'mdi-note-plus',
                name: 'Add Post',
                route: '/frontend/addPost'
              },
            ]
          },
          { icon: 'mdi-folder', text: 'My Projects', route: '/projects', children: []},
          { icon: 'mdi-account-box', text: 'People', route: '/people', children: []},
          { icon: 'mdi-account-plus', text: 'Register', route: '/register', children: []},
          { icon: 'mdi-login', text: 'Login', route: '/login', children: []},
        ]
      }
    },
    methods: {
      logout: function(){
        localStorage.removeItem('token')
        localStorage.removeItem('login')
        localStorage.removeItem('user')

        console.log('logout')
        this.$router.push('/login')
      }
    }
}
</script>
