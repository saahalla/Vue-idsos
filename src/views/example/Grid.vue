<template>
  <div class="dashboard">
    <h3 class="subheading grey--text">Dashboard</h3>

    <v-container class="my-5">
      <v-row wrap>
        <v-flex xs12 md6>
          <v-btn outlined block class="secondary">2</v-btn>
        </v-flex>
        <v-flex xs4 md2>
          <v-btn outlined block class="secondary">2</v-btn>
        </v-flex>
        <v-flex xs4 md2>
          <v-btn outlined block class="secondary">2</v-btn>
        </v-flex>
        <v-flex xs4 md2>
          <v-btn outlined block class="secondary">2</v-btn>
        </v-flex>
      </v-row>

      <v-row wrap justify="space-around">
        <v-flex xs4 md3>
          <v-btn outlined block class="primary">1</v-btn>
        </v-flex>
        <v-flex xs4 md3>
          <v-btn outlined block class="primary">1</v-btn>
        </v-flex>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  
}
</script>