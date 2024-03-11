<template>
    <div class="body" style="background-color: #fcfaff;">
        <Loader msg="Training model" v-if="loading" />

        <form v-else method="POST" @submit="checkForm">
            <div class="form" style="background-color: white; padding:40px;margin-top:10%; width: full;">

                <div class="title" style="color: #423e40e2;">KU Image Tagging Project</div>
                <div class="subtitle">ML Training Interface</div>

                <div class="input-container ic2">
                    <input v-model="form.tag" id="tag" class="input" type="text" placeholder=" " />
                    <!-- <div class="cut"></div> -->
                    <label for="tag" class="placeholder">Tag here</label>
                </div>

                <div class="input-container ic1">
                    <input v-model="dataset_key" id="dataset_key" class="input" type="text" placeholder=" " readonly />
                    <!-- <div class="cut"></div> -->
                    <label for="dataset_key" class="placeholder">Dataset key here</label>
                </div>

                <div class="input-container ic2">
                    <input v-model="key" id="key" class="input" type="text" placeholder=" " readonly/>
                    <!-- <div class="cut"></div> -->
                    <label for="key" class="placeholder">Key here</label>
                </div> 
                
                <div class="input-container ic2">
                    <input v-model="form.group" id="group" class="input" type="text" placeholder=" "/>
                    <!-- <div class="cut"></div> -->
                    <label for="group" class="placeholder">Group</label>
                </div>   
    
                <div class="field is-grouped">
                <div class="control">
                    <button class="button submit">Submit</button>
                </div>
            </div>
            </div>
        </form>
    </div>
  </template>

<script>
import "@/assets/css/forms.css";
import axios from 'axios';
import Loader from '@/components/Loader.vue'

export default {
  name: 'Page2View',
  components: {
    Loader    
  },
  data() {
    return {
        loading: false,
        form: {
            tag: '',
            group: ''
            // dataset_key: '',
            // key: '',
        }
    }
  },
  computed: {
    key() {
        const suffix = '_model.zip'
        return this.form.tag ? this.form.tag + suffix : null
    },
    dataset_key() {
        const suffix = '_dataset.zip'
        return this.form.tag ? this.form.tag + suffix : null
    }
  },
  methods: {
    checkForm: function(e) {
        e.preventDefault()

        this.loading = true

        const data = {
            tag : this.form.tag,
            dataset_key : this.dataset_key,
            key : this.key
        }

        const registerData = {
            template : "keras/MultiClassSingleTagKerasStandardModelTemplateA.py",
            group : this.form.group,
            model_key : this.key
        }

        axios
        .post('/autotag/ml/train/binary', data) // CNN Train only 
        .then(response => {
            if(response.data) {
                axios.post('/autotag/model/register', registerData).then(response => {
                    this.loading = false
                })

        // axios
        // .post('/autotag/ml/train/gan', data) // Gan+CNN Train
        // .then(response => {
        //     if(response.data) {
        //         axios.post('/autotag/model/register', registerData).then(response => {
        //             this.loading = false
        //         })

            }
        })
        // )
    }
}
}
</script>


  