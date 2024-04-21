<template>
    <form action="">
        <div class="form-group">
            <label for="name">Tên sách</label>
            <input type="text" name="name" class="form-control" v-model="formData.name" />
        </div>

        <div class="form-group">
            <label for="author">Tác giả</label>
            <input type="text" name="author" class="form-control" v-model="formData.author" />
        </div>

        <div class="form-group">
            <label for="year">Năm xuất bản</label>
            <input type="text" name="year" class="form-control" v-model="formData.year" />
        </div>

        <div class="form-group">
            <label for="number">Số lượng</label>
            <input type="text" name="number" class="form-control" v-model="formData.number" />
        </div>

        <!-- <div class="form-group">
            <label for="type">Thể loại</label>
            <input type="text" name="number" class="form-control" />
        </div> -->

        <!-- <div class="form-group">
            <label for="number">Nhà xuất bản</label>
            <input type="text" name="number" class="form-control" />
        </div> -->

        <div class="form-group">
            <label for="publisher">Nhà xuất bản</label>
            <select name="publisher" class="custom-select mb-3" v-model="formData.publisher">
                <option value="" selected>---Chọn Nhà xuất bản---</option>
                <option v-for="pub in publisher" :key="pub._id" :value="pub.name" >{{ pub.name }}</option>
            </select>
        </div>

        <button class="btn btn-info" type="submit" @click.prevent="addBook">Thêm</button>
    </form>
    
</template>

<script>
import PublisherService from "@/services/publisher.service"
export default {
    data() {
        return {
            formData: {},
            publisher: []
            // result: {}
        }
    },
    methods: {
        async getAllPublisher() {
            try {
                this.publisher = await PublisherService.getAll();
            } catch (error) {
                console.log(error)
            }
        },

        addBook() {
            this.$emit('add:book', this.formData);
        },

    },

    mounted() {
        this.getAllPublisher()
    },
}
</script>