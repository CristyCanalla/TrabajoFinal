"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlResultWebView = void 0;
const vscode = require("vscode");
class SqlResultWebView {
    static show(data, title) {
        const panel = vscode.window.createWebviewPanel("MySQL", title, vscode.ViewColumn.Two, {
            retainContextWhenHidden: true,
        });
        panel.webview.html = SqlResultWebView.getWebviewContent(data);
    }
    static getWebviewContent(data) {
        const head = [].concat("<!DOCTYPE html>", "<html>", "<head>", '<meta http-equiv="Content-type" content="text/html;charset=UTF-8">', "<style>table{border-collapse:collapse; }table,td,th{border:1px dotted #ccc; padding:5px;}th {background:#444} </style>", "</head>", "<body>").join("\n");
        const body = SqlResultWebView.render(data);
        const tail = [
            "</body>",
            "</html>",
        ].join("\n");
        return head + body + tail;
    }
    static render(rows) {
        if (rows.length === 0) {
            return "No data";
        }
        let head = "";
        for (const field in rows[0]) {
            if (rows[0].hasOwnProperty(field)) {
                head += "<th>" + field + "</th>";
            }
        }
        let body = "<table><tr>" + head + "</tr>";
        rows.forEach((row) => {
            body += "<tr>";
            for (const field in row) {
                if (row.hasOwnProperty(field)) {
                    body += "<td>" + row[field] + "</td>";
                }
            }
            body += "</tr>";
        });
        return body + "</table>";
    }
}
exports.SqlResultWebView = SqlResultWebView;
//# sourceMappingURL=sqlResultWebView.js.map