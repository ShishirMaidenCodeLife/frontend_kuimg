<template>
<div class="container">
<div class="row">
    <div class="col-12 col-lg-3">
		<div class="card">
			<div class="card-body">
				<div v-if="uploadingFile">
					Uploading File now ...
				
				</div>
				<div v-else>
				<input 
					type="file" 
					:name="uploadFieldName" 
					:disabled="isSaving" 
					@change="onFilesSelected"
					ref="file"
					class="input-file">

				<div class="d-grid"> <a href="javascript:;" class="btn btn-primary">+ Add File</a>
				</div>
			</div>
				
			</div>
		</div>
		
	</div>
	<div class="col-12 col-lg-9">
		<div class="card">
			<div class="card-body">
				<div class="fm-search">
					<div class="mb-0">
						<div class="input-group input-group-lg">	<span class="input-group-text bg-transparent"><i class="fa fa-search"></i></span>
							<input type="text" @input="searchFiles" class="form-control" placeholder="Enter regex to search files">
						</div>
					</div>
				</div>

				<div class="d-flex align-items-center">
					<div>
						<h5 class="mb-0">Recent Files</h5>
					</div>
					<div class="ms-auto"><a href="javascript:;" class="btn btn-sm btn-outline-secondary">View all</a>
					</div>
				</div>
				<div class="table-responsive mt-3">
					<table class="table table-striped table-hover table-sm mb-0">
						<thead>
							<tr>
								<th>Name <i class="bx bx-up-arrow-alt ms-2"></i>
								</th>
								<th>Members</th>
								<th>Last Modified</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="file in files">
								<td>
									<div class="d-flex align-items-center">
										<div><i class="bx bxs-file-pdf me-2 font-24 text-danger"></i>
										</div>
										<div class="font-weight-bold text-danger">{{ file }}</div>
									</div>
								</td>
								<td>Only you</td>
								<td>Sep 3, 2019</td>
								<!-- <td @click="deleteFile(file)"><i class="fa fa-ellipsis-h font-24"></i> -->
								<td>
									<button @click="deleteFile(file)" class="list-group-item py-1">
										<i class="bx bx-trash-alt me-2">
										</i>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
</div>





</template>

<script>
import axios from 'axios';

export default {
  name: 'FileManagerView',
  components: {
    
  },
  data() {
    return {
		uploadingFile: false,
		files: [],
		uploadedFiles : [],
		uploadError : null,
    }
  },
  created() {
	this.fetchFiles()
  },
  methods: {
	fetchFiles(pattern=null) {
		pattern = pattern ?? '*'
		axios.get(`/fs/list`)
        .then(response => (this.files = response.data))
	},
	searchFiles(event) 
	{
		this.fetchFiles(event.target.value)
	},
	onFilesSelected(event) {
		var files = event.target.files || event.dataTransfer.files;
		const data = {
			raw: files[0],
			key: Date.now() + '.' + files[0]['name'].split('.').pop()
		}
		const headers = { 'Content-Type': 'multipart/form-data' }
		axios.post('http://localhost:8001/put', data, {headers}).then(response => (
			this.fetchFiles()
		))
		
	},
	deleteFile(file) {
		const data = {
			"key" : file
		}
		axios.post('http://localhost:8001/delete', data).then(response => (
			this.fetchFiles()
		))
	}

    }
}
</script>


<style type="text/css" scoped>
    @import "https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css";
    @import "https://cdn.lineicons.com/3.0/lineicons.css";
    @import 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
    @import 'https://cdn.jsdelivr.net/npm/boxicons@2.0.7/css/boxicons.min.css';

body{
margin-top:20px;
background-color: #f7f7ff;
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0px solid rgba(0, 0, 0, 0);
    border-radius: .25rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
}
.fm-file-box {
    font-size: 25px;
    background: #e9ecef;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .25rem;
}
.ms-2 {
    margin-left: .5rem!important;
}

.fm-menu .list-group a {
    font-size: 16px;
    color: #5f5f5f;
    display: flex;
    align-items: center;
}
.list-group-flush>.list-group-item {
    border-width: 0 0 1px;
}
.list-group-item+.list-group-item {
    border-top-width: 0;
}
.py-1 {
    padding-top: .25rem!important;
    padding-bottom: .25rem!important;
}
.list-group-item {
    position: relative;
    display: block;
    padding: .5rem 1rem;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, .125);
}

.radius-15 {
    border-radius: 15px;
}
.fm-icon-box {
    font-size: 32px;
    background: #ffffff;
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .25rem;
}
.font-24 {
    font-size: 24px;
}
.ms-auto {
    margin-left: auto!important;
}
.font-30 {
    font-size: 30px;
}
.user-groups img {
    margin-left: -14px;
    border: 1px solid #e4e4e4;
    padding: 2px;
    cursor: pointer;
}

.rounded-circle {
    border-radius: 50%!important;
}

.input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
</style>

  