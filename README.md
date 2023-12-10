# TEATRO GALEGUISTA

Trabajo de final de evaluacion

## Hecho por

- [@Omar](https://www.github.com/rakions)
- [@Zas](https://www.github.com/meeeww)

## Tecnologías

- Js
- Express
- Gulp
- Sass

# Creación del contenedor
```bash
docker build -t teatro-galeguista .
```
Para el frontend
```
docker run -dit --name teatro-galeguista-app -p 8080:80 teatro-galeguista
```
Para el backend
```
docker run -dit --name teatro-galeguista-app -p 80:3000 teatro-galeguista
```

# Desarrollo
Para el desarrollo de la web, en el servidor habrá que instalar todas las dependencias
```
npm i
```
Y en el frontend en desarrollo, habrá que cambiar la IP de la API 54.242.0.71 para la de localhost:3000

http://teatrogaleguista.s3.amazonaws.com/pages/mainPage.html
