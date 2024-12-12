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