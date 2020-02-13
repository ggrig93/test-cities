import axios from 'axios'
export const state = () => ({ cities: null, isFetching: false })
export const getters = { cities: s => s.cities }
export const mutations = {
  setInfo (state, cities) { state.cities = cities },
  startFetching (state) { state.isFetching = true },
  endFetching (state) { state.isFetching = false }
}
export const actions = {
  async CitiesInfo ({ commit }, data = false) {
    if (data) {
      commit('setInfo', data)
    } else {
      commit('startFetching')
      await axios.get('/data.json')
          .then(response => {
            commit('setInfo', response.data)
            commit('endFetching')
          })
    }
  }
}

