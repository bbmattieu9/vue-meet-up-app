import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'


Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://www.roadscholar.org//imagevault/publishedmedia/4h5bgajqu8x6mpat8pu8/22183-intergenerational-adventure-berlin-germany-bode-museum-lghoz.jpg',
       id: 'romeIT',
       title: 'Meet up Italy',
       date: new Date().toJSON(),
       location: 'Rome Italy',
       description: 'Time to MeetUp under the wonderful sunset of Rome'
      },

      {
        imageUrl: 'https://www.gettingstamped.com/wp-content/uploads/2016/11/Hong-Kong-Travel-Tips-Hong-Kong-Skyline-1-800x450.jpg',
       id: 'hongkongHk',
        title:'Meet up Hong Kong',
        date: new Date().toJSON(),
        location: 'Hong Kong',
        description: 'Hong Kong is where to meet with the king kongs of modern developers. Home of LG Electronics. Cool!'
      },
      {
        imageUrl: 'https://static01.nyt.com/images/2018/01/04/nyregion/04NYToday4/04NYToday4-master768.jpg',
       id: 'newyorkUS',
        title:'Meet up New York',
        date: new Date().toJSON(),
        location: 'New York',
        description: 'Yipee!! Here is what we have all been waiting for. City of lights meet up! Come on!'
      },
      {
        imageUrl: 'http://www.history-bus.com/wp-content/uploads/2014/12/Matchmaking-in-Paris.jpg',
       id: 'parisFr',
        title:'Paris next dev stop!',
        date: new Date().toJSON(),
        location: 'Paris, France',
        description: 'What would Paris be without its symbolic Eiffel Tower? Built by Gustave Eiffel to commemorate the centenary of the French Revolution, it is presented at the Exposition Universelle in Paris in 1889. 324 meters high, it is one of the most visited monuments in the world with nearly 7 million visitors a year.!'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {

      setLoadedMeetups(state, payload) {
        state.loadedMeetups = payload
      },
      createMeetup (state, payload) {
        state.loadedMeetups.push(payload)
      },
      setUser (state, payload) {
          state.user = payload
      },
      setLoading (state, payload) {
        state.loading = payload
      },
      setError (state, payload) {
        state.error = payload
      },
      clearError (state) {
        state.error = null
      }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
        firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for(let key in obj) {
            meetsup.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createMeetup ({commit}, payload) {
        const meetup = {
          title: payload.title,
          location: payload.location,
          imageUrl: payload.imageUrl,
          description: payload.description,
          date: payload.date.toISOString()
        }
        firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          const key = data.key
          commit('createMeetup', {
            ...meetup,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
        //Reach out to Firebase and store our data

    },
    signUserUp({commit}, payload) {
          commit('setLoading', true)
          commit('clearError')
          firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then (
            user => {
                commit('setLoading', false)
                const newUser = {
                  id: user.uid,
                  registeredMeetups: []
                }
                commit('setUser', newUser)
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
    },
    signUserIn ({commit}, payload) {
        commit('setLoading', true)
        commit('clearError')
         firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
         .then(
           user => {
             commit('setLoading', false)
             const newUser = {
               id: user.uid,
               registeredMeetups: []
             }
             commit('setUser', newUser)
           }
         )
         .catch(
           error => {
             commit('setLoading', true)
             commit('setError', error)
             console.log(error)
           }
         )
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading(state) {
          return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
