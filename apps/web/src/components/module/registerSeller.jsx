import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import registSeller from '../../utils/registSeller.js'
import { useDispatch } from 'react-redux';
import { toastify } from '../base/toastify.js';
import { registerStart, registerSuccess, registerFailure } from "../../configs/redux/action/authRegist";
import './Register.css';

const RegisterSeller = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = registSeller;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      phone_number: "",
      password: "",
      showPassword: false,
      name: "",
      gender: "",
      // store_name: "",
      role: "seller",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(registerStart());
      try {
        const response = await fetch('https://blanja-kelompok-1-production.up.railway.app/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);

        dispatch(registerSuccess(data.user));
        navigate('/login')
        toastify("success", "Registration successful");
      } catch (error) {
        dispatch(registerFailure(error.message));
        toastify("error", error.message);
      } finally {
        setLoading(false);
      }
      toastify("error", response?.response?.data?.message);
      setLoading(false);
    },
  });

  return (
    <div className="w-full flex flex-col gap-1">
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full flex flex-col gap-3">
          <div className="flex flex-col">
            <input
              className="border border-gray-500 rounded py-2 px-2"
              type="text"
              name="name"
              placeholder="Masukkan nama"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-[12px] font-poppins">
                {formik.errors.name}
              </div>
            )}
          </div>
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
            <input
              className="border border-gray-500 rounded py-2 px-2"
              type="text"
              name="phone_number"
              placeholder="Masukkan telepon"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone_number && formik.errors.phone_number && (
              <div className="text-red-500 text-[12px] font-poppins">
                {formik.errors.phone_number}
              </div>
            )}
          </div>
          {/* <div className="flex flex-col">
            <input
              className="border border-gray-500 rounded py-2 px-2"
              type="text"
              name="store_name"
              placeholder="Masukkan nama toko"
              value={formik.values.store_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.store_name && formik.errors.store_name && (
              <div className="text-red-500 text-[12px] font-poppins">
                {formik.errors.store_name}
              </div>
            )}
          </div> */}
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
          <h1>Gender:</h1>
          <div className="flex space-x-4 items-center">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formik.values.gender === "male"}
                onChange={() => formik.setFieldValue("gender", "male")}
                className="mr-2 custom-radio"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formik.values.gender === "female"}
                onChange={() => formik.setFieldValue("gender", "female")}
                className="mr-2 custom-radio"
              />
              Female
            </label>
          </div>
          {formik.touched.gender && formik.errors.gender && (
            <div className="text-red-500 text-[12px] font-poppins">
              {formik.errors.gender}
            </div>
          )}
        </div>
        <div className='flex justify-center py-2'>
          <Button type="submit" className={`bg-red-500 justify-center w-full h-12 py-2 text-white text-lg font-semibold border rounded-full cursor-pointer hover:bg-[#DB3022]`} disabled={formik.isSubmitting}>
            {loading ? 'Loading...' : 'Daftar'}
          </Button>
        </div>
      </form>
      <div className="flex justify-center">
        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-maroon hover:font-semibold hover:text-red-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterSeller;