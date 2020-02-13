<template>
<v-flex class="pa-3">
    <div>
        <h1>{{city.name}}</h1>
        <ul>
            <li>Скорость(м/с) и направление ветра: {{city.wind}}</li>
            <li>Температура воздуха: {{city.temperature}} °C</li>
            <li>Давление: {{city.pressure}} гПа</li>
        </ul>
    </div>
    <div>
        <v-btn color="warning" @click="removeCity" >Delete</v-btn>
    </div>
</v-flex>
</template>
<script>
export default {
  props: ['city', 'index'],
 methods: {
     removeCity: function() {
         this.$emit('removeCity', this.city.id)
     }
 }
}
</script>
