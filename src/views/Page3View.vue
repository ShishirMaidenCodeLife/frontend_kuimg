<!-- <template>
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
</script> -->

<!-- <template>
  <main>
    <UploadFile @newFile="onFileChange($event)" />
    {{ tags }}
    <div v-if="showStringField">
      <input v-model="customString" placeholder="Please! Enter the label for the image HERE" />
      <button @click="submitCustomString">Train</button>
      <button v-if="showTrainButton" @click="runGanAndTrain">{{ trainButtonText }}</button>

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
      showTrainButton: false,
      trainButtonText: '',
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
      const data = {
        tag: this.customString,
      };

      axios.post('/autotag/img/fetch_train', data)
        .then(response => {
          const returned_val_accuracy = response.data;

          if (returned_val_accuracy < 0.82) {

            this.showTrainButton = true;
            this.trainButtonText = "Run GAN and Train";
          } else {
            this.showTrainButton = false;
          }

          if (returned_val_accuracy > 0.86) {
            const registerData = {
              template: "keras/MultiClassSingleTagKerasStandardModelTemplateA.py",
              group: this.customString,
              model_key: this.customString + '_model.zip',
            };

            axios.post('/autotag/model/register', registerData).then(response => {
              console.log("model Registered!")
            })
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },

    runGanAndTrain() {
      // Implement the logic to run GAN and train
      // You can use axios or another method to make the necessary API calls
      
      // For example:
      // axios.post('/run_gan_and_train', { tag: this.customString })
      //   .then(response => {
      //     // Handle the response as needed
      //   })
      //   .catch(error => {
      //     // Handle errors, if any
      //   });
    },
  }
}
</script> -->

<template>
  <main style="background-color: #fcfaff;">
    <div>
    <UploadFile @newFile="onFileChange($event)" />
    </div>
    <div v-if="showTags" style="font-size: larger; color: rgb(112, 108, 108);">
    {{ tags }}
    </div>
    <br>
    <div v-if="showStringField">
      <input v-model="customString" placeholder="Please! Enter the label for the image HERE" style="width:20%;
            margin-bottom: 20px;
            border-radius: 20px  0px  0px 20px;
            background-color: white;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 8px;"/>
      <button @click="submitCustomString " style="width: 90px;
        border: 2px solid #158be3;
        text-transform: none;
        border-radius: 0px  20px  20px 0px;
        background-color: #158be3;
        box-shadow: 0 2px 4px white(0, 0, 0, 0.1);
        color: white; padding: 8px;">Train</button>
      
    </div>
    <div v-if="modelSaveSuccess">
      Model was saved successfully!
    </div>
    <div v-if="modelSaveError">
      <p style="font-size: medium; font-weight: bold; color: rgb(227, 73, 73); ">
        Model was not saved due to lower validation accuracy ie: {{ returnedValAccuracy }}
      </p>
      <button v-if="showTrainButton" @click="runGanAndTrain" style="width: auto;
        border: 2px solid #158be3;
        text-transform: none;
        border-radius: 16px;
        background-color: #158be3;

        box-shadow: 0 2px 4px white(0, 0, 0, 0.1);
        color: white; padding: 10px;">{{ trainButtonText }}</button>
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
      showTags: false,
      showTrainButton: false,
      trainButtonText: '',
      modelSaveSuccess: false,
      modelSaveError: false,
      returnedValAccuracy: 0,
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
            this.showTags = true;
            this.showStringField = true;
            
          } else {
            this.showTags = true;
            this.showStringField = false;
          }
          // this.showTags = true;
          this.tags = response.data.tags;
        })
        .catch(error => {
          console.error('Error fetching tags:', error);
        });
    },

    submitCustomString() {
      const data = {
        tag: this.customString,
      };

      axios.post('/autotag/img/fetch_train', data)
        .then(response => {
          this.returnedValAccuracy = response.data;

          if (this.returnedValAccuracy < 0.82) {
            this.modelSaveSuccess = false;
            this.modelSaveError = true;
            this.showTrainButton = true;
            this.trainButtonText = "Run GAN and Train";
          } else {
            this.showTrainButton = false;
          }

          if (this.returnedValAccuracy > 0.86) {
            this.modelSaveSuccess = true;
            const registerData = {
              template: "keras/MultiClassSingleTagKerasStandardModelTemplateA.py",
              group: this.customString,
              model_key: this.customString + '_model.zip',
            };

            axios.post('/autotag/model/register', registerData).then(response => {
              console.log("model Registered!")
            })
          } else {
            this.modelSaveSuccess = false;
          }
        })
        .catch(error => {
          this.modelSaveError = true;
          console.error('Error:', error);
        });
    },

    runGanAndTrain() {
      // logic to run GAN and train
      // We can use axios or another method to make the necessary API calls
      
      // For example:
      // axios.post('/run_gan_and_train', { tag: this.customString })
      //   .then(response => {
      //     // Handle the response as needed
      //   })
      //   .catch(error => {
      //     // Handle errors, if any
      //   });
    },
  }
}
</script>
