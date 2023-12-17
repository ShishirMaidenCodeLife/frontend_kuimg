<template>  
    <main>
      {{ tags }}
    </main>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'TagsList',
    components: {
      
    },
    created() {
      axios.get(`/status`)
        .then(response => (
          this.keys = response.data //[ Object.keys(response.data)[0] ]
          ))

    },
    data() {
      return {
        keys: null,
        // tags: []
      }
    },
    computed: {
      tags() {
        let items = [];

        if(this.keys) {
            var keys = Object.keys(this.keys)
            for(var i= 0; i < keys.length;i++){
              items.push(this.getTags(this.keys[keys[i]]))
            }
        }
        return items
      }
    },
    methods: {
      getTags(value)
      {
        let temp = value.split("tags")[1]
        temp = temp.replace(':', '')
        temp = temp.replace('}', '')
        temp = temp.replace('[', '')
        temp = temp.replace(']', '')
        temp = temp.slice(1)
        temp = temp.split(",")
        return temp
      }
    
    }
  }
  </script> 