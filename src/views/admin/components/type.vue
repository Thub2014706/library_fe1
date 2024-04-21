<template>
    <div class="p-2">
        <div class="card-div p-3 shadow">
            <h4>Danh sách nhà xuất bản</h4>
            <button type="button" class="btn btn-info my-3" data-toggle="modal" data-target="#myModal">
                <i class="fa-solid fa-plus"></i>
                Thêm thể loại mới
            </button>
            <table class="table table-striped text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên thể loại</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(book, index) in books" :key="index" >
                        <td>{{ book._id }}</td>
                        <td>{{ book.name }}</td>
                        <td>{{ book.author }}</td>
                        <td>{{ book.year }}</td>
                        <td>{{ book.number }}</td>
                        <td>{{ book.type }}</td>
                        <td>{{ book.publisher }}</td>
                        <td>
                            <i class="fa-solid fa-pen-to-square" style="color: green;"></i>
                            <i class="fa-solid fa-trash-can" @click="deleteBook(book._id)" style="color: red; margin-left: 15px;"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
    
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Thêm sách mới</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
    
                <!-- Modal body -->
                <div class="modal-body">
                </div>
    
                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>