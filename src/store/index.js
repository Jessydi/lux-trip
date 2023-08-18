import { defineStore } from "pinia";
// import { db } from "@/firebase/firebaseInit";
import { db, storage } from "@/firebase/firebaseInit";
import { ref, getDownloadURL } from "firebase/storage";
import {
  setDoc,
  doc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";

let tripsArray = [
  {
    imgSrc: "machu-picchu/machu-picchu-card.jpg",
    location: "Peru",
    fullDdestination: "Peru, Machu Picchu",
    price: "1790",
    name: "Machu Picchu",
    category: "Best Summer Destinations",
    continent: "South America",
    travelType: "Romantic",
    travellers: 3,
    date: [new Date("2023-9-18"), new Date("2024-8-12")],
    fullTripInfo: {
      name: "Machu Picchu",
      country: "Peru",
      description:
        "Machu Picchu is situated above a bow of the Urubamba River, which surrounds the site on three sides, where cliffs drop vertically for 450 meters (1,480 ft) to the river at their base. The area is subject to morning mists rising from the river.[49] The location of the city was a military secret, and its deep precipices and steep mountains provided natural defenses.",
      destination: "Machu Picchu",
      departure: "Lima",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Comfortable outdoor clothing",
      bigImgSrc: "machu-picchu/machu-picchu-big-img.jpg",
      smallImgSrc: "machu-picchu/machu-picchu-card.jpg",
      price: 1790,
      included: [
        "5 Star Accommodation",
        "Airport Transfer",
        "Breakfast",
        "Personal Guide",
      ],
      notIncluded: ["Gallery Ticket", "Lunch"],
      tourPlan: [
        {
          dayPlanTitle: "Acclimatizing to Cusco's Charm and Culture",
          dayPlan:
            "Arrive in Cusco and transfer to your hotel. Spend the day acclimatizing to the altitude and exploring the city's charming streets and vibrant markets.",
          included: ["Airport transfer", "Hotel accommodation"],
        },
        {
          dayPlanTitle: "Discovering Inca Ruins in the Sacred Valley",
          dayPlan:
            "Embark on a full-day guided tour of the Sacred Valley, stopping at important Inca ruins and traditional Andean villages along the way.",
          included: [
            "Full-day guided tour of the Sacred Valley",
            "Entrance fees to Inca ruins",
            "Lunch",
          ],
        },
        {
          dayPlanTitle: "Exploring Machu Picchu with a Guide",
          dayPlan:
            "Take an early morning train to Aguas Calientes, the town at the base of Machu Picchu. Spend the day exploring the ancient Inca citadel with a knowledgeable guide.",
          included: [
            "Train tickets to Aguas Calientes",
            "Bus tickets to Machu Picchu",
            "Guided tour of Machu Picchu",
            "Entrance fee to Machu Picchu",
          ],
        },
        {
          dayPlanTitle: "Sunrise at Machu Picchu: Optional Second Visit",
          dayPlan:
            "Optional: wake up early for a second visit to Machu Picchu to watch the sunrise. Return to Cusco by train in the afternoon.",
          included: [
            "Train tickets from Aguas Calientes to Cusco (or airport)",
            "Airport transfer",
          ],
        },
      ],
      gallery: {
        topImg: "machu-picchu/machu-gallery/machu-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "machu-picchu/machu-gallery/machu-gallery-2.jpg",
          "machu-picchu/machu-gallery/machu-gallery-3.jpg",
          "machu-picchu/machu-gallery/machu-gallery-4.jpg",
          "machu-picchu/machu-gallery/machu-gallery-5.jpg",
        ],
        bottomImg: "machu-picchu/machu-gallery/machu-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Well organized trip, All arranged well by Arooz. Special thanks to Aijaz Bhai for the service and support given to us, all explained well and take us to all places as per our wish. It was a wonderful experience .... Thank you team",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "1",
            reception: "5",
          },
          userName: "Eduard Hand",
          userEmail: null,
          date: new Date(),
        },
        {
          commentText:
            "This trip was a mesmerizing escapade into the unknown. With each step, I found myself immersed in a tapestry of unfamiliar sights and unfamiliar cultures. It was a journey of self-exploration, where I discovered hidden strengths and embraced new perspectives. The encounters with locals, their stories, and their warmth left an indelible mark on my soul. The trip challenged me to step outside my comfort zone and embrace the unfamiliar, leading to moments of profound personal growth. It's an experience that will forever ignite my wanderlust and inspire me to continue exploring the wonders of our world.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "5",
          },
          userName: "Brandon Mango",
          userEmail: null,
          date: new Date(),
        },
        {
          commentText:
            "Wow, what an incredible trip! The sights, sounds, and sensations encountered along the way were truly transformative. From the awe-inspiring landscapes to the rich cultural experiences, every moment was a feast for the senses. The journey pushed boundaries, allowing for personal growth and self-discovery. It's a trip that will forever hold a special place in my heart, reminding me of the immense beauty and diversity our world has to offer. I feel grateful for the memories created and the connections forged during this extraordinary adventure.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "5",
          },
          userName: "Maren Westervelt",
          userEmail: null,
          date: new Date(),
        },
        {
          commentText: null,
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "5",
          },
          userName: "Alice Smith",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "3",
            hospitality: "4",
            hygiene: "3",
            reception: "4",
          },
          userName: "Ethan Johnson",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "5",
            hospitality: "5",
            hygiene: "4",
            reception: "4",
          },
          userName: "Sophia Davis",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "4",
            hospitality: "3",
            hygiene: "4",
            reception: "3",
          },
          userName: "Oliver Wilson",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Ava Thompson",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "3",
            hospitality: "3",
            hygiene: "4",
            reception: "3",
          },
          userName: "Noah Anderson",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "5",
          },
          userName: "Emma Brown",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "5",
            hospitality: "5",
            hygiene: "5",
            reception: "4",
          },
          userName: "Liam Taylor",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "5",
            hospitality: "5",
            hygiene: "5",
            reception: "4",
          },
          userName: "Liam Taylor",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "5",
          },
          userName: "Lucas Martinez",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
      ],
    },
  },
  {
    imgSrc: "winter-park-ski/winter-park-ski-card.jpg",
    location: "Colorado, USA",
    fullDestination: "Colorado, USA, Winter Park Ski Resort",
    price: "1999",
    name: "Winter Park Ski Holiday",
    category: "Best Winter Destinations",
    continent: "North America",
    travelType: "Adventure",
    travellers: 1,
    date: new Date("2026-01-1"),
    fullTripInfo: {
      name: "Winter Park Ski Holiday",
      country: "United States",
      description:
        "Embark on an exhilarating ski holiday at Winter Park, Colorado, one of the top ski resorts in North America. With its breathtaking mountain views, world-class slopes, and cozy alpine atmosphere, Winter Park offers an unforgettable winter adventure for ski enthusiasts of all levels. Whether you're a seasoned skier or a beginner hitting the slopes for the first time, this trip promises thrilling downhill runs, scenic chairlift rides, and a wide range of après-ski activities to enjoy.",
      destination: "Winter Park Ski Resort",
      departure: "Denver International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Warm and waterproof ski attire",
      bigImgSrc: "winter-park-ski/winter-park-ski-big-img.jpg",
      smallImgSrc: "winter-park-ski/winter-park-ski-card.jpg",
      price: 1999,
      included: [
        "7 nights accommodation at Winter Park",
        "Ski lift passes",
        "Ski equipment rental",
        "Daily breakfast",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Winter Park",
          dayPlan:
            "Arrive at Denver International Airport and transfer to Winter Park. Check into your accommodation and spend the day exploring the charming mountain village.",
          included: ["Airport transfer", "Hotel accommodation"],
        },
        {
          dayPlanTitle: "Skiing and Snowboarding",
          dayPlan:
            "Hit the slopes and enjoy a full day of skiing or snowboarding at Winter Park Ski Resort. Take advantage of the variety of trails suited for different skill levels.",
          included: ["Ski lift passes", "Ski equipment rental"],
        },
        {
          dayPlanTitle: "Winter Park Adventure Park",
          dayPlan:
            "Take a break from skiing and visit the Winter Park Adventure Park. Enjoy thrilling activities such as tubing, snowshoeing, and ice skating.",
          included: ["Winter Park Adventure Park tickets"],
        },
        {
          dayPlanTitle: "Scenic Snowshoeing",
          dayPlan:
            "Embark on a guided snowshoeing tour and explore the scenic winter landscapes surrounding Winter Park. Admire the pristine beauty of the snow-covered forests.",
          included: ["Guided snowshoeing tour", "Snowshoe rental"],
        },
        {
          dayPlanTitle: "Relaxation and Apres-Ski",
          dayPlan:
            "Spend the day at leisure, enjoying the amenities of the resort. Unwind in the spa, indulge in shopping, or relax by the fireplace. In the evening, experience the vibrant après-ski scene at the resort's bars and restaurants.",
          included: ["Resort amenities"],
        },
        {
          dayPlanTitle: "Final Day at Winter Park",
          dayPlan:
            "Enjoy your last day at Winter Park. Take a final ski run or explore the village before departing for Denver International Airport.",
          included: ["Hotel accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg:
          "winter-park-ski/winter-park-ski-gallery/winter-park-ski-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "winter-park-ski/winter-park-ski-gallery/winter-park-ski-gallery-2.jpg",
          "winter-park-ski/winter-park-ski-gallery/winter-park-ski-gallery-3.jpg",
          "winter-park-ski/winter-park-ski-gallery/winter-park-ski-gallery-4.jpg",
          "winter-park-ski/winter-park-ski-gallery/winter-park-ski-gallery-5.jpg",
        ],
        bottomImg:
          "winter-park-ski/winter-park-ski-gallery/winter-park-ski-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "My Winter Park Ski Holiday was an incredible experience. The ski resort had excellent slopes for all skill levels, and the mountain views were breathtaking. The package included everything I needed, from accommodation to ski equipment rental. I especially enjoyed the après-ski activities and the vibrant atmosphere of the village. Highly recommended for ski enthusiasts!",
          rating: {
            comfort: "2",
            hospitality: "4",
            hygiene: "5",
            reception: "5",
          },
          userName: "Emily Johnson",
          userEmail: null,
          date: new Date(),
        },
        {
          commentText:
            "I had an amazing time at Winter Park Ski Resort. The skiing conditions were perfect, and the staff was friendly and helpful. The tour plan allowed me to explore the resort's other activities like snowshoeing and the adventure park. The accommodation was comfortable, and the breakfast provided a great start to the day. I can't wait to go back!",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "5",
          },
          userName: "Jacob Thompson",
          userEmail: null,
          date: new Date(),
        },
        {
          commentText: null,
          rating: {
            comfort: "4",
            hospitality: "3",
            hygiene: "4",
            reception: "3",
          },
          userName: "Emma Wilson",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Noah Davis",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "5",
            hospitality: "5",
            hygiene: "5",
            reception: "4",
          },
          userName: "Olivia Thompson",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "4",
            hospitality: "3",
            hygiene: "4",
            reception: "3",
          },
          userName: "Sophia Wilson",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "William Anderson",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "3",
            hospitality: "3",
            hygiene: "4",
            reception: "3",
          },
          userName: "Ava Brown",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "5",
          },
          userName: "Lucas Martinez",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "5",
            hospitality: "5",
            hygiene: "5",
            reception: "4",
          },
          userName: "Ella Taylor",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "5",
            hospitality: "2",
            hygiene: "5",
            reception: "4",
          },
          userName: "Jackson Miller",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
      ],
    },
  },
];

function getUrlFromSrc(src) {
  const starsRef = ref(storage, src);
  return getDownloadURL(starsRef)
    .then((r) => {
      return r;
    })
    .catch((error) => {
      console.log(error);
    });
}

export const useLuxTripStore = defineStore("luxTrip", {
  state: () => ({
    mobileNavigation: false,
    trips: [],
    topTrips: [
      {
        place: "World",
        cards: [],
      },
      {
        place: "Africa",
        cards: [],
      },
      {
        place: "Asia",
        cards: [],
      },
      {
        place: "Europe",
        cards: [],
      },
      {
        place: "North America",
        cards: [],
      },
      {
        place: "South America",
        cards: [],
      },
      {
        place: "Antarctica",
        cards: [],
      },
      {
        place: "Australia",
        cards: [],
      },
    ],
    searchTripsFilterParams: {
      travelCategory: null,
      travelType: null,
      travellers: null,
      dateValue: null,
    },
    filterParams: {
      travelCategory: null,
      travelType: null,
      travellers: null,
      dateValue: null,
    },
    reviews: null,
    worldsTopTripsLoaded: false,

    canLoadMore: true,
    canBeLoadedWithFilter: null,
    canBeLoadedWithDefaultFilter: null,
    tripsPerPage: 12,
    pagesLoadedWithDefaultFilter: 0,
    page: 0,
    lastDocSnap: null,
  }),
  actions: {
    shallowEqual(object1, object2) {
      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (let key of keys1) {
        if (object1[key] !== object2[key]) {
          return false;
        }
      }

      return true;
    },

    async changeFilter(filterObject) {
      if (!this.shallowEqual(filterObject, this.filterParams)) {
        this.page = 0;
        this.trips = [];
        this.lastDocSnap = null;
        this.filterParams = {
          travelCategory: filterObject.travelCategory,
          travelType: filterObject.travelType,
          travellers: filterObject.travellers,
          dateValue: filterObject.dateValue,
        };
        this.searchTripsFilterParams = {
          travelCategory: filterObject.travelCategory,
          travelType: filterObject.travelType,
          travellers: filterObject.travellers,
          dateValue: filterObject.dateValue,
        };

        this.canBeLoadedWithFilter = await getCountFromServer(
          this.queryForActiveFilters.qForCount
        );
        if (this.canBeLoadedWithFilter.data().count) {
          this.canLoadMore = true;
        } else {
          this.canLoadMore = false;
        }
        return true;
      }
      return false;
    },

    clearFilter() {
      if (!this.isStoreFiltersEmpty) {
        this.page = 0;
        this.trips = [];
        this.lastDocSnap = null;
        this.canLoadMore = true;
        this.filterParams = {
          travelCategory: null,
          travelType: null,
          travellers: null,
          dateValue: null,
        };
        this.searchTripsFilterParams = {
          travelCategory: null,
          travelType: null,
          travellers: null,
          dateValue: null,
        };
      }
    },
    // firestore
    async addTrips() {
      try {
        for (const trip of tripsArray) {
          let tripDocRef = doc(collection(db, "trips"));
          let topImg = trip.fullTripInfo.gallery.topImg
            ? await getUrlFromSrc(trip.fullTripInfo.gallery.topImg)
            : null;
          let bottomImg = trip.fullTripInfo.gallery.topImg
            ? await getUrlFromSrc(trip.fullTripInfo.gallery.topImg)
            : null;
          let restImages = trip.fullTripInfo.gallery.restImages
            ? await Promise.all(
                trip.fullTripInfo.gallery.restImages.map((imgSrc) =>
                  getUrlFromSrc(imgSrc)
                )
              )
            : null;
          let masonryImages = trip.fullTripInfo.gallery.masonryImages
            ? await Promise.all(
                trip.fullTripInfo.gallery.masonryImages.map((imgSrc) =>
                  getUrlFromSrc(imgSrc)
                )
              )
            : null;
          let gallery = {
            topImg: topImg,
            bottomImg: bottomImg,
            restImages: restImages,
            masonryImages: masonryImages,
          };
          let nearestDate = Array.isArray(trip.date)
            ? trip.date.sort((a, b) => a - b)[0]
            : trip.date;
          let furthestDate = Array.isArray(trip.date)
            ? trip.date.sort((a, b) => a - b)[trip.date.length - 1]
            : trip.date;
          let comfortAverageRating =
            trip.fullTripInfo.reviews.reduce(
              (accumulator, currentValue) =>
                accumulator + +currentValue.rating.comfort,
              0
            ) / trip.fullTripInfo.reviews.length;
          let hospitalityAverageRating =
            trip.fullTripInfo.reviews.reduce(
              (accumulator, currentValue) =>
                accumulator + +currentValue.rating.hospitality,
              0
            ) / trip.fullTripInfo.reviews.length;
          let hygieneAverageRating =
            trip.fullTripInfo.reviews.reduce(
              (accumulator, currentValue) =>
                accumulator + +currentValue.rating.hygiene,
              0
            ) / trip.fullTripInfo.reviews.length;
          let receptionAverageRating =
            trip.fullTripInfo.reviews.reduce(
              (accumulator, currentValue) =>
                accumulator + +currentValue.rating.reception,
              0
            ) / trip.fullTripInfo.reviews.length;
          let overallAverageRating =
            (comfortAverageRating +
              hospitalityAverageRating +
              hygieneAverageRating +
              receptionAverageRating) /
            4;
          const averageRatingObject = {
            comfortAverageRating: comfortAverageRating.toFixed(2),
            hospitalityAverageRating: hospitalityAverageRating.toFixed(2),
            hygieneAverageRating: hygieneAverageRating.toFixed(2),
            receptionAverageRating: receptionAverageRating.toFixed(2),
            overallAverageRating: overallAverageRating.toFixed(2),
          };

          await setDoc(tripDocRef, {
            imgSrc: await getUrlFromSrc(trip.imgSrc),
            location: trip.location,
            price: trip.price,
            name: trip.name,
            category: trip.category,
            continent: trip.continent,
            travelType: trip.travelType,
            travellers: trip.travellers,
            nearestDate: nearestDate,
            furthestDate: furthestDate,
            date: trip.date,
            averageRatingObject: averageRatingObject,
            reviewsAmount: trip.fullTripInfo.reviews.length,
            id: tripDocRef.id,
          });

          let fullTripInfoRef = doc(
            collection(db, `trips/${tripDocRef.id}/tripDetail`),
            tripDocRef.id
          );
          await setDoc(fullTripInfoRef, {
            name: trip.fullTripInfo.country,
            country: trip.fullTripInfo.country,
            description: trip.fullTripInfo.description,
            destination: trip.fullTripInfo.destination,
            departure: trip.fullTripInfo.departure,
            departureTime: trip.fullTripInfo.departureTime,
            returnTime: trip.fullTripInfo.returnTime,
            dressCode: trip.fullTripInfo.dressCode,
            bigImgSrc: await getUrlFromSrc(trip.fullTripInfo.bigImgSrc),
            smallImgSrc: await getUrlFromSrc(trip.fullTripInfo.smallImgSrc),
            price: trip.fullTripInfo.price,
            included: trip.fullTripInfo.included,
            notIncluded: trip.fullTripInfo.notIncluded,
            tourPlan: trip.fullTripInfo.tourPlan,
            gallery: gallery,
            reviews: trip.fullTripInfo.reviews,
          });
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },

    async getTrips(
      q = query(
        collection(db, "trips"),
        orderBy("averageRatingObject.overallAverageRating", "desc"),
        limit(12)
      )
    ) {
      try {
        const docsArray = [];
        const docsSnap = await getDocs(q);
        docsSnap.forEach((doc) => {
          docsArray.push(doc.data());
        });
        return {
          docsArray: docsArray,
          lastDocSnap: docsSnap.docs[docsSnap.docs.length - 1],
        };
      } catch (e) {
        console.error(e);
      }
    },

    async getTripsPageWithoutFilter() {
      if (!this.canBeLoadedWithDefaultFilter) {
        this.canBeLoadedWithDefaultFilter = await getCountFromServer(
          query(collection(db, "trips"))
        );
      }
      if (this.canBeLoadedWithDefaultFilter.data().count && this.canLoadMore) {
        try {
          if (
            this.worldsTopTripsLoaded &&
            this.pagesLoadedWithDefaultFilter == 0
          ) {
            this.trips = this.topTrips.find(
              (category) => category.place == "World"
            ).cards;
            console.log("here");
            this.pagesLoadedWithDefaultFilter = 1;
            this.page = 1;
            if (this.trips.length < this.tripsPerPage) {
              this.canLoadMore = false;
            }
          } else {
            const { docsArray, lastDocSnap } = await this.getTrips(
              this.defaultFilter
            );
            this.trips.push(...docsArray);
            this.lastDocSnap = lastDocSnap;

            this.page += 1;
            this.pagesLoadedWithDefaultFilter += 1;
          }
          if (
            this.canBeLoadedWithDefaultFilter.data().count -
              this.trips.length ==
            0
          ) {
            this.canLoadMore = false;
          }
        } catch (e) {
          this.canLoadMore = false;
          throw new Error(e);
        }
      }
    },

    async getTripsPageWithFilter(q) {
      if (q) {
        if (this.canBeLoadedWithFilter.data().count && this.canLoadMore) {
          try {
            if (this.filterParams.dateValue != null) {
              const twelveHours = 43200000;
              let { docsArray, lastDocSnap } = await this.getTrips(q);
              this.lastDocSnap = lastDocSnap;

              this.page += 1;
              const tripsOnPage = this.tripsPerPage * this.page;

              if (Array.isArray(this.filterDate)) {
                for (let trip of docsArray) {
                  if (Array.isArray(trip.date)) {
                    if (
                      trip.date.some(
                        (date) =>
                          date.seconds * 1000 >= this.filterDate[0] &&
                          date.seconds * 1000 <= this.filterDate[1]
                      )
                    ) {
                      this.trips.push(trip);
                      console.log(trip);
                    }
                  } else {
                    if (
                      trip.date.seconds * 1000 >= this.filterDate[0] &&
                      trip.date.seconds * 1000 <= this.filterDate[1]
                    ) {
                      this.trips.push(trip);
                      console.log(trip);
                    }
                  }
                }
              } else {
                for (let trip of docsArray) {
                  if (Array.isArray(trip.date)) {
                    if (
                      trip.date.some(
                        (date) =>
                          this.filterDate >=
                            date.seconds * 1000 - twelveHours &&
                          this.filterDate <= date.seconds * 1000 + twelveHours
                      )
                    ) {
                      this.trips.push(trip);
                      console.log(trip);
                    }
                  } else {
                    if (
                      this.filterDate >=
                        trip.date.seconds * 1000 - twelveHours &&
                      this.filterDate <= trip.date.seconds * 1000 + twelveHours
                    ) {
                      this.trips.push(trip);
                      console.log(trip);
                    }
                  }
                }
              }
              // замінити this.canBeLoadedWithFilter.data().count на іншу умову яка підходить для дати
              if (this.canBeLoadedWithFilter.data().count - tripsOnPage <= 0) {
                this.canLoadMore = false;
              }

              // if (this.trips.length >= tripsOnPage) {
              //   this.trips = this.trips.slice(0, tripsOnPage);
              //   this.lastDocSnap = this.trips[this.trips.length - 1];
              //   this.page = this.page + 1;
              //   return;
              // }
              this.getTripsPageWithFilter(q);
            } else {
              const { docsArray, lastDocSnap } = await this.getTrips(q);
              this.lastDocSnap = lastDocSnap;

              this.trips.push(...docsArray);
              this.page += 1;

              this.trips.sort(
                (a, b) =>
                  b.averageRatingObject.overallAverageRating -
                  a.averageRatingObject.overallAverageRating
              );
              if (
                this.canBeLoadedWithFilter.data().count - this.trips.length ==
                0
              ) {
                this.canLoadMore = false;
              }
            }
          } catch (e) {
            this.canLoadMore = false;
            throw new Error(e);
          }
        }
      }
    },

    async getDetailsAboutTrip(id) {
      try {
        const tripDetailsRef = doc(db, `trips/${id}/tripDetail`, id);
        const docSnap = await getDoc(tripDetailsRef);
        let tripObject = this.trips.find((trip) => trip.id === id);

        if (!tripObject) {
          let tripObjectSnap = await getDoc(doc(db, `trips`, id));
          this.trips.push(tripObjectSnap.data());
          tripObject = this.trips.find((trip) => trip.id === id);
        }
        tripObject.fullTripInfo = docSnap.data();
      } catch (e) {
        console.error(e);
      }
    },
    //

    // mobile menu
    toggleMobileMenu() {
      if (!this.mobileNavigation) {
        window.scrollTo(0, 0);
      }
      this.mobileNavigation = !this.mobileNavigation;
    },

    closeMobileMenu() {
      this.mobileNavigation = false;
    },
    //
  },
  getters: {
    filterDate(state) {
      let date;
      let conjunction = " to ";
      if (
        state.filterParams.dateValue &&
        state.filterParams.dateValue.includes(conjunction)
      ) {
        date = state.filterParams.dateValue.split(conjunction);
        date = date.map((date) => new Date(date));
      } else if (state.filterParams.dateValue) {
        date = new Date(state.filterParams.dateValue);
      } else {
        return null;
      }
      return date;
    },

    isStoreFiltersEmpty: (state) =>
      Object.values(state.filterParams).every((val) => val === null),

    queryForActiveFilters(state) {
      let q, constraintsArray, filterDateForQuery;
      const { travelCategory, travelType, travellers } = state.filterParams;

      if (Array.isArray(this.filterDate)) {
        filterDateForQuery = this.filterDate[1];
      } else if (this.filterDate) {
        filterDateForQuery = new Date(this.filterDate.getTime() + 86400000);
      }
      {
        filterDateForQuery = null;
      }

      constraintsArray = [
        ["category", "==", travelCategory],
        ["travelType", "==", travelType],
        ["travellers", "==", +travellers],
        ["nearestDate", "<", filterDateForQuery],
      ];
      constraintsArray = constraintsArray.flatMap((constraint) =>
        constraint[2]
          ? [where(constraint[0], constraint[1], constraint[2])]
          : []
      );
      if (state.lastDocSnap) {
        q = query(
          collection(db, "trips"),
          orderBy("nearestDate", "desc"),
          orderBy("averageRatingObject.overallAverageRating", "desc"),
          ...constraintsArray,
          startAfter(state.lastDocSnap),
          limit(state.tripsPerPage)
        );
      } else {
        q = query(
          collection(db, "trips"),
          orderBy("nearestDate", "desc"),
          orderBy("averageRatingObject.overallAverageRating", "desc"),
          ...constraintsArray,
          limit(state.tripsPerPage)
        );
      }
      const qForCount = query(collection(db, "trips"), ...constraintsArray);

      return { q: q, qForCount: qForCount };
    },

    defaultFilter(state) {
      let q;
      if (state.lastDocSnap) {
        q = query(
          collection(db, "trips"),
          orderBy("averageRatingObject.overallAverageRating", "desc"),
          startAfter(state.lastDocSnap),
          limit(state.tripsPerPage)
        );
      } else {
        q = query(
          collection(db, "trips"),
          orderBy("averageRatingObject.overallAverageRating", "desc"),
          limit(state.tripsPerPage)
        );
      }

      return q;
    },
  },
});
