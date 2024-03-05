<!-- 

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

          if (this.returnedValAccuracy < 0.70) {
            this.modelSaveSuccess = false;
            this.modelSaveError = true;
            this.showTrainButton = true;
            this.trainButtonText = "Run GAN and Train";
          } else {
            this.showTrainButton = false;
          }

          if (this.returnedValAccuracy > 0.)

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
</script> -->

<!-- 

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

          if (this.returnedValAccuracy < 0.70) {
            this.modelSaveSuccess = false;
            this.modelSaveError = true;
            this.showTrainButton = true;
            this.trainButtonText = "Run GAN and Train";
          } else {
            this.showTrainButton = false;
          }

          // if (this.returnedValAccuracy > 0.)

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
  const data = {
    tag: this.customString,
  };

  const MAX_RETRIES = 5; // Set your desired maximum number of retries
  let retryCount = 0;

  const trainModel = () => {
    axios.post('/autotag/img/fetch_train', data)
      .then(response => {
        this.returnedValAccuracy = response.data;

        if (this.returnedValAccuracy > 0.86) {
          this.modelSaveSuccess = true;
          const registerData = {
            template: "keras/MultiClassSingleTagKerasStandardModelTemplateA.py",
            group: this.customString,
            model_key: this.customString + '_model.zip',
          };

          axios.post('/autotag/model/register', registerData).then(response => {
            console.log("Model Registered!")
          });
        } else {
          // Check if the maximum number of retries is reached
          if (retryCount < MAX_RETRIES) {
            retryCount++;
            // Recursive call with a delay (e.g., 1 second) to avoid rapid retries
            setTimeout(trainModel, 1000);
          } else {
            this.modelSaveError = true;
            console.error('Maximum number of retries reached. Model not saved.');
          }
        }
      })
      .catch(error => {
        this.modelSaveError = true;
        console.error('Error:', error);
      });
  };

  trainModel(); // Initial call to start the process
    },
  }
}
</script>
 -->

 

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
        Model was not saved due to lower validation accuracy ie: {{ returnedValAccuracy }}. Re-Autotraining in Progress.
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

          // runGanAndTrain() {
          const data = {
            tag: this.customString,
          };

          const MAX_RETRIES = 2; // Set your desired maximum number of retries
          let retryCount = 0;

          const trainModel = () => {
            // axios.post('/autotag/img/fetch_train', data)
            axios.post('/autotag/img/fetch_train', data)
              .then(response => {
                this.returnedValAccuracy = response.data;

                if (this.returnedValAccuracy > 1.85) {
                  this.modelSaveSuccess = true;
                  this.modelSaveError=false;
                  const registerData = {
                    template: "keras/MultiClassSingleTagKerasStandardModelTemplateA.py",
                    group: this.customString,
                    model_key: this.customString + '_model.zip',
                  };

                  axios.post('/autotag/model/register', registerData).then(response => {
                    console.log("Model Registered!")
                  });
                } else {
                  
                  this.modelSaveSuccess=false;
                  this.modelSaveError=true;
                  // Check if the maximum number of retries is reached
                  if (retryCount < MAX_RETRIES) {
                    retryCount++;
                    // Recursive call with a delay (e.g., 1 second) to avoid rapid retries
                    setTimeout(trainModel, 1000);
                  } else {
                    this.modelSaveError = true;
                    console.error('Maximum number of retries reached. Model not saved.');
                    this.showTrainButton=true;
                    this.trainButtonText="Run GAN and Train";
                  }
                }
              })
              .catch(error => {
                this.modelSaveError = true;
                console.error('Error:', error);
              });
          };

          trainModel(); // Initial call to start the process
    },

    runGanAndTrain() {
      const data = {
        tag: this.customString,
      };

      const MAX_RETRIES = 2;
      let retryCount = 0;

      const trainGanCnn = () => {
        // axios.post('/autotag/ml/train/gan_cnn', data)
        axios.post('/autotag/ml/train/fetch_gan_cnn', data)
        .then(response => {
                this.returnedValAccuracy = response.data;

                if (this.returnedValAccuracy > 1.85) {
                  this.modelSaveSuccess = true;
                  this.modelSaveError=false;
                  const registerData = {
                    template: "keras/MultiClassSingleTagKerasStandardModelTemplateA.py",
                    group: this.customString,
                    model_key: this.customString + '_model.zip',
                  };
                  console.log("GAN and Train successful!");

                  axios.post('/autotag/model/register', registerData).then(response => {
                    console.log("Model Registered!")
                  });
                  
            } else {
              // Validation loss is not satisfactory
                  this.modelSaveSuccess=false;
                  this.modelSaveError=true;
                  // Check if the maximum number of retries is reached
                  if (retryCount < MAX_RETRIES) {
                    retryCount++;
                    // Recursive call with a delay (e.g., 1 second) to avoid rapid retries
                    setTimeout(trainGanCnn, 1000);
                  } else {
                    this.modelSaveError = true;
                    console.error('Maximum number of retries reached. Model not saved.');
              }
            }
          })
          .catch(error => {
            // Handle errors
            this.modelSaveError = true;
            console.error('Error during GAN and Train:', error);
          });
      };

      trainGanCnn(); // Initial call to start the process
    },
  }
}
</script>

