import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {useState} from "react";

export default function Login() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const handleLogin = () => {
    setErrorMessage("")
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setErrorMessage("Sesión iniciada, redirigiendo...")
          localStorage.setItem('session', JSON.stringify(userCredential.user))
          window.setTimeout(() => {
              window.location.href = "/"
          }, 3000)
        })
        .catch((error) => {
          if (error.code === "auth/invalid-credential") setErrorMessage("Correo o Contraseña incorrecto")
        })
  }

  return (
      <div className="min-h-[80vh] flex text-white">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
              Ingrese con su cuenta de Gerente
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
                onSubmit={ (e) => {
                  e.preventDefault()
                  handleLogin()
                }}
                className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6">
                  Correo Electronico
                </label>
                <div className="mt-2">
                  <input
                      onChange={ (e) => {
                        setEmail(e.target.value)
                      }}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6">
                    Contraseña
                  </label>
                </div>
                <div className="mt-2">
                  <input
                      onChange={ (e) => {
                        setPassword(e.target.value)
                      }}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-cyan-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Ingresar
                </button>
              </div>

              {
                errorMessage ? (
                    <div>
                      <button
                          disabled
                          type="submit"
                          className="flex w-full justify-center rounded-md border-2 border-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-amber-500 shadow-sm"
                      >
                        { errorMessage }
                      </button>
                    </div>
                ) : ""
              }
            </form>
          </div>
        </div>
      </div>
  )
}
