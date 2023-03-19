CREATE TRIGGER Encriptar_contraseña 
BEFORE INSERT ON usuarios FOR EACH ROW BEGIN
	SET NEW.id_usuario = NEW.id_usuario,
    NEW.usuario = NEW.usuario,
    NEW.nombre = NEW.nombre,
    NEW.clave = sha(new.clave),
    NEW.id_perfil = NEW.id_perfil;
END$$
DELIMITER ;