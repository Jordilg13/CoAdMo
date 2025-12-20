# ESTADO DEL PROYECTO COADMO
**Documento de Estado Técnico y Funcional**
*Última actualización: Diciembre 2025*

---

## 📋 RESUMEN EJECUTIVO

**COADMO** (versión 2.6.0) es una aplicación web de monitorización de servicios y hosts que proporciona una interfaz de usuario elegante, flexible y responsive para visualizar datos de infraestructura en tiempo real.

### Estado General
- **Estado del Proyecto**: ✅ Funcional (en desarrollo activo)
- **Rama Actual**: `claude/add-spanish-status-readme-Hzw6o`
- **Último Commit**: `4c53a15` - "new features in readme"
- **Licencia**: MIT

---

## 🎯 FUNCIONALIDADES PRINCIPALES

### 1. Gestión de Usuarios LDAP/Active Directory
- **Visualización** de usuarios del dominio LDAP
- **Gestión completa**: crear, modificar, eliminar y desbloquear usuarios
- **Monitorización** de usuarios bloqueados y con contraseñas expiradas
- **Perfiles detallados** de usuario con información completa
- **Búsqueda avanzada** y filtrado de usuarios
- **Etiquetado** automático según estado del usuario
- **Enlaces directos** para enviar email al usuario
- **Redirección** al perfil del equipo del usuario

### 2. Monitorización de Hosts
- **Listado** de hosts activos en el dominio LDAP
- **Monitorización en tiempo real**:
  - Uso de RAM
  - Uso de CPU
  - Espacio en disco duro
  - Estado de conexión
- **Inventarios**:
  - Hardware instalado
  - Software instalado
- **Carga asíncrona** de datos con loaders independientes por tipo de información
- **Operaciones remotas**: reinicio y apagado de equipos (implementado en backend)

### 3. Monitorización de Base de Datos SQL Server
- **Conexiones SQL**: visualización de conexiones activas por base de datos
- **Gráficas**: número de conexiones separadas por aplicación
- **Monitorización** del estado del servicio SQL Server
- **Almacenamiento** de métricas de conexiones en base de datos

### 4. Dashboard Principal
- **Tarjetas de estado** de sistemas, servidores y servicios
- **Componentes personalizables** para monitorización
- **Gráfica de conexiones** a bases de datos por aplicación
- **Tabla de usuarios** con problemas (bloqueados/expirados)
- **Vista responsive** adaptada a diferentes dispositivos

### 5. Sistema de Autenticación
- **Autenticación LDAP/Active Directory**
- **JWT (JSON Web Tokens)** para autenticación API
- **Roles y permisos**: superusuario y staff configurables por grupos AD
- **Cache de grupos** LDAP para optimización (5 minutos)
- **Autenticación dual**: LDAP + Django Model Backend

### 6. Logging y Auditoría
- **Registro automático** de acciones realizadas
- **Trazabilidad**: quién realizó cada acción
- **Control de errores** centralizado
- **Logs de autenticación LDAP** en consola

---

## 🏗️ ARQUITECTURA TÉCNICA

### Stack Tecnológico

#### Backend
- **Framework**: Django 3.0.4
- **API REST**: Django Rest Framework
- **Base de Datos**: Microsoft SQL Server (ODBC Driver 17)
- **Autenticación**: django-auth-ldap
- **Protocolo**: WSGI/ASGI compatible
- **CORS**: Habilitado para todas las origins

#### Frontend
- **Framework**: React 16.8.6
- **State Management**: Redux 4.0.5
- **UI Template**: CoreUI Free React Admin Template 2.5.1
- **Routing**: React Router 5.0.1
- **HTTP Client**: Superagent 5.2.2
- **Notificaciones**: Toastr 2.1.4
- **Gráficas**: Chart.js 2.8.0 + react-chartjs-2 2.7.6
- **Tablas de Datos**: react-data-table-component 6.3.1
- **Estilos**: Bootstrap 4.3.1 + node-sass 4.12.0
- **Iconos**: Font Awesome 5.13.0, Simple Line Icons, CoreUI Icons

#### Infraestructura
- **Servidor Web**: Compatible con WSGI
- **Base de Datos**: SQL Server con pyodbc
- **Directorio**: LDAP/Active Directory
- **Protocolo Remote**: WMI (Windows Management Instrumentation)

### Estructura de Aplicaciones Backend

```
backend/
├── apps/
│   ├── authentication/    # Autenticación JWT y login
│   ├── users/            # Gestión de usuarios LDAP
│   ├── hosts/            # Monitorización de hosts
│   ├── monitor/          # Servicios de monitorización
│   └── core/             # Funcionalidades core
├── classes/
│   ├── ActiveDirectory.py   # Cliente LDAP/AD
│   ├── BaseHost.py          # Cliente WMI para hosts
│   └── PowerShell.py        # Ejecución de scripts PS
└── resources/              # Recursos adicionales
```

**Total de archivos Python en backend**: 42 archivos

### APIs Implementadas

#### Autenticación
- `POST /api/auth/login` - Login con LDAP
- `GET /api/auth/user` - Usuario logueado

#### Usuarios
- Gestión completa de usuarios LDAP
- Búsqueda y filtrado
- Operaciones: crear, modificar, eliminar, desbloquear

#### Hosts
- `GET /api/hosts` - Lista de hosts del dominio
- `GET /api/hosts/{hostname}/{parameter}` - Información específica del host
  - Parámetros: `space_available`, `ram_usage`, `cpu_usage`, `hardware_inventory`, `software_inventory`, `restart`, `shutdown`

#### Monitorización
- `GET /api/monitor/ad` - Estado del servicio Active Directory
- `GET /api/monitor/sql` - Estado del servicio SQL Server
- `GET /api/monitor/connections` - Conexiones SQL activas

---

## 📦 DEPENDENCIAS Y ESTADO

### ⚠️ Frontend - Estado Crítico

**ESTADO**: Dependencias NO instaladas (se requiere `npm install`)

#### Dependencias Principales Desactualizadas

| Paquete | Versión Actual | Última Disponible | Gap de Versiones |
|---------|---------------|-------------------|------------------|
| **React** | 16.8.6 | **19.2.3** | 🔴 3 versiones mayores |
| **React DOM** | 16.8.6 | **19.2.3** | 🔴 3 versiones mayores |
| **React Redux** | 7.2.0 | **9.2.0** | 🟡 2 versiones mayores |
| **Redux** | 4.0.5 | **5.0.1** | 🟡 1 versión mayor |
| **React Router DOM** | 5.0.1 | **7.11.0** | 🔴 2 versiones mayores |
| **Bootstrap** | 4.3.1 | **5.3.8** | 🟡 1 versión mayor |
| **Chart.js** | 2.8.0 | **4.5.1** | 🔴 2 versiones mayores |
| **@coreui/react** | 2.5.1 | **5.9.2** | 🔴 3 versiones mayores |
| **@coreui/coreui** | 2.1.12 | **5.5.0** | 🔴 3 versiones mayores |
| **node-sass** | 4.12.0 | **9.0.0** | 🔴 5 versiones mayores |
| **jwt-decode** | 2.2.0 | **4.0.0** | 🔴 2 versiones mayores |
| **styled-components** | 5.0.1 | **6.1.19** | 🟡 1 versión mayor |
| **superagent** | 5.2.2 | **10.2.3** | 🔴 5 versiones mayores |
| **react-chartjs-2** | 2.7.6 | **5.3.1** | 🔴 3 versiones mayores |
| **react-grid-layout** | 0.18.3 | **2.1.0** | 🔴 2 versiones mayores |
| **react-data-table-component** | 6.3.1 | **7.7.0** | 🟡 1 versión mayor |
| **@material-ui/core** | 4.9.12 | 4.12.4 | 🟢 Patch updates |
| **cross-env** | 7.0.2 | **10.1.0** | 🔴 3 versiones mayores |
| **react-scripts** | 3.4.1 | (dev) | 🟡 Desactualizado |

#### Dependencias Actualizadas ✅
- `toastr`: 2.1.4 (actualizada)
- `prop-types`: 15.7.2 → 15.8.1 (minor update)
- `classnames`: 2.2.6 → 2.5.1 (minor update)
- `core-js`: 3.1.4 → 3.47.0 (patch updates)

#### Requerimientos de Motor
```json
"engines": {
  "node": ">=8.10",  // ⚠️ Node 8 está obsoleto (EOL)
  "npm": ">=6"       // ⚠️ NPM 6 está desactualizado
}
```
**Recomendación**: Node 18 LTS o superior, NPM 10+

### Backend - Python

**ESTADO**: ⚠️ requirements.txt VACÍO

El archivo `backend/requirements.txt` está vacío, pero basándose en las importaciones del código, las dependencias necesarias son:

#### Dependencias Identificadas en el Código

```python
# Framework Principal
Django==3.0.4              # ⚠️ Django 3.0 está EOL (End of Life)
djangorestframework

# Autenticación y LDAP
django-auth-ldap
python-ldap

# Base de Datos
pyodbc                     # Para SQL Server
django-pyodbc             # O django-mssql-backend
# O bien: mssql-django

# Utilidades
python-dotenv             # Variables de entorno
django-cors-headers       # CORS middleware

# Windows Management (para monitorización de hosts Windows)
wmi                       # ⚠️ Solo funciona en Windows o con pywin32
pywin32                   # Dependencia de WMI
```

#### ⚠️ Problemas Identificados

1. **Django 3.0.4**: Versión con EOL (End of Life)
   - Última versión: Django 5.x
   - Recomendación: Actualizar a Django 4.2 LTS o Django 5.x

2. **requirements.txt vacío**:
   - Imposible replicar el entorno sin conocer versiones exactas
   - Riesgo de incompatibilidades

3. **WMI**:
   - Solo funciona en sistemas Windows
   - Requiere configuración especial para servidores Linux

4. **SQL Server Engine**:
   - Usando `sql_server.pyodbc` (posiblemente obsoleto)
   - Considerar `mssql-django` como alternativa moderna

5. **Secret Key hardcodeada** en settings.py:
   - 🔴 CRÍTICO: Secret key expuesta en el código
   - Debería estar en variable de entorno

### Configuración de Seguridad

#### ⚠️ Problemas de Seguridad Detectados

```python
# settings.py - PROBLEMAS IDENTIFICADOS:

SECRET_KEY = 'z(+c(lj8+vpt_=@zj*s+4tp8&*u75!%h_+0605y8jov(zfay!j'
# 🔴 CRÍTICO: Secret key hardcodeada

DEBUG = True
# 🟡 WARNING: Debug habilitado (no usar en producción)

ALLOWED_HOSTS = ["*"]
# 🟡 WARNING: Permite cualquier host (riesgo de seguridad)

CORS_ORIGIN_ALLOW_ALL = True
# 🟡 WARNING: CORS abierto a todas las origins
```

**Recomendaciones**:
1. Mover SECRET_KEY a variable de entorno
2. Deshabilitar DEBUG en producción
3. Configurar ALLOWED_HOSTS específicos
4. Limitar CORS_ORIGIN_WHITELIST a dominios conocidos

---

## 🗂️ MÓDULOS Y CARACTERÍSTICAS

### Implementado ✅

- ✅ Dashboard principal con métricas
- ✅ Gestión completa de usuarios LDAP
- ✅ Perfiles de usuario detallados
- ✅ Monitorización de hosts Windows
- ✅ Inventario de hardware y software
- ✅ Monitorización de conexiones SQL
- ✅ Autenticación LDAP/JWT
- ✅ Sistema de logging
- ✅ Diseño responsive
- ✅ Vista de hosts con perfiles individuales
- ✅ Gráficas de conexiones SQL por aplicación
- ✅ Control de usuarios bloqueados/expirados

### En Desarrollo 🚧

- 🚧 Layout personalizable drag-and-drop con `react-grid-layout`
  - Dependencia instalada pero no implementada
  - Permitiría personalizar la disposición del dashboard

### No Implementado / Comentado ❌

- ❌ Servicio de monitorización DNS
  - Código comentado en `backend/apps/monitor/views.py:51-57`

---

## 🔧 CONFIGURACIÓN REQUERIDA

### Variables de Entorno (.env)

El proyecto utiliza `python-dotenv` para cargar variables de entorno:

```bash
# LDAP/Active Directory
LDAP_HOST=ldap://your-ad-server.domain
LDAP_BIND_DN=CN=admin,DC=domain,DC=com
LDAP_PASSWORD=your-ldap-password
DOMAIN=DC=domain,DC=com

# SQL Server
DB_HOST=your-sql-server
DB_USER=sql-username
DB_PASSWORD=sql-password

# Django (RECOMENDADO - actualmente hardcodeado)
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

### Base de Datos

```python
# SQL Server configurado en settings.py
DATABASES = {
    'default': {
        'ENGINE': 'sql_server.pyodbc',
        'NAME': 'Sistemas',
        'OPTIONS': {
            'driver': 'ODBC Driver 17 for SQL Server',
        }
    }
}
```

**Requisito**: ODBC Driver 17 for SQL Server instalado en el sistema

---

## 📊 ESTADO DEL CÓDIGO

### Análisis de Calidad

#### Puntos Fuertes 💪
- Arquitectura modular bien organizada
- Separación clara backend/frontend
- API REST bien estructurada
- Sistema de permisos implementado
- Manejo de errores en peticiones WMI
- Uso de serializers para validación
- Diseño responsive implementado

#### Puntos Débiles ⚠️
- Dependencias muy desactualizadas
- requirements.txt vacío (backend)
- Secret key hardcodeada
- DEBUG habilitado por defecto
- CORS y ALLOWED_HOSTS muy permisivos
- Django 3.0 con EOL
- Falta de tests (archivos tests.py vacíos)
- Comentarios en español e inglés mezclados
- IP hardcodeada en SQLServerService (192.168.1.150)

#### Deuda Técnica 📝
1. **Actualización de dependencias**: Prioritario
   - React 16 → 19 (breaking changes importantes)
   - Django 3.0 → 4.2 LTS o 5.x
   - Bootstrap 4 → 5
   - Chart.js 2 → 4

2. **Seguridad**:
   - Externalizar configuraciones sensibles
   - Revisar configuración de producción
   - Implementar rate limiting
   - Añadir HTTPS enforcement

3. **Testing**:
   - Implementar tests unitarios
   - Tests de integración para API
   - Tests E2E para frontend

4. **Documentación**:
   - Completar README.md (actualmente "in process")
   - Documentar API endpoints
   - Guía de instalación completa
   - Guía de despliegue

---

## 🚀 ROADMAP TÉCNICO RECOMENDADO

### Corto Plazo (Crítico)
1. **Completar requirements.txt** con versiones exactas
2. **Externalizar SECRET_KEY** y configuraciones sensibles
3. **Revisar configuración de seguridad** para producción
4. **Documentar proceso de instalación**

### Medio Plazo (Importante)
1. **Actualizar Django** a versión LTS con soporte
2. **Evaluar actualización de React** (breaking changes importantes)
3. **Implementar tests básicos**
4. **Migrar de node-sass a sass** (node-sass está deprecated)
5. **Actualizar dependencias críticas** con vulnerabilidades conocidas

### Largo Plazo (Mejoras)
1. **Completar funcionalidad drag-and-drop** del dashboard
2. **Implementar servicio DNS** (actualmente comentado)
3. **Modernizar UI** con versiones actuales de CoreUI/Bootstrap
4. **Añadir más servicios de monitorización**
5. **Implementar WebSockets** para actualizaciones en tiempo real
6. **Migrar a TypeScript** para mayor seguridad de tipos

---

## 📈 MÉTRICAS DEL PROYECTO

- **Versión**: 2.6.0
- **Archivos Python**: 42
- **Aplicaciones Backend**: 5 (authentication, users, hosts, monitor, core)
- **Dependencias Frontend**: 40
- **Dependencias Frontend Desactualizadas**: 37 (~92%)
- **Licencia**: MIT
- **Autor**: Jordi Llopis Garcia

---

## 🔍 COMPATIBILIDAD

### Navegadores Soportados
```json
"browserslist": [
  ">0.2%",
  "not dead",
  "not ie <= 9",
  "not op_mini all"
]
```

### Requisitos del Sistema

#### Frontend
- Node.js >= 8.10 (⚠️ recomendado >= 18 LTS)
- NPM >= 6 (⚠️ recomendado >= 10)

#### Backend
- Python 3.x (versión específica no documentada)
- Windows Server (para funcionalidad WMI) o Linux con configuración especial
- SQL Server con ODBC Driver 17
- Acceso a servidor LDAP/Active Directory

---

## 📝 CONCLUSIONES Y RECOMENDACIONES

### Estado Actual
El proyecto COADMO es una aplicación **funcional y bien estructurada** que cumple con sus objetivos de monitorización de infraestructura. Sin embargo, presenta **deuda técnica significativa** principalmente en:

1. **Actualización de dependencias** (crítico)
2. **Seguridad de configuración** (crítico)
3. **Documentación de dependencias** (alto)
4. **Testing** (medio)

### Prioridades Inmediatas

#### 🔴 CRÍTICO
- [ ] Completar `requirements.txt` con todas las dependencias
- [ ] Externalizar SECRET_KEY y configuraciones sensibles
- [ ] Actualizar Django a versión con soporte activo
- [ ] Revisar configuración de seguridad (DEBUG, ALLOWED_HOSTS, CORS)

#### 🟡 IMPORTANTE
- [ ] Instalar dependencias frontend (`npm install`)
- [ ] Evaluar actualización de React (planificar migración)
- [ ] Migrar de node-sass a sass
- [ ] Documentar proceso de instalación y despliegue

#### 🟢 MEJORAS
- [ ] Completar funcionalidad drag-and-drop
- [ ] Implementar suite de tests
- [ ] Actualizar Bootstrap 4 → 5
- [ ] Modernizar dependencias frontend gradualmente

### Recomendación Final

El proyecto requiere una **actualización técnica prioritaria** antes de considerarse listo para producción. Se recomienda:

1. **Fase 1** (1-2 semanas): Seguridad y dependencias críticas
2. **Fase 2** (2-4 semanas): Actualización de frameworks principales
3. **Fase 3** (4-8 semanas): Testing y modernización de UI

El proyecto tiene una **base sólida** y con las actualizaciones necesarias puede convertirse en una solución de monitorización robusta y mantenible.

---

**Documento generado**: Diciembre 2025
**Responsable del análisis**: Claude AI
**Próxima revisión recomendada**: Tras implementar actualizaciones críticas
