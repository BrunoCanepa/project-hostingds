# Usa la imagen base de Node.js
FROM node:18

# Definir variables de entorno
ARG VITE_SERVER_URL=http://127.0.0.1:7999
ENV VITE_SERVER_URL=$VITE_SERVER_URL

# Vite usará este puerto para `npm run preview`
ENV PORT=8080

# Crear el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos necesarios para la instalación de dependencias
COPY package.json /app/
COPY package-lock.json /app/  

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos
COPY . /app

# Ejecutar el comando de construcción
RUN npm run build

# Exponer el puerto en el que correrá la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación en modo preview
CMD ["npm", "run", "preview", "--", "--host", "--port", "8080"]
