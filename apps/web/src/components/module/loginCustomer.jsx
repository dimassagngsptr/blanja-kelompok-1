import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../configs/redux/action/auth.action";
import { useNavigate } from "react-router-dom";
import loginRegist from "../../utils/login";
import api from "../../utils/api";

const LoginCustomer = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      showPassword: false,
    },
    validationSchema: loginRegist,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Handling form submission");
      console.log("Submitting form with values:", values);
      try {
        const response = await fetch("http://localhost:3000/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        console.log(response);

        if (!response.ok) {
          throw new Error("Ada kesalahan silahkan cari tahu");
        }

        const data = await response.json();
        console.log("Success:", data);
        dispatch(loginAction(data.user, data.token));
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
      }
      setSubmitting(false);
    },
  });

  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //     showPassword: false,
  //   },
  //   validationSchema: loginRegist,
  //   onSubmit: async (values, { setSubmitting }) => {
  //     console.log('Submitting form with values:', values);
  //     try {
  //       const response = await api.post('/auth/login', values);
  //       const { token, user } = response.data;

  //       // Dispatch login action
  //       dispatch(loginAction(user, token));

  //       alert('Login successful');
  //       navigate('/');
  //     } catch (error) {
  //       console.error('Login error:', error);
  //       alert('Failed to login. Please check your email and password.');
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   },
  // });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <input
              className="border border-gray-500 rounded py-2 px-2"
              type="email"
              name="email"
              placeholder="Masukkan email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-[12px] font-poppins">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <input
                className="border border-gray-500 rounded py-2 px-2 w-full"
                type={formik.values.showPassword ? "text" : "password"}
                name="password"
                placeholder="Masukkan password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-sm"
                onClick={() =>
                  formik.setFieldValue(
                    "showPassword",
                    !formik.values.showPassword
                  )
                }
              >
                {formik.values.showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-[12px] font-poppins">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="flex justify-center ml-64 text-red-maroon hover:font-semibold hover:text-orange-500 cursor-pointer">
            Forgot password?
          </div>

          <div className="flex justify-center py-5">
            <button
              type="submit"
              className={`bg-red-500 flex justify-center w-full h-12 py-2 text-white text-lg font-semibold border rounded-full cursor-pointer hover:bg-[#DB3022]`}
              disabled={formik.isSubmitting}
            >
              Login Customer
            </button>
          </div>
        </div>
      </form>

      <div className="flex justify-center">
        <p>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-red-maroon hover:font-semibold hover:text-red-500 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginCustomer;
