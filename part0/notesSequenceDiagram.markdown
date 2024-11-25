```mermaid
  sequenceDiagram
      autonumber
      participant Client as Navegador
      participant Server as Servidor
      
      note over Client,Server: Proceso de creación de notas, el hostname es:studies.cs.helsinki.fi
      
      %% Crear nueva nota
      Client->>+Server: POST /exampleapp/notes
      note left of Server: Datos: {note: "nueva nota"}
      Server-->>-Client: 302 Found (Redirección)
      
      %% Recargar la página
      Client->>+Server: GET /exampleapp/notes
      Server-->>-Client: HTML Document
      
      %% Obtener recursos estáticos
      par Recursos en paralelo
          Client->>+Server: GET /exampleapp/main.css
          Server-->>-Client: CSS File (200 OK)
          and
          Client->>+Server: GET /exampleapp/main.js
          Server-->>-Client: JavaScript File (200 OK)
      end
      
      %% Obtener datos JSON
      note over Client: El JavaScript se ejecuta y solicita los datos
      Client->>+Server: GET /exampleapp/data.json
      Server-->>-Client: [{content: "nueva nota", date: "2024-25-11"}, ...]
      
      note over Client: El navegador renderiza las notas
```