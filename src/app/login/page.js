import { Button, Input } from "@nextui-org/react"
import { Logo } from "@/components/Logo"

export default function App() {
  const placements = ["outside"]

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo className="flex flex-col items-center justify-center"></Logo>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-2 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-10">
              Login
            </h1>
            <div className="space-y-4 md:space-y-6 mb-4 mt-4">
              {placements.map((placement) => (
                <Input
                  key={placement}
                  type="Email"
                  label="Email"
                  labelPlacement={placement}
                  placeholder="Write your email"
                  className="mb-12"
                />
              ))}

              {placements.map((placement) => (
                <Input
                  key={placement}
                  type="password"
                  label="Password"
                  labelPlacement={placement}
                  placeholder="*******"
                  className="mb-10"
                />
              ))}
            </div>
            <Button
              color="primary"
              className="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Belum Punya Akun?{" "}
              <a
                href="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Yuk Buat Akun
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
