<template>
    <div class="p-2">
        <div class="card-div p-3 shadow mb-3">
            <h4>Mượn sách</h4>
            <AddBorrow @add:borrow="handleAdd" />
        </div>
        <div class="card-div p-3 shadow">
            <h4>Thông tin mượn sách</h4>
            <button class="btn btn-primary" @click="handleShow1">Đang mượn</button>
            <button class="btn btn-primary" @click="handleShow2">Hết hạn trả</button>

            
            <Borrowing v-if="showBorrowing === true" />
            <Late v-if="showLate === true" />
        </div>
    </div>
</template>

<script>
import BorrowService from "@/services/borrow.service"
import AddBorrow from "./addBorrow.vue"
import Late from "./late.vue"
import Borrowing from "./borrowing.vue"

export default {
    components: {
        AddBorrow,
        Late,
        Borrowing
    },

    data() {
        return {
            showBorrowing: true,
            showLate: false
        }
    },

    methods: {

        async handleAdd(data) {
            const formData = new FormData();
            formData.append("reader", data.reader);
            formData.append("book", data.book);
            formData.append("durationDate", data.durationDate);

            try {
                await BorrowService.create(formData);
                // this.getAll(1);
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

        handleShow1() {
            this.showBorrowing = true
            this.showLate = false
        },

        handleShow2() {
            this.showLate = true
            this.showBorrowing = false
        },

    }
}
</script>