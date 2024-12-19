-- Creacion de indices
USE espacios_bo;

CREATE INDEX idx_estado_rol ON `usuarios` (estado, rol);
CREATE INDEX idx_nombre ON `espacios-publicos` (nombre);