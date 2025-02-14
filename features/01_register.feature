Feature: Registro de usuario
  Scenario: Un usuario puede registrarse exitosamente
    Given el usuario está en la página de registro
    When ingresa sus datos de registro
    Then el sistema confirma el registro exitoso