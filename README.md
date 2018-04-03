# shri-homework-456
Домашее задание для школы разработки интерфейсов Яндекс 2018   
**#4** Инфраструктура   
**#5** Node js   
**#6** Тесты. Модульное тестирование. Интеграционное тестирование интерфейсов

[![Build Status](https://travis-ci.org/nazarov-mi/shri-homework-456.svg?branch=master)](https://travis-ci.org/nazarov-mi/shri-homework-456)

## Heroku

* [Версия в разработке](https://shri-homework-456-dev.herokuapp.com/)
* [Последний релиз](https://shri-homework-456.herokuapp.com/)


## Запуск

```
git clone https://github.com/nazarov-mi/shri-homework-456.git
npm install
npm run webpack:build
npm run clone:repository
npm run start
```

### Для запуска интеграционных тестов необходимо:

Склонировать репозиторий для тестов
```
npm run clone:test-repository
```
Запустить приложение в режиме тестирования
```
npm run nodemon:test
```
Установить selenium локально (если команда не выполнялась ранее)
```
npm run selenium:install
```
Запустить selenium
```
npm run selenium:start
```
Запустить тесты
```
npm run test:int
```
**...profit**

## NPM скрипты

```
lint:styles           — запустит проверку стилей линтером
lint:scripts          — запустит проверку скриптов линтером
lint                  — запустит проверку стилей и скриптов линтером

test:unit             — запустит модульных тестов
test:int              — запустит интеграционных тестов
test                  — запустит модульных и интеграционных тестов

clear                 — очистит папку с сборкой (вспомогательный скрипт)
webpack:build         — запустит webpack для сборки
webpack:serve         — запустит webpack для разработки

nodemon               — запустит приложение в режиме разработки
nodemon:test          — запустит приложение в режиме разработки с изменением адреса папки с локальным репозиторием с local-repository на local-test-repository (используется для тестов)

clone:test-repository — склонирует репозиторий для тестов в local-test-repository
clone:respository     — склонирует пример репозитория для работы в local-repository

selenium:install      — установит selenium-standalone локально
selenium:start        — запустит selenium-standalone

start                 — запустит приложение
```

## Структура

```
src
  errors
    AbstractClassError — Класс ошибки создания абстракного класса
    AbstractMethodError — Класс ошибки вызова абстрактного метода
  util
    split — Реализация функции split (в отличии от «оригинальной функции», при использовании аргумента limit — не обрезает последнюю найденную подстроку)
  App — Основной класс приложения объединяет в себе работу с ветками, коммитами, директорией и файлами
  Branch — Класс-представление ветки
  BranchList — Класс-представление списка веток
  Commit — Класс-представление коммита
  CommitsList — Класс-представление списка коммитов
  Directory — Класс-представление директории
  DirectoryObject — Класс-представление объекта директории (blob и tree)
  ExecStreamReader — Класс для выполнения команд и записи полученных данных
  List — Абстрактный класс для работы со списками git
  Uid — Класс для работы с идентификаторами, состоящими из хэша и пути (прим. HEAD:a/b/c)
  config — Конфигурации
```
