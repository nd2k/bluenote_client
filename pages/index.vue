<template>
  <section class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="form-group mt-3">
          <input type="text" v-model="query" class="form-control" placeholder="Rechercher">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <ul class="card-columns list-unstyled">
          <li v-for="menu in filteredList" :key="menu.id" class="card">
            <img :src="menu.image.url" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">{{ menu.nomDuMenu }}</h5>
              <p class="card-text">{{ menu.descriptionDuMenu || "Aucune description" }}</p>
              <router-link>Voir le menu</router-link>
            </div>
          </li>
          <p v-if="!filteredList.length">Aucun résultat</p>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

export default {
  data() {
    return {
      query: ""
    };
  },
  computed: {
    filteredList() {
      return this.menus.filter(menu => {
        return menu.nomDuMenu.toLowerCase().includes(this.query.toLowerCase());
      });
    },
    menus() {
      return this.$store.getters["menus/list"];
    }
  },
  async fetch({ store }) {
    store.commit("menus/emptyList");
    const response = await strapi.request("post", "/graphql", {
      data: {
        query: `query {
          menus {
            id
            nomDuMenu
            descriptionDuMenu
            image {
              url
            }
          }
        }`
      }
    });
    response.data.menus.forEach(menu => {
      menu.image.url = `${apiUrl}${menu.image.url}`;
      store.commit("menus/add", {
        id: menu.id,
        ...menu
      });
    });
  }
};
</script>

<style lang="scss">
</style>

