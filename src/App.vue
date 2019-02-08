<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="sideNav = !sideNav">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          Kanban Board
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">

        <v-btn flat
        v-for="item in menuItems"
        :to="item.link"
        :key="item.title">
          <v-icon left dark>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>

        <v-btn flat 
        v-if="userIsAuthenticated" 
        @click="OnLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer app v-model="sideNav" temporary>
      <v-list>

        <v-list-tile
        v-for="item in menuItems"
        :to="item.link"
        :key="item.title">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile 
        v-if="userIsAuthenticated" 
        @click="OnLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Logout
          </v-list-tile-content>
        </v-list-tile>


      </v-list>
    </v-navigation-drawer>

    <main>
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems(){
      let menuItems = [
        {icon: 'face', title: 'Register', link: '/signup'},
        {icon: 'lock_open', title: 'Log in', link: '/signin'}
      ]
      if(this.userIsAuthenticated){
        menuItems = []
      }
      return menuItems
    },
    userIsAuthenticated(){
      return this.$store.getters.user !== null || this.$store.user !== undefined
    }
  },
  methods: {
    OnLogout(){
      this.$store.dispatch('logout')
      this.$router.push("/signin")
    }
  }
}
</script>

<style>
.slide-enter-active{
  animation: slide-in 400ms ease-out forwards;
}
.slide-leave-active{
  animation: slide-out 400ms ease-out forwards;
}
@keyframes slide-in{
  from{  
    transform: translateY(-30px);
    opacity: 0;
  }
  to{
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-out{
  from{  
    transform: translateY(0);
    opacity: 1;
  }
  to{
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>