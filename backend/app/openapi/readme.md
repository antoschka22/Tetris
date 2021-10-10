# API Specification

## Request Body

add line: `x-body-name: item` to request with Body if the name of the argument of the function being called is not "body". Example:

In specification.yml:
```
requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Item'
              x-body-name: item
```

In python: (web.controllers.item_controller)
```
def update_item(uuid: str, item, token_info):
  ...
```

## Example

``` 
/box/{box_id}:
    get:
      tags: # name für das UI
        - "box"
      summary: "get a box by id" # auch für das UI
      operationId: "get_box" # Name der Funktion
      parameters:
        - name: "box_id" # parameter controller
          in: "path"
          description: "The id of the box to retrieve"
          required: true
          type: "string"
      responses:
        200:
          description: "Successfully retrived box"
          schema:
            $ref: "#/definitions/Box" # link zu definitions (unten angegeben)
        404:
          description: "Box doesn't exist"
      x-swagger-router-controller: "web.controllers.box_controller" # Pfad (relativ zu server.py) zu python File
```