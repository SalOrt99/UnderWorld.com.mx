-- Añadir tabla para reportes
CREATE TABLE report_severity (
    severity_id INT PRIMARY KEY AUTO_INCREMENT,
    severity_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reports (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    severity_id INT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    description TEXT NOT NULL,
    photo_url VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (severity_id) REFERENCES report_severity(severity_id)
);

-- Insertar datos de severidad
INSERT INTO report_severity (severity_name) VALUES 
('high'),
('medium'),
('low');

-- Índices para optimización de reportes
CREATE INDEX idx_report_user ON reports(user_id);
CREATE INDEX idx_report_severity ON reports(severity_id);
CREATE INDEX idx_report_status ON reports(status);
CREATE INDEX idx_report_location ON reports(latitude, longitude);
