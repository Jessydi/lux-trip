import { defineStore } from "pinia";
import { db } from "@/firebase/firebaseInit";
import {
  setDoc,
  doc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// let tripsArray = [
//   {
//     imgSrc:
//       "https://firebasestorage.googleapis.com/v0/b/firetrip-b1efe.appspot.com/o/trip-cards%2Ftrip-card-img-1.jpg?alt=media&token=142685c5-f69e-4896-ac14-7028da752c2e",
//     location: "Austria",
//     price: "1490",
//     name: "Winter Park Ski Holiday",
//     rating: 4,
//     category: "Best Winter Destinations",
//     continent: "Europe",
//     travelType: "Romantic",
//     travellers: 2,
//     date: new Date("2024-2-28"),
//   },
// ];
// console.log(tripsArray);
export const useLuxTripStore = defineStore("luxTrip", {
  state: () => ({
    trips: [],
    filterParams: {
      travelCategory: null,
      travelType: null,
      travellers: null,
      dateValue: null,
    },
    reviews: null,
    canLoadMore: false,
  }),
  getters: {
    isStoreFiltersEmpty: (state) =>
      Object.values(state.filterParams).every((val) => val === null),
    queryForActiveFilters(state) {
      let { travelCategory, travelType, travellers, dateValue } =
        state.filterParams;
      let conjunction = " - ";

      if (dateValue && dateValue.includes(conjunction)) {
        dateValue = dateValue.split(conjunction);
        dateValue = dateValue.map((date) => new Date(date));
      } else if (dateValue) {
        dateValue = new Date(dateValue);
      }
      let constraintsArray = [
        ["category", "==", travelCategory],
        ["travelType", "==", travelType],
        ["travellers", "==", +travellers],
        ["date", ">", Array.isArray(dateValue) ? dateValue[0] : dateValue],
        [Array.isArray(dateValue) ? dateValue[1] : dateValue],
      ];

      constraintsArray = constraintsArray.flatMap((constraint) =>
        constraint[2]
          ? [where(constraint[0], constraint[1], constraint[2])]
          : []
      );

      const q = query(collection(db, "trips"), ...constraintsArray);

      return q;
    },
  },
  actions: {
    async getTrips(q = collection(db, "trips")) {
      try {
        const docsSnap = await getDocs(q);

        docsSnap.forEach((doc) => {
          for (let i = 0; i < 12; i++) {
            this.trips.push(doc.data());
          }
        });
        this.canLoadMore = true;
      } catch (e) {
        console.error(e);
      }
    },
    async getDetailsAboutTrip(id) {
      try {
        const tripDetailsRef = collection(db, `trips/${id}/tripDetail`);
        const docsSnap = await getDocs(tripDetailsRef);
        docsSnap.forEach((doc) => {
          const objWithIdOne = this.trips.find((trip) => trip.id === id);
          objWithIdOne.detailInfo = doc.data();
          console.log(doc.id, " => ", doc.data());
          console.log(this.trips);
        });
      } catch (e) {
        console.error(e);
      }
    },
    async addTrips() {
      try {
        const tripDocRef = doc(collection(db, "trips"));
        await setDoc(tripDocRef, {
          imgSrc:
            "https://firebasestorage.googleapis.com/v0/b/firetrip-b1efe.appspot.com/o/trip-cards%2Ftrip-card-img-1.jpg?alt=media&token=142685c5-f69e-4896-ac14-7028da752c2e",
          location: "Austria",
          price: "1490",
          name: "Winter Park Ski Holiday",
          rating: 4,
          category: "Best Winter Destinations",
          continent: "Europe",
          travelType: "Romantic",
          travellers: 2,
          date: new Date("2024-2-28"),
          id: tripDocRef.id,
        });

        const tripDetailDocRef = await addDoc(
          collection(db, `trips/${tripDocRef.id}/tripDetail`),
          {
            description:
              "Machu Picchu is situated above a bow of the Urubamba River, which surrounds the site on three sides, where cliffs drop vertically for 450 meters (1,480 ft) to the river at their base. The area is subject to morning mists rising from the river.[49] The location of the city was a military secret, and its deep precipices and steep mountains provided natural defenses. ",
            Destination: "Peru",
          }
        );
        console.log("tripDocRef written with ID: ", tripDocRef.id);
        console.log("tripDetailDocRef written with ID: ", tripDetailDocRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
});
