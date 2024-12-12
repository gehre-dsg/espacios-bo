USE proyecto_sisinfo;

CREATE INDEX idx_empresas_usuario ON empresas(usuario);
CREATE INDEX idx_presidentes_otb_usuario ON presidentes_otb(usuario);
CREATE INDEX idx_usuarios_estado_ci ON usuarios(estado, ci);
