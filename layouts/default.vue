<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
        >
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="Admin"
            nav
          >
            <template v-slot:append>
              <v-btn
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <nuxt-link to="/users"> <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item> </nuxt-link>
           
            <nuxt-link to="/packages"><v-list-item prepend-icon="mdi-package" title="Packages" value="packages"></v-list-item></nuxt-link>
            <nuxt-link to="/pending"><v-list-item prepend-icon="mdi-cash" title="Pending Transaction" value="pendingTransaction"></v-list-item></nuxt-link>
            <nuxt-link to="/completed"><v-list-item prepend-icon="mdi-cash" title="Completed Transaction" value="completedTransaction"></v-list-item></nuxt-link>
            <nuxt-link to="/total"><v-list-item prepend-icon="mdi-cash-100" title="Total Balance" value="totalTransaction"></v-list-item></nuxt-link>
            <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main>
            <slot />
        </v-main>
      </v-layout>
    </v-card>
  </template>
  <script>
    export default {
      data () {
        return {
          drawer: true,
          rail: true,
        }
      },
    }
  </script>