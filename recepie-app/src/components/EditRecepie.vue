<template>
  <div v-if="recepie" class="edit-smoothie container z-depth-1">
    <h2 class="indigo-text center-align">Edit Recepie</h2>
    <form @submit.prevent="editRecepie()">
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
        <label for="add-ingredient">Add an ingredient (press tab to add):</label>
        <input type="text" name="add-ingredient" v-model="newIng" @keydown.tab.prevent="addIng()" />
      </div>
      <div class="field center-align">
        <button class="btn pink">Update Recepie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/init";

export default {
  data() {
    return {
      recepie: null,
      id: null,
      title: null,
      ingredients: [],
      newIng: null,
      slug: null
    };
  },
  methods: {
    editRecepie() {
      db.collection("recepies")
        .doc(this.id)
        .update({
          title: this.title,
          slug: this.slug,
          ingredients: this.ingredients
        })
        .then(result => {
          this.$router.push("/");
        });
    },
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
    }
  },
  created() {
    const ref = db.collection("recepies");

    ref
      .where("slug", "==", this.$route.params.slug)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let recepieData = doc.data();
          this.id = doc.id;
          this.recepie = recepieData;
          this.ingredients = recepieData.ingredients;
          this.title = recepieData.title;
          this.slug = recepieData.slug;
        });
      });
  }
};
</script>

<style scoped>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}
.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>