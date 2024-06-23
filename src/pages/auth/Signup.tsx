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
import { signupApi } from "@/features/auth/authSlice"
import { AppDispatch } from "@/store/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useToast } from "@/components/ui/use-toast"
import LoadingIcon from "@/components/comman/Loader"
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom"

export default function SignupForm() {

  const dispatch = useDispatch<AppDispatch>()
  const [, setToken] = useCookies(['tete_accessToken', 'tete_refreshToken','user'])
  const { toast } = useToast()
  const Navigate = useNavigate()
  // const { loading /} = useSelector((store: RootState) => store.auth)

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

      dispatch(signupApi({ email: values.email, password: values.password })).then(res => {
        if (res?.type === "auth/signup/fulfilled") {
          const response = res?.payload?.data;
          setToken('tete_accessToken', response?.accessToken)
          setToken('tete_refreshToken', response?.refreshToken)
          setToken('user', response?.createdUser)
          localStorage.setItem('user', JSON.stringify(response?.createdUser));
          Navigate('/')
        }
        console.log('register', res)
      })
      formik.setSubmitting(false)
    }

  })


  useEffect(() => {
    // !loading && 
  }, [])






  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <form onSubmit={formik.submitForm}> */}
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password"  {...formik.getFieldProps('password')} />
            {(formik.errors.password || formik.touched.password) &&
              <Label htmlFor="password" className="text-red-400">{formik.errors.password}</Label>
            }
          </div>
          {<Button className="w-full" onClick={formik.submitForm} >
            Create an account
          </Button>}
          <LoadingIcon />
          <Button variant="outline" className="w-full" onClick={() => toast({ title: "hello" })}>
            Sign up with GitHub
          </Button>
        </div>
        {/* </form> */}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          {/* <Link href="#" className="underline">
            Sign in
          </Link> */}
        </div>
      </CardContent>
    </Card>
  )
}
