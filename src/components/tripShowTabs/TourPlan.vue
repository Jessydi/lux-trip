<template>
  <div class="tour-plan">
    <h3>Luxury Tour Plan</h3>
    <div
      class="days"
      ref="tourPlan">
      <div
        v-for="(day, index) in tourPlanObject"
        :key="index"
        class="day">
        <div class="day__number">
          <span>{{ index + 1 }}</span
          ><IRhombus class="day__rhombus"></IRhombus>
        </div>
        <div class="day__content">
          <h3 class="day__title">{{ day.dayPlanTitle }}</h3>
          <div class="day__description">
            {{ day.dayPlan }}
            <ul class="included-list">
              <li
                v-for="(included, index) in day.included"
                :key="index">
                <IIncluded></IIncluded>{{ included }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <ButtonBlack
      class="button-pdf"
      @click="generatePdf">
      <CrownDecoration></CrownDecoration>
      <span>download pdf</span></ButtonBlack
    >
  </div>
</template>
<script>
import jsPDF from "jspdf";

import ButtonBlack from "@/components/formComponents/ButtonBlack.vue";
import CrownDecoration from "@/components/CrownDecoration.vue";

import IIncluded from "@/components/icons/IIncluded.vue";
import IRhombus from "@/components/icons/IRhombus.vue";
export default {
  components: {
    ButtonBlack,
    IRhombus,
    CrownDecoration,
    IIncluded,
  },
  methods: {
    generatePdf() {
      // need to refactor later
      var pdf = new jsPDF("p", "pt", "A4"),
        sizes = [30, 20],
        fonts = [
          ["Helvetica", ""],
          ["Times", "Italic"],
        ],
        font,
        size,
        lines,
        verticalOffset = 40,
        margin = 20;

      this.tourPlanObject.forEach((day, index) => {
        font = fonts[0];
        size = sizes[0];

        lines = pdf
          .setFont(font[0], font[1])
          .setFontSize(size)
          .splitTextToSize(String(index + 1) + ". " + day.dayPlanTitle, 500);
        if (verticalOffset + lines.length * size > 820) {
          pdf.addPage();
          verticalOffset = 40;
        }
        pdf.text(20, verticalOffset, lines);
        verticalOffset += lines.length * size + margin;

        font = fonts[1];
        size = sizes[1];
        lines = pdf
          .setFont(font[0], font[1])
          .setFontSize(size)
          .splitTextToSize(day.dayPlan, 500);
        if (verticalOffset + lines.length * size > 820) {
          pdf.addPage();

          verticalOffset = 40;
        }
        pdf.text(20, verticalOffset, lines);
        verticalOffset += lines.length * size + margin;

        if (day.included.length > 0) {
          day.included.forEach((includedItem) => {
            lines = pdf
              .setFont(font[0], font[1])
              .setFontSize(size)
              .splitTextToSize("+" + " " + includedItem, 500);

            if (verticalOffset + lines.length * size > 820) {
              pdf.addPage();
              verticalOffset = 40;
            }
            pdf.text(20, verticalOffset, lines);
            verticalOffset += lines.length * size + margin;
          });
        }
        verticalOffset += margin;
      });

      pdf.save(this.name.replace(" ", "") + "Plan");
    },
  },
  props: {
    tourPlanObject: { type: Object, require: true },
    name: { type: String, require: true },
  },
};
</script>
<style lang="scss">
.tour-plan {
  .days {
    margin-bottom: 60px;
  }
  .day {
    display: grid;
    grid-template-columns: auto 1fr;
    overflow: hidden;
    margin-bottom: -3px;
    &:not(:last-child) {
      .day__number::after {
        content: "";
        position: absolute;
        height: 1000px;
        width: 1px;
        translate: -50% -4px;
        left: 50%;
        top: 100%;
        background-color: var(--grey);
      }
      padding-bottom: 40px;
    }
    &__content {
      margin-left: 30px;
    }
    &__number {
      font-size: 24px;
      line-height: 24px;
      position: relative;
      height: fit-content;
      span {
        position: absolute;
        translate: -50% -50%;
        left: 50%;
        top: 50%;
      }
    }
    &__rhombus {
      width: 38px;
      height: auto;
      stroke-width: 4;
      path {
        stroke: var(--grey);
      }
    }
    &__title {
      font-size: 30px;
      line-height: 32px;
      margin-bottom: 15px;
      font-weight: normal;
    }

    &__description {
      font-family: var(--manrope);
      font-size: 16px;
      line-height: 24px;
      .included-list {
        margin-top: 15px;
      }
    }
  }
}
@media (min-width: 768px) {
  .tour-plan {
    .button-pdf {
      max-width: 255px;
      margin: 0 auto;
    }
    .days {
      margin-bottom: 80px;
    }
    .day {
      &__content {
        display: flex;
      }
      &__number {
        font-size: 41px;
        line-height: 41px;
      }
      &__title {
        font-size: 40px;
        line-height: 40px;
        margin: 30px 15px 0 0;
        flex: 0 0 250px;
      }
      &__rhombus {
        width: 66px;
      }
      &__description {
        font-size: 18px;
        line-height: 36px;
      }
    }
  }
}
</style>
