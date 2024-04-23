<template>
    <div class="p-2">
        <div class="card-div p-3 shadow">
            <h4>Danh sách nhà xuất bản</h4>
            <button type="button" class="btn btn-info my-3" @click="showAdd" data-toggle="modal" data-target="#myModal1">
                <i class="fa-solid fa-plus"></i>
                Thêm mới
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
                        <th>ID</th>
                        <th>Tên nhà xuất bản</th>
                        <th>Địa chỉ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(pub, index) in publisher" :key="index" >
                        <td>{{ pub._id }}</td>
                        <td>{{ pub.name }}</td>
                        <td>{{ pub.address }}</td>
                        <td>
                            <i class="fa-solid fa-pen-to-square" @click="editPublisher(pub._id)" style="color: green; cursor: pointer;"></i>
                            <i class="fa-solid fa-trash-can" @click="deletePublisher(pub._id)" style="color: red; margin-left: 15px; cursor: pointer;"></i>
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
                <h4 class="modal-title">Thêm nhà xuất bản mới</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
                <AddPublisher v-if="test === true" @add:publisher="handleAdd" />
            </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="myModal2">
        <div class="modal-dialog">
            <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Cập nhật nhà xuất bản</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
                <EditPublisher v-if="idEdit !== ''" @edit:publisher="handleEdit" :id="idEdit"/>
            </div>

            </div>
        </div>
    </div>
</template>

<script>
import PublisherService from "@/services/publisher.service"
import AddPublisher from "./addPublisher.vue"
import EditPublisher from "./editPublisher.vue"

export default {
    components: {
        PublisherService,
        AddPublisher,
        EditPublisher
    },
    data() {
        return {
            publisher: [],
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
                const data = await PublisherService.getAll({name: this.search, number: number});
                console.log('a',data)
                this.publisher = data.data
                this.length = data.totalPages
            } catch (error) {
                console.log(error)
            }
        },

        async deletePublisher(id) {
            try {
                await PublisherService.deletePublisher(id);
                this.getAll(1)
            } catch (error) {
                console.log(error)
            }
        },

        async handleAdd(data) {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('address', data.address);
            console.log(formData)
            try {
                await PublisherService.create(formData);
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
                console.log(error)
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
            formData.append('name', data.name);
            formData.append('address', data.address);
            console.log(formData)
            this.$toast.open({
                message: "Cập nhật thành công",
                type: "success",
                duration: 4000,
                dismissible: true,
                position: "top"
            })
            try {
                await PublisherService.update(this.idEdit, formData);
                this.getAll(1);
                $('#myModal2').modal('hide');
            } catch (error) {
                console.log(error)
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
                const data = await PublisherService.getAll({number: 1, name: this.search})
                this.publisher = data.data
                this.length = data.totalPages
            } catch (error) {
                console.log(error);
            }
        },

        editPublisher(id) {
            $('#myModal2').modal('show'); // hiển thị modal
            this.idEdit = id;
        },

        handlePage(e) {
            this.getAll(e.target.value)
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