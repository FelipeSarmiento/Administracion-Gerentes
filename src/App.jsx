import { handleNewUser, newOperario, getOperarios, deleteOperario } from "../settings/firebase.js";
import {useEffect, useState} from "react";
function App() {
  if (!localStorage.getItem('session')) {
    return window.location.href = "/login"
  }

  const [session, setSession] = useState(JSON.parse(localStorage.getItem('session')))

  const [nombresGerente, setNombresGerente] = useState()
  const [apellidosGerente, setApellidosGerente] = useState()
  const [emailGerente, setEmailGerente] = useState()
  const [celularGerente, setCelularGerente] = useState()
  const [celulaGerente, setCelulaGerente] = useState()
  const [areaGerente, setAreaGerente] = useState()
  const [contraseniaGerente, setContraseniaGerente] = useState()
  const [contraseniaConfGerente, setContraseniaConfGerente] = useState()
  const [errorMessage, setErrorMessage] = useState()

  const [nombresOperario, setNombresOperario] = useState()
  const [celulaOperario, setCelulaOperario] = useState()

  const [operarios, setOperarios] = useState()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect( () => {
    getOperarios(session.uid).then((_operarios) => {
      setOperarios(_operarios)
    } )
  }, []);



  return (
    <>
      <div className="xl:p-10 min-h-[90vh] h-[90vh] flex w-screen items-center justify-center">
        <div className="h-full md:p-10 grid grid-cols-1 md:grid-cols-3 xl:gap-x-10 w-full">
          <div className="col-span-2 md:p-4 space-y-1 text-white rounded-md">
            <form onSubmit={ (e) => {
              e.preventDefault()
              newOperario(session.uid, nombresOperario, celulaOperario).then(()=>{
                getOperarios(session.uid).then((_operarios) => {
                  setOperarios(_operarios)
                } )
              })
            } }>
              <div className="h-16 grid py-2 grid-cols-12 items-center">
                <div className="col-span-2 h-full flex items-center justify-center text-center text-xs md:text-md font-bold">Registrar <br/>Nuevo
                  Operario
                </div>
                <div className="col-span-4 h-full flex items-center justify-center text-center px-1 md:px-4">
                  <input onChange={ (e) => { setNombresOperario(e.target.value) } } value={nombresOperario} required={true} type="text" placeholder="Ingrese los nombres"
                         className="w-full h-full px-2 text-xs md:text-md truncate bg-transparent border-b-2 outline-none"/>
                </div>
                <div className="col-span-4 h-full flex items-center justify-center text-center px-1 md:px-4">
                  <input onChange={(e) => {
                    setCelulaOperario(e.target.value)
                  }} value={celulaOperario} required={true} type="text" placeholder="Ingrese la celula"
                         className="w-full h-full px-2 text-xs md:text-md truncate bg-transparent border-b-2 outline-none"/>
                </div>
                <div className="col-span-2 h-full flex items-center justify-center text-center">
                  <button type="submit" className="bg-cyan-500 py-2 text-xs px-2 md:px-5 rounded-md font-bold">Agregar</button>
                </div>
              </div>
            </form>
                <div className="h-16 rounded-md grid grid-cols-12 divide-x-2 divide-cyan-500 text-cyan-500 items-center">
                  <div className="col-span-2 px-4">id</div>
                  <div className="col-span-5 px-4">Nombres</div>
                  <div className="col-span-3 px-4">Número Celula</div>
                  <div className="col-span-2 px-4"></div>
                </div>
                {
                  operarios?.map((operario) => {
                    return (
                        // eslint-disable-next-line react/jsx-key
                        <div className="h-10 rounded-md grid grid-cols-12 divide-x-2 text-white items-center">
                          <div className="col-span-2 px-4 truncate">{operario.id}</div>
                          <div className="col-span-5 px-4 truncate">{operario.nombre}</div>
                          <div className="col-span-3 px-4 truncate">{operario.celula}</div>
                          <div className="col-span-2 px-4 flex items-center justify-around">
                            <button title="Editar" className="">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                   stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                              </svg>

                            </button>
                            <button
                                onClick={ () => {
                                  deleteOperario(session.uid, operario.id).then(() => {
                                    getOperarios(session.uid).then((_operarios) => {
                                      setOperarios(_operarios)
                                    } )
                                  })
                                } }
                                title="Eliminar" className="text-red-500">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                   stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                    )
                  })
                }

          </div>
          <div className=" col-span-1 border-l-2 p-4 flex flex-col justify-center items-center border-white-500">
            <section className="h-16 text-xl font-bold flex items-center justify-center text-cyan-500">
              <h3>Registrar Nuevo Gerente</h3>
            </section>
            <form onSubmit={async (e) => {
              setErrorMessage("")
              e.preventDefault()
             if(contraseniaGerente === contraseniaConfGerente) {
                setErrorMessage(await handleNewUser({
                  nombres: nombresGerente,
                  apellidos: apellidosGerente,
                  email: emailGerente,
                  password: contraseniaGerente
                }))
             }
             else {
               setErrorMessage("Las contraseñas no coinciden")
             }
            }} className="w-full">
              <section className="2xl:grid 2xl:grid-cols-2 text-white gap-x-6 gap-y-4 p-4 min-h-36 w-full justify-center">
                <div className="flex flex-col">
                  <label htmlFor="nombresNuevoGerente">Nombres</label>
                  <input id="nombresNuevoGerente" onChange={ (e) => { setNombresGerente(e.target.value) } } value={ nombresGerente } required={true} type="text" placeholder="Ingrese los nombres"
                         className="w-full h-10 px-1 bg-transparent border-b-2 outline-none"/>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="apellidosNuevoGerente">Apellidos</label>
                  <input id="apellidosNuevoGerente"  onChange={ (e) => { setApellidosGerente(e.target.value) } } value={ apellidosGerente } required={true} type="text" placeholder="Ingrese los apellidos"
                         className="w-full h-10 px-1 bg-transparent border-b-2 outline-none"/>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="emailNuevoGerente">Email</label>
                  <input id="emailNuevoGerente"  onChange={ (e) => { setEmailGerente(e.target.value) } } value={ emailGerente } required={true} type="email" placeholder="Correo electronico"
                         className="w-full h-10 px-1 bg-transparent border-b-2 outline-none"/>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="celularNuevoGerente">Celular</label>
                  <input id="celularNuevoGerente"  onChange={ (e) => { setCelularGerente(e.target.value) } } value={ celularGerente } required={true} type="text" placeholder="Ingrese el celular"
                         className="w-full h-10 px-1 bg-transparent border-b-2 outline-none"/>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="contrasenia">Contraseña</label>
                  <input id="contrasenia"  onChange={ (e) => { setContraseniaGerente(e.target.value) } } value={ contraseniaGerente } required={true} type="password" placeholder="Contraseña"
                         className="w-full h-10 px-1 bg-transparent border-b-2 outline-none"/>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="confirmarContrasenia">Confirmar Contraseña</label>
                  <input onChange={ (e) => { setContraseniaConfGerente(e.target.value) } } value={ contraseniaConfGerente }
                      id="confirmarContrasenia" type="password" placeholder="Confirme la contraseña"
                         className="w-full h-10 px-1 bg-transparent border-b-2 outline-none"/>
                </div>
                <div className="relative col-span-2 flex items-center justify-evenly mt-5">
                  <button
                      onClick={ () => {
                        setContraseniaConfGerente("")
                        setContraseniaGerente("")
                        setNombresGerente("")
                        setApellidosGerente("")
                        setEmailGerente("")
                        setCelularGerente("")
                        setErrorMessage("")
                      }}
                      type="button" className="bg-red-500 py-2 px-5 rounded-md font-bold">Borrar</button>
                  <button type="submit" className="bg-cyan-500 py-2 px-5 rounded-md font-bold">Registrar</button>
                  {
                    errorMessage ? (
                        <div className="absolute top-[200%]">
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
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
