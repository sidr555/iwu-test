
var countrySuggest = require("./components/country-suggest.vue");

new Vue({
    el: '#app',
    components: {
        countrySuggest: countrySuggest
    },
    data: {
        title: "Country suggest"
    },
    methods: {
        /**
         * Обработчик события выбора элемента в списке стран
         * @param object country
         */
        onSelect: function(country) {
            alert(country.name + " is selected");
        },
        /**
         * Кастомная функция для возврата параметра флага из объекта страны
         * @param object country
         * @returns string
         */
        getFlag: function(country) {
            return country.flag;
        }
    }
});

