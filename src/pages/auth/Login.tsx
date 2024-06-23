// import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { loginApi } from "@/features/auth/authSlice"
import { RootState } from "@/store/store"
import { useAppDispatch, useAppSelector } from "@/utils/dispatchconfig"
import { useFormik } from "formik"
import { useCookies } from "react-cookie"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'


export default function LoginForm() {

  const dispatch = useAppDispatch()
  const [, setToken] = useCookies(['tete_accessToken', 'tete_refreshToken',"user"])
  const { toast } = useToast()
  const Navigate = useNavigate()
  const { loading } = useAppSelector(store => store.auth)

  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().email('Invalid email address').required('Email is required'),
    // firstName: Yup.string().trim().required("Please enter your first name !"),
    password: Yup.string().trim().required("Please enter Password !"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true)
      console.log('values', values)

      dispatch(loginApi({ email: values.email, password: values.password })).then(res => {
        if (res?.type === "auth/login/fulfilled") {
          const response = res?.payload?.data;
          setToken('tete_accessToken', response?.accessToken)
          setToken('tete_refreshToken', response?.refreshToken)
          setToken('user', response?.user)
          localStorage.setItem('user', JSON.stringify(response?.user));
          Navigate('/')
        }   
        console.log('Login', res)
      })
      formik.setSubmitting(false)
    }

  })




  // form


  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="email">Email</Label>
            </div>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...formik.getFieldProps('email')}
              required
            />
            {(formik.errors.email || formik.touched.email) &&
              <Label htmlFor="email" className="text-red-400">{formik.errors.email}</Label>
            }
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
            </div>
            <Input id="password" type="password"  {...formik.getFieldProps('password')} />
            {(formik.errors.password || formik.touched.password) &&
              <Label htmlFor="password" className="text-red-400">{formik.errors.password}</Label>
            }
          </div>
          <Button type="submit" className="w-full" onClick={formik.submitForm}>
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          {/* <Link href="#" className="underline">
            Sign up
          </Link> */}
        </div>
      </CardContent>
    </Card>
  )
}
