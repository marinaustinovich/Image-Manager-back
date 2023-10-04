
### Image Manager

#### Легенда

Настало время докрутить менеджер картинок, который вы делали на протяжении нескольких лекций. Теперь нужно, чтобы все картинки загружались и хранились на сервере, а при удалении удалялись с сервера.

#### Описание

Описание API. Для хранения данных мы будем оперировать следующими структурами:
File {
    id // идентификатор (уникальный в пределах системы)
    filename // имя файла
    path // путь, по которому можно получить файл
}
Endpoints:

GET    /files - список всех загруженных файлов
GET    /files/<id> - идентификатор файла (где <id> - идентификатор файла) получение одного файла
POST   /files - загрузка и создание файла (<id> генерируется на сервере)
DELETE /files/<id> - идентификатор файла (где <id> - идентификатор файла) удаление одного файла


Он выглядит так:

![](./public/img/image.png)

Вы можете реализовать развёртывание в удобном для вас формате: либо так, как это было описано на лекции (отдельно для frontend + GitHub Pages и backend), либо собрать frontend и настроить backend так, чтобы он обрабатывал frontend так же, как картинки.

Используйте FormData для отправки данных. Авто-тесты к данной задаче не нужны.
