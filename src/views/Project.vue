<template>
  <div class="dasboard">
    <h3 class="subheading grey--text">Project</h3>

    <v-container class="my-5">

      <v-card plain v-for="(project, i) in projects" :key="i">
        <v-row wrap :class="`pa-3 project ${project.status}`" >
          <v-flex xs12 md6>
            <div class="caption grey--text">Project Title</div>
            <p>{{ project.title }}</p>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <p>{{ project.person }}</p>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <p>{{ project.due }}</p>
          </v-flex>

          <v-flex xs2 sm4 md2>
            <v-chip id="chip" small :class="`${project.status}`">{{ project.status }}</v-chip>
          </v-flex>
        </v-row>
        <v-divider></v-divider>
      </v-card>

    </v-container>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      projects: [
        {title: "Design a website", person: "Saahalla", due: "8th Jan 2021", status: "ongoing"},
        {title: "Design a Wireframe", person: "Saahalla", due: "8th Feb 2021", status: "complete"},
        {title: "Design a Poster", person: "Mahfudh", due: "7th May 2021", status: "overdue"},
        {title: "Design a Photo", person: "Aput", due: "8th Jan 2022", status: "complete"},
      ]
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    console.log(token)
  }
}
</script>
<style scoped>
.project.ongoing {
  border-left: 4px solid orange;
}
.project.complete {
  border-left: 4px solid lightblue;
}
.project.overdue {
  border-left: 4px solid red
}

#chip.v-chip.complete {
  background: lightblue;
}
#chip.v-chip.ongoing {
  background: orange;
}
#chip.v-chip.overdue {
  background: red;
}
</style>