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
} from "firebase/firestore";

let tripsArray = [
  {
    imgSrc: "machu-picchu/machu-picchu-card.jpg",
    location: "Peru",
    fullDdestination: "Peru, Machu Picchu",
    price: "1490",
    name: "Winter Park Ski Holiday",
    category: "Best Winter Destinations",
    continent: "Europe",
    travelType: "Romantic",
    travellers: 2,
    date: new Date("2024-2-28"),
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
      price: 2300,
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
        topImg: "machu-picchu/machu-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "machu-picchu/machu-gallery-2.jpg",
          "machu-picchu/machu-gallery-3.jpg",
          "machu-picchu/machu-gallery-4.jpg",
          "machu-picchu/machu-gallery-5.jpg",
        ],
        bottomImg: "machu-picchu/machu-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Well organized trip, All arranged well by Arooz. Special thanks to Aijaz Bhai for the service and support given to us, all explained well and take us to all places as per our wish. It was a wonderful experience .... Thank you team",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
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
  // {
  //   imgSrc:
  //     "https://firebasestorage.googleapis.com/v0/b/firetrip-b1efe.appspot.com/o/trip-cards%2Ftrip-card-img-1.jpg?alt=media&token=142685c5-f69e-4896-ac14-7028da752c2e",
  //   location: "Iceland",
  //   fullDdestination: "Peru, Reykjavík",
  //   price: "2137",
  //   name: "Northern Lights Circle Tour",
  //   category: "Best Winter Destinations",
  //   continent: "Europe",
  //   travelType: "Romantic",
  //   travellers: 2,
  //   date: new Date("2024-2-28"),
  //   fullTripInfo: {
  //     name: "Northern Lights Circle Tour",
  //     country: "Peru",
  //     description:
  //       "Machu Picchu is situated above a bow of the Urubamba River, which surrounds the site on three sides, where cliffs drop vertically for 450 meters (1,480 ft) to the river at their base. The area is subject to morning mists rising from the river.[49] The location of the city was a military secret, and its deep precipices and steep mountains provided natural defenses.",
  //     destination: "Machu Picchu",
  //     departure: "Lima",
  //     departureTime: "Flexible schedule",
  //     returnTime: "Flexible schedule",
  //     dressCode: "Comfortable outdoor clothing",
  //     bigImgSrc: "big-trip-img-1.jpg",
  //     smallImgSrc: "trip-card-img-1.jpg",
  //     price: 2300,
  //     included: [
  //       "5 Star Accommodation",
  //       "Airport Transfer",
  //       "Breakfast",
  //       "Personal Guide",
  //     ],
  //     notIncluded: ["Gallery Ticket", "Lunch"],
  //     tourPlan: [
  //       {
  //         dayPlanTitle: "Acclimatizing to Cusco's Charm and Culture",
  //         dayPlan:
  //           "Arrive in Cusco and transfer to your hotel. Spend the day acclimatizing to the altitude and exploring the city's charming streets and vibrant markets.",
  //         included: ["Airport transfer", "Hotel accommodation"],
  //       },
  //       {
  //         dayPlanTitle: "Discovering Inca Ruins in the Sacred Valley",
  //         dayPlan:
  //           "Embark on a full-day guided tour of the Sacred Valley, stopping at important Inca ruins and traditional Andean villages along the way.",
  //         included: [
  //           "Full-day guided tour of the Sacred Valley",
  //           "Entrance fees to Inca ruins",
  //           "Lunch",
  //         ],
  //       },
  //       {
  //         dayPlanTitle: "Exploring Machu Picchu with a Guide",
  //         dayPlan:
  //           "Take an early morning train to Aguas Calientes, the town at the base of Machu Picchu. Spend the day exploring the ancient Inca citadel with a knowledgeable guide.",
  //         included: [
  //           "Train tickets to Aguas Calientes",
  //           "Bus tickets to Machu Picchu",
  //           "Guided tour of Machu Picchu",
  //           "Entrance fee to Machu Picchu",
  //         ],
  //       },
  //       {
  //         dayPlanTitle: "Sunrise at Machu Picchu: Optional Second Visit",
  //         dayPlan:
  //           "Optional: wake up early for a second visit to Machu Picchu to watch the sunrise. Return to Cusco by train in the afternoon.",
  //         included: [
  //           "Train tickets from Aguas Calientes to Cusco (or airport)",
  //           "Airport transfer",
  //         ],
  //       },
  //     ],
  //     gallery: {
  //       topImg: "machu-gallery-1.jpg",
  //       restImages: [],
  //       masonryImages: [
  //         "machu-gallery-2.jpg",
  //         "machu-gallery-3.jpg",
  //         "machu-gallery-4.jpg",
  //         "machu-gallery-5.jpg",
  //       ],
  //       bottomImg: "machu-gallery-6.jpg",
  //     },
  //     reviews: [
  //       {
  //         commentText:
  //           "Well organized trip, All arranged well by Arooz. Special thanks to Aijaz Bhai for the service and support given to us, all explained well and take us to all places as per our wish. It was a wonderful experience .... Thank you team",
  //         rating: {
  //           comfort: "4",
  //           hospitality: "5",
  //           hygiene: "4",
  //           reception: "5",
  //         },
  //         userName: "Eduard Hand",
  //         userEmail: null,
  //         date: new Date(),
  //       },
  //       {
  //         commentText:
  //           "This trip was a mesmerizing escapade into the unknown. With each step, I found myself immersed in a tapestry of unfamiliar sights and unfamiliar cultures. It was a journey of self-exploration, where I discovered hidden strengths and embraced new perspectives. The encounters with locals, their stories, and their warmth left an indelible mark on my soul. The trip challenged me to step outside my comfort zone and embrace the unfamiliar, leading to moments of profound personal growth. It's an experience that will forever ignite my wanderlust and inspire me to continue exploring the wonders of our world.",
  //         rating: {
  //           comfort: "4",
  //           hospitality: "5",
  //           hygiene: "4",
  //           reception: "5",
  //         },
  //         userName: "Brandon Mango",
  //         userEmail: null,
  //         date: new Date(),
  //       },
  //       {
  //         commentText:
  //           "Wow, what an incredible trip! The sights, sounds, and sensations encountered along the way were truly transformative. From the awe-inspiring landscapes to the rich cultural experiences, every moment was a feast for the senses. The journey pushed boundaries, allowing for personal growth and self-discovery. It's a trip that will forever hold a special place in my heart, reminding me of the immense beauty and diversity our world has to offer. I feel grateful for the memories created and the connections forged during this extraordinary adventure.",
  //         rating: {
  //           comfort: "4",
  //           hospitality: "5",
  //           hygiene: "4",
  //           reception: "5",
  //         },
  //         userName: "Maren Westervelt",
  //         userEmail: null,
  //         date: new Date(),
  //       },
  //       {
  //         commentText: null,
  //         rating: {
  //           comfort: "4",
  //           hospitality: "5",
  //           hygiene: "4",
  //           reception: "5",
  //         },
  //         userName: "Alice Smith",
  //         userEmail: null,
  //         date: new Date("2023-05-16T14:30:00.000Z"),
  //       },
  //       {
  //         commentText: null,
  //         rating: {
  //           comfort: "3",
  //           hospitality: "4",
  //           hygiene: "3",
  //           reception: "4",
  //         },
  //         userName: "Ethan Johnson",
  //         userEmail: null,
  //         date: new Date("2023-05-16T14:30:00.000Z"),
  //       },
  //       {
  //         commentText: null,
  //         rating: {
  //           comfort: "5",
  //           hospitality: "5",
  //           hygiene: "4",
  //           reception: "4",
  //         },
  //         userName: "Sophia Davis",
  //         userEmail: null,
  //         date: new Date("2023-05-16T14:30:00.000Z"),
  //       },
  //       {
  //         commentText: null,
  //         rating: {
  //           comfort: "4",
  //           hospitality: "3",
  //           hygiene: "4",
  //           reception: "3",
  //         },
  //         userName: "Oliver Wilson",
  //         userEmail: null,
  //         date: new Date("2023-05-16T14:30:00.000Z"),
  //       },
  //       {
  //         commentText: null,
  //         rating: {
  //           comfort: "5",
  //           hospitality: "4",
  //           hygiene: "5",
  //           reception: "4",
  //         },
  //         userName: "Ava Thompson",
  //         userEmail: null,
  //         date: new Date("2023-05-16T14:30:00.000Z"),
  //       },
  //       {
  //         commentText: null,
  //         rating: {
  //           comfort: "3",
  //           hospitality: "3",
  //           hygiene: "4",
  //           reception: "3",
  //         },
  //         userName: "Noah Anderson",
  //         userEmail: null,
  //         date: new Date("2023-05-16T14:30:00.000Z"),
  //       },
  //       {
  //         commentText: null,
  //         rating: {
  //           comfort: "4",
  //           hospitality: "5",
  //           hygiene: "4",
  //           reception: "5",
  //         },
  //         userName: "Emma Brown",
  //         userEmail: null,
  //         date: new Date("2023-05-16T14:30:00.000Z"),
  //       },
  //       {
  //         commentText: null,
  //         rating: {
  //           comfort: "5",
  //           hospitality: "5",
  //           hygiene: "5",
  //           reception: "4",
  //         },
  //         userName: "Liam Taylor",
  //         userEmail: null,
  //         date: new Date("2023-05-16T14:30:00.000Z"),
  //       },
  //       {
  //         commentText: null,
  //         rating: {
  //           comfort: "5",
  //           hospitality: "5",
  //           hygiene: "5",
  //           reception: "4",
  //         },
  //         userName: "Liam Taylor",
  //         userEmail: null,
  //         date: new Date("2023-05-16T14:30:00.000Z"),
  //       },
  //       {
  //         commentText: null,
  //         rating: {
  //           comfort: "5",
  //           hospitality: "4",
  //           hygiene: "5",
  //           reception: "5",
  //         },
  //         userName: "Lucas Martinez",
  //         userEmail: null,
  //         date: new Date("2023-05-16T14:30:00.000Z"),
  //       },
  //     ],
  //   },
  // },
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
  actions: {
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
          await setDoc(tripDocRef, {
            imgSrc: await getUrlFromSrc(trip.imgSrc),
            location: trip.location,
            price: trip.price,
            name: trip.name,
            category: trip.category,
            continent: trip.continent,
            travelType: trip.travelType,
            travellers: trip.travellers,
            date: trip.date,
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
        const tripDetailsRef = doc(db, `trips/${id}/tripDetail`, id);
        const docSnap = await getDoc(tripDetailsRef);
        let tripObject = this.trips.find((trip) => trip.id === id);
        console.log(tripObject);

        if (!tripObject) {
          let tripObjectSnap = await getDoc(doc(db, `trips`, id));
          this.trips.push(tripObjectSnap.data());
          tripObject = this.trips.find((trip) => trip.id === id);
        }
        tripObject.fullTripInfo = docSnap.data();
        console.log(this.trips);
      } catch (e) {
        console.error(e);
      }
    },
  },
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
});
