# README

## OpenAPI Document

https://editor.swagger.io/

## sqlite3

```bash
sqlite3 ./tasks.db
```

```sqlite3
.tables

.schema tasks

.mode column
select * from tasks;

.quit
```


## curl

```bash
curl -H "Content-Type: application/json" -d '{"content": "abcde"}' http://localhost:3001/tasks
```

```bash
curl http://localhost:3001/tasks
```

```bash
curl http://localhost:3001/tasks/1a0d0e34-f67a-4c09-a59f-a451b69b3525
```

```bash
curl -X PATCH -H "Content-Type: application/json" -d '{"status": 1}' http://localhost:3001/tasks/1a0d0e34-f67a-4c09-a59f-a451b69b3525
```
