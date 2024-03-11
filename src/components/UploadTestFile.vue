<template>
    <div id="app" style="background-color: #fcfaff;" >
      <div style=" padding: 30px;  display: flex; justify-content: center;   "> 
        
        <div style="border-radius: 35px; width: 30%;  border: 1px solid #eee; background-color: white;" >

          <div style="margin-top: 10px; color:#c73c8be2; font-size:x-large; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Manual Testing</div>

        <div v-if="!file" style="  display: flex; justify-content: center;  width: full;">
            <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false" >
            <div class="dropZone-info" @drag="onChange" >
                <span class="fa fa-cloud-upload dropZone-title" style="margin-right: 8px;"></span>
                <span class="dropZone-title">upload image for accuracy test</span>
                <div class="dropZone-upload-limit-info">
                  <br>
                <div>extension support: jpg, png, jpeg</div>
                <div>maximum size: 5 MB</div>
                </div>
            </div>
            <input type="file" @change="onChange">
            </div>
        </div>

        <div v-else style="  display: flex; justify-content: center;  width: full;">
        <div class="dropZone-uploaded"  style="padding: 10px">
          
            <div class="dropZone-uploaded-info">
              <span class="dropZone-title" >File Uploaded  </span>
             <br>
              <button type="button" class="btn btn-primary removeFile" @click="removeFile">Remove File</button>
            </div>
        </div>
    
      </div>

        <div
          class="imagePreviewWrapper"
          :style="{ 'background-image': `url(${previewImage})` }"
          @click="selectImage">
        </div>
  
        <!-- <div class="uploadedFile-info" style="margin-bottom: 10%;">
            <div>Filename: {{ file.name }}</div>
            <div>Filesize(bytes): {{ file.size }}</div>
            <div>extension：{{ extension }}</div>
        </div> -->
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TestUploadFile',
    data() {
      return {
        file : '',
        dragging : false,
        previewImage: null
      }
  },

  methods: {
    onChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      
      if (!files.length) {
        this.dragging = false;
        return;
      }
      
      this.createFile(files[0]);
    },
    createFile(file) {
      if (!file.type.match('image.*')) {
        alert('Upload a valid Test image file')
        this.dragging = false;
        return;
      }
      
      if (file.size > 5000000) {
        alert('please check file size no over 5 MB.')
        this.dragging = false;
        return;
      }
      this.file = file;
      this.dragging = false;

      console.log(this.file)

      this.previewImage = URL.createObjectURL(this.file)
      this.$emit('newFile', file)
    },
    removeFile() {
      this.file = '';
      this.previewImage=null;
    }
  },
  computed: {
    extension() {
      return (this.file) ? this.file.name.split('.').pop() : '';
    }
  }
}

</script>

<style>
.dropZone {
  margin-top: 10%;
  width: 70%;
  height: 160px;
  position: relative;
  border: 2px dashed #d0adcb;
  border-radius: 20px;
}

.dropZone:hover {
  border: 2px dashed #bc6f9a;
  
}

.dropZone:hover .dropZone-title {
  color: #bc6f9a;
}

.dropZone-info {
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
  font-size: large;
  font-weight: 700;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5C5C5C;
  opacity: 0.8;
}

.dropZone-uploaded {
  margin-top: 10%;
  margin-bottom: 10%;

  width: 80%;
  height: 80px;
  position: relative;
  /* border: 2px dashed #eee; */
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}

.imagePreviewWrapper {
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}

</style>