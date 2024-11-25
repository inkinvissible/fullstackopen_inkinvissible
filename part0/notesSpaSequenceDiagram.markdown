```mermaid
  sequenceDiagram
      autonumber
      participant Client as Navegador
      participant Server as Servidor
      
      note over Client,Server: Proceso de creación de notas, Hostname es: studies.cs.helsinki.fi
      
      %% Crear nueva nota
      Client->>+Server: POST /exampleapp/new_note_spa
      note left of Server: Datos: {note: "nueva nota", date: "2024-25-11"}
      Server-->>-Client: 201 Created (Nota Creada)
      note right of Client: {
          message: "note created"
      }
      note over Client: El navegador hace append del nuevo registro y lo incluye dentro del ul. Limpia el formulario.
      
```