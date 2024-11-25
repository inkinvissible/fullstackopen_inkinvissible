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
      note over Client: Respuesta: {"message": "note created"}
      note over Client: El navegador:<br/>1. Hace append del nuevo registro<br/>2. Lo incluye dentro del ul<br/>3. Limpia el formulario
      
```