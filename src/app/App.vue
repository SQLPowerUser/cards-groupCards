<template>
    <div class="container">
        <div class="container-toolbar">
            <p class="container-toolbar-legend">Фильтры</p>
            <div class="container-toolbar-card-search">
                Название карточки:&#160;
                <input type="text" class="container-toolbar-search-text">
            </div>
            <div class="container-toolbar-card-state">
                Статус:&#160;
                <label class="mr12"> <input type="radio" name="card-state" checked> <span>любой</span> </label>
                <label class="mr12"> <input type="radio" name="card-state"> <span>выполнено</span> </label>
                <label class="mr12"> <input type="radio" name="card-state"> <span>невыполнено</span> </label>
            </div>
        </div>

        <Card
            v-for="(arrValues, category) in cards"
            :key="category" :notes="arrValues"
            :caption="category"
        ></Card>

        <router-view name="fogOver"></router-view>
        <router-view name="editCard"></router-view>
    </div>
    <!-- class="container" -->
</template>

<script>
import Card from "./components/card.vue";
import EditCard from "./components/editCard.vue";
import FogOver from "./components/fogOver.vue";

export default {
    computed: {
        cards() {
            return this.$store.state.cards;
        },
    },

    components: {
        Card,
        EditCard,
        FogOver,
    },
};
</script>
