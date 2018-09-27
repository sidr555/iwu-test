# iwu-test
some test work for IWU

## Установка
```
# git clone https://github.com/sidr555/iwu-test.git .
# npm install
```


#### Задание 1
> Реализовать функцию checkBraces($str), проверяющую на синтаксическую верность последовательность скобок

- Решение в braces.js
- Тесты в braces.test.js

```
# npm run test
```



#### Задание 2
> Реализовать функцию, создающую глубокую копию (deep copy) объекта без использования JSON.stringify

- Решение через дополнение прототипа объекта функцией deepClone в скрипте deep_clone.js
- Тесты в deep_clone.test.js. В тестах использовал JSON.stringify для проверки идентичности данных клона, в задании запрета на это не было )

```
# npm run test
```

#### Задание 3
> Рефакторинг

- В файле func.js. Тестов не писал )

##### Практическое задание
Разработать компонент Country Suggest: компонент подсказки названия страны с флагами

DocumentRoot вебсервера необходимо настроить в директорию www

Собрать проект 
> npm run build

- components/country-suggest.vue (исходный код компонента списка стран)
- main.js (исходный код основного скрипта, отвечающего за загрузку компонента и инициализацию контейнера)
- www/index.html (основная разметка)
- www/app.js (собранный до кучи посредством browserify скрипт)
 
 
###### Примеры использования компонента

```
   <country-suggest
       :title="title"
       placeholder="Выбери страну"
       api-url="https://restcountries.eu/rest/v2/name/{name}"
       :flag-field="getFlag"
       @select="onSelect">
   </country-suggest>
```

В данном примере title передается от вызывающего контейнера

задается URL для получения JSON со списком стран

задается функция для поиска поля с флагом, определенная в методе контейнера getFlag

устанавливается обработчик события выбора элемента списка, в качестве параметра возвращается объект {name: "Название страны",flag:"URL флага",code:"двухсимвольный код"}  

в api-url вместо {name} подставляется значение строки поиска   


```
   <country-suggest
       title="Страна"
       placeholder="Выбери страну"
       api-url="https://restcountries.eu/rest/v2/name/{name}"
       flag-field="globFlag"
       @select="onSelect">
   </country-suggest>
```
В данном примере title задается явно

Для определения параметра с флагом используется глобальная функция globFlag


```
   <country-suggest
       :title="title"
       placeholder="Выбери страну"
       api-url="https://restcountries.eu/rest/v2/name/{name}"
       flag-field="flag"
       @select="onSelect">
   </country-suggest>
```
Здесь указано свойство объекта полученной по API записи страны, в котором хранится URL флага



```
   <script>
        var countrySuggest = require("./components/country-suggest.vue");
       
        new Vue({
            el: '#app',
            components: {
                countrySuggest: countrySuggest
            },
            methods: {
                onSelect: function(country) {
                    alert(country.name + " is selected");
                }
            }
        });
   </script>
```

