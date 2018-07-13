<!-- <template>
  <v-app dark>
    <! <v-navigation-drawer v-model="sideNav">

    </v-navigation-drawer> -->
    <!-- <v-toolbar> -->
        <!-- <v-toolbar-side-icon @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon> -->
       <!-- <v-toolbar-title>Cerutti.io</v-toolbar-title> -->

       <!-- <v-spacer></v-spacer> -->
        <!-- <v-toolbar-items>
            <v-btn flat>
              <i class="material-icons">supervisor_account</i>
                  MeetUps</v-btn>
      </v-toolbar-items> -->
    <!-- </v-toolbar>
  <main>

  </main>

  </v-app>
</template> -->

<!-- <script>
export default {
  data () {
    return {
      sideNav:false
    }
  }
}
</script>  -->


<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
      disable-resize-watcher
      temporary>
      <v-list dense>
        <v-list-tile @click="" v-for="item in menuItems" :key="item.title"
        :to="item.link"
        tag="span"
        style="cursor:pointer">

          <v-list-tile-action>
            <v-icon class="icon">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left class="primary">

      <v-toolbar-side-icon @click.stop="drawer = !drawer"
      class="hidden-sm-and-up">
    </v-toolbar-side-icon>

      <v-toolbar-title>
        <router-link
        to="/"
        tag="span"
        style="cursor:pointer">
        Cerutti.io
      </router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
          <v-btn flat v-for="item in menuItems" :key="item.title"
          :to="item.link">
            <v-icon>{{ item.icon }}</v-icon>
                {{ item.title }}</v-btn>
    </v-toolbar-items>

    </v-toolbar>

    <v-content>
      <!-- <v-container fluid fill-height>
        <v-layout >
          <v-flex shrink> -->

                <router-view></router-view>

          <!-- </v-flex>
        </v-layout>
      </v-container> -->
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      dialog: false
    }),
    props: {
      source: String
    },
    computed: {
        menuItems () {
          let menuItems = [

            {
              icon: 'face',
              title: 'Sign Up',
              link: '/signup'
            },
            {
              icon: 'lock_open',
              title: 'Sign in',
              link: '/signin'
            }
          ]
          if(this.userIsAuthenticated) {
            menuItems = [
              {
                icon: 'supervisor_account',
                title: 'View Meetups',
                link: '/meetups'
              },
              {
                icon: 'room',
                title: 'Organize Meetup',
                link: '/meetup/new'
              },
              {
                icon: 'person',
                title: 'Profile',
                link: '/profile'
              }
            ]
          }
            return menuItems
        },
        userIsAuthenticated () {
          return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }
     }
  }
</script>

<style>
#inspire{font-family: 'Comfortaa', cursive;}
      .icon{
         padding-bottom: 5px;
      }
      .custom-loader {
        animation: loader 1s infinite;
        display: flex;
      }
      /* @-moz-keyframes loader {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      } */
      /* @-webkit-keyframes loader {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      } */
      /* @-o-keyframes loader {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes loader {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      } */
</style>
