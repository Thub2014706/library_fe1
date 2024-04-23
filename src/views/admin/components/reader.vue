<template>
    <div class="p-2">
        <div class="card-div p-3 shadow">
            <h4>Tất cả độc giả</h4>
            <button type="button" class="btn btn-info my-3" @click="showAdd" data-toggle="modal" data-target="#myModal1">
                <i class="fa-solid fa-plus"></i>
                Lập thẻ độc giả
            </button>
            <div class="row">
                <div class="form-inline col d-flex">
                    <label class="mt-2" for="sel1">Hiện trang:</label>
                    <select class="form-control ml-2 form-control-sm" style="width: 60px;" id="sel1" @change="handlePage($event)">
                        <option v-for="i in length" :key="i" :value="i">{{ i }}</option>
                    </select>
                </div>
                <div class="col">
                    <form class="form-inline mt-2 float-right" @submit.prevent="handleSearch">
                        <input class="my-3 form-control form-control-sm" type="text" placeholder="Tìm kiếm..." v-model="search">
                        <button class="ml-2 btn btn-info btn-sm" type="submit">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </div>
            <table class="table table-striped text-center">
                <thead>
                    <tr>
                        <!-- <th>ID</th> -->
                        <th>Tên độc giả</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>E-Mail</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Ngày lập thẻ</th>
                        <th>Hạn thẻ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(read, index) in readers" :key="index" >
                        <!-- <td>{{ read._id }}</td> -->
                        <td>{{ read.name }}</td>
                        <td>{{ read.gender }}</td>
                        <td>{{ read.birth }}</td>
                        <td>{{ read.email }}</td>
                        <td>{{ read.phone }}</td>
                        <td>{{ read.address }}</td>
                        <td>{{ read.current.toString().slice(0, 10) }}</td>
                        <td>{{ read.duration.toString().slice(0, 10) }}</td>

                        <td>
                            <i class="fa-solid fa-pen-to-square" @click="editReader(read._id)" style="color: green; cursor: pointer;"></i>
                            <i class="fa-solid fa-trash-can" @click="deleteReader(read._id)" style="color: red; margin-left: 15px; cursor: pointer;"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
    <div class="modal fade" id="myModal1">
        <div class="modal-dialog">
            <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Lập thẻ độc giả</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
                <AddReader v-if="test === true" @add:reader="handleAdd" />
            </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="myModal2">
        <div class="modal-dialog">
            <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Cập nhật sách</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
                <EditReader v-if="idEdit !== ''" @edit:reader="handleEdit" :id="idEdit"/>
            </div>

            </div>
        </div>
    </div>

</template>

<script>
import UserService from "@/services/user.service"
import AddReader from "./addReader.vue"
import EditReader from "./editReader.vue"

export default {
    components: {
        UserService,
        AddReader,
        EditReader
    },
    data() {
        return {
            readers: [],
            idEdit: '',
            test: false,
            length: 1,
            search: ''
        }
    },

    methods: {
        
        showAdd() {
            this.test = true
        },

        async getAll(number) {
            try {
                const data = await UserService.getAll(number, this.search)
                this.readers = data.data
                this.length = data.totalPages
            } catch (error) {
                console.log(error);
            }
        },

        async deleteReader(id) {
            try {
                await UserService.deleteReader(id);
                this.getAll(1);
            } catch (error) {
                console.log(error);
            }
        },

        async handleAdd(data) {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("gender", data.gender);
            formData.append("birth", data.birth);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("address", data.address);

            try {
                await UserService.create(formData);
                this.search = ''
                this.getAll(1);
                $('#myModal1').modal('hide');
                this.$toast.open({
                    message: "Thêm thành công",
                    type: "success",
                    duration: 4000,
                    dismissible: true,
                    position: "top"
                })
            } catch (error) {
                console.log(error);
                this.$toast.open({
                    message: "Thêm không thành công",
                    type: "error",
                    duration: 4000,
                    dismissible: true,
                    position: "top"
                })
            }
        },
        
        async handleEdit(data) {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("gender", data.gender);
            formData.append("birth", data.birth);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("address", data.address);

            try {
                await UserService.update(this.idEdit, formData);
                this.getAll(1);
                $('#myModal2').modal('hide');
                this.$toast.open({
                    message: "Cập nhật thành công",
                    type: "success",
                    duration: 4000,
                    dismissible: true,
                    position: "top"
                })
            } catch (error) {
                console.log(error);
                this.$toast.open({
                    message: "Cập nhật không thành công",
                    type: "error",
                    duration: 4000,
                    dismissible: true,
                    position: "top"
                })
            }
        },

        async handleSearch() {
            try {
                const data = await UserService.getAll(1, this.search)
                this.readers = data.data
                this.length = data.totalPages
                // this.readers = await UserService.getAll(1, this.search)
            } catch (error) {
                console.log(error);
            }
        },

        handlePage(e) {
            this.getAll(e.target.value)
        },

        editReader(id) {
            // this.editingBook = book;
            console.log(id)
            $('#myModal2').modal('show'); // hiển thị modal
            this.idEdit = id;
        },
    },
    
    mounted() {
        this.getAll(1);
        $('#myModal2').on('hidden.bs.modal', () => {
                this.idEdit = '';
        });
        $('#myModal1').on('hidden.bs.modal', () => {
                this.test = false;
        });
    },

}
</script>

<style>
    .card-div {
        background-color: rgb(246, 246, 246);
    }
</style>