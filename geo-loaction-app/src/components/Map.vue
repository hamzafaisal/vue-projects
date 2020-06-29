<template>
  <div class="map">
    <div id="google-map"></div>
  </div>
</template>

<script>
import db from "../firebase/init";
import firebase from "firebase";

export default {
  data() {
    return {
      lat: 30.3753,
      lng: 69.3451
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("google-map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: true
      });

      let ref = db.collection("users");
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().geolocation) {
            // ADD MARKER ON THIS USER
            let marker = new google.maps.Marker({
              position: {
                lat: doc.data().geolocation.lat,
                lng: doc.data().geolocation.lng
              },
              // icon:
              //   "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
              map
            });

            marker.addListener("click", () => {
              this.$router.push("/profile/" + doc.id);
            });
          }
        });
      });
    }
  },
  mounted() {
    // GET CURRENT USER FROM DATABASE
    let user = firebase.auth().currentUser;
    let ref = db.collection("users");

    //GET USER CURRENT LOCATION
    if (navigator.geolocation && user) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;

          // UPDATE USER LOCATION
          ref
            .where("user_id", "==", user.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                //UPDATE USERS LAT AND LNG
                ref.doc(doc.id).update({
                  geolocation: {
                    lat: this.lat,
                    lng: this.lng
                  }
                });
              });
            })
            .then(result => {
              this.renderMap();
            });
        },
        err => {
          console.log(err);
          this.renderMap();
        },
        { maximumAge: 60000, timeout: 3000 }
      );
    } else {
      this.renderMap();
    }
  }
};
</script>

<style scoped>
#google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>