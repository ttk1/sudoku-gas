# sudoku-gas

## requirements

* Node.js
* npm

## set up clasp

```sh
# install clasp
npm install -g clasp

# login as your google account
clasp login
```

## setup project

```sh
git clone https://github.com/ttk1/sudoku-gas.git
cd sudoku-gas
npm install
```

## push to your apps script project

```sh
# clone apps script project (for the first time only)
clasp clone <apps_script_project_id>
rm 'コード.js'

clasp push
```
