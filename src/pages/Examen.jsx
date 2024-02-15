import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Notificacion = () => (
  <div className="transition-opacity duration-500 mt-3 flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium">Usaurio no encontrado!</span>
    </div>
  </div>
)


const Examen = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const verifyUser = (e) => {
    e.preventDefault()
    setShow(!show)
    if (e.target[0].value == '56293413' || e.target[0].value == '49189815') {
      navigate('/alumno')
      localStorage.setItem('user', e.target[0].value)
    }

    // navigate('/admin')
  }

  return (
    <div className="mt-16 lg:w-3/12 m-auto bg-white p-5 rounded-xl shadow-lg">
      <h3 className="text-2xl font-semibold mb-4 text-center">Ingresar Usuario</h3>
      <hr className="mb-3" />
      <form className="flex flex-col" onSubmit={verifyUser}>
        <label htmlFor="user" className="mb-2">Cédula</label>
        <input
          type="text"
          placeholder="Ej: 12345678"
          className=" p-2 rounded-lg shadow-md focus:ring-blue-500"
        />
        {show && <Notificacion />}
        <section className="m-auto mt-3">
          <button type="submit" className="bg-blue-500 p-2 px-6 rounded-lg shadow-md focus:ring-blue-500">Ingresar</button>
        </section>
      </form>
    </div>
  )
}

export default Examen