<template>
  <div class="card">
    <p class="card-caption">&#9660; {{ caption }}</p>

    <ul>
      <li class="card-item img-edit" v-for="(note, idx) in notes">
        {{ note.text }}

        <p
          class="card-item__btn-edit img-edit"
          @click="showEditCard(caption, idx)"
        ></p>
      </li>
    </ul>

    <p
      class="card__btn-add"
      @click="showBlockAdd = true"
      v-show="!showBlockAdd"
    >
      <svg width="27" height="14">
        <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#626262" />
      </svg>
      Добавить ещё одну карточку
    </p>

    <div class="card-add-block" v-show="showBlockAdd">
      <textarea
        class="card-add-block__textarea"
        placeholder="Введите текст карточки"
        v-model="newText"
        @keyup.enter="addNote(caption)"
      ></textarea>

      <div class="card-add-block__btns">
        <p class="card-add-block__btn-save" @click="addNote(caption)">
          Добавить карточку
        </p>

        <p class="card-add-block__btn-cancel" @click="showBlockAdd = false">
          <svg width="27" height="14">
            <path
              d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
              fill="#626262"
            />
          </svg>
          Отмена
        </p>
      </div>
      <!-- class="card-add-block__btns" -->
    </div>
    <!-- class="card-add-block" -->
  </div>
  <!-- class="card" -->
</template>

<script>
export default {
  data() {
    return {
      newText: "",
      showBlockAdd: false,
    };
  }, // data

  methods: {
    addNote(caption) {
      let txt = this.newText.trim();
      this.newText = "";
      if (!txt) {
        return;
      }

      this.$store.commit({
        type: "addNote",
        category: caption,
        text: txt,
      });
    }, // addNote

    showEditCard(caption, idx) {
      this.$store.commit({
        type: "setCurrentRecord",
        category: caption,
        currentId: idx,
      });

      this.$router.push("edit");
    }, // showEditCard
  }, // methods

  name: "Card",
  props: {
    caption: String,
    notes: Array,
  },
};
</script>

<style>
@import "../styles/_vars.scss";

.card {
  margin-top: 10px;
  padding: 12px 12px 8px 12px;
  background: $background-card;
  border-radius: 5px;
  color: $color-field-text;
  align-self: flex-start;
}

.card-caption {
  color: $color-caption;
}

.card-item {
  position: relative;
  @include card-item;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.card-item__btn-edit {
  position: absolute;
  margin: auto 0 auto auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: none;
}

.card-item:hover .card-item__btn-edit {
  display: block;
}

.card__btn-add {
  @include btn(256px, 32px, $color-btn-default, transparent, #c4c4c4);
}

.card-add-block__textarea {
  margin-top: 0;
  max-height: 52px;
}

.card-add-block__btns {
  display: flex;
  justify-content: space-between;
}

.card-add-block__btn-save {
  @include btn(
    160px,
    32px,
    $color-btn-save,
    $background-btn-save,
    $background-btn-save
  );
}

.card-add-block__btn-cancel {
  @include btn(108px, 32px, $color-btn-default, transparent, #c4c4c4);
}
</style>
