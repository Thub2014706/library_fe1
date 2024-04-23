<template>
    <Form @submit="editPublisher" :validation-schema="publisherFormSchema" >
        <div class="form-group">
            <label for="name">Tên nhà xuất bản</label>
            <Field type="text" name="name" class="form-control" v-model="formData.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field type="text" name="address" class="form-control" v-model="formData.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>

        <button class="btn btn-info" type="submit">Cập nhật</button>
    </Form>
    
</template>

<script>
import PublisherService from "@/services/publisher.service"
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["edit:publisher"],
    props: {
        id: { type: String, required: true },
    },
    data() {
        const publisherFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên nhà xuất bản phải có giá trị.")
                .min(5, "Tên nhà xuất bản phải ít nhất 5 ký tự.")
                .max(50, "Tên nhà xuất bản có nhiều nhất 50 ký tự."),
            address: yup
                .string()
                .required("Hãy nhập địa chỉ.")
                .max(100, "Địa chỉ tối đa 100 ký tự."),
        })
        return {
            formData: {},
            publisherFormSchema
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

<style>
@import "@/assets/form.css";
</style>