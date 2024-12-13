-- Inserccion de los datos basicos
USE espacios_bo;

INSERT INTO roles (rol) VALUES 
    ('super_admin'),
    ('admin'),
    ('presidente_otb'),
    ('empresa');

INSERT INTO estados (estado) VALUES 
    ('pendiente'),
    ('aceptado'),
    ('rechazado'),
    ('pagado'),
    ('cancelado'),
    ('cancelado-reembolzado'),
    ('por entregar');
    
INSERT INTO tipos_eventos (tipo) VALUES
	('Feria'),
    ('Cultural'),
    ('Social'),
    ('Bienestar Social');
    
INSERT INTO permisos (nombre) VALUES
	('Venta de alimentos y bebidas'),
    ('Venta y Consumo de bebidas alcoholicas'),
    ('Espectaculos publicos'),
    ('Seguridad'),
    ('Comercio'),
    ('Ambiental'),
    ('Transito');

INSERT INTO estados (estado) VALUES
	('por pagar'),
    ('pagada'),
    ('pendiente'),
    ('realizada'),
    ('cancelada');


INSERT INTO usuarios (ci, nombre, ap_paterno, ap_materno, email, contrasena, direccion, telefono, rol, estado) VALUES
    (3, 'presi1', '*', '*', 'presi1@gmail.com', 'p1', 'direccion', '12345678', 3, 2),
    (4, 'presi2', '*', '*', 'presi2@gmail.com', 'p2', 'direccion', '21345678', 3, 2),
    (5, 'empresa1', '*', '*', 'empresa1@gmail.com', 'e1', 'direccion', '31245678', 4, 2),
    (6, 'empresa2', '*', '*', 'empresa2@gmail.com', 'e2', 'direccion', '41235678', 4, 2),
    (1, 'super-admin', '*', '*', 'supadmin@gmail.com', 'sadmin', 'direccion', '51234678', 1, 2),
    (2, 'admin', '*', '*', 'admin@gmail.com', 'contrasena', 'admin', '61234578', 2, 2);

INSERT INTO presidentes_otb (usuario, otb, documento) VALUES
    (3, 'OTB T1', NULL),
    (4, 'OTB T2', NULL);

INSERT INTO empresas (usuario, empresa, documento) VALUES
    (5, 'EMPRESA T1', NULL),
    (6, 'EMPRESA T2', NULL);