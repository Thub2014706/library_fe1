<template>
    <div class="p-2">
        <div class="card-div p-3 shadow">
            <h4>Tất cả sách</h4>
            <button type="button" class="btn btn-info my-3" @click="showAdd" data-toggle="modal" data-target="#myModal1">
                <i class="fa-solid fa-plus"></i>
                Thêm sách mới
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
                        <th>Hình ảnh</th>
                        <th>Tên sách</th>
                        <th>Tác giả</th>
                        <th>Năm xuất bản</th>
                        <th>Số lượng</th>
                        <th>Đã cho mượn</th>
                        <th>Nhà xuất bản</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(book, index) in books" :key="index" >
                        <td class="align-middle">
                            <img :src="book.image" alt="" style="height: 100px;">
                        </td>
                        <td class="align-middle">{{ book.name }}</td>
                        <td class="align-middle">{{ book.author }}</td>
                        <td class="align-middle">{{ book.year }}</td>
                        <td class="align-middle">{{ book.number }}</td>
                        <td class="align-middle">{{ book.borrowed }}</td>
                        <td class="align-middle">
                            <p v-if="book.publisher_details.length !== 0">{{ book.publisher_details[0].name }}</p>
                            <p v-if="book.publisher_details.length === 0">Null</p>
                        </td>
                        <td class="align-middle">
                            <i class="fa-solid fa-pen-to-square" @click="editBook(book._id)" style="color: green; cursor: pointer;"></i>
                            <i class="fa-solid fa-trash-can" @click="deleteBook(book._id)" style="color: red; margin-left: 15px; cursor: pointer;"></i>
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
                <h4 class="modal-title">Thêm sách mới</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
                <AddBook v-if="test === true" @add:book="handleAdd" />
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
                <EditBook v-if="idEdit !== ''" @edit:book="handleEdit" :id="idEdit"/>
            </div>

            </div>
        </div>
    </div>

</template>

<script>
import BookService from "@/services/book.service"
import AddBook from "./addBook.vue"
import EditBook from "./editBook.vue"

export default {
    components: {
        BookService,
        AddBook,
        EditBook
    },
    data() {
        return {
            books: [],
            idEdit: '',
            test: false,
            length: 1,
            search: ''
        }
    },

    methods: {
        async getAllBooks(number) {
            // console.log(this.books)
            try {
                const data = await BookService.getAll(number, this.search)
                this.books = data.data
                this.length = data.totalPages
            } catch (error) {
                console.log(error);
            }
        },

        async deleteBook(id) {
            try {
                await BookService.deleteBook(id);
                this.getAllBooks(1);
            } catch (error) {
                console.log(error);
            }
        },

        async handleAdd(data) {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("image", data.image);
            formData.append("author", data.author);
            formData.append("year", data.year);
            formData.append("number", data.number);
            formData.append("publisher", data.publisher);

            try {
                await BookService.create(formData);
                this.getAllBooks(1);
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
            formData.append("author", data.author);
            formData.append("year", data.year);
            formData.append("number", data.number);
            formData.append("publisher", data.publisher);

            try {
                await BookService.update(this.idEdit, formData);
                this.getAllBooks(1);
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

        showAdd() {
            this.test = true
        },

        editBook(id) {
            // this.editingBook = book;
            console.log(id)
            $('#myModal2').modal('show'); // hiển thị modal
            this.idEdit = id;
        },

        handlePage(e) {
            this.getAll(e.target.value)
        },

        async handleSearch() {
            try {
                const data = await BookService.getAll(1)
                this.books = data.data
                this.length = data.totalPages
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getAllBooks(1);
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