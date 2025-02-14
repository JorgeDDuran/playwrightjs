Feature: Inicio de sesión
  Scenario: Un usuario puede iniciar sesión con credenciales correctas
    Given el usuario está en la página de login
    When ingresa sus credenciales
    Then el sistema muestra el dashboard
