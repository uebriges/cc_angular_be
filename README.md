Politians

Howto

provide CSV files via URL in the following format:

Speaker, Topic, Date, Words
Alexander Abel, Education Policy, 2012-10-30, 5310
Bernhard Belling, Coal Subsidies, 2012-11-05, 1210
Caesare Collins, Coal Subsidies, 2012-11-06, 1119
Alexander Abel, Internal Security, 2012-12-11, 911

Start the server by running

`yarn dev`

Call API with one or more "url" parameters that lead directly to a CSV file e.g.
https://www.patrick-buchner.me/assets/test.csv

e.g.

http://localhost:3100?url=https://www.patrick-buchner.me/assets/test.csv&url=https://www.patrick-buchner.me/assets/test1.csv

Necessary improvements:

- Error handling
- Less dependencies
