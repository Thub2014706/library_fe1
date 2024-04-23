<template>
    <div class="p-2">
        <div class="card-div p-3 shadow mb-3">
            <h4>Mượn sách</h4>
            <AddBorrow @add:borrow="handleAdd" />
        </div>
        <div class="card-div p-3 shadow">
            <h4>Thông tin mượn sách</h4>

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
                        <th>Mã độc giả</th>
                        <th>Mã sách</th>
                        <th>Ngày mượn</th>
                        <th>Ngày hẹn trả</th>
                        <th>Ngày trả</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(borrow, index) in allBorrow" :key="index" >
                        <!-- <td>{{ read._id }}</td> -->
                        <td>{{ borrow.reader }}</td>
                        <td>{{ borrow.book }}</td>
                        <td>{{ borrow.borrowDate.toString().slice(0, 10) }}</td>
                        <td>{{ borrow.durationDate.toString().slice(0, 10) }}</td>
                        <td>
                            <i v-if="borrow.return === 0" class="fa-regular fa-calendar-check" @click="handleReturn(borrow._id)"></i>
                            <p v-if="borrow.return">{{ borrow.return.toString().slice(0, 10) }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import BorrowService from "@/services/borrow.service"
import AddBorrow from "./addBorrow.vue"
export default {
    components: {
        AddBorrow
    },

    data() {
        return {
            allBorrow: [],
            length: 1,
            search: ''
        }
    },

    methods: {
        async getAll(number) {
            try {
                const data = await BorrowService.getAll({number: number, name: this.search})
                this.allBorrow = data.data
                this.length = data.totalPages
            } catch (error) {
                console.log(error);
            }
        },

        async handleAdd(data) {
            const formData = new FormData();
            formData.append("reader", data.reader);
            formData.append("book", data.book);
            formData.append("durationDate", data.durationDate);

            try {
                await BorrowService.create(formData);
                this.getAll(1);
                this.$toast.open({
                    message: "Mượn thành công",
                    type: "success",
                    duration: 4000,
                    dismissible: true,
                    position: "top"
                })
            } catch (error) {
                console.log(error);
                this.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                    duration: 4000,
                    dismissible: true,
                    position: "top"
                })
            }
        },

        async handleSearch() {
            try {
                const data = await BorrowService.getAll({ number: 1, name: this.search})
                this.allBorrow = data.data
                this.length = data.totalPages
            } catch (error) {
                console.log(error);
            }
        },

        async handleReturn(id) {
            console.log('ddd')
            try {
                await BorrowService.returnTheBook(id)
                this.getAll(1)
            } catch (error) {
                console.log(error);
            }
        },

        handlePage(e) {
            this.getAll(e.target.value)
        },

        async numberAll() {
            this.length = await numberAll()
        }
    },
    mounted() {
        this.getAll(1)
        this.numberAll()
    }
}
</script>