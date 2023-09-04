<template>
  <div class="book-trip-page">
    <main>
      <div class="wrapper">
        <h2>Book Trip</h2>
        <div class="container">
          <form class="book-trip-page__form white">
            <decoratedTitle>Booking</decoratedTitle>
            <div
              v-if="!formSent"
              class="book-trip-page__form-content">
              <div class="form-step form-step__1">
                <h3>
                  <span> 1. Location from </span>
                  <span
                    v-if="bookForm.firstStage.confirmed === true"
                    class="form-step__edit-button"
                    @click="editForm('firstStage')"
                    >Edit</span
                  >
                </h3>
                <div
                  v-show="bookForm.firstStage.confirmed === true"
                  class="form-step-confirmed">
                  <ul>
                    <li>
                      <span>Country</span>
                      <span>{{ bookForm.firstStage.values.country }}</span>
                    </li>
                    <li>
                      <span>City </span
                      ><span>{{ bookForm.firstStage.values.city }}</span>
                    </li>
                    <li>
                      <span>Date</span>
                      <span>{{ bookForm.firstStage.values.date }}</span>
                    </li>
                    <li>
                      <span>Travellers</span>
                      <span>{{ bookForm.firstStage.values.travellers }}</span>
                    </li>
                  </ul>
                </div>
                <div
                  v-show="bookForm.firstStage.confirmed === false"
                  class="form-step-edit">
                  <Input
                    type="text"
                    name="country"
                    label="Country"
                    placeholder="Write your country"
                    v-model="bookForm.firstStage.values.country"
                    id="countryInput"
                    :errorMessage="bookForm.firstStage.errors.country"
                    @focus="bookForm.firstStage.errors.country = null"
                    withIcon
                    ><IRhombus class="rhombus-icon"></IRhombus
                  ></Input>
                  <Input
                    type="text"
                    name="city"
                    label="City"
                    placeholder="Write your city"
                    v-model="bookForm.firstStage.values.city"
                    id="cityInput"
                    :errorMessage="bookForm.firstStage.errors.city"
                    @focus="bookForm.firstStage.errors.city = null"
                    withIcon
                    ><IRhombus class="rhombus-icon"></IRhombus
                  ></Input>
                  <div class="wrap-inputs">
                    <SelectComponent
                      class="select-component"
                      id="book-trip-date"
                      label="Dates"
                      placeholder="Choose trip date"
                      v-model="bookForm.firstStage.values.date"
                      :errorMessage="bookForm.firstStage.errors.date"
                      @focus="bookForm.firstStage.errors.date = null"
                      @click="bookForm.firstStage.errors.date = null"
                      :options="avaliableDates"></SelectComponent>
                    <SelectComponent
                      class="select-component"
                      id="book-trip-travellers"
                      label="Number of people"
                      placeholder="Travelers"
                      v-model="bookForm.firstStage.values.travellers"
                      :errorMessage="bookForm.firstStage.errors.travellers"
                      @focus="bookForm.firstStage.errors.travellers = null"
                      @click="bookForm.firstStage.errors.travellers = null"
                      :options="possibleTravellers"></SelectComponent>
                  </div>
                  <ButtonTransparent
                    @click.prevent="verifyFirstStage"
                    class="next-step-button"
                    >next</ButtonTransparent
                  >
                </div>
              </div>
              <div class="form-step form-step__2">
                <h3>
                  <span> 2. Your details</span>
                  <span
                    v-if="bookForm.secondStage.confirmed === true"
                    class="form-step__edit-button"
                    @click="editForm('secondStage')"
                    >Edit</span
                  >
                </h3>

                <div
                  v-show="bookForm.secondStage.confirmed === true"
                  class="form-step-confirmed">
                  <ul>
                    <li
                      v-if="
                        bookForm.secondStage.values.additionTravellers.length >
                        1
                      ">
                      <h4>Traveller 1 (Lead traveller)</h4>
                    </li>
                    <li>
                      <span>First name</span
                      ><span>
                        {{ bookForm.secondStage.values.mainTraveler.firstName }}
                      </span>
                    </li>
                    <li>
                      <span>Last name</span
                      ><span>
                        {{ bookForm.secondStage.values.mainTraveler.lastName }}
                      </span>
                    </li>
                    <li>
                      <span>Email</span
                      ><span>
                        {{ bookForm.secondStage.values.mainTraveler.email }}
                      </span>
                    </li>
                    <li>
                      <span>Date of Birth</span
                      ><span>
                        {{ bookForm.secondStage.values.mainTraveler.birthday }}
                      </span>
                    </li>
                    <li>
                      <span>Contact number</span
                      ><span>
                        {{ bookForm.secondStage.values.mainTraveler.countryCode
                        }}{{
                          bookForm.secondStage.values.mainTraveler.phoneNumber
                        }}
                      </span>
                    </li>
                  </ul>
                  <ul
                    v-for="(additionTravellers, index) in bookForm.secondStage
                      .values.additionTravellers"
                    :key="index">
                    <li>
                      <h4>Traveller {{ index + 2 }}</h4>
                    </li>

                    <li>
                      <span>First name</span
                      ><span>
                        {{ additionTravellers.firstName }}
                      </span>
                    </li>
                    <li>
                      <span>Last name</span
                      ><span>
                        {{ additionTravellers.lastName }}
                      </span>
                    </li>

                    <li>
                      <span>Date of Birth</span
                      ><span>
                        {{ additionTravellers.birthday }}
                      </span>
                    </li>
                    <li>
                      <span>Contact number</span
                      ><span>
                        {{ additionTravellers.countryCode
                        }}{{ additionTravellers.phoneNumber }}
                      </span>
                    </li>
                  </ul>
                </div>
                <div
                  v-show="bookForm.secondStage.confirmed === false"
                  class="form-step-edit">
                  <h4
                    v-if="
                      bookForm.secondStage.values.additionTravellers.length > 1
                    ">
                    Traveller 1 (Lead traveller)
                  </h4>
                  <Input
                    type="text"
                    name="firstName"
                    label="First name"
                    placeholder="Write your first name"
                    v-model="bookForm.secondStage.values.mainTraveler.firstName"
                    id="firstNameInput"
                    :errorMessage="
                      bookForm.secondStage.errors.mainTraveler.firstName
                    "
                    @focus="
                      bookForm.secondStage.errors.mainTraveler.firstName = null
                    "></Input>
                  <Input
                    type="text"
                    name="lastName"
                    label="Last name"
                    placeholder="Write your last name"
                    v-model="bookForm.secondStage.values.mainTraveler.lastName"
                    id="lastNameInput"
                    :errorMessage="
                      bookForm.secondStage.errors.mainTraveler.lastName
                    "
                    @focus="
                      bookForm.secondStage.errors.mainTraveler.lastName = null
                    "></Input>
                  <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Write your email"
                    v-model="bookForm.secondStage.values.mainTraveler.email"
                    id="emailInput"
                    :errorMessage="
                      bookForm.secondStage.errors.mainTraveler.email
                    "
                    @focus="
                      bookForm.secondStage.errors.mainTraveler.email = null
                    "></Input>
                  <DateInput
                    label="Date of Birth"
                    placeholder="Your birthday"
                    v-model="bookForm.secondStage.values.mainTraveler.birthday"
                    id="birth-date"
                    :errorMessage="
                      bookForm.secondStage.errors.mainTraveler.birthday
                    "
                    @input-click="
                      bookForm.secondStage.errors.mainTraveler.birthday = null
                    "
                    @focus="
                      bookForm.secondStage.errors.mainTraveler.birthday = null
                    "
                    :maxDate="new Date()"
                    withIcon>
                    <ICalendar></ICalendar>
                  </DateInput>
                  <div class="wrap-inputs">
                    <Input
                      label="Contact number"
                      id="countryCode"
                      type="text"
                      placeholder="Country code"
                      v-model="
                        bookForm.secondStage.values.mainTraveler.countryCode
                      "
                      :errorMessage="
                        bookForm.secondStage.errors.mainTraveler.countryCode
                      "
                      @focus="
                        bookForm.secondStage.errors.mainTraveler.countryCode =
                          null
                      "></Input>
                    <Input
                      :id="`phoneNumber`"
                      name="phone"
                      type="text"
                      placeholder="Phone number"
                      v-model="
                        bookForm.secondStage.values.mainTraveler.phoneNumber
                      "
                      :errorMessage="
                        bookForm.secondStage.errors.mainTraveler.phoneNumber
                      "
                      @focus="
                        bookForm.secondStage.errors.mainTraveler.phoneNumber =
                          null
                      "></Input>
                  </div>
                  <template
                    v-for="(additionalTraveler, index) in bookForm.secondStage
                      .values.additionTravellers"
                    :key="index">
                    <h4>Traveller {{ index + 2 }}</h4>
                    <Input
                      type="text"
                      name="firstName"
                      label="First name"
                      placeholder="Write your first name"
                      v-model="
                        bookForm.secondStage.values.additionTravellers[index]
                          .firstName
                      "
                      id="firstNameInput"
                      :errorMessage="
                        bookForm.secondStage.errors.additionTravellers[index]
                          .firstName
                      "
                      @focus="
                        bookForm.secondStage.errors.additionTravellers[
                          index
                        ].firstName = null
                      "></Input>
                    <Input
                      type="text"
                      name="lastName"
                      label="Last name"
                      placeholder="Write your last name"
                      v-model="
                        bookForm.secondStage.values.additionTravellers[index]
                          .lastName
                      "
                      id="lastNameInput"
                      :errorMessage="
                        bookForm.secondStage.errors.additionTravellers[index]
                          .lastName
                      "
                      @focus="
                        bookForm.secondStage.errors.additionTravellers[
                          index
                        ].lastName = null
                      "></Input>
                    <DateInput
                      label="Date of Birth"
                      placeholder="Your birthday"
                      v-model="
                        bookForm.secondStage.values.additionTravellers[index]
                          .birthday
                      "
                      :id="`birth-date-additional-${index}`"
                      :errorMessage="
                        bookForm.secondStage.errors.additionTravellers[index]
                          .birthday
                      "
                      @input-click="
                        bookForm.secondStage.errors.additionTravellers[
                          index
                        ].birthday = null
                      "
                      @focus="
                        bookForm.secondStage.errors.additionTravellers[
                          index
                        ].birthday = null
                      "
                      :maxDate="new Date()"
                      withIcon>
                      <ICalendar></ICalendar>
                    </DateInput>
                    <div class="wrap-inputs">
                      <Input
                        label="Contact number"
                        :id="`countryCode-${index + 2}`"
                        type="text"
                        placeholder="Country code"
                        v-model="
                          bookForm.secondStage.values.additionTravellers[index]
                            .countryCode
                        "
                        :errorMessage="
                          bookForm.secondStage.errors.additionTravellers[index]
                            .countryCode
                        "
                        @focus="
                          bookForm.secondStage.errors.additionTravellers[
                            index
                          ].countryCode = null
                        "></Input>
                      <Input
                        :id="`phoneNumber-${index + 2}`"
                        name="phoneNumber"
                        type="text"
                        placeholder="Phone number"
                        v-model="
                          bookForm.secondStage.values.additionTravellers[index]
                            .phoneNumber
                        "
                        :errorMessage="
                          bookForm.secondStage.errors.additionTravellers[index]
                            .phoneNumber
                        "
                        @focus="
                          bookForm.secondStage.errors.additionTravellers[
                            index
                          ].phoneNumber = null
                        "></Input>
                    </div>
                  </template>
                  <ButtonTransparent
                    v-show="bookForm.secondStage.confirmed === false"
                    @click.prevent="verifySecondStage"
                    class="next-step-button"
                    >next</ButtonTransparent
                  >
                </div>
              </div>
              <div class="form-step form-step__3">
                <h3>
                  <span>3. Additional services</span>
                  <span
                    v-if="bookForm.thirdStage.confirmed === true"
                    class="form-step__edit-button"
                    @click="editForm('thirdStage')"
                    >Edit</span
                  >
                </h3>
                <div
                  v-show="bookForm.thirdStage.confirmed === true"
                  class="form-step-confirmed">
                  <ul v-if="bookForm.thirdStage.values.needCar">
                    <li><h4>Supercar</h4></li>
                    <li>
                      <span>Model of supercar</span>
                      <span>
                        {{
                          bookForm.thirdStage.values.carModel
                            ? bookForm.thirdStage.values.carModel
                            : "Surprise me"
                        }}
                      </span>
                    </li>
                    <li>
                      <span>Driver</span>
                      <span>
                        {{ bookForm.thirdStage.values.driver ? "Yes" : "No" }}
                      </span>
                    </li>
                  </ul>
                  <ul v-if="bookForm.thirdStage.values.needBoat">
                    <li><h4>Yacht/Boats</h4></li>

                    <li>
                      <span>Boat type</span>
                      <span>
                        {{
                          bookForm.thirdStage.values.boatModel
                            ? bookForm.thirdStage.values.boatModel
                            : "Surprise me"
                        }}
                      </span>
                    </li>
                    <li>
                      <span>Skipper</span>
                      <span>
                        {{ bookForm.thirdStage.values.skipper ? "Yes" : "No" }}
                      </span>
                    </li>
                  </ul>
                  <ul v-if="bookForm.thirdStage.values.needJet">
                    <li><h4>Private jet</h4></li>

                    <li>
                      <span>Model of jet</span>
                      <span>
                        {{
                          bookForm.thirdStage.values.jetModel
                            ? bookForm.thirdStage.values.jetModel
                            : "Surprise me"
                        }}
                      </span>
                    </li>
                    <li>
                      <span>Number of people</span>
                      <span>
                        {{ bookForm.thirdStage.values.jetTravellers }}
                      </span>
                    </li>
                  </ul>
                  <ul v-if="bookForm.thirdStage.values.needHelicopter">
                    <li><h4>Private helicopter</h4></li>
                    <li>
                      <span>Model of helicopter</span>
                      <span>
                        {{
                          bookForm.thirdStage.values.helicopterModel
                            ? bookForm.thirdStage.values.helicopterModel
                            : "Surprise me"
                        }}
                      </span>
                    </li>
                    <li>
                      <span>Number of people</span>
                      <span>
                        {{ bookForm.thirdStage.values.helicopterTravellers }}
                      </span>
                    </li>
                  </ul>
                </div>
                <div
                  class="additional-services"
                  v-if="tripInfo && bookForm.thirdStage.confirmed === false">
                  <div
                    v-if="tripInfo.fullTripInfo.additionalServices.cars"
                    class="additional-service">
                    <Checkbox
                      class="additional-service__checkbox"
                      v-model="bookForm.thirdStage.values.needCar"
                      label="Supercar" />
                    <div
                      v-if="bookForm.thirdStage.values.needCar"
                      class="additional-service__content">
                      <SelectComponent
                        class="select-component"
                        id="book-trip-car"
                        label="Model of supercar"
                        placeholder="Surprise me"
                        v-model="bookForm.thirdStage.values.carModel"
                        :errorMessage="bookForm.thirdStage.errors.carModel"
                        @focus="bookForm.thirdStage.errors.carModel = null"
                        @click="bookForm.thirdStage.errors.carModel = null"
                        :options="
                          tripInfo.fullTripInfo.additionalServices.cars
                        "></SelectComponent>
                      <CheckboxSlide
                        v-model="bookForm.thirdStage.values.driver"
                        label="Driver" />
                    </div>
                  </div>
                  <div
                    v-if="tripInfo.fullTripInfo.additionalServices.boats"
                    class="additional-service">
                    <Checkbox
                      class="additional-service__checkbox"
                      v-model="bookForm.thirdStage.values.needBoat"
                      label="Yacht/Boats" />
                    <div
                      v-if="bookForm.thirdStage.values.needBoat"
                      class="additional-service__content">
                      <SelectComponent
                        class="select-component"
                        id="book-trip-boat"
                        label="Boat type"
                        placeholder="Surprise me"
                        v-model="bookForm.thirdStage.values.boatModel"
                        :errorMessage="bookForm.thirdStage.errors.boatModel"
                        @focus="bookForm.thirdStage.errors.boatModel = null"
                        @click="bookForm.thirdStage.errors.boatModel = null"
                        :options="
                          tripInfo.fullTripInfo.additionalServices.boats
                        "></SelectComponent>
                      <CheckboxSlide
                        v-model="bookForm.thirdStage.values.skipper"
                        label="Skipper" />
                    </div>
                  </div>
                  <div
                    v-if="tripInfo.fullTripInfo.additionalServices.jets"
                    class="additional-service">
                    <Checkbox
                      class="additional-service__checkbox"
                      v-model="bookForm.thirdStage.values.needJet"
                      label="Private jet" />
                    <div
                      v-if="bookForm.thirdStage.values.needJet"
                      class="additional-service__content">
                      <SelectComponent
                        class="select-component"
                        id="book-trip-travellers"
                        label="Number of people"
                        placeholder="Number of people"
                        v-model="bookForm.thirdStage.values.jetTravellers"
                        :errorMessage="bookForm.thirdStage.errors.jetTravellers"
                        @focus="bookForm.thirdStage.errors.jetTravellers = null"
                        @click="bookForm.thirdStage.errors.jetTravellers = null"
                        :options="[
                          '1',
                          '2',
                          '3',
                          '4',
                          '5',
                          '6',
                          '7',
                          '8',
                        ]"></SelectComponent>
                      <SelectComponent
                        class="select-component"
                        id="book-trip-jet"
                        label="Jet type"
                        placeholder="Surprise me"
                        v-model="bookForm.thirdStage.values.jetModel"
                        :errorMessage="bookForm.thirdStage.errors.jetModel"
                        @focus="bookForm.thirdStage.errors.jetModel = null"
                        @click="bookForm.thirdStage.errors.jetModel = null"
                        :options="
                          tripInfo.fullTripInfo.additionalServices.jets
                        "></SelectComponent>
                    </div>
                  </div>
                  <div
                    v-if="tripInfo.fullTripInfo.additionalServices.helicopters"
                    class="additional-service">
                    <Checkbox
                      class="additional-service__checkbox"
                      v-model="bookForm.thirdStage.values.needHelicopter"
                      label="Private helicopter" />
                    <div
                      v-if="bookForm.thirdStage.values.needHelicopter"
                      class="additional-service__content">
                      <SelectComponent
                        class="select-component"
                        id="book-trip-travellers"
                        label="Number of people"
                        placeholder="Number of people"
                        v-model="
                          bookForm.thirdStage.values.helicopterTravellers
                        "
                        :errorMessage="
                          bookForm.thirdStage.errors.helicopterTravellers
                        "
                        @focus="
                          bookForm.thirdStage.errors.helicopterTravellers = null
                        "
                        @click="
                          bookForm.thirdStage.errors.helicopterTravellers = null
                        "
                        :options="['1', '2', '3', '4']"></SelectComponent>
                      <SelectComponent
                        class="select-component"
                        id="book-trip-helicopter"
                        label="Helicopter type"
                        placeholder="Surprise me"
                        v-model="bookForm.thirdStage.values.helicopterModel"
                        :errorMessage="
                          bookForm.thirdStage.errors.helicopterModel
                        "
                        @focus="
                          bookForm.thirdStage.errors.helicopterModel = null
                        "
                        @click="
                          bookForm.thirdStage.errors.helicopterModel = null
                        "
                        :options="
                          tripInfo.fullTripInfo.additionalServices.helicopters
                        "></SelectComponent>
                    </div>
                  </div>
                  <h3
                    v-if="!tripInfo.fullTripInfo.additionalServices.length"
                    class="additional-services-empty">
                    There is no avaliable additional services
                  </h3>
                  <Input
                    type="textarea"
                    label="Special requests"
                    placeholder=""
                    v-model="bookForm.thirdStage.values.specialRequest"
                    id="Write your country"></Input>
                </div>
                <template v-if="bookForm.thirdStage.confirmed === false">
                  <img
                    class="trip-img"
                    v-if="tripInfo"
                    :src="tripInfo.fullTripInfo.bigImgSrc"
                    alt="trip image" />
                  <div class="confirm-block">
                    <ButtonBlack
                      class="request-button"
                      @click.prevent="
                        verifyThirdStage();
                        sendForm();
                      ">
                      <CrownDecoration></CrownDecoration>
                      <span>Book Now</span>
                    </ButtonBlack>
                    <div class="callback-buttons">
                      <router-link :to="{ name: 'home', hash: '#callback' }">
                        <ButtonTransparent>call me back</ButtonTransparent>
                      </router-link>
                      <router-link :to="{ name: 'home', hash: '#emailback' }">
                        <ButtonTransparent>email me back </ButtonTransparent>
                      </router-link>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div
              v-else
              class="book-trip-page__form-sent">
              <h2>
                Thank you for order! <br />
                We will call you!
              </h2>

              <router-link
                :to="{
                  name: 'home',
                }">
                <ButtonBlack>
                  <CrownDecoration></CrownDecoration>
                  <span>Home page</span>
                </ButtonBlack>
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import v8n from "v8n";

import Input from "@/components/formComponents/Input.vue";
import decoratedTitle from "@/components/DecoratedTitle.vue";
import ButtonTransparent from "@/components/formComponents/ButtonTransparent.vue";
import ButtonBlack from "@/components/formComponents/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";
import SelectComponent from "@/components/formComponents/Select.vue";
import DateInput from "@/components/formComponents/DateInput.vue";
import Checkbox from "@/components/formComponents/Checkbox.vue";
import CheckboxSlide from "@/components/formComponents/CheckboxSlide.vue";
import { mapStores } from "pinia";
import { useLuxTripStore } from "../store/index";

import ICalendar from "@/components/icons/ICalendar.vue";
import IRhombus from "@/components/icons/IRhombus.vue";
export default {
  components: {
    Input,
    decoratedTitle,
    ButtonTransparent,
    ButtonBlack,
    CrownDecoration,
    SelectComponent,
    DateInput,
    Checkbox,
    CheckboxSlide,
    IRhombus,
    ICalendar,
  },
  data() {
    return {
      // error: false,
      tripInfo: false,
      avaliableDates: [],
      possibleTravellers: [],
      formSent: false,
      bookForm: {
        firstStage: {
          confirmed: false,
          values: {
            country: null,
            city: null,
            date: null,
            travellers: null,
          },
          errors: {
            country: null,
            city: null,
            date: null,
            travellers: null,
          },
        },
        secondStage: {
          confirmed: null,
          values: {
            mainTraveler: {
              firstName: null,
              lastName: null,
              email: null,
              birthday: null,
              countryCode: null,
              phoneNumber: null,
            },
            additionTravellers: [],
          },
          errors: {
            mainTraveler: {
              firstName: null,
              lastName: null,
              email: null,
              birthday: null,
              countryCode: null,
              phoneNumber: null,
            },
            additionTravellers: [],
          },
        },
        thirdStage: {
          confirmed: null,
          needCar: false,
          needBoat: false,
          needJet: false,
          needHelicopter: false,
          values: {
            carModel: null,
            driver: false,
            boatModel: null,
            skipper: false,
            jetModel: null,
            jetTravellers: null,
            helicopterModel: null,
            helicopterTravellers: null,
          },
          errors: {
            carModel: null,
            driver: null,
            boatModel: null,
            skipper: null,
            jetModel: null,
            jetTravellers: null,
            helicopterModel: null,
            helicopterTravellers: null,
          },
        },
      },
    };
  },

  methods: {
    editForm(stage) {
      for (const key in this.bookForm) {
        if (key === stage) {
          this.bookForm[key].confirmed = false;
        } else if (this.bookForm[key].confirmed === false) {
          this.bookForm[key].confirmed = null;
        }
      }
    },
    async verifyFirstStage() {
      const firstStage = this.bookForm.firstStage;
      const secondStage = this.bookForm.secondStage;

      const firstStepSchema = v8n().schema({
        country: v8n().not.null().string().not.empty().minLength(1),
        city: v8n().not.null().string().not.empty().minLength(1),
        date: v8n().not.null().not.empty(),
        travellers: v8n().not.null().not.empty(),
      });
      if (
        +firstStage.values.travellers - 1 >
        secondStage.values.additionTravellers.length
      ) {
        for (
          let i = 0;
          i <
          +firstStage.values.travellers -
            secondStage.values.additionTravellers.length -
            1;
          i++
        ) {
          secondStage.values.additionTravellers.push({
            firstName: null,
            lastName: null,
            birthday: null,
            countryCode: null,
            phoneNumber: null,
          });
          secondStage.errors.additionTravellers.push({
            firstName: null,
            lastName: null,
            birthday: null,
            countryCode: null,
            phoneNumber: null,
          });
        }
      } else if (
        +firstStage.values.travellers - 1 <
        secondStage.values.additionTravellers.length
      ) {
        secondStage.values.additionTravellers =
          secondStage.values.additionTravellers.splice(
            0,
            +firstStage.values.travellers - 1
          );
        secondStage.errors.additionTravellers.splice(
          0,
          +firstStage.values.travellers - 1
        );
      }
      try {
        firstStepSchema.check(firstStage.values);
        firstStage.confirmed = true;
        secondStage.confirmed = false;
      } catch (error) {
        error.cause.forEach((e) => {
          let errorMessage = "";
          switch (e.rule.name) {
            case "null":
              errorMessage = "this field is required";
              break;
            case "empty":
              errorMessage = "this field is required";
              break;
            case "minLength":
              errorMessage = `min ${e.rule.args[0]} symbol`;
              break;
            default:
              errorMessage = "invalid value";
              break;
          }
          firstStage.errors[e.target] = errorMessage;
        });
        console.log(error);
      }
    },
    verifySecondStage() {
      const secondStage = this.bookForm.secondStage;
      const thirdStage = this.bookForm.thirdStage;

      const secondStepSchemaMainTraveler = v8n().schema({
        firstName: v8n().not.null().string().not.empty().minLength(1),
        lastName: v8n().not.null().string().not.empty().minLength(1),
        email: v8n().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        birthday: v8n().not.null(),
        countryCode: v8n().pattern(/^\+[0-9][0-9-]{0,4}[0-9]?$/),
        phoneNumber: v8n().pattern(/^[0-9][0-9-()\s]{5,20}[0-9]$/),
      });
      const secondStepSchemaAdditionalTraveler = v8n().schema({
        firstName: v8n().not.null().string().not.empty().minLength(1),
        lastName: v8n().not.null().string().not.empty().minLength(1),
        birthday: v8n().not.null(),
        countryCode: v8n().pattern(/^\+[0-9][0-9-]{0,4}[0-9]?$/),
        phoneNumber: v8n().pattern(/^[0-9][0-9-()\s]{5,20}[0-9]$/),
      });
      try {
        secondStepSchemaMainTraveler.check(secondStage.values.mainTraveler);
        if (!secondStage.values.additionTravellers.length) {
          secondStage.confirmed = true;
          thirdStage.confirmed = false;
          return;
        }
      } catch (error) {
        error.cause.forEach((e) => {
          let errorMessage = "";
          switch (e.rule.name) {
            case "null":
              errorMessage = "this field is required";
              break;
            case "empty":
              errorMessage = "this field is required";
              break;
            case "minLength":
              errorMessage = `min ${e.rule.args[0]} symbol`;
              break;
            case "pattern":
              switch (e.target) {
                case "email":
                  errorMessage = "please, check email format";
                  break;
                case "countryCode":
                  errorMessage = "invalid country code";
                  break;
                case "phoneNumber":
                  errorMessage = "invalid phone number";
                  break;
                default:
                  errorMessage = "invalid format";
                  break;
              }
              break;
            default:
              errorMessage = "invalid value";
              break;
          }
          secondStage.errors.mainTraveler[e.target] = errorMessage;
        });
        console.log(error);
      }

      let additionValidate = true;
      console.log(secondStage.values.additionTravellers);
      secondStage.values.additionTravellers.forEach((traveler, index) => {
        try {
          secondStepSchemaAdditionalTraveler.check(traveler);
        } catch (error) {
          additionValidate = false;
          error.cause.forEach((e) => {
            let errorMessage = "";
            switch (e.rule.name) {
              case "null":
                errorMessage = "this field is required";
                break;
              case "minLength":
                errorMessage = `min ${e.rule.args[0]} symbol`;
                break;
              case "empty":
                errorMessage = "this field is required";
                break;
              case "pattern":
                switch (e.target) {
                  case "countryCode":
                    errorMessage = "invalid country code";
                    break;
                  case "phoneNumber":
                    errorMessage = "invalid phone number";
                    break;
                  default:
                    errorMessage = "invalid format";
                    break;
                }
                break;
              default:
                errorMessage = "invalid value";
                break;
            }
            secondStage.errors.additionTravellers[index][e.target] =
              errorMessage;
          });
        }
        if (additionValidate) {
          secondStage.confirmed = true;
          thirdStage.confirmed = false;
        }
      });
    },
    verifyThirdStage() {
      // const secondStage = this.bookForm.secondStage;
      const thirdStage = this.bookForm.thirdStage;
      const carSchema = { carModel: v8n(), driver: v8n() };
      const boatSchema = { boatModel: v8n(), skipper: v8n() };
      const jetSchema = {
        jetModel: v8n(),
        jetTravellers: v8n().not.null().not.empty(),
      };
      const helicopterSchema = {
        helicopterModel: v8n(),
        helicopterTravellers: v8n().not.null().not.empty(),
      };
      let thirdStageSchema = {};
      if (thirdStage.values.needCar) {
        thirdStageSchema = { ...carSchema };
      }
      if (thirdStage.values.needBoat) {
        thirdStageSchema = { ...thirdStageSchema, ...boatSchema };
      }
      if (thirdStage.values.needJet) {
        thirdStageSchema = { ...thirdStageSchema, ...jetSchema };
      }
      if (thirdStage.values.needHelicopter) {
        thirdStageSchema = {
          ...thirdStageSchema,
          ...helicopterSchema,
        };
      }
      console.log(thirdStageSchema);
      thirdStageSchema = v8n().schema(thirdStageSchema);
      try {
        thirdStageSchema.check(thirdStage.values);
        console.log("3 stage confirmed");
        thirdStage.confirmed = true;
      } catch (error) {
        console.log(error);
        error.cause.forEach((e) => {
          let errorMessage = "";
          switch (e.rule.name) {
            case "null":
              errorMessage = "this field is required";
              break;
            case "empty":
              errorMessage = "this field is required";
              break;
            default:
              errorMessage = "invalid value";
              break;
          }
          thirdStage.errors[e.target] = errorMessage;
        });
        console.log(error);
      }
    },
    sendForm() {
      this.formSent = Object.entries(this.bookForm).every(
        (stage) => stage[1].confirmed === true
      );
    },
    async getFullTripInfo() {
      this.tripInfo = null;
      await this.luxTripStore.getDetailsAboutTrip(this.$route.params.id);
      this.tripInfo = this.luxTripStore.trips.find(
        (trip) => trip.id === this.$route.params.id
      );
      console.log(this.tripInfo);
    },
    getAvaliableDates() {
      if (!Array.isArray(this.tripInfo.date)) {
        let date = new Date(this.tripInfo.date.seconds * 1000);
        const day = date.getUTCDate();
        const month =
          date.getMonth() < 9
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        const year = date.getFullYear();
        this.avaliableDates = [`${day}-${month}-${year}`];
      } else {
        this.avaliableDates = this.tripInfo.date.map((date) => {
          date = new Date(date.seconds * 1000);
          const day = date.getUTCDate();
          const month =
            date.getMonth() < 9
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1;
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        });
      }
    },
    getTravellers() {
      for (let i = 0; i < this.tripInfo.travellers; i++) {
        this.possibleTravellers.push(String(i + 1));
      }
    },
  },
  computed: {
    ...mapStores(useLuxTripStore),
  },
  async mounted() {
    try {
      await this.getFullTripInfo();
      this.getAvaliableDates();
      this.getTravellers();
    } catch (e) {
      // write state for error
      // this.error = true;
      console.log(e);
    }
  },
};
</script>
<style lang="scss">
.book-trip-page {
  .container {
    max-width: 770px;
  }
  &__form {
    position: relative;
    padding: 40px 20px;
    margin-top: 80px;

    &-content {
      margin: 0 auto;
      max-width: 450px;
    }
    h3 {
      padding: 0 30px;
      margin-bottom: 20px;
      font-size: 32px;
      line-height: 35px;
      font-weight: 400;
    }
    .trip-img {
      max-width: 100%;
      border-radius: 10px;
      margin-top: 40px;
    }
    &-sent {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      h2 {
        margin-bottom: 40px;
      }
    }
  }
  .form-step {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    &__edit-button {
      color: var(--grey);
      font-size: 16px;
      line-height: 18px;
      vertical-align: middle;
      margin-left: 20px;
      cursor: pointer;
    }
    &-edit {
      & > :not(:last-child) {
        margin-bottom: 20px;
      }
      .wrap-inputs {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        align-items: flex-end;
        & > * {
          flex: 1 1 200px;
        }
      }
    }
    &-confirmed {
      font-size: 18px;
      line-height: 25px;
      padding: 0 0 0 20px;
      ul:not(:last-of-type) {
        margin-bottom: 20px;
      }
      li {
        display: flex;
        flex-wrap: wrap;
        column-gap: 20px;
        &:not(:last-of-type) {
          margin-bottom: 20px;
        }
        span:first-of-type {
          font-weight: 500;
          display: inline-block;
        }
        span {
          flex: 0 1 200px;
          font-family: var(--manrope);
        }
      }
    }
    .additional-service {
      padding: 0 30px;
      margin-bottom: 20px;
      &__content {
        margin-top: 20px;
        & > :not(:last-child) {
          margin-bottom: 20px;
        }
      }
      &s-empty {
        font-size: 24px;
        line-height: 26px;
      }
    }
  }
  .confirm-block {
    padding: 70px 0px 0px 0px;
    .callback-buttons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      a {
        flex: 1 1 150px;
      }
      &::before {
        content: "or";
        text-transform: uppercase;
        text-align: center;
        display: block;
        flex: 1 1 100%;
        font-size: 16px;
        line-height: 18px;
        color: var(--black-main);
      }
    }
    .request-button {
      margin-bottom: 30px;
    }
  }
  .next-step-button {
    font-size: 24px;
    height: 55px;
    padding: 10px 50px;
    width: auto;
  }
}
@media (min-width: 768px) {
  .book-trip-page {
    &__form {
      padding: 80px 30px;
      margin-top: 120px;
    }
    .form-step {
      &:not(:last-child) {
        margin-bottom: 30px;
      }
      .date-input-component {
        max-width: 50%;
      }
      &-confirmed {
        padding: 0 0 0 30px;
      }
    }
  }
}
</style>
