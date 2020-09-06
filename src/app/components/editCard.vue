<template>
  <div class="edit-card">
    <div class="edit-card-caption">
      <textarea
        class="edit-card__textarea--caption"
        placeholder="Введите текст карточки"
        v-model="cardText"
      ></textarea>
      <p
        class="edit-card__btn-close"
        @click="closeEditCard"
      >
        <svg width="14" height="14">
          <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#626262"/>
        </svg>
      </p>
    </div> <!-- class="edit-card-caption" -->

    <textarea
      class="edit-card__textarea--description"
      placeholder="Описание"
      v-model="description"
    ></textarea>

    <p
      class="edit-card__btn-update"
      @click="updateNote"
    >
      Сохранить
    </p>
  </div> <!-- class="edit-card" -->
</template>


<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      cardText: '',
      description: ''
    }
  }, // data

  computed: {
    ...mapState([
      'cards',
      'category',
      'currentId'
    ])
  },

beforeRouteEnter (to, from, next) {
    next(that => {
      if (!that.category) {
        window.history.back();
        return false;
      }
      let row = that.cards[that.category][that.currentId];
      that.cardText    = row.text || '';
      that.description = row.description || '';
    });
  },

  methods: {
    updateNote(caption) {
      let cardText = this.cardText.trim();
      if (!cardText) {return;}
      let description = this.description.trim();

      this.$store.commit({
        type: 'updateNote',
        text: cardText,
        description: description
      });
      
      this.closeEditCard();
    }, // updateNote

    closeEditCard() {      
      this.$router.go(-1);
    }
  }, // methods

  name: 'EditCard',
  props: {
    caption: String,
    notes: Array
  }
}
</script>


<style>
@import '../styles/_vars.scss';

.edit-card {
  position: absolute;
  width: 600px;
  height: 244px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  margin: 38px auto;
  padding: 16px 16px 13px 16px;
  background: $background-card;
  border-radius: 5px;
  color: $color-field-text;
  z-index: 2;
}

.edit-card-caption {
  display: flex;
}

.edit-card__btn-close {
  margin-left: 13px;
  height: 14px;
  text-align: right;
  cursor: pointer;
}

.edit-card__textarea--caption {
  font-size: 24px;
  margin: 0;
  height: 64px;
  border-width: 2px 4px;
}

.edit-card__textarea--description {
  height: 96px;
  //margin-bottom: 16px;
}

.edit-card__btn-update {
  @include btn(99px, 32px, $color-btn-save, $background-btn-save, $background-btn-save);
}
</style>
