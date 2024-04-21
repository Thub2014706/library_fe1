<template>
  <h3>hhh</h3>
    <Form
      @submit="submitLogin"
      :validation-schema="loginFormSchema"
    >
      <!-- <div class="form-group">
        <label for="name">Tên</label>
        <Field
          name="name"
          type="text"
          class="form-control"
        />
        <ErrorMessage name="name" class="error-feedback" />
      </div> -->
      
      <div class="form-group">
        <label for="email">E-Mail</label>
        <Field
          name="email"
          type="email"
          class="form-control"
          v-model="loginLocal.email"
        />
        <ErrorMessage name="email" class="error-feedback" />
      </div>

      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <Field
          name="password"
          type="password"
          class="form-control"
          v-model="loginLocal.password"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>

      <!-- <div class="form-group">
        <label for="phone">Số điện thoại</label>
        <Field
          name="phone"
          type="text"
          class="form-control"
        />
        <ErrorMessage name="phone" class="error-feedback" />
      </div>

      <div class="form-group">
        <label for="address">Địa chỉ</label>
        <Field
          name="address"
          type="text"
          class="form-control"
        />
        <ErrorMessage name="address" class="error-feedback" />
      </div> -->
      
      <button class="btn btn-primary">Đăng nhập</button>
    </Form>
</template>
  
<script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  import EmployeeService from "../../services/employee.service"

  export default {
    components: {
      Form, 
      Field, 
      ErrorMessage
    },
    emits: ["submit:login"],
    props: {
      login: { type: Object, required: true }
    },
    data() {
      const loginFormSchema = yup.object().shape(
        {
        email: yup
          .string()
          .email("E-mail không đúng.")
          .max(50, "E-mail tối đa 50 ký tự."),
        password: yup
          .string()
          .required("Yêu cầu nhập mật khẩu.")

        },
      );
      return {
      loginLocal: {
          email: '',
          password: ''
        },
        loginFormSchema
      };
    },
    methods: {
      async submitLogin() {
        // try {
        //   const response = await EmployeeService.create;
        //   this.$emit("submit:login", response.data);
        // } catch (error) {
        //   console.error("Lỗi đăng nhập:", error);
        // }
      }
    },
  };
  
</script>