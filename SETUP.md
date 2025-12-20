# COADMO - Guía de Instalación y Configuración

Esta guía te llevará paso a paso por el proceso de instalación y configuración de COADMO en Windows.

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación de Dependencias del Sistema](#instalación-de-dependencias-del-sistema)
3. [Configuración del Proyecto](#configuración-del-proyecto)
4. [Instalación de Dependencias del Proyecto](#instalación-de-dependencias-del-proyecto)
5. [Inicio de la Aplicación](#inicio-de-la-aplicación)
6. [Solución de Problemas](#solución-de-problemas)
7. [Configuración Avanzada](#configuración-avanzada)

---

## 📦 Requisitos Previos

### Sistema Operativo
- **Windows 10** o superior
- **Permisos de Administrador** para instalar software

### Infraestructura Requerida
- ✅ **Servidor LDAP/Active Directory** accesible en la red
- ✅ **SQL Server** accesible en la red
- ✅ **Acceso WMI** a los equipos que se van a monitorizar
- ✅ Cuenta de administrador con permisos en AD y WMI

---

## 🔧 Instalación de Dependencias del Sistema

### 1. Python 3.8 o Superior

#### Descargar e Instalar:
1. Visita: https://www.python.org/downloads/
2. Descarga **Python 3.8** o superior (recomendado: **Python 3.11**)
3. Ejecuta el instalador
4. ⚠️ **IMPORTANTE**: Marca la casilla **"Add Python to PATH"**
5. Haz clic en **"Install Now"**

#### Verificar Instalación:
```cmd
python --version
pip --version
```

Deberías ver algo como:
```
Python 3.11.x
pip 23.x.x
```

---

### 2. Node.js 18 LTS o Superior

#### Descargar e Instalar:
1. Visita: https://nodejs.org/
2. Descarga la versión **LTS** (Long Term Support)
3. Ejecuta el instalador con las opciones por defecto
4. Completa la instalación

#### Verificar Instalación:
```cmd
node --version
npm --version
```

Deberías ver algo como:
```
v18.x.x
9.x.x
```

---

### 3. Microsoft ODBC Driver 17 for SQL Server

Este driver es **OBLIGATORIO** para conectarse a SQL Server desde Python.

#### Descargar e Instalar:
1. Visita: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
2. Descarga **ODBC Driver 17 for SQL Server**
3. Ejecuta el instalador
4. Sigue las instrucciones de instalación

#### Verificar Instalación:
1. Abre el **Panel de Control**
2. Ve a **Herramientas Administrativas** > **Orígenes de datos ODBC (64 bits)**
3. En la pestaña **"Controladores"**, verifica que aparezca:
   - `ODBC Driver 17 for SQL Server`

---

### 4. Microsoft Visual C++ Build Tools (Opcional pero Recomendado)

Necesario para compilar algunas dependencias de Python como `python-ldap`.

#### Opción A: Visual Studio Build Tools (Recomendado)
1. Visita: https://visualstudio.microsoft.com/visual-cpp-build-tools/
2. Descarga **Build Tools for Visual Studio**
3. Durante la instalación, selecciona:
   - ✅ **"Desarrollo para escritorio con C++"**
4. Completa la instalación

#### Opción B: Si ya tienes Visual Studio instalado
- Asegúrate de tener los componentes de C++ instalados

---

## ⚙️ Configuración del Proyecto

### 1. Clonar el Repositorio

```cmd
cd C:\
git clone https://github.com/tuusuario/CoAdMo.git
cd CoAdMo
```

O si ya lo descargaste:
```cmd
cd C:\ruta\a\CoAdMo
```

---

### 2. Configurar Variables de Entorno

#### Paso 1: Copiar el archivo de ejemplo
```cmd
copy .env.example .env
```

#### Paso 2: Editar el archivo .env
Abre el archivo `.env` con el Bloc de notas o tu editor favorito:
```cmd
notepad .env
```

#### Paso 3: Configurar las variables

##### 🔐 Django Configuration
```env
# Genera una nueva clave secreta ejecutando:
# python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
SECRET_KEY=tu-clave-secreta-aqui

# Modo debug (True para desarrollo, False para producción)
DEBUG=True

# Hosts permitidos (usa * solo en desarrollo)
ALLOWED_HOSTS=*
```

##### 🌐 LDAP / Active Directory
```env
# Ejemplo: ldap://192.168.1.10
LDAP_HOST=ldap://tu-servidor-ad

# Ejemplo: CN=Administrator,CN=Users,DC=tudominio,DC=local
LDAP_BIND_DN=CN=tu-usuario-admin,CN=Users,DC=tudominio,DC=local

# Contraseña del usuario de bind
LDAP_PASSWORD=tu-contraseña-ldap

# Usuario admin para WMI (puede ser solo el nombre de usuario)
LDAP_ADMIN=administrator

# Ejemplo: DC=tudominio,DC=local
DOMAIN=DC=tudominio,DC=local
```

##### 💾 SQL Server
```env
# Ejemplo: 192.168.1.150 o sqlserver.tudominio.local
DB_HOST=tu-servidor-sql

# Nombre de la base de datos
DB_NAME=Sistemas

# Usuario de SQL Server
DB_USER=tu-usuario-sql

# Contraseña de SQL Server
DB_PASSWORD=tu-contraseña-sql

# Puerto (normalmente 1433)
DB_PORT=1433
```

#### Paso 4: Guardar el archivo
- Guarda y cierra el editor
- ⚠️ **IMPORTANTE**: No compartas este archivo `.env` con nadie, contiene información sensible

---

## 📥 Instalación de Dependencias del Proyecto

### Método Rápido: Usar los Scripts Automatizados

#### 1. Instalar Backend
Haz doble clic en:
```
install_backend.bat
```

O desde la línea de comandos:
```cmd
install_backend.bat
```

Este script:
- ✅ Verifica que Python esté instalado
- ✅ Instala todas las dependencias de Python
- ✅ Ejecuta las migraciones de base de datos
- ✅ Verifica que el archivo `.env` exista

#### 2. Instalar Frontend
Haz doble clic en:
```
install_frontend.bat
```

O desde la línea de comandos:
```cmd
install_frontend.bat
```

Este script:
- ✅ Verifica que Node.js esté instalado
- ✅ Instala todas las dependencias de npm
- ⏱️ Este proceso puede tardar varios minutos

---

### Método Manual (Opcional)

#### Backend:
```cmd
cd backend
pip install -r requirements.txt
python manage.py migrate
cd ..
```

#### Frontend:
```cmd
cd frontend
npm install
cd ..
```

---

## 🚀 Inicio de la Aplicación

### Opción 1: Iniciar Ambos Servidores Automáticamente (Recomendado)

Haz doble clic en:
```
start_all.bat
```

Esto abrirá dos ventanas:
- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:3000

### Opción 2: Iniciar Servidores Individualmente

#### Solo Backend:
```cmd
start_backend.bat
```
- Servidor disponible en: http://localhost:8000
- Admin de Django: http://localhost:8000/admin

#### Solo Frontend:
```cmd
start_frontend.bat
```
- Aplicación disponible en: http://localhost:3000

### Opción 3: Inicio Manual

#### Terminal 1 - Backend:
```cmd
cd backend
python manage.py runserver
```

#### Terminal 2 - Frontend:
```cmd
cd frontend
npm start
```

---

## 🌐 Acceder a la Aplicación

1. Abre tu navegador web
2. Ve a: **http://localhost:3000**
3. Inicia sesión con tus credenciales de Active Directory
4. ✅ ¡Listo! Ya puedes usar COADMO

---

## 🐛 Solución de Problemas

### Problema 1: Error al instalar python-ldap

**Síntoma:**
```
error: Microsoft Visual C++ 14.0 is required
```

**Solución:**
1. Instala **Microsoft Visual C++ Build Tools** (ver sección de requisitos)
2. O instala la versión precompilada:
   ```cmd
   pip install python-ldap --only-binary :all:
   ```

---

### Problema 2: Error de ODBC Driver

**Síntoma:**
```
[Microsoft][ODBC Driver Manager] Data source name not found
```

**Solución:**
1. Verifica que **ODBC Driver 17 for SQL Server** esté instalado
2. Abre **Orígenes de datos ODBC (64 bits)** desde el Panel de Control
3. Verifica que el driver aparezca en la lista

---

### Problema 3: No se puede conectar a SQL Server

**Síntoma:**
```
django.db.utils.OperationalError: (08001)
```

**Solución:**
1. Verifica que SQL Server esté en ejecución
2. Verifica la configuración en `.env`:
   - `DB_HOST` debe ser accesible desde tu máquina
   - `DB_USER` y `DB_PASSWORD` deben ser correctos
3. Verifica que el puerto 1433 esté abierto:
   ```cmd
   telnet DB_HOST 1433
   ```
4. Verifica que SQL Server permita autenticación SQL (no solo Windows)

---

### Problema 4: No se puede conectar a LDAP

**Síntoma:**
```
ldap.SERVER_DOWN
```

**Solución:**
1. Verifica que el servidor LDAP/AD esté en ejecución
2. Verifica la configuración en `.env`:
   - `LDAP_HOST` debe incluir el protocolo: `ldap://` o `ldaps://`
   - `LDAP_BIND_DN` debe tener el formato correcto
3. Prueba la conexión LDAP:
   ```cmd
   ping tu-servidor-ad
   telnet tu-servidor-ad 389
   ```

---

### Problema 5: WMI no funciona con hosts remotos

**Síntoma:**
```
wmi.x_wmi: Access denied
```

**Solución:**
1. Verifica que `LDAP_ADMIN` en `.env` sea una cuenta con:
   - Permisos de administrador local en los equipos remotos
   - Permisos WMI en los equipos remotos
2. Verifica que el Firewall de Windows permita WMI
3. Verifica que el servicio **Windows Management Instrumentation** esté en ejecución

---

### Problema 6: Error al iniciar el frontend

**Síntoma:**
```
npm ERR! missing script: start
```

**Solución:**
1. Asegúrate de estar en el directorio `frontend`:
   ```cmd
   cd frontend
   ```
2. Reinstala las dependencias:
   ```cmd
   npm install
   ```

---

### Problema 7: Puertos ya en uso

**Síntoma:**
```
Error: That port is already in use
```

**Solución:**

#### Para el puerto 8000 (Backend):
```cmd
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

#### Para el puerto 3000 (Frontend):
```cmd
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

O cambia el puerto en el comando de inicio:

**Backend:**
```cmd
python manage.py runserver 8001
```

**Frontend:**
Crea un archivo `.env` en `frontend/` con:
```
PORT=3001
```

---

## 🔧 Configuración Avanzada

### Crear un Superusuario de Django

Para acceder al panel de administración de Django:

```cmd
cd backend
python manage.py createsuperuser
```

Luego accede a: http://localhost:8000/admin

---

### Configurar HTTPS para LDAP (LDAPS)

Si tu servidor LDAP requiere SSL:

1. En `.env`, cambia:
   ```env
   LDAP_HOST=ldaps://tu-servidor-ad:636
   ```

2. Importa el certificado del servidor LDAP si es necesario

---

### Configurar Base de Datos para Producción

En producción, considera:

1. Cambiar `DEBUG=False` en `.env`
2. Configurar `ALLOWED_HOSTS` con tu dominio:
   ```env
   ALLOWED_HOSTS=tudominio.com,www.tudominio.com
   ```
3. Usar un servidor web como **IIS** o **Nginx**
4. Configurar SSL/TLS

---

### Ejecutar Migraciones de Base de Datos

Si modificas los modelos de Django:

```cmd
cd backend
python manage.py makemigrations
python manage.py migrate
```

---

### Recopilar Archivos Estáticos (Producción)

Para preparar el frontend para producción:

```cmd
cd frontend
npm run build
```

Los archivos compilados estarán en `frontend/build/`

---

## 📝 Estructura del Proyecto

```
CoAdMo/
├── backend/                    # Django backend
│   ├── apps/                   # Aplicaciones Django
│   │   ├── authentication/     # Autenticación JWT
│   │   ├── users/              # Gestión de usuarios LDAP
│   │   ├── hosts/              # Monitorización de hosts
│   │   ├── monitor/            # Servicios de monitorización
│   │   └── core/               # Funcionalidades core
│   ├── classes/                # Clases auxiliares
│   │   ├── ActiveDirectory.py  # Cliente LDAP/AD
│   │   ├── BaseHost.py         # Cliente WMI
│   │   └── PowerShell.py       # Ejecución de scripts
│   ├── settings.py             # Configuración de Django
│   ├── requirements.txt        # Dependencias de Python
│   └── manage.py               # CLI de Django
│
├── frontend/                   # React frontend
│   ├── src/                    # Código fuente
│   ├── public/                 # Archivos públicos
│   ├── package.json            # Dependencias de npm
│   └── ...
│
├── .env                        # Variables de entorno (NO incluir en git)
├── .env.example                # Plantilla de variables de entorno
├── install_backend.bat         # Script de instalación backend
├── install_frontend.bat        # Script de instalación frontend
├── start_backend.bat           # Script de inicio backend
├── start_frontend.bat          # Script de inicio frontend
├── start_all.bat               # Script de inicio completo
├── SETUP.md                    # Esta guía
├── README.md                   # Información general del proyecto
└── STATUS.es.md                # Estado técnico del proyecto
```

---

## 🔒 Consideraciones de Seguridad

### En Desarrollo:
- ✅ `DEBUG=True` está bien
- ✅ `ALLOWED_HOSTS=*` está bien
- ✅ Usar base de datos de prueba

### En Producción:
- ⚠️ Cambiar `DEBUG=False`
- ⚠️ Configurar `ALLOWED_HOSTS` con dominios específicos
- ⚠️ Generar nuevo `SECRET_KEY`
- ⚠️ Usar HTTPS (LDAPS y HTTPS para el sitio)
- ⚠️ Configurar firewall correctamente
- ⚠️ Usar contraseñas seguras
- ⚠️ Actualizar dependencias regularmente

---

## 📞 Soporte y Ayuda

### Documentación:
- **README.md**: Información general del proyecto
- **STATUS.es.md**: Estado técnico y dependencias
- **SETUP.md**: Esta guía de instalación

### Problemas Comunes:
1. Revisa la sección de [Solución de Problemas](#solución-de-problemas)
2. Verifica que todas las dependencias del sistema estén instaladas
3. Verifica que el archivo `.env` esté configurado correctamente
4. Verifica los logs de error en la consola

### Logs de Error:

**Backend (Django):**
- Los errores se muestran en la consola donde ejecutaste `start_backend.bat`

**Frontend (React):**
- Los errores se muestran en la consola donde ejecutaste `start_frontend.bat`
- También puedes revisar la consola del navegador (F12)

---

## ✅ Checklist de Instalación

Usa esta lista para verificar que todo esté correcto:

### Requisitos del Sistema:
- [ ] Windows 10 o superior
- [ ] Python 3.8+ instalado y en PATH
- [ ] Node.js 18+ instalado
- [ ] ODBC Driver 17 for SQL Server instalado
- [ ] Visual C++ Build Tools instalados (recomendado)

### Infraestructura:
- [ ] Servidor LDAP/AD accesible
- [ ] SQL Server accesible
- [ ] Credenciales de administrador disponibles
- [ ] Acceso WMI configurado en hosts remotos

### Configuración:
- [ ] Repositorio clonado/descargado
- [ ] Archivo `.env` creado y configurado
- [ ] Variables LDAP configuradas correctamente
- [ ] Variables SQL Server configuradas correctamente

### Instalación:
- [ ] Dependencias backend instaladas (`install_backend.bat`)
- [ ] Migraciones de base de datos ejecutadas
- [ ] Dependencias frontend instaladas (`install_frontend.bat`)

### Verificación:
- [ ] Backend inicia sin errores (`start_backend.bat`)
- [ ] Frontend inicia sin errores (`start_frontend.bat`)
- [ ] Puedes acceder a http://localhost:3000
- [ ] Puedes iniciar sesión con credenciales de AD
- [ ] Los datos se cargan correctamente

---

## 🎉 ¡Instalación Completada!

Si has llegado hasta aquí y todo funciona correctamente, ¡enhorabuena! Ya tienes COADMO funcionando.

**URLs importantes:**
- **Aplicación principal**: http://localhost:3000
- **API Backend**: http://localhost:8000
- **Admin Django**: http://localhost:8000/admin

**Próximos pasos:**
1. Explora los diferentes dashboards
2. Configura los usuarios y permisos en Active Directory
3. Personaliza los componentes del dashboard según tus necesidades

---

**Versión del documento**: 1.0
**Última actualización**: Diciembre 2025
**Autor**: COADMO Project
