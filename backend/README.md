###Команды:

1) Создание проекта
    ```
    npm install -g @nestjs/cli
    npm i --save @nestjs/config
    npm i --save class-validator class-transformer
    npm install --save @nestjs/typeorm typeorm pg

    nest new .
    ```

2) Работа:
    ```
    npm run start:dev
    ```

3) Для куки:
    ```
    npm i cookie-parser
    npm i -D @types/cookie-parser
    ```

4) Для защиты от csrf атак (не делал):
    ```
    npm i csrf-csrf
    ```

5) Для файлов:
    ```
    npm i -D @types/multer
    npm install --save @nestjs/serve-static
    npm install uuid
    npm install --save-dev @types/uuid
    ```

6) Для вебсокетов:
    Так же в postman поменять спобоб запроса на socket.io !!!
    ```
    npm i --save @nestjs/websockets @nestjs/platform-socket.io
    ```

7) Для тестов:
    ```
    npm i --save-dev @nestjs/testing
    ```

### Концепции

Controller - класс для работы с запросами 
Service - класс для работы с бизнес логикой
Module - класс объединяет два класса выше

Жизненый цикл обработки запроса:
Запрос → 
Глобальные Middleware (app.use(...)) → 
Модульные Middleware (в some.module.ts)→ 
Гарды → 
Pre-интерцепторы → 
Pipes → 
Контроллер → 
Сервис → 
Post-интерцепторы → 
Фильтры исключений, на уровнях: 
 глобальном app |
 контроллера |
 метода
→ 
Ответ

### Доп.

Также можно добавить swager 
И реализовать динамические модули для хз чего
И реализовать ScopeService для создание и дублирования сервисов при инициализированном app

### .env

```
PORT=5000
URL_CORS = http://localhost:5000 https://localhost:5000 http://localhost https://localhost

DB_USER=postgres
DB_PASSWORD=12345
DB_PORT=5432
DB_HOST=localhost
DB_NAME=test
DEV=true


DB_TEST_USER=postgres
DB_TEST_PASSWORD=12345
DB_TEST_HOST=localhost
DB_TEST_PORT=5432
DB_TEST_NAME=test
```