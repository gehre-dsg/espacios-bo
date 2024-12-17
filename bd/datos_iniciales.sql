-- Inserccion de los datos basicos
USE espacios_bo;

INSERT INTO `roles` (rol) VALUES 
    ('super_admin'),
    ('admin'),
    ('presidente_otb'),
    ('empresa');

INSERT INTO `estados` (estado) VALUES 
    ('pendiente'),
    ('aceptado'),
    ('rechazado'),
    ('pagado'),
    ('cancelado'),
    ('cancelado-reembolzado'),
    ('por entregar');
    
INSERT INTO `tipos-eventos` (tipo) VALUES
	('Feria'),
    ('Cultural'),
    ('Social'),
    ('Bienestar Social');
    
INSERT INTO `permisos` (nombre) VALUES
	('Venta de alimentos y bebidas'),
    ('Venta y Consumo de bebidas alcoholicas'),
    ('Espectaculos publicos'),
    ('Seguridad'),
    ('Comercio'),
    ('Ambiental'),
    ('Transito');

INSERT INTO `estados` (estado) VALUES
	('por pagar'),
    ('pagada'),
    ('pendiente'),
    ('realizada'),
    ('cancelada');


INSERT INTO `usuarios` (ci, nombre, ap_paterno, ap_materno, email, contrasena, direccion, telefono, rol, estado) VALUES
    (3, 'presi1', '*', '*', 'presi1@gmail.com', 'p1', 'direccion', '12345678', 3, 2),
    (4, 'presi2', '*', '*', 'presi2@gmail.com', 'p2', 'direccion', '21345678', 3, 2),
    (5, 'empresa1', '*', '*', 'empresa1@gmail.com', 'e1', 'direccion', '31245678', 4, 2),
    (6, 'empresa2', '*', '*', 'empresa2@gmail.com', 'e2', 'direccion', '41235678', 4, 2),
    (1, 'super-admin', '*', '*', 'supadmin@gmail.com', 'sadmin', 'direccion', '51234678', 1, 2),
    (2, 'admin', '*', '*', 'admin@gmail.com', 'contrasena', 'admin', '61234578', 2, 2);

INSERT INTO `presidentes-otb` (usuario, otb, documento) VALUES
    (3, 'OTB T1', NULL),
    (4, 'OTB T2', NULL);

INSERT INTO `empresas` (usuario, empresa, documento) VALUES
    (5, 'EMPRESA T1', NULL),
    (6, 'EMPRESA T2', NULL);

INSERT INTO `espacios-publicos` (nombre, altitud, latitud, descripcion, url_imagen) VALUES
    ('Plaza 14 de Septiembre', -17.393777, -66.156942,
    'Plaza central arbolada con una fuente y una columna adornadas, que conmemora la independencia',
    'https://lh5.googleusercontent.com/p/AF1QipPYMlCFdbIp8C-e0NyYEvHLcDcvQLH4ZNtqhGXR=w408-h306-k-no'),
    ('Plaza Colon', -17.387988, -66.155790,
    'Plaza popular como punto de encuentro en un parque con paseos arbolados, lechos florales y estanques con fuentes.',
    'https://lh5.googleusercontent.com/p/AF1QipNijoWxTfb-iNr5MAdnJizaF8owdRTTPM3KFlQS=w408-h306-k-no'),
    ('El Prado', -17.386789, -66.156518,
    'Jardín en una calle arbolada con instalaciones de temporada en una glorieta al aire libre y bancos con sombra.',
    'https://lh3.googleusercontent.com/p/AF1QipMTyaYGZm_gb_Nu-Fls7ImGhdFReUc7lLtLrdjy=s680-w680-h510'),
    ('Plaza de Las Banderas', -17.382307, -66.159867,
    'Plaza con banderas nacionales y monumento de piedra a la democracia.',
    'https://lh3.googleusercontent.com/p/AF1QipOvpBeGGGshphUVAgQCBVMPLQn21UDUBidomVlH=s680-w680-h510-rw'),
    ('Plaza Corazonistas', -17.393100, -66.161506,
    'Plaza concurrida rodeada de palmeras, con flores coloridas, 2 fuentes y un monumento.',
    'https://lh3.googleusercontent.com/p/AF1QipMHvUXMEiMpjAoFWMPO4NbRbO2uLo6L3k_BjADa=s680-w680-h510'),
    ('Plaza Sucre', -17.392117, -66.148058,
    'Plaza rodeada de árboles, popular entre estudiantes de universidad cercana como área de lectura y recreación.',
    'https://lh5.googleusercontent.com/p/AF1QipNWOQGSvI1ksiMbm8eF1JBmo_bCHNNqVS4elb1W=w408-h408-k-no'),
    ('Plaza de la Mujer', -17.388691, -66.149964,
    'Plaza rodeada de frondosos árboles y mucha vegetacion.',
    'https://lh5.googleusercontent.com/p/AF1QipP9a78GmU4IgUtIa2f-Ac57fu3MgUu5XeEVjJ5D=w600-h321-p-k-no'),
    ('Plaza Quintanilla', -17.381913, -66.151790,
    'Plaza urbana circular con árboles, césped y asientos en la que se realizan eventos y festivales.',
    'https://lh5.googleusercontent.com/p/AF1QipMBz2-uOg1qzuhdCPY0Zh7MjR7lZJQm-Zmw2kOk=w408-h306-k-no'),
    ('Plazuela Cobija', -17.390366, -66.163074,
    'Plazuela tranquila, con hermosa vegetación, bellos árboles y hermosas esculturas',
    'https://lh5.googleusercontent.com/p/AF1QipMBF-k1Tq2gjPAW6znRJ9y55aHak8aJB9w7ILNa=w540-h312-n-k-no'),
    ('Plazuela San Sebastián', -17.398756, -66.159815,
    ' ',
    'https://lh5.googleusercontent.com/p/AF1QipNoMyXIrAWerYpSiPjcOIBCs2T4mZ-pghG7W1ff=w426-h240-k-no'),
    ('Parque del Arquitecto', -17.377349, -66.145369,
    ' ',
    'https://assets.xomio.com/listings/images/rl-134288721__1__720.jpg');
    `espacios-publicos`