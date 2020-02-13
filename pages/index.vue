<template>
  <v-layout column justify-center align-center >
    <div class="d-flex align-center justify-space-between wrapper"  >
      <v-dialog  v-model="dialog" persistent width="50%">
        <template v-slot:activator="{on}">
          <v-btn class="green darken-1 topHeader" color="primary" v-on="on">Add City</v-btn>
        </template>
        <v-card class="pa-3">
          <v-form>
            <v-text-field
                    label="Имя города"
                    v-model="addCity.name">
            </v-text-field>
            <v-text-field
                    label="Скорость(м/с) и направление ветра"
                    v-model="addCity.wide">
            </v-text-field>
            <v-text-field
                    label="Температура воздуха(°C)"
                    v-model="addCity.temperature"
                    type="number">
            </v-text-field>
            <v-text-field
                    label="Давление(гПа)"
                    v-model="addCity.pressure"
                    type="number">
            </v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary"
                     @click="save"
              >Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <div class="topHeader">Total Count: {{info.length}}</div>
    </div>
    <div v-if="!isFetching && cities!==null" class="wrapper">
      <v-card class="ma-2 blue lighten-5 wrapper"
              v-for="(city, index) in currentData"
              :key="index"
              >
        <City :city="city"
              @removeCity="removeCity"/>
      </v-card>
      <div class="pagination" v-if="this.info.length">
        <v-pagination
                v-model="page"
                :length="length"
                :total-visible="5"
        ></v-pagination>
      </div>
      <h2 v-else> Нет городов</h2>
    </div>
    <div v-else class="lds-center">
      <div class="lds-dual-ring"></div>
    </div>
  </v-layout>
</template>
<script>
import City from '../components/City'
import { mapState } from 'vuex';
export default {
  data: () => ({
    dialog: false,
    disable: true,
    addCity: {
      name: null,
      wide: null,
      temperature: null,
      pressure: null
    },
    info: [],
    pageSize: 2,
    currentData: [],
    length: null,
    page: 1
  }),
  computed: mapState(['isFetching', 'cities']),
  watch: {
    page: function () { this.getCurrentData() },
  },
  components: { City },
   async mounted () {
     await  this.$store.dispatch('CitiesInfo')
     this.info = [...this.$store.getters['cities']]
     this.getCurrentData()
  },
  methods: {
    removeCity (id) {
      const buffInfo = [...this.info];
      let removeIndex = buffInfo.findIndex(x => x.id === id);
      buffInfo.splice(removeIndex,1)
      this.info = buffInfo;

      this.$store.dispatch('CitiesInfo', buffInfo)

      this.getCurrentData()
      if(this.currentData.length === 0){
        this.page--
      }
    },
    getCurrentData () {
      this.length = Math.ceil(this.info.length / this.pageSize)
      const index = (this.page - 1) * this.pageSize
      this.currentData = [...this.info].splice(index, this.pageSize)
    },
    save () {
      const buffInfo = [...this.info];
      const buffItem = {...this.addCity};
      buffItem.id =  '_' + Math.random().toString(36).substr(2, 9)
      buffInfo.push(buffItem);
      this.info = buffInfo;

      this.$store.dispatch('CitiesInfo', buffInfo)
      this.getCurrentData()

      this.addCity = {}
      this.dialog = false;
    }
  }
}
</script>
<style>
  .wrapper{
    width: 100%;
  }
  .topHeader{
    flex: none!important;
  }
  .pagination{
    display: flex;
    justify-content: center;
  }

  .lds-center{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #2bbbad;
    border-color: #2bbbad #2bbbad #2bbbad transparent;
    animation: lds-dual-ring 0.8s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }


</style>
