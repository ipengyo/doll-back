const fs = require('fs-extra')
const path = require('path')

const methods = {
    clean: function() {
        fs.emptyDirSync(path.join(__dirname, '../dist'))
    },
    copy: function() {
        fs.copySync(path.join(__dirname, '../src/assets/img'), path.join(__dirname, '../dist/medicine_console/img'))
        fs.copySync(path.join(__dirname, '../src/assets/js'), path.join(__dirname, '../dist/medicine_console/js'))
        fs.copySync(path.join(__dirname, '../src/assets/kindeditor'), path.join(__dirname, '../dist/medicine_console/kindeditor'))
    },
    init: function() {
        this.clean()
        this.copy()
    }
}

let action = process.argv[2]
if (action && methods.hasOwnProperty(action)) {
    methods[action]()
}