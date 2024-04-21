<template>
    <form action="">
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


        <button class="btn btn-info" type="submit" @click.prevent="editPublisher">Cập nhật</button>
    </form>
    
</template>

<script>
import PublisherService from "@/services/publisher.service"

export default {
    emits: ["edit:publisher"],
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            formData: {},
            // result: {}
        }
    },
    methods: {

        async getDetail() {
            try {
                this.formData = await PublisherService.getDetail(this.id);
            } catch (error) {
                console.log(error)
            }
        },

        editPublisher() {
            this.$emit('edit:publisher', this.formData);
        },

    },

    created() {
        this.getDetail(this.id);
    },

}
</script>