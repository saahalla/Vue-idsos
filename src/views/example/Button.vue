<template>
<div class="home">
  <h1>Hello World !!</h1>
  <p class="red white--text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde eos consequatur blanditiis illo quo consequuntur ab a? Quis, ratione eaque reiciendis odio, tenetur eos accusantium vero optio tempora consequuntur eveniet.</p>
  
  <v-btn class="blue white--text">Click Me</v-btn>
  <v-btn class="depressed" color="pink">Click Me</v-btn>
  <v-btn flat color="pink">Click Me</v-btn>

  <v-btn depressed small class="pink white--text">
    <v-icon left>mdi-email span</v-icon>
    <span>email me</span>
  </v-btn>

  <v-btn fab depressed dark color="purple">
    <v-icon color="white">mdi-heart</v-icon>
  </v-btn>
</div>
</template>

<script>

  export default {
    name: 'Home',

    
  }
</script>
