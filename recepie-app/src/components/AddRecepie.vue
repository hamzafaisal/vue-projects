<template>
  <div class="add-smoothie container z-depth-1">
    <h2 class="center-align indigo-text">Add New Recipe</h2>
    <form @submit.prevent="addRecepie()">
      <div class="field title">
        <label for="title">Smoothie title:</label>
        <input type="text" name="title" v-model="title" @keyup="createSlug()" />
        <p>{{slug}}</p>
      </div>
      <div v-for="(ingredient , i) in ingredients" :key="i" class="field ingredient">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[i]" />
        <i class="material-icons delete" @click="deleteIng(i)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an Ingredient (press tab to add):</label>
        <input type="text" name="add-ingredient" v-model="newIng" @keydown.tab.prevent="addIng()" />
      </div>
      <div class="field center-align">
        <button class="btn pink" :disabled="!title">Add Recepie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/init";

export default {
  data() {
    return {
      title: null,
      ingredients: [],
      newIng: null,
      slug: null
    };
  },
  methods: {
    addIng() {
      if (this.newIng) {
        this.ingredients.push(this.newIng);
        this.newIng = null;
      }
    },
    deleteIng(id) {
      this.ingredients.splice(id, 1);
    },
    createSlug() {
      if (this.title) {
        let newSlug = this.title.toLowerCase().replace(/ /g, "-");
        this.slug = newSlug;
      }
    },
    addRecepie() {
      db.collection("recepies")
        .add({
          title: this.title,
          slug: this.slug,
          ingredients: this.ingredients
        })
        .then(result => {
          this.title = null;
          this.slug = null;
          this.ingredients = null;
          this.$router.push("/");
        });
    }
  }
};
</script>

<style scoped>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-smoothie .field {
  margin: 20px auto;
  position: relative;
}
.add-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>