<template>
    <div id="app">
        <div v-if="!file">
            <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
            <div class="dropZone-info" @drag="onChange">
                <span class="fa fa-cloud-upload dropZone-title"></span>
                <span class="dropZone-title">Drop file or click to upload</span>
                <div class="dropZone-upload-limit-info">
                <div>extension support: jpg, png, jpeg</div>
                <div>maximum file size: 5 MB</div>
                </div>
            </div>
            <input type="file" @change="onChange">
            </div>
        </div>

        <div v-else class="dropZone-uploaded">
            <div class="dropZone-uploaded-info">
              <span class="dropZone-title">Uploaded</span>
              <button type="button" class="btn btn-primary removeFile" @click="removeFile">Remove File</button>
            </div>
        </div>

        <div
          class="imagePreviewWrapper"
          :style="{ 'background-image': `url(${previewImage})` }"
          @click="selectImage">
        </div>
  
        <div class="uploadedFile-info">
            <div>Filename: {{ file.name }}</div>
            <div>Filesize(bytes): {{ file.size }}</div>
            <div>extension：{{ extension }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UploadFile',
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
        alert('Upload an valid image file')
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
  width: 30%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975A0;
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
  width: 80%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
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