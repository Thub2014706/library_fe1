<template>
    <div class="p-2">
        <div class="card-div p-3 shadow">
            <h4>Thông tin mượn sách</h4>
            <button class="btn btn-primary" @click="handleShow1">Yêu cầu mượn</button>
            <button class="btn btn-primary" @click="handleShow2">Đang mượn</button>
            <button class="btn btn-primary" @click="handleShow3">Duyệt sách trả</button>
            <button class="btn btn-primary" @click="handleShow4">Danh sách đã trả</button>

            
            <Borrowing v-if="showBorrowing === true" />
            <Late v-if="showLate === true" />
            <Borrow3 v-if="borrow3 === true" />
            <Borrow4 v-if="borrow4 === true" />
        </div>
    </div>
</template>

<script>
import BorrowService from "@/services/borrow.service"
import AddBorrow from "./addBorrow.vue"
import Late from "./late.vue"
import Borrow3 from "./borrow3.vue"
import Borrow4 from "./borrow4.vue"
import Borrowing from "./borrowing.vue"

export default {
    components: {
        AddBorrow,
        Late,
        Borrowing,
        Borrow3,
        Borrow4
    },

    data() {
        return {
            showBorrowing: true,
            showLate: false,
            borrow3: false,
            borrow4: false
            
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
            this.borrow3 = false
            this.borrow4 = false
        },

        handleShow2() {
            this.showLate = true
            this.showBorrowing = false
            this.borrow3 = false
            this.borrow4 = false
        },

        handleShow3() {
            this.showBorrowing = false
            this.showLate = false
            this.borrow3 = true
            this.borrow4 = false
        },

        handleShow4() {
            this.showLate = false
            this.showBorrowing = false
            this.borrow3 = false
            this.borrow4 = true
        },

    }
}
</script>