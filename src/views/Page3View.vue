<template>
  <main>
    <UploadFile @newFile="onFileChange($event)" />
    {{ tags }}
    <div v-if="showStringField">
      <input v-model="customString" placeholder="Enter a custom string" />
      <button @click="submitCustomString">Submit</button>
    </div>
  </main>
</template>

<script>
import UploadFile from '@/components/UploadFile.vue'
import axios from 'axios'

export default {
  name: 'Page3View',
  components: {
    UploadFile,
  },
  data() {
    return {
      tags: [],
      showStringField: false,
      customString: '',
    }
  },
  methods: {
    onFileChange(file) {
      this.fetchApi(file)
    },

    fetchApi(file) {
      const data = new FormData();
      data.append('img', file);

      axios.post('/tag', data)
        .then(response => {
          if (response.data.tags === "We dont have model to recognise this, please train it first") {
            this.showStringField = true;
          } else {
            this.showStringField = false;
          }
          this.tags = response.data.tags;
        })
        .catch(error => {
          console.error('Error fetching tags:', error);
        });
    },

    submitCustomString() {
      // Send the string directly in the request body
      const data = {
        tag: this.customString,
      };

      axios.post('/autotag/img/fetch_train', data)
        .then(response => {
          // Handle the response as needed
          console.log('Backend response:', response.data);
          console.log(typeof response.data)
          const returned_val_accuracy = response.data

          if (returned_val_accuracy > 0.70) {
            const registerData = {
              template: "keras/MultiClassSingleTagKerasStandardModelTemplateA.py",
              group: this.customString,  // Use customString as the group value
              model_key: this.customString + '_model.zip',  
            };
                axios.post('/autotag/model/register', registerData).then(response => {
                    console.log("model Registered!")
                })
            }
        })
        .catch(error => {
          // Handle errors, if any
          console.error('Error:', error);
        });
    },
  }
}
</script>
