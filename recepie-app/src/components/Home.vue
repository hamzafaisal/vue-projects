<template>
  <div class="index container">
    <div class="card" v-for="recepie in recepies" :key="recepie.id">
      <div class="card-content">
        <i @click="deleteRecepie(recepie.id)" class="material-icons delete">delete</i>
        <h2 class="indigo-text">{{recepie.title}}</h2>
        <ul class="ingredients">
          <li>
            <span
              class="chip"
              v-for="(ingredient , i) in recepie.ingredients"
              :key="i"
            >{{ingredient}}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab indigo">
        <router-link :to="'/edit/' + recepie.slug">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";

export default {
  data() {
    return {
      recepies: []
    };
  },
  created() {
    const ref = db.collection("recepies");

    ref.get().then(snapshot => {
      snapshot.forEach(result => {
        let recepie = result.data();
        recepie.id = result.id;
        this.recepies.push(recepie);
        // console.log(this.recepies);
      });
    });
  },
  methods: {
    deleteRecepie(id) {
      console.log(id);
      this.recepies = this.recepies.filter(recepie => {
        return recepie.id != id;
      });
      db.collection("recepies")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        });
    }
  }
};
</script>

<style scoped>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>