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
    imgSrcAvif: "machu-picchu/machu-picchu-card.avif",
    imgSrcWebp: "machu-picchu/machu-picchu-card.webp",
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
      additionalServices: {
        cars: ["Cadillac CTS", "Audi A5 2020", "Mercedes-Benz S-Class"],
        jets: [
          "Embraer Phenom 100",
          "Bombardier Global Express",
          "Falcon 7X",
          "Cessna Citation X",
        ],
        helicopters: ["Airbus H160", "Bell 429", "Leonardo AW109"],
        boats: ["Regal 36 XO", "Back Cove 390"],
      },
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
        topImg: "machu-picchu/gallery/machu-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "machu-picchu/gallery/machu-gallery-2.jpg",
          "machu-picchu/gallery/machu-gallery-3.jpg",
          "machu-picchu/gallery/machu-gallery-4.jpg",
          "machu-picchu/gallery/machu-gallery-5.jpg",
        ],
        bottomImg: "machu-picchu/gallery/machu-gallery-6.jpg",
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
    imgSrcAvif: "winter-park-ski/winter-park-ski-card.avif",
    imgSrcWebp: "winter-park-ski/winter-park-ski-card.webp",
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
      additionalServices: {
        jets: [
          "Embraer Phenom 100",
          "Bombardier Global Express",
          "Falcon 7X",
          "Cessna Citation X",
        ],
        helicopters: ["Airbus H160", "Bell 429", "Leonardo AW109"],
        boats: ["Regal 36 XO", "Back Cove 390"],
      },
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
        topImg: "winter-park-ski/gallery/winter-park-ski-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "winter-park-ski/gallery/winter-park-ski-gallery-2.jpg",
          "winter-park-ski/gallery/winter-park-ski-gallery-3.jpg",
          "winter-park-ski/gallery/winter-park-ski-gallery-4.jpg",
          "winter-park-ski/gallery/winter-park-ski-gallery-5.jpg",
        ],
        bottomImg: "winter-park-ski/gallery/winter-park-ski-gallery-6.jpg",
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
  {
    imgSrcAvif: "hvar/hvar-card.avif",
    imgSrcWebp: "hvar/hvar-card.webp",
    location: "Croatia, Europe",
    fullDestination: "Croatia, Island Hvar",
    price: 2499,
    name: "Island Hvar Getaway",
    category: "Romantic Winter Destinations",
    continent: "Europe",
    travelType: "Romantic",
    travellers: 2,
    date: new Date("2026-06-15"),
    fullTripInfo: {
      additionalServices: {
        boats: ["Catamaran Cruise", "Private Yacht Charter"],
      },
      name: "Island Hvar Getaway",
      country: "Croatia",
      description:
        "Escape to the stunning island of Hvar in Croatia for a romantic and rejuvenating getaway. With its crystal-clear waters, charming villages, and picturesque landscapes, Island Hvar offers an idyllic retreat for couples seeking tranquility and natural beauty. Whether you're strolling along the beach at sunset, indulging in intimate dining experiences, or exploring local culture, this trip promises to create cherished memories.",
      destination: "Island Hvar",
      departure: "Split Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Light and comfortable summer attire",
      bigImgSrc: "hvar/hvar-big-img.jpg",
      price: 2499,
      included: [
        "5 nights romantic accommodation on Island Hvar",
        "Round-trip ferry tickets",
        "Daily breakfast",
        "Private transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival on Island Hvar",
          dayPlan:
            "Arrive at Split Airport and take a scenic ferry ride to Island Hvar. Check into your romantic accommodation and spend the day enjoying intimate moments on the beach or exploring the charming local village.",
          included: [
            "Private transfer",
            "Hotel accommodation",
            "Ferry tickets",
          ],
        },
        {
          dayPlanTitle: "Sunset Beach Stroll",
          dayPlan:
            "As the sun sets, take a romantic stroll along the beach, hand in hand, and marvel at the beautiful colors painting the sky.",
          included: ["Beach access"],
        },
        {
          dayPlanTitle: "Couples' Dining Experience",
          dayPlan:
            "Indulge in a romantic dinner at a seaside restaurant, with candlelit tables and a view of the moonlit sea.",
          included: ["Romantic dining experience"],
        },
        {
          dayPlanTitle: "Private Boat Excursion",
          dayPlan:
            "Embark on a private boat excursion to explore secluded coves and enjoy a picnic for two on a hidden beach.",
          included: ["Private guided boat excursion", "Picnic for two"],
        },
        {
          dayPlanTitle: "Wellness and Relaxation",
          dayPlan:
            "Spend a morning practicing couples' yoga on the beach, followed by a couples' spa treatment for ultimate relaxation.",
          included: ["Couples' yoga session", "Couples' spa treatment"],
        },
        {
          dayPlanTitle: "Final Romantic Moments",
          dayPlan:
            "Savor your last romantic moments on the island with a private breakfast by the sea. Depart from Island Hvar with cherished memories.",
          included: [
            "Romantic breakfast",
            "Hotel accommodation",
            "Ferry tickets",
            "Private transfer",
          ],
        },
      ],
      gallery: {
        topImg: "hvar/gallery/hvar-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "hvar/gallery/hvar-gallery-2.jpg",
          "hvar/gallery/hvar-gallery-3.jpg",
          "hvar/gallery/hvar-gallery-4.jpg",
          "hvar/gallery/hvar-gallery-5.jpg",
        ],
        bottomImg: "hvar/gallery/hvar-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Our Island Hvar getaway was a truly magical experience. The island's beauty combined with the romantic activities made our trip unforgettable. From watching sunsets on the beach to our private boat excursion, every moment was perfect. The couples' spa treatment was the icing on the cake. Highly recommended for a romantic escape!",
          rating: {
            comfort: "5",
            hospitality: "2",
            hygiene: "5",
            reception: "4",
          },
          userName: "Emily Johnson",
          userEmail: "emily@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Island Hvar exceeded our expectations. The secluded coves we discovered during our private boat excursion were like a dream. The couples' yoga and spa treatment left us feeling rejuvenated. The attention to detail and the romantic dining experiences were wonderful. We'll treasure these memories forever.",
          rating: {
            comfort: "4",
            hospitality: "3",
            hygiene: "5",
            reception: "4",
          },
          userName: "Jacob Thompson",
          userEmail: "jacob@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Our romantic trip to Island Hvar was beautiful and serene. The private boat excursion and beach strolls were highlights. We enjoyed exploring the village and savoring the local cuisine. The couples' yoga and spa treatment added an extra layer of relaxation. A perfect choice for a couple's getaway.",
          rating: {
            comfort: "5",
            hospitality: "2",
            hygiene: "4",
            reception: "1",
          },
          userName: "Emma Wilson",
          userEmail: "emma@example.com",
          date: new Date("2023-07-10"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "wadi-musa/wadi-musa-card.avif",
    imgSrcWebp: "wadi-musa/wadi-musa-card.webp",
    location: "Jordan, Middle East",
    fullDestination: "Jordan, Wadi Musa",
    price: 1599,
    name: "Wadi Musa Expedition",
    category: "Best Summer Destinations",
    continent: "Asia",
    travelType: "Adventure",
    travellers: 4,
    date: new Date("2026-08-20"),
    fullTripInfo: {
      additionalServices: {
        helicopters: ["Airbus H160", "Bell 429", "Leonardo AW109"],
      },
      name: "Wadi Musa Expedition",
      country: "Jordan",
      description:
        "Embark on an adventurous expedition to Wadi Musa, Jordan, and explore the awe-inspiring ancient city of Petra. With its magnificent rock-cut architecture and rich history, Petra offers a journey back in time. Discover hidden tombs, intricate carvings, and breathtaking desert landscapes as you unravel the mysteries of this UNESCO World Heritage Site.",
      destination: "Wadi Musa",
      departure: "Queen Alia International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Comfortable outdoor attire",
      bigImgSrc: "wadi-musa/wadi-musa-big-img.jpg",
      price: 1599,
      included: [
        "6 nights accommodation in Wadi Musa",
        "Guided tour of Petra",
        "Local transportation",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Wadi Musa",
          dayPlan:
            "Arrive at Queen Alia International Airport and transfer to Wadi Musa. Check into your accommodation and spend the day getting acquainted with the local surroundings.",
          included: ["Airport transfer", "Hotel accommodation"],
        },
        {
          dayPlanTitle: "Exploration of Petra",
          dayPlan:
            "Embark on a guided tour of Petra, wandering through the Siq and discovering iconic sites such as the Treasury, the Monastery, and the Royal Tombs.",
          included: ["Guided Petra tour", "Entrance fees"],
        },
        {
          dayPlanTitle: "Little Petra Excursion",
          dayPlan:
            "Venture to Little Petra, a lesser-known archaeological site, and explore its fascinating rock-carved structures and ancient history.",
          included: ["Guided Little Petra tour"],
        },
        {
          dayPlanTitle: "Desert Adventure",
          dayPlan:
            "Embark on a desert safari to experience the stunning landscapes of Wadi Rum. Discover rock formations, sand dunes, and enjoy a traditional Bedouin-style lunch.",
          included: ["Desert safari", "Lunch"],
        },
        {
          dayPlanTitle: "Cultural Immersion",
          dayPlan:
            "Engage in a local cooking class to learn about traditional Jordanian cuisine. Explore Wadi Musa's markets and interact with the friendly locals.",
          included: ["Cooking class", "Market tour"],
        },
        {
          dayPlanTitle: "Final Day in Wadi Musa",
          dayPlan:
            "Spend your final day exploring Wadi Musa at your leisure. Reflect on your expedition and depart from Queen Alia International Airport.",
          included: ["Hotel accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "wadi-musa/gallery/wadi-musa-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "wadi-musa/gallery/wadi-musa-gallery-2.jpg",
          "wadi-musa/gallery/wadi-musa-gallery-3.jpg",
          "wadi-musa/gallery/wadi-musa-gallery-4.jpg",
          "wadi-musa/gallery/wadi-musa-gallery-5.jpg",
        ],
        bottomImg: "wadi-musa/gallery/wadi-musa-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Our Wadi Musa expedition was an incredible adventure. Exploring Petra's ancient ruins was a dream come true. The local tour guide shared fascinating stories, and the desert safari in Wadi Rum was unforgettable. We appreciated the cultural experiences and the warm hospitality of the people. A truly enriching journey!",
          rating: {
            comfort: "2",
            hospitality: "4",
            hygiene: "4",
            reception: "5",
          },
          userName: "Sarah Miller",
          userEmail: "sarah@example.com",
          date: new Date(),
        },
        {
          commentText:
            "The history and beauty of Petra left us in awe. The guided tour was informative, and we were able to immerse ourselves in the ancient atmosphere. The desert safari added a unique touch to the trip, and the cooking class provided insights into local culture. An unforgettable experience!",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "5",
          },
          userName: "John Smith",
          userEmail: "john@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Wadi Musa and its ancient wonders amazed us. The Petra tour was well-organized and educational. We loved the adventure of the desert safari, and the cooking class was a delightful cultural exchange. A well-rounded trip for history and adventure enthusiasts.",
          rating: {
            comfort: "2",
            hospitality: "2",
            hygiene: "4",
            reception: "5",
          },
          userName: "Maria Martinez",
          userEmail: "maria@example.com",
          date: new Date("2023-07-25"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "san-francisco/san-francisco-card.avif",
    imgSrcWebp: "san-francisco/san-francisco-card.webp",
    location: "California, USA",
    fullDestination: "California, USA, San Francisco",
    price: 1799,
    name: "San Francisco Discovery",
    category: "Best Summer Destinations",
    continent: "North America",
    travelType: "Adventure",
    travellers: 3,
    date: new Date("2026-07-10"),
    fullTripInfo: {
      additionalServices: {
        jets: ["Cessna Citation X", "Gulfstream G650"],
        helicopters: ["Airbus H160", "Bell 429"],
        boats: ["San Francisco Bay Cruise", "Alcatraz Island Tour"],
        cars: ["Luxury Car Rental", "SUV Rental"],
      },
      name: "San Francisco Discovery",
      country: "United States",
      description:
        "Embark on a captivating adventure to San Francisco, California, where you'll experience the iconic Golden Gate Bridge, vibrant neighborhoods, and a mix of history and culture. Explore the city's famous attractions, savor its diverse cuisine, and immerse yourself in the unique ambiance that makes San Francisco a must-visit destination.",
      destination: "San Francisco",
      departure: "San Francisco International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Casual and comfortable attire",
      bigImgSrc: "san-francisco/san-francisco-big-img.jpg",
      price: 1799,
      included: [
        "5 nights accommodation in San Francisco",
        "City sightseeing tour",
        "Public transportation passes",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in San Francisco",
          dayPlan:
            "Arrive at San Francisco International Airport and transfer to your accommodation. Take your time to settle in and prepare for your city adventure.",
          included: ["Airport transfer", "Hotel accommodation"],
        },
        {
          dayPlanTitle: "City Exploration",
          dayPlan:
            "Embark on a city sightseeing tour, visiting popular spots like Fisherman's Wharf, Alamo Square, and the Golden Gate Park.",
          included: ["Guided city tour", "Public transportation passes"],
        },
        {
          dayPlanTitle: "Alcatraz Island",
          dayPlan:
            "Experience a visit to Alcatraz Island, known for its historic prison. Learn about the island's intriguing past and enjoy stunning views of the city.",
          included: ["Alcatraz Island tour"],
        },
        {
          dayPlanTitle: "Neighborhood Discovery",
          dayPlan:
            "Explore the city's diverse neighborhoods, from Chinatown to the Mission District. Savor local cuisine and immerse yourself in the culture.",
          included: ["Guided neighborhood tour"],
        },
        {
          dayPlanTitle: "Golden Gate Bridge",
          dayPlan:
            "Walk or bike across the iconic Golden Gate Bridge and capture breathtaking views of the San Francisco Bay and skyline.",
          included: ["Golden Gate Bridge access"],
        },
        {
          dayPlanTitle: "Final Day in San Francisco",
          dayPlan:
            "Spend your final day at your leisure, revisiting your favorite spots or discovering new ones. Depart from San Francisco International Airport with unforgettable memories.",
          included: ["Hotel accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "san-francisco/gallery/san-francisco-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "san-francisco/gallery/san-francisco-gallery-2.jpg",
          "san-francisco/gallery/san-francisco-gallery-3.jpg",
          "san-francisco/gallery/san-francisco-gallery-4.jpg",
          "san-francisco/gallery/san-francisco-gallery-5.jpg",
        ],
        bottomImg: "san-francisco/gallery/san-francisco-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Our San Francisco Discovery was beyond amazing. Exploring the city's neighborhoods and enjoying the local cuisine was a highlight. The guided city tour and visit to Alcatraz Island were informative and unforgettable. Highly recommended for adventure seekers!",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "5",
            reception: "4",
          },
          userName: "Alex Walker",
          userEmail: "alex@example.com",
          date: new Date(),
        },
        {
          commentText:
            "San Francisco's charm and diversity captured our hearts. The city's landmarks, like the Golden Gate Bridge, were even more breathtaking in person. The Alcatraz Island tour was a unique experience, and the neighborhood discovery allowed us to connect with the city's culture.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Emily Turner",
          userEmail: "emily@example.com",
          date: new Date(),
        },
        {
          commentText:
            "San Francisco exceeded our expectations. The guided tour was well-paced, and the Alcatraz visit provided historical insights. We enjoyed the flexibility of the trip and had a memorable time exploring the city's iconic spots.",
          rating: {
            comfort: "4",
            hospitality: "4",
            hygiene: "4",
            reception: "5",
          },
          userName: "David Anderson",
          userEmail: "david@example.com",
          date: new Date("2023-06-15"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "oslo/oslo-card.avif",
    imgSrcWebp: "oslo/oslo-card.webp",
    location: "Oslo, Norway",
    fullDestination: "Oslo, Norway",
    price: 2299,
    name: "Discover Oslo",
    category: "Best Winter Destinations",
    continent: "Europe",
    travelType: "Romantic",
    travellers: 2,
    date: new Date("2025-06-15"),
    fullTripInfo: {
      additionalServices: {
        jets: ["Cessna Citation X", "Gulfstream G650"],
        helicopters: ["Airbus H160", "Bell 429"],
        boats: ["Oslo Fjord Cruise", "Private Yacht Charter"],
        cars: ["Luxury Car Rental", "Convertible Car Rental"],
      },
      name: "Discover Oslo",
      country: "Norway",
      description:
        "Embark on a romantic journey to Oslo, the capital of Norway, where you'll experience a blend of modernity and natural beauty. Explore the city's stunning architecture, relax by the Oslo Fjord, and indulge in the local cuisine. Whether you're strolling through charming neighborhoods or visiting cultural attractions, Oslo promises an unforgettable escape for couples.",
      destination: "Oslo",
      departure: "Oslo Gardermoen Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Smart casual attire",
      bigImgSrc: "oslo/oslo-big-img.jpg",
      price: 2299,
      included: [
        "4 nights accommodation in a romantic hotel",
        "City sightseeing tour",
        "Cruise on the Oslo Fjord",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Oslo",
          dayPlan:
            "Arrive at Oslo Gardermoen Airport and transfer to your romantic hotel. Begin your journey with a leisurely walk and enjoy the city's atmosphere.",
          included: ["Airport transfer", "Hotel accommodation"],
        },
        {
          dayPlanTitle: "City Exploration",
          dayPlan:
            "Embark on a city sightseeing tour, visiting landmarks like the Royal Palace, Akershus Fortress, and the Opera House.",
          included: ["Guided city tour"],
        },
        {
          dayPlanTitle: "Vigeland Park",
          dayPlan:
            "Visit Vigeland Park, home to an impressive collection of sculptures by Gustav Vigeland. Take a romantic stroll through the park's beautiful landscapes.",
          included: ["Vigeland Park entrance"],
        },
        {
          dayPlanTitle: "Oslo Fjord Cruise",
          dayPlan:
            "Enjoy a relaxing cruise on the Oslo Fjord, taking in the stunning coastal views and iconic landmarks.",
          included: ["Oslo Fjord cruise"],
        },
        {
          dayPlanTitle: "Cultural Exploration",
          dayPlan:
            "Explore the city's cultural attractions, including the Munch Museum and the National Gallery, where you can admire famous artworks.",
          included: ["Museum entrances"],
        },
        {
          dayPlanTitle: "Romantic Dinner",
          dayPlan:
            "Indulge in a romantic dinner at a local restaurant, savoring Norwegian delicacies and creating memorable moments.",
          included: ["Romantic dinner reservation"],
        },
        {
          dayPlanTitle: "Final Day in Oslo",
          dayPlan:
            "Spend your final day leisurely, shopping for souvenirs or taking a stroll by the fjord. Depart from Oslo Gardermoen Airport with cherished memories.",
          included: ["Hotel accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "oslo/gallery/oslo-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "oslo/gallery/oslo-gallery-2.jpg",
          "oslo/gallery/oslo-gallery-3.jpg",
          "oslo/gallery/oslo-gallery-4.jpg",
          "oslo/gallery/oslo-gallery-5.jpg",
        ],
        bottomImg: "oslo/gallery/oslo-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Our romantic getaway to Oslo was a dream come true. The city's charm, combined with the Oslo Fjord cruise and cultural experiences, made it truly special. The romantic dinner was a highlight, and we're grateful for the memories we created.",
          rating: {
            comfort: "5",
            hospitality: "5",
            hygiene: "5",
            reception: "5",
          },
          userName: "Sophia Adams",
          userEmail: "sophia@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Discovering Oslo with my partner was an unforgettable experience. The city's blend of nature and culture was captivating. The Oslo Fjord cruise and romantic dinner added a touch of magic to our trip.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "4",
          },
          userName: "Liam Walker",
          userEmail: "liam@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Our trip to Oslo exceeded our expectations. The guided tour provided insights into the city's history, and the Vigeland Park was a romantic haven. We highly recommend Oslo for couples seeking a memorable escape.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "5",
          },
          userName: "Emma Robinson",
          userEmail: "emma@example.com",
          date: new Date("2023-07-20"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "madrid/madrid-card.avif",
    imgSrcWebp: "madrid/madrid-card.webp",
    location: "Madrid, Spain",
    fullDestination: "Madrid, Spain",
    price: 1799,
    name: "Explore Madrid",
    category: "Best Summer Destinations",
    continent: "Europe",
    travelType: "Adventure",
    travellers: 1,
    date: new Date("2026-07-10"),
    fullTripInfo: {
      additionalServices: {
        jets: ["Cessna Citation X", "Embraer Phenom 100"],
        helicopters: ["Airbus H160", "Bell 429"],
        boats: ["Madrid Rio Boat Tour", "Private Yacht Charter"],
        cars: ["Luxury Car Rental", "Convertible Car Rental"],
      },
      name: "Explore Madrid",
      country: "Spain",
      description:
        "Embark on an adventurous journey to Madrid, Spain's vibrant capital. Immerse yourself in the city's rich history, art, and culture as you explore its iconic landmarks and hidden gems. From the Royal Palace to lively markets and tapas bars, Madrid offers an exciting adventure for solo travelers.",
      destination: "Madrid",
      departure: "Adolfo Suárez Madrid–Barajas Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Casual and comfortable attire",
      bigImgSrc: "madrid/madrid-big-img.jpg",
      price: 1799,
      included: [
        "5 nights accommodation in a central hotel",
        "Guided city exploration",
        "Tapas tasting experience",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Madrid",
          dayPlan:
            "Arrive at Adolfo Suárez Madrid–Barajas Airport and transfer to your central hotel. Start your adventure with a walk around the bustling streets of Madrid.",
          included: ["Airport transfer", "Hotel accommodation"],
        },
        {
          dayPlanTitle: "City Exploration",
          dayPlan:
            "Embark on a guided city exploration, visiting landmarks such as the Royal Palace, Puerta del Sol, and Plaza Mayor.",
          included: ["Guided city tour"],
        },
        {
          dayPlanTitle: "Art and Culture",
          dayPlan:
            "Explore the city's art and culture scene, visiting renowned museums like the Prado Museum and Reina Sofia Museum.",
          included: ["Museum entrances"],
        },
        {
          dayPlanTitle: "Madrid Markets",
          dayPlan:
            "Experience the vibrant atmosphere of Madrid's markets, such as Mercado de San Miguel and Mercado de la Cebada.",
          included: ["Market visits"],
        },
        {
          dayPlanTitle: "Tapas Tasting",
          dayPlan:
            "Indulge in a tapas tasting experience, savoring a variety of Spanish flavors and enjoying the local culinary scene.",
          included: ["Tapas tasting"],
        },
        {
          dayPlanTitle: "Retiro Park",
          dayPlan:
            "Relax in Retiro Park, one of Madrid's most famous parks, where you can enjoy a leisurely stroll and boat ride.",
          included: ["Retiro Park visit"],
        },
        {
          dayPlanTitle: "Final Day in Madrid",
          dayPlan:
            "Spend your final day exploring more of Madrid's attractions or shopping for souvenirs. Depart from Adolfo Suárez Madrid–Barajas Airport with cherished memories.",
          included: ["Hotel accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "madrid/gallery/madrid-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "madrid/gallery/madrid-gallery-2.jpg",
          "madrid/gallery/madrid-gallery-3.jpg",
          "madrid/gallery/madrid-gallery-4.jpg",
          "madrid/gallery/madrid-gallery-5.jpg",
        ],
        bottomImg: "madrid/gallery/madrid-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "My solo adventure in Madrid was incredible. The city's energy, art, and food scene kept me engaged. The tapas tasting and market visits were highlights. I highly recommend this trip to fellow solo travelers.",
          rating: {
            comfort: "4",
            hospitality: "4",
            hygiene: "4",
            reception: "5",
          },
          userName: "Nathan Carter",
          userEmail: "nathan@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Exploring Madrid was a thrilling experience. The guided city tour provided insights into the city's history, and the tapas tasting was a gastronomic delight. I had an adventurous and memorable time.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Isabella Martinez",
          userEmail: "isabella@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Madrid's mix of cultural attractions and vibrant streets made this trip unforgettable. The tapas tasting was a highlight, and the Retiro Park was a peaceful oasis. I recommend this adventure to anyone looking to explore a dynamic city.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "4",
          },
          userName: "Luis Ramirez",
          userEmail: "luis@example.com",
          date: new Date("2023-08-05"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "cambridge/cambridge-card.avif",
    imgSrcWebp: "cambridge/cambridge-card.webp",
    location: "Cambridge, United Kingdom",
    fullDestination: "Cambridge, United Kingdom",
    price: 1599,
    name: "Discover Cambridge",
    category: "Best Summer Destinations",
    continent: "Europe",
    travelType: "Adventure",
    travellers: 1,
    date: new Date("2026-08-20"),
    fullTripInfo: {
      additionalServices: {
        jets: ["Cessna Citation X", "Embraer Phenom 100"],
        helicopters: ["Airbus H160", "Bell 429"],
        cars: ["Luxury Car Rental", "Classic Car Tour"],
      },
      name: "Discover Cambridge",
      country: "United Kingdom",
      description:
        "Embark on an adventure to the historic city of Cambridge, known for its prestigious university and charming landscapes. Explore the iconic colleges, punt along the River Cam, and immerse yourself in the academic and cultural atmosphere. Whether you're fascinated by history or seeking new experiences, Cambridge has something for everyone.",
      destination: "Cambridge",
      departure: "London Heathrow Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Smart casual attire",
      bigImgSrc: "cambridge/cambridge-big-img.jpg",
      price: 1599,
      included: [
        "3 nights accommodation in a historic hotel",
        "Guided college tour",
        "Punting experience",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Cambridge",
          dayPlan:
            "Arrive at London Heathrow Airport and transfer to your historic hotel in Cambridge. Begin your adventure with a stroll around the picturesque streets.",
          included: ["Airport transfer", "Hotel accommodation"],
        },
        {
          dayPlanTitle: "College Exploration",
          dayPlan:
            "Embark on a guided tour of the iconic Cambridge University colleges, discovering their history and architectural marvels.",
          included: ["Guided college tour"],
        },
        {
          dayPlanTitle: "Punting Experience",
          dayPlan:
            "Enjoy a punting experience on the River Cam, admiring the stunning views of the colleges and bridges.",
          included: ["Punting experience"],
        },
        {
          dayPlanTitle: "Academic Atmosphere",
          dayPlan:
            "Immerse yourself in the academic atmosphere by visiting the University Library and exploring its treasures.",
          included: ["Library visit"],
        },
        {
          dayPlanTitle: "Botanic Garden",
          dayPlan:
            "Visit the University Botanic Garden, a peaceful oasis with a diverse collection of plants and landscapes.",
          included: ["Botanic Garden entrance"],
        },
        {
          dayPlanTitle: "Local Cuisine",
          dayPlan:
            "Indulge in local cuisine at a traditional Cambridge restaurant, savoring the flavors of the region.",
          included: ["Dinner reservation"],
        },
        {
          dayPlanTitle: "Final Day in Cambridge",
          dayPlan:
            "Spend your final day exploring more of Cambridge's landmarks or shopping for souvenirs. Depart from London Heathrow Airport with cherished memories.",
          included: ["Hotel accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "cambridge/gallery/cambridge-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "cambridge/gallery/cambridge-gallery-2.jpg",
          "cambridge/gallery/cambridge-gallery-3.jpg",
          "cambridge/gallery/cambridge-gallery-4.jpg",
          "cambridge/gallery/cambridge-gallery-5.jpg",
        ],
        bottomImg: "cambridge/gallery/cambridge-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "My solo adventure to Cambridge was a delightful experience. The guided college tour and punting were truly special. The city's historic charm and academic atmosphere were captivating.",
          rating: {
            comfort: "4",
            hospitality: "4",
            hygiene: "5",
            reception: "5",
          },
          userName: "Grace Turner",
          userEmail: "grace@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Exploring Cambridge's renowned colleges and punting along the River Cam were highlights of my trip. The guided tours provided fascinating insights into the city's history and culture.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Michael Thompson",
          userEmail: "michael@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Cambridge's mix of academic heritage and natural beauty made this adventure memorable. The punting experience offered breathtaking views, and the botanical garden was a serene escape.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "4",
          },
          userName: "Sophie Walker",
          userEmail: "sophie@example.com",
          date: new Date("2023-08-15"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "sudurland/sudurland-card.avif",
    imgSrcWebp: "sudurland/sudurland-card.webp",
    location: "Suðurland, Iceland",
    fullDestination: "Suðurland, Iceland",
    price: 2399,
    name: "Explore Suðurland",
    category: "Best Winter Destinations",
    continent: "Europe",
    travelType: "Adventure",
    travellers: 1,
    date: new Date("2026-07-15"),
    fullTripInfo: {
      additionalServices: {
        cars: ["4x4 Off-Road Adventure", "Luxury SUV Rental"],
      },
      name: "Explore Suðurland",
      country: "Iceland",
      description:
        "Embark on an adventurous journey to Suðurland, Iceland's picturesque region known for its stunning landscapes, glaciers, waterfalls, and geothermal wonders. Discover the famous Golden Circle, explore hidden gems, and immerse yourself in the natural beauty and unique culture of Iceland.",
      destination: "Suðurland",
      departure: "Keflavik International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Layered clothing for varying weather",
      bigImgSrc: "sudurland/sudurland-big-img.jpg",
      price: 2399,
      included: [
        "5 nights accommodation in a cozy cabin",
        "Golden Circle guided tour",
        "Glacier hike adventure",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Suðurland",
          dayPlan:
            "Arrive at Keflavik International Airport and transfer to your cozy cabin in Suðurland. Take in the breathtaking surroundings and get ready for your adventure.",
          included: ["Airport transfer", "Cabin accommodation"],
        },
        {
          dayPlanTitle: "Golden Circle Tour",
          dayPlan:
            "Embark on a guided tour of the Golden Circle, visiting iconic sites such as Þingvellir National Park, Geysir Geothermal Area, and Gullfoss Waterfall.",
          included: ["Guided Golden Circle tour"],
        },
        {
          dayPlanTitle: "Glacier Hike Adventure",
          dayPlan:
            "Experience the thrill of a glacier hike adventure on Sólheimajökull Glacier. Explore the ice formations and enjoy panoramic views.",
          included: ["Glacier hike adventure"],
        },
        {
          dayPlanTitle: "Secret Lagoon Relaxation",
          dayPlan:
            "Unwind in the geothermal waters of the Secret Lagoon, a natural hot spring surrounded by stunning landscapes.",
          included: ["Secret Lagoon visit"],
        },
        {
          dayPlanTitle: "Skógafoss and Seljalandsfoss",
          dayPlan:
            "Visit the stunning Skógafoss and Seljalandsfoss waterfalls, each offering unique views and experiences.",
          included: ["Waterfall visits"],
        },
        {
          dayPlanTitle: "Local Cuisine",
          dayPlan:
            "Indulge in Icelandic cuisine at a traditional restaurant, savoring the flavors of the region.",
          included: ["Dinner reservation"],
        },
        {
          dayPlanTitle: "Final Day in Suðurland",
          dayPlan:
            "Spend your final day exploring more of Suðurland's natural wonders or relaxing at your cabin. Depart from Keflavik International Airport with unforgettable memories.",
          included: ["Cabin accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "sudurland/gallery/sudurland-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "sudurland/gallery/sudurland-gallery-2.jpg",
          "sudurland/gallery/sudurland-gallery-3.jpg",
          "sudurland/gallery/sudurland-gallery-4.jpg",
          "sudurland/gallery/sudurland-gallery-5.jpg",
        ],
        bottomImg: "sudurland/gallery/sudurland-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "My adventure in Suðurland was a dream come true. The guided Golden Circle tour showcased Iceland's natural beauty, and the glacier hike was a thrilling experience. The cozy cabin provided a perfect retreat each evening.",
          rating: {
            comfort: "4",
            hospitality: "4",
            hygiene: "5",
            reception: "5",
          },
          userName: "Alexandra Carter",
          userEmail: "alexandra@example.com",
          date: new Date(),
        },
        {
          commentText:
            "I was captivated by the rugged landscapes of Suðurland. The glacier hike and geothermal relaxation were highlights. The guided tour and local cuisine introduced me to the culture and flavors of Iceland.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "David Evans",
          userEmail: "david@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Suðurland's natural wonders left me in awe. The waterfall visits and Secret Lagoon were enchanting experiences. The cabin accommodation provided a cozy retreat after each day's adventures.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "4",
          },
          userName: "Emily Walker",
          userEmail: "emily@example.com",
          date: new Date("2023-07-10"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "aruba/aruba-card.avif",
    imgSrcWebp: "aruba/aruba-card.webp",
    location: "Aruba, Caribbean",
    fullDestination: "Aruba, Caribbean",
    price: 2999,
    name: "Escape to Aruba",
    category: "Best Summer Destinations",
    continent: "North America",
    travelType: "Romantic",
    travellers: 2,
    date: new Date("2026-06-10"),
    fullTripInfo: {
      additionalServices: {
        jets: ["Cessna Citation X", "Embraer Phenom 100"],
        helicopters: ["Bell 429", "Airbus H160"],
        cars: ["Convertible Car Rental", "Luxury SUV Rental"],
        boats: ["Luxury Yacht Charter", "Catamaran Cruise"],
      },
      name: "Escape to Aruba",
      country: "Aruba",
      description:
        "Experience the ultimate romantic getaway on the stunning Caribbean island of Aruba. With its pristine beaches, turquoise waters, and vibrant culture, Aruba offers a perfect setting for couples seeking relaxation and adventure. Indulge in beachfront luxury, explore underwater wonders, and create unforgettable memories together.",
      destination: "Aruba",
      departure: "Queen Beatrix International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Casual beachwear and elegant attire",
      bigImgSrc: "aruba/aruba-big-img.jpg",
      price: 2999,
      included: [
        "7 nights beachfront accommodation",
        "Private snorkeling tour",
        "Romantic dinner on the beach",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Additional activities"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Aruba",
          dayPlan:
            "Arrive at Queen Beatrix International Airport and transfer to your luxurious beachfront resort. Begin your romantic escape with a leisurely stroll along the pristine beach.",
          included: ["Airport transfer", "Beachfront accommodation"],
        },
        {
          dayPlanTitle: "Beach Relaxation",
          dayPlan:
            "Spend the day unwinding on the white sandy beaches, soaking up the sun, and enjoying the crystal-clear waters of the Caribbean.",
          included: ["Beach access"],
        },
        {
          dayPlanTitle: "Private Snorkeling Tour",
          dayPlan:
            "Embark on a private snorkeling tour to explore Aruba's vibrant underwater world. Discover colorful coral reefs and tropical marine life.",
          included: ["Private snorkeling tour"],
        },
        {
          dayPlanTitle: "Romantic Sunset Cruise",
          dayPlan:
            "Enjoy a romantic sunset catamaran cruise, sipping cocktails and admiring the breathtaking views of the Caribbean sunset.",
          included: ["Sunset cruise"],
        },
        {
          dayPlanTitle: "Island Exploration",
          dayPlan:
            "Rent a convertible car to explore Aruba's scenic landscapes, from rugged coasts to arid deserts.",
          included: ["Convertible car rental"],
        },
        {
          dayPlanTitle: "Dinner Under the Stars",
          dayPlan:
            "Indulge in a private beachside dinner, surrounded by the sound of waves and the soft glow of candlelight.",
          included: ["Romantic beach dinner"],
        },
        {
          dayPlanTitle: "Final Day in Aruba",
          dayPlan:
            "Spend your final day at leisure, whether it's shopping for local treasures or enjoying water activities. Depart from Queen Beatrix International Airport with cherished memories.",
          included: ["Beachfront accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "aruba/gallery/aruba-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "aruba/gallery/aruba-gallery-2.jpg",
          "aruba/gallery/aruba-gallery-3.jpg",
          "aruba/gallery/aruba-gallery-4.jpg",
          "aruba/gallery/aruba-gallery-5.jpg",
        ],
        bottomImg: "aruba/gallery/aruba-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Our romantic escape to Aruba was beyond our expectations. The private snorkeling tour and sunset cruise were highlights. The beachfront accommodation and candlelit dinner created a truly magical experience.",
          rating: {
            comfort: "5",
            hospitality: "5",
            hygiene: "5",
            reception: "4",
          },
          userName: "Jessica Mitchell",
          userEmail: "jessica@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Aruba's stunning beaches and vibrant culture made our vacation unforgettable. The private dinner on the beach was a perfect touch of romance, and the sunset cruise was a dream come true.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "4",
          },
          userName: "William Anderson",
          userEmail: "william@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Aruba's turquoise waters and beachfront luxury were just what we needed for a romantic getaway. The private snorkeling tour revealed a hidden world beneath the waves, and the sunset cruise was a picture-perfect moment.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Olivia Thompson",
          userEmail: "olivia@example.com",
          date: new Date("2023-06-20"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "blausee/blausee-card.avif",
    imgSrcWebp: "blausee/blausee-card.webp",
    location: "Blausee, Switzerland",
    fullDestination: "Blausee, Switzerland",
    price: 1299,
    name: "Discover Blausee",
    category: "Best Summer Destinations",
    continent: "Europe",
    travelType: "Adventure",
    travellers: 1,
    date: new Date("2026-07-15"),
    fullTripInfo: {
      additionalServices: {
        helicopters: ["Airbus H160", "Bell 429"],
        cars: ["Mountain Car Rental", "Electric Car Rental"],
      },
      name: "Discover Blausee",
      country: "Switzerland",
      description:
        "Embark on a serene adventure to Blausee, a hidden gem nestled in the Swiss Alps. This pristine lake is surrounded by lush forests and offers a tranquil escape from the hustle and bustle of everyday life. Immerse yourself in nature, take leisurely walks, and enjoy the crystal-clear waters of Blausee.",
      destination: "Blausee",
      departure: "Zurich International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Comfortable outdoor attire",
      bigImgSrc: "blausee/blausee-big-img.jpg",
      price: 1299,
      included: [
        "3 nights accommodation at Blausee",
        "Guided nature walks",
        "Boat ride on the lake",
        "Airport transfers",
      ],
      notIncluded: ["Meals", "Additional activities"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival at Blausee",
          dayPlan:
            "Arrive at Zurich International Airport and transfer to Blausee. Check in to your cozy accommodation and take in the breathtaking surroundings.",
          included: ["Airport transfer", "Accommodation at Blausee"],
        },
        {
          dayPlanTitle: "Nature Walks",
          dayPlan:
            "Spend your days exploring the enchanting forest trails around Blausee. Guided nature walks will introduce you to the diverse flora and fauna of the region.",
          included: ["Guided nature walks"],
        },
        {
          dayPlanTitle: "Boat Ride on Blausee",
          dayPlan:
            "Enjoy a peaceful boat ride on the crystal-clear waters of Blausee. Admire the underwater life and the reflections of the surrounding landscape.",
          included: ["Boat ride on the lake"],
        },
        {
          dayPlanTitle: "Relaxation and Leisure",
          dayPlan:
            "Take time to relax by the lake, read a book, or simply soak in the natural beauty that surrounds you. Explore the nearby village and savor local Swiss cuisine.",
          included: ["Leisure time"],
        },
        {
          dayPlanTitle: "Final Day at Blausee",
          dayPlan:
            "Enjoy your last moments at Blausee before departing for Zurich International Airport. Take with you the memories of this serene alpine retreat.",
          included: ["Accommodation at Blausee", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "blausee/gallery/blausee-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "blausee/gallery/blausee-gallery-2.jpg",
          "blausee/gallery/blausee-gallery-3.jpg",
          "blausee/gallery/blausee-gallery-4.jpg",
          "blausee/gallery/blausee-gallery-5.jpg",
        ],
        bottomImg: "blausee/gallery/blausee-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "My journey to Blausee was a peaceful escape into nature's beauty. The guided nature walks and boat ride on the lake were serene experiences. The accommodations were cozy and perfectly situated near the lake.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "5",
          },
          userName: "Sophia Miller",
          userEmail: "sophia@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Blausee's tranquility left me rejuvenated. The guided walks allowed me to appreciate the local flora and fauna, and the boat ride on the clear lake was a unique experience. The accommodations were comfortable and the surrounding nature was breathtaking.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Daniel Carter",
          userEmail: "daniel@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Blausee's beauty took my breath away. The boat ride on the lake and guided walks were a perfect way to immerse in nature. The accommodations were cozy and the entire experience was truly serene.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "4",
          },
          userName: "Ava Wilson",
          userEmail: "ava@example.com",
          date: new Date("2023-07-05"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "gullfoss/gullfoss-card.avif",
    imgSrcWebp: "gullfoss/gullfoss-card.webp",
    location: "Gullfoss, Iceland",
    fullDestination: "Gullfoss, Iceland",
    price: 1799,
    name: "Explore Gullfoss",
    category: "Romantic Winter Destinations",
    continent: "Europe",
    travelType: "Adventure",
    travellers: 2,
    date: new Date("2026-08-20"),
    fullTripInfo: {
      additionalServices: {
        helicopters: ["Bell 429", "Airbus H160"],
        cars: ["4x4 Off-Road Vehicle Rental", "Electric Car Rental"],
      },
      name: "Explore Gullfoss",
      country: "Iceland",
      description:
        "Embark on an exhilarating adventure to Gullfoss, one of Iceland's most iconic waterfalls. Witness the awe-inspiring power of nature as the cascading waters create a mesmerizing spectacle. Explore the rugged landscapes, soak in geothermal springs, and experience the magic of the Icelandic wilderness.",
      destination: "Gullfoss",
      departure: "Reykjavik International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Sturdy outdoor clothing and hiking boots",
      bigImgSrc: "gullfoss/gullfoss-big-img.jpg",
      price: 1799,
      included: [
        "3 nights accommodation near Gullfoss",
        "Guided waterfall hike",
        "Geothermal spa experience",
        "Airport transfers",
      ],
      notIncluded: ["Meals", "Additional activities"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Iceland",
          dayPlan:
            "Arrive at Reykjavik International Airport and transfer to your accommodation near Gullfoss. Immerse yourself in Iceland's unique landscapes.",
          included: ["Airport transfer", "Accommodation near Gullfoss"],
        },
        {
          dayPlanTitle: "Waterfall Hike",
          dayPlan:
            "Embark on a guided hike to Gullfoss, witnessing the magnificent waterfall up close and capturing the beauty of the surrounding nature.",
          included: ["Guided waterfall hike"],
        },
        {
          dayPlanTitle: "Geothermal Spa Experience",
          dayPlan:
            "Relax and rejuvenate in a geothermal spa, surrounded by the rugged beauty of Iceland's wilderness.",
          included: ["Geothermal spa experience"],
        },
        {
          dayPlanTitle: "Exploration and Adventure",
          dayPlan:
            "Discover nearby geothermal areas, lava fields, and hot springs. Optional activities include glacier walks and horseback riding.",
          included: ["Exploration time"],
        },
        {
          dayPlanTitle: "Icelandic Cuisine",
          dayPlan:
            "Savor traditional Icelandic dishes at local restaurants, experiencing the flavors of the country's cuisine.",
          included: ["Icelandic cuisine experience"],
        },
        {
          dayPlanTitle: "Final Day in Iceland",
          dayPlan:
            "Spend your final day at leisure, reflecting on your Icelandic adventure. Depart from Reykjavik International Airport with memories of Gullfoss and beyond.",
          included: ["Accommodation near Gullfoss", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "gullfoss/gallery/gullfoss-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "gullfoss/gallery/gullfoss-gallery-2.jpg",
          "gullfoss/gallery/gullfoss-gallery-3.jpg",
          "gullfoss/gallery/gullfoss-gallery-4.jpg",
          "gullfoss/gallery/gullfoss-gallery-5.jpg",
        ],
        bottomImg: "gullfoss/gallery/gullfoss-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Exploring Gullfoss was an unforgettable experience. The guided waterfall hike allowed us to appreciate the power of nature, and the geothermal spa was the perfect way to unwind after a day of adventure.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "5",
            reception: "4",
          },
          userName: "Ethan Harris",
          userEmail: "ethan@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Iceland's beauty was mesmerizing. The guided hike to Gullfoss was an amazing adventure, and the geothermal spa was pure relaxation. The accommodations were comfortable and allowed us to connect with nature.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Emma Wilson",
          userEmail: "emma@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Gullfoss was a breathtaking destination. The waterfall hike was exhilarating, and the geothermal spa was a unique experience. The trip was well-organized, and the landscapes were unlike anything we've seen before.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "4",
          },
          userName: "Liam Johnson",
          userEmail: "liam@example.com",
          date: new Date("2023-08-01"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "hawaii/hawaii-card.avif",
    imgSrcWebp: "hawaii/hawaii-card.webp",
    location: "Hawaii, USA",
    fullDestination: "Hawaii, USA",
    price: 2899,
    name: "Escape to Hawaii",
    category: "Best Summer Destinations",
    continent: "North America",
    travelType: "Adventure",
    travellers: 2,
    date: new Date("2026-09-10"),
    fullTripInfo: {
      additionalServices: {
        helicopters: ["Bell 429", "Airbus H160"],
        cars: ["SUV Rental", "Convertible Rental"],
      },
      name: "Escape to Hawaii",
      country: "United States",
      description:
        "Embark on a tropical adventure to the breathtaking islands of Hawaii. From golden beaches to lush rainforests, Hawaii offers a diverse paradise to explore. Immerse yourself in the local culture, indulge in water sports, and bask in the natural beauty of the Pacific.",
      destination: "Hawaii",
      departure: "Honolulu International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Light and comfortable clothing",
      bigImgSrc: "hawaii/hawaii-big-img.jpg",
      price: 2899,
      included: [
        "6 nights accommodation in Hawaii",
        "Snorkeling and water sports",
        "Cultural excursions",
        "Airport transfers",
      ],
      notIncluded: ["Meals", "Additional activities"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Hawaii",
          dayPlan:
            "Arrive at Honolulu International Airport and transfer to your accommodation. Take in the warm Hawaiian breeze and begin your tropical adventure.",
          included: ["Airport transfer", "Accommodation in Hawaii"],
        },
        {
          dayPlanTitle: "Beach Exploration",
          dayPlan:
            "Spend your days exploring Hawaii's stunning beaches, engaging in water sports, and relaxing under the sun.",
          included: ["Beach time", "Snorkeling and water sports"],
        },
        {
          dayPlanTitle: "Cultural Immersion",
          dayPlan:
            "Experience Hawaiian culture through cultural excursions, luaus, and traditional performances.",
          included: ["Cultural excursions"],
        },
        {
          dayPlanTitle: "Rainforest Adventure",
          dayPlan:
            "Embark on a hike through lush rainforests, discovering hidden waterfalls and stunning vistas.",
          included: ["Rainforest hike"],
        },
        {
          dayPlanTitle: "Local Cuisine",
          dayPlan:
            "Indulge in local Hawaiian cuisine, from fresh seafood to tropical fruits. Experience the flavors of the islands.",
          included: ["Hawaiian cuisine experience"],
        },
        {
          dayPlanTitle: "Farewell to Hawaii",
          dayPlan:
            "Spend your last day savoring the beauty of Hawaii before departing from Honolulu International Airport.",
          included: ["Accommodation in Hawaii", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "hawaii/gallery/hawaii-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "hawaii/gallery/hawaii-gallery-2.jpg",
          "hawaii/gallery/hawaii-gallery-3.jpg",
          "hawaii/gallery/hawaii-gallery-4.jpg",
          "hawaii/gallery/hawaii-gallery-5.jpg",
        ],
        bottomImg: "hawaii/gallery/hawaii-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Our Hawaiian adventure was beyond our expectations. The beaches, water sports, and cultural experiences were unforgettable. Hawaii's beauty is truly unparalleled.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Olivia Smith",
          userEmail: "olivia@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Hawaii stole our hearts. The beach exploration and cultural immersion were highlights of our trip. The local cuisine introduced us to new flavors, and the Hawaiian sunset views were breathtaking.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "5",
            reception: "5",
          },
          userName: "Liam Johnson",
          userEmail: "liam@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Hawaii's beauty is unmatched. The rainforest adventure and beach time allowed us to connect with nature. The local cultural experiences were enlightening, and the trip was organized flawlessly.",
          rating: {
            comfort: "4",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Ava Brown",
          userEmail: "ava@example.com",
          date: new Date("2023-07-15"),
        },
      ],
    },
  },

  // дублі

  {
    imgSrcAvif: "machu-picchu/machu-picchu-card.avif",
    imgSrcWebp: "machu-picchu/machu-picchu-card.webp",
    location: "Peru",
    fullDdestination: "Peru, Machu Picchu",
    price: "1390",
    name: "Machu Picchu",
    category: "Best Winter Destinations",
    continent: "South America",
    travelType: "Adventure",
    travellers: 2,
    date: [new Date("2023-11-18"), new Date("2024-3-12")],
    fullTripInfo: {
      additionalServices: {
        cars: ["Cadillac CTS", "Audi A5 2020", "Mercedes-Benz S-Class"],
        jets: [
          "Embraer Phenom 100",
          "Bombardier Global Express",
          "Falcon 7X",
          "Cessna Citation X",
        ],
        helicopters: ["Airbus H160", "Bell 429", "Leonardo AW109"],
        boats: ["Regal 36 XO", "Back Cove 390"],
      },
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
        topImg: "machu-picchu/gallery/machu-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "machu-picchu/gallery/machu-gallery-2.jpg",
          "machu-picchu/gallery/machu-gallery-3.jpg",
          "machu-picchu/gallery/machu-gallery-4.jpg",
          "machu-picchu/gallery/machu-gallery-5.jpg",
        ],
        bottomImg: "machu-picchu/gallery/machu-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Well organized trip, All arranged well by Arooz. Special thanks to Aijaz Bhai for the service and support given to us, all explained well and take us to all places as per our wish. It was a wonderful experience .... Thank you team",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "5",
            reception: "3",
          },
          userName: "Eduard Hand",
          userEmail: null,
          date: new Date(),
        },
        {
          commentText:
            "This trip was a mesmerizing escapade into the unknown. With each step, I found myself immersed in a tapestry of unfamiliar sights and unfamiliar cultures. It was a journey of self-exploration, where I discovered hidden strengths and embraced new perspectives. The encounters with locals, their stories, and their warmth left an indelible mark on my soul. The trip challenged me to step outside my comfort zone and embrace the unfamiliar, leading to moments of profound personal growth. It's an experience that will forever ignite my wanderlust and inspire me to continue exploring the wonders of our world.",
          rating: {
            comfort: "2",
            hospitality: "5",
            hygiene: "5",
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
            hospitality: "3",
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
            reception: "1",
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
            reception: "2",
          },
          userName: "Ethan Johnson",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "4",
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
            hospitality: "5",
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
            hospitality: "5",
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
            comfort: "5",
            hospitality: "5",
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
            reception: "3",
          },
          userName: "Liam Taylor",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "3",
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
    imgSrcAvif: "winter-park-ski/winter-park-ski-card.avif",
    imgSrcWebp: "winter-park-ski/winter-park-ski-card.webp",
    location: "Colorado, USA",
    fullDestination: "Colorado, USA, Winter Park Ski Resort",
    price: "2999",
    name: "Winter Park Ski Holiday",
    category: "Best Winter Destinations",
    continent: "North America",
    travelType: "Romantic",
    travellers: 2,
    date: [
      new Date("2023-12-11"),
      new Date("2026-01-1"),
      new Date("2024-8-22"),
    ],
    fullTripInfo: {
      additionalServices: {
        jets: [
          "Embraer Phenom 100",
          "Bombardier Global Express",
          "Falcon 7X",
          "Cessna Citation X",
        ],
        helicopters: ["Airbus H160", "Bell 429", "Leonardo AW109"],
        boats: ["Regal 36 XO", "Back Cove 390"],
      },
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
      price: "2999",
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
        topImg: "winter-park-ski/gallery/winter-park-ski-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "winter-park-ski/gallery/winter-park-ski-gallery-2.jpg",
          "winter-park-ski/gallery/winter-park-ski-gallery-3.jpg",
          "winter-park-ski/gallery/winter-park-ski-gallery-4.jpg",
          "winter-park-ski/gallery/winter-park-ski-gallery-5.jpg",
        ],
        bottomImg: "winter-park-ski/gallery/winter-park-ski-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "My Winter Park Ski Holiday was an incredible experience. The ski resort had excellent slopes for all skill levels, and the mountain views were breathtaking. The package included everything I needed, from accommodation to ski equipment rental. I especially enjoyed the après-ski activities and the vibrant atmosphere of the village. Highly recommended for ski enthusiasts!",
          rating: {
            comfort: "5",
            hospitality: "5",
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
            reception: "4",
          },
          userName: "Jacob Thompson",
          userEmail: null,
          date: new Date(),
        },
        {
          commentText: null,
          rating: {
            comfort: "4",
            hospitality: "5",
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
            hospitality: "5",
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
            hygiene: "4",
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
            hospitality: "5",
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
            reception: "5",
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
            reception: "5",
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
            reception: "5",
          },
          userName: "Ella Taylor",
          userEmail: null,
          date: new Date("2023-05-16T14:30:00.000Z"),
        },
        {
          commentText: null,
          rating: {
            comfort: "5",
            hospitality: "3",
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
  {
    imgSrcAvif: "hvar/hvar-card.avif",
    imgSrcWebp: "hvar/hvar-card.webp",
    location: "Croatia, Europe",
    fullDestination: "Croatia, Island Hvar",
    price: 2199,
    name: "Island Hvar Getaway",
    category: "Romantic Winter Destinations",
    continent: "Europe",
    travelType: "Adventure",
    travellers: 2,
    date: new Date("2025-02-11"),
    fullTripInfo: {
      additionalServices: {
        boats: ["Catamaran Cruise", "Private Yacht Charter"],
      },
      name: "Island Hvar Getaway",
      country: "Croatia",
      description:
        "Escape to the stunning island of Hvar in Croatia for a romantic and rejuvenating getaway. With its crystal-clear waters, charming villages, and picturesque landscapes, Island Hvar offers an idyllic retreat for couples seeking tranquility and natural beauty. Whether you're strolling along the beach at sunset, indulging in intimate dining experiences, or exploring local culture, this trip promises to create cherished memories.",
      destination: "Island Hvar",
      departure: "Split Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Light and comfortable summer attire",
      bigImgSrc: "hvar/hvar-big-img.jpg",
      price: 2199,
      included: [
        "5 nights romantic accommodation on Island Hvar",
        "Round-trip ferry tickets",
        "Daily breakfast",
        "Private transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival on Island Hvar",
          dayPlan:
            "Arrive at Split Airport and take a scenic ferry ride to Island Hvar. Check into your romantic accommodation and spend the day enjoying intimate moments on the beach or exploring the charming local village.",
          included: [
            "Private transfer",
            "Hotel accommodation",
            "Ferry tickets",
          ],
        },
        {
          dayPlanTitle: "Sunset Beach Stroll",
          dayPlan:
            "As the sun sets, take a romantic stroll along the beach, hand in hand, and marvel at the beautiful colors painting the sky.",
          included: ["Beach access"],
        },
        {
          dayPlanTitle: "Couples' Dining Experience",
          dayPlan:
            "Indulge in a romantic dinner at a seaside restaurant, with candlelit tables and a view of the moonlit sea.",
          included: ["Romantic dining experience"],
        },
        {
          dayPlanTitle: "Private Boat Excursion",
          dayPlan:
            "Embark on a private boat excursion to explore secluded coves and enjoy a picnic for two on a hidden beach.",
          included: ["Private guided boat excursion", "Picnic for two"],
        },
        {
          dayPlanTitle: "Wellness and Relaxation",
          dayPlan:
            "Spend a morning practicing couples' yoga on the beach, followed by a couples' spa treatment for ultimate relaxation.",
          included: ["Couples' yoga session", "Couples' spa treatment"],
        },
        {
          dayPlanTitle: "Final Romantic Moments",
          dayPlan:
            "Savor your last romantic moments on the island with a private breakfast by the sea. Depart from Island Hvar with cherished memories.",
          included: [
            "Romantic breakfast",
            "Hotel accommodation",
            "Ferry tickets",
            "Private transfer",
          ],
        },
      ],
      gallery: {
        topImg: "hvar/gallery/hvar-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "hvar/gallery/hvar-gallery-2.jpg",
          "hvar/gallery/hvar-gallery-3.jpg",
          "hvar/gallery/hvar-gallery-4.jpg",
          "hvar/gallery/hvar-gallery-5.jpg",
        ],
        bottomImg: "hvar/gallery/hvar-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Our Island Hvar getaway was a truly magical experience. The island's beauty combined with the romantic activities made our trip unforgettable. From watching sunsets on the beach to our private boat excursion, every moment was perfect. The couples' spa treatment was the icing on the cake. Highly recommended for a romantic escape!",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Emily Johnson",
          userEmail: "emily@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Island Hvar exceeded our expectations. The secluded coves we discovered during our private boat excursion were like a dream. The couples' yoga and spa treatment left us feeling rejuvenated. The attention to detail and the romantic dining experiences were wonderful. We'll treasure these memories forever.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "5",
            reception: "4",
          },
          userName: "Jacob Thompson",
          userEmail: "jacob@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Our romantic trip to Island Hvar was beautiful and serene. The private boat excursion and beach strolls were highlights. We enjoyed exploring the village and savoring the local cuisine. The couples' yoga and spa treatment added an extra layer of relaxation. A perfect choice for a couple's getaway.",
          rating: {
            comfort: "5",
            hospitality: "2",
            hygiene: "4",
            reception: "5",
          },
          userName: "Emma Wilson",
          userEmail: "emma@example.com",
          date: new Date("2023-07-10"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "wadi-musa/wadi-musa-card.avif",
    imgSrcWebp: "wadi-musa/wadi-musa-card.webp",
    location: "Jordan, Middle East",
    fullDestination: "Jordan, Wadi Musa",
    price: 1299,
    name: "Wadi Musa Expedition",
    category: "Best Summer Destinations",
    continent: "Asia",
    travelType: "Adventure",
    travellers: 5,
    date: new Date("2025-03-20"),
    fullTripInfo: {
      additionalServices: {
        helicopters: ["Airbus H160", "Bell 429", "Leonardo AW109"],
      },
      name: "Wadi Musa Expedition",
      country: "Jordan",
      description:
        "Embark on an adventurous expedition to Wadi Musa, Jordan, and explore the awe-inspiring ancient city of Petra. With its magnificent rock-cut architecture and rich history, Petra offers a journey back in time. Discover hidden tombs, intricate carvings, and breathtaking desert landscapes as you unravel the mysteries of this UNESCO World Heritage Site.",
      destination: "Wadi Musa",
      departure: "Queen Alia International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Comfortable outdoor attire",
      bigImgSrc: "wadi-musa/wadi-musa-big-img.jpg",
      price: 1299,
      included: [
        "6 nights accommodation in Wadi Musa",
        "Guided tour of Petra",
        "Local transportation",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Wadi Musa",
          dayPlan:
            "Arrive at Queen Alia International Airport and transfer to Wadi Musa. Check into your accommodation and spend the day getting acquainted with the local surroundings.",
          included: ["Airport transfer", "Hotel accommodation"],
        },
        {
          dayPlanTitle: "Exploration of Petra",
          dayPlan:
            "Embark on a guided tour of Petra, wandering through the Siq and discovering iconic sites such as the Treasury, the Monastery, and the Royal Tombs.",
          included: ["Guided Petra tour", "Entrance fees"],
        },
        {
          dayPlanTitle: "Little Petra Excursion",
          dayPlan:
            "Venture to Little Petra, a lesser-known archaeological site, and explore its fascinating rock-carved structures and ancient history.",
          included: ["Guided Little Petra tour"],
        },
        {
          dayPlanTitle: "Desert Adventure",
          dayPlan:
            "Embark on a desert safari to experience the stunning landscapes of Wadi Rum. Discover rock formations, sand dunes, and enjoy a traditional Bedouin-style lunch.",
          included: ["Desert safari", "Lunch"],
        },
        {
          dayPlanTitle: "Cultural Immersion",
          dayPlan:
            "Engage in a local cooking class to learn about traditional Jordanian cuisine. Explore Wadi Musa's markets and interact with the friendly locals.",
          included: ["Cooking class", "Market tour"],
        },
        {
          dayPlanTitle: "Final Day in Wadi Musa",
          dayPlan:
            "Spend your final day exploring Wadi Musa at your leisure. Reflect on your expedition and depart from Queen Alia International Airport.",
          included: ["Hotel accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "wadi-musa/gallery/wadi-musa-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "wadi-musa/gallery/wadi-musa-gallery-2.jpg",
          "wadi-musa/gallery/wadi-musa-gallery-3.jpg",
          "wadi-musa/gallery/wadi-musa-gallery-4.jpg",
          "wadi-musa/gallery/wadi-musa-gallery-5.jpg",
        ],
        bottomImg: "wadi-musa/gallery/wadi-musa-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Our Wadi Musa expedition was an incredible adventure. Exploring Petra's ancient ruins was a dream come true. The local tour guide shared fascinating stories, and the desert safari in Wadi Rum was unforgettable. We appreciated the cultural experiences and the warm hospitality of the people. A truly enriching journey!",
          rating: {
            comfort: "4",
            hospitality: "4",
            hygiene: "4",
            reception: "5",
          },
          userName: "Sarah Miller",
          userEmail: "sarah@example.com",
          date: new Date(),
        },
        {
          commentText:
            "The history and beauty of Petra left us in awe. The guided tour was informative, and we were able to immerse ourselves in the ancient atmosphere. The desert safari added a unique touch to the trip, and the cooking class provided insights into local culture. An unforgettable experience!",
          rating: {
            comfort: "1",
            hospitality: "4",
            hygiene: "5",
            reception: "5",
          },
          userName: "John Smith",
          userEmail: "john@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Wadi Musa and its ancient wonders amazed us. The Petra tour was well-organized and educational. We loved the adventure of the desert safari, and the cooking class was a delightful cultural exchange. A well-rounded trip for history and adventure enthusiasts.",
          rating: {
            comfort: "5",
            hospitality: "5",
            hygiene: "4",
            reception: "5",
          },
          userName: "Maria Martinez",
          userEmail: "maria@example.com",
          date: new Date("2023-07-25"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "san-francisco/san-francisco-card.avif",
    imgSrcWebp: "san-francisco/san-francisco-card.webp",
    location: "California, USA",
    fullDestination: "California, USA, San Francisco",
    price: 1199,
    name: "San Francisco Discovery",
    category: "Romantic Winter Destinations",
    continent: "North America",
    travelType: "Adventure",
    travellers: 2,
    date: new Date("2024-07-10"),
    fullTripInfo: {
      additionalServices: {
        jets: ["Cessna Citation X", "Gulfstream G650"],
        helicopters: ["Airbus H160", "Bell 429"],
        boats: ["San Francisco Bay Cruise", "Alcatraz Island Tour"],
        cars: ["Luxury Car Rental", "SUV Rental"],
      },
      name: "San Francisco Discovery",
      country: "United States",
      description:
        "Embark on a captivating adventure to San Francisco, California, where you'll experience the iconic Golden Gate Bridge, vibrant neighborhoods, and a mix of history and culture. Explore the city's famous attractions, savor its diverse cuisine, and immerse yourself in the unique ambiance that makes San Francisco a must-visit destination.",
      destination: "San Francisco",
      departure: "San Francisco International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Casual and comfortable attire",
      bigImgSrc: "san-francisco/san-francisco-big-img.jpg",
      price: 1199,
      included: [
        "5 nights accommodation in San Francisco",
        "City sightseeing tour",
        "Public transportation passes",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in San Francisco",
          dayPlan:
            "Arrive at San Francisco International Airport and transfer to your accommodation. Take your time to settle in and prepare for your city adventure.",
          included: ["Airport transfer", "Hotel accommodation"],
        },
        {
          dayPlanTitle: "City Exploration",
          dayPlan:
            "Embark on a city sightseeing tour, visiting popular spots like Fisherman's Wharf, Alamo Square, and the Golden Gate Park.",
          included: ["Guided city tour", "Public transportation passes"],
        },
        {
          dayPlanTitle: "Alcatraz Island",
          dayPlan:
            "Experience a visit to Alcatraz Island, known for its historic prison. Learn about the island's intriguing past and enjoy stunning views of the city.",
          included: ["Alcatraz Island tour"],
        },
        {
          dayPlanTitle: "Neighborhood Discovery",
          dayPlan:
            "Explore the city's diverse neighborhoods, from Chinatown to the Mission District. Savor local cuisine and immerse yourself in the culture.",
          included: ["Guided neighborhood tour"],
        },
        {
          dayPlanTitle: "Golden Gate Bridge",
          dayPlan:
            "Walk or bike across the iconic Golden Gate Bridge and capture breathtaking views of the San Francisco Bay and skyline.",
          included: ["Golden Gate Bridge access"],
        },
        {
          dayPlanTitle: "Final Day in San Francisco",
          dayPlan:
            "Spend your final day at your leisure, revisiting your favorite spots or discovering new ones. Depart from San Francisco International Airport with unforgettable memories.",
          included: ["Hotel accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "san-francisco/gallery/san-francisco-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "san-francisco/gallery/san-francisco-gallery-2.jpg",
          "san-francisco/gallery/san-francisco-gallery-3.jpg",
          "san-francisco/gallery/san-francisco-gallery-4.jpg",
          "san-francisco/gallery/san-francisco-gallery-5.jpg",
        ],
        bottomImg: "san-francisco/gallery/san-francisco-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Our San Francisco Discovery was beyond amazing. Exploring the city's neighborhoods and enjoying the local cuisine was a highlight. The guided city tour and visit to Alcatraz Island were informative and unforgettable. Highly recommended for adventure seekers!",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "5",
            reception: "4",
          },
          userName: "Alex Walker",
          userEmail: "alex@example.com",
          date: new Date(),
        },
        {
          commentText:
            "San Francisco's charm and diversity captured our hearts. The city's landmarks, like the Golden Gate Bridge, were even more breathtaking in person. The Alcatraz Island tour was a unique experience, and the neighborhood discovery allowed us to connect with the city's culture.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Emily Turner",
          userEmail: "emily@example.com",
          date: new Date(),
        },
        {
          commentText:
            "San Francisco exceeded our expectations. The guided tour was well-paced, and the Alcatraz visit provided historical insights. We enjoyed the flexibility of the trip and had a memorable time exploring the city's iconic spots.",
          rating: {
            comfort: "4",
            hospitality: "4",
            hygiene: "4",
            reception: "5",
          },
          userName: "David Anderson",
          userEmail: "david@example.com",
          date: new Date("2023-06-15"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "oslo/oslo-card.avif",
    imgSrcWebp: "oslo/oslo-card.webp",
    location: "Oslo, Norway",
    fullDestination: "Oslo, Norway",
    price: "2199",
    name: "Discover Oslo",
    category: "Romantic Winter Destinations",
    continent: "Europe",
    travelType: "Romantic",
    travellers: 2,
    date: new Date("2025-06-15"),
    fullTripInfo: {
      additionalServices: {
        jets: ["Cessna Citation X", "Gulfstream G650"],
        helicopters: ["Airbus H160", "Bell 429"],
        boats: ["Oslo Fjord Cruise", "Private Yacht Charter"],
        cars: ["Luxury Car Rental", "Convertible Car Rental"],
      },
      name: "Discover Oslo",
      country: "Norway",
      description:
        "Embark on a romantic journey to Oslo, the capital of Norway, where you'll experience a blend of modernity and natural beauty. Explore the city's stunning architecture, relax by the Oslo Fjord, and indulge in the local cuisine. Whether you're strolling through charming neighborhoods or visiting cultural attractions, Oslo promises an unforgettable escape for couples.",
      destination: "Oslo",
      departure: "Oslo Gardermoen Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Smart casual attire",
      bigImgSrc: "oslo/oslo-big-img.jpg",
      price: "2199",
      included: [
        "4 nights accommodation in a romantic hotel",
        "City sightseeing tour",
        "Cruise on the Oslo Fjord",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Oslo",
          dayPlan:
            "Arrive at Oslo Gardermoen Airport and transfer to your romantic hotel. Begin your journey with a leisurely walk and enjoy the city's atmosphere.",
          included: ["Airport transfer", "Hotel accommodation"],
        },
        {
          dayPlanTitle: "City Exploration",
          dayPlan:
            "Embark on a city sightseeing tour, visiting landmarks like the Royal Palace, Akershus Fortress, and the Opera House.",
          included: ["Guided city tour"],
        },
        {
          dayPlanTitle: "Vigeland Park",
          dayPlan:
            "Visit Vigeland Park, home to an impressive collection of sculptures by Gustav Vigeland. Take a romantic stroll through the park's beautiful landscapes.",
          included: ["Vigeland Park entrance"],
        },
        {
          dayPlanTitle: "Oslo Fjord Cruise",
          dayPlan:
            "Enjoy a relaxing cruise on the Oslo Fjord, taking in the stunning coastal views and iconic landmarks.",
          included: ["Oslo Fjord cruise"],
        },
        {
          dayPlanTitle: "Cultural Exploration",
          dayPlan:
            "Explore the city's cultural attractions, including the Munch Museum and the National Gallery, where you can admire famous artworks.",
          included: ["Museum entrances"],
        },
        {
          dayPlanTitle: "Romantic Dinner",
          dayPlan:
            "Indulge in a romantic dinner at a local restaurant, savoring Norwegian delicacies and creating memorable moments.",
          included: ["Romantic dinner reservation"],
        },
        {
          dayPlanTitle: "Final Day in Oslo",
          dayPlan:
            "Spend your final day leisurely, shopping for souvenirs or taking a stroll by the fjord. Depart from Oslo Gardermoen Airport with cherished memories.",
          included: ["Hotel accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "oslo/gallery/oslo-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "oslo/gallery/oslo-gallery-2.jpg",
          "oslo/gallery/oslo-gallery-3.jpg",
          "oslo/gallery/oslo-gallery-4.jpg",
          "oslo/gallery/oslo-gallery-5.jpg",
        ],
        bottomImg: "oslo/gallery/oslo-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Our romantic getaway to Oslo was a dream come true. The city's charm, combined with the Oslo Fjord cruise and cultural experiences, made it truly special. The romantic dinner was a highlight, and we're grateful for the memories we created.",
          rating: {
            comfort: "3",
            hospitality: "5",
            hygiene: "5",
            reception: "5",
          },
          userName: "Sophia Adams",
          userEmail: "sophia@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Discovering Oslo with my partner was an unforgettable experience. The city's blend of nature and culture was captivating. The Oslo Fjord cruise and romantic dinner added a touch of magic to our trip.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "3",
          },
          userName: "Liam Walker",
          userEmail: "liam@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Our trip to Oslo exceeded our expectations. The guided tour provided insights into the city's history, and the Vigeland Park was a romantic haven. We highly recommend Oslo for couples seeking a memorable escape.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "3",
            reception: "5",
          },
          userName: "Emma Robinson",
          userEmail: "emma@example.com",
          date: new Date("2023-07-20"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "madrid/madrid-card.avif",
    imgSrcWebp: "madrid/madrid-card.webp",
    location: "Madrid, Spain",
    fullDestination: "Madrid, Spain",
    price: "1199",
    name: "Explore Madrid",
    category: "Best Summer Destinations",
    continent: "Europe",
    travelType: "Adventure",
    travellers: 2,
    date: new Date("2026-07-10"),
    fullTripInfo: {
      additionalServices: {
        jets: ["Cessna Citation X", "Embraer Phenom 100"],
        helicopters: ["Airbus H160", "Bell 429"],
        boats: ["Madrid Rio Boat Tour", "Private Yacht Charter"],
        cars: ["Luxury Car Rental", "Convertible Car Rental"],
      },
      name: "Explore Madrid",
      country: "Spain",
      description:
        "Embark on an adventurous journey to Madrid, Spain's vibrant capital. Immerse yourself in the city's rich history, art, and culture as you explore its iconic landmarks and hidden gems. From the Royal Palace to lively markets and tapas bars, Madrid offers an exciting adventure for solo travelers.",
      destination: "Madrid",
      departure: "Adolfo Suárez Madrid–Barajas Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Casual and comfortable attire",
      bigImgSrc: "madrid/madrid-big-img.jpg",
      price: "1199",
      included: [
        "5 nights accommodation in a central hotel",
        "Guided city exploration",
        "Tapas tasting experience",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Madrid",
          dayPlan:
            "Arrive at Adolfo Suárez Madrid–Barajas Airport and transfer to your central hotel. Start your adventure with a walk around the bustling streets of Madrid.",
          included: ["Airport transfer", "Hotel accommodation"],
        },
        {
          dayPlanTitle: "City Exploration",
          dayPlan:
            "Embark on a guided city exploration, visiting landmarks such as the Royal Palace, Puerta del Sol, and Plaza Mayor.",
          included: ["Guided city tour"],
        },
        {
          dayPlanTitle: "Art and Culture",
          dayPlan:
            "Explore the city's art and culture scene, visiting renowned museums like the Prado Museum and Reina Sofia Museum.",
          included: ["Museum entrances"],
        },
        {
          dayPlanTitle: "Madrid Markets",
          dayPlan:
            "Experience the vibrant atmosphere of Madrid's markets, such as Mercado de San Miguel and Mercado de la Cebada.",
          included: ["Market visits"],
        },
        {
          dayPlanTitle: "Tapas Tasting",
          dayPlan:
            "Indulge in a tapas tasting experience, savoring a variety of Spanish flavors and enjoying the local culinary scene.",
          included: ["Tapas tasting"],
        },
        {
          dayPlanTitle: "Retiro Park",
          dayPlan:
            "Relax in Retiro Park, one of Madrid's most famous parks, where you can enjoy a leisurely stroll and boat ride.",
          included: ["Retiro Park visit"],
        },
        {
          dayPlanTitle: "Final Day in Madrid",
          dayPlan:
            "Spend your final day exploring more of Madrid's attractions or shopping for souvenirs. Depart from Adolfo Suárez Madrid–Barajas Airport with cherished memories.",
          included: ["Hotel accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "madrid/gallery/madrid-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "madrid/gallery/madrid-gallery-2.jpg",
          "madrid/gallery/madrid-gallery-3.jpg",
          "madrid/gallery/madrid-gallery-4.jpg",
          "madrid/gallery/madrid-gallery-5.jpg",
        ],
        bottomImg: "madrid/gallery/madrid-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "My solo adventure in Madrid was incredible. The city's energy, art, and food scene kept me engaged. The tapas tasting and market visits were highlights. I highly recommend this trip to fellow solo travelers.",
          rating: {
            comfort: "4",
            hospitality: "4",
            hygiene: "4",
            reception: "5",
          },
          userName: "Nathan Carter",
          userEmail: "nathan@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Exploring Madrid was a thrilling experience. The guided city tour provided insights into the city's history, and the tapas tasting was a gastronomic delight. I had an adventurous and memorable time.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Isabella Martinez",
          userEmail: "isabella@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Madrid's mix of cultural attractions and vibrant streets made this trip unforgettable. The tapas tasting was a highlight, and the Retiro Park was a peaceful oasis. I recommend this adventure to anyone looking to explore a dynamic city.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "4",
          },
          userName: "Luis Ramirez",
          userEmail: "luis@example.com",
          date: new Date("2023-08-05"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "cambridge/cambridge-card.avif",
    imgSrcWebp: "cambridge/cambridge-card.webp",
    location: "Cambridge, United Kingdom",
    fullDestination: "Cambridge, United Kingdom",
    price: 1399,
    name: "Discover Cambridge",
    category: "Best Summer Destinations",
    continent: "Europe",
    travelType: "Adventure",
    travellers: 2,
    date: new Date("2026-08-20"),
    fullTripInfo: {
      additionalServices: {
        jets: ["Cessna Citation X", "Embraer Phenom 100"],
        helicopters: ["Airbus H160", "Bell 429"],
        cars: ["Luxury Car Rental", "Classic Car Tour"],
      },
      name: "Discover Cambridge",
      country: "United Kingdom",
      description:
        "Embark on an adventure to the historic city of Cambridge, known for its prestigious university and charming landscapes. Explore the iconic colleges, punt along the River Cam, and immerse yourself in the academic and cultural atmosphere. Whether you're fascinated by history or seeking new experiences, Cambridge has something for everyone.",
      destination: "Cambridge",
      departure: "London Heathrow Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Smart casual attire",
      bigImgSrc: "cambridge/cambridge-big-img.jpg",
      price: 1399,
      included: [
        "3 nights accommodation in a historic hotel",
        "Guided college tour",
        "Punting experience",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Cambridge",
          dayPlan:
            "Arrive at London Heathrow Airport and transfer to your historic hotel in Cambridge. Begin your adventure with a stroll around the picturesque streets.",
          included: ["Airport transfer", "Hotel accommodation"],
        },
        {
          dayPlanTitle: "College Exploration",
          dayPlan:
            "Embark on a guided tour of the iconic Cambridge University colleges, discovering their history and architectural marvels.",
          included: ["Guided college tour"],
        },
        {
          dayPlanTitle: "Punting Experience",
          dayPlan:
            "Enjoy a punting experience on the River Cam, admiring the stunning views of the colleges and bridges.",
          included: ["Punting experience"],
        },
        {
          dayPlanTitle: "Academic Atmosphere",
          dayPlan:
            "Immerse yourself in the academic atmosphere by visiting the University Library and exploring its treasures.",
          included: ["Library visit"],
        },
        {
          dayPlanTitle: "Botanic Garden",
          dayPlan:
            "Visit the University Botanic Garden, a peaceful oasis with a diverse collection of plants and landscapes.",
          included: ["Botanic Garden entrance"],
        },
        {
          dayPlanTitle: "Local Cuisine",
          dayPlan:
            "Indulge in local cuisine at a traditional Cambridge restaurant, savoring the flavors of the region.",
          included: ["Dinner reservation"],
        },
        {
          dayPlanTitle: "Final Day in Cambridge",
          dayPlan:
            "Spend your final day exploring more of Cambridge's landmarks or shopping for souvenirs. Depart from London Heathrow Airport with cherished memories.",
          included: ["Hotel accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "cambridge/gallery/cambridge-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "cambridge/gallery/cambridge-gallery-2.jpg",
          "cambridge/gallery/cambridge-gallery-3.jpg",
          "cambridge/gallery/cambridge-gallery-4.jpg",
          "cambridge/gallery/cambridge-gallery-5.jpg",
        ],
        bottomImg: "cambridge/gallery/cambridge-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "My solo adventure to Cambridge was a delightful experience. The guided college tour and punting were truly special. The city's historic charm and academic atmosphere were captivating.",
          rating: {
            comfort: "4",
            hospitality: "4",
            hygiene: "5",
            reception: "5",
          },
          userName: "Grace Turner",
          userEmail: "grace@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Exploring Cambridge's renowned colleges and punting along the River Cam were highlights of my trip. The guided tours provided fascinating insights into the city's history and culture.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Michael Thompson",
          userEmail: "michael@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Cambridge's mix of academic heritage and natural beauty made this adventure memorable. The punting experience offered breathtaking views, and the botanical garden was a serene escape.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "4",
          },
          userName: "Sophie Walker",
          userEmail: "sophie@example.com",
          date: new Date("2023-08-15"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "sudurland/sudurland-card.avif",
    imgSrcWebp: "sudurland/sudurland-card.webp",
    location: "Suðurland, Iceland",
    fullDestination: "Suðurland, Iceland",
    price: 2199,
    name: "Explore Suðurland",
    category: "Best Summer Destinations",
    continent: "Europe",
    travelType: "Adventure",
    travellers: 3,
    date: new Date("2026-07-15"),
    fullTripInfo: {
      additionalServices: {
        cars: ["4x4 Off-Road Adventure", "Luxury SUV Rental"],
      },
      name: "Explore Suðurland",
      country: "Iceland",
      description:
        "Embark on an adventurous journey to Suðurland, Iceland's picturesque region known for its stunning landscapes, glaciers, waterfalls, and geothermal wonders. Discover the famous Golden Circle, explore hidden gems, and immerse yourself in the natural beauty and unique culture of Iceland.",
      destination: "Suðurland",
      departure: "Keflavik International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Layered clothing for varying weather",
      bigImgSrc: "sudurland/sudurland-big-img.jpg",
      price: 2199,
      included: [
        "5 nights accommodation in a cozy cabin",
        "Golden Circle guided tour",
        "Glacier hike adventure",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Dinner"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Suðurland",
          dayPlan:
            "Arrive at Keflavik International Airport and transfer to your cozy cabin in Suðurland. Take in the breathtaking surroundings and get ready for your adventure.",
          included: ["Airport transfer", "Cabin accommodation"],
        },
        {
          dayPlanTitle: "Golden Circle Tour",
          dayPlan:
            "Embark on a guided tour of the Golden Circle, visiting iconic sites such as Þingvellir National Park, Geysir Geothermal Area, and Gullfoss Waterfall.",
          included: ["Guided Golden Circle tour"],
        },
        {
          dayPlanTitle: "Glacier Hike Adventure",
          dayPlan:
            "Experience the thrill of a glacier hike adventure on Sólheimajökull Glacier. Explore the ice formations and enjoy panoramic views.",
          included: ["Glacier hike adventure"],
        },
        {
          dayPlanTitle: "Secret Lagoon Relaxation",
          dayPlan:
            "Unwind in the geothermal waters of the Secret Lagoon, a natural hot spring surrounded by stunning landscapes.",
          included: ["Secret Lagoon visit"],
        },
        {
          dayPlanTitle: "Skógafoss and Seljalandsfoss",
          dayPlan:
            "Visit the stunning Skógafoss and Seljalandsfoss waterfalls, each offering unique views and experiences.",
          included: ["Waterfall visits"],
        },
        {
          dayPlanTitle: "Local Cuisine",
          dayPlan:
            "Indulge in Icelandic cuisine at a traditional restaurant, savoring the flavors of the region.",
          included: ["Dinner reservation"],
        },
        {
          dayPlanTitle: "Final Day in Suðurland",
          dayPlan:
            "Spend your final day exploring more of Suðurland's natural wonders or relaxing at your cabin. Depart from Keflavik International Airport with unforgettable memories.",
          included: ["Cabin accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "sudurland/gallery/sudurland-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "sudurland/gallery/sudurland-gallery-2.jpg",
          "sudurland/gallery/sudurland-gallery-3.jpg",
          "sudurland/gallery/sudurland-gallery-4.jpg",
          "sudurland/gallery/sudurland-gallery-5.jpg",
        ],
        bottomImg: "sudurland/gallery/sudurland-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "My adventure in Suðurland was a dream come true. The guided Golden Circle tour showcased Iceland's natural beauty, and the glacier hike was a thrilling experience. The cozy cabin provided a perfect retreat each evening.",
          rating: {
            comfort: "4",
            hospitality: "4",
            hygiene: "5",
            reception: "5",
          },
          userName: "Alexandra Carter",
          userEmail: "alexandra@example.com",
          date: new Date(),
        },
        {
          commentText:
            "I was captivated by the rugged landscapes of Suðurland. The glacier hike and geothermal relaxation were highlights. The guided tour and local cuisine introduced me to the culture and flavors of Iceland.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "David Evans",
          userEmail: "david@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Suðurland's natural wonders left me in awe. The waterfall visits and Secret Lagoon were enchanting experiences. The cabin accommodation provided a cozy retreat after each day's adventures.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "4",
          },
          userName: "Emily Walker",
          userEmail: "emily@example.com",
          date: new Date("2023-07-10"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "aruba/aruba-card.avif",
    imgSrcWebp: "aruba/aruba-card.webp",
    location: "Aruba, Caribbean",
    fullDestination: "Aruba, Caribbean",
    price: 2599,
    name: "Escape to Aruba",
    category: "Best Summer Destinations",
    continent: "North America",
    travelType: "Romantic",
    travellers: 1,
    date: new Date("2026-06-10"),
    fullTripInfo: {
      additionalServices: {
        jets: ["Cessna Citation X", "Embraer Phenom 100"],
        helicopters: ["Bell 429", "Airbus H160"],
        cars: ["Convertible Car Rental", "Luxury SUV Rental"],
        boats: ["Luxury Yacht Charter", "Catamaran Cruise"],
      },
      name: "Escape to Aruba",
      country: "Aruba",
      description:
        "Experience the ultimate romantic getaway on the stunning Caribbean island of Aruba. With its pristine beaches, turquoise waters, and vibrant culture, Aruba offers a perfect setting for couples seeking relaxation and adventure. Indulge in beachfront luxury, explore underwater wonders, and create unforgettable memories together.",
      destination: "Aruba",
      departure: "Queen Beatrix International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Casual beachwear and elegant attire",
      bigImgSrc: "aruba/aruba-big-img.jpg",
      price: 2599,
      included: [
        "7 nights beachfront accommodation",
        "Private snorkeling tour",
        "Romantic dinner on the beach",
        "Airport transfers",
      ],
      notIncluded: ["Lunch", "Additional activities"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Aruba",
          dayPlan:
            "Arrive at Queen Beatrix International Airport and transfer to your luxurious beachfront resort. Begin your romantic escape with a leisurely stroll along the pristine beach.",
          included: ["Airport transfer", "Beachfront accommodation"],
        },
        {
          dayPlanTitle: "Beach Relaxation",
          dayPlan:
            "Spend the day unwinding on the white sandy beaches, soaking up the sun, and enjoying the crystal-clear waters of the Caribbean.",
          included: ["Beach access"],
        },
        {
          dayPlanTitle: "Private Snorkeling Tour",
          dayPlan:
            "Embark on a private snorkeling tour to explore Aruba's vibrant underwater world. Discover colorful coral reefs and tropical marine life.",
          included: ["Private snorkeling tour"],
        },
        {
          dayPlanTitle: "Romantic Sunset Cruise",
          dayPlan:
            "Enjoy a romantic sunset catamaran cruise, sipping cocktails and admiring the breathtaking views of the Caribbean sunset.",
          included: ["Sunset cruise"],
        },
        {
          dayPlanTitle: "Island Exploration",
          dayPlan:
            "Rent a convertible car to explore Aruba's scenic landscapes, from rugged coasts to arid deserts.",
          included: ["Convertible car rental"],
        },
        {
          dayPlanTitle: "Dinner Under the Stars",
          dayPlan:
            "Indulge in a private beachside dinner, surrounded by the sound of waves and the soft glow of candlelight.",
          included: ["Romantic beach dinner"],
        },
        {
          dayPlanTitle: "Final Day in Aruba",
          dayPlan:
            "Spend your final day at leisure, whether it's shopping for local treasures or enjoying water activities. Depart from Queen Beatrix International Airport with cherished memories.",
          included: ["Beachfront accommodation", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "aruba/gallery/aruba-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "aruba/gallery/aruba-gallery-2.jpg",
          "aruba/gallery/aruba-gallery-3.jpg",
          "aruba/gallery/aruba-gallery-4.jpg",
          "aruba/gallery/aruba-gallery-5.jpg",
        ],
        bottomImg: "aruba/gallery/aruba-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Our romantic escape to Aruba was beyond our expectations. The private snorkeling tour and sunset cruise were highlights. The beachfront accommodation and candlelit dinner created a truly magical experience.",
          rating: {
            comfort: "5",
            hospitality: "5",
            hygiene: "2",
            reception: "4",
          },
          userName: "Jessica Mitchell",
          userEmail: "jessica@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Aruba's stunning beaches and vibrant culture made our vacation unforgettable. The private dinner on the beach was a perfect touch of romance, and the sunset cruise was a dream come true.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "3",
            reception: "4",
          },
          userName: "William Anderson",
          userEmail: "william@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Aruba's turquoise waters and beachfront luxury were just what we needed for a romantic getaway. The private snorkeling tour revealed a hidden world beneath the waves, and the sunset cruise was a picture-perfect moment.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "1",
            reception: "4",
          },
          userName: "Olivia Thompson",
          userEmail: "olivia@example.com",
          date: new Date("2023-06-20"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "blausee/blausee-card.avif",
    imgSrcWebp: "blausee/blausee-card.webp",
    location: "Blausee, Switzerland",
    fullDestination: "Blausee, Switzerland",
    price: 1399,
    name: "Discover Blausee",
    category: "Best Summer Destinations",
    continent: "Europe",
    travelType: "Adventure",
    travellers: 1,
    date: new Date("2026-07-15"),
    fullTripInfo: {
      additionalServices: {
        helicopters: ["Airbus H160", "Bell 429"],
        cars: ["Mountain Car Rental", "Electric Car Rental"],
      },
      name: "Discover Blausee",
      country: "Switzerland",
      description:
        "Embark on a serene adventure to Blausee, a hidden gem nestled in the Swiss Alps. This pristine lake is surrounded by lush forests and offers a tranquil escape from the hustle and bustle of everyday life. Immerse yourself in nature, take leisurely walks, and enjoy the crystal-clear waters of Blausee.",
      destination: "Blausee",
      departure: "Zurich International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Comfortable outdoor attire",
      bigImgSrc: "blausee/blausee-big-img.jpg",
      price: 1399,
      included: [
        "3 nights accommodation at Blausee",
        "Guided nature walks",
        "Boat ride on the lake",
        "Airport transfers",
      ],
      notIncluded: ["Meals", "Additional activities"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival at Blausee",
          dayPlan:
            "Arrive at Zurich International Airport and transfer to Blausee. Check in to your cozy accommodation and take in the breathtaking surroundings.",
          included: ["Airport transfer", "Accommodation at Blausee"],
        },
        {
          dayPlanTitle: "Nature Walks",
          dayPlan:
            "Spend your days exploring the enchanting forest trails around Blausee. Guided nature walks will introduce you to the diverse flora and fauna of the region.",
          included: ["Guided nature walks"],
        },
        {
          dayPlanTitle: "Boat Ride on Blausee",
          dayPlan:
            "Enjoy a peaceful boat ride on the crystal-clear waters of Blausee. Admire the underwater life and the reflections of the surrounding landscape.",
          included: ["Boat ride on the lake"],
        },
        {
          dayPlanTitle: "Relaxation and Leisure",
          dayPlan:
            "Take time to relax by the lake, read a book, or simply soak in the natural beauty that surrounds you. Explore the nearby village and savor local Swiss cuisine.",
          included: ["Leisure time"],
        },
        {
          dayPlanTitle: "Final Day at Blausee",
          dayPlan:
            "Enjoy your last moments at Blausee before departing for Zurich International Airport. Take with you the memories of this serene alpine retreat.",
          included: ["Accommodation at Blausee", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "blausee/gallery/blausee-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "blausee/gallery/blausee-gallery-2.jpg",
          "blausee/gallery/blausee-gallery-3.jpg",
          "blausee/gallery/blausee-gallery-4.jpg",
          "blausee/gallery/blausee-gallery-5.jpg",
        ],
        bottomImg: "blausee/gallery/blausee-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "My journey to Blausee was a peaceful escape into nature's beauty. The guided nature walks and boat ride on the lake were serene experiences. The accommodations were cozy and perfectly situated near the lake.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "5",
          },
          userName: "Sophia Miller",
          userEmail: "sophia@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Blausee's tranquility left me rejuvenated. The guided walks allowed me to appreciate the local flora and fauna, and the boat ride on the clear lake was a unique experience. The accommodations were comfortable and the surrounding nature was breathtaking.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Daniel Carter",
          userEmail: "daniel@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Blausee's beauty took my breath away. The boat ride on the lake and guided walks were a perfect way to immerse in nature. The accommodations were cozy and the entire experience was truly serene.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "4",
          },
          userName: "Ava Wilson",
          userEmail: "ava@example.com",
          date: new Date("2023-07-05"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "gullfoss/gullfoss-card.avif",
    imgSrcWebp: "gullfoss/gullfoss-card.webp",
    location: "Gullfoss, Iceland",
    fullDestination: "Gullfoss, Iceland",
    price: 1399,
    name: "Explore Gullfoss",
    category: "Romantic Winter Destinations",
    continent: "Europe",
    travelType: "Adventure",
    travellers: 3,
    date: new Date("2026-08-20"),
    fullTripInfo: {
      additionalServices: {
        helicopters: ["Bell 429", "Airbus H160"],
        cars: ["4x4 Off-Road Vehicle Rental", "Electric Car Rental"],
      },
      name: "Explore Gullfoss",
      country: "Iceland",
      description:
        "Embark on an exhilarating adventure to Gullfoss, one of Iceland's most iconic waterfalls. Witness the awe-inspiring power of nature as the cascading waters create a mesmerizing spectacle. Explore the rugged landscapes, soak in geothermal springs, and experience the magic of the Icelandic wilderness.",
      destination: "Gullfoss",
      departure: "Reykjavik International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Sturdy outdoor clothing and hiking boots",
      bigImgSrc: "gullfoss/gullfoss-big-img.jpg",
      price: 1399,
      included: [
        "3 nights accommodation near Gullfoss",
        "Guided waterfall hike",
        "Geothermal spa experience",
        "Airport transfers",
      ],
      notIncluded: ["Meals", "Additional activities"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Iceland",
          dayPlan:
            "Arrive at Reykjavik International Airport and transfer to your accommodation near Gullfoss. Immerse yourself in Iceland's unique landscapes.",
          included: ["Airport transfer", "Accommodation near Gullfoss"],
        },
        {
          dayPlanTitle: "Waterfall Hike",
          dayPlan:
            "Embark on a guided hike to Gullfoss, witnessing the magnificent waterfall up close and capturing the beauty of the surrounding nature.",
          included: ["Guided waterfall hike"],
        },
        {
          dayPlanTitle: "Geothermal Spa Experience",
          dayPlan:
            "Relax and rejuvenate in a geothermal spa, surrounded by the rugged beauty of Iceland's wilderness.",
          included: ["Geothermal spa experience"],
        },
        {
          dayPlanTitle: "Exploration and Adventure",
          dayPlan:
            "Discover nearby geothermal areas, lava fields, and hot springs. Optional activities include glacier walks and horseback riding.",
          included: ["Exploration time"],
        },
        {
          dayPlanTitle: "Icelandic Cuisine",
          dayPlan:
            "Savor traditional Icelandic dishes at local restaurants, experiencing the flavors of the country's cuisine.",
          included: ["Icelandic cuisine experience"],
        },
        {
          dayPlanTitle: "Final Day in Iceland",
          dayPlan:
            "Spend your final day at leisure, reflecting on your Icelandic adventure. Depart from Reykjavik International Airport with memories of Gullfoss and beyond.",
          included: ["Accommodation near Gullfoss", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "gullfoss/gallery/gullfoss-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "gullfoss/gallery/gullfoss-gallery-2.jpg",
          "gullfoss/gallery/gullfoss-gallery-3.jpg",
          "gullfoss/gallery/gullfoss-gallery-4.jpg",
          "gullfoss/gallery/gullfoss-gallery-5.jpg",
        ],
        bottomImg: "gullfoss/gallery/gullfoss-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Exploring Gullfoss was an unforgettable experience. The guided waterfall hike allowed us to appreciate the power of nature, and the geothermal spa was the perfect way to unwind after a day of adventure.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "5",
            reception: "4",
          },
          userName: "Ethan Harris",
          userEmail: "ethan@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Iceland's beauty was mesmerizing. The guided hike to Gullfoss was an amazing adventure, and the geothermal spa was pure relaxation. The accommodations were comfortable and allowed us to connect with nature.",
          rating: {
            comfort: "5",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Emma Wilson",
          userEmail: "emma@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Gullfoss was a breathtaking destination. The waterfall hike was exhilarating, and the geothermal spa was a unique experience. The trip was well-organized, and the landscapes were unlike anything we've seen before.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "4",
            reception: "4",
          },
          userName: "Liam Johnson",
          userEmail: "liam@example.com",
          date: new Date("2023-08-01"),
        },
      ],
    },
  },
  {
    imgSrcAvif: "hawaii/hawaii-card.avif",
    imgSrcWebp: "hawaii/hawaii-card.webp",
    location: "Hawaii, USA",
    fullDestination: "Hawaii, USA",
    price: 2599,
    name: "Escape to Hawaii",
    category: "Best Summer Destinations",
    continent: "North America",
    travelType: "Adventure",
    travellers: 3,
    date: new Date("2026-09-10"),
    fullTripInfo: {
      additionalServices: {
        helicopters: ["Bell 429", "Airbus H160"],
        cars: ["SUV Rental", "Convertible Rental"],
      },
      name: "Escape to Hawaii",
      country: "United States",
      description:
        "Embark on a tropical adventure to the breathtaking islands of Hawaii. From golden beaches to lush rainforests, Hawaii offers a diverse paradise to explore. Immerse yourself in the local culture, indulge in water sports, and bask in the natural beauty of the Pacific.",
      destination: "Hawaii",
      departure: "Honolulu International Airport",
      departureTime: "Flexible schedule",
      returnTime: "Flexible schedule",
      dressCode: "Light and comfortable clothing",
      bigImgSrc: "hawaii/hawaii-big-img.jpg",
      price: 2599,
      included: [
        "6 nights accommodation in Hawaii",
        "Snorkeling and water sports",
        "Cultural excursions",
        "Airport transfers",
      ],
      notIncluded: ["Meals", "Additional activities"],
      tourPlan: [
        {
          dayPlanTitle: "Arrival in Hawaii",
          dayPlan:
            "Arrive at Honolulu International Airport and transfer to your accommodation. Take in the warm Hawaiian breeze and begin your tropical adventure.",
          included: ["Airport transfer", "Accommodation in Hawaii"],
        },
        {
          dayPlanTitle: "Beach Exploration",
          dayPlan:
            "Spend your days exploring Hawaii's stunning beaches, engaging in water sports, and relaxing under the sun.",
          included: ["Beach time", "Snorkeling and water sports"],
        },
        {
          dayPlanTitle: "Cultural Immersion",
          dayPlan:
            "Experience Hawaiian culture through cultural excursions, luaus, and traditional performances.",
          included: ["Cultural excursions"],
        },
        {
          dayPlanTitle: "Rainforest Adventure",
          dayPlan:
            "Embark on a hike through lush rainforests, discovering hidden waterfalls and stunning vistas.",
          included: ["Rainforest hike"],
        },
        {
          dayPlanTitle: "Local Cuisine",
          dayPlan:
            "Indulge in local Hawaiian cuisine, from fresh seafood to tropical fruits. Experience the flavors of the islands.",
          included: ["Hawaiian cuisine experience"],
        },
        {
          dayPlanTitle: "Farewell to Hawaii",
          dayPlan:
            "Spend your last day savoring the beauty of Hawaii before departing from Honolulu International Airport.",
          included: ["Accommodation in Hawaii", "Airport transfer"],
        },
      ],
      gallery: {
        topImg: "hawaii/gallery/hawaii-gallery-1.jpg",
        restImages: null,
        masonryImages: [
          "hawaii/gallery/hawaii-gallery-2.jpg",
          "hawaii/gallery/hawaii-gallery-3.jpg",
          "hawaii/gallery/hawaii-gallery-4.jpg",
          "hawaii/gallery/hawaii-gallery-5.jpg",
        ],
        bottomImg: "hawaii/gallery/hawaii-gallery-6.jpg",
      },
      reviews: [
        {
          commentText:
            "Our Hawaiian adventure was beyond our expectations. The beaches, water sports, and cultural experiences were unforgettable. Hawaii's beauty is truly unparalleled.",
          rating: {
            comfort: "2",
            hospitality: "4",
            hygiene: "5",
            reception: "4",
          },
          userName: "Olivia Smith",
          userEmail: "olivia@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Hawaii stole our hearts. The beach exploration and cultural immersion were highlights of our trip. The local cuisine introduced us to new flavors, and the Hawaiian sunset views were breathtaking.",
          rating: {
            comfort: "4",
            hospitality: "5",
            hygiene: "5",
            reception: "2",
          },
          userName: "Liam Johnson",
          userEmail: "liam@example.com",
          date: new Date(),
        },
        {
          commentText:
            "Hawaii's beauty is unmatched. The rainforest adventure and beach time allowed us to connect with nature. The local cultural experiences were enlightening, and the trip was organized flawlessly.",
          rating: {
            comfort: "4",
            hospitality: "4",
            hygiene: "1",
            reception: "4",
          },
          userName: "Ava Brown",
          userEmail: "ava@example.com",
          date: new Date("2023-07-15"),
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
            imgSrcAvif: await getUrlFromSrc(trip.imgSrcAvif),
            imgSrcWebp: await getUrlFromSrc(trip.imgSrcWebp),
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
            additionalServices: trip.fullTripInfo.additionalServices,
            name: trip.fullTripInfo.country,
            country: trip.fullTripInfo.country,
            description: trip.fullTripInfo.description,
            destination: trip.fullTripInfo.destination,
            departure: trip.fullTripInfo.departure,
            departureTime: trip.fullTripInfo.departureTime,
            returnTime: trip.fullTripInfo.returnTime,
            dressCode: trip.fullTripInfo.dressCode,
            bigImgSrc: await getUrlFromSrc(trip.fullTripInfo.bigImgSrc),
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
          if (this.worldsTopTripsLoaded && this.page == 0) {
            this.trips = this.topTrips.find(
              (category) => category.place == "World"
            ).cards;
            console.log("here");
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
            this.page += 1;
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
