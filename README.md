
# 🚛 MC Web Admin
Este proyecto web esta orientado a la administración de Mundo Camiones. Solo usuarios registrados podrán acceder a esta web, en donde podrán gestionar a los diferentes actores de la aplicación móvil del cliente y otros procesos administrativos.


## 🚀 Sobre el proyecto
El proyecto esta construido sobre el framework de Next Js en su versión 14 con interfaz basada en Next UI y Tailwind Css, combinados con otras librerías.
### Tecnologías utilizadas:
- React 
- Next Js
- React Query
- Typescript
- Tailwind Css
- Next UI
- Zustand
- Zod
- Axios
- Sonner

### Estructura del proyecto:
MC_Front_Web-Admin/
├── app/
│ ├── (AdminPanel)/
│ │ ├── app-config/
│ │ ├── customs-agents/
│ │ ├── payments-management/
│ │ ├── post-management/
│ │ ├── settings/
│ │ ├── shipments-management/
│ │ ├── users-management/
│ ├── (Auth)/
│ │ ├── login/
│ │ ├── recovery-password/
│ │ ├── update-password/
│ ├── (Providers)/
│ ├── api/
│ │ ├── admin/
│ │ ├── auth/
│ │ │ ├── [...nextauth]/
├── components/
│ ├── autocomplete/
│ ├── buttons/
│ ├── cards/
│ ├── dropzone/
│ ├── features/
│ ├── inputs/
│ ├── layout/
│ ├── modal/
│ ├── radios/
│ ├── selects/
│ ├── table/
│ │ ├── pagination/
│ │ ├── render-cell/
│ ├── tabs/
│ ├── textarea/
│ ├── ui/
├── const/
│ ├── columns/
├── helpers/
│ ├── api/
├── hooks/
│ ├── api/
│ ├── lots/
│ ├── order/
│ ├── pagination/
│ ├── socket/
│ ├── transmission/
├── icons/
│ ├── src/
├── lib/
│ ├── auth/
│ ├── axios/
│ ├── clsx/
│ ├── utils/
│ ├── validators/
├── public/
│ ├── images/
├── store/
├── types/
│ ├── api/
│ │ ├── request/
│ │ ├── response/
│ ├── store/
│ ├── ui/
├── middleware.ts

### Descripción de las Carpetas y Archivos Principales
- **MC_Front_Web-Admin/app/**: Archivos de ui de error, not-found, layout, archivo global de css, favicon y principales carpetas para el manejo de rutas y api de la aplicación.
- **MC_Front_Web-Admin/app/(AdminPanel)/**: Manejo de pages.tsx para cada ruta de la aplicación web y su layout principal.
- **MC_Front_Web-Admin/app/(Auth)/**: Manejo de rutas de autenticación y recuperación y actualización de contraseñas, junto a su layout principal.
- **MC_Front_Web-Admin/app/(Providers)/**: Archivo principal de manejo de proveedores de estado e información global de la aplicación, por ejemplo: Next UI provider, Next themes provider, Session Provider, QueryClientProvider de tank stack.
- **MC_Front_Web-Admin/app/api/**: Manejo de rutas y endpoints de conexión con nuestro backend de Mundo camiones.
- **MC_Front_Web-Admin/components/**: Archivos de componentes creados para el sistema web.
- **MC_Front_Web-Admin/components/autocomplete**: Componentes de autocomplete para Búsqueda y selección de ciudades, administradores, países, agentes aduaneros, puertos.
- **MC_Front_Web-Admin/components/buttons**: Componentes de botones.
- **MC_Front_Web-Admin/components/cards**: Componentes de cards.
- **MC_Front_Web-Admin/components/dropzone**: Componentes de dropzone, manejo de archivos.
- **MC_Front_Web-Admin/components/features**: Componentes ordenados para cada ruta de nuestro app, estructurada de la misma forma que las carpetas que contienen el (AdminPanel).
- **MC_Front_Web-Admin/components/inputs**: Componentes de inputs, aquí encontramos el date range picker, un custom input y la barra de búsqueda personalizada para las tablas asíncronas.
- **MC_Front_Web-Admin/components/layout**: Componentes de layout para la vista principal y la vista de autenticación de usuarios.
- **MC_Front_Web-Admin/components/modal**: Componentes de modales personalizados, modal de eliminación, Modal de preview de imágenes, modal de cambio de status.
- **MC_Front_Web-Admin/components/radios**: Componentes radio personalizado.
- **MC_Front_Web-Admin/components/select**: Componentes de selectores como tamaño de páginas usado para las tablas, un select personalizado con tema de la aplicación, botón seleccionador de filtros, un selector de filtros, y un selector de género.
- **MC_Front_Web-Admin/components/table**: Componentes de tabla personalizada con cada parte personalizada y configurable, para el uso de información pequeña, a gran escala, asíncrona, paginada, etc según sea el caso.
- **MC_Front_Web-Admin/components/table/pagination**: Componentes de paginación personalizada para el uso de tablas asíncronas y data de gran escala.
- **MC_Front_Web-Admin/components/table/render-cell**: Componentes de renderización de celdas para cada caso de uso de las diferentes columnas de las diferentes tablas desplegadas en la aplicación.
- **MC_Front_Web-Admin/components/table**: Componentes personalizados de tabs.
- **MC_Front_Web-Admin/components/tabs**: Componentes personalizados de textarea.
- **MC_Front_Web-Admin/components/ui**: Componentes globales de UI, aquí podemos encontrar el botón de regreso usado para cada vista de cada módulo, componentes de error, navbar, aside, items del aside, secciones, sidebar, componente de carga de datos (loader) y el componente de contenedor principal.
- **MC_Front_Web-Admin/const/**: Archivos de manejo de constantes, como base urls, rutas fijas, rutas del sidebar, estilos personalizados, constantes para el manejo de errores con zod, etc.
- **MC_Front_Web-Admin/helpers/**: Archivos de funciones de ayuda  para el manejo de errores y conexión con la api de next js.
- **MC_Front_Web-Admin/hooks/**: Archivos de hooks personalizados, separados en carpetas según el uso por ejemplos custom hooks para conexiones del api usando react query, custom hooks de query params, el uso de detectar el responsive, usar el toast de sonner, socket, paginación, etc.
- **MC_Front_Web-Admin/icons/**: Carpeta contenedora de los iconos principales para la aplicación en formato svg y que tiene previa configuración en el archivo de la raíz /svg.d.ts.
- **MC_Front_Web-Admin/lib/**: Carpeta contenedora de archivos de ayuda para configuración de librerías, validaciones de datos con zod, algunas funciones de utilidad para toda la aplicación, autenticación con next auth, etc.
- **MC_Front_Web-Admin/public/**: Carpeta contenedora archivos públicos como imágenes.
- **MC_Front_Web-Admin/store/**: Carpeta contenedora de archivos de store o estados globales manejados por zustand en el uso de cada formulario en la aplicación web.
- **MC_Front_Web-Admin/types/**: Carpeta contenedora de archivos de tipado de datos de nuestra conexión a la api separados en carpetas de request y response, tipado del store de estados globales, tipado para el UI, enums de datos definidos en el backend, y tipado de datos para next auth.
- **.gitignore**: Archivos y directorios que Git debe ignorar.
- **.eslintrc.json**: Archivos de configuración del linter.
- **middleware.ts**: Archivo de protección de rutas.
- **next.config.mjs**: Archivo de configuración de Next.js.
- **package.json**: Archivo que contiene las dependencias y scripts del proyecto.
- **tailwind.config.ts**: Archivo que contiene la configuración de tailwind.
- **.env.example**: Archivo de ejemplo de estructura de los environment locales en el proyecto.


## Corre el proyecto en local

Para obtener el proyecto seguir los siguientes pasos:

    1. Clona el repositorio

```bash
  git clone https://github.com/Proyectos-marketplace/MC_Front_Web-Admin.git
```
    2. Dirígete al directorio
```bash
  cd aquí-el-directorio
```
    3. Instala las dependencias
```bash
  npm install
```
    4. Inicia el proyecto en modo desarrollo
```bash
  npm run dev  
```

Abra [http://localhost:3000](http://localhost:3000) con su navegador para ver el resultado.

>[!Important]
> No olvidar configurar tus archivos .env



## Sobre Next Js

Para obtener más información sobre Next.js, consulte los siguientes recursos:

- [Documentación de Next.js] (https://nextjs.org/docs): obtenga información sobre las funciones y la API de Next.js.
- [Aprende Next.js](https://nextjs.org/learn): un tutorial interactivo de Next.js.

