"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const vscode_extension_telemetry_1 = require("vscode-extension-telemetry");
const { name, version, aiKey } = require("./../../package.json");
const hexEditorProvider_1 = require("./hexEditorProvider");
// Telemetry information
const extensionID = `vscode-${name}`;
let telemetryReporter;
function activate(context) {
    telemetryReporter = new vscode_extension_telemetry_1.default(extensionID, version, aiKey);
    const openWithCommand = vscode.commands.registerTextEditorCommand("hexEditor.openFile", (textEditor) => {
        vscode.commands.executeCommand("vscode.openWith", textEditor.document.uri, "hexEditor.hexedit");
    });
    context.subscriptions.push(openWithCommand);
    context.subscriptions.push(telemetryReporter);
    context.subscriptions.push(hexEditorProvider_1.HexEditorProvider.register(context, telemetryReporter));
}
exports.activate = activate;
function deactivate() {
    telemetryReporter.dispose();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map