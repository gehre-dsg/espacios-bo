-- Creacion de vistas
USE espacios_bo;

DROP PROCEDURE IF EXISTS actualizar_eventos_pasados;

DROP VIEW IF EXISTS usuarios_pendientes;

DROP VIEW IF EXISTS transferencias_pendientes;

DROP VIEW IF EXISTS eventos_futuros;

CREATE VIEW usuarios_pendientes AS
SELECT
    CONCAT_WS(' ', u.nombre, u.ap_paterno, u.ap_materno) as nombre,
    u.email AS correo,
    u.telefono AS telefono
FROM usuarios AS u 
LEFT JOIN empresas AS e ON u.ci = e.usuario
LEFT JOIN presidentes_otb as pr ON u.ci = pr.usuario
WHERE u.estado = 1 AND u.rol NOT IN (1, 2);

CREATE VIEW transferencias_pendientes AS
SELECT *
FROM transferencias_reservas AS t
WHERE t.estado = 1;

CREATE VIEW eventos_futuros AS
SELECT
    e.nombre AS evento,
    e.descripcion AS descripcion,
    e.fecha_evento AS fecha,
    ep.nombre AS lugar
FROM
    eventos AS e
    INNER JOIN reservas AS r ON e.reserva = r._id
    INNER JOIN espacios_publicos AS ep ON r.espacio_publico = ep._id
WHERE
    r.estado = 4
    AND e.fecha_evento >= CURRENT_DATE;

-- VISTAS "MATERIALIZADAS"

DROP TABLE IF EXISTS eventos_pasados;

CREATE TABLE eventos_pasados (
    _id INT PRIMARY KEY,
    evento VARCHAR(255),
    descripcion TEXT,
    fecha DATE,
    lugar VARCHAR(100),
    INDEX (fecha, lugar, evento),
    FOREIGN KEY (_id) REFERENCES eventos(_id)
);

DELIMITER $$

CREATE PROCEDURE actualizar_eventos_pasados()
BEGIN
    UPDATE eventos_pasados ep
    JOIN eventos e ON ep._id = e._id
    JOIN reservas r ON e.reserva = r._id
    JOIN espacios_publicos epb ON r.espacio_publico = epb._id
    SET
        ep.evento = e.nombre,
        ep.descripcion = e.descripcion,
        ep.fecha = e.fecha_evento,
        ep.lugar = epb.nombre
    WHERE e.fecha_evento <= CURRENT_DATE;

    INSERT INTO eventos_pasados (_id, evento, descripcion, fecha, lugar)
    SELECT
        e._id,
        e.nombre,
        e.descripcion,
        e.fecha_evento,
        epb.nombre
    FROM eventos e
    INNER JOIN reservas r ON e.reserva = r._id
    INNER JOIN espacios_publicos epb ON r.espacio_publico = epb._id
    WHERE e.fecha_evento <= CURRENT_DATE
    AND NOT EXISTS (
        SELECT 1
        FROM eventos_pasados ep
        WHERE ep._id = e._id
    );
END$$

DELIMITER;

CREATE EVENT evento_actualizar_eventos_pasados ON SCHEDULE EVERY 1 DAY DO
CALL actualizar_eventos_pasados ();