<template>
    <form enctype="multipart/form-data" >
        <div class="form-group">
            <label for="name">Tên nhà xuất bản</label>
            <input type="text" name="name" class="form-control" v-model="formData.name" />
        </div>

        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <input type="text" name="address" class="form-control" v-model="formData.address" />
        </div>

        <!-- <div class="form-group">
            <label for="type">Thể loại</label>
            <input type="text" name="number" class="form-control" />
        </div>

        <div class="form-group">
            <label for="number">Nhà xuất bản</label>
            <input type="text" name="number" class="form-control" />
        </div> -->

        <button class="btn btn-info" type="submit" @click.prevent="addPublisher">Thêm</button>
    </form>
    
</template>

<script>
export default {
    emits: ["add:publisher"],
    data() {
        return {
            formData: {},
            // result: {}
        }
    },
    methods: {
        addPublisher() {
            this.$emit('add:publisher', this.formData);
        }
    }
}
</script>