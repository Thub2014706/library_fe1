<template>
    <Form @submit="editReader" :validation-schema="readerFormSchema">
        <div class="form-group">
            <label for="name">Tên độc giả</label>
            <Field type="text" name="name" class="form-control" v-model="formData.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="gender">Giới tính</label>
            <select name="gender" class="custom-select mb-3" v-model="formData.gender">
                <!-- <option value="" selected>---Chọn Giới tính---</option> -->
                <option value="Nam" selected>Nam</option>
                <option value="Nữ">Nữ</option>
            </select>
            <ErrorMessage name="gender" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="birth">Ngày sinh</label>
            <Field type="date" name="birth" class="form-control" v-model="formData.birth" />
            <ErrorMessage name="birth" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="email">E-Mail</label>
            <Field type="email" name="email" class="form-control" v-model="formData.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <Field type="text" name="phone" class="form-control" v-model="formData.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
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
import UserService from "@/services/user.service"
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["edit:reader"],
    props: {
        id: { type: String, required: true },
    },
    data() {
        const readerFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            // gender: yup
            //     .string()
            //     .required("Chọn giới tính."),
            birth: yup
                .date()
                .required("Hãy chọn ngày sinh.")
                .max(new Date(), 'Ngày sinh không được lớn hơn ngày hiện tại.'),
            email: yup
                .string()
                .required("Hãy nhập e-mail.")
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            address: yup
                .string()
                .required("Hãy nhập địa chỉ.")
                .max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .required("Hãy nhập số điện thoại.")
                .matches(
                /((09|03|07|08|05)+([0-9]{8})\b)/g,
                "Số điện thoại không hợp lệ."
            ),
        })
        return {
            formData: {},
            readerFormSchema
        }
    },
    methods: {
        async getDetail() {
            try {
                this.formData = await UserService.getDetail(this.id);
            } catch (error) {
                console.log(error)
            }
        },

        editReader() {
            this.$emit('edit:reader', this.formData);
        },

    },

    created() {
        this.getDetail(this.id);
    },

}
</script>