<template>
  <v-container>
    <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" mb-2>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
          <v-card class="">
            <v-container>
              <v-layout row>
                <v-flex xs5 sm4 md3>
                    <v-card-media
                      :src="meetup.imageUrl"
                      height="150px">
                    </v-card-media>
                </v-flex>
                <v-flex xs7 sm8 md9>
                      <v-card-title primary-title>
                      <div class="headline">
                        <h5 class="white--text mb-0 ">{{ meetup.title }}</h5>
                        <p><small class="primary--text">{{ meetup.date | date }}</small></p>
                        <p>{{ meetup.description }}</p>
                      </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat class="primary" :to="'/meetups/' + meetup.id">
                          <v-icon left>arrow_forward</v-icon>
                          View Meetup
                        </v-btn>
                      </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default{
      computed: {
        meetups () {
          return this.$store.getters.loadedMeetups
        }
      }
    }
</script>

<style scoped>
    .info{
      background: none;
    }
    date{
      font-size:16px;
      font-weight: bold;
    }
    .headline p{
      font-size: 14px;
      line-height: 1.4em;
    }
</style>
