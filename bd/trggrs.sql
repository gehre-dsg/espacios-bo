-- Creacion de triggers
USE proyecto_sisinfo;

DELIMITER $$

CREATE TRIGGER insert_en_usuarios
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
    INSERT INTO cambios (descripcion, ci_usuario)
    VALUES (CONCAT('Nuevo registro en la tabla {usuarios}: ', NEW.ci_usuario), NEW.ci_usuario);
END$$

DELIMITER ;
