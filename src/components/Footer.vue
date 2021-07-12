<template>
  <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      dense
      tile
    >
      <v-card-title class="blue-grey lighten-3">
        <strong class="subheading black--text">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon.icon"
          class="mx-2"
          dark
          router :to="icon.url"
          small
        >
          <v-icon size="24px">
            {{ icon.icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        &copy; {{ new Date().getFullYear() }} — <strong>IDSos</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        {icon: 'mdi-facebook', url: "https://facebook.com/saahalla.syiapoutt"},
        {icon: 'mdi-twitter', url: "https://twitter.com/saahalla"},
        {icon: 'mdi-linkedin', url: "https://lonkedin.com/saahalla"},
        {icon: 'mdi-instagram', url: "https://instagram.com/saahalla"}
      ],
    }),
  }
</script>