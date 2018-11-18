<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <v-card>
        <v-card-title class="headline">操作例子</v-card-title>
        <v-card-text>
          <div>
            <v-btn 
              color="primary"
              depressed
              nuxt 
              to="/demo/i18n">i18n</v-btn>

            <v-btn
              color="primary"
              depressed
              nuxt 
              to="/demo/infinite">infinite scroll</v-btn>

            <v-btn
              color="primary"
              depressed
              @click="''">toast</v-btn>
          </div>
          <v-list two-line>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Filter</v-list-tile-title>
                <v-list-tile-sub-title>{{ new Date() | toYMD() }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {}
</script>
