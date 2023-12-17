  <template>  
    <main>
      <UploadFile @newFile="onFileChange($event)"/>
      {{ tags }}
    </main>
  </template>
  
  <script>
  import UploadFile from '@/components/UploadFile.vue'
  import axios from 'axios'
  
  export default {
    name: 'Page3View',
    components: {
      UploadFile
    },
    data() {
      return {
        tags: []
      }
    },
    methods: {
      onFileChange(file) {
        this.fetchApi(file)
      },

      fetchApi(file)
      {
        const data = {
          img: file
        }
        const headers = { 'Content-Type': 'multipart/form-data' }
        axios.post('/tag', data, {headers})
             .then(response => (this.tags = response.data.tags))
      }
    }
  }
  </script>  
  
  <style scoped>
  header {
    line-height: 1.5;
  }
  
  .logo {
    display: block;
    margin: 0 auto 2rem;
  }
  
  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }
  
    .logo {
      margin: 0 2rem 0 0;
    }
  
    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  }
  </style>
  