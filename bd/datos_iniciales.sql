-- Inserccion de los datos basicos
USE proyecto_sisinfo;

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
    
INSERT INTO tipos_eventos (tipo_evento) VALUES
	('Feria'),
    ('Cultural'),
    ('Social'),
    ('Bienestar Social');
    
INSERT INTO permisos (nombre_permiso) VALUES
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