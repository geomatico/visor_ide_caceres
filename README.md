Visor de la IDE de Caceres
==========

Quick Start
------------

Clone the repository with the --recursive option to automatically clone submodules:

`git clone --recursive http://github.com/northings/visor_ide_caceres`

Install NodeJS >= 7.10.0 , if needed, from [here](https://nodejs.org/en/download/releases/).

Start the development application locally:

`npm install`

`npm start`

The application runs at `http://localhost:8081` afterwards.

Read more on the [wiki](http://github.com/northings/visor_ide_caceres/wiki).

## GeoStore

Dentro de la carpeta del proyecto hay una carpeta docker. Se ha añadido el war con la versión 1.4.1 de geostore.

Para crear un contenedor que exponga el geostore:

desde la carpeta raiz donde está el `Dockerfile` crearemos la imagen

```
$ docker build -t geostore .
```

para ejecutar la imagen:

```
$ docker run -p 9191:8080 --name geostore geostore
```

Esto nos ejecutará un geostore en:

[http://localhost:9191/geostore/rest](http://localhost:9191/geostore/rest)
