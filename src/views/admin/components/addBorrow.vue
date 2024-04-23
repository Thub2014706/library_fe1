<template>
    <form action="" class="pb-1">
        <div class="row">
            <div class="form-group col">
                <label for="reader">Mã độc giả</label>
                <input type="text" name="reader" class="form-control" v-model="formData.reader" />
            </div>
    
            <div class="form-group col">
                <label for="book">Mã sách</label>
                <input type="text" name="book" class="form-control" v-model="formData.book" />
            </div>
    
            <div class="form-group col">
                <label for="durationDate">Hẹn ngày trả</label>
                <input type="date" name="durationDate" class="form-control" v-model="formData.durationDate" />
            </div>
        </div>

        <div class="form-group row">
            <button class="btn btn-info ml-3" type="submit" @click.prevent="addBorrow">Mượn</button>
        </div>
    </form>
</template>

<script>
export default {
    emits: ["add:borrow"],
    data() {
        return {
            formData: {},
        }
    },
    methods: {

        addBorrow() {
            this.$emit('add:borrow', this.formData);
            this.formData = {}
        },

    },
}
</script>