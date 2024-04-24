<template>
    <Form @submit="addBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="name">Tên sách</label>
            <Field type="text" name="name" class="form-control" v-model="formData.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="author">Tác giả</label>
            <Field type="text" name="author" class="form-control" v-model="formData.author" />
            <ErrorMessage name="author" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="year">Năm xuất bản</label>
            <Field type="text" name="year" class="form-control" v-model="formData.year" />
            <ErrorMessage name="year" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="number">Số lượng</label>
            <Field type="number" name="number" class="form-control" v-model="formData.number" />
            <ErrorMessage name="number" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="publisher">Nhà xuất bản</label>
            <select name="publisher" class="custom-select mb-3" v-model="formData.publisher">
                <!-- <option value="" selected>---Chọn Nhà xuất bản---</option> -->
                <option v-for="pub in publisher" :key="pub._id" :value="pub._id" >{{ pub.name }}</option>
            </select>
        </div>

        <button class="btn btn-info" type="submit">Thêm</button>
    </Form>
    
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import PublisherService from "@/services/publisher.service"
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const bookFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên sách phải có giá trị.")
                .min(2, "Tên sách phải ít nhất 2 ký tự.")
                .max(50, "Tên sách có nhiều nhất 50 ký tự."),
            author: yup
                .string()
                .required("Tên tác giả phải có giá trị.")
                .min(2, "Tên tác giả phải ít nhất 2 ký tự.")
                .max(50, "Tên tác giả có nhiều nhất 50 ký tự."),
            year: yup
                .string()
                .matches(/^[0-9]+$/, 'Chỉ được nhập số.')
                .required("Hãy nhập năm xuất bản.")
                .max(4, "Năm tối đa 4 ký tự."),
            number: yup
                .string()
                .matches(/^[0-9]+$/, 'Chỉ được nhập số.')
                .required("Hãy nhập số lượng.")
        })
        return {
            formData: {},
            bookFormSchema,
            publisher: []
        }
    },
    methods: {
        async getAllPublisher() {
            try {
                this.publisher = await PublisherService.getAll({name: ''});
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

<style>
@import "@/assets/form.css";
</style>