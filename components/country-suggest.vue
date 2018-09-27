<template id="country-suggest-template">
    <div class="country-suggest">
        <!--<input class="dropdown" type="text" placeholder="Выбери страну" v-model="{{ query }}" @keyup.prevent="onKeyUp"/>
        v-bind:query="query"
        v-bind:data-id="country.alpha2Code"
         -->
        <h2>{{ title }}</h2>
        <div>apiURL: {{apiUrl}}</div>
        <!--<input class="dropdown" type="text" v-bind:value="query" v-bind:placeholder="placeholder" @keyup.prevent="onKeyUp"/>-->
        <input class="dropdown" type="text" v-model="country.name" :placeholder="placeholder" @keyup.prevent="onKeyUp"/>

        <ul class="dropdown" v-show="showDropDown">
            <li v-for="country in countries" @click="select(country.code)" :data-id="country.code">
                <img class="dropdown-flag" :src="country.flag"/>
                <span class="dropdown-title">{{ country.name }}</span>
            </li>
        </ul>
        <pre>{{ $data }}</pre>
    </div>

</template>

<script>
    var VueResource = require("vue-resource");
    var VueSelect = require("vue-select");
    Vue.use(VueResource);
    Vue.use(VueSelect);

    module.exports = {
        template: "#country-suggest-template",
        props: [
            "title",
            "placeholder",
            "apiUrl",
            "flagField",
        ],
        data: function() {
            return {
                query: "rus",
                showDropDown: false,
                country: {
                    name: ""
                },
                countries: []
            }
        },
        computed: {
            resource: function() {
                return this.$resource(this.apiUrl);
            },
            // preparedCountries: function() {
            //     var flagField = this.flagField;
            //     var flagFn = typeof this.flagField === "function" ? flagField : function(country) {
            //         return country[flagField];
            //     };
            //     var countries = this.countries.reduce(function (collection, country) {
            //         collection.push({
            //             name: country.name + " !!",
            //             flag: flagFn(country)
            //         });
            //         return collection;
            //     }, []);
            //
            //     console.log("preparedCountries", countries);
            //
            //     return countries;
            //
            //
            //      //
            //      // return this.countries.sort(function(a,b) {
            //      //     return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
            //      // })
            // }
        },
        methods: {
            onKeyUp: function(event) {
                event.preventDefault();
                console.log(this, event.key, this.query);
                //emit('input', event.target.value)
                switch (event.key) {
                    case "Enter":
                        return this.onEnter();
                    case "Escape":
                        return this.reset();
                    default:
                        console.log(this.country)
                        //this.showDropDown = this.query !== "";
                        this.getCountries(this.country.name);
                }
            },
            onEnter: function() {
                //alert("enter")

            },
            reset: function() {
                this.countries = [];
                this.country = {};
                this.showDropDown = false;

            },
            //onSelect: function(event) {
            select: function(code) {
                var i = 0;
                for (;i<this.countries.length;i++) {
                    if (this.countries[i].code === code) {
                        this.country = this.countries[i];
                    }
                }

                //this.$emit("selectCountry", this.country);

                // this.countries.forEach(function(country){
                //     if (country.name === event.target.textContent) {
                //         this.country = country;
                //     }
                //     //console.log(country.name)
                // });


                // var id = $(event.target).closest("li").data("id");
                // var country = this.countries[id];
                // console.log("selected ", id, this.countries[id]);
                // //this.query = country.name;

            },
            getFlag: function(country) {
                if (typeof this.flagField === "function") {
                    return this.flagField(country);
                } else if (typeof country[this.flagField] !== 'undefined') {
                    return country[this.flagField];
                }
                return '';
            },
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
                                    flag: flagFn(country)
                                });
                                return collection;
                            }, []);

                            this.showDropDown = true;

                            //console.log("preparedCountries", this.countries);
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

    ul.dropdown li:last-child {
        border-bottom: none;
    }

    ul.dropdown li:hover {
        background-color: #3c4dab;
        color: white;
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