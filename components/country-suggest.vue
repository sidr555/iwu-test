<template id="country-suggest-template">
    <div class="country-suggest">

        <h2>{{ title }}</h2>

        <input class="dropdown" type="text" v-model="country.name" :placeholder="placeholder" @keyup.prevent="onKeyUp" @focus="onFocus"/>

        <ul class="dropdown" v-show="showDropDown">
            <li v-for="(country, index) in countries" @click="select(index)" :data-id="country.code" :country="country" :class="{active: country.active}">
                <img class="dropdown-flag" :src="country.flag"/>
                <span class="dropdown-title">{{ country.name }}</span>
            </li>
        </ul>
    </div>
</template>


<script>
    var VueResource = require("vue-resource");
    Vue.use(VueResource);

    module.exports = {
        template: "#country-suggest-template",
        props: [
            "title",
            "placeholder",
            "apiUrl",
            "flagField",
            "debug"
        ],
        data: function() {
            return {
                country: {name:''},
                countries: [],
                activeIndex: -1,
                showDropDown: false,
            }
        },
        computed: {
            resource: function() {
                return this.$resource(this.apiUrl);
            },
        },
        methods: {
            /**
             * Обработка нажатия клавиш
             */
            onKeyUp: function(event) {
                switch (event.key) {
                    case "Escape":
                        return this.reset();
                    case "ArrowDown":
                        if (this.showDropDown && this.countries.length) {
                            this.select(this.activeIndex + 1);
                        }
                        break;

                    case "ArrowUp":
                        if (this.showDropDown && this.countries.length && this.activeIndex > 0) {
                            this.select(this.activeIndex - 1);
                        }
                        break;
                    default:
                        //console.log(this.country);
                        this.getCountries(this.country.name);
                }
            },
            /**
             * Обработка фокуса на поле поиска
             */
            onFocus: function(event) {
                event.target.select();
                this.showDropDown = false;
            },
            /**
             * Сбрасывает список о очищает поле поиска
             */
            reset: function() {
                this.countries = [];
                this.country = {};
                this.showDropDown = false;
                this.activeIndex = -1;

            },

            /**
             * Отмечает активным элемент с указанным индексом в списке
             * и генерит событие select
             */
            select: function(index) {
                if (this.country) {
                    this.country.active = false;
                }

                this.country = this.countries[index];
                this.country.active = true;
                this.activeIndex = index;

                this.$emit("select", this.country);

            },
            /**
             * Вернуть значение флага в соответствии с типом переданного компоненту
             * параметра flagField: поле, глобальная функция, vue-метод
             * @param object country
             * @returns {*}
             */
            getFlag: function(country) {
                if (typeof this.flagField === "function") {
                    return this.flagField(country);
                } else if (typeof window[this.flagField] === "function") {
                    return window[this.flagField](country);
                } else if (typeof country[this.flagField] !== 'undefined') {
                    return country[this.flagField];
                }
                return '';
            },

            /**
             * Грузит страны по API
             * @param string query
             */
            getCountries: function(query) {
                query = query.trim();
                if (query === "") {
                    this.reset();
                } else {
                    this.resource.get({name: query}).then(function(response){
                        if (response.body && response.body.length) {
                            var flagFn = this.getFlag;
                            this.countries = response.body.reduce(function (collection, country) {
                                collection.push({
                                    code: country.alpha2Code,
                                    name: country.name,
                                    flag: flagFn(country),
                                    active: false
                                });
                                return collection;
                            }, []);

                            this.showDropDown = true;
                        }
                    }).catch(function(err){
                        //console.log(err);
                    });
                }
            }
        },
        created: function() {
            if (this.country.name !== "") {
                this.getCountries(this.country.name);
            }
        }
    }
</script>

<style>
    input.dropdown {
        width: 220px;
        height: 30px;
        padding: 6px 10px;
        border-radius: 5px;
    }

    ul.dropdown {
        list-style: none;
        width: 240px;
        height: 400px;
        overflow-y: scroll;
        background-color: #fff;
        padding: 6px 0;
        border-radius: 5px;
        position: relative;
        top: -13px;
        left: 5px;
    }

    ul.dropdown li {
        display: block;
        padding: 10px 30px;
    }
    ul.dropdown li:hover {
        background-color: #9ba3ab;
        color: white;
    }

    ul.dropdown li.active {
        background-color: #5277ab;
        color: white;
    }
    ul.dropdown li.active:hover {
        background-color: #5277ab;
        color: white;
    }

    ul.dropdown li:last-child {
        border-bottom: none;
    }


    img.dropdown-flag {
        width: 30px;
        height: 20px;
        vertical-align: middle;
        border: 1px solid #8a8a8a;
    }

    .dropdown-title {
        height: 20px;
    }

</style>