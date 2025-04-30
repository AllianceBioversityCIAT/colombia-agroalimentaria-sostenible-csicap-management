import * as Handlebars from 'handlebars';

// Definir el template como un string dentro del archivo .ts
const templateSource = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Bienvenido/a a CAS Reporting Tool</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    }
    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 30px auto;
      padding: 20px 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      color: #2a7f62;
    }
    .content {
      font-size: 16px;
      color: #333333;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      margin: 20px 0;
      padding: 12px 20px;
      background-color: #2a7f62;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      margin-top: 30px;
      font-size: 14px;
      color: #777777;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>¡Bienvenido/a {{nombre}} {{apellido}}!</h1>
    </div>
    <div class="content">
      <p>Su cuenta ha sido creada exitosamente en la plataforma <strong>CAS Reporting Tool</strong>.</p>
      <p>A continuación encontrará la información necesaria para acceder por primera vez:</p>

      <p><strong>Usuario (correo electrónico):</strong> {{correo}}</p>

      {{#if password}}
        <p>{{password}}</p>
      {{/if}}

      <p><strong>Rol asignado:</strong> {{rol}}</p>

      <p>Le recomendamos iniciar sesión lo antes posible y cambiar su contraseña temporal por una personalizada y segura.</p>

      <p style="text-align: center;">
        <a href="{{enlace}}" class="button">Acceder a la Plataforma</a>
      </p>

      <p>Si tiene alguna duda o inconveniente con el acceso, no dude en contactar con el equipo de soporte.</p>
    </div>

    <div class="footer">
      <p>Saludos cordiales,<br>
      Equipo CAS Reporting Tool<br>
      Colombia Agroalimentaria Sostenible</p>
    </div>
  </div>
</body>
</html>
`;

// Función para compilar y renderizar la plantilla
export const compileTemplateToBuffer = async (context: any): Promise<Buffer> => {
  const template = Handlebars.compile(templateSource); // Compilar el template
  const html = template(context); // Renderizar el template con el contexto proporcionado
  return Buffer.from(html); // Convertir el HTML renderizado a un Buffer
};