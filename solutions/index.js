import net from 'node:net'
import fs from 'node:fs'

// # EJERCICIO 1
export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    callback(null, { time: process.hrtime(startTime), ip })
  })

  client.on('error', (err) => {
    throw err
    callback(err)
  })
}

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  console.log(info)
})

// # EJERCICIO 2
export function obtenerDatosPromise () {
  return new Promise(resolve => {
    setTimeout(resolve({ data: 'datos importantes' }), 2000)
  })
}

// # EJERCICIO 3
export const procesarArchivo = (callbackResult) => {
  fs.readFile('input.txt', 'utf8', (error, contenido) => {
    if (error) {
      console.error('Error leyendo archivo:', error.message)
      return callbackResult('Error leyendo archivo: ' + error.message)
    }

    const textoProcesado = contenido.toUpperCase()

    fs.writeFile('output.txt', textoProcesado, error => {
      if (error) {
        console.error('Error guardando archivo:', error.message)
        return callbackResult('Error guardando archivo:', error.message)
      }

      console.log('Archivo procesado y guardado con éxito')
      return callbackResult()
    })
  })
}

export function procesarArchivoPromise () {
  return new Promise((resolve, reject) => {
    fs.readFile('input.txt', 'utf8', (error, contenido) => {
      if (error) {
        console.error('Error leyendo archivo:', error.message)
        reject(error)
      }

      const textoProcesado = contenido.toUpperCase()

      fs.writeFile('output.txt', textoProcesado, error => {
        if (error) {
          console.error('Error guardando archivo:', error.message)
          reject(error)
        }

        console.log('Archivo procesado y guardado con éxito')
        resolve()
      })
    })
  })
}

// # EJERCICIO 4
export async function leerArchivos () {
  const promise1 = fsPromises.readFile('archivo1.txt', 'utf8')
  const promise2 = fsPromises.readFile('archivo2.txt', 'utf8')
  const promise3 = fsPromises.readFile('archivo3.txt', 'utf8')

  const [archivo1, archivo2, archivo3] = await Promise.all([promise1, promise2, promise3])
  return `${archivo1} ${archivo2} ${archivo3}`
}

// # EJERCICIO 5
export async function delay () {
  return new Promise(resolve => setTimeout(() => { resolve() }, time))
}
