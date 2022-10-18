# Political Speeches

This app answer the following questions:

1. Which politician gave the most speeches in 2013?
2. Which politician gave the most speeches on the topic „Internal Security"?
3. Which politician used the fewest words (in total)?

## Prerequistes

Provide CSV file(s) via URLs in the following format (comma seperated):

| Speaker          |      Topic       |    Date    | Words |
| :--------------- | :--------------: | :--------: | ----: |
| Alexander Abel   | Education Policy | 2012-10-30 |  5310 |
| Bernhard Belling |  Coal Subsidies  | 2012-11-05 |  1210 |

All files are aggregated into one list to give the answers to the three questions

## Load dependencies

```
yarn
```

## Start the server

```
yarn dev
```

## Usage

Call API with one or more "url" parameters that lead directly to a CSV file e.g.
https://www.patrick-buchner.me/assets/test.csv

e.g.

http://localhost:3100?url=https://www.patrick-buchner.me/assets/test.csv&url=https://www.patrick-buchner.me/assets/test1.csv

## Necessary future improvements:

- Error handling
- Less dependencies
