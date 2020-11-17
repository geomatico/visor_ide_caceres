Visor de la IDE de Caceres
==========================

Quick Start
------------

Clone the repository with the --recursive option to automatically clone submodules:

`git clone --recursive http://github.com/geomatico/visor_ide_caceres`

Install NodeJS >= 7.10.0 , if needed, from [here](https://nodejs.org/en/download/releases/).

Start the development application locally:

`npm install`

`npm start`

The application runs at `http://localhost:8081` afterwards.

## GeoStore externo

Para desarrollar solo front-end, se puede editar js/localConfig.js para añadir un geostore externo:

```
"geoStoreUrl": "https://ide2.dip-caceres.geomati.co/geostore/rest/"
```

añadiendo también este servidor a "proxyURL->useCORS".

## GeoStore local

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

### Configurando GeoStore con PostgreSQL

Crear la base de datos `geostore`

`createdb geostore`

ejecutar el script 001, este crea los esquemas y los usuarios

`psql -d geostore -f YOUR_GEOSTORE_DIR/doc/sql/001_setup_db.sql`

ejecutar el script 002 que crea las tablas. Hay que ejecutarlo para los dos esquemas que se han creado. Para ello
se usa la variable 

```
set PGOPTIONS="--search_path=geostore"
psql -U geostore -d geostore -f YOUR_GEOSTORE_DIR/doc/sql/002_create_schema_postgres.sql
```

y para el usuario y base de datos de test

```
set PGOPTIONS="--search_path=geostore_test"
psql -U geostore_test -d geostore -f YOUR_GEOSTORE_DIR/doc/sql/002_create_schema_postgres.sql
```

Ahora hay que hacer un build de geostore con las capacidades de postgres

```
mvn clean install -Dovrdir=postgres -Ppostgres
```

```
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary for GeoStore - 0 Server Root 1.4.1:
[INFO] 
[INFO] GeoStore - 0 Server Root ........................... SUCCESS [  1.230 s]
[INFO] GeoStore - Core .................................... SUCCESS [  0.127 s]
[INFO] GeoStore - Core - Model ............................ SUCCESS [  8.076 s]
[INFO] GeoStore - Core - Security ......................... SUCCESS [ 10.101 s]
[INFO] GeoStore - Core - Persistence ...................... SUCCESS [ 13.369 s]
[INFO] GeoStore - Core - Services API ..................... SUCCESS [  3.209 s]
[INFO] GeoStore - Core - Services implementation .......... SUCCESS [ 15.671 s]
[INFO] GeoStore - Modules ................................. SUCCESS [  0.022 s]
[INFO] GeoStore - Modules - REST root ..................... SUCCESS [  0.019 s]
[INFO] GeoStore - Modules - REST API ...................... SUCCESS [  3.812 s]
[INFO] GeoStore - Modules - REST services ................. SUCCESS [  8.901 s]
[INFO] GeoStore - Modules - REST client ................... SUCCESS [  9.276 s]
[INFO] GeoStore - Modules - REST EXTJS services ........... SUCCESS [ 11.622 s]
[INFO] GeoStore - Modules - REST services test ............ SUCCESS [  2.755 s]
[INFO] GeoStore - Modules - REST auditing ................. SUCCESS [  4.112 s]
[INFO] GeoStore - Web ..................................... SUCCESS [  0.104 s]
[INFO] GeoStore - Webapp .................................. SUCCESS [ 16.389 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  01:49 min
[INFO] Finished at: 2019-10-17T14:40:05+02:00
[INFO] ------------------------------------------------------------------------
```

el `war` que se ha generado en `YOUR_GEOSTORE_DIR/src/web/app/target/` será el que se use.

Ahora habrá que crear el contenedor de GeoStore para usar postgres. Se copia el `war` generado antes en la carpeta

`docker`, se modifica el Dockerfile:

```
# Geostore externalization template. Disabled by default
COPY docker/geostore-datasource-ovr-postgres.properties "${CATALINA_BASE}/conf/"
ENV GEOSTORE_OVR_FILE="file://$CATALINA_BASE/conf/geostore-datasource-ovr-postgres.properties"
ARG GEOSTORE_OVR_OPT="-Dgeostore-ovr=$GEOSTORE_OVR_FILE"
ENV JAVA_OPTS="${JAVA_OPTS} ${GEOSTORE_OVR_OPT}"
```

y se modifica el archivo `geostore-datasource-ovr-postgres.properties`

`
geostoreDataSource.url=jdbc:postgresql://postgis:5432/geostore
`
Se genera de nuevo la imagen y se crea el contenedor pero habrá que introducirlo en la misma red que el contenedor de
postgis que estemos usando.

 ```
docker run -p 9191:8080 --name geostore --network gistools_vpcbr geostore
```

y después 

```
docker start geostore
```

### Configurando GoeStore con EXT json

Para usar EXT Json hay que crear un nuevo war con este servicio.

Para ello lo primero es situarse en la carpeta `src` de geostore y añadir la dependencia al `pom.xml` que hay en esa 

carpeta:
 
```
  <dependency>
      <groupId>it.geosolutions.geostore</groupId>
      <artifactId>geostore-rest-client</artifactId>
      <version>${geostore-version}</version>
   </dependency
``` 

después desde la misma carpeta ejecutamos:

```
mvn clean install -Dovrdir=postgres -Pextjs,postgres
```

y obtendremos de nuevo:

```
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary for GeoStore - 0 Server Root 1.4.1:
[INFO] 
[INFO] GeoStore - 0 Server Root ........................... SUCCESS [  2.069 s]
[INFO] GeoStore - Core .................................... SUCCESS [  0.085 s]
[INFO] GeoStore - Core - Model ............................ SUCCESS [  9.094 s]
[INFO] GeoStore - Core - Security ......................... SUCCESS [  6.981 s]
[INFO] GeoStore - Core - Persistence ...................... SUCCESS [  9.602 s]
[INFO] GeoStore - Core - Services API ..................... SUCCESS [  8.164 s]
[INFO] GeoStore - Core - Services implementation .......... SUCCESS [ 11.074 s]
[INFO] GeoStore - Modules ................................. SUCCESS [  0.023 s]
[INFO] GeoStore - Modules - REST root ..................... SUCCESS [  0.013 s]
[INFO] GeoStore - Modules - REST API ...................... SUCCESS [  4.808 s]
[INFO] GeoStore - Modules - REST services ................. SUCCESS [  7.335 s]
[INFO] GeoStore - Modules - REST client ................... SUCCESS [  5.594 s]
[INFO] GeoStore - Modules - REST EXTJS services ........... SUCCESS [  8.175 s]
[INFO] GeoStore - Modules - REST services test ............ SUCCESS [  3.678 s]
[INFO] GeoStore - Modules - REST auditing ................. SUCCESS [  4.068 s]
[INFO] GeoStore - Web ..................................... SUCCESS [  0.049 s]
[INFO] GeoStore - Webapp .................................. SUCCESS [ 10.216 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  01:32 min
[INFO] Finished at: 2019-10-18T10:42:46+02:00
[INFO] ------------------------------------------------------------------------
```

se creará un nuevo `geostore.war` en la carpeta `<GEOSTORE_DIR>/src/web/app/target` que deberemos copiar en la 
carpeta `docker` de nuestro Mapstore y repetir los pasos para la creación del docker de GeoStore.

## Configurar impresión

Para poder imprimir desde Mapstore será necesario tener configurada la extensión de Printing de GeoServer:

[GeoServer Printing Module](https://docs.geoserver.org/latest/en/user/extensions/printing/index.html)

Una vez instalada y comprobado que está todo correcto, necesitaremos instalar la configuración del plugin. Para ello 
copiaremos los contenidos de la carpeta `resources/geoserver/printing` a nuestra carpeta del módulo de printing del GS

`<GEOSERVER_DATA_DIR/printing>`

Para comprobar si está configurado correctamente:

[http://localhost:8080/geoserver/pdf/info.json](http://localhost:8080/geoserver/pdf/info.json)

En el archivo `config.yaml` se encuentra la definición de las plantillas que hay accesibles a través del módulo printing.

Habrá que configurar las URL necesarias del plugin de impresión de MapStore para que use el módulo propio de impresión.

:warning: LAS URLS DEBERÁN SER ABSOLUTAS, menos en el `devServer.proxy``:warning:

| Archivo |  | valor |
|--------------------|--------------------|-------------------------------------------------|
| `localConfig.json` | `proxyUrl.useCORS` | "http://<URL_SERVIDOR>/geoserver/workspace/wms" |
| `js/pdf/info.json` | `printURL` | "http://<URL_SERVIDOR>/geoserver/pdf/print.pdf" |
| `js/pdf/info.json` | `printURL` | "http://<URL_SERVIDOR>/geoserver/pdf/create.json" |
| `build/buildConfig.json` | `devServer.proxy` | `'/pdf': { target: "http://localhost:8080/geoserver", secure: false }` |
