import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/luxury-packages",
    name: "packages",
    component: () => import("../views/PackagesView.vue"),
  },
  {
    path: "/luxury-packages/:id",
    name: "package-page",
    component: () => import("../views/TripShow.vue"),
  },
  {
    path: "/booking",
    name: "booking",
    component: () => import("../views/BookCategoriesView.vue"),
  },
  {
    path: "/why-lux-trip",
    name: "why-lux-trip",
    component: () => import("../views/WhyLuxTrip.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/ContactView.vue"),
  },
  {
    path: "/supercar-booking",
    name: "supercar-booking",
    component: () => import("../views/BookSupercar.vue"),
  },
  {
    path: "/hotels-booking",
    name: "hotels-booking",
    component: () => import("../views/BookHotels.vue"),
  },
  {
    path: "/vilas-booking",
    name: "vilas-booking",
    component: () => import("../views/BookVilas.vue"),
  },
  {
    path: "/yachts-booking",
    name: "yachts-booking",
    component: () => import("../views/BookYachts.vue"),
  },
  {
    path: "/helicopter-booking",
    name: "helicopter-booking",
    component: () => import("../views/BookHelicopter.vue"),
  },
  {
    path: "/jet-booking",
    name: "jet-booking",
    component: () => import("../views/BookJet.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    // always scroll to top
    if (to.hash) {
      return { el: to.hash, top: 100 };
    }
    return { top: 0 };
  },
});

export default router;
