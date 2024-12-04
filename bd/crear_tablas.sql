-- Se maneja la eliminacion y creacion de tablas
USE proyecto_sisinfo;

DROP TABLE IF EXISTS transferencias_reservas;
DROP TABLE IF EXISTS estados;
DROP TABLE IF EXISTS cambios;
DROP TABLE IF EXISTS eventos_permisos;
DROP TABLE IF EXISTS permisos;
DROP TABLE IF EXISTS eventos;
DROP TABLE IF EXISTS reservas;
DROP TABLE IF EXISTS tipos_eventos;
DROP TABLE IF EXISTS espacios_publicos;
DROP TABLE IF EXISTS empresas;
DROP TABLE IF EXISTS presidentes_otb;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(15) NOT NULL
);

CREATE TABLE usuarios (
    ci_usuario INT PRIMARY KEY,
    nombre VARCHAR(100),
    ap_paterno VARCHAR(50),
    ap_materno VARCHAR(50),
    email VARCHAR(255) UNIQUE,
    contrasena VARCHAR(255),
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    id_rol INT,
    FOREIGN KEY (id_rol) REFERENCES roles(id)
);

CREATE TABLE presidentes_otb (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ci_usuario INT,
    otb VARCHAR(100),
    documento BLOB,
    FOREIGN KEY (ci_usuario) REFERENCES usuarios(ci_usuario)
);

CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ci_usuario INT,
    empresa VARCHAR(100),
    documento BLOB,
    FOREIGN KEY (ci_usuario) REFERENCES usuarios(ci_usuario)
);

CREATE TABLE espacios_publicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    -- Informacion de coordenadas en caso de Integracion con MAPS API
    latitud DECIMAL(9,6),
    longitud DECIMAL(9,6),
    direccion VARCHAR(255)
);

CREATE TABLE reservas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    ci_usuario INT,
    id_espacio_publico INT,
    fecha DATE,
    hora_inicio TIME,
    hora_fin TIME,
    estado VARCHAR(50) DEFAULT 'pendiente',
    FOREIGN KEY (ci_usuario) REFERENCES usuarios(ci_usuario),
    FOREIGN KEY (id_espacio_publico) REFERENCES espacios_publicos(id)
);

CREATE TABLE tipos_eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_evento VARCHAR(50)
);

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT,
    id_tipo_evento INT,
    nombre VARCHAR(255),
    descripcion TEXT,
    fecha_evento DATE,
    FOREIGN KEY (id_reserva) REFERENCES reservas(id),
    FOREIGN KEY (id_tipo_evento) REFERENCES tipos_eventos(id)
);

CREATE TABLE permisos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_permiso VARCHAR(50) NOT NULL
);

CREATE TABLE eventos_permisos (
    id_evento INT,
    id_permiso INT,
    documento BLOB,
    entregado BOOL DEFAULT FALSE,
    PRIMARY KEY (id_evento, id_permiso),
    FOREIGN KEY (id_evento) REFERENCES eventos(id),
    FOREIGN KEY (id_permiso) REFERENCES permisos(id)
);

CREATE TABLE estados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50) UNIQUE
);

CREATE TABLE transferencias_reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT,
    ci_usuario_origen INT,
    ci_usuario_destino INT,
    fecha_solicitud DATE DEFAULT (CURRENT_DATE),
    estado VARCHAR(50) DEFAULT 'pendiente',
    FOREIGN KEY (id_reserva) REFERENCES reservas(id),
    FOREIGN KEY (ci_usuario_origen) REFERENCES usuarios(ci_usuario),
    FOREIGN KEY (ci_usuario_destino) REFERENCES usuarios(ci_usuario)
);

CREATE TABLE cambios (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    descripcion TEXT NOT NULL,
    ci_usuario INT NOT NULL,
    tabla_afectada VARCHAR(50),
    id_afectado INT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ci_usuario) REFERENCES usuarios(ci_usuario)
);