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

4) Для защиты от csrf атак:
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
- глобальном app
- контроллера
- метода
→ 
Ответ