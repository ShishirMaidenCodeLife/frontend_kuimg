<!-- fixed keywords and counterkeywords-->
<template>
  <div class="body" style="background-color: #fcfaff;">
    <Loader v-if="loading" />
    <form v-else method="POST" @submit="checkForm" >
        <div class="form" style="background-color: white; padding:40px;margin-top:10%; width: full;">

            <div class="title" style="color: #423e40e2;">KU Image Tagging Project</div>
            <div class="subtitle">Data Collection Interface</div>

            <div class="input-container ic1">
                <input v-model="form.tag" id="firstname" class="input" type="text" placeholder=" " />
                <!-- <div class="cut"></div> -->
                <label for="firstname" class="placeholder">Tag</label>
            </div>

            <!-- <div class="input-container ic2">
                <input v-model="form.keywords" class="input" type="text" placeholder=" " />
                <div class="cut"></div>
                <label for="keywords" class="placeholder">Keywords</label>
            </div> -->

            <!-- <div class="input-container ic2">
                <input v-model="form.counters" class="input" type="text" placeholder=" " />
                <div class="cut"></div>
                <label for="keywords" class="placeholder">Counter keywords</label>
            </div> -->

            <div class="input-container ic2">
                <input v-model="key" class="input" type="text" placeholder=" " readonly/>
                <!-- <div class="cut"></div> -->
                <label for="lastname" class="placeholder">Key</label>
            </div>           

            <div class="field is-grouped" style="margin-top: 15%;">
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
import TagInput from '@/components/TagInput.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'Page1View',
  components: {
    TagInput, Loader
  },
  data() {
    return {
      loading: false,
        form: {
            tag: '',
            //keywords: [],
            //counters: [],
        }
    }
  },
  computed: {
    key() {
        return this.form.tag ? this.form.tag + '_dataset.zip' : ''
    }
  },
  methods: {
    checkForm: function(e) {
        e.preventDefault()

        const data = {
            tag: this.form.tag,
            /*keywords: this.form.keywords.split(",").map(element => { return element.trim() }),
            counters: this.form.counters.split(",").map(element => { return element.trim() }),*/
            key: this.key
        }
       this.loading = true
         axios.post('/autotag/img/fetch', data)
         .then(response => (
           this.loading = false
         ))
    }
}
}
</script>
  