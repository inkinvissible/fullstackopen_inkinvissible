```mermaid
  sequenceDiagram
      autonumber
      participant Client as Navegador
      participant Server as Servidor
      
      note over Client,Server: Carga de sitio. Hostname es: studies.cs.helsinki.fi
      
      %% Request Inicial
      Client->>+Server: GET /exampleapp/spa
      note right of Client: Archivo Tipo HTML, HTML base
      Server-->>-Client: HTML File (200 OK)
      
      %% Obtener recursos estáticos
      par Recursos en paralelo y estáticos
          Client->>+Server: GET /exampleapp/main.css
          Server-->>-Client: CSS File (200 OK)
          and
          Client->>+Server: GET /exampleapp/spa.js
          Server-->>-Client: JavaScript File (200 OK)
      end
      
      %% Obtener datos JSON
      note over Client: El JavaScript se inicializa y solicita los datos
      Client->>+Server: GET /exampleapp/data.json
      Server-->>-Client: [{content: "new note", date: "2024-25-11"}, ...]
      
      note over Client: El navegador renderiza las notas y crea los elementos en el DOM
```