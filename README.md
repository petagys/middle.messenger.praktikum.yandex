Проект веб-мессенджер по курсу Яндекс.Практикума
Дата начала 27.05.2022
Автор Гусев Петр



За основу взял макет от Яндекс.Практикума: https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=20%3A236

Шаблонизатор: Handlebars.
Язык: Typescript.

Ссылка на проект в netlify:
https://cheerful-sawine-0b422c.netlify.app/

Ссылка на ПР:
https://github.com/petagys/middle.messenger.praktikum.yandex/pull/2

Валидация есть на всех формах. Текстовое поле message на странице чатов не валидировал, т.к. в задании написано, что данная функция для этого поля опциональна. Да и не вижу смысла что-то валидировать в этом поле.

Запуск через Expess.js - npm start
Запуск через Parcel - npm run watch
