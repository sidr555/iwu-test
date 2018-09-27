
var countrySuggest = require("./components/country-suggest.vue");

new Vue({
    el: '#app',
    components: {
        countrySuggest: countrySuggest
    },
    data: {
        title: "Страны"
    },
    mounted: function() {
        this.$on("selectCountry", function(event, b) {
            console.log(event, b);

        });
    }
});

