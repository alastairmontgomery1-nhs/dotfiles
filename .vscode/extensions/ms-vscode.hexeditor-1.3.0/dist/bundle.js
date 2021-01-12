/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./media/hexEdit.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./media/byteData.ts":
/*!***************************!*\
  !*** ./media/byteData.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteData = void 0;
class ByteData {
    /**
     * @description Creates a ByteData object which acts as the datalayer for a single hex value
     * @param uint8num The 8bit number from the file to be represented
     */
    constructor(uint8num) {
        this.decimal = uint8num;
        this.adjacentBytes = [];
    }
    /**
     * @description Adds a given ByteData object as adjancent to the current one (utilized for higher than 8bit calculations)
     * @param {ByteData} byte_obj The ByteData obvject to add to the array
     */
    addAdjacentByte(byte_obj) {
        this.adjacentBytes.push(byte_obj);
    }
    /**
     * @description Returns the hex representation of the ByteData object
     * @returns {string} The ByteData represented as a hex string
     */
    toHex() {
        return this.decimal.toString(16).toUpperCase();
    }
    /**
     * @description Returns the binary representation of the ByteData object
     * @returns {string} The ByteData represented a binary string
     */
    toBinary() {
        return ("00000000" + this.decimal.toString(2)).slice(-8);
    }
    /**
     * @description Returns the 8bit unsigned int representation of the ByteData object
     * @returns {number} The 8 bit unsigned int
     */
    to8bitUInt() {
        return this.decimal;
    }
    /**
     * @description Converts the byte data to a utf-8 character
     * @param {boolean} littleEndian Whether or not it's represented in little endian
     * @returns {string} The utf-8 character
     */
    toUTF8(littleEndian) {
        let uint8Data = [this.to8bitUInt()];
        for (let i = 0; i < 3 && i < this.adjacentBytes.length; i++) {
            uint8Data.push(this.adjacentBytes[i].to8bitUInt());
        }
        if (!littleEndian) {
            uint8Data = uint8Data.reverse();
        }
        const utf8 = new TextDecoder("utf-8").decode(new Uint8Array(uint8Data));
        // We iterate through the string and immediately reutrn the first character
        for (const char of utf8)
            return char;
        return utf8;
    }
    /**
     * @description Converts the byte data to a utf-16 character
     * @param {boolean} littleEndian Whether or not it's represented in little endian
     * @returns {string} The utf-16 character
     */
    toUTF16(littleEndian) {
        let uint8Data = [this.to8bitUInt()];
        if (this.adjacentBytes.length === 0)
            return "End of File";
        for (let i = 0; i < 3 && i < this.adjacentBytes.length; i++) {
            uint8Data.push(this.adjacentBytes[i].to8bitUInt());
        }
        if (!littleEndian) {
            uint8Data = uint8Data.reverse();
        }
        const utf16 = new TextDecoder("utf-16").decode(new Uint8Array(uint8Data));
        // We iterate through the string and immediately reutrn the first character
        for (const char of utf16)
            return char;
        return utf16;
    }
    /**
     * @description Handles converting the ByteData object into many of the unsigned and signed integer formats
     * @param {number} numBits The numbers of bits you want represented, must be a multiple of 8 and <= 64
     * @param {boolean} signed Whether you want the returned representation to be signed or unsigned
     * @param {boolean} littleEndian True if you want it represented in little endian, false if big endian
     * @param {boolean} float If you pass in 32 or 64 as numBits do you want them to be float32 or float64, defaults to false
     * @returns {number | bigint} The new representation
     */
    byteConverter(numBits, signed, littleEndian, float = false) {
        if (numBits % 8 != 0) {
            throw new Error("Bits must be a multiple of 8!");
        }
        if (this.adjacentBytes.length < (numBits / 8) - 1)
            return NaN;
        const bytes = [];
        bytes.push(this.to8bitUInt());
        for (let i = 0; i < (numBits / 8) - 1; i++) {
            bytes.push(this.adjacentBytes[i].to8bitUInt());
        }
        const uint8bytes = Uint8Array.from(bytes);
        const dataview = new DataView(uint8bytes.buffer);
        if (numBits == 64 && float) {
            return dataview.getFloat64(0, littleEndian);
        }
        else if (numBits == 64 && signed) {
            return dataview.getBigInt64(0, littleEndian);
        }
        else if (numBits == 64 && !signed) {
            return dataview.getBigUint64(0, littleEndian);
        }
        else if (numBits == 32 && float) {
            return dataview.getFloat32(0, littleEndian);
        }
        else if (numBits == 32 && signed) {
            return dataview.getInt32(0, littleEndian);
        }
        else if (numBits == 32 && !signed) {
            return dataview.getUint32(0, littleEndian);
            // 24 bit isn't supported by default so we must add it
            // It's safe to cast here as the only numbits that produces a big int is 64.
        }
        else if (numBits == 24 && signed) {
            const first8 = this.adjacentBytes[1].byteConverter(8, signed, littleEndian) << 16;
            return first8 | this.byteConverter(16, signed, littleEndian);
        }
        else if (numBits == 24 && !signed) {
            const first8 = this.adjacentBytes[1].byteConverter(8, signed, littleEndian) << 16;
            return first8 | this.byteConverter(16, signed, littleEndian);
        }
        else if (numBits == 16 && signed) {
            return dataview.getInt16(0, littleEndian);
        }
        else if (numBits == 16 && !signed) {
            return dataview.getUint16(0, littleEndian);
        }
        else if (numBits == 8 && signed) {
            return dataview.getInt8(0);
        }
        else if (numBits == 8 && !signed) {
            return this.decimal;
        }
        return NaN;
    }
}
exports.ByteData = ByteData;


/***/ }),

/***/ "./media/chunkHandler.ts":
/*!*******************************!*\
  !*** ./media/chunkHandler.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkHandler = void 0;
const hexEdit_1 = __webpack_require__(/*! ./hexEdit */ "./media/hexEdit.ts");
const byteData_1 = __webpack_require__(/*! ./byteData */ "./media/byteData.ts");
/**
 * @description A chunkhandler which holds the chunks and handles requesting new ones
 */
class ChunkHandler {
    /**
     * @description Constructs a chunk handler which handles chunks of size chunkSize
     * @param {number} chunkSize The size of the chunks which the chunkhandler holds
     */
    constructor(chunkSize) {
        this.chunks = new Set();
        this._chunkSize = chunkSize;
    }
    /**
     * @description Returns the size of a chunk in the chunk handler
     * @returns {number} the size of a chunk
     */
    get chunkSize() {
        return this._chunkSize;
    }
    /**
     * @description Whether or not a chunk holding the offset is being tracked by the chunkhandler
     * @param {number} offset The offset to check against
     * @returns {boolean} whether or not a chunk containing that offset is being tracked
     */
    hasChunk(offset) {
        const chunkStart = this.retrieveChunkStart(offset);
        return this.chunks.has(chunkStart);
    }
    /**
     * @description Sends a request to the extension for the packets which would make up the requested chunks
     * @param {number} chunkStart The start of the chunk which you're requesting
     */
    async requestMoreChunks(chunkStart) {
        // If the chunk start is above the document size we know it will not give us anything back so we don't do anything
        if (chunkStart >= hexEdit_1.virtualHexDocument.documentSize && chunkStart !== 0)
            return;
        // Requests the chunks from the extension
        try {
            const request = await hexEdit_1.messageHandler.postMessageWithResponse("packet", {
                initialOffset: chunkStart,
                numElements: this.chunkSize
            });
            this.processChunks(request.offset, request.data, request.edits, request.fileSize);
        }
        catch (err) {
            return;
        }
    }
    /**
     * @description Given an offset tells you which offset begins it chunks
     * @param {number} offset The offset which you want to know the chunk start of
     * @returns {number} The chunk start of the provided offset
     */
    retrieveChunkStart(offset) {
        return Math.floor(offset / this.chunkSize) * this.chunkSize;
    }
    /**
     * @description Called by the virtualDocument to ensure there is bufferSize chunks above and below the offset provided
     * @param {number} offset The offset given to check the buffer around
     * @param {BufferOptions} bufferOpts The options describing how many chunks above and below the given offset you want
     * @returns {Promise<{removed: number[]; requested: Promise<void[]>}>} A promise with an array of removed chunk starts and a promise which is awaiting the requested chunks
     */
    async ensureBuffer(offset, bufferOpts) {
        const chunksToRequest = new Set();
        const chunkStart = this.retrieveChunkStart(offset);
        // If it doesn't have even the starting chunk it means we must have scrolled far outside the viewport and will need to requet starting chunk
        // We can add this everytime since we compute a set difference later it will be removed
        chunksToRequest.add(chunkStart);
        // Get the offsets of the chunks that would make up the buffers
        for (let i = 1; i <= bufferOpts.topBufferSize; i++) {
            chunksToRequest.add(Math.max(0, chunkStart - (i * this.chunkSize)));
        }
        for (let i = 1; i <= bufferOpts.bottomBufferSize; i++) {
            chunksToRequest.add(chunkStart + (i * this.chunkSize));
        }
        // We don't request chunks we already have so we filter them out here
        const chunksToRequestArr = [...chunksToRequest].filter(x => !this.chunks.has(x));
        //If it's inside the buffer (which the chunksToRequest set holds) then we keep it, else it's deleted
        const chunksOutsideBuffer = [...this.chunks].filter(x => !chunksToRequest.has(x));
        // We stop tracking the old chunks and we request the new ones
        chunksOutsideBuffer.forEach(chunk => this.removeChunk(chunk));
        const requested = [];
        chunksToRequestArr.forEach(chunkOffset => requested.push(this.requestMoreChunks(chunkOffset)));
        const result = {
            removed: chunksOutsideBuffer,
            requested: Promise.all(requested)
        };
        return result;
    }
    /**
     * @description Handles the incoming chunks from the extension (this gets called by the message handler)
     * @param {number} offset The offset which was requestd
     * @param {Uint8Array} data The data which was returned back
     * @param {number} fileSize The size of the file, this is passed back from the exthost and helps to ensure the webview and exthost sizes are synced
     */
    processChunks(offset, data, edits, fileSize) {
        const packets = [];
        for (let i = 0; i < data.length; i++) {
            // If it's a chunk boundary we want to make sure we're tracking that chunk
            if ((i + offset) % this.chunkSize === 0) {
                this.addChunk(i + offset);
            }
            packets.push({
                offset: i + offset,
                data: new byteData_1.ByteData(data[i])
            });
            // At the very end we want the plus cell, so we add a dummy packet that is greater than the filesize
            if (i + offset + 1 === hexEdit_1.virtualHexDocument.documentSize) {
                packets.push({
                    offset: i + offset + 1,
                    data: new byteData_1.ByteData(0)
                });
            }
        }
        // If it's an empty file we just send over the dummy packet for the plus cell
        if (data.length === 0 && fileSize === 0) {
            packets.push({
                offset: 0,
                data: new byteData_1.ByteData(0)
            });
        }
        hexEdit_1.virtualHexDocument.render(packets);
        hexEdit_1.virtualHexDocument.redo(edits, fileSize);
    }
    /**
     * @description Adds a chunk with the given chunk offset to the handler
     * @param {number} offset The offset which holds the chunk start
     */
    addChunk(offset) {
        this.chunks.add(offset);
    }
    /**
     * @description Deletes a chunk with the given chunk offset to the handler
     * @param {number} offset The offset which holds the chunk start
     */
    removeChunk(offset) {
        this.chunks.delete(offset);
    }
    /**
     * @description Getter for all the chunks in the chunk handler
     * @returns {Set<numer>} the starting offsets of all the chunks being tracked
     */
    get allChunks() {
        return this.chunks;
    }
}
exports.ChunkHandler = ChunkHandler;


/***/ }),

/***/ "./media/dataInspector.ts":
/*!********************************!*\
  !*** ./media/dataInspector.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateDataInspector = exports.clearDataInspector = void 0;
/**
 * @description Clears the data spector back to its default state
 */
function clearDataInspector() {
    // This function only gets called when these elements exist so these casts are safe
    document.getElementById("binary8").value = "";
    document.getElementById("binary8").disabled = true;
    for (let i = 0; i < 4; i++) {
        const numBits = (i + 1) * 8;
        document.getElementById(`int${numBits}`).disabled = true;
        document.getElementById(`int${numBits}`).value = "";
        document.getElementById(`uint${numBits}`).disabled = true;
        document.getElementById(`uint${numBits}`).value = "";
    }
    document.getElementById("int64").value = "";
    document.getElementById("int64").disabled = true;
    document.getElementById("uint64").value = "";
    document.getElementById("uint64").disabled = true;
    document.getElementById("utf8").value = "";
    document.getElementById("utf8").disabled = true;
    document.getElementById("utf16").value = "";
    document.getElementById("utf16").disabled = true;
    document.getElementById("float32").value = "";
    document.getElementById("float32").disabled = true;
    document.getElementById("float64").value = "";
    document.getElementById("float64").disabled = true;
}
exports.clearDataInspector = clearDataInspector;
/**
 * @description Giving a ByteData object and what endianness, populates the data inspector
 * @param {ByteData} byte_obj The ByteData object to represent on the data inspector
 * @param {boolean} littleEndian Wether the data inspector is in littleEndian or bigEndian mode
 */
function populateDataInspector(byte_obj, littleEndian) {
    document.getElementById("binary8").value = byte_obj.toBinary();
    document.getElementById("binary8").disabled = false;
    for (let i = 0; i < 4; i++) {
        const numBits = (i + 1) * 8;
        const signed = byte_obj.byteConverter(numBits, true, littleEndian);
        const unsigned = byte_obj.byteConverter(numBits, false, littleEndian);
        document.getElementById(`int${numBits}`).value = isNaN(Number(signed)) ? "End of File" : signed.toString();
        document.getElementById(`int${numBits}`).disabled = false;
        document.getElementById(`uint${numBits}`).value = isNaN(Number(unsigned)) ? "End of File" : unsigned.toString();
        document.getElementById(`uint${numBits}`).disabled = false;
        if (numBits === 32) {
            // The boolean for signed doesn't matter for floats so this could also be 32, false, littleEndian, true
            const float32 = byte_obj.byteConverter(32, true, littleEndian, true);
            document.getElementById("float32").value = isNaN(Number(float32)) ? "End of File" : float32.toString();
            document.getElementById("float32").disabled = false;
        }
    }
    const signed64 = byte_obj.byteConverter(64, true, littleEndian);
    const unsigned64 = byte_obj.byteConverter(64, false, littleEndian);
    document.getElementById("int64").value = isNaN(Number(signed64)) ? "End of File" : signed64.toString();
    document.getElementById("int64").disabled = false;
    document.getElementById("uint64").value = isNaN(Number(unsigned64)) ? "End of File" : unsigned64.toString();
    document.getElementById("uint64").disabled = false;
    document.getElementById("utf8").value = byte_obj.toUTF8(littleEndian);
    document.getElementById("utf8").disabled = false;
    document.getElementById("utf16").value = byte_obj.toUTF16(littleEndian);
    document.getElementById("utf16").disabled = false;
    const float64 = byte_obj.byteConverter(64, true, littleEndian, true);
    document.getElementById("float64").value = isNaN(Number(float64)) ? "End of File" : float64.toString();
    document.getElementById("float64").disabled = false;
}
exports.populateDataInspector = populateDataInspector;


/***/ }),

/***/ "./media/editHandler.ts":
/*!******************************!*\
  !*** ./media/editHandler.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditHandler = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./media/util.ts");
const byteData_1 = __webpack_require__(/*! ./byteData */ "./media/byteData.ts");
const hexEdit_1 = __webpack_require__(/*! ./hexEdit */ "./media/hexEdit.ts");
const selectHandler_1 = __webpack_require__(/*! ./selectHandler */ "./media/selectHandler.ts");
/**
 * @description Class responsible for handling edits within the virtual document
 */
class EditHandler {
    constructor() {
        this.pendingEdit = undefined;
    }
    /**
     * @description Handles when a user starts typing on a hex element
     * @param {HTMLSpanElement} element The element which the keypress was fired on
     * @param {string} keyPressed The key which was pressed
     */
    async editHex(element, keyPressed) {
        // If the user presses escape and there is a current edit then we just revert the cell as if no edit has happened
        if (keyPressed === "Escape" && this.pendingEdit && this.pendingEdit.previousValue) {
            element.innerText = this.pendingEdit.previousValue;
            element.classList.remove("editing");
            this.pendingEdit = undefined;
        }
        // If it's not a valid hex input or delete we ignore it
        const regex = new RegExp(/^[a-fA-F0-9]$/gm);
        if (keyPressed.match(regex) === null && keyPressed !== "Delete") {
            return;
        }
        const offset = util_1.getElementsOffset(element);
        if (!this.pendingEdit || this.pendingEdit.offset != offset) {
            this.pendingEdit = {
                offset: offset,
                previousValue: element.innerText === "+" ? undefined : element.innerText,
                newValue: "",
                element: element
            };
        }
        element.classList.add("editing");
        element.innerText = element.innerText.trimRight();
        // When the user hits delete
        if (keyPressed === "Delete") {
            element.innerText = "  ";
        }
        else {
            // This handles when the user presses the first character erasing the old value vs adding to the currently edited value
            element.innerText = element.innerText.length !== 1 || element.innerText === "+" ? `${keyPressed.toUpperCase()} ` : element.innerText + keyPressed.toUpperCase();
        }
        this.pendingEdit.newValue = element.innerText;
        if (element.innerText.trimRight().length == 2) {
            element.classList.remove("add-cell");
            // Not really an edit if nothing changed
            if (this.pendingEdit.newValue == this.pendingEdit.previousValue) {
                this.pendingEdit = undefined;
                return;
            }
            await this.sendEditToExtHost([this.pendingEdit]);
            this.updateAscii(element.innerText, offset);
            element.classList.add("edited");
            // Means the last cell of the document was filled in so we add another placeholder afterwards
            if (!this.pendingEdit.previousValue) {
                hexEdit_1.virtualHexDocument.createAddCell();
            }
            this.pendingEdit = undefined;
        }
    }
    /**
     * @description Handles when the user starts typing on an ascii element
     * @param {HTMLSpanElement} element The element which the keystroke was fired on
     * @param {string} keyPressed The key which was pressed
     */
    async editAscii(element, keyPressed) {
        // We don't want to do anything if the user presses a key such as home etc which will register as greater than 1 char
        if (keyPressed.length != 1)
            return;
        // No need to call it edited if it's the same value
        if (element.innerText === keyPressed)
            return;
        const offset = util_1.getElementsOffset(element);
        const hexElement = util_1.getElementsWithGivenOffset(offset)[0];
        // We store all pending edits as hex as ascii isn't always representative due to control characters
        this.pendingEdit = {
            offset: offset,
            previousValue: hexElement.innerText === "+" ? undefined : hexElement.innerText,
            newValue: keyPressed.charCodeAt(0).toString(16).toUpperCase(),
            element: element
        };
        element.classList.remove("add-cell");
        element.classList.add("editing");
        element.classList.add("edited");
        this.updateAscii(this.pendingEdit.newValue, offset);
        this.updateHex(keyPressed, offset);
        await this.sendEditToExtHost([this.pendingEdit]);
        // Means the last cell of the document was filled in so we add another placeholder afterwards
        if (!this.pendingEdit.previousValue) {
            hexEdit_1.virtualHexDocument.createAddCell();
        }
        this.pendingEdit = undefined;
    }
    /**
     * @description Given a hex value updates the respective ascii value
     * @param {string | undefined} hexValue The hex value to convert to ascii
     * @param {number} offset The offset of the ascii value to update
     */
    updateAscii(hexValue, offset) {
        // For now if it's undefined we will just ignore it, but this would be the delete case
        if (!hexValue)
            return;
        // The way the DOM is constructed the ascii element will always be the second one
        const ascii = util_1.getElementsWithGivenOffset(offset)[1];
        ascii.classList.remove("add-cell");
        util_1.updateAsciiValue(new byteData_1.ByteData(parseInt(hexValue, 16)), ascii);
        ascii.classList.add("edited");
    }
    /**
     * @description Given an ascii value updates the respective hex value
     * @param {string} asciiValue The ascii value to convert to hex
     * @param {number} offset The offset of the hex value to update
     */
    updateHex(asciiValue, offset) {
        // The way the DOM is constructed the hex element will always be the first one
        const hex = util_1.getElementsWithGivenOffset(offset)[0];
        hex.innerText = asciiValue.charCodeAt(0).toString(16).toUpperCase();
        hex.classList.remove("add-cell");
        hex.classList.add("edited");
    }
    /**
     * @description Completes the current edit, this is used if the user navigates off the cell and it wasn't done being edited
     */
    async completePendingEdits() {
        if (this.pendingEdit && this.pendingEdit.element && this.pendingEdit.newValue) {
            // We don't want to stop the edit if it is selected as that can mean the user will be making further edits
            if (this.pendingEdit.element.classList.contains("selected"))
                return;
            // Ensure the hex value has 2 characters, if not we add a 0 in front
            this.pendingEdit.newValue = "00" + this.pendingEdit.newValue.trimRight();
            this.pendingEdit.newValue = this.pendingEdit.newValue.slice(this.pendingEdit.newValue.length - 2);
            this.pendingEdit.element.classList.remove("editing");
            this.pendingEdit.element.innerText = this.pendingEdit.newValue;
            // No edit really happened so we don't want it to update the ext host
            if (this.pendingEdit.newValue === this.pendingEdit.previousValue) {
                return;
            }
            this.updateAscii(this.pendingEdit.newValue, this.pendingEdit.offset);
            this.pendingEdit.element.classList.add("edited");
            this.pendingEdit.element.classList.remove("add-cell");
            await this.sendEditToExtHost([this.pendingEdit]);
            if (!this.pendingEdit.previousValue) {
                hexEdit_1.virtualHexDocument.createAddCell();
            }
            this.pendingEdit = undefined;
        }
    }
    /**
     * @description Given a list of edits sends it to the exthost so that the ext host and webview are in sync
     * @param {DocumentEdit} edits The edits to send to the exthost
     */
    async sendEditToExtHost(edits) {
        const extHostMessage = [];
        for (const edit of edits) {
            // The ext host only accepts 8bit unsigned ints, so we must convert the edits back into that representation
            const oldValue = edit.previousValue ? parseInt(edit.previousValue, 16) : undefined;
            const newValue = edit.newValue ? parseInt(edit.newValue, 16) : undefined;
            const currentMessage = {
                offset: edit.offset,
                oldValue,
                newValue,
                sameOnDisk: false
            };
            extHostMessage.push(currentMessage);
        }
        try {
            const syncedFileSize = (await hexEdit_1.messageHandler.postMessageWithResponse("edit", extHostMessage)).fileSize;
            hexEdit_1.virtualHexDocument.updateDocumentSize(syncedFileSize);
        }
        catch (_a) {
            // Empty catch because we just don't do anything if for some reason the exthost doesn't respond with the new fileSize,
            // we just sync at the next available opportunity
            return;
        }
    }
    /**
     * @description Given a list of edits undoes them from the document
     * @param {EditMessage[]} edits The list of edits to undo
     */
    undo(edits) {
        // We want to process the highest offset first as we only support removing cells from the end of the document
        // So if we need to remove 3 cells we can't remove them in arbitrary order it needs to be outermost cell first
        if (edits.length > 1 && edits[0].offset < edits[edits.length - 1].offset) {
            edits = edits.reverse();
        }
        for (const edit of edits) {
            // This is the delete case
            if (edit.oldValue === undefined) {
                hexEdit_1.virtualHexDocument.focusElementWithGivenOffset(hexEdit_1.virtualHexDocument.documentSize);
                hexEdit_1.virtualHexDocument.removeLastCell();
                continue;
            }
            const elements = util_1.getElementsWithGivenOffset(edit.offset);
            // We're executing an undo and the elements aren't on the DOM so there's no point in doing anything
            if (elements.length != 2)
                return;
            if (edit.sameOnDisk) {
                elements[0].classList.remove("edited");
                elements[1].classList.remove("edited");
            }
            else {
                elements[0].classList.add("edited");
                elements[1].classList.add("edited");
            }
            elements[0].innerText = edit.oldValue.toString(16).toUpperCase();
            elements[0].innerText = elements[0].innerText.length == 2 ? elements[0].innerText : `0${elements[0].innerText}`;
            util_1.updateAsciiValue(new byteData_1.ByteData(edit.oldValue), elements[1]);
            hexEdit_1.virtualHexDocument.focusElementWithGivenOffset(edit.offset);
        }
    }
    /**
     * @description Given a list of edits reapplies them to the document
     * @param {EditMessage[]} edits The list of edits to redo
     */
    redo(edits) {
        for (const edit of edits) {
            if (edit.newValue === undefined)
                continue;
            const elements = util_1.getElementsWithGivenOffset(edit.offset);
            // We're executing an redo and the elements aren't on the DOM so there's no point in doing anything
            if (elements.length != 2)
                continue;
            elements[0].classList.remove("add-cell");
            elements[1].classList.remove("add-cell");
            if (edit.sameOnDisk) {
                elements[0].classList.remove("edited");
                elements[1].classList.remove("edited");
            }
            else {
                elements[0].classList.add("edited");
                elements[1].classList.add("edited");
            }
            elements[0].innerText = edit.newValue.toString(16).toUpperCase();
            elements[0].innerText = elements[0].innerText.length == 2 ? elements[0].innerText : `0${elements[0].innerText}`;
            util_1.updateAsciiValue(new byteData_1.ByteData(edit.newValue), elements[1]);
            // If no add cells are left we need to add more as this means we just replaced the end
            if (document.getElementsByClassName("add-cell").length === 0 && edit.oldValue === undefined) {
                // We are going to estimate the filesize and it will be resynced at the end if wrong
                // This is because we add 1 cell at a time therefore if we paste the filesize is larger than whats rendered breaking the plus cell logic
                // This causes issues so this is a quick fix, another fix would be to apply all cells at once
                hexEdit_1.virtualHexDocument.updateDocumentSize(hexEdit_1.virtualHexDocument.documentSize + 1);
                hexEdit_1.virtualHexDocument.createAddCell();
            }
            hexEdit_1.virtualHexDocument.focusElementWithGivenOffset(edit.offset);
        }
    }
    /**
     * @description Handles when a user copies
     * @param {ClipboardEvent} event The clibpoard event passed to a copy event handler
     */
    copy(event) {
        var _a, _b;
        (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.setData("text/json", JSON.stringify(selectHandler_1.SelectHandler.getSelectedHex()));
        (_b = event.clipboardData) === null || _b === void 0 ? void 0 : _b.setData("text/plain", selectHandler_1.SelectHandler.getSelectedValue());
        event.preventDefault();
    }
    /**
     * @description Handles when a user pastes
     * @param {ClipboardEvent} event The clibpoard event passed to a paste event handler
     */
    async paste(event) {
        // If what's on the clipboard isn't json we won't try to past it in
        if (!event.clipboardData || event.clipboardData.types.indexOf("text/json") < 0)
            return;
        const hexData = JSON.parse(event.clipboardData.getData("text/json"));
        // We do Array.from() as this makes it so the array no longer is tied to the dom who's selection may change during this paste
        const selected = Array.from(document.getElementsByClassName("selected hex"));
        const edits = [];
        // We apply as much of the hex data as we can based on the selection
        for (let i = 0; i < selected.length && i < hexData.length; i++) {
            const element = selected[i];
            const offset = util_1.getElementsOffset(element);
            const currentEdit = {
                offset: offset,
                previousValue: element.innerText === "+" ? undefined : element.innerText,
                newValue: hexData[i],
                element: element
            };
            element.classList.remove("add-cell");
            // Not really an edit if nothing changed
            if (currentEdit.newValue == currentEdit.previousValue) {
                continue;
            }
            element.innerText = hexData[i];
            this.updateAscii(element.innerText, offset);
            element.classList.add("edited");
            // Means the last cell of the document was filled in so we add another placeholder afterwards
            if (currentEdit.previousValue === undefined) {
                // Since we don't send all the edits until the end we need to estimate what the current file size is during this operation or the last cells won't be added correctly
                hexEdit_1.virtualHexDocument.updateDocumentSize(hexEdit_1.virtualHexDocument.documentSize + 1);
                hexEdit_1.virtualHexDocument.createAddCell();
                selected.push(util_1.getElementsWithGivenOffset(hexEdit_1.virtualHexDocument.documentSize)[0]);
            }
            edits.push(currentEdit);
        }
        await this.sendEditToExtHost(edits);
        event.preventDefault();
    }
    /**
     * @description Called when the user executes the revert command or when the document changes on disk and there are no unsaved edits
     */
    revert() {
        hexEdit_1.virtualHexDocument.reRequestChunks();
    }
}
exports.EditHandler = EditHandler;


/***/ }),

/***/ "./media/eventHandlers.ts":
/*!********************************!*\
  !*** ./media/eventHandlers.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeEndianness = exports.toggleHover = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./media/util.ts");
const dataInspector_1 = __webpack_require__(/*! ./dataInspector */ "./media/dataInspector.ts");
/**
 * @description Toggles the hover on a cell
 * @param {MouseEvent} event The event which is handed to a mouse event listener
 */
function toggleHover(event) {
    const elements = util_1.getElementsGivenMouseEvent(event);
    if (elements.length === 0)
        return;
    elements[0].classList.toggle("hover");
    elements[1].classList.toggle("hover");
}
exports.toggleHover = toggleHover;
// This is bound to the on change event for the select which decides to render big or little endian
/**
 * @description Handles when the user changes the dropdown for whether they want little or big endianness
 */
function changeEndianness() {
    if (document.activeElement) {
        // Since the inspector has no sense of state, it doesn't know what byte it is currently rendering
        // We must retrieve it based on the dom
        const elements = util_1.getElementsWithGivenOffset(util_1.getElementsOffset(document.activeElement));
        const byte_obj = util_1.retrieveSelectedByteObject(elements);
        if (!byte_obj)
            return;
        const littleEndian = document.getElementById("endianness").value === "little";
        dataInspector_1.populateDataInspector(byte_obj, littleEndian);
    }
}
exports.changeEndianness = changeEndianness;


/***/ }),

/***/ "./media/hexEdit.ts":
/*!**************************!*\
  !*** ./media/hexEdit.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageHandler = exports.chunkHandler = exports.virtualHexDocument = exports.vscode = void 0;
const virtualDocument_1 = __webpack_require__(/*! ./virtualDocument */ "./media/virtualDocument.ts");
const chunkHandler_1 = __webpack_require__(/*! ./chunkHandler */ "./media/chunkHandler.ts");
const messageHandler_1 = __webpack_require__(/*! ./messageHandler */ "./media/messageHandler.ts");
exports.vscode = acquireVsCodeApi();
// Construct a chunk handler which holds chunks of 50 rows (50 * 16)
exports.chunkHandler = new chunkHandler_1.ChunkHandler(800);
// Message handler which will handle the messages between the exthost and the webview (We'll allow a max of 10 pending requests)
exports.messageHandler = new messageHandler_1.MessageHandler(10);
/**
 * @description Fires when the user clicks the openAnyway link on large files
 */
function openAnyway() {
    exports.messageHandler.postMessage("open-anyways");
}
// Self executing anonymous function
// This is the main entry point
(() => {
    // Handle messages from the extension
    window.addEventListener("message", async (e) => {
        const { type, body } = e.data;
        switch (type) {
            case "init":
                {
                    // Loads the html body sent over
                    if (body.html !== undefined) {
                        document.getElementsByTagName("body")[0].innerHTML = body.html;
                        exports.virtualHexDocument = new virtualDocument_1.VirtualDocument(body.fileSize, body.baseAddress);
                        // We initially load 4 chunks below the viewport (normally we buffer 2 above as well, but there is no above at the start)
                        exports.chunkHandler.ensureBuffer(exports.virtualHexDocument.topOffset(), {
                            topBufferSize: 0,
                            bottomBufferSize: 5
                        });
                    }
                    if (body.fileSize != 0 && body.html === undefined) {
                        document.getElementsByTagName("body")[0].innerHTML =
                            `
							<div>
							<p>Opening this large file may cause instability. <a id="open-anyway" href="#">Open anyways</a></p>
							</div>
                        `;
                        // We construct the element right above this so it is definitely never null
                        document.getElementById("open-anyway").addEventListener("click", openAnyway);
                        return;
                    }
                    return;
                }
            case "update":
                {
                    if (body.type === "undo") {
                        exports.virtualHexDocument.undo(body.edits, body.fileSize);
                    }
                    else if (body.type === "redo") {
                        exports.virtualHexDocument.redo(body.edits, body.fileSize);
                    }
                    else {
                        exports.virtualHexDocument.revert(body.fileSize);
                    }
                    return;
                }
            case "save":
                {
                    const dirtyCells = Array.from(document.getElementsByClassName("edited"));
                    dirtyCells.map(cell => cell.classList.remove("edited"));
                    return;
                }
            default:
                {
                    exports.messageHandler.incomingMessageHandler(e.data);
                    return;
                }
        }
    });
    // Signal to VS Code that the webview is initialized.
    exports.messageHandler.postMessage("ready");
})();


/***/ }),

/***/ "./media/messageHandler.ts":
/*!*********************************!*\
  !*** ./media/messageHandler.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHandler = void 0;
const hexEdit_1 = __webpack_require__(/*! ./hexEdit */ "./media/hexEdit.ts");
/**
 * Class which handles messages between the webview and the exthost
 */
class MessageHandler {
    /**
     * @description Creates a new MessageHandler
     * @param maximumRequests The maximum number of requests
     */
    constructor(maximumRequests) {
        this.maxRequests = maximumRequests;
        this.requestsMap = new Map();
        this.requestId = 0;
    }
    /**
     * @description Posts to the extension host a message and returns a promise which if successful will resolve to the response
     * @param {string} type A string defining the type of message so it can be correctly handled on both ends
     * @param {any} body The payload
     * @returns {Promise<any>} A promise which resolves to the response or rejects if the request times out
     */
    async postMessageWithResponse(type, body) {
        var _a;
        const promise = new Promise((resolve, reject) => this.requestsMap.set(this.requestId, { resolve, reject }));
        // We remove the oldest request if the current request queue is full
        // This doesn't stop the request on the Ext host side, but it will be dropped when it's received, which lessens the load on the webview
        if (this.requestsMap.size > this.maxRequests) {
            const removed = this.requestsMap.keys().next().value;
            (_a = this.requestsMap.get(removed)) === null || _a === void 0 ? void 0 : _a.reject("Request Timed out");
            this.requestsMap.delete(removed);
        }
        hexEdit_1.vscode.postMessage({ requestId: this.requestId++, type, body });
        return promise;
    }
    /**
     * @description Post to the extension host as a message in a fire and forget manner, not expecting a response
     * @param {string} type A string defining the type of message so it can be correctly handled on both ends
     * @param {any} body The payload
     */
    postMessage(type, body) {
        hexEdit_1.vscode.postMessage({ type, body });
    }
    /**
     * @description For every incoming message that isn't the init
     * @param message The message received
     */
    incomingMessageHandler(message) {
        const request = this.requestsMap.get(message.requestId);
        // We should never get a rogue response from the webview unless it's an init.
        // So if the message isn't being tracked by the message handler, we drop it
        if (!request)
            return;
        request.resolve(message.body);
        this.requestsMap.delete(message.requestId);
    }
}
exports.MessageHandler = MessageHandler;


/***/ }),

/***/ "./media/searchHandler.ts":
/*!********************************!*\
  !*** ./media/searchHandler.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHandler = void 0;
const hexEdit_1 = __webpack_require__(/*! ./hexEdit */ "./media/hexEdit.ts");
const selectHandler_1 = __webpack_require__(/*! ./selectHandler */ "./media/selectHandler.ts");
const util_1 = __webpack_require__(/*! ./util */ "./media/util.ts");
class SearchHandler {
    constructor() {
        var _a;
        this.searchType = "hex";
        this.resultIndex = 0;
        this.preserveCase = false;
        this.searchResults = [];
        this.searchOptions = {
            regex: false,
            caseSensitive: false
        };
        this.findTextBox = document.getElementById("find");
        this.replaceTextBox = document.getElementById("replace");
        this.replaceButton = document.getElementById("replace-btn");
        this.replaceAllButton = document.getElementById("replace-all");
        this.findPreviousButton = document.getElementById("find-previous");
        this.findNextButton = document.getElementById("find-next");
        this.stopSearchButton = document.getElementById("search-stop");
        this.findNextButton.addEventListener("click", () => this.findNext(true));
        this.findPreviousButton.addEventListener("click", () => this.findPrevious(true));
        this.updateInputGlyphs();
        // Whenever the user changes the data type we update the type we're searching for and the glyphs on the input box
        (_a = document.getElementById("data-type")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            this.searchType = selectedValue;
            this.updateInputGlyphs();
            this.search();
        });
        this.searchOptionsHandler();
        this.replaceOptionsHandler();
        // When the user presses a key trigger a search
        this.findTextBox.addEventListener("keyup", (event) => {
            // Some VS Code keybinding defualts for find next, find previous, and focus restore
            if ((event.key === "Enter" || event.key === "F3") && event.shiftKey) {
                this.findPrevious(false);
            }
            else if (event.key === "Enter" || event.key === "F3") {
                this.findNext(false);
            }
            else if (event.key === "Escape") {
                // Pressing escape returns focus to the editor
                const selected = document.getElementsByClassName(`selected ${this.searchType}`)[0];
                if (selected !== undefined) {
                    selected.focus();
                }
                else {
                    hexEdit_1.virtualHexDocument.focusElementWithGivenOffset(hexEdit_1.virtualHexDocument.topOffset());
                }
            }
            else if (event.ctrlKey || new RegExp("(^Arrow|^End|^Home)", "i").test(event.key)) {
                // If it's any sort of navigation key we don't want to trigger another search as nothing has changed
                return;
            }
            else {
                this.search();
            }
        });
        window.addEventListener("keyup", (event) => {
            // Fin previous + find next when widget isn't focused
            if (event.key === "F3" && event.shiftKey && document.activeElement !== this.findTextBox) {
                this.findPrevious(true);
                event.preventDefault();
            }
            else if (event.key === "F3" && document.activeElement !== this.findTextBox) {
                this.findNext(true);
                event.preventDefault();
            }
        });
        this.replaceTextBox.addEventListener("keyup", this.updateReplaceButtons.bind(this));
        this.replaceButton.addEventListener("click", () => this.replace(false));
        this.replaceAllButton.addEventListener("click", () => this.replace(true));
        this.stopSearchButton.addEventListener("click", this.cancelSearch.bind(this));
        // Hide the message boxes for now as at first we have no messages to display
        document.getElementById("find-message-box").hidden = true;
        document.getElementById("replace-message-box").hidden = true;
    }
    /**
     * @description Sends a search request to the exthost
     */
    async search() {
        // If the box is empty no need to display any warnings
        if (this.findTextBox.value === "")
            this.removeInputMessage("find");
        // This gets called to cancel any searches that might be going on now
        this.cancelSearch();
        hexEdit_1.virtualHexDocument.setSelection([]);
        this.searchResults = [];
        this.updateReplaceButtons();
        this.findNextButton.classList.add("disabled");
        this.findPreviousButton.classList.add("disabled");
        let query = this.findTextBox.value;
        const hexSearchRegex = new RegExp("^[a-fA-F0-9? ]+$");
        // We check to see if the hex is a valid query else we don't allow a search
        if (this.searchType === "hex" && !hexSearchRegex.test(query)) {
            if (query.length > 0)
                this.addInputMessage("find", "Invalid query", "error");
            return;
        }
        // Test if it's a valid regex
        if (this.searchOptions.regex) {
            try {
                new RegExp(query);
            }
            catch (err) {
                // Split up the error message to fit in the box. In the future we might want the box to do word wrapping
                // So that it's not a manual endeavor
                const message = err.message.substr(0, 27) + "\n" + err.message.substr(27);
                this.addInputMessage("find", message, "error");
                return;
            }
        }
        query = this.searchType === "hex" ? util_1.hexQueryToArray(query) : query;
        if (query.length === 0) {
            // If the user didn't type anything and its just a blank query we don't want to error on them
            if (this.findTextBox.value.length > 0)
                this.addInputMessage("find", "Invalid query", "error");
            return;
        }
        this.stopSearchButton.classList.remove("disabled");
        let results;
        this.removeInputMessage("find");
        // This is wrapped in a try catch because if the message handler gets backed up this will reject
        try {
            results = (await hexEdit_1.messageHandler.postMessageWithResponse("search", {
                query: query,
                type: this.searchType,
                options: this.searchOptions
            })).results;
        }
        catch (err) {
            this.stopSearchButton.classList.add("disabled");
            this.addInputMessage("find", "Search returned an error!", "error");
            return;
        }
        if (results.partial) {
            this.addInputMessage("find", "Partial results returned, try\n narrowing your query.", "warning");
        }
        this.stopSearchButton.classList.add("disabled");
        this.resultIndex = 0;
        this.searchResults = results.result;
        // If we got results then we select the first result and unlock the buttons
        if (this.searchResults.length !== 0) {
            await hexEdit_1.virtualHexDocument.scrollDocumentToOffset(this.searchResults[this.resultIndex][0]);
            hexEdit_1.virtualHexDocument.setSelection(this.searchResults[this.resultIndex]);
            // If there's more than one search result we unlock the find next button
            if (this.resultIndex + 1 < this.searchResults.length) {
                this.findNextButton.classList.remove("disabled");
            }
            this.updateReplaceButtons();
        }
    }
    /**
     * @description Handles when the user clicks the find next icon
     * @param {boolean} focus Whether or not to focus the selection
     */
    async findNext(focus) {
        // If the button is disabled then this function shouldn't work
        if (this.findNextButton.classList.contains("disabled"))
            return;
        await hexEdit_1.virtualHexDocument.scrollDocumentToOffset(this.searchResults[++this.resultIndex][0]);
        hexEdit_1.virtualHexDocument.setSelection(this.searchResults[this.resultIndex]);
        if (focus)
            selectHandler_1.SelectHandler.focusSelection(this.searchType);
        // If there's more than one search result we unlock the find next button
        if (this.resultIndex < this.searchResults.length - 1) {
            this.findNextButton.classList.remove("disabled");
        }
        else {
            this.findNextButton.classList.add("disabled");
        }
        // We also unlock the find previous button if there is a previous
        if (this.resultIndex != 0) {
            this.findPreviousButton.classList.remove("disabled");
        }
    }
    /**
     * @description Handles when the user clicks the find previous icon
     * @param {boolean} focus Whether or not to focus the selection
     */
    async findPrevious(focus) {
        // If the button is disabled then this function shouldn't work
        if (this.findPreviousButton.classList.contains("disabled"))
            return;
        await hexEdit_1.virtualHexDocument.scrollDocumentToOffset(this.searchResults[--this.resultIndex][0]);
        hexEdit_1.virtualHexDocument.setSelection(this.searchResults[this.resultIndex]);
        if (focus)
            selectHandler_1.SelectHandler.focusSelection(this.searchType);
        // If they pressed previous, they can always go next therefore we always unlock the next button
        this.findNextButton.classList.remove("disabled");
        // We lock the find previous if there isn't a previous anymore
        if (this.resultIndex == 0) {
            this.findPreviousButton.classList.add("disabled");
        }
    }
    /**
     * @description Handles when the user toggels between text and hex showing the input glyphs and ensureing correct padding
     */
    updateInputGlyphs() {
        // The glyph icons that sit in the find and replace bar
        const inputGlyphs = document.getElementsByClassName("bar-glyphs");
        const inputFields = document.querySelectorAll(".bar > .input-glyph-group > input");
        if (this.searchType == "hex") {
            inputGlyphs[0].hidden = true;
            inputGlyphs[1].hidden = true;
            document.documentElement.style.setProperty("--input-glyph-padding", "0px");
        }
        else {
            for (let i = 0; i < inputGlyphs.length; i++) {
                inputGlyphs[i].hidden = false;
            }
            const glyphRect = inputGlyphs[0].getBoundingClientRect();
            const inputRect = inputFields[0].getBoundingClientRect();
            // Calculates how much padding we should have so that the text doesn't run into the glyphs
            const inputPadding = (inputRect.x + inputRect.width + 1) - glyphRect.x;
            document.documentElement.style.setProperty("--input-glyph-padding", `${inputPadding}px`);
        }
    }
    /**
     * @description Handles listening to the search options and updating them
     */
    searchOptionsHandler() {
        var _a, _b;
        // Toggle Regex
        (_a = document.getElementById("regex-icon")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
            const regexIcon = event.target;
            if (regexIcon.classList.contains("toggled")) {
                this.searchOptions.regex = false;
                regexIcon.classList.remove("toggled");
            }
            else {
                this.searchOptions.regex = true;
                regexIcon.classList.add("toggled");
            }
            // The user is changing an option so we should trigger another search
            this.search();
        });
        // Toggle case sensitive
        (_b = document.getElementById("case-sensitive")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (event) => {
            const caseSensitive = event.target;
            if (caseSensitive.classList.contains("toggled")) {
                this.searchOptions.caseSensitive = false;
                caseSensitive.classList.remove("toggled");
            }
            else {
                this.searchOptions.caseSensitive = true;
                caseSensitive.classList.add("toggled");
            }
            // The user is changing an option so we should trigger another search
            this.search();
        });
    }
    replaceOptionsHandler() {
        var _a;
        // Toggle preserve case
        (_a = document.getElementById("preserve-case")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
            const preserveCase = event.target;
            if (preserveCase.classList.contains("toggled")) {
                this.preserveCase = false;
                preserveCase.classList.remove("toggled");
            }
            else {
                this.preserveCase = true;
                preserveCase.classList.add("toggled");
            }
        });
    }
    /**
     * @description Handles when the user hits the stop search button
     */
    cancelSearch() {
        if (this.stopSearchButton.classList.contains("disabled"))
            return;
        // We don't want the user to keep executing this, so we disable the button after the first search
        this.stopSearchButton.classList.add("disabled");
        // We send a cancellation message to the exthost, there's no need to  wait for a response
        // As we're not expecting anything back just to stop processing the search
        hexEdit_1.messageHandler.postMessageWithResponse("search", { cancel: true });
    }
    /**
     * @description Helper function which handles locking / unlocking the replace buttons
     */
    updateReplaceButtons() {
        this.removeInputMessage("replace");
        const hexReplaceRegex = new RegExp("^[a-fA-F0-9]+$");
        // If it's not a valid hex query we lock the buttons, we remove whitespace from the string to simplify the regex
        const queryNoSpaces = this.replaceTextBox.value.replace(/\s/g, "");
        if (this.searchType === "hex" && !hexReplaceRegex.test(queryNoSpaces)) {
            this.replaceAllButton.classList.add("disabled");
            this.replaceButton.classList.add("disabled");
            if (this.replaceTextBox.value.length > 0)
                this.addInputMessage("replace", "Invalid replacement", "error");
            return;
        }
        const replaceQuery = this.replaceTextBox.value;
        const replaceArray = this.searchType === "hex" ? util_1.hexQueryToArray(replaceQuery) : Array.from(replaceQuery);
        if (this.searchResults.length !== 0 && replaceArray.length !== 0) {
            this.replaceAllButton.classList.remove("disabled");
            this.replaceButton.classList.remove("disabled");
        }
        else {
            if (this.replaceTextBox.value.length > 0 && replaceArray.length === 0)
                this.addInputMessage("replace", "Invalid replacement", "error");
            this.replaceAllButton.classList.add("disabled");
            this.replaceButton.classList.add("disabled");
        }
    }
    /**
     * @description Handles when the user clicks replace or replace all
     * @param {boolean} all whether this is a normal replace or a replace all
     */
    async replace(all) {
        const replaceQuery = this.replaceTextBox.value;
        const replaceArray = this.searchType === "hex" ? util_1.hexQueryToArray(replaceQuery) : Array.from(replaceQuery);
        let replaceBits = [];
        // Since the exthost only holds data in 8 bit unsigned ints we must convert it back
        if (this.searchType === "hex") {
            replaceBits = replaceArray.map(val => parseInt(val, 16));
        }
        else {
            replaceBits = replaceArray.map(val => val.charCodeAt(0));
        }
        let offsets = [];
        if (all) {
            offsets = this.searchResults;
        }
        else {
            offsets = [this.searchResults[this.resultIndex]];
        }
        const edits = (await hexEdit_1.messageHandler.postMessageWithResponse("replace", {
            query: replaceBits,
            offsets: offsets,
            preserveCase: this.preserveCase
        })).edits;
        // We can pass the size of the document back in because with the current implementation
        // The size of the document will never change as we only replace preexisting cells
        hexEdit_1.virtualHexDocument.redo(edits, hexEdit_1.virtualHexDocument.documentSize);
        this.findNext(true);
    }
    /**
     * @description Function responsible for handling when the user presses cmd / ctrl + f updating the widget and focusing it
     */
    searchKeybindingHandler() {
        var _a;
        this.searchType = ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains("ascii")) ? "ascii" : "hex";
        const dataTypeSelect = document.getElementById("data-type");
        dataTypeSelect.value = this.searchType;
        dataTypeSelect.dispatchEvent(new Event("change"));
        this.findTextBox.focus();
    }
    /**
     * @description Adds an warning / error message to the input box passed in
     * @param {"find" | "replace"} inputBoxName Whether it's the find input box or the replace input box
     * @param {string} message The message to display
     * @param {"error" | "warning"} type Whether it's an error message or a warning message
     */
    addInputMessage(inputBoxName, message, type) {
        const inputBox = inputBoxName === "find" ? this.findTextBox : this.replaceTextBox;
        const messageBox = document.getElementById(`${inputBoxName}-message-box`);
        // We try to do the least amount of DOM changing as to reduce the flashing the user sees
        if (messageBox.innerText === message && messageBox.classList.contains(`input-${type}`)) {
            return;
        }
        else if (messageBox.classList.contains(`input-${type}`)) {
            messageBox.innerText = message;
            return;
        }
        else {
            this.removeInputMessage("find", true);
            messageBox.innerText = message;
            // Add the classes for proper styling of the message
            inputBox.classList.add(`${type}-border`);
            messageBox.classList.add(`${type}-border`, `input-${type}`);
            messageBox.hidden = false;
        }
    }
    /**
     * @description Removes the warning / error message
     * @param {"find" | "replace"} inputBoxName Which input box to remove the message from
     * @param {boolean | undefined} skipHiding Whether we want to skip hiding the empty message box, this is useful for clearing the box to add new text
     */
    removeInputMessage(inputBoxName, skipHiding) {
        const inputBox = inputBoxName === "find" ? this.findTextBox : this.replaceTextBox;
        const errorMessageBox = document.getElementById(`${inputBoxName}-message-box`);
        // Add the classes for proper styling of the message
        inputBox.classList.remove("error-border", "warning-border");
        errorMessageBox.classList.remove("error-border", "warning-border", "input-warning", "input-error");
        if (skipHiding !== true)
            errorMessageBox.hidden = true;
    }
}
exports.SearchHandler = SearchHandler;


/***/ }),

/***/ "./media/selectHandler.ts":
/*!********************************!*\
  !*** ./media/selectHandler.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectHandler = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./media/util.ts");
const webviewStateManager_1 = __webpack_require__(/*! ./webviewStateManager */ "./media/webviewStateManager.ts");
class SelectHandler {
    constructor() {
        this._selection = [];
    }
    /**
     * @description Given an offset selects the elements. This does not clear the previously selected elements.
     * @param {number} offset Offset to select
     * @param {boolean} force If force is not given, toggles selection. If force is true selects the element.
     * If force is false deselects the element.
     */
    static toggleSelectOffset(offset, force) {
        const elements = util_1.getElementsWithGivenOffset(offset);
        if (elements.length === 0) {
            // Element may not be part of the DOM
            return;
        }
        elements[0].classList.toggle("selected", force);
        elements[1].classList.toggle("selected", force);
    }
    /***
     * @description Returns the offset of the element currently focused.
     * @returns {number} The offset of the element currently focused
     */
    getFocused() {
        return this._focus;
    }
    /***
     * @description Set the offset of the element currently focused.
     * @param {number} offset The offset the element currently focused
     */
    setFocused(offset) {
        this._focus = offset;
    }
    /***
     * @description Returns the offset from which the selection starts.
     * @returns {number} The offset from which the selection starts
     */
    getSelectionStart() {
        var _a;
        return (_a = this._selectionStart) !== null && _a !== void 0 ? _a : this._focus;
    }
    /***
     * @description Returns the offsets of the elements currently selected.
     * @returns {number[]} The offsets of the elements currently selected
     */
    getSelected() {
        var _a;
        return (_a = webviewStateManager_1.WebViewStateManager.getProperty("selected_offsets")) !== null && _a !== void 0 ? _a : [];
    }
    /***
     * @description Given an array of offsets, selects the corresponding elements.
     * @param {number[]} offsets The offsets of the elements you want to select
     * @param {number} start The offset from which the selection starts
     * @param {boolean} forceRender Wheter to force rendering of all elements whose
     * selected stated will change
     */
    setSelected(offsets, start, forceRender = false) {
        const oldSelection = this._selection;
        this._selectionStart = start;
        this._selection = [...offsets].sort((a, b) => a - b);
        webviewStateManager_1.WebViewStateManager.setProperty("selected_offsets", this._selection);
        // Need to call renderSelection with the least number of offsets to avoid querying the DOM
        // as much as possible, if not rendering large selections becomes laggy as we dont hold references
        // to the DOM elements
        const toRender = forceRender ? util_1.disjunction(oldSelection, this._selection) : util_1.relativeComplement(oldSelection, this._selection);
        this.renderSelection(toRender);
    }
    /***
     * @description Renders the updated selection state of selected/unselected elements
     * @param {number[]} offsets The offsets of the elements to render
     */
    renderSelection(offsets) {
        const contains = (offset) => util_1.binarySearch(this._selection, offset, (a, b) => a - b) >= 0;
        for (const offset of offsets) {
            SelectHandler.toggleSelectOffset(offset, contains(offset));
        }
    }
    /***
     * @description Grabs the hex values of the selected bytes
     * @returns {string[]} The hex values
     */
    static getSelectedHex() {
        const hex = [];
        const selected = document.getElementsByClassName("selected hex");
        for (let i = 0; i < selected.length; i++) {
            if (selected[i].innerText === "+")
                continue;
            hex.push(selected[i].innerText);
        }
        return hex;
    }
    /**
     * @description Focuses the first element in the current selection based on the section passed in
     * @param section {"hex" | "ascii"} The section to place the focus
     */
    static focusSelection(section) {
        const selection = document.getElementsByClassName(`selected ${section}`);
        if (selection.length !== 0)
            selection[0].focus();
    }
    /**
     * @description Retrieves the selection as a string, defaults to hex if there is no focus on either side
     * @returns {string} The selection represented as a string
     */
    static getSelectedValue() {
        var _a;
        let selectedValue = "";
        let section = "hex";
        let selectedElements;
        if ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains("ascii")) {
            section = "ascii";
            selectedElements = document.getElementsByClassName("selected ascii");
        }
        else {
            selectedElements = document.getElementsByClassName("selected hex");
        }
        for (const element of selectedElements) {
            if (element.innerText === "+")
                continue;
            selectedValue += element.innerText;
            if (section === "hex")
                selectedValue += " ";
        }
        // If it's hex we want to remove the last space as it doesn't make sense
        // For ascii that space might have meaning
        if (section === "hex")
            selectedValue = selectedValue.trimRight();
        return selectedValue;
    }
}
exports.SelectHandler = SelectHandler;


/***/ }),

/***/ "./media/srollBarHandler.ts":
/*!**********************************!*\
  !*** ./media/srollBarHandler.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollBarHandler = void 0;
const hexEdit_1 = __webpack_require__(/*! ./hexEdit */ "./media/hexEdit.ts");
const webviewStateManager_1 = __webpack_require__(/*! ./webviewStateManager */ "./media/webviewStateManager.ts");
class ScrollBarHandler {
    /**
     * Given a scrollbar element instantiates a handler which handles the scrolling behavior in the editor
     * @param {string} scrollBarId the id of the scrollbar element on the DOM
     * @param {number} rowHeight the height of a row in px
     */
    constructor(scrollBarId, numRows, rowHeight) {
        this.scrollTop = 0;
        this.isDragging = false;
        // If the scrollbar isn't on the DOM for some reason there's nothing we can do besides create an empty handler and throw an error
        if (document.getElementById(scrollBarId)) {
            this.scrollBar = document.getElementById(scrollBarId);
            this.scrollThumb = this.scrollBar.children[0];
        }
        else {
            this.scrollBar = document.createElement("div");
            this.scrollThumb = document.createElement("div");
            throw "Invalid scrollbar id!";
        }
        window.addEventListener("wheel", this.onMouseWheel.bind(this));
        this.scrollBar.addEventListener("mousedown", () => {
            this.scrollThumb.classList.add("scrolling");
            this.isDragging = true;
        });
        this.scrollBar.addEventListener("mouseup", () => {
            this.scrollThumb.classList.remove("scrolling");
            this.isDragging = false;
        });
        window.addEventListener("mousemove", this.scrollThumbDrag.bind(this));
        this.rowHeight = rowHeight;
        this.updateScrollBar(numRows);
    }
    /**
     * @description Handles ensuring the scrollbar is valid after window resize
     * @param {number} numRows The number of rows in the file, needed to map scroll bar to row locations
     */
    updateScrollBar(numRows) {
        // Some calculations so that the thumb / scrubber is representative of how much content there is
        // Credit to https://stackoverflow.com/questions/16366795/how-to-calculate-the-size-of-scroll-bar-thumb for these calculations
        const contentHeight = (numRows + 1) * this.rowHeight;
        this.scrollBarHeight = this.scrollBar.clientHeight;
        // We don't want the scroll thumb larger than the scrollbar
        this.scrollThumbHeight = Math.min(this.scrollBarHeight, Math.max(this.scrollBarHeight * (this.scrollBarHeight / contentHeight), 30));
        this.scrollThumb.style.height = `${this.scrollThumbHeight}px`;
        // If you move the scrollbar 1px how much should the document move
        this.scrollJump = Math.max(0, (contentHeight - this.scrollBarHeight) / (this.scrollBarHeight - this.scrollThumbHeight));
        this.updateScrolledPosition();
    }
    /**
     * @description Handles when the user drags the thumb on the scrollbar around
     * @param {MouseEvent} event The mouse event passed to the event handler
     */
    scrollThumbDrag(event) {
        // if these are equal it means the document is too short to scroll anyways
        if (this.scrollBarHeight === this.scrollThumbHeight)
            return;
        // This helps the case where we lose track as the user releases the button outside the webview
        if (!this.isDragging || event.buttons == 0) {
            this.isDragging = false;
            this.scrollThumb.classList.remove("scrolling");
            return;
        }
        event.preventDefault();
        this.updateVirtualScrollTop(event.clientY * this.scrollJump);
        this.updateScrolledPosition();
    }
    /**
     * @description Updaes the position of the document and the scrollbar thumb based on the scrollTop
     */
    async updateScrolledPosition() {
        // The virtual document upon first load is undefined so we want to prevent any errors and just not do anything in that case
        if (!hexEdit_1.virtualHexDocument || !hexEdit_1.virtualHexDocument.documentHeight)
            return [];
        this.scrollThumb.style.transform = `translateY(${this.scrollTop / this.scrollJump}px)`;
        // This makes sure it doesn't scroll past the bottom of the viewport
        document.getElementsByClassName("rowwrapper")[0].style.transform = `translateY(-${this.scrollTop % hexEdit_1.virtualHexDocument.documentHeight}px)`;
        document.getElementsByClassName("rowwrapper")[1].style.transform = `translateY(-${this.scrollTop % hexEdit_1.virtualHexDocument.documentHeight}px)`;
        document.getElementsByClassName("rowwrapper")[2].style.transform = `translateY(-${this.scrollTop % hexEdit_1.virtualHexDocument.documentHeight}px)`;
        return hexEdit_1.virtualHexDocument.scrollHandler();
    }
    /**
     * @description Handles the user scrolling with their mouse wheel
     * @param {MouseWheelEvent} event The event containing information about the scroll passed to the event handler
     */
    onMouseWheel(event) {
        // if these are equal it means the document is too short to scroll anyways
        if (this.scrollBarHeight === this.scrollThumbHeight)
            return;
        if (Math.abs(event.deltaX) !== 0 || event.shiftKey)
            return;
        if (event.deltaY > 0) {
            this.updateVirtualScrollTop(this.scrollTop + this.rowHeight);
        }
        else {
            this.updateVirtualScrollTop(this.scrollTop - this.rowHeight);
        }
        this.updateScrolledPosition();
    }
    /**
     * @description Can be called to scroll the document similar to window.scrollBy
     * @param {number} numRows The number of rows you want to scroll
     * @param {"up" | "down"} direction The direction, up or down
     */
    async scrollDocument(numRows, direction) {
        if (direction === "up") {
            this.updateVirtualScrollTop(this.scrollTop - (this.rowHeight * numRows));
        }
        else {
            this.updateVirtualScrollTop(this.scrollTop + (this.rowHeight * numRows));
        }
        return this.updateScrolledPosition();
    }
    /**
     * @description Scrolls to the top of the document
     */
    scrollToTop() {
        this.updateVirtualScrollTop(0);
        this.updateScrolledPosition();
    }
    /**
     * @description Scrolls to the bottom of the document
     */
    scrollToBottom() {
        this.updateVirtualScrollTop(((this.scrollBarHeight - this.scrollThumbHeight) * this.scrollJump) + this.rowHeight);
        this.updateScrolledPosition();
    }
    /**
     * @description Controls scrolling up and down one viewport. Which occurs when the user presses page up or page down
     * @param {number} viewportHeight The height of the viewport in pixels
     * @param {string} direction Whether you want to page up or down
     */
    page(viewportHeight, direction) {
        if (direction == "up") {
            this.updateVirtualScrollTop(this.scrollTop - viewportHeight);
        }
        else {
            this.updateVirtualScrollTop(this.scrollTop + viewportHeight);
        }
        this.updateScrolledPosition();
    }
    /***
     * @description Sets the virtualScrollTop ensuring it never exceeds the document bounds
     * @param {number} newScrollTop The number you're trying to set the virtual scroll top to
     */
    updateVirtualScrollTop(newScrollTop) {
        this.scrollTop = Math.max(0, newScrollTop);
        newScrollTop = this.scrollTop;
        this.scrollTop = Math.min(newScrollTop, ((this.scrollBarHeight - this.scrollThumbHeight) * this.scrollJump) + this.rowHeight);
        webviewStateManager_1.WebViewStateManager.setProperty("scroll_top", this.scrollTop);
    }
    /**
     * @description Retrieves the pixel value at the top of the viewport
     * @returns {number} The pixel value of the virtual viewport top
     */
    get virtualScrollTop() {
        return this.scrollTop;
    }
    /**
     * @description Updates the scroll position to be whatever was saved in the webview state. Should only be called if the user has reloaded the webview
     */
    resyncScrollPosition() {
        // If we had a previously saved state when creating the scrollbar we should restore the scroll position
        if (webviewStateManager_1.WebViewStateManager.getState() && webviewStateManager_1.WebViewStateManager.getState().scroll_top) {
            this.updateVirtualScrollTop(webviewStateManager_1.WebViewStateManager.getState().scroll_top);
            this.updateScrolledPosition();
        }
    }
    /**
     * @description Scrolls to the given offset if it's outside the viewport
     * @param offset The offset to scroll to
     * @param force Whether or not you should scroll even if it's in the viewport
     */
    async scrollToOffset(offset, force) {
        // if these are equal it means the document is too short to scroll anyways
        if (this.scrollBarHeight === this.scrollThumbHeight)
            return [];
        const topOffset = hexEdit_1.virtualHexDocument.topOffset();
        // Don't scroll if in the viewport
        if (!force && offset >= topOffset && offset <= hexEdit_1.virtualHexDocument.bottomOffset())
            return [];
        const rowDifference = Math.floor(Math.abs(offset - topOffset) / 16);
        // The +3/-3 is because there is because we want the result to not be pressed against the top
        if (offset > topOffset) {
            return this.scrollDocument(rowDifference - 3, "down");
        }
        else {
            return this.scrollDocument(rowDifference + 3, "up");
        }
    }
}
exports.ScrollBarHandler = ScrollBarHandler;


/***/ }),

/***/ "./media/util.ts":
/*!***********************!*\
  !*** ./media/util.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.binarySearch = exports.relativeComplement = exports.disjunction = exports.hexQueryToArray = exports.createOffsetRange = exports.retrieveSelectedByteObject = exports.pad = exports.updateAsciiValue = exports.getElementsGivenMouseEvent = exports.getElementsOffset = exports.getElementsWithGivenOffset = exports.generateCharacterRanges = exports.withinAnyRange = exports.Range = void 0;
const byteData_1 = __webpack_require__(/*! ./byteData */ "./media/byteData.ts");
// Assorted helper functions
/**
 * @description Class which represents a range of numbers
 */
class Range {
    /**
     * @description Constructs a range object representing [start, end] inclusive of both
     * @param {number} start Represents the start of the range
     * @param {number} end Represents the end of the range
     */
    constructor(start, end = Number.MAX_SAFE_INTEGER) {
        if (start > end) {
            this.start = end;
            this.end = start;
        }
        else {
            this.start = start;
            this.end = end;
        }
    }
    /**
     * @desciption Tests if the given number if within the range
     * @param {number} num The number to test
     * @returns {boolean } True if the number is in the range, false otherwise
     */
    between(num) {
        if (this.end) {
            return num >= this.start && num <= this.end;
        }
        else {
            return num >= this.start;
        }
    }
}
exports.Range = Range;
/**
 * @description Checks if the given number is in any of the ranges
 * @param {number} num The number to use when checking the ranges
 * @param {Range[]} ranges The ranges to check the number against
 * @returns {boolean} True if the number is in any of the ranges, false otherwise
 */
function withinAnyRange(num, ranges) {
    for (const range of ranges) {
        if (range.between(num)) {
            return true;
        }
    }
    return false;
}
exports.withinAnyRange = withinAnyRange;
/**
 * @description Creates a list of ranges containing the non renderable 8 bit char codes
 * @returns {Range[]} The ranges which represent the non renderable 8 bit char codes
 */
function generateCharacterRanges() {
    const ranges = [];
    ranges.push(new Range(0, 31));
    ranges.push(new Range(127, 160));
    ranges.push(new Range(173, 173));
    ranges.push(new Range(256));
    return ranges;
}
exports.generateCharacterRanges = generateCharacterRanges;
/**
 * @description Given an offset gets all spans with that offset
 * @param {number} offset The offset to find elements of
 * @returns {HTMLCollectionOf<HTMLElement>} returns a list of HTMLElements which have the given offset
 */
function getElementsWithGivenOffset(offset) {
    return document.getElementsByClassName(`cell-offset-${offset}`);
}
exports.getElementsWithGivenOffset = getElementsWithGivenOffset;
/**
 * @description Given an element returns its offset or NaN if it doesn't have one
 * @param {HTMLElement} element The element to get the offset of
 * @returns {number} Returns the offset of the element or NaN
 */
function getElementsOffset(element) {
    for (const currentClass of element.classList) {
        if (currentClass.indexOf("cell-offset") !== -1) {
            const offset = parseInt(currentClass.replace("cell-offset-", ""));
            return offset;
        }
    }
    return NaN;
}
exports.getElementsOffset = getElementsOffset;
/**
 * @description Returns the elements with the same offset as the one clicked
 * @param {MouseEvent} event The event which is handed to a mouse event listener
 * @returns {HTMLCollectionOf<Element> | Array<Element>} The elements with the same offset as the clicked element, or undefined if none could be retrieved
 */
function getElementsGivenMouseEvent(event) {
    if (!event || !event.target)
        return [];
    const hovered = event.target;
    return getElementsWithGivenOffset(getElementsOffset(hovered));
}
exports.getElementsGivenMouseEvent = getElementsGivenMouseEvent;
/**
 * @description Given a bytedata object updates the ascii element with the correct decoded text
 * @param {ByteData} byteData The object containing information about a given byte
 * @param {HTMLSpanElement} asciiElement The decoded text element on the DOM
 */
function updateAsciiValue(byteData, asciiElement) {
    asciiElement.classList.remove("nongraphic");
    // If it's some sort of character we cannot render we just represent it as a period with the nographic class
    if (withinAnyRange(byteData.to8bitUInt(), generateCharacterRanges())) {
        asciiElement.classList.add("nongraphic");
        asciiElement.innerText = ".";
    }
    else {
        const ascii_char = String.fromCharCode(byteData.to8bitUInt());
        asciiElement.innerText = ascii_char;
    }
}
exports.updateAsciiValue = updateAsciiValue;
/**
 * @description Given a string 0 pads it up unitl the string is of length width
 * @param {string} number The number you want to 0 pad (it's a string as you're 0 padding it to display it, not to do arithmetic)
 * @param {number} width The length of the final string (if smaller than the string provided nothing happens)
 * @returns {string} The newly padded string
 */
function pad(number, width) {
    number = number + "";
    return number.length >= width ? number : new Array(width - number.length + 1).join("0") + number;
}
exports.pad = pad;
/**
 * @description Given two elements (the hex and ascii elements), returns a ByteData object representing both of them
 * @param {HTMLCollectionOf<Element>} elements The elements representing the hex and associated ascii on the DOM
 * @returns {ByteData | undefined} The ByteData object or undefined if elements was malformed or empty
 */
function retrieveSelectedByteObject(elements) {
    var _a, _b, _c;
    for (const element of Array.from(elements)) {
        if (element.parentElement && element.classList.contains("hex")) {
            const byte_object = new byteData_1.ByteData(parseInt(element.innerHTML, 16));
            let current_element = element.nextElementSibling || ((_a = element.parentElement.nextElementSibling) === null || _a === void 0 ? void 0 : _a.children[0]);
            for (let i = 0; i < 7; i++) {
                if (!current_element || current_element.innerHTML === "+")
                    break;
                byte_object.addAdjacentByte(new byteData_1.ByteData(parseInt(current_element.innerHTML, 16)));
                current_element = current_element.nextElementSibling || ((_c = (_b = current_element.parentElement) === null || _b === void 0 ? void 0 : _b.nextElementSibling) === null || _c === void 0 ? void 0 : _c.children[0]);
            }
            return byte_object;
        }
    }
    return;
}
exports.retrieveSelectedByteObject = retrieveSelectedByteObject;
/**
 * @description Given a start and end offset creates an array containing all the offsets in between, inclusive of start and end
 * @param {number} startOffset The offset which defines the start of the range
 * @param {number} endOffset The offset which defines the end of the range
 * @returns {number[]} The range [startOffset, endOffset]
 */
function createOffsetRange(startOffset, endOffset) {
    const offsetsToSelect = [];
    // We flip them so that the for loop creates the range correctly
    if (endOffset < startOffset) {
        const temp = endOffset;
        endOffset = startOffset;
        startOffset = temp;
    }
    // Create an array of offsets with everything between the last selected element and what the user hit shift
    for (let i = startOffset; i <= endOffset; i++) {
        offsetsToSelect.push(i);
    }
    return offsetsToSelect;
}
exports.createOffsetRange = createOffsetRange;
/**
 * @description Converts a hex query to a string array ignoring spaces, if not evenly divisible we append a leading 0
 * i.e A -> 0A
 * @param {string} query The query to convert to an array
 */
function hexQueryToArray(query) {
    let currentCharacterSequence = "";
    const queryArray = [];
    for (let i = 0; i < query.length; i++) {
        if (query[i] === " ")
            continue;
        currentCharacterSequence += query[i];
        if (currentCharacterSequence.length === 2) {
            queryArray.push(currentCharacterSequence);
            currentCharacterSequence = "";
        }
    }
    if (currentCharacterSequence.length > 0) {
        queryArray.push("0" + currentCharacterSequence);
    }
    return queryArray;
}
exports.hexQueryToArray = hexQueryToArray;
/**
 * @description Given two sorted collections of numbers, returns the union
 * between them (OR).
 * @param {number[]} one The first sorted array of numbers
 * @param {number[]} other The other sorted array of numbers
 * @returns {number[]} A sorted collections of numbers representing the union (OR)
 * between to sorted collections of numbers
 */
function disjunction(one, other) {
    const result = [];
    let i = 0, j = 0;
    while (i < one.length || j < other.length) {
        if (i >= one.length) {
            result.push(other[j++]);
        }
        else if (j >= other.length) {
            result.push(one[i++]);
        }
        else if (one[i] === other[j]) {
            result.push(one[i]);
            i++;
            j++;
            continue;
        }
        else if (one[i] < other[j]) {
            result.push(one[i++]);
        }
        else {
            result.push(other[j++]);
        }
    }
    return result;
}
exports.disjunction = disjunction;
/**
 * @description Given two sorted collections of numbers, returns the relative
 * complement between them (XOR).
 * @param {number[]} one The first sorted array of numbers
 * @param {number[]} other The other sorted array of numbers
 * @returns {number[]} A sorted collections of numbers representing the complement (XOR)
 * between to sorted collections of numbers
 */
function relativeComplement(one, other) {
    const result = [];
    let i = 0, j = 0;
    while (i < one.length || j < other.length) {
        if (i >= one.length) {
            result.push(other[j++]);
        }
        else if (j >= other.length) {
            result.push(one[i++]);
        }
        else if (one[i] === other[j]) {
            i++;
            j++;
            continue;
        }
        else if (one[i] < other[j]) {
            result.push(one[i++]);
        }
        else {
            result.push(other[j++]);
        }
    }
    return result;
}
exports.relativeComplement = relativeComplement;
/**
 * @description Searches a key element inside a sorted array.
 * @template T
 * @param {T[]} array The sorted array to search in
 * @param {T} key The key to search for in the sorted array
 * @param {comparatorCallback} comparator The comparator callback
 * @returns {number} The at which a given element can be found in the array, or a negative value if it is not present
 */
function binarySearch(array, key, comparator) {
    let low = 0, high = array.length - 1;
    while (low <= high) {
        const mid = ((low + high) / 2) | 0;
        const comp = comparator(array[mid], key);
        if (comp < 0) {
            low = mid + 1;
        }
        else if (comp > 0) {
            high = mid - 1;
        }
        else {
            return mid;
        }
    }
    return -(low + 1);
}
exports.binarySearch = binarySearch;


/***/ }),

/***/ "./media/virtualDocument.ts":
/*!**********************************!*\
  !*** ./media/virtualDocument.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualDocument = void 0;
const byteData_1 = __webpack_require__(/*! ./byteData */ "./media/byteData.ts");
const util_1 = __webpack_require__(/*! ./util */ "./media/util.ts");
const eventHandlers_1 = __webpack_require__(/*! ./eventHandlers */ "./media/eventHandlers.ts");
const hexEdit_1 = __webpack_require__(/*! ./hexEdit */ "./media/hexEdit.ts");
const srollBarHandler_1 = __webpack_require__(/*! ./srollBarHandler */ "./media/srollBarHandler.ts");
const editHandler_1 = __webpack_require__(/*! ./editHandler */ "./media/editHandler.ts");
const webviewStateManager_1 = __webpack_require__(/*! ./webviewStateManager */ "./media/webviewStateManager.ts");
const selectHandler_1 = __webpack_require__(/*! ./selectHandler */ "./media/selectHandler.ts");
const searchHandler_1 = __webpack_require__(/*! ./searchHandler */ "./media/searchHandler.ts");
const dataInspector_1 = __webpack_require__(/*! ./dataInspector */ "./media/dataInspector.ts");
/**
 * @description Handles the presentation layer virtualizing the hex document
 */
class VirtualDocument {
    /**
     * @description Constructs a VirtualDocument for a file of a given size. Also handles the initial DOM layout
     * @param {number} fileSize The size, in bytes, of the file which is being displayed
     */
    constructor(fileSize, baseAddress = 0) {
        var _a;
        this.fileSize = fileSize;
        this.baseAddress = baseAddress;
        this.editHandler = new editHandler_1.EditHandler();
        this.selectHandler = new selectHandler_1.SelectHandler();
        this.searchHandler = new searchHandler_1.SearchHandler();
        // This holds the 3 main columns rows (hexaddr, hexbody, ascii)
        this.rows = [];
        for (let i = 0; i < 3; i++) {
            this.rows.push(new Map());
        }
        // We create elements and place them on the DOM before removing them to get heights and widths of rows to setup layout correctly
        const ascii = document.getElementById("ascii");
        const hex = document.getElementById("hexbody");
        const hexaddr = document.getElementById("hexaddr");
        const oldHexAddrHtml = hexaddr.innerHTML;
        const oldHexHtml = hex.innerHTML;
        const oldAsciiHtml = ascii.innerHTML;
        // We have to set the ascii columns width to be large before appending the ascii or else it wraps and messes up the width calculation
        // This is a change in the next gen layout engine
        ascii.style.width = "500px";
        const row = document.createElement("div");
        const asciiRow = document.createElement("div");
        const hexAddrRow = document.createElement("div");
        hexAddrRow.className = "row";
        asciiRow.className = "row";
        row.className = "row";
        // For ascii we want to test more than just one character as sometimes that doesn't set the width correctly
        const asciiTestString = "Testing String!!";
        for (let i = 0; i < 16; i++) {
            const hex_element = document.createElement("span");
            const ascii_element = document.createElement("span");
            hex_element.innerText = "FF";
            ascii_element.innerText = asciiTestString[i];
            asciiRow.appendChild(ascii_element);
            row.appendChild(hex_element);
        }
        hexAddrRow.innerText = "00000000";
        row.style.top = "0px";
        asciiRow.style.top = "0px";
        hex.appendChild(row);
        hexaddr.appendChild(hexAddrRow);
        ascii.appendChild(asciiRow);
        const spans = document.getElementsByTagName("span");
        this.rowHeight = spans[16].offsetHeight;
        // Utilize the fake rows to get the widths of them and alter the widths of the headers etc to fit
        // The plus one is because the new layout engine in chrome would wrap the text otherwise which I'm unsure why
        const asciiRowWidth = asciiRow.offsetWidth + 1;
        const hexRowWidth = spans[16].parentElement.offsetWidth;
        // Calculate document height, we max out at 500k due to browser limitations on large div
        this.documentHeight = 500000;
        // Calculate the padding needed to make the offset column right aligned
        this.hexAddrPadding = hexAddrRow.parentElement.clientWidth - hexAddrRow.clientWidth;
        // We set the document back to its original state
        hex.innerHTML = oldHexHtml;
        ascii.innerHTML = oldAsciiHtml;
        hexaddr.innerHTML = oldHexAddrHtml;
        // Sets the columns heights for sticky scrolling to work
        const columns = document.getElementsByClassName("column");
        for (const column of columns) {
            column.style.height = `${this.documentHeight}px`;
        }
        // Due to absolute positioning on the editor position we have to set a lot of sizes ourselves as the elements are not part of the document flow
        const rowWrappers = document.getElementsByClassName("rowwrapper");
        // Sets the hexaddr column to the same width as its header ( the + 1 is needed to )
        rowWrappers[0].style.width = `${document.getElementsByClassName("header")[0].offsetWidth}px`;
        // We remove the text from the header to make it look like it's not there
        const headerHeight = document.getElementsByClassName("header")[0].offsetHeight;
        document.getElementsByClassName("header")[0].innerText = "";
        document.getElementsByClassName("header")[0].style.width = `${rowWrappers[0].style.width}px`;
        // The plus one is to account for all other headers having borders
        document.getElementsByClassName("header")[0].style.height = `${headerHeight + 1}px`;
        rowWrappers[0].style.height = `${this.documentHeight}px`;
        // This is the hex section
        document.getElementsByClassName("header")[1].style.width = `${hexRowWidth}px`;
        rowWrappers[1].style.width = `${hexRowWidth}px`;
        rowWrappers[1].style.height = `${this.documentHeight}px`;
        // This is the ascii  section
        document.getElementsByClassName("header")[2].style.width = `${asciiRowWidth}px`;
        rowWrappers[2].style.width = `${asciiRowWidth}px`;
        rowWrappers[2].style.height = `${this.documentHeight}px`;
        // Creates the scrollBar Handler
        this.scrollBarHandler = new srollBarHandler_1.ScrollBarHandler("scrollbar", this.fileSize / 16, this.rowHeight);
        // Intializes a few things such as viewport size and the scrollbar positions
        this.documentResize();
        this.editorContainer = document.getElementById("editor-container");
        // Bind the event listeners
        // Will need to refactor this section soon as its getting pretty messy
        (_a = document.getElementById("endianness")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", eventHandlers_1.changeEndianness);
        this.editorContainer.addEventListener("keydown", this.editorKeyBoardHandler.bind(this));
        this.editorContainer.addEventListener("mouseover", eventHandlers_1.toggleHover);
        this.editorContainer.addEventListener("mouseleave", eventHandlers_1.toggleHover);
        // Event handles to handle when the user drags to create a selection
        this.editorContainer.addEventListener("click", this.clickHandler.bind(this));
        this.editorContainer.addEventListener("mousedown", this.mouseDownHandler.bind(this));
        window.addEventListener("copy", (event) => {
            var _a, _b;
            if (((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains("hex")) || ((_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.classList.contains("ascii"))) {
                this.editHandler.copy(event);
            }
        });
        window.addEventListener("paste", (event) => {
            var _a, _b;
            if (((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains("hex")) || ((_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.classList.contains("ascii"))) {
                this.editHandler.paste(event);
            }
        });
        window.addEventListener("resize", this.documentResize.bind(this));
        window.addEventListener("keydown", this.windowKeyboardHandler.bind(this));
    }
    /**
     * @description Renders the newly provided packets onto the DOM
     * @param {VirtualizedPacket[]} newPackets the packets which will be rendered
     */
    render(newPackets) {
        var _a, _b, _c;
        let rowData = [];
        const addrFragment = document.createDocumentFragment();
        const hexFragment = document.createDocumentFragment();
        const asciiFragment = document.createDocumentFragment();
        // Construct rows of 16 and add them to the associated fragments
        for (let i = 0; i < newPackets.length; i++) {
            rowData.push(newPackets[i]);
            if (i === newPackets.length - 1 || rowData.length == 16) {
                if (!this.rows[0].get(rowData[0].offset.toString())) {
                    this.populateHexAdresses(addrFragment, rowData);
                    this.populateHexBody(hexFragment, rowData);
                    this.populateAsciiTable(asciiFragment, rowData);
                }
                rowData = [];
            }
        }
        // Render the fragments to the DOM
        (_a = document.getElementById("hexaddr")) === null || _a === void 0 ? void 0 : _a.appendChild(addrFragment);
        (_b = document.getElementById("hexbody")) === null || _b === void 0 ? void 0 : _b.appendChild(hexFragment);
        (_c = document.getElementById("ascii")) === null || _c === void 0 ? void 0 : _c.appendChild(asciiFragment);
        if (webviewStateManager_1.WebViewStateManager.getState()) {
            const selectedOffsets = this.selectHandler.getSelected();
            if (selectedOffsets.length > 0) {
                this.selectHandler.setSelected(selectedOffsets, selectedOffsets[0], true);
            }
            // This isn't the best place for this, but it can't go in the constructor due to the document not being instantiated yet
            // This ensures that the srollTop is the same as in the state object, should only be out of sync on initial webview load
            const savedScrollTop = webviewStateManager_1.WebViewStateManager.getState().scroll_top;
            if (savedScrollTop && savedScrollTop !== this.scrollBarHandler.virtualScrollTop) {
                this.scrollBarHandler.resyncScrollPosition();
            }
        }
    }
    /**
     * @description Event handler which is called everytime the viewport is resized
     */
    documentResize() {
        this.viewPortHeight = document.documentElement.clientHeight;
        if (this.scrollBarHandler) {
            this.scrollBarHandler.updateScrollBar(this.fileSize / 16);
        }
    }
    /**
     * @description Gets the offset of the packet at the top of the viewport
     * @returns {number} the offset
     */
    topOffset() {
        return (Math.floor(this.scrollBarHandler.virtualScrollTop / this.rowHeight) * 16);
    }
    /**
     * @description Gets the offset of the packet at the bottom right of the viewport
     * @returns {number} the offset
     */
    bottomOffset() {
        const clientHeight = document.getElementsByTagName("html")[0].clientHeight;
        const numRowsInViewport = Math.floor(clientHeight / this.rowHeight);
        // If it's the end of the file it will fall to the this.fileSize - 1 case
        return Math.min((this.topOffset() + (numRowsInViewport * 16)) - 1, this.fileSize - 1);
    }
    /**
     * @description Retrieves the Y position a given offset is at
     * @param {number} offset The offset to calculate the y position of
     * @returns {number} The Y position the offset is at
     */
    offsetYPos(offset) {
        return (Math.floor(offset / 16) * this.rowHeight) % this.documentHeight;
    }
    /**
     * @description Gets executed everytime the document is scrolled, this talks to the data layer to request more packets
     */
    async scrollHandler() {
        var _a, _b, _c;
        // We want to ensure there are at least 2 chunks above us and 4 chunks below us
        // These numbers were chosen arbitrarily under the assumption that scrolling down is more common
        const chunkHandlerResponse = await hexEdit_1.chunkHandler.ensureBuffer(hexEdit_1.virtualHexDocument.topOffset(), {
            topBufferSize: 2,
            bottomBufferSize: 4
        });
        const removedChunks = chunkHandlerResponse.removed;
        // We remove the chunks from the DOM as the chunk handler is no longer tracking them
        for (const chunk of removedChunks) {
            for (let i = chunk; i < chunk + hexEdit_1.chunkHandler.chunkSize; i += 16) {
                (_a = this.rows[0].get(i.toString())) === null || _a === void 0 ? void 0 : _a.remove();
                this.rows[0].delete(i.toString());
                (_b = this.rows[1].get(i.toString())) === null || _b === void 0 ? void 0 : _b.remove();
                this.rows[1].delete(i.toString());
                (_c = this.rows[2].get(i.toString())) === null || _c === void 0 ? void 0 : _c.remove();
                this.rows[2].delete(i.toString());
            }
        }
        return chunkHandlerResponse.requested;
    }
    /**
     * @description Renders the gutter which holds the hex address memory offset
     * @param {DocumentFragment} fragment The fragment which elements get added to
     * @param {VirtualizedPacket[]} rowData An array of 16 bytes representing one row
     */
    populateHexAdresses(fragment, rowData) {
        const offset = rowData[0].offset;
        const addr = document.createElement("div");
        const displayOffset = offset + this.baseAddress;
        addr.className = "row";
        addr.setAttribute("data-offset", offset.toString());
        addr.innerText = util_1.pad(displayOffset.toString(16), 8).toUpperCase();
        fragment.appendChild(addr);
        this.rows[0].set(offset.toString(), addr);
        // We add a left px offset to effectively right align the column
        addr.style.left = `${this.hexAddrPadding}px`;
        this.translateRow(addr, offset);
    }
    /**
     * @description Renders the decoded text section
     * @param {DocumentFragment} fragment The fragment which elements get added to
     * @param {VirtualizedPacket[]} rowData An array of 16 bytes representing one row
     */
    populateAsciiTable(fragment, rowData) {
        const row = document.createElement("div");
        row.className = "row";
        const rowOffset = rowData[0].offset.toString();
        for (let i = 0; i < rowData.length; i++) {
            const ascii_element = this.createAsciiElement(rowData[i]);
            row.appendChild(ascii_element);
        }
        fragment.appendChild(row);
        this.rows[2].set(rowOffset, row);
        this.translateRow(row, parseInt(rowOffset));
    }
    /**
     * @description Renders the decoded text section
     * @param {DocumentFragment} fragment The fragment which elements get added to
     * @param {VirtualizedPacket[]} rowData An array of 16 bytes representing one row
     */
    populateHexBody(fragment, rowData) {
        const row = document.createElement("div");
        row.className = "row";
        const rowOffset = rowData[0].offset.toString();
        for (let i = 0; i < rowData.length; i++) {
            const hex_element = this.createHexElement(rowData[i]);
            row.appendChild(hex_element);
        }
        fragment.appendChild(row);
        this.rows[1].set(rowOffset, row);
        this.translateRow(row, parseInt(rowOffset));
    }
    /**
     * @description Creates a single hex span element from a packet
     * @param {VirtualizedPacket} packet The VirtualizedPacket holding the data needed to generate the element
     * @returns {HTMLSpanElement} The html span element ready to be added to the DOM
     */
    createHexElement(packet) {
        const hex_element = document.createElement("span");
        hex_element.classList.add("hex");
        hex_element.classList.add(`cell-offset-${packet.offset.toString()}`);
        // If the offset is greater than or equal to fileSize that's our placeholder so it's just a + symbol to signal you can type and add bytes there
        if (packet.offset < this.fileSize) {
            hex_element.innerText = util_1.pad(packet.data.toHex(), 2);
        }
        else {
            hex_element.classList.add("add-cell");
            hex_element.innerText = "+";
        }
        hex_element.tabIndex = -1;
        hex_element.addEventListener("mouseleave", eventHandlers_1.toggleHover);
        return hex_element;
    }
    /**
     * @description Creates a single ascii span element from a packet
     * @param {VirtualizedPacket} packet The VirtualizedPacket holding the data needed to generate the element
     * @returns {HTMLSpanElement} The html span element ready to be added to the DOM
     */
    createAsciiElement(packet) {
        const ascii_element = document.createElement("span");
        ascii_element.classList.add(`cell-offset-${packet.offset.toString()}`);
        ascii_element.classList.add("ascii");
        // If the offset is greater than or equal to fileSize that's our placeholder so it's just a + symbol to signal you can type and add bytes there
        if (packet.offset < this.fileSize) {
            util_1.updateAsciiValue(packet.data, ascii_element);
        }
        else {
            ascii_element.classList.add("add-cell");
            ascii_element.innerText = "+";
        }
        ascii_element.addEventListener("mouseleave", eventHandlers_1.toggleHover);
        ascii_element.tabIndex = -1;
        return ascii_element;
    }
    /**
     * @description Moves the rows from where they were placed to where they are supposed to be (this is due to absolute positioning)
     * @param {HTMLDivElement} row  The DivElement which needs to be moved
     * @param {number} offset The offset of the element at the beginning of the row
     */
    translateRow(row, offset) {
        // Get the expected Y value
        const expectedY = this.offsetYPos(offset);
        row.style.top = `${expectedY}px`;
    }
    /**
     * @description Handles the click events within the editor
     * @param {MouseEvent} event The MouseEvent passed to the event handler.
     */
    clickHandler(event) {
        if (event.buttons > 1)
            return;
        const target = event.target;
        if (!target || isNaN(util_1.getElementsOffset(target))) {
            return;
        }
        event.preventDefault();
        this.editHandler.completePendingEdits();
        const offset = util_1.getElementsOffset(target);
        if (event.shiftKey) {
            const startSelection = this.selectHandler.getSelectionStart();
            if (startSelection !== undefined) {
                this.selectHandler.setFocused(offset);
                const min = Math.min(startSelection, offset);
                const max = Math.max(startSelection, offset);
                this.selectHandler.setSelected(util_1.createOffsetRange(min, max), startSelection);
                target.focus({ preventScroll: true });
            }
        }
        else {
            this.selectHandler.setFocused(offset);
            if (event.ctrlKey) {
                const selection = this.selectHandler.getSelected();
                const newSelection = selection.filter(i => i !== offset);
                if (selection.length === newSelection.length) {
                    this.selectHandler.setSelected([...newSelection, offset], offset);
                }
                else {
                    this.selectHandler.setSelected(newSelection, offset);
                }
            }
            else {
                this.selectHandler.setSelected([offset], offset);
            }
            this.updateInspector();
            target.focus({ preventScroll: true });
        }
    }
    /**
     * @description Handles the mousedown events within the editor
     * @param {MouseEvent} event The MouseEvent passed to the event handler.
     */
    mouseDownHandler(event) {
        if (event.buttons !== 1) {
            return;
        }
        const target = event.target;
        if (!target || isNaN(util_1.getElementsOffset(target))) {
            return;
        }
        event.preventDefault();
        this.editHandler.completePendingEdits();
        const offset = util_1.getElementsOffset(target);
        const startMouseMoveOffset = offset;
        const startSelection = event.shiftKey ? this.selectHandler.getSelectionStart() : offset;
        const onMouseMove = (event) => {
            if (event.buttons !== 1) {
                return;
            }
            const target = event.target;
            if (!target || isNaN(util_1.getElementsOffset(target))) {
                return;
            }
            const offset = util_1.getElementsOffset(target);
            if (startSelection !== undefined && offset !== startMouseMoveOffset) {
                this.selectHandler.setFocused(offset);
                const min = Math.min(startSelection, offset);
                const max = Math.max(startSelection, offset);
                this.selectHandler.setSelected(util_1.createOffsetRange(min, max), startSelection);
                target.focus({ preventScroll: true });
            }
        };
        const onMouseUp = () => {
            this.editorContainer.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
        this.editorContainer.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }
    /**
     * @description Handles all keyboard interaction with the main editor window
     * @param {KeyboardEvent} event The KeyboardEvent passed to the event handler.
     */
    async editorKeyBoardHandler(event) {
        if (!event || !event.target)
            return;
        const targetElement = event.target;
        const modifierKeyPressed = event.metaKey || event.altKey || event.ctrlKey;
        if ((event.keyCode >= 37 && event.keyCode <= 40 /*Arrows*/)
            || ((event.keyCode === 35 /*End*/ || event.keyCode === 36 /*Home*/) && !event.ctrlKey)) {
            this.navigateByKey(event.keyCode, targetElement, event.shiftKey);
            event.preventDefault();
        }
        else if (!modifierKeyPressed && targetElement.classList.contains("hex")) {
            await this.editHandler.editHex(targetElement, event.key);
            // If this cell has been edited
            if (targetElement.innerText.trimRight().length == 2 && targetElement.classList.contains("editing")) {
                targetElement.classList.remove("editing");
                this.navigateByKey(39, targetElement, false);
            }
        }
        else if (!modifierKeyPressed && event.key.length === 1 && targetElement.classList.contains("ascii")) {
            await this.editHandler.editAscii(targetElement, event.key);
            targetElement.classList.remove("editing");
            this.navigateByKey(39, targetElement, false);
        }
        await this.editHandler.completePendingEdits();
    }
    /**
     * @description Handles keyboard iteration with the window
     * @param {KeyboardEvent} event The KeyboardEvent passed to the event handler.
     */
    windowKeyboardHandler(event) {
        if (!event || !event.target)
            return;
        if ((event.metaKey || event.ctrlKey) && event.key === "f") {
            // If the user presses ctrl / cmd + f we focus the search box and change the dropdown
            this.searchHandler.searchKeybindingHandler();
        }
        else if ((event.keyCode == 36 || event.keyCode == 35) && event.ctrlKey) {
            // If the user pressed CTRL + Home or CTRL + End we scroll the whole document
            event.keyCode == 36 ? this.scrollBarHandler.scrollToTop() : this.scrollBarHandler.scrollToBottom();
        }
        else if (event.keyCode == 33) {
            // PG Up
            this.scrollBarHandler.page(this.viewPortHeight, "up");
        }
        else if (event.keyCode == 34) {
            // PG Down
            this.scrollBarHandler.page(this.viewPortHeight, "down");
        }
    }
    /**
     * @description Handles when the user uses the arrow keys, Home or End to navigate the editor
     * @param {number} keyCode The keyCode of the key pressed
     * @param {HTMLElement} targetElement The element
     * @param {boolean} isRangeSelection If we are selecting a range (shift key pressed)
     */
    navigateByKey(keyCode, targetElement, isRangeSelection) {
        var _a, _b, _c, _d;
        let next;
        switch (keyCode) {
            case 35:
                // If the user presses End we go to the end of the line
                const parentChildren = targetElement.parentElement.children;
                next = parentChildren[parentChildren.length - 1];
                break;
            case 36:
                // If the user presses Home we go to the front of the line
                next = targetElement.parentElement.children[0];
                break;
            case 37:
                // left
                next = (targetElement.previousElementSibling || ((_b = (_a = targetElement.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling) === null || _b === void 0 ? void 0 : _b.children[15]));
                break;
            case 38:
                // up
                const elements_above = util_1.getElementsWithGivenOffset(util_1.getElementsOffset(targetElement) - 16);
                if (elements_above.length === 0)
                    break;
                next = targetElement.classList.contains("hex") ? elements_above[0] : elements_above[1];
                break;
            case 39:
                // right
                next = (targetElement.nextElementSibling || ((_d = (_c = targetElement.parentElement) === null || _c === void 0 ? void 0 : _c.nextElementSibling) === null || _d === void 0 ? void 0 : _d.children[0]));
                break;
            case 40:
                // down
                const elements_below = util_1.getElementsWithGivenOffset(Math.min(util_1.getElementsOffset(targetElement) + 16, this.fileSize - 1));
                if (elements_below.length === 0)
                    break;
                next = targetElement.classList.contains("hex") ? elements_below[0] : elements_below[1];
                break;
        }
        if (next && next.tagName === "SPAN") {
            const nextRect = next.getBoundingClientRect();
            if (this.viewPortHeight <= nextRect.bottom) {
                this.scrollBarHandler.scrollDocument(1, "down");
            }
            else if (nextRect.top <= 0) {
                this.scrollBarHandler.scrollDocument(1, "up");
            }
            const offset = util_1.getElementsOffset(next);
            this.selectHandler.setFocused(offset);
            const startSelection = this.selectHandler.getSelectionStart();
            if (isRangeSelection && startSelection !== undefined) {
                const min = Math.min(startSelection, offset);
                const max = Math.max(startSelection, offset);
                this.selectHandler.setSelected(util_1.createOffsetRange(min, max), startSelection);
            }
            else {
                this.selectHandler.setSelected([offset], offset);
                this.updateInspector();
            }
            next.focus({ preventScroll: true });
        }
    }
    /***
     * @description Populates the inspector data with the currently focused element.
     */
    updateInspector() {
        const offset = this.selectHandler.getFocused();
        if (offset !== undefined) {
            const elements = util_1.getElementsWithGivenOffset(offset);
            const byte_obj = util_1.retrieveSelectedByteObject(elements);
            const littleEndian = document.getElementById("endianness").value === "little";
            dataInspector_1.populateDataInspector(byte_obj, littleEndian);
        }
    }
    /***
     * @description Given an array of offsets, selects the corresponding elements.
     * @param {number[]} offsets The offsets of the elements you want to select
     */
    setSelection(offsets) {
        this.selectHandler.setSelected(offsets, offsets.length > 0 ? offsets[0] : undefined);
    }
    /***
     * @description Given an offset, selects the elements and focuses the element in the same column as previous focus. Defaults to hex.
     * @param {number} offset The offset of the elements you want to select and focus
     */
    focusElementWithGivenOffset(offset) {
        var _a, _b, _c, _d;
        const elements = util_1.getElementsWithGivenOffset(offset);
        if (elements.length != 2)
            return;
        this.selectHandler.setSelected([offset], offset);
        // If an ascii element is currently focused then we focus that, else we focus hex
        if ((_d = (_c = (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.classList.contains("right")) {
            elements[1].focus();
        }
        else {
            elements[0].focus();
        }
    }
    /**
     * @description Undoes the given edits from the document
     * @param {EditMessage[]} edits The edits that will be undone
     * @param {number} fileSize The size of the file, the ext host tracks this and passes it back
     */
    undo(edits, fileSize) {
        this.fileSize = fileSize;
        this.editHandler.undo(edits);
    }
    /**
     * @description Redoes the given edits from the document
     * @param {EditMessage[]} edits The edits that will be redone
     * @param {number} fileSize The size of the file, the ext host tracks this and passes it backedone
     */
    redo(edits, fileSize) {
        this.editHandler.redo(edits);
        this.fileSize = fileSize;
    }
    /**
     * @description Called when the user executes revert
     */
    revert(fileSize) {
        this.fileSize = fileSize;
        this.editHandler.revert();
    }
    /**
     * @description Creates an add cell (the little plus placeholder) and places it at the end of the document
     */
    createAddCell() {
        var _a, _b;
        // Don't make more more add cells until there are none left on the DOM
        if (document.getElementsByClassName("add-cell").length !== 0)
            return;
        // This will start a new row
        const packet = {
            offset: this.fileSize,
            data: new byteData_1.ByteData(0)
        };
        if (this.fileSize % 16 === 0) {
            this.render([packet]);
            // If it's a new chunk we want the chunkhandler to track it
            if (this.fileSize % hexEdit_1.chunkHandler.chunkSize === 0) {
                hexEdit_1.chunkHandler.addChunk(this.fileSize);
            }
            this.scrollBarHandler.updateScrollBar(this.fileSize / 16);
        }
        else {
            const hex_element = this.createHexElement(packet);
            const ascii_element = this.createAsciiElement(packet);
            const elements = util_1.getElementsWithGivenOffset(this.fileSize - 1);
            (_a = elements[0].parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(hex_element);
            (_b = elements[1].parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(ascii_element);
        }
    }
    /**
     * @description Removes the last cell from the virtual document
     */
    removeLastCell() {
        var _a, _b, _c;
        // We can use the add cell as the last cell offset since a plus cell should always be the last cell
        const plusCellOffset = util_1.getElementsOffset(document.getElementsByClassName("add-cell")[0]);
        if (isNaN(plusCellOffset))
            return;
        const lastCells = util_1.getElementsWithGivenOffset(plusCellOffset);
        const secondToLastCells = util_1.getElementsWithGivenOffset(plusCellOffset - 1);
        // If the last cell was on its own row we remove the new row
        if (plusCellOffset % 16 === 0) {
            (_a = this.rows[0].get(plusCellOffset.toString())) === null || _a === void 0 ? void 0 : _a.remove();
            this.rows[0].delete(plusCellOffset.toString());
            (_b = this.rows[1].get(plusCellOffset.toString())) === null || _b === void 0 ? void 0 : _b.remove();
            this.rows[1].delete(plusCellOffset.toString());
            (_c = this.rows[2].get(plusCellOffset.toString())) === null || _c === void 0 ? void 0 : _c.remove();
            this.rows[2].delete(plusCellOffset.toString());
            this.scrollBarHandler.updateScrollBar((plusCellOffset - 1) / 16);
        }
        else {
            lastCells[0].remove();
            lastCells[1].remove();
        }
        secondToLastCells[0].innerText = "+";
        secondToLastCells[0].classList.add("add-cell");
        secondToLastCells[0].classList.remove("nongraphic");
        secondToLastCells[0].classList.remove("edited");
        secondToLastCells[1].innerText = "+";
        secondToLastCells[1].classList.remove("nongraphic");
        secondToLastCells[1].classList.add("add-cell");
        secondToLastCells[1].classList.remove("edited");
    }
    /**
     * @description Simple getter for the fileSize
     * @returns {number} The fileSize
     */
    get documentSize() { return this.fileSize; }
    /**
     * @description Updates the file size so its in sync with ext host
     * @param {number} newSize The new filesize
     */
    updateDocumentSize(newSize) {
        this.fileSize = newSize;
    }
    /**
     * @description Re-requests all the chunks on the DOM for rendering. This is needed for revert
     */
    async reRequestChunks() {
        var _a, _b, _c;
        // If we don't do Array.from it will still reference the original set causing it to infinitely request and delete the chunks
        const allChunks = Array.from(hexEdit_1.chunkHandler.allChunks);
        for (const chunk of allChunks) {
            // Remove all the chunks from the DOM
            for (let i = chunk; i < chunk + hexEdit_1.chunkHandler.chunkSize; i += 16) {
                (_a = this.rows[0].get(i.toString())) === null || _a === void 0 ? void 0 : _a.remove();
                this.rows[0].delete(i.toString());
                (_b = this.rows[1].get(i.toString())) === null || _b === void 0 ? void 0 : _b.remove();
                this.rows[1].delete(i.toString());
                (_c = this.rows[2].get(i.toString())) === null || _c === void 0 ? void 0 : _c.remove();
                this.rows[2].delete(i.toString());
            }
            hexEdit_1.chunkHandler.removeChunk(chunk);
            await hexEdit_1.chunkHandler.requestMoreChunks(chunk);
        }
    }
    /**
     * @description Scrolls to the given offset if it's outside the viewport
     * @param offset The offset to scroll to
     * @param force Whether or not you should scroll even if it's in the viewport
     */
    async scrollDocumentToOffset(offset, force) {
        return this.scrollBarHandler.scrollToOffset(offset, force);
    }
}
exports.VirtualDocument = VirtualDocument;


/***/ }),

/***/ "./media/webviewStateManager.ts":
/*!**************************************!*\
  !*** ./media/webviewStateManager.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebViewStateManager = void 0;
const hexEdit_1 = __webpack_require__(/*! ./hexEdit */ "./media/hexEdit.ts");
/**
 * Simple static class which handles setting and clearing the webviews state
 * We use this over the default .setState as it implements a setState which doesn't override the entire object just the given property
 */
class WebViewStateManager {
    /**
     * @description Given a property and a value either updates or adds it to the state
     * @param {string} propertyName The name of the property
     * @param {any} propertyValue The value to store for the property
     */
    static setProperty(propertyName, propertyValue) {
        let currentState = WebViewStateManager.getState();
        if (currentState === undefined) {
            currentState = {};
        }
        currentState[propertyName] = propertyValue;
        hexEdit_1.vscode.setState(currentState);
    }
    /***
     * @description Clears the state object
     */
    static clearState() {
        hexEdit_1.vscode.setState();
    }
    /**
     * @description Retrieves the state object
     */
    static getState() {
        return typeof hexEdit_1.vscode.getState() === "string" ? JSON.parse(hexEdit_1.vscode.getState()) : hexEdit_1.vscode.getState();
    }
    /**
     * @description Retrieves a property on the state object
     * @param {string} propertyName The name of the property to retrieve the value of
     */
    static getProperty(propertyName) {
        const state = WebViewStateManager.getState();
        return state[propertyName];
    }
}
exports.WebViewStateManager = WebViewStateManager;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvYnl0ZURhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvY2h1bmtIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL21lZGlhL2RhdGFJbnNwZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvZWRpdEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvZXZlbnRIYW5kbGVycy50cyIsIndlYnBhY2s6Ly8vLi9tZWRpYS9oZXhFZGl0LnRzIiwid2VicGFjazovLy8uL21lZGlhL21lc3NhZ2VIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL21lZGlhL3NlYXJjaEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvc2VsZWN0SGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9tZWRpYS9zcm9sbEJhckhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvdXRpbC50cyIsIndlYnBhY2s6Ly8vLi9tZWRpYS92aXJ0dWFsRG9jdW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvd2Vidmlld1N0YXRlTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIs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QUNiLGdCQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLE9BQU8sZ0JBQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JHLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQW9CO1FBQ25DLE1BQU0sS0FBSyxHQUFJLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlDLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDSjtBQXRDRCxrREFzQ0MiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9tZWRpYS9oZXhFZGl0LnRzXCIpO1xuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbmV4cG9ydCBjbGFzcyBCeXRlRGF0YSB7XG4gICAgcHJpdmF0ZSBkZWNpbWFsOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBhZGphY2VudEJ5dGVzOiBCeXRlRGF0YVtdO1xuXG5cdC8qKlxuXHQgKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhIEJ5dGVEYXRhIG9iamVjdCB3aGljaCBhY3RzIGFzIHRoZSBkYXRhbGF5ZXIgZm9yIGEgc2luZ2xlIGhleCB2YWx1ZVxuXHQgKiBAcGFyYW0gdWludDhudW0gVGhlIDhiaXQgbnVtYmVyIGZyb20gdGhlIGZpbGUgdG8gYmUgcmVwcmVzZW50ZWRcblx0ICovXG5cdGNvbnN0cnVjdG9yKHVpbnQ4bnVtOiBudW1iZXIpIHtcblx0XHR0aGlzLmRlY2ltYWwgPSB1aW50OG51bTtcblx0XHR0aGlzLmFkamFjZW50Qnl0ZXMgPSBbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZGVzY3JpcHRpb24gQWRkcyBhIGdpdmVuIEJ5dGVEYXRhIG9iamVjdCBhcyBhZGphbmNlbnQgdG8gdGhlIGN1cnJlbnQgb25lICh1dGlsaXplZCBmb3IgaGlnaGVyIHRoYW4gOGJpdCBjYWxjdWxhdGlvbnMpIFxuXHQgKiBAcGFyYW0ge0J5dGVEYXRhfSBieXRlX29iaiBUaGUgQnl0ZURhdGEgb2J2amVjdCB0byBhZGQgdG8gdGhlIGFycmF5XG5cdCAqL1xuXHRhZGRBZGphY2VudEJ5dGUoYnl0ZV9vYmo6IEJ5dGVEYXRhKTogdm9pZCB7XG5cdFx0dGhpcy5hZGphY2VudEJ5dGVzLnB1c2goYnl0ZV9vYmopO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIHRoZSBoZXggcmVwcmVzZW50YXRpb24gb2YgdGhlIEJ5dGVEYXRhIG9iamVjdFxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgQnl0ZURhdGEgcmVwcmVzZW50ZWQgYXMgYSBoZXggc3RyaW5nXG5cdCAqL1xuXHR0b0hleCgpOiBzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLmRlY2ltYWwudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdH1cblxuXHQvKipcblx0ICogQGRlc2NyaXB0aW9uIFJldHVybnMgdGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgQnl0ZURhdGEgb2JqZWN0XG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBCeXRlRGF0YSByZXByZXNlbnRlZCBhIGJpbmFyeSBzdHJpbmdcblx0ICovXG5cdHRvQmluYXJ5KCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIChcIjAwMDAwMDAwXCIrIHRoaXMuZGVjaW1hbC50b1N0cmluZygyKSkuc2xpY2UoLTgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIHRoZSA4Yml0IHVuc2lnbmVkIGludCByZXByZXNlbnRhdGlvbiBvZiB0aGUgQnl0ZURhdGEgb2JqZWN0XG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSA4IGJpdCB1bnNpZ25lZCBpbnRcblx0ICovXG5cdHRvOGJpdFVJbnQoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5kZWNpbWFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBkZXNjcmlwdGlvbiBDb252ZXJ0cyB0aGUgYnl0ZSBkYXRhIHRvIGEgdXRmLTggY2hhcmFjdGVyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gbGl0dGxlRW5kaWFuIFdoZXRoZXIgb3Igbm90IGl0J3MgcmVwcmVzZW50ZWQgaW4gbGl0dGxlIGVuZGlhblxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdXRmLTggY2hhcmFjdGVyXG5cdCAqL1xuXHR0b1VURjgobGl0dGxlRW5kaWFuOiBib29sZWFuKTogc3RyaW5nIHtcblx0XHRsZXQgdWludDhEYXRhID0gW3RoaXMudG84Yml0VUludCgpXTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDMgJiYgaSA8IHRoaXMuYWRqYWNlbnRCeXRlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dWludDhEYXRhLnB1c2godGhpcy5hZGphY2VudEJ5dGVzW2ldLnRvOGJpdFVJbnQoKSk7XG5cdFx0fVxuXHRcdGlmICghbGl0dGxlRW5kaWFuKSB7XG5cdFx0XHR1aW50OERhdGEgPSB1aW50OERhdGEucmV2ZXJzZSgpO1xuXHRcdH1cblx0XHRjb25zdCB1dGY4ID0gbmV3IFRleHREZWNvZGVyKFwidXRmLThcIikuZGVjb2RlKG5ldyBVaW50OEFycmF5KHVpbnQ4RGF0YSkpO1xuXHRcdC8vIFdlIGl0ZXJhdGUgdGhyb3VnaCB0aGUgc3RyaW5nIGFuZCBpbW1lZGlhdGVseSByZXV0cm4gdGhlIGZpcnN0IGNoYXJhY3RlclxuXHRcdGZvciAoY29uc3QgY2hhciBvZiB1dGY4KSByZXR1cm4gY2hhcjtcblx0XHRyZXR1cm4gdXRmODtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZGVzY3JpcHRpb24gQ29udmVydHMgdGhlIGJ5dGUgZGF0YSB0byBhIHV0Zi0xNiBjaGFyYWN0ZXJcblx0ICogQHBhcmFtIHtib29sZWFufSBsaXR0bGVFbmRpYW4gV2hldGhlciBvciBub3QgaXQncyByZXByZXNlbnRlZCBpbiBsaXR0bGUgZW5kaWFuXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB1dGYtMTYgY2hhcmFjdGVyXG5cdCAqL1xuXHR0b1VURjE2KGxpdHRsZUVuZGlhbjogYm9vbGVhbik6IHN0cmluZyB7XG5cdFx0bGV0IHVpbnQ4RGF0YSA9IFt0aGlzLnRvOGJpdFVJbnQoKV07XG5cdFx0aWYgKHRoaXMuYWRqYWNlbnRCeXRlcy5sZW5ndGggPT09IDApIHJldHVybiBcIkVuZCBvZiBGaWxlXCI7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCAzICYmIGkgPCB0aGlzLmFkamFjZW50Qnl0ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHVpbnQ4RGF0YS5wdXNoKHRoaXMuYWRqYWNlbnRCeXRlc1tpXS50bzhiaXRVSW50KCkpO1xuXHRcdH1cblx0XHRpZiAoIWxpdHRsZUVuZGlhbikge1xuXHRcdFx0dWludDhEYXRhID0gdWludDhEYXRhLnJldmVyc2UoKTtcblx0XHR9XG5cdFx0Y29uc3QgdXRmMTYgPSBuZXcgVGV4dERlY29kZXIoXCJ1dGYtMTZcIikuZGVjb2RlKG5ldyBVaW50OEFycmF5KHVpbnQ4RGF0YSkpO1xuXHRcdC8vIFdlIGl0ZXJhdGUgdGhyb3VnaCB0aGUgc3RyaW5nIGFuZCBpbW1lZGlhdGVseSByZXV0cm4gdGhlIGZpcnN0IGNoYXJhY3RlclxuXHRcdGZvciAoY29uc3QgY2hhciBvZiB1dGYxNikgcmV0dXJuIGNoYXI7XG5cdFx0cmV0dXJuIHV0ZjE2O1xuXHR9XG5cblx0LyoqXG5cdCAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIGNvbnZlcnRpbmcgdGhlIEJ5dGVEYXRhIG9iamVjdCBpbnRvIG1hbnkgb2YgdGhlIHVuc2lnbmVkIGFuZCBzaWduZWQgaW50ZWdlciBmb3JtYXRzXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBudW1CaXRzIFRoZSBudW1iZXJzIG9mIGJpdHMgeW91IHdhbnQgcmVwcmVzZW50ZWQsIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA4IGFuZCA8PSA2NFxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNpZ25lZCBXaGV0aGVyIHlvdSB3YW50IHRoZSByZXR1cm5lZCByZXByZXNlbnRhdGlvbiB0byBiZSBzaWduZWQgb3IgdW5zaWduZWRcblx0ICogQHBhcmFtIHtib29sZWFufSBsaXR0bGVFbmRpYW4gVHJ1ZSBpZiB5b3Ugd2FudCBpdCByZXByZXNlbnRlZCBpbiBsaXR0bGUgZW5kaWFuLCBmYWxzZSBpZiBiaWcgZW5kaWFuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZmxvYXQgSWYgeW91IHBhc3MgaW4gMzIgb3IgNjQgYXMgbnVtQml0cyBkbyB5b3Ugd2FudCB0aGVtIHRvIGJlIGZsb2F0MzIgb3IgZmxvYXQ2NCwgZGVmYXVsdHMgdG8gZmFsc2Vcblx0ICogQHJldHVybnMge251bWJlciB8IGJpZ2ludH0gVGhlIG5ldyByZXByZXNlbnRhdGlvblxuXHQgKi9cblx0Ynl0ZUNvbnZlcnRlcihudW1CaXRzOiBudW1iZXIsIHNpZ25lZDogYm9vbGVhbiwgbGl0dGxlRW5kaWFuOiBib29sZWFuLCBmbG9hdCA9IGZhbHNlKTogbnVtYmVyIHwgYmlnaW50IHtcblx0XHRpZiAobnVtQml0cyAlIDggIT0gMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yIChcIkJpdHMgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDghXCIpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5hZGphY2VudEJ5dGVzLmxlbmd0aCA8IChudW1CaXRzIC8gOCkgLSAxKSByZXR1cm4gTmFOO1xuXHRcdGNvbnN0IGJ5dGVzID0gW107XG5cdFx0Ynl0ZXMucHVzaCh0aGlzLnRvOGJpdFVJbnQoKSk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCAobnVtQml0cyAvIDgpIC0gMTsgaSsrKSB7XG5cdFx0XHRieXRlcy5wdXNoKHRoaXMuYWRqYWNlbnRCeXRlc1tpXS50bzhiaXRVSW50KCkpO1xuXHRcdH1cblx0XHRjb25zdCB1aW50OGJ5dGVzID0gVWludDhBcnJheS5mcm9tKGJ5dGVzKTtcblx0XHRjb25zdCBkYXRhdmlldyA9IG5ldyBEYXRhVmlldyh1aW50OGJ5dGVzLmJ1ZmZlcik7XG5cdFx0aWYgKG51bUJpdHMgPT0gNjQgJiYgZmxvYXQpIHtcblx0XHRcdHJldHVybiBkYXRhdmlldy5nZXRGbG9hdDY0KDAsIGxpdHRsZUVuZGlhbik7XG5cdFx0fSBlbHNlIGlmIChudW1CaXRzID09IDY0ICYmIHNpZ25lZCkge1xuXHRcdFx0cmV0dXJuIGRhdGF2aWV3LmdldEJpZ0ludDY0KDAsIGxpdHRsZUVuZGlhbik7XG5cdFx0fSBlbHNlIGlmIChudW1CaXRzID09IDY0ICYmICFzaWduZWQpIHtcblx0XHRcdHJldHVybiBkYXRhdmlldy5nZXRCaWdVaW50NjQoMCwgbGl0dGxlRW5kaWFuKTtcblx0XHR9IGVsc2UgaWYgKG51bUJpdHMgPT0gMzIgJiYgZmxvYXQpIHtcblx0XHRcdHJldHVybiBkYXRhdmlldy5nZXRGbG9hdDMyKDAsIGxpdHRsZUVuZGlhbik7XG5cdFx0fSBlbHNlIGlmIChudW1CaXRzID09IDMyICYmIHNpZ25lZCkge1xuXHRcdFx0cmV0dXJuIGRhdGF2aWV3LmdldEludDMyKDAsIGxpdHRsZUVuZGlhbik7XG5cdFx0fSBlbHNlIGlmIChudW1CaXRzID09IDMyICYmICFzaWduZWQpIHtcblx0XHRcdHJldHVybiBkYXRhdmlldy5nZXRVaW50MzIoMCwgbGl0dGxlRW5kaWFuKTtcbiAgICAgICAgLy8gMjQgYml0IGlzbid0IHN1cHBvcnRlZCBieSBkZWZhdWx0IHNvIHdlIG11c3QgYWRkIGl0XG4gICAgICAgIC8vIEl0J3Mgc2FmZSB0byBjYXN0IGhlcmUgYXMgdGhlIG9ubHkgbnVtYml0cyB0aGF0IHByb2R1Y2VzIGEgYmlnIGludCBpcyA2NC5cblx0XHR9IGVsc2UgaWYgKG51bUJpdHMgPT0gMjQgJiYgc2lnbmVkKSB7XG5cdFx0XHRjb25zdCBmaXJzdDggPSAodGhpcy5hZGphY2VudEJ5dGVzWzFdLmJ5dGVDb252ZXJ0ZXIoOCwgc2lnbmVkLCBsaXR0bGVFbmRpYW4pIGFzIG51bWJlcikgPDwgMTY7XG5cdFx0XHRyZXR1cm4gZmlyc3Q4IHwgdGhpcy5ieXRlQ29udmVydGVyKDE2LCBzaWduZWQsIGxpdHRsZUVuZGlhbikgYXMgbnVtYmVyO1xuXHRcdH0gZWxzZSBpZiAobnVtQml0cyA9PSAyNCAmJiAhc2lnbmVkKSB7XG5cdFx0XHRjb25zdCBmaXJzdDggPSAodGhpcy5hZGphY2VudEJ5dGVzWzFdLmJ5dGVDb252ZXJ0ZXIoOCwgc2lnbmVkLCBsaXR0bGVFbmRpYW4pIGFzIG51bWJlciAmIDB4RkYpIDw8IDE2O1xuXHRcdFx0cmV0dXJuIGZpcnN0OCB8IHRoaXMuYnl0ZUNvbnZlcnRlcigxNiwgc2lnbmVkLCBsaXR0bGVFbmRpYW4pIGFzIG51bWJlcjtcblx0XHR9IGVsc2UgaWYgKG51bUJpdHMgPT0gMTYgJiYgc2lnbmVkKSB7XG5cdFx0XHRyZXR1cm4gZGF0YXZpZXcuZ2V0SW50MTYoMCwgbGl0dGxlRW5kaWFuKTtcblx0XHR9IGVsc2UgaWYgKG51bUJpdHMgPT0gMTYgJiYgIXNpZ25lZCkge1xuXHRcdFx0cmV0dXJuIGRhdGF2aWV3LmdldFVpbnQxNigwLCBsaXR0bGVFbmRpYW4pO1xuXHRcdH0gZWxzZSBpZiAobnVtQml0cyA9PSA4ICYmIHNpZ25lZCkge1xuXHRcdFx0cmV0dXJuIGRhdGF2aWV3LmdldEludDgoMCk7XG5cdFx0fSBlbHNlIGlmIChudW1CaXRzID09IDggJiYgIXNpZ25lZCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGVjaW1hbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTmFOO1xuXHR9XG59IiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbmltcG9ydCB7IHZpcnR1YWxIZXhEb2N1bWVudCwgbWVzc2FnZUhhbmRsZXIgfSBmcm9tIFwiLi9oZXhFZGl0XCI7XG5pbXBvcnQgeyBWaXJ0dWFsaXplZFBhY2tldCB9IGZyb20gXCIuL3ZpcnR1YWxEb2N1bWVudFwiO1xuaW1wb3J0IHsgQnl0ZURhdGEgfSBmcm9tIFwiLi9ieXRlRGF0YVwiO1xuaW1wb3J0IHsgRWRpdE1lc3NhZ2UgfSBmcm9tIFwiLi9lZGl0SGFuZGxlclwiO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBCdWZmZXJPcHRpb25zIHR5cGUgdXNlZCB0byBkZXNjcmliZSBob3cgbWFueSBjaHVua3MgYXJlIHdhbnRlZCBhYm92ZSBhbmQgYmVsb3cgYSBnaXZlbiBjaHVuayBcbiAqL1xuZXhwb3J0IHR5cGUgQnVmZmVyT3B0aW9ucyA9ICB7XG4gICAgdG9wQnVmZmVyU2l6ZTogbnVtYmVyO1xuICAgIGJvdHRvbUJ1ZmZlclNpemU6IG51bWJlcjtcbn1cbi8qKlxuICogQGRlc2NyaXB0aW9uIEEgY2h1bmtoYW5kbGVyIHdoaWNoIGhvbGRzIHRoZSBjaHVua3MgYW5kIGhhbmRsZXMgcmVxdWVzdGluZyBuZXcgb25lc1xuICovXG5leHBvcnQgY2xhc3MgQ2h1bmtIYW5kbGVyIHtcbiAgICBwcml2YXRlIGNodW5rczogU2V0PG51bWJlcj47XG4gICAgcHJpdmF0ZSBfY2h1bmtTaXplOiBudW1iZXJcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ29uc3RydWN0cyBhIGNodW5rIGhhbmRsZXIgd2hpY2ggaGFuZGxlcyBjaHVua3Mgb2Ygc2l6ZSBjaHVua1NpemVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2h1bmtTaXplIFRoZSBzaXplIG9mIHRoZSBjaHVua3Mgd2hpY2ggdGhlIGNodW5raGFuZGxlciBob2xkc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChjaHVua1NpemU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmNodW5rcyA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICAgICAgICB0aGlzLl9jaHVua1NpemUgPSBjaHVua1NpemU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFJldHVybnMgdGhlIHNpemUgb2YgYSBjaHVuayBpbiB0aGUgY2h1bmsgaGFuZGxlclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBzaXplIG9mIGEgY2h1bmtcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGNodW5rU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2h1bmtTaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBXaGV0aGVyIG9yIG5vdCBhIGNodW5rIGhvbGRpbmcgdGhlIG9mZnNldCBpcyBiZWluZyB0cmFja2VkIGJ5IHRoZSBjaHVua2hhbmRsZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgdG8gY2hlY2sgYWdhaW5zdFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB3aGV0aGVyIG9yIG5vdCBhIGNodW5rIGNvbnRhaW5pbmcgdGhhdCBvZmZzZXQgaXMgYmVpbmcgdHJhY2tlZFxuICAgICAqL1xuICAgIHB1YmxpYyBoYXNDaHVuayhvZmZzZXQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBjaHVua1N0YXJ0ID0gdGhpcy5yZXRyaWV2ZUNodW5rU3RhcnQob2Zmc2V0KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2h1bmtzLmhhcyhjaHVua1N0YXJ0KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFNlbmRzIGEgcmVxdWVzdCB0byB0aGUgZXh0ZW5zaW9uIGZvciB0aGUgcGFja2V0cyB3aGljaCB3b3VsZCBtYWtlIHVwIHRoZSByZXF1ZXN0ZWQgY2h1bmtzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNodW5rU3RhcnQgVGhlIHN0YXJ0IG9mIHRoZSBjaHVuayB3aGljaCB5b3UncmUgcmVxdWVzdGluZ1xuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyByZXF1ZXN0TW9yZUNodW5rcyhjaHVua1N0YXJ0OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gSWYgdGhlIGNodW5rIHN0YXJ0IGlzIGFib3ZlIHRoZSBkb2N1bWVudCBzaXplIHdlIGtub3cgaXQgd2lsbCBub3QgZ2l2ZSB1cyBhbnl0aGluZyBiYWNrIHNvIHdlIGRvbid0IGRvIGFueXRoaW5nXG4gICAgICAgIGlmIChjaHVua1N0YXJ0ID49IHZpcnR1YWxIZXhEb2N1bWVudC5kb2N1bWVudFNpemUgJiYgY2h1bmtTdGFydCAhPT0gMCkgcmV0dXJuO1xuICAgICAgICAvLyBSZXF1ZXN0cyB0aGUgY2h1bmtzIGZyb20gdGhlIGV4dGVuc2lvblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IG1lc3NhZ2VIYW5kbGVyLnBvc3RNZXNzYWdlV2l0aFJlc3BvbnNlKFwicGFja2V0XCIsIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsT2Zmc2V0OiBjaHVua1N0YXJ0LFxuICAgICAgICAgICAgICAgIG51bUVsZW1lbnRzOiB0aGlzLmNodW5rU2l6ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NDaHVua3MocmVxdWVzdC5vZmZzZXQsIHJlcXVlc3QuZGF0YSwgcmVxdWVzdC5lZGl0cywgcmVxdWVzdC5maWxlU2l6ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEdpdmVuIGFuIG9mZnNldCB0ZWxscyB5b3Ugd2hpY2ggb2Zmc2V0IGJlZ2lucyBpdCBjaHVua3NcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgd2hpY2ggeW91IHdhbnQgdG8ga25vdyB0aGUgY2h1bmsgc3RhcnQgb2ZcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgY2h1bmsgc3RhcnQgb2YgdGhlIHByb3ZpZGVkIG9mZnNldFxuICAgICAqL1xuICAgIHB1YmxpYyByZXRyaWV2ZUNodW5rU3RhcnQob2Zmc2V0OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihvZmZzZXQgLyB0aGlzLmNodW5rU2l6ZSkgKiB0aGlzLmNodW5rU2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ2FsbGVkIGJ5IHRoZSB2aXJ0dWFsRG9jdW1lbnQgdG8gZW5zdXJlIHRoZXJlIGlzIGJ1ZmZlclNpemUgY2h1bmtzIGFib3ZlIGFuZCBiZWxvdyB0aGUgb2Zmc2V0IHByb3ZpZGVkXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBUaGUgb2Zmc2V0IGdpdmVuIHRvIGNoZWNrIHRoZSBidWZmZXIgYXJvdW5kXG4gICAgICogQHBhcmFtIHtCdWZmZXJPcHRpb25zfSBidWZmZXJPcHRzIFRoZSBvcHRpb25zIGRlc2NyaWJpbmcgaG93IG1hbnkgY2h1bmtzIGFib3ZlIGFuZCBiZWxvdyB0aGUgZ2l2ZW4gb2Zmc2V0IHlvdSB3YW50XG4gICAgICogQHJldHVybnMge1Byb21pc2U8e3JlbW92ZWQ6IG51bWJlcltdOyByZXF1ZXN0ZWQ6IFByb21pc2U8dm9pZFtdPn0+fSBBIHByb21pc2Ugd2l0aCBhbiBhcnJheSBvZiByZW1vdmVkIGNodW5rIHN0YXJ0cyBhbmQgYSBwcm9taXNlIHdoaWNoIGlzIGF3YWl0aW5nIHRoZSByZXF1ZXN0ZWQgY2h1bmtzXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGVuc3VyZUJ1ZmZlcihvZmZzZXQ6IG51bWJlciwgYnVmZmVyT3B0czogQnVmZmVyT3B0aW9ucyk6IFByb21pc2U8e3JlbW92ZWQ6IG51bWJlcltdOyByZXF1ZXN0ZWQ6IFByb21pc2U8dm9pZFtdPn0+IHtcbiAgICAgICAgY29uc3QgY2h1bmtzVG9SZXF1ZXN0OiBTZXQ8bnVtYmVyPiA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICAgICAgICBjb25zdCBjaHVua1N0YXJ0ID0gdGhpcy5yZXRyaWV2ZUNodW5rU3RhcnQob2Zmc2V0KTtcblxuICAgICAgICAvLyBJZiBpdCBkb2Vzbid0IGhhdmUgZXZlbiB0aGUgc3RhcnRpbmcgY2h1bmsgaXQgbWVhbnMgd2UgbXVzdCBoYXZlIHNjcm9sbGVkIGZhciBvdXRzaWRlIHRoZSB2aWV3cG9ydCBhbmQgd2lsbCBuZWVkIHRvIHJlcXVldCBzdGFydGluZyBjaHVua1xuICAgICAgICAvLyBXZSBjYW4gYWRkIHRoaXMgZXZlcnl0aW1lIHNpbmNlIHdlIGNvbXB1dGUgYSBzZXQgZGlmZmVyZW5jZSBsYXRlciBpdCB3aWxsIGJlIHJlbW92ZWRcbiAgICAgICAgY2h1bmtzVG9SZXF1ZXN0LmFkZChjaHVua1N0YXJ0KTtcbiAgICAgICAgLy8gR2V0IHRoZSBvZmZzZXRzIG9mIHRoZSBjaHVua3MgdGhhdCB3b3VsZCBtYWtlIHVwIHRoZSBidWZmZXJzXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGJ1ZmZlck9wdHMudG9wQnVmZmVyU2l6ZTsgaSsrICkge1xuICAgICAgICAgICAgY2h1bmtzVG9SZXF1ZXN0LmFkZChNYXRoLm1heCgwLCBjaHVua1N0YXJ0IC0gKGkgKiB0aGlzLmNodW5rU2l6ZSkpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBidWZmZXJPcHRzLmJvdHRvbUJ1ZmZlclNpemU7IGkrKyApIHtcbiAgICAgICAgICAgIGNodW5rc1RvUmVxdWVzdC5hZGQoY2h1bmtTdGFydCArIChpICogdGhpcy5jaHVua1NpemUpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXZSBkb24ndCByZXF1ZXN0IGNodW5rcyB3ZSBhbHJlYWR5IGhhdmUgc28gd2UgZmlsdGVyIHRoZW0gb3V0IGhlcmVcbiAgICAgICAgY29uc3QgY2h1bmtzVG9SZXF1ZXN0QXJyOiBudW1iZXJbXSA9IFsuLi5jaHVua3NUb1JlcXVlc3RdLmZpbHRlcih4ID0+ICF0aGlzLmNodW5rcy5oYXMoeCkpO1xuICAgICAgICAvL0lmIGl0J3MgaW5zaWRlIHRoZSBidWZmZXIgKHdoaWNoIHRoZSBjaHVua3NUb1JlcXVlc3Qgc2V0IGhvbGRzKSB0aGVuIHdlIGtlZXAgaXQsIGVsc2UgaXQncyBkZWxldGVkXG4gICAgICAgIGNvbnN0IGNodW5rc091dHNpZGVCdWZmZXI6IG51bWJlcltdID0gWy4uLnRoaXMuY2h1bmtzXS5maWx0ZXIoeCA9PiAhY2h1bmtzVG9SZXF1ZXN0Lmhhcyh4KSk7XG4gICAgICAgIFxuICAgICAgICAvLyBXZSBzdG9wIHRyYWNraW5nIHRoZSBvbGQgY2h1bmtzIGFuZCB3ZSByZXF1ZXN0IHRoZSBuZXcgb25lc1xuICAgICAgICBjaHVua3NPdXRzaWRlQnVmZmVyLmZvckVhY2goY2h1bmsgPT4gdGhpcy5yZW1vdmVDaHVuayhjaHVuaykpO1xuICAgICAgICBjb25zdCByZXF1ZXN0ZWQ6IFByb21pc2U8dm9pZD5bXSA9IFtdO1xuICAgICAgICBjaHVua3NUb1JlcXVlc3RBcnIuZm9yRWFjaChjaHVua09mZnNldCA9PiByZXF1ZXN0ZWQucHVzaCh0aGlzLnJlcXVlc3RNb3JlQ2h1bmtzKGNodW5rT2Zmc2V0KSkpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgICByZW1vdmVkOiBjaHVua3NPdXRzaWRlQnVmZmVyLFxuICAgICAgICAgICAgcmVxdWVzdGVkOiBQcm9taXNlLmFsbChyZXF1ZXN0ZWQpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgdGhlIGluY29taW5nIGNodW5rcyBmcm9tIHRoZSBleHRlbnNpb24gKHRoaXMgZ2V0cyBjYWxsZWQgYnkgdGhlIG1lc3NhZ2UgaGFuZGxlcilcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgd2hpY2ggd2FzIHJlcXVlc3RkXG4gICAgICogQHBhcmFtIHtVaW50OEFycmF5fSBkYXRhIFRoZSBkYXRhIHdoaWNoIHdhcyByZXR1cm5lZCBiYWNrXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZpbGVTaXplIFRoZSBzaXplIG9mIHRoZSBmaWxlLCB0aGlzIGlzIHBhc3NlZCBiYWNrIGZyb20gdGhlIGV4dGhvc3QgYW5kIGhlbHBzIHRvIGVuc3VyZSB0aGUgd2VidmlldyBhbmQgZXh0aG9zdCBzaXplcyBhcmUgc3luY2VkXG4gICAgICovXG4gICAgcHVibGljIHByb2Nlc3NDaHVua3Mob2Zmc2V0OiBudW1iZXIsIGRhdGE6IFVpbnQ4QXJyYXksIGVkaXRzOiBFZGl0TWVzc2FnZVtdLCBmaWxlU2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhY2tldHM6IFZpcnR1YWxpemVkUGFja2V0W10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBJZiBpdCdzIGEgY2h1bmsgYm91bmRhcnkgd2Ugd2FudCB0byBtYWtlIHN1cmUgd2UncmUgdHJhY2tpbmcgdGhhdCBjaHVua1xuICAgICAgICAgICAgaWYgKChpICsgb2Zmc2V0ICkgJSB0aGlzLmNodW5rU2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2h1bmsoaSArIG9mZnNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWNrZXRzLnB1c2goe1xuICAgICAgICAgICAgICAgIG9mZnNldDogaSArIG9mZnNldCxcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgQnl0ZURhdGEoZGF0YVtpXSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gQXQgdGhlIHZlcnkgZW5kIHdlIHdhbnQgdGhlIHBsdXMgY2VsbCwgc28gd2UgYWRkIGEgZHVtbXkgcGFja2V0IHRoYXQgaXMgZ3JlYXRlciB0aGFuIHRoZSBmaWxlc2l6ZVxuICAgICAgICAgICAgaWYgKGkgKyBvZmZzZXQgKyAxID09PSB2aXJ0dWFsSGV4RG9jdW1lbnQuZG9jdW1lbnRTaXplKSB7XG4gICAgICAgICAgICAgICAgcGFja2V0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBpICsgb2Zmc2V0ICsgMSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEJ5dGVEYXRhKDApXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgaXQncyBhbiBlbXB0eSBmaWxlIHdlIGp1c3Qgc2VuZCBvdmVyIHRoZSBkdW1teSBwYWNrZXQgZm9yIHRoZSBwbHVzIGNlbGxcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwICYmIGZpbGVTaXplID09PSAwKSB7XG4gICAgICAgICAgICBwYWNrZXRzLnB1c2goe1xuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgQnl0ZURhdGEoMClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZpcnR1YWxIZXhEb2N1bWVudC5yZW5kZXIocGFja2V0cyk7XG4gICAgICAgIHZpcnR1YWxIZXhEb2N1bWVudC5yZWRvKGVkaXRzLCBmaWxlU2l6ZSk7XG4gICAgfVxuICAgICBcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQWRkcyBhIGNodW5rIHdpdGggdGhlIGdpdmVuIGNodW5rIG9mZnNldCB0byB0aGUgaGFuZGxlclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgVGhlIG9mZnNldCB3aGljaCBob2xkcyB0aGUgY2h1bmsgc3RhcnQgXG4gICAgICovXG4gICAgcHVibGljIGFkZENodW5rKG9mZnNldDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2h1bmtzLmFkZChvZmZzZXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBEZWxldGVzIGEgY2h1bmsgd2l0aCB0aGUgZ2l2ZW4gY2h1bmsgb2Zmc2V0IHRvIHRoZSBoYW5kbGVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBUaGUgb2Zmc2V0IHdoaWNoIGhvbGRzIHRoZSBjaHVuayBzdGFydCBcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlQ2h1bmsob2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaHVua3MuZGVsZXRlKG9mZnNldCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEdldHRlciBmb3IgYWxsIHRoZSBjaHVua3MgaW4gdGhlIGNodW5rIGhhbmRsZXJcbiAgICAgKiBAcmV0dXJucyB7U2V0PG51bWVyPn0gdGhlIHN0YXJ0aW5nIG9mZnNldHMgb2YgYWxsIHRoZSBjaHVua3MgYmVpbmcgdHJhY2tlZFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgYWxsQ2h1bmtzKCk6IFNldDxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2h1bmtzO1xuICAgIH1cbn0iLCIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuaW1wb3J0IHsgQnl0ZURhdGEgfSBmcm9tIFwiLi9ieXRlRGF0YVwiO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBDbGVhcnMgdGhlIGRhdGEgc3BlY3RvciBiYWNrIHRvIGl0cyBkZWZhdWx0IHN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckRhdGFJbnNwZWN0b3IoKTogdm9pZCB7XG4gICAgLy8gVGhpcyBmdW5jdGlvbiBvbmx5IGdldHMgY2FsbGVkIHdoZW4gdGhlc2UgZWxlbWVudHMgZXhpc3Qgc28gdGhlc2UgY2FzdHMgYXJlIHNhZmVcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmluYXJ5OFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IFwiXCI7XG5cdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJpbmFyeThcIikgYXMgSFRNTElucHV0RWxlbWVudCkuZGlzYWJsZWQgPSB0cnVlO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHRcdGNvbnN0IG51bUJpdHMgPSAoaSArIDEpICogODtcblx0XHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGludCR7bnVtQml0c31gKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5kaXNhYmxlZCA9IHRydWU7XG5cdFx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpbnQke251bUJpdHN9YCkgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBcIlwiO1xuXHRcdFxuXHRcdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdWludCR7bnVtQml0c31gKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5kaXNhYmxlZCA9IHRydWU7XG5cdFx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB1aW50JHtudW1CaXRzfWApIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gXCJcIjtcblx0fVxuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnQ2NFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IFwiXCI7XG5cdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImludDY0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmRpc2FibGVkID0gdHJ1ZTtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidWludDY0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gXCJcIjtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidWludDY0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmRpc2FibGVkID0gdHJ1ZTtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXRmOFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IFwiXCI7XG5cdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInV0ZjhcIikgYXMgSFRNTElucHV0RWxlbWVudCkuZGlzYWJsZWQgPSB0cnVlO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1dGYxNlwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IFwiXCI7XG5cdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInV0ZjE2XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmRpc2FibGVkID0gdHJ1ZTtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmxvYXQzMlwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IFwiXCI7XG5cdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsb2F0MzJcIikgYXMgSFRNTElucHV0RWxlbWVudCkuZGlzYWJsZWQgPSB0cnVlO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbG9hdDY0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gXCJcIjtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmxvYXQ2NFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5kaXNhYmxlZCA9IHRydWU7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIEdpdmluZyBhIEJ5dGVEYXRhIG9iamVjdCBhbmQgd2hhdCBlbmRpYW5uZXNzLCBwb3B1bGF0ZXMgdGhlIGRhdGEgaW5zcGVjdG9yXG4gKiBAcGFyYW0ge0J5dGVEYXRhfSBieXRlX29iaiBUaGUgQnl0ZURhdGEgb2JqZWN0IHRvIHJlcHJlc2VudCBvbiB0aGUgZGF0YSBpbnNwZWN0b3JcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbGl0dGxlRW5kaWFuIFdldGhlciB0aGUgZGF0YSBpbnNwZWN0b3IgaXMgaW4gbGl0dGxlRW5kaWFuIG9yIGJpZ0VuZGlhbiBtb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZURhdGFJbnNwZWN0b3IoYnl0ZV9vYmo6IEJ5dGVEYXRhLCBsaXR0bGVFbmRpYW46IGJvb2xlYW4pOiB2b2lkIHtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmluYXJ5OFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IGJ5dGVfb2JqLnRvQmluYXJ5KCk7XG5cdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJpbmFyeThcIikgYXMgSFRNTElucHV0RWxlbWVudCkuZGlzYWJsZWQgPSBmYWxzZTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0XHRjb25zdCBudW1CaXRzID0gKGkgKyAxKSAqIDg7XG5cdFx0Y29uc3Qgc2lnbmVkID0gYnl0ZV9vYmouYnl0ZUNvbnZlcnRlcihudW1CaXRzLCB0cnVlLCBsaXR0bGVFbmRpYW4pO1xuXHRcdGNvbnN0IHVuc2lnbmVkID0gYnl0ZV9vYmouYnl0ZUNvbnZlcnRlcihudW1CaXRzLCBmYWxzZSwgbGl0dGxlRW5kaWFuKTtcblx0XG5cdFx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpbnQke251bUJpdHN9YCkgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBpc05hTihOdW1iZXIoc2lnbmVkKSkgPyBcIkVuZCBvZiBGaWxlXCIgOiBzaWduZWQudG9TdHJpbmcoKTtcblx0XHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGludCR7bnVtQml0c31gKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdWludCR7bnVtQml0c31gKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IGlzTmFOKE51bWJlcih1bnNpZ25lZCkpID8gXCJFbmQgb2YgRmlsZVwiIDogdW5zaWduZWQudG9TdHJpbmcoKTtcblx0XHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHVpbnQke251bUJpdHN9YCkgYXMgSFRNTElucHV0RWxlbWVudCkuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRpZiAobnVtQml0cyA9PT0gMzIpIHtcblx0XHRcdC8vIFRoZSBib29sZWFuIGZvciBzaWduZWQgZG9lc24ndCBtYXR0ZXIgZm9yIGZsb2F0cyBzbyB0aGlzIGNvdWxkIGFsc28gYmUgMzIsIGZhbHNlLCBsaXR0bGVFbmRpYW4sIHRydWVcblx0XHRcdGNvbnN0IGZsb2F0MzIgPSBieXRlX29iai5ieXRlQ29udmVydGVyKDMyLCB0cnVlLCBsaXR0bGVFbmRpYW4sIHRydWUpO1xuXHRcdFx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmxvYXQzMlwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IGlzTmFOKE51bWJlcihmbG9hdDMyKSkgPyBcIkVuZCBvZiBGaWxlXCIgOiBmbG9hdDMyLnRvU3RyaW5nKCk7XG5cdFx0XHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbG9hdDMyXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdGNvbnN0IHNpZ25lZDY0ID0gYnl0ZV9vYmouYnl0ZUNvbnZlcnRlcig2NCwgdHJ1ZSwgbGl0dGxlRW5kaWFuKTtcblx0Y29uc3QgdW5zaWduZWQ2NCA9IGJ5dGVfb2JqLmJ5dGVDb252ZXJ0ZXIoNjQsIGZhbHNlLCBsaXR0bGVFbmRpYW4pO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnQ2NFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IGlzTmFOKE51bWJlcihzaWduZWQ2NCkpID8gXCJFbmQgb2YgRmlsZVwiIDogc2lnbmVkNjQudG9TdHJpbmcoKTtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW50NjRcIikgYXMgSFRNTElucHV0RWxlbWVudCkuZGlzYWJsZWQgPSBmYWxzZTtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidWludDY0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gaXNOYU4oTnVtYmVyKHVuc2lnbmVkNjQpKSA/IFwiRW5kIG9mIEZpbGVcIiA6IHVuc2lnbmVkNjQudG9TdHJpbmcoKTtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidWludDY0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmRpc2FibGVkID0gZmFsc2U7XG5cdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInV0ZjhcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBieXRlX29iai50b1VURjgobGl0dGxlRW5kaWFuKTtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXRmOFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5kaXNhYmxlZCA9IGZhbHNlO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1dGYxNlwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IGJ5dGVfb2JqLnRvVVRGMTYobGl0dGxlRW5kaWFuKTtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXRmMTZcIikgYXMgSFRNTElucHV0RWxlbWVudCkuZGlzYWJsZWQgPSBmYWxzZTtcblx0Y29uc3QgZmxvYXQ2NCA9IGJ5dGVfb2JqLmJ5dGVDb252ZXJ0ZXIoNjQsIHRydWUsIGxpdHRsZUVuZGlhbiwgdHJ1ZSk7XG5cdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsb2F0NjRcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBpc05hTihOdW1iZXIoZmxvYXQ2NCkpID8gXCJFbmQgb2YgRmlsZVwiIDogZmxvYXQ2NC50b1N0cmluZygpO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbG9hdDY0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmRpc2FibGVkID0gZmFsc2U7XG59IiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbmltcG9ydCB7IGdldEVsZW1lbnRzV2l0aEdpdmVuT2Zmc2V0LCB1cGRhdGVBc2NpaVZhbHVlLCBnZXRFbGVtZW50c09mZnNldCB9IGZyb20gXCIuL3V0aWxcIjtcbmltcG9ydCB7IEJ5dGVEYXRhIH0gZnJvbSBcIi4vYnl0ZURhdGFcIjtcbmltcG9ydCB7IG1lc3NhZ2VIYW5kbGVyLCB2aXJ0dWFsSGV4RG9jdW1lbnQgfSBmcm9tIFwiLi9oZXhFZGl0XCI7XG5pbXBvcnQgeyBTZWxlY3RIYW5kbGVyIH0gZnJvbSBcIi4vc2VsZWN0SGFuZGxlclwiO1xuXG5pbnRlcmZhY2UgRG9jdW1lbnRFZGl0IHtcbiAgICBvZmZzZXQ6IG51bWJlcjtcbiAgICBwcmV2aW91c1ZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgbmV3VmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBlbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQgfCB1bmRlZmluZWQ7XG59XG5cbi8vIFRoaXMgaXMgd2hhdCBhbiBlZGl0IHRvL2Zyb20gdGhlIGV4dGVuc2lvbiBob3N0IGxvb2tzIGxpa2VcbmV4cG9ydCBpbnRlcmZhY2UgRWRpdE1lc3NhZ2Uge1xuICAgIHJlYWRvbmx5IG9sZFZhbHVlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgcmVhZG9ubHkgbmV3VmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICByZWFkb25seSBvZmZzZXQ6IG51bWJlcjtcbiAgICByZWFkb25seSBzYW1lT25EaXNrOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBDbGFzcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgZWRpdHMgd2l0aGluIHRoZSB2aXJ0dWFsIGRvY3VtZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBFZGl0SGFuZGxlciB7XG4gICAgcHJpdmF0ZSBwZW5kaW5nRWRpdDogRG9jdW1lbnRFZGl0IHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucGVuZGluZ0VkaXQgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgd2hlbiBhIHVzZXIgc3RhcnRzIHR5cGluZyBvbiBhIGhleCBlbGVtZW50XG4gICAgICogQHBhcmFtIHtIVE1MU3BhbkVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgd2hpY2ggdGhlIGtleXByZXNzIHdhcyBmaXJlZCBvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlQcmVzc2VkIFRoZSBrZXkgd2hpY2ggd2FzIHByZXNzZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZWRpdEhleChlbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQsIGtleVByZXNzZWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAvLyBJZiB0aGUgdXNlciBwcmVzc2VzIGVzY2FwZSBhbmQgdGhlcmUgaXMgYSBjdXJyZW50IGVkaXQgdGhlbiB3ZSBqdXN0IHJldmVydCB0aGUgY2VsbCBhcyBpZiBubyBlZGl0IGhhcyBoYXBwZW5lZFxuICAgICAgICBpZiAoa2V5UHJlc3NlZCA9PT0gXCJFc2NhcGVcIiAmJiB0aGlzLnBlbmRpbmdFZGl0ICYmIHRoaXMucGVuZGluZ0VkaXQucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSB0aGlzLnBlbmRpbmdFZGl0LnByZXZpb3VzVmFsdWU7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJlZGl0aW5nXCIpO1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nRWRpdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBpdCdzIG5vdCBhIHZhbGlkIGhleCBpbnB1dCBvciBkZWxldGUgd2UgaWdub3JlIGl0XG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgvXlthLWZBLUYwLTldJC9nbSk7XG4gICAgICAgIGlmIChrZXlQcmVzc2VkLm1hdGNoKHJlZ2V4KSA9PT0gbnVsbCAmJiBrZXlQcmVzc2VkICE9PSBcIkRlbGV0ZVwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvZmZzZXQ6IG51bWJlciA9IGdldEVsZW1lbnRzT2Zmc2V0KGVsZW1lbnQpO1xuICAgICAgICBpZiAoIXRoaXMucGVuZGluZ0VkaXQgfHwgdGhpcy5wZW5kaW5nRWRpdC5vZmZzZXQgIT0gb2Zmc2V0KSB7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdFZGl0ID0ge1xuICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0LFxuICAgICAgICAgICAgICAgIHByZXZpb3VzVmFsdWU6IGVsZW1lbnQuaW5uZXJUZXh0ID09PSBcIitcIiA/IHVuZGVmaW5lZCA6IGVsZW1lbnQuaW5uZXJUZXh0LFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZWRpdGluZ1wiKTtcbiAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBlbGVtZW50LmlubmVyVGV4dC50cmltUmlnaHQoKTtcbiAgICAgICAgLy8gV2hlbiB0aGUgdXNlciBoaXRzIGRlbGV0ZVxuICAgICAgICBpZiAoa2V5UHJlc3NlZCA9PT0gXCJEZWxldGVcIikge1xuICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBcIiAgXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGlzIGhhbmRsZXMgd2hlbiB0aGUgdXNlciBwcmVzc2VzIHRoZSBmaXJzdCBjaGFyYWN0ZXIgZXJhc2luZyB0aGUgb2xkIHZhbHVlIHZzIGFkZGluZyB0byB0aGUgY3VycmVudGx5IGVkaXRlZCB2YWx1ZVxuICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBlbGVtZW50LmlubmVyVGV4dC5sZW5ndGggIT09IDEgfHwgZWxlbWVudC5pbm5lclRleHQgPT09IFwiK1wiID8gYCR7a2V5UHJlc3NlZC50b1VwcGVyQ2FzZSgpfSBgIDogZWxlbWVudC5pbm5lclRleHQgKyBrZXlQcmVzc2VkLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBlbmRpbmdFZGl0Lm5ld1ZhbHVlID0gZWxlbWVudC5pbm5lclRleHQ7XG4gICAgICAgIGlmIChlbGVtZW50LmlubmVyVGV4dC50cmltUmlnaHQoKS5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWRkLWNlbGxcIik7XG4gICAgICAgICAgICAvLyBOb3QgcmVhbGx5IGFuIGVkaXQgaWYgbm90aGluZyBjaGFuZ2VkXG4gICAgICAgICAgICBpZiAodGhpcy5wZW5kaW5nRWRpdC5uZXdWYWx1ZSA9PSB0aGlzLnBlbmRpbmdFZGl0LnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdFZGl0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2VuZEVkaXRUb0V4dEhvc3QoW3RoaXMucGVuZGluZ0VkaXRdKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXNjaWkoZWxlbWVudC5pbm5lclRleHQsIG9mZnNldCk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJlZGl0ZWRcIik7XG4gICAgICAgICAgICAvLyBNZWFucyB0aGUgbGFzdCBjZWxsIG9mIHRoZSBkb2N1bWVudCB3YXMgZmlsbGVkIGluIHNvIHdlIGFkZCBhbm90aGVyIHBsYWNlaG9sZGVyIGFmdGVyd2FyZHNcbiAgICAgICAgICAgIGlmICghdGhpcy5wZW5kaW5nRWRpdC5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmlydHVhbEhleERvY3VtZW50LmNyZWF0ZUFkZENlbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0VkaXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB3aGVuIHRoZSB1c2VyIHN0YXJ0cyB0eXBpbmcgb24gYW4gYXNjaWkgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7SFRNTFNwYW5FbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHdoaWNoIHRoZSBrZXlzdHJva2Ugd2FzIGZpcmVkIG9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVByZXNzZWQgVGhlIGtleSB3aGljaCB3YXMgcHJlc3NlZFxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBlZGl0QXNjaWkoZWxlbWVudDogSFRNTFNwYW5FbGVtZW50LCBrZXlQcmVzc2VkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBkbyBhbnl0aGluZyBpZiB0aGUgdXNlciBwcmVzc2VzIGEga2V5IHN1Y2ggYXMgaG9tZSBldGMgd2hpY2ggd2lsbCByZWdpc3RlciBhcyBncmVhdGVyIHRoYW4gMSBjaGFyXG4gICAgICAgIGlmIChrZXlQcmVzc2VkLmxlbmd0aCAhPSAxKSByZXR1cm47XG4gICAgICAgIC8vIE5vIG5lZWQgdG8gY2FsbCBpdCBlZGl0ZWQgaWYgaXQncyB0aGUgc2FtZSB2YWx1ZVxuICAgICAgICBpZiAoZWxlbWVudC5pbm5lclRleHQgPT09IGtleVByZXNzZWQpIHJldHVybjtcbiAgICAgICAgY29uc3Qgb2Zmc2V0OiBudW1iZXIgPSBnZXRFbGVtZW50c09mZnNldChlbGVtZW50KTtcbiAgICAgICAgY29uc3QgaGV4RWxlbWVudCA9IGdldEVsZW1lbnRzV2l0aEdpdmVuT2Zmc2V0KG9mZnNldClbMF07XG4gICAgICAgIC8vIFdlIHN0b3JlIGFsbCBwZW5kaW5nIGVkaXRzIGFzIGhleCBhcyBhc2NpaSBpc24ndCBhbHdheXMgcmVwcmVzZW50YXRpdmUgZHVlIHRvIGNvbnRyb2wgY2hhcmFjdGVyc1xuICAgICAgICB0aGlzLnBlbmRpbmdFZGl0ID0ge1xuICAgICAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgICBwcmV2aW91c1ZhbHVlOiBoZXhFbGVtZW50LmlubmVyVGV4dCA9PT0gXCIrXCIgPyB1bmRlZmluZWQgOiBoZXhFbGVtZW50LmlubmVyVGV4dCxcbiAgICAgICAgICAgIG5ld1ZhbHVlOiBrZXlQcmVzc2VkLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50XG4gICAgICAgIH07XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFkZC1jZWxsXCIpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJlZGl0aW5nXCIpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJlZGl0ZWRcIik7XG4gICAgICAgIHRoaXMudXBkYXRlQXNjaWkodGhpcy5wZW5kaW5nRWRpdC5uZXdWYWx1ZSwgb2Zmc2V0KTtcbiAgICAgICAgdGhpcy51cGRhdGVIZXgoa2V5UHJlc3NlZCwgb2Zmc2V0KTtcbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kRWRpdFRvRXh0SG9zdChbdGhpcy5wZW5kaW5nRWRpdF0pO1xuICAgICAgICAvLyBNZWFucyB0aGUgbGFzdCBjZWxsIG9mIHRoZSBkb2N1bWVudCB3YXMgZmlsbGVkIGluIHNvIHdlIGFkZCBhbm90aGVyIHBsYWNlaG9sZGVyIGFmdGVyd2FyZHNcbiAgICAgICAgaWYgKCF0aGlzLnBlbmRpbmdFZGl0LnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgIHZpcnR1YWxIZXhEb2N1bWVudC5jcmVhdGVBZGRDZWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wZW5kaW5nRWRpdCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gR2l2ZW4gYSBoZXggdmFsdWUgdXBkYXRlcyB0aGUgcmVzcGVjdGl2ZSBhc2NpaSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkfSBoZXhWYWx1ZSBUaGUgaGV4IHZhbHVlIHRvIGNvbnZlcnQgdG8gYXNjaWlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgb2YgdGhlIGFzY2lpIHZhbHVlIHRvIHVwZGF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlQXNjaWkoaGV4VmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCwgb2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gRm9yIG5vdyBpZiBpdCdzIHVuZGVmaW5lZCB3ZSB3aWxsIGp1c3QgaWdub3JlIGl0LCBidXQgdGhpcyB3b3VsZCBiZSB0aGUgZGVsZXRlIGNhc2VcbiAgICAgICAgaWYgKCFoZXhWYWx1ZSkgcmV0dXJuO1xuICAgICAgICAvLyBUaGUgd2F5IHRoZSBET00gaXMgY29uc3RydWN0ZWQgdGhlIGFzY2lpIGVsZW1lbnQgd2lsbCBhbHdheXMgYmUgdGhlIHNlY29uZCBvbmVcbiAgICAgICAgY29uc3QgYXNjaWkgPSBnZXRFbGVtZW50c1dpdGhHaXZlbk9mZnNldChvZmZzZXQpWzFdO1xuICAgICAgICBhc2NpaS5jbGFzc0xpc3QucmVtb3ZlKFwiYWRkLWNlbGxcIik7XG4gICAgICAgIHVwZGF0ZUFzY2lpVmFsdWUobmV3IEJ5dGVEYXRhKHBhcnNlSW50KGhleFZhbHVlLCAxNikpLCBhc2NpaSk7XG4gICAgICAgIGFzY2lpLmNsYXNzTGlzdC5hZGQoXCJlZGl0ZWRcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEdpdmVuIGFuIGFzY2lpIHZhbHVlIHVwZGF0ZXMgdGhlIHJlc3BlY3RpdmUgaGV4IHZhbHVlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFzY2lpVmFsdWUgVGhlIGFzY2lpIHZhbHVlIHRvIGNvbnZlcnQgdG8gaGV4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBUaGUgb2Zmc2V0IG9mIHRoZSBoZXggdmFsdWUgdG8gdXBkYXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVIZXgoYXNjaWlWYWx1ZTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBUaGUgd2F5IHRoZSBET00gaXMgY29uc3RydWN0ZWQgdGhlIGhleCBlbGVtZW50IHdpbGwgYWx3YXlzIGJlIHRoZSBmaXJzdCBvbmVcbiAgICAgICAgY29uc3QgaGV4ID0gZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQob2Zmc2V0KVswXTtcbiAgICAgICAgaGV4LmlubmVyVGV4dCA9IGFzY2lpVmFsdWUuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICAgICAgaGV4LmNsYXNzTGlzdC5yZW1vdmUoXCJhZGQtY2VsbFwiKTtcbiAgICAgICAgaGV4LmNsYXNzTGlzdC5hZGQoXCJlZGl0ZWRcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIENvbXBsZXRlcyB0aGUgY3VycmVudCBlZGl0LCB0aGlzIGlzIHVzZWQgaWYgdGhlIHVzZXIgbmF2aWdhdGVzIG9mZiB0aGUgY2VsbCBhbmQgaXQgd2Fzbid0IGRvbmUgYmVpbmcgZWRpdGVkXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGNvbXBsZXRlUGVuZGluZ0VkaXRzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAodGhpcy5wZW5kaW5nRWRpdCAmJiB0aGlzLnBlbmRpbmdFZGl0LmVsZW1lbnQgJiYgdGhpcy5wZW5kaW5nRWRpdC5uZXdWYWx1ZSkge1xuICAgICAgICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBzdG9wIHRoZSBlZGl0IGlmIGl0IGlzIHNlbGVjdGVkIGFzIHRoYXQgY2FuIG1lYW4gdGhlIHVzZXIgd2lsbCBiZSBtYWtpbmcgZnVydGhlciBlZGl0c1xuICAgICAgICAgICAgaWYgKHRoaXMucGVuZGluZ0VkaXQuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWxlY3RlZFwiKSkgcmV0dXJuO1xuICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSBoZXggdmFsdWUgaGFzIDIgY2hhcmFjdGVycywgaWYgbm90IHdlIGFkZCBhIDAgaW4gZnJvbnRcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0VkaXQubmV3VmFsdWUgPSBcIjAwXCIgKyB0aGlzLnBlbmRpbmdFZGl0Lm5ld1ZhbHVlLnRyaW1SaWdodCgpO1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nRWRpdC5uZXdWYWx1ZSA9IHRoaXMucGVuZGluZ0VkaXQubmV3VmFsdWUuc2xpY2UodGhpcy5wZW5kaW5nRWRpdC5uZXdWYWx1ZS5sZW5ndGggLSAyKTtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0VkaXQuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZWRpdGluZ1wiKTtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0VkaXQuZWxlbWVudC5pbm5lclRleHQgPSB0aGlzLnBlbmRpbmdFZGl0Lm5ld1ZhbHVlO1xuICAgICAgICAgICAgLy8gTm8gZWRpdCByZWFsbHkgaGFwcGVuZWQgc28gd2UgZG9uJ3Qgd2FudCBpdCB0byB1cGRhdGUgdGhlIGV4dCBob3N0XG4gICAgICAgICAgICBpZiAodGhpcy5wZW5kaW5nRWRpdC5uZXdWYWx1ZSA9PT0gdGhpcy5wZW5kaW5nRWRpdC5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVBc2NpaSh0aGlzLnBlbmRpbmdFZGl0Lm5ld1ZhbHVlLCB0aGlzLnBlbmRpbmdFZGl0Lm9mZnNldCk7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdFZGl0LmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImVkaXRlZFwiKTtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0VkaXQuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWRkLWNlbGxcIik7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNlbmRFZGl0VG9FeHRIb3N0KFt0aGlzLnBlbmRpbmdFZGl0XSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGVuZGluZ0VkaXQucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHZpcnR1YWxIZXhEb2N1bWVudC5jcmVhdGVBZGRDZWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdFZGl0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEdpdmVuIGEgbGlzdCBvZiBlZGl0cyBzZW5kcyBpdCB0byB0aGUgZXh0aG9zdCBzbyB0aGF0IHRoZSBleHQgaG9zdCBhbmQgd2VidmlldyBhcmUgaW4gc3luY1xuICAgICAqIEBwYXJhbSB7RG9jdW1lbnRFZGl0fSBlZGl0cyBUaGUgZWRpdHMgdG8gc2VuZCB0byB0aGUgZXh0aG9zdFxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgc2VuZEVkaXRUb0V4dEhvc3QoZWRpdHM6IERvY3VtZW50RWRpdFtdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGV4dEhvc3RNZXNzYWdlOiBFZGl0TWVzc2FnZVtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgZWRpdCBvZiBlZGl0cykge1xuICAgICAgICAgICAgLy8gVGhlIGV4dCBob3N0IG9ubHkgYWNjZXB0cyA4Yml0IHVuc2lnbmVkIGludHMsIHNvIHdlIG11c3QgY29udmVydCB0aGUgZWRpdHMgYmFjayBpbnRvIHRoYXQgcmVwcmVzZW50YXRpb25cbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gZWRpdC5wcmV2aW91c1ZhbHVlID8gcGFyc2VJbnQoZWRpdC5wcmV2aW91c1ZhbHVlLCAxNikgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGVkaXQubmV3VmFsdWUgPyBwYXJzZUludChlZGl0Lm5ld1ZhbHVlLCAxNikgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IGVkaXQub2Zmc2V0LFxuICAgICAgICAgICAgICAgIG9sZFZhbHVlLFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlLFxuICAgICAgICAgICAgICAgIHNhbWVPbkRpc2s6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXh0SG9zdE1lc3NhZ2UucHVzaChjdXJyZW50TWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHN5bmNlZEZpbGVTaXplID0gKGF3YWl0IG1lc3NhZ2VIYW5kbGVyLnBvc3RNZXNzYWdlV2l0aFJlc3BvbnNlKFwiZWRpdFwiLCBleHRIb3N0TWVzc2FnZSkpLmZpbGVTaXplO1xuICAgICAgICAgICAgdmlydHVhbEhleERvY3VtZW50LnVwZGF0ZURvY3VtZW50U2l6ZShzeW5jZWRGaWxlU2l6ZSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgLy8gRW1wdHkgY2F0Y2ggYmVjYXVzZSB3ZSBqdXN0IGRvbid0IGRvIGFueXRoaW5nIGlmIGZvciBzb21lIHJlYXNvbiB0aGUgZXh0aG9zdCBkb2Vzbid0IHJlc3BvbmQgd2l0aCB0aGUgbmV3IGZpbGVTaXplLFxuICAgICAgICAgICAgLy8gd2UganVzdCBzeW5jIGF0IHRoZSBuZXh0IGF2YWlsYWJsZSBvcHBvcnR1bml0eVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEdpdmVuIGEgbGlzdCBvZiBlZGl0cyB1bmRvZXMgdGhlbSBmcm9tIHRoZSBkb2N1bWVudFxuICAgICAqIEBwYXJhbSB7RWRpdE1lc3NhZ2VbXX0gZWRpdHMgVGhlIGxpc3Qgb2YgZWRpdHMgdG8gdW5kb1xuICAgICAqL1xuICAgIHB1YmxpYyB1bmRvKGVkaXRzOiBFZGl0TWVzc2FnZVtdKTogdm9pZCB7XG4gICAgICAgIC8vIFdlIHdhbnQgdG8gcHJvY2VzcyB0aGUgaGlnaGVzdCBvZmZzZXQgZmlyc3QgYXMgd2Ugb25seSBzdXBwb3J0IHJlbW92aW5nIGNlbGxzIGZyb20gdGhlIGVuZCBvZiB0aGUgZG9jdW1lbnRcbiAgICAgICAgLy8gU28gaWYgd2UgbmVlZCB0byByZW1vdmUgMyBjZWxscyB3ZSBjYW4ndCByZW1vdmUgdGhlbSBpbiBhcmJpdHJhcnkgb3JkZXIgaXQgbmVlZHMgdG8gYmUgb3V0ZXJtb3N0IGNlbGwgZmlyc3RcbiAgICAgICAgaWYgKGVkaXRzLmxlbmd0aCA+IDEgJiYgZWRpdHNbMF0ub2Zmc2V0IDwgZWRpdHNbZWRpdHMubGVuZ3RoIC0gMV0ub2Zmc2V0KSB7XG4gICAgICAgICAgICBlZGl0cyA9IGVkaXRzLnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGVkaXQgb2YgZWRpdHMpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdGhlIGRlbGV0ZSBjYXNlXG4gICAgICAgICAgICBpZiAoZWRpdC5vbGRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmlydHVhbEhleERvY3VtZW50LmZvY3VzRWxlbWVudFdpdGhHaXZlbk9mZnNldCh2aXJ0dWFsSGV4RG9jdW1lbnQuZG9jdW1lbnRTaXplKTtcbiAgICAgICAgICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQucmVtb3ZlTGFzdENlbGwoKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQoZWRpdC5vZmZzZXQpO1xuICAgICAgICAgICAgLy8gV2UncmUgZXhlY3V0aW5nIGFuIHVuZG8gYW5kIHRoZSBlbGVtZW50cyBhcmVuJ3Qgb24gdGhlIERPTSBzbyB0aGVyZSdzIG5vIHBvaW50IGluIGRvaW5nIGFueXRoaW5nXG4gICAgICAgICAgICBpZiAoZWxlbWVudHMubGVuZ3RoICE9IDIpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChlZGl0LnNhbWVPbkRpc2spIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50c1swXS5jbGFzc0xpc3QucmVtb3ZlKFwiZWRpdGVkXCIpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzWzFdLmNsYXNzTGlzdC5yZW1vdmUoXCJlZGl0ZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzWzBdLmNsYXNzTGlzdC5hZGQoXCJlZGl0ZWRcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNbMV0uY2xhc3NMaXN0LmFkZChcImVkaXRlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsZW1lbnRzWzBdLmlubmVyVGV4dCA9IGVkaXQub2xkVmFsdWUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBlbGVtZW50c1swXS5pbm5lclRleHQgPSBlbGVtZW50c1swXS5pbm5lclRleHQubGVuZ3RoID09IDIgPyBlbGVtZW50c1swXS5pbm5lclRleHQgOiBgMCR7ZWxlbWVudHNbMF0uaW5uZXJUZXh0fWA7XG4gICAgICAgICAgICB1cGRhdGVBc2NpaVZhbHVlKG5ldyBCeXRlRGF0YShlZGl0Lm9sZFZhbHVlKSwgZWxlbWVudHNbMV0pO1xuICAgICAgICAgICAgdmlydHVhbEhleERvY3VtZW50LmZvY3VzRWxlbWVudFdpdGhHaXZlbk9mZnNldChlZGl0Lm9mZnNldCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gR2l2ZW4gYSBsaXN0IG9mIGVkaXRzIHJlYXBwbGllcyB0aGVtIHRvIHRoZSBkb2N1bWVudFxuICAgICAqIEBwYXJhbSB7RWRpdE1lc3NhZ2VbXX0gZWRpdHMgVGhlIGxpc3Qgb2YgZWRpdHMgdG8gcmVkb1xuICAgICAqL1xuICAgIHB1YmxpYyByZWRvKGVkaXRzOiBFZGl0TWVzc2FnZVtdKTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3QgZWRpdCBvZiBlZGl0cykge1xuICAgICAgICAgICAgaWYgKGVkaXQubmV3VmFsdWUgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IGdldEVsZW1lbnRzV2l0aEdpdmVuT2Zmc2V0KGVkaXQub2Zmc2V0KTtcbiAgICAgICAgICAgIC8vIFdlJ3JlIGV4ZWN1dGluZyBhbiByZWRvIGFuZCB0aGUgZWxlbWVudHMgYXJlbid0IG9uIHRoZSBET00gc28gdGhlcmUncyBubyBwb2ludCBpbiBkb2luZyBhbnl0aGluZ1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCAhPSAyKSBjb250aW51ZTtcbiAgICAgICAgICAgIGVsZW1lbnRzWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJhZGQtY2VsbFwiKTtcbiAgICAgICAgICAgIGVsZW1lbnRzWzFdLmNsYXNzTGlzdC5yZW1vdmUoXCJhZGQtY2VsbFwiKTtcbiAgICAgICAgICAgIGlmIChlZGl0LnNhbWVPbkRpc2spIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50c1swXS5jbGFzc0xpc3QucmVtb3ZlKFwiZWRpdGVkXCIpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzWzFdLmNsYXNzTGlzdC5yZW1vdmUoXCJlZGl0ZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzWzBdLmNsYXNzTGlzdC5hZGQoXCJlZGl0ZWRcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNbMV0uY2xhc3NMaXN0LmFkZChcImVkaXRlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsZW1lbnRzWzBdLmlubmVyVGV4dCA9IGVkaXQubmV3VmFsdWUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBlbGVtZW50c1swXS5pbm5lclRleHQgPSBlbGVtZW50c1swXS5pbm5lclRleHQubGVuZ3RoID09IDIgPyBlbGVtZW50c1swXS5pbm5lclRleHQgOiBgMCR7ZWxlbWVudHNbMF0uaW5uZXJUZXh0fWA7XG4gICAgICAgICAgICB1cGRhdGVBc2NpaVZhbHVlKG5ldyBCeXRlRGF0YShlZGl0Lm5ld1ZhbHVlKSwgZWxlbWVudHNbMV0pO1xuICAgICAgICAgICAgLy8gSWYgbm8gYWRkIGNlbGxzIGFyZSBsZWZ0IHdlIG5lZWQgdG8gYWRkIG1vcmUgYXMgdGhpcyBtZWFucyB3ZSBqdXN0IHJlcGxhY2VkIHRoZSBlbmRcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYWRkLWNlbGxcIikubGVuZ3RoID09PSAwICYmIGVkaXQub2xkVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBnb2luZyB0byBlc3RpbWF0ZSB0aGUgZmlsZXNpemUgYW5kIGl0IHdpbGwgYmUgcmVzeW5jZWQgYXQgdGhlIGVuZCBpZiB3cm9uZ1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYmVjYXVzZSB3ZSBhZGQgMSBjZWxsIGF0IGEgdGltZSB0aGVyZWZvcmUgaWYgd2UgcGFzdGUgdGhlIGZpbGVzaXplIGlzIGxhcmdlciB0aGFuIHdoYXRzIHJlbmRlcmVkIGJyZWFraW5nIHRoZSBwbHVzIGNlbGwgbG9naWNcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGNhdXNlcyBpc3N1ZXMgc28gdGhpcyBpcyBhIHF1aWNrIGZpeCwgYW5vdGhlciBmaXggd291bGQgYmUgdG8gYXBwbHkgYWxsIGNlbGxzIGF0IG9uY2VcbiAgICAgICAgICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQudXBkYXRlRG9jdW1lbnRTaXplKHZpcnR1YWxIZXhEb2N1bWVudC5kb2N1bWVudFNpemUgKyAxKTtcbiAgICAgICAgICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQuY3JlYXRlQWRkQ2VsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmlydHVhbEhleERvY3VtZW50LmZvY3VzRWxlbWVudFdpdGhHaXZlbk9mZnNldChlZGl0Lm9mZnNldCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB3aGVuIGEgdXNlciBjb3BpZXNcbiAgICAgKiBAcGFyYW0ge0NsaXBib2FyZEV2ZW50fSBldmVudCBUaGUgY2xpYnBvYXJkIGV2ZW50IHBhc3NlZCB0byBhIGNvcHkgZXZlbnQgaGFuZGxlclxuICAgICAqL1xuICAgIHB1YmxpYyBjb3B5KGV2ZW50OiBDbGlwYm9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5jbGlwYm9hcmREYXRhPy5zZXREYXRhKFwidGV4dC9qc29uXCIsIEpTT04uc3RyaW5naWZ5KFNlbGVjdEhhbmRsZXIuZ2V0U2VsZWN0ZWRIZXgoKSkpO1xuICAgICAgICBldmVudC5jbGlwYm9hcmREYXRhPy5zZXREYXRhKFwidGV4dC9wbGFpblwiLCBTZWxlY3RIYW5kbGVyLmdldFNlbGVjdGVkVmFsdWUoKSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgd2hlbiBhIHVzZXIgcGFzdGVzXG4gICAgICogQHBhcmFtIHtDbGlwYm9hcmRFdmVudH0gZXZlbnQgVGhlIGNsaWJwb2FyZCBldmVudCBwYXNzZWQgdG8gYSBwYXN0ZSBldmVudCBoYW5kbGVyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHBhc3RlKGV2ZW50OiBDbGlwYm9hcmRFdmVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAvLyBJZiB3aGF0J3Mgb24gdGhlIGNsaXBib2FyZCBpc24ndCBqc29uIHdlIHdvbid0IHRyeSB0byBwYXN0IGl0IGluXG4gICAgICAgIGlmICghZXZlbnQuY2xpcGJvYXJkRGF0YSB8fCBldmVudC5jbGlwYm9hcmREYXRhLnR5cGVzLmluZGV4T2YoXCJ0ZXh0L2pzb25cIikgPCAwKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGhleERhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YShcInRleHQvanNvblwiKSk7XG4gICAgICAgIC8vIFdlIGRvIEFycmF5LmZyb20oKSBhcyB0aGlzIG1ha2VzIGl0IHNvIHRoZSBhcnJheSBubyBsb25nZXIgaXMgdGllZCB0byB0aGUgZG9tIHdobydzIHNlbGVjdGlvbiBtYXkgY2hhbmdlIGR1cmluZyB0aGlzIHBhc3RlXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VsZWN0ZWQgaGV4XCIpIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTFNwYW5FbGVtZW50Pik7XG4gICAgICAgIGNvbnN0IGVkaXRzOiBEb2N1bWVudEVkaXRbXSA9IFtdO1xuICAgICAgICAvLyBXZSBhcHBseSBhcyBtdWNoIG9mIHRoZSBoZXggZGF0YSBhcyB3ZSBjYW4gYmFzZWQgb24gdGhlIHNlbGVjdGlvblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkLmxlbmd0aCAmJiBpIDwgaGV4RGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHNlbGVjdGVkW2ldO1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0OiBudW1iZXIgPSBnZXRFbGVtZW50c09mZnNldChlbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRFZGl0OiBEb2N1bWVudEVkaXQgPSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgICAgICAgcHJldmlvdXNWYWx1ZTogZWxlbWVudC5pbm5lclRleHQgPT09IFwiK1wiID8gdW5kZWZpbmVkIDogZWxlbWVudC5pbm5lclRleHQsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IGhleERhdGFbaV0sXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFkZC1jZWxsXCIpO1xuICAgICAgICAgICAgLy8gTm90IHJlYWxseSBhbiBlZGl0IGlmIG5vdGhpbmcgY2hhbmdlZFxuICAgICAgICAgICAgaWYgKGN1cnJlbnRFZGl0Lm5ld1ZhbHVlID09IGN1cnJlbnRFZGl0LnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gaGV4RGF0YVtpXTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXNjaWkoZWxlbWVudC5pbm5lclRleHQsIG9mZnNldCk7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJlZGl0ZWRcIik7XG4gICAgICAgICAgICAvLyBNZWFucyB0aGUgbGFzdCBjZWxsIG9mIHRoZSBkb2N1bWVudCB3YXMgZmlsbGVkIGluIHNvIHdlIGFkZCBhbm90aGVyIHBsYWNlaG9sZGVyIGFmdGVyd2FyZHNcbiAgICAgICAgICAgIGlmIChjdXJyZW50RWRpdC5wcmV2aW91c1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBTaW5jZSB3ZSBkb24ndCBzZW5kIGFsbCB0aGUgZWRpdHMgdW50aWwgdGhlIGVuZCB3ZSBuZWVkIHRvIGVzdGltYXRlIHdoYXQgdGhlIGN1cnJlbnQgZmlsZSBzaXplIGlzIGR1cmluZyB0aGlzIG9wZXJhdGlvbiBvciB0aGUgbGFzdCBjZWxscyB3b24ndCBiZSBhZGRlZCBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQudXBkYXRlRG9jdW1lbnRTaXplKHZpcnR1YWxIZXhEb2N1bWVudC5kb2N1bWVudFNpemUgKyAxKTtcbiAgICAgICAgICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQuY3JlYXRlQWRkQ2VsbCgpO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkLnB1c2goZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQodmlydHVhbEhleERvY3VtZW50LmRvY3VtZW50U2l6ZSlbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWRpdHMucHVzaChjdXJyZW50RWRpdCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kRWRpdFRvRXh0SG9zdChlZGl0cyk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIENhbGxlZCB3aGVuIHRoZSB1c2VyIGV4ZWN1dGVzIHRoZSByZXZlcnQgY29tbWFuZCBvciB3aGVuIHRoZSBkb2N1bWVudCBjaGFuZ2VzIG9uIGRpc2sgYW5kIHRoZXJlIGFyZSBubyB1bnNhdmVkIGVkaXRzXG4gICAgICovXG4gICAgcHVibGljIHJldmVydCgpOiB2b2lkIHtcbiAgICAgICAgdmlydHVhbEhleERvY3VtZW50LnJlUmVxdWVzdENodW5rcygpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG5pbXBvcnQgeyBnZXRFbGVtZW50c0dpdmVuTW91c2VFdmVudCwgZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQsIHJldHJpZXZlU2VsZWN0ZWRCeXRlT2JqZWN0LCBnZXRFbGVtZW50c09mZnNldCB9IGZyb20gXCIuL3V0aWxcIjtcbmltcG9ydCB7IHBvcHVsYXRlRGF0YUluc3BlY3RvciB9IGZyb20gXCIuL2RhdGFJbnNwZWN0b3JcIjtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gVG9nZ2xlcyB0aGUgaG92ZXIgb24gYSBjZWxsXG4gKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IFRoZSBldmVudCB3aGljaCBpcyBoYW5kZWQgdG8gYSBtb3VzZSBldmVudCBsaXN0ZW5lciBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUhvdmVyKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZWxlbWVudHMgPSBnZXRFbGVtZW50c0dpdmVuTW91c2VFdmVudChldmVudCk7XG4gICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXHRlbGVtZW50c1swXS5jbGFzc0xpc3QudG9nZ2xlKFwiaG92ZXJcIik7XG5cdGVsZW1lbnRzWzFdLmNsYXNzTGlzdC50b2dnbGUoXCJob3ZlclwiKTtcbn1cblxuLy8gVGhpcyBpcyBib3VuZCB0byB0aGUgb24gY2hhbmdlIGV2ZW50IGZvciB0aGUgc2VsZWN0IHdoaWNoIGRlY2lkZXMgdG8gcmVuZGVyIGJpZyBvciBsaXR0bGUgZW5kaWFuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHdoZW4gdGhlIHVzZXIgY2hhbmdlcyB0aGUgZHJvcGRvd24gZm9yIHdoZXRoZXIgdGhleSB3YW50IGxpdHRsZSBvciBiaWcgZW5kaWFubmVzcyBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZUVuZGlhbm5lc3MoKTogdm9pZCB7XG5cdGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG5cdFx0Ly8gU2luY2UgdGhlIGluc3BlY3RvciBoYXMgbm8gc2Vuc2Ugb2Ygc3RhdGUsIGl0IGRvZXNuJ3Qga25vdyB3aGF0IGJ5dGUgaXQgaXMgY3VycmVudGx5IHJlbmRlcmluZ1xuXHRcdC8vIFdlIG11c3QgcmV0cmlldmUgaXQgYmFzZWQgb24gdGhlIGRvbVxuXHRcdGNvbnN0IGVsZW1lbnRzID0gZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQoZ2V0RWxlbWVudHNPZmZzZXQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpO1xuXHRcdGNvbnN0IGJ5dGVfb2JqID0gcmV0cmlldmVTZWxlY3RlZEJ5dGVPYmplY3QoZWxlbWVudHMpO1xuXHRcdGlmICghYnl0ZV9vYmopIHJldHVybjtcblx0XHRjb25zdCBsaXR0bGVFbmRpYW4gPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbmRpYW5uZXNzXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID09PSBcImxpdHRsZVwiO1xuXHRcdHBvcHVsYXRlRGF0YUluc3BlY3RvcihieXRlX29iaiwgbGl0dGxlRW5kaWFuKTtcblx0fVxufSIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG5pbXBvcnQgeyBWaXJ0dWFsRG9jdW1lbnQgfSBmcm9tIFwiLi92aXJ0dWFsRG9jdW1lbnRcIjtcbmltcG9ydCB7IENodW5rSGFuZGxlciB9IGZyb20gXCIuL2NodW5rSGFuZGxlclwiO1xuaW1wb3J0IHsgTWVzc2FnZUhhbmRsZXIgfSBmcm9tIFwiLi9tZXNzYWdlSGFuZGxlclwiO1xuXG5kZWNsYXJlIGNvbnN0IGFjcXVpcmVWc0NvZGVBcGk6IGFueTtcbmV4cG9ydCBjb25zdCB2c2NvZGUgPSBhY3F1aXJlVnNDb2RlQXBpKCk7XG5leHBvcnQgbGV0IHZpcnR1YWxIZXhEb2N1bWVudDogVmlydHVhbERvY3VtZW50O1xuLy8gQ29uc3RydWN0IGEgY2h1bmsgaGFuZGxlciB3aGljaCBob2xkcyBjaHVua3Mgb2YgNTAgcm93cyAoNTAgKiAxNilcbmV4cG9ydCBjb25zdCBjaHVua0hhbmRsZXI6IENodW5rSGFuZGxlciA9IG5ldyBDaHVua0hhbmRsZXIoODAwKTtcbi8vIE1lc3NhZ2UgaGFuZGxlciB3aGljaCB3aWxsIGhhbmRsZSB0aGUgbWVzc2FnZXMgYmV0d2VlbiB0aGUgZXh0aG9zdCBhbmQgdGhlIHdlYnZpZXcgKFdlJ2xsIGFsbG93IGEgbWF4IG9mIDEwIHBlbmRpbmcgcmVxdWVzdHMpXG5leHBvcnQgY29uc3QgbWVzc2FnZUhhbmRsZXI6IE1lc3NhZ2VIYW5kbGVyID0gbmV3IE1lc3NhZ2VIYW5kbGVyKDEwKTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gRmlyZXMgd2hlbiB0aGUgdXNlciBjbGlja3MgdGhlIG9wZW5Bbnl3YXkgbGluayBvbiBsYXJnZSBmaWxlc1xuICovXG5mdW5jdGlvbiBvcGVuQW55d2F5KCk6IHZvaWQge1xuXHRtZXNzYWdlSGFuZGxlci5wb3N0TWVzc2FnZShcIm9wZW4tYW55d2F5c1wiKTtcbn1cblxuXG4vLyBTZWxmIGV4ZWN1dGluZyBhbm9ueW1vdXMgZnVuY3Rpb25cbi8vIFRoaXMgaXMgdGhlIG1haW4gZW50cnkgcG9pbnRcbigoKTogdm9pZD0+IHtcbiAgICAvLyBIYW5kbGUgbWVzc2FnZXMgZnJvbSB0aGUgZXh0ZW5zaW9uXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBhc3luYyBlID0+IHtcblx0XHRjb25zdCB7IHR5cGUsIGJvZHkgfSA9IGUuZGF0YTtcblx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdGNhc2UgXCJpbml0XCI6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBMb2FkcyB0aGUgaHRtbCBib2R5IHNlbnQgb3ZlclxuXHRcdFx0XHRcdGlmIChib2R5Lmh0bWwgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdLmlubmVySFRNTCA9IGJvZHkuaHRtbDtcblx0XHRcdFx0XHRcdHZpcnR1YWxIZXhEb2N1bWVudCA9IG5ldyBWaXJ0dWFsRG9jdW1lbnQoYm9keS5maWxlU2l6ZSwgYm9keS5iYXNlQWRkcmVzcyk7XG5cdFx0XHRcdFx0XHQvLyBXZSBpbml0aWFsbHkgbG9hZCA0IGNodW5rcyBiZWxvdyB0aGUgdmlld3BvcnQgKG5vcm1hbGx5IHdlIGJ1ZmZlciAyIGFib3ZlIGFzIHdlbGwsIGJ1dCB0aGVyZSBpcyBubyBhYm92ZSBhdCB0aGUgc3RhcnQpXG5cdFx0XHRcdFx0XHRjaHVua0hhbmRsZXIuZW5zdXJlQnVmZmVyKHZpcnR1YWxIZXhEb2N1bWVudC50b3BPZmZzZXQoKSwge1xuXHRcdFx0XHRcdFx0XHR0b3BCdWZmZXJTaXplOiAwLFxuXHRcdFx0XHRcdFx0XHRib3R0b21CdWZmZXJTaXplOiA1XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGJvZHkuZmlsZVNpemUgIT0gMCAmJiBib2R5Lmh0bWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdLmlubmVySFRNTCA9IFxuXHRcdFx0XHRcdFx0YFxuXHRcdFx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0XHQ8cD5PcGVuaW5nIHRoaXMgbGFyZ2UgZmlsZSBtYXkgY2F1c2UgaW5zdGFiaWxpdHkuIDxhIGlkPVwib3Blbi1hbnl3YXlcIiBocmVmPVwiI1wiPk9wZW4gYW55d2F5czwvYT48L3A+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGNvbnN0cnVjdCB0aGUgZWxlbWVudCByaWdodCBhYm92ZSB0aGlzIHNvIGl0IGlzIGRlZmluaXRlbHkgbmV2ZXIgbnVsbFxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVuLWFueXdheVwiKSEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Bbnl3YXkpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgXCJ1cGRhdGVcIjpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmIChib2R5LnR5cGUgPT09IFwidW5kb1wiKSB7XG5cdFx0XHRcdFx0XHR2aXJ0dWFsSGV4RG9jdW1lbnQudW5kbyhib2R5LmVkaXRzLCBib2R5LmZpbGVTaXplKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGJvZHkudHlwZSA9PT0gXCJyZWRvXCIpIHtcblx0XHRcdFx0XHRcdHZpcnR1YWxIZXhEb2N1bWVudC5yZWRvKGJvZHkuZWRpdHMsIGJvZHkuZmlsZVNpemUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR2aXJ0dWFsSGV4RG9jdW1lbnQucmV2ZXJ0KGJvZHkuZmlsZVNpemUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgXCJzYXZlXCI6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBkaXJ0eUNlbGxzID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZWRpdGVkXCIpKTtcblx0XHRcdFx0XHRkaXJ0eUNlbGxzLm1hcChjZWxsID0+IGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImVkaXRlZFwiKSk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bWVzc2FnZUhhbmRsZXIuaW5jb21pbmdNZXNzYWdlSGFuZGxlcihlLmRhdGEpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0Ly8gU2lnbmFsIHRvIFZTIENvZGUgdGhhdCB0aGUgd2VidmlldyBpcyBpbml0aWFsaXplZC5cblx0bWVzc2FnZUhhbmRsZXIucG9zdE1lc3NhZ2UoXCJyZWFkeVwiKTtcbn0pKCk7XG4iLCIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuaW1wb3J0IHsgdnNjb2RlIH0gZnJvbSBcIi4vaGV4RWRpdFwiO1xuXG4vKipcbiAqIENsYXNzIHdoaWNoIGhhbmRsZXMgbWVzc2FnZXMgYmV0d2VlbiB0aGUgd2VidmlldyBhbmQgdGhlIGV4dGhvc3RcbiAqL1xuZXhwb3J0IGNsYXNzIE1lc3NhZ2VIYW5kbGVyIHtcbiAgICBwcml2YXRlIG1heFJlcXVlc3RzOiBudW1iZXI7XG4gICAgcHJpdmF0ZSByZXF1ZXN0c01hcDogTWFwPG51bWJlciwge3Jlc29sdmU6ICh2YWx1ZT86IGFueSkgPT4gdm9pZDsgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkfT47XG4gICAgcHJpdmF0ZSByZXF1ZXN0SWQ6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhIG5ldyBNZXNzYWdlSGFuZGxlclxuICAgICAqIEBwYXJhbSBtYXhpbXVtUmVxdWVzdHMgVGhlIG1heGltdW0gbnVtYmVyIG9mIHJlcXVlc3RzIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1heGltdW1SZXF1ZXN0czogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubWF4UmVxdWVzdHMgPSBtYXhpbXVtUmVxdWVzdHM7XG4gICAgICAgIHRoaXMucmVxdWVzdHNNYXAgPSBuZXcgTWFwPG51bWJlciwge3Jlc29sdmU6ICh2YWx1ZT86IGFueSkgPT4gdm9pZDsgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkfT4oKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0SWQgPSAwO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUG9zdHMgdG8gdGhlIGV4dGVuc2lvbiBob3N0IGEgbWVzc2FnZSBhbmQgcmV0dXJucyBhIHByb21pc2Ugd2hpY2ggaWYgc3VjY2Vzc2Z1bCB3aWxsIHJlc29sdmUgdG8gdGhlIHJlc3BvbnNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgQSBzdHJpbmcgZGVmaW5pbmcgdGhlIHR5cGUgb2YgbWVzc2FnZSBzbyBpdCBjYW4gYmUgY29ycmVjdGx5IGhhbmRsZWQgb24gYm90aCBlbmRzXG4gICAgICogQHBhcmFtIHthbnl9IGJvZHkgVGhlIHBheWxvYWRcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgdG8gdGhlIHJlc3BvbnNlIG9yIHJlamVjdHMgaWYgdGhlIHJlcXVlc3QgdGltZXMgb3V0XG4gICAgICovXG4gICAgYXN5bmMgcG9zdE1lc3NhZ2VXaXRoUmVzcG9uc2UodHlwZTogc3RyaW5nLCBib2R5PzogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4gdGhpcy5yZXF1ZXN0c01hcC5zZXQodGhpcy5yZXF1ZXN0SWQsIHsgcmVzb2x2ZSwgcmVqZWN0IH0pKTtcbiAgICAgICAgLy8gV2UgcmVtb3ZlIHRoZSBvbGRlc3QgcmVxdWVzdCBpZiB0aGUgY3VycmVudCByZXF1ZXN0IHF1ZXVlIGlzIGZ1bGxcbiAgICAgICAgLy8gVGhpcyBkb2Vzbid0IHN0b3AgdGhlIHJlcXVlc3Qgb24gdGhlIEV4dCBob3N0IHNpZGUsIGJ1dCBpdCB3aWxsIGJlIGRyb3BwZWQgd2hlbiBpdCdzIHJlY2VpdmVkLCB3aGljaCBsZXNzZW5zIHRoZSBsb2FkIG9uIHRoZSB3ZWJ2aWV3XG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RzTWFwLnNpemUgPiB0aGlzLm1heFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBjb25zdCByZW1vdmVkOiBudW1iZXIgPSB0aGlzLnJlcXVlc3RzTWFwLmtleXMoKS5uZXh0KCkudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RzTWFwLmdldChyZW1vdmVkKT8ucmVqZWN0KFwiUmVxdWVzdCBUaW1lZCBvdXRcIik7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RzTWFwLmRlbGV0ZShyZW1vdmVkKTtcbiAgICAgICAgfVxuICAgICAgICB2c2NvZGUucG9zdE1lc3NhZ2UoeyByZXF1ZXN0SWQ6IHRoaXMucmVxdWVzdElkKyssIHR5cGUsIGJvZHkgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUG9zdCB0byB0aGUgZXh0ZW5zaW9uIGhvc3QgYXMgYSBtZXNzYWdlIGluIGEgZmlyZSBhbmQgZm9yZ2V0IG1hbm5lciwgbm90IGV4cGVjdGluZyBhIHJlc3BvbnNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgQSBzdHJpbmcgZGVmaW5pbmcgdGhlIHR5cGUgb2YgbWVzc2FnZSBzbyBpdCBjYW4gYmUgY29ycmVjdGx5IGhhbmRsZWQgb24gYm90aCBlbmRzXG4gICAgICogQHBhcmFtIHthbnl9IGJvZHkgVGhlIHBheWxvYWRcbiAgICAgKi9cbiAgICBwb3N0TWVzc2FnZSh0eXBlOiBzdHJpbmcsIGJvZHk/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdnNjb2RlLnBvc3RNZXNzYWdlKHsgdHlwZSwgYm9keSB9KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEZvciBldmVyeSBpbmNvbWluZyBtZXNzYWdlIHRoYXQgaXNuJ3QgdGhlIGluaXRcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSByZWNlaXZlZFxuICAgICAqL1xuICAgIGluY29taW5nTWVzc2FnZUhhbmRsZXIobWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLnJlcXVlc3RzTWFwLmdldChtZXNzYWdlLnJlcXVlc3RJZCk7XG4gICAgICAgIC8vIFdlIHNob3VsZCBuZXZlciBnZXQgYSByb2d1ZSByZXNwb25zZSBmcm9tIHRoZSB3ZWJ2aWV3IHVubGVzcyBpdCdzIGFuIGluaXQuXG4gICAgICAgIC8vIFNvIGlmIHRoZSBtZXNzYWdlIGlzbid0IGJlaW5nIHRyYWNrZWQgYnkgdGhlIG1lc3NhZ2UgaGFuZGxlciwgd2UgZHJvcCBpdFxuICAgICAgICBpZiAoIXJlcXVlc3QpIHJldHVybjtcbiAgICAgICAgcmVxdWVzdC5yZXNvbHZlKG1lc3NhZ2UuYm9keSk7XG4gICAgICAgIHRoaXMucmVxdWVzdHNNYXAuZGVsZXRlKG1lc3NhZ2UucmVxdWVzdElkKTtcbiAgICB9XG59IiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbmltcG9ydCB7IG1lc3NhZ2VIYW5kbGVyLCB2aXJ0dWFsSGV4RG9jdW1lbnQgfSBmcm9tIFwiLi9oZXhFZGl0XCI7XG5pbXBvcnQgeyBTZWxlY3RIYW5kbGVyIH0gZnJvbSBcIi4vc2VsZWN0SGFuZGxlclwiO1xuaW1wb3J0IHsgaGV4UXVlcnlUb0FycmF5IH0gZnJvbSBcIi4vdXRpbFwiO1xuXG5pbnRlcmZhY2UgU2VhcmNoT3B0aW9ucyB7XG4gICAgcmVnZXg6IGJvb2xlYW47XG4gICAgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIFNlYXJjaFJlc3VsdHMge1xuICAgIHJlc3VsdDogbnVtYmVyW11bXTtcbiAgICBwYXJ0aWFsOiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgU2VhcmNoSGFuZGxlciB7XG4gICAgcHJpdmF0ZSBzZWFyY2hSZXN1bHRzOiBudW1iZXJbXVtdO1xuICAgIHByaXZhdGUgc2VhcmNoVHlwZTogXCJoZXhcIiB8IFwiYXNjaWlcIiA9IFwiaGV4XCI7XG4gICAgcHJpdmF0ZSBzZWFyY2hPcHRpb25zOiBTZWFyY2hPcHRpb25zO1xuICAgIHByaXZhdGUgcmVzdWx0SW5kZXggPSAwO1xuICAgIHByaXZhdGUgZmluZFRleHRCb3g6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSByZXBsYWNlVGV4dEJveDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcml2YXRlIHJlcGxhY2VCdXR0b246IEhUTUxTcGFuRWxlbWVudDtcbiAgICBwcml2YXRlIHJlcGxhY2VBbGxCdXR0b246IEhUTUxTcGFuRWxlbWVudDtcbiAgICBwcml2YXRlIHByZXNlcnZlQ2FzZSA9IGZhbHNlO1xuICAgIHByaXZhdGUgZmluZFByZXZpb3VzQnV0dG9uOiBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBmaW5kTmV4dEJ1dHRvbjogSFRNTFNwYW5FbGVtZW50O1xuICAgIHByaXZhdGUgc3RvcFNlYXJjaEJ1dHRvbjogSFRNTFNwYW5FbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IFtdO1xuICAgICAgICB0aGlzLnNlYXJjaE9wdGlvbnMgPSB7XG4gICAgICAgICAgICByZWdleDogZmFsc2UsXG4gICAgICAgICAgICBjYXNlU2Vuc2l0aXZlOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZpbmRUZXh0Qm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaW5kXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIHRoaXMucmVwbGFjZVRleHRCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlcGxhY2VcIikgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgdGhpcy5yZXBsYWNlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXBsYWNlLWJ0blwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIHRoaXMucmVwbGFjZUFsbEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVwbGFjZS1hbGxcIikgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICB0aGlzLmZpbmRQcmV2aW91c0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmluZC1wcmV2aW91c1wiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZmluZE5leHRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbmQtbmV4dFwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc3RvcFNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLXN0b3BcIikgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICB0aGlzLmZpbmROZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmZpbmROZXh0KHRydWUpKTtcbiAgICAgICAgdGhpcy5maW5kUHJldmlvdXNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuZmluZFByZXZpb3VzKHRydWUpKTtcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dEdseXBocygpO1xuICAgICAgICAvLyBXaGVuZXZlciB0aGUgdXNlciBjaGFuZ2VzIHRoZSBkYXRhIHR5cGUgd2UgdXBkYXRlIHRoZSB0eXBlIHdlJ3JlIHNlYXJjaGluZyBmb3IgYW5kIHRoZSBnbHlwaHMgb24gdGhlIGlucHV0IGJveFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGEtdHlwZVwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MU2VsZWN0RWxlbWVudCkudmFsdWUgYXMgXCJoZXhcIiB8IFwiYXNjaWlcIjtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVHlwZSA9IHNlbGVjdGVkVmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0R2x5cGhzKCk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlYXJjaE9wdGlvbnNIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMucmVwbGFjZU9wdGlvbnNIYW5kbGVyKCk7XG5cbiAgICAgICAgLy8gV2hlbiB0aGUgdXNlciBwcmVzc2VzIGEga2V5IHRyaWdnZXIgYSBzZWFyY2hcbiAgICAgICAgdGhpcy5maW5kVGV4dEJveC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBTb21lIFZTIENvZGUga2V5YmluZGluZyBkZWZ1YWx0cyBmb3IgZmluZCBuZXh0LCBmaW5kIHByZXZpb3VzLCBhbmQgZm9jdXMgcmVzdG9yZVxuICAgICAgICAgICAgaWYgKChldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBldmVudC5rZXkgPT09IFwiRjNcIikgJiYgZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRQcmV2aW91cyhmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiIHx8IGV2ZW50LmtleSA9PT0gXCJGM1wiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maW5kTmV4dChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICAgICAgICAgIC8vIFByZXNzaW5nIGVzY2FwZSByZXR1cm5zIGZvY3VzIHRvIHRoZSBlZGl0b3JcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYHNlbGVjdGVkICR7dGhpcy5zZWFyY2hUeXBlfWApWzBdIGFzIEhUTUxTcGFuRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZpcnR1YWxIZXhEb2N1bWVudC5mb2N1c0VsZW1lbnRXaXRoR2l2ZW5PZmZzZXQodmlydHVhbEhleERvY3VtZW50LnRvcE9mZnNldCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmN0cmxLZXkgfHwgbmV3IFJlZ0V4cChcIiheQXJyb3d8XkVuZHxeSG9tZSlcIiwgXCJpXCIpLnRlc3QoZXZlbnQua2V5KSkge1xuICAgICAgICAgICAgICAgIC8vIElmIGl0J3MgYW55IHNvcnQgb2YgbmF2aWdhdGlvbiBrZXkgd2UgZG9uJ3Qgd2FudCB0byB0cmlnZ2VyIGFub3RoZXIgc2VhcmNoIGFzIG5vdGhpbmcgaGFzIGNoYW5nZWRcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gRmluIHByZXZpb3VzICsgZmluZCBuZXh0IHdoZW4gd2lkZ2V0IGlzbid0IGZvY3VzZWRcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRjNcIiAmJiBldmVudC5zaGlmdEtleSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0aGlzLmZpbmRUZXh0Qm94KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maW5kUHJldmlvdXModHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSBcIkYzXCIgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGhpcy5maW5kVGV4dEJveCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluZE5leHQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yZXBsYWNlVGV4dEJveC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy51cGRhdGVSZXBsYWNlQnV0dG9ucy5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5yZXBsYWNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLnJlcGxhY2UoZmFsc2UpKTtcbiAgICAgICAgdGhpcy5yZXBsYWNlQWxsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLnJlcGxhY2UodHJ1ZSkpO1xuICAgICAgICB0aGlzLnN0b3BTZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2FuY2VsU2VhcmNoLmJpbmQodGhpcykpO1xuICAgICAgICAvLyBIaWRlIHRoZSBtZXNzYWdlIGJveGVzIGZvciBub3cgYXMgYXQgZmlyc3Qgd2UgaGF2ZSBubyBtZXNzYWdlcyB0byBkaXNwbGF5XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmluZC1tZXNzYWdlLWJveFwiKSEuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXBsYWNlLW1lc3NhZ2UtYm94XCIpIS5oaWRkZW4gPSB0cnVlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFNlbmRzIGEgc2VhcmNoIHJlcXVlc3QgdG8gdGhlIGV4dGhvc3RcbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIHNlYXJjaCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gSWYgdGhlIGJveCBpcyBlbXB0eSBubyBuZWVkIHRvIGRpc3BsYXkgYW55IHdhcm5pbmdzXG4gICAgICAgIGlmICh0aGlzLmZpbmRUZXh0Qm94LnZhbHVlID09PSBcIlwiKSB0aGlzLnJlbW92ZUlucHV0TWVzc2FnZShcImZpbmRcIik7XG4gICAgICAgIC8vIFRoaXMgZ2V0cyBjYWxsZWQgdG8gY2FuY2VsIGFueSBzZWFyY2hlcyB0aGF0IG1pZ2h0IGJlIGdvaW5nIG9uIG5vd1xuICAgICAgICB0aGlzLmNhbmNlbFNlYXJjaCgpO1xuICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQuc2V0U2VsZWN0aW9uKFtdKTtcbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzID0gW107XG4gICAgICAgIHRoaXMudXBkYXRlUmVwbGFjZUJ1dHRvbnMoKTtcbiAgICAgICAgdGhpcy5maW5kTmV4dEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIHRoaXMuZmluZFByZXZpb3VzQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgbGV0IHF1ZXJ5OiBzdHJpbmcgfCBzdHJpbmdbXSA9IHRoaXMuZmluZFRleHRCb3gudmFsdWU7XG4gICAgICAgIGNvbnN0IGhleFNlYXJjaFJlZ2V4ID0gbmV3IFJlZ0V4cChcIl5bYS1mQS1GMC05PyBdKyRcIik7XG4gICAgICAgIC8vIFdlIGNoZWNrIHRvIHNlZSBpZiB0aGUgaGV4IGlzIGEgdmFsaWQgcXVlcnkgZWxzZSB3ZSBkb24ndCBhbGxvdyBhIHNlYXJjaFxuICAgICAgICBpZiAodGhpcy5zZWFyY2hUeXBlID09PSBcImhleFwiICYmICFoZXhTZWFyY2hSZWdleC50ZXN0KHF1ZXJ5KSkge1xuICAgICAgICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA+IDApIHRoaXMuYWRkSW5wdXRNZXNzYWdlKFwiZmluZFwiLCBcIkludmFsaWQgcXVlcnlcIiwgXCJlcnJvclwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUZXN0IGlmIGl0J3MgYSB2YWxpZCByZWdleFxuICAgICAgICBpZiAodGhpcy5zZWFyY2hPcHRpb25zLnJlZ2V4KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAocXVlcnkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gU3BsaXQgdXAgdGhlIGVycm9yIG1lc3NhZ2UgdG8gZml0IGluIHRoZSBib3guIEluIHRoZSBmdXR1cmUgd2UgbWlnaHQgd2FudCB0aGUgYm94IHRvIGRvIHdvcmQgd3JhcHBpbmdcbiAgICAgICAgICAgICAgICAvLyBTbyB0aGF0IGl0J3Mgbm90IGEgbWFudWFsIGVuZGVhdm9yXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IChlcnIubWVzc2FnZSBhcyBzdHJpbmcpLnN1YnN0cigwLCAyNykgKyBcIlxcblwiICsgKGVyci5tZXNzYWdlIGFzIHN0cmluZykuc3Vic3RyKDI3KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZElucHV0TWVzc2FnZShcImZpbmRcIiwgbWVzc2FnZSwgXCJlcnJvclwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVlcnkgPSB0aGlzLnNlYXJjaFR5cGUgPT09IFwiaGV4XCIgPyBoZXhRdWVyeVRvQXJyYXkocXVlcnkpIDogcXVlcnk7XG4gICAgICAgIGlmIChxdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIGRpZG4ndCB0eXBlIGFueXRoaW5nIGFuZCBpdHMganVzdCBhIGJsYW5rIHF1ZXJ5IHdlIGRvbid0IHdhbnQgdG8gZXJyb3Igb24gdGhlbVxuICAgICAgICAgICAgaWYgKHRoaXMuZmluZFRleHRCb3gudmFsdWUubGVuZ3RoID4gMCkgdGhpcy5hZGRJbnB1dE1lc3NhZ2UoXCJmaW5kXCIsIFwiSW52YWxpZCBxdWVyeVwiLCBcImVycm9yXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RvcFNlYXJjaEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIGxldCByZXN1bHRzOiBTZWFyY2hSZXN1bHRzO1xuICAgICAgICB0aGlzLnJlbW92ZUlucHV0TWVzc2FnZShcImZpbmRcIik7XG4gICAgICAgIC8vIFRoaXMgaXMgd3JhcHBlZCBpbiBhIHRyeSBjYXRjaCBiZWNhdXNlIGlmIHRoZSBtZXNzYWdlIGhhbmRsZXIgZ2V0cyBiYWNrZWQgdXAgdGhpcyB3aWxsIHJlamVjdFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0cyA9IChhd2FpdCBtZXNzYWdlSGFuZGxlci5wb3N0TWVzc2FnZVdpdGhSZXNwb25zZShcInNlYXJjaFwiLCB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuc2VhcmNoVHlwZSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB0aGlzLnNlYXJjaE9wdGlvbnNcbiAgICAgICAgICAgIH0pIGFzIHsgcmVzdWx0czogU2VhcmNoUmVzdWx0c30pLnJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BTZWFyY2hCdXR0b24uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5hZGRJbnB1dE1lc3NhZ2UoXCJmaW5kXCIsIFwiU2VhcmNoIHJldHVybmVkIGFuIGVycm9yIVwiLCBcImVycm9yXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHRzLnBhcnRpYWwpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkSW5wdXRNZXNzYWdlKFwiZmluZFwiLCBcIlBhcnRpYWwgcmVzdWx0cyByZXR1cm5lZCwgdHJ5XFxuIG5hcnJvd2luZyB5b3VyIHF1ZXJ5LlwiLCBcIndhcm5pbmdcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9wU2VhcmNoQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgdGhpcy5yZXN1bHRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IHJlc3VsdHMucmVzdWx0O1xuICAgICAgICAvLyBJZiB3ZSBnb3QgcmVzdWx0cyB0aGVuIHdlIHNlbGVjdCB0aGUgZmlyc3QgcmVzdWx0IGFuZCB1bmxvY2sgdGhlIGJ1dHRvbnNcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoUmVzdWx0cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGF3YWl0IHZpcnR1YWxIZXhEb2N1bWVudC5zY3JvbGxEb2N1bWVudFRvT2Zmc2V0KHRoaXMuc2VhcmNoUmVzdWx0c1t0aGlzLnJlc3VsdEluZGV4XVswXSk7XG4gICAgICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQuc2V0U2VsZWN0aW9uKHRoaXMuc2VhcmNoUmVzdWx0c1t0aGlzLnJlc3VsdEluZGV4XSk7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIG1vcmUgdGhhbiBvbmUgc2VhcmNoIHJlc3VsdCB3ZSB1bmxvY2sgdGhlIGZpbmQgbmV4dCBidXR0b25cbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdEluZGV4ICsgMSA8IHRoaXMuc2VhcmNoUmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmROZXh0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlUmVwbGFjZUJ1dHRvbnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBmaW5kIG5leHQgaWNvblxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9jdXMgV2hldGhlciBvciBub3QgdG8gZm9jdXMgdGhlIHNlbGVjdGlvblxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgZmluZE5leHQoZm9jdXM6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gSWYgdGhlIGJ1dHRvbiBpcyBkaXNhYmxlZCB0aGVuIHRoaXMgZnVuY3Rpb24gc2hvdWxkbid0IHdvcmtcbiAgICAgICAgaWYgKHRoaXMuZmluZE5leHRCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGlzYWJsZWRcIikpIHJldHVybjtcbiAgICAgICAgYXdhaXQgdmlydHVhbEhleERvY3VtZW50LnNjcm9sbERvY3VtZW50VG9PZmZzZXQodGhpcy5zZWFyY2hSZXN1bHRzWysrdGhpcy5yZXN1bHRJbmRleF1bMF0pO1xuICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQuc2V0U2VsZWN0aW9uKHRoaXMuc2VhcmNoUmVzdWx0c1t0aGlzLnJlc3VsdEluZGV4XSk7XG4gICAgICAgIGlmIChmb2N1cykgU2VsZWN0SGFuZGxlci5mb2N1c1NlbGVjdGlvbih0aGlzLnNlYXJjaFR5cGUpO1xuICAgICAgICAvLyBJZiB0aGVyZSdzIG1vcmUgdGhhbiBvbmUgc2VhcmNoIHJlc3VsdCB3ZSB1bmxvY2sgdGhlIGZpbmQgbmV4dCBidXR0b25cbiAgICAgICAgaWYgKHRoaXMucmVzdWx0SW5kZXggPCB0aGlzLnNlYXJjaFJlc3VsdHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5maW5kTmV4dEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpbmROZXh0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXZSBhbHNvIHVubG9jayB0aGUgZmluZCBwcmV2aW91cyBidXR0b24gaWYgdGhlcmUgaXMgYSBwcmV2aW91c1xuICAgICAgICBpZiAodGhpcy5yZXN1bHRJbmRleCAhPSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmRQcmV2aW91c0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB3aGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgZmluZCBwcmV2aW91cyBpY29uXG4gICAgICogQHBhcmFtIHtib29sZWFufSBmb2N1cyBXaGV0aGVyIG9yIG5vdCB0byBmb2N1cyB0aGUgc2VsZWN0aW9uXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBmaW5kUHJldmlvdXMoZm9jdXM6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gSWYgdGhlIGJ1dHRvbiBpcyBkaXNhYmxlZCB0aGVuIHRoaXMgZnVuY3Rpb24gc2hvdWxkbid0IHdvcmtcbiAgICAgICAgaWYgKHRoaXMuZmluZFByZXZpb3VzQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImRpc2FibGVkXCIpKSByZXR1cm47XG4gICAgICAgIGF3YWl0IHZpcnR1YWxIZXhEb2N1bWVudC5zY3JvbGxEb2N1bWVudFRvT2Zmc2V0KHRoaXMuc2VhcmNoUmVzdWx0c1stLXRoaXMucmVzdWx0SW5kZXhdWzBdKTtcbiAgICAgICAgdmlydHVhbEhleERvY3VtZW50LnNldFNlbGVjdGlvbih0aGlzLnNlYXJjaFJlc3VsdHNbdGhpcy5yZXN1bHRJbmRleF0pO1xuICAgICAgICBpZiAoZm9jdXMpIFNlbGVjdEhhbmRsZXIuZm9jdXNTZWxlY3Rpb24odGhpcy5zZWFyY2hUeXBlKTtcbiAgICAgICAgLy8gSWYgdGhleSBwcmVzc2VkIHByZXZpb3VzLCB0aGV5IGNhbiBhbHdheXMgZ28gbmV4dCB0aGVyZWZvcmUgd2UgYWx3YXlzIHVubG9jayB0aGUgbmV4dCBidXR0b25cbiAgICAgICAgdGhpcy5maW5kTmV4dEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIC8vIFdlIGxvY2sgdGhlIGZpbmQgcHJldmlvdXMgaWYgdGhlcmUgaXNuJ3QgYSBwcmV2aW91cyBhbnltb3JlXG4gICAgICAgIGlmICh0aGlzLnJlc3VsdEluZGV4ID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZmluZFByZXZpb3VzQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHdoZW4gdGhlIHVzZXIgdG9nZ2VscyBiZXR3ZWVuIHRleHQgYW5kIGhleCBzaG93aW5nIHRoZSBpbnB1dCBnbHlwaHMgYW5kIGVuc3VyZWluZyBjb3JyZWN0IHBhZGRpbmdcbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZUlucHV0R2x5cGhzKCk6IHZvaWQge1xuICAgICAgICAvLyBUaGUgZ2x5cGggaWNvbnMgdGhhdCBzaXQgaW4gdGhlIGZpbmQgYW5kIHJlcGxhY2UgYmFyXG4gICAgICAgIGNvbnN0IGlucHV0R2x5cGhzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJhci1nbHlwaHNcIikgYXMgSFRNTENvbGxlY3Rpb25PZjxIVE1MU3BhbkVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBpbnB1dEZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYmFyID4gLmlucHV0LWdseXBoLWdyb3VwID4gaW5wdXRcIikgYXMgTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50PjtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVHlwZSA9PSBcImhleFwiKSB7XG4gICAgICAgICAgICBpbnB1dEdseXBoc1swXS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgaW5wdXRHbHlwaHNbMV0uaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0taW5wdXQtZ2x5cGgtcGFkZGluZ1wiLCBcIjBweFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRHbHlwaHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbnB1dEdseXBoc1tpXS5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGdseXBoUmVjdCA9IGlucHV0R2x5cGhzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgY29uc3QgaW5wdXRSZWN0ID0gaW5wdXRGaWVsZHNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGVzIGhvdyBtdWNoIHBhZGRpbmcgd2Ugc2hvdWxkIGhhdmUgc28gdGhhdCB0aGUgdGV4dCBkb2Vzbid0IHJ1biBpbnRvIHRoZSBnbHlwaHNcbiAgICAgICAgICAgIGNvbnN0IGlucHV0UGFkZGluZyA9IChpbnB1dFJlY3QueCArIGlucHV0UmVjdC53aWR0aCArIDEpIC0gZ2x5cGhSZWN0Lng7XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCItLWlucHV0LWdseXBoLXBhZGRpbmdcIiwgYCR7aW5wdXRQYWRkaW5nfXB4YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyBsaXN0ZW5pbmcgdG8gdGhlIHNlYXJjaCBvcHRpb25zIGFuZCB1cGRhdGluZyB0aGVtXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZWFyY2hPcHRpb25zSGFuZGxlcigpOiB2b2lkIHtcbiAgICAgICAgLy8gVG9nZ2xlIFJlZ2V4XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVnZXgtaWNvblwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVnZXhJY29uID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgIGlmIChyZWdleEljb24uY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9nZ2xlZFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoT3B0aW9ucy5yZWdleCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJlZ2V4SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwidG9nZ2xlZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hPcHRpb25zLnJlZ2V4ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZWdleEljb24uY2xhc3NMaXN0LmFkZChcInRvZ2dsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGUgdXNlciBpcyBjaGFuZ2luZyBhbiBvcHRpb24gc28gd2Ugc2hvdWxkIHRyaWdnZXIgYW5vdGhlciBzZWFyY2hcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBUb2dnbGUgY2FzZSBzZW5zaXRpdmVcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXNlLXNlbnNpdGl2ZVwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FzZVNlbnNpdGl2ZSA9IGV2ZW50LnRhcmdldCBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoY2FzZVNlbnNpdGl2ZS5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2dnbGVkXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hPcHRpb25zLmNhc2VTZW5zaXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjYXNlU2Vuc2l0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2dnbGVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaE9wdGlvbnMuY2FzZVNlbnNpdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZVNlbnNpdGl2ZS5jbGFzc0xpc3QuYWRkKFwidG9nZ2xlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZSB1c2VyIGlzIGNoYW5naW5nIGFuIG9wdGlvbiBzbyB3ZSBzaG91bGQgdHJpZ2dlciBhbm90aGVyIHNlYXJjaFxuICAgICAgICAgICAgdGhpcy5zZWFyY2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXBsYWNlT3B0aW9uc0hhbmRsZXIoKTogdm9pZCB7XG4gICAgICAgIC8vIFRvZ2dsZSBwcmVzZXJ2ZSBjYXNlXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJlc2VydmUtY2FzZVwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJlc2VydmVDYXNlID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgIGlmIChwcmVzZXJ2ZUNhc2UuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9nZ2xlZFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlc2VydmVDYXNlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcHJlc2VydmVDYXNlLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2dnbGVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXNlcnZlQ2FzZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcHJlc2VydmVDYXNlLmNsYXNzTGlzdC5hZGQoXCJ0b2dnbGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB3aGVuIHRoZSB1c2VyIGhpdHMgdGhlIHN0b3Agc2VhcmNoIGJ1dHRvblxuICAgICAqL1xuICAgIHByaXZhdGUgY2FuY2VsU2VhcmNoKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdG9wU2VhcmNoQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImRpc2FibGVkXCIpKSByZXR1cm47XG4gICAgICAgIC8vIFdlIGRvbid0IHdhbnQgdGhlIHVzZXIgdG8ga2VlcCBleGVjdXRpbmcgdGhpcywgc28gd2UgZGlzYWJsZSB0aGUgYnV0dG9uIGFmdGVyIHRoZSBmaXJzdCBzZWFyY2hcbiAgICAgICAgdGhpcy5zdG9wU2VhcmNoQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgLy8gV2Ugc2VuZCBhIGNhbmNlbGxhdGlvbiBtZXNzYWdlIHRvIHRoZSBleHRob3N0LCB0aGVyZSdzIG5vIG5lZWQgdG8gIHdhaXQgZm9yIGEgcmVzcG9uc2VcbiAgICAgICAgLy8gQXMgd2UncmUgbm90IGV4cGVjdGluZyBhbnl0aGluZyBiYWNrIGp1c3QgdG8gc3RvcCBwcm9jZXNzaW5nIHRoZSBzZWFyY2hcbiAgICAgICAgbWVzc2FnZUhhbmRsZXIucG9zdE1lc3NhZ2VXaXRoUmVzcG9uc2UoXCJzZWFyY2hcIiwgeyBjYW5jZWw6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhlbHBlciBmdW5jdGlvbiB3aGljaCBoYW5kbGVzIGxvY2tpbmcgLyB1bmxvY2tpbmcgdGhlIHJlcGxhY2UgYnV0dG9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlUmVwbGFjZUJ1dHRvbnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVtb3ZlSW5wdXRNZXNzYWdlKFwicmVwbGFjZVwiKTtcbiAgICAgICAgY29uc3QgaGV4UmVwbGFjZVJlZ2V4ID0gbmV3IFJlZ0V4cChcIl5bYS1mQS1GMC05XSskXCIpO1xuICAgICAgICAvLyBJZiBpdCdzIG5vdCBhIHZhbGlkIGhleCBxdWVyeSB3ZSBsb2NrIHRoZSBidXR0b25zLCB3ZSByZW1vdmUgd2hpdGVzcGFjZSBmcm9tIHRoZSBzdHJpbmcgdG8gc2ltcGxpZnkgdGhlIHJlZ2V4XG4gICAgICAgIGNvbnN0IHF1ZXJ5Tm9TcGFjZXMgPSB0aGlzLnJlcGxhY2VUZXh0Qm94LnZhbHVlLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVHlwZSA9PT0gXCJoZXhcIiAmJiAhaGV4UmVwbGFjZVJlZ2V4LnRlc3QocXVlcnlOb1NwYWNlcykpIHtcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZUFsbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB0aGlzLnJlcGxhY2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMucmVwbGFjZVRleHRCb3gudmFsdWUubGVuZ3RoID4gMCkgdGhpcy5hZGRJbnB1dE1lc3NhZ2UoXCJyZXBsYWNlXCIsIFwiSW52YWxpZCByZXBsYWNlbWVudFwiLCBcImVycm9yXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcGxhY2VRdWVyeSA9IHRoaXMucmVwbGFjZVRleHRCb3gudmFsdWU7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VBcnJheSA9IHRoaXMuc2VhcmNoVHlwZSA9PT0gXCJoZXhcIiA/IGhleFF1ZXJ5VG9BcnJheShyZXBsYWNlUXVlcnkpIDogQXJyYXkuZnJvbShyZXBsYWNlUXVlcnkpO1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHRzLmxlbmd0aCAhPT0gMCAmJiByZXBsYWNlQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlcGxhY2VBbGxCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5yZXBsYWNlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlcGxhY2VUZXh0Qm94LnZhbHVlLmxlbmd0aCA+IDAgJiYgcmVwbGFjZUFycmF5Lmxlbmd0aCA9PT0gMCkgdGhpcy5hZGRJbnB1dE1lc3NhZ2UoXCJyZXBsYWNlXCIsIFwiSW52YWxpZCByZXBsYWNlbWVudFwiLCBcImVycm9yXCIpO1xuICAgICAgICAgICAgdGhpcy5yZXBsYWNlQWxsQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB3aGVuIHRoZSB1c2VyIGNsaWNrcyByZXBsYWNlIG9yIHJlcGxhY2UgYWxsXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhbGwgd2hldGhlciB0aGlzIGlzIGEgbm9ybWFsIHJlcGxhY2Ugb3IgYSByZXBsYWNlIGFsbFxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgcmVwbGFjZShhbGw6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgcmVwbGFjZVF1ZXJ5ID0gdGhpcy5yZXBsYWNlVGV4dEJveC52YWx1ZTtcbiAgICAgICAgY29uc3QgcmVwbGFjZUFycmF5ID0gdGhpcy5zZWFyY2hUeXBlID09PSBcImhleFwiID8gaGV4UXVlcnlUb0FycmF5KHJlcGxhY2VRdWVyeSkgOiBBcnJheS5mcm9tKHJlcGxhY2VRdWVyeSk7XG4gICAgICAgIGxldCByZXBsYWNlQml0czogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgLy8gU2luY2UgdGhlIGV4dGhvc3Qgb25seSBob2xkcyBkYXRhIGluIDggYml0IHVuc2lnbmVkIGludHMgd2UgbXVzdCBjb252ZXJ0IGl0IGJhY2tcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVHlwZSA9PT0gXCJoZXhcIikge1xuICAgICAgICAgICAgcmVwbGFjZUJpdHMgPSByZXBsYWNlQXJyYXkubWFwKHZhbCA9PiBwYXJzZUludCh2YWwsIDE2KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXBsYWNlQml0cyA9IHJlcGxhY2VBcnJheS5tYXAodmFsID0+IHZhbC5jaGFyQ29kZUF0KDApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvZmZzZXRzOiBudW1iZXJbXVtdID0gW107XG4gICAgICAgIGlmIChhbGwpIHtcbiAgICAgICAgICAgIG9mZnNldHMgPSB0aGlzLnNlYXJjaFJlc3VsdHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvZmZzZXRzID0gW3RoaXMuc2VhcmNoUmVzdWx0c1t0aGlzLnJlc3VsdEluZGV4XV07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlZGl0cyA9IChhd2FpdCBtZXNzYWdlSGFuZGxlci5wb3N0TWVzc2FnZVdpdGhSZXNwb25zZShcInJlcGxhY2VcIiwge1xuICAgICAgICAgICAgcXVlcnk6IHJlcGxhY2VCaXRzLFxuICAgICAgICAgICAgb2Zmc2V0czogb2Zmc2V0cyxcbiAgICAgICAgICAgIHByZXNlcnZlQ2FzZTogdGhpcy5wcmVzZXJ2ZUNhc2VcbiAgICAgICAgfSkpLmVkaXRzO1xuICAgICAgICAvLyBXZSBjYW4gcGFzcyB0aGUgc2l6ZSBvZiB0aGUgZG9jdW1lbnQgYmFjayBpbiBiZWNhdXNlIHdpdGggdGhlIGN1cnJlbnQgaW1wbGVtZW50YXRpb25cbiAgICAgICAgLy8gVGhlIHNpemUgb2YgdGhlIGRvY3VtZW50IHdpbGwgbmV2ZXIgY2hhbmdlIGFzIHdlIG9ubHkgcmVwbGFjZSBwcmVleGlzdGluZyBjZWxsc1xuICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQucmVkbyhlZGl0cywgdmlydHVhbEhleERvY3VtZW50LmRvY3VtZW50U2l6ZSk7XG4gICAgICAgIHRoaXMuZmluZE5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEZ1bmN0aW9uIHJlc3BvbnNpYmxlIGZvciBoYW5kbGluZyB3aGVuIHRoZSB1c2VyIHByZXNzZXMgY21kIC8gY3RybCArIGYgdXBkYXRpbmcgdGhlIHdpZGdldCBhbmQgZm9jdXNpbmcgaXRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VhcmNoS2V5YmluZGluZ0hhbmRsZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VhcmNoVHlwZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ/LmNsYXNzTGlzdC5jb250YWlucyhcImFzY2lpXCIpID8gXCJhc2NpaVwiIDogXCJoZXhcIjtcbiAgICAgICAgY29uc3QgZGF0YVR5cGVTZWxlY3QgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRhLXR5cGVcIikgYXMgSFRNTFNlbGVjdEVsZW1lbnQpO1xuICAgICAgICBkYXRhVHlwZVNlbGVjdC52YWx1ZSA9IHRoaXMuc2VhcmNoVHlwZTtcbiAgICAgICAgZGF0YVR5cGVTZWxlY3QuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjaGFuZ2VcIikpO1xuICAgICAgICB0aGlzLmZpbmRUZXh0Qm94LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEFkZHMgYW4gd2FybmluZyAvIGVycm9yIG1lc3NhZ2UgdG8gdGhlIGlucHV0IGJveCBwYXNzZWQgaW5cbiAgICAgKiBAcGFyYW0ge1wiZmluZFwiIHwgXCJyZXBsYWNlXCJ9IGlucHV0Qm94TmFtZSBXaGV0aGVyIGl0J3MgdGhlIGZpbmQgaW5wdXQgYm94IG9yIHRoZSByZXBsYWNlIGlucHV0IGJveFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXlcbiAgICAgKiBAcGFyYW0ge1wiZXJyb3JcIiB8IFwid2FybmluZ1wifSB0eXBlIFdoZXRoZXIgaXQncyBhbiBlcnJvciBtZXNzYWdlIG9yIGEgd2FybmluZyBtZXNzYWdlXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGRJbnB1dE1lc3NhZ2UoaW5wdXRCb3hOYW1lOiBcImZpbmRcIiB8IFwicmVwbGFjZVwiLCBtZXNzYWdlOiBzdHJpbmcsIHR5cGU6IFwiZXJyb3JcIiB8IFwid2FybmluZ1wiKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlucHV0Qm94OiBIVE1MSW5wdXRFbGVtZW50ID0gaW5wdXRCb3hOYW1lID09PSBcImZpbmRcIiA/IHRoaXMuZmluZFRleHRCb3ggOiB0aGlzLnJlcGxhY2VUZXh0Qm94O1xuICAgICAgICBjb25zdCBtZXNzYWdlQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aW5wdXRCb3hOYW1lfS1tZXNzYWdlLWJveGApIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICAvLyBXZSB0cnkgdG8gZG8gdGhlIGxlYXN0IGFtb3VudCBvZiBET00gY2hhbmdpbmcgYXMgdG8gcmVkdWNlIHRoZSBmbGFzaGluZyB0aGUgdXNlciBzZWVzXG4gICAgICAgIGlmIChtZXNzYWdlQm94LmlubmVyVGV4dCA9PT0gbWVzc2FnZSAmJiBtZXNzYWdlQm94LmNsYXNzTGlzdC5jb250YWlucyhgaW5wdXQtJHt0eXBlfWApKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZUJveC5jbGFzc0xpc3QuY29udGFpbnMoYGlucHV0LSR7dHlwZX1gKSkge1xuICAgICAgICAgICAgbWVzc2FnZUJveC5pbm5lclRleHQgPSBtZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVJbnB1dE1lc3NhZ2UoXCJmaW5kXCIsIHRydWUpO1xuICAgICAgICAgICAgbWVzc2FnZUJveC5pbm5lclRleHQgPSBtZXNzYWdlO1xuICAgICAgICAgICAgLy8gQWRkIHRoZSBjbGFzc2VzIGZvciBwcm9wZXIgc3R5bGluZyBvZiB0aGUgbWVzc2FnZVxuICAgICAgICAgICAgaW5wdXRCb3guY2xhc3NMaXN0LmFkZChgJHt0eXBlfS1ib3JkZXJgKTtcbiAgICAgICAgICAgIG1lc3NhZ2VCb3guY2xhc3NMaXN0LmFkZChgJHt0eXBlfS1ib3JkZXJgLCBgaW5wdXQtJHt0eXBlfWApO1xuICAgICAgICAgICAgbWVzc2FnZUJveC5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIHRoZSB3YXJuaW5nIC8gZXJyb3IgbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7XCJmaW5kXCIgfCBcInJlcGxhY2VcIn0gaW5wdXRCb3hOYW1lIFdoaWNoIGlucHV0IGJveCB0byByZW1vdmUgdGhlIG1lc3NhZ2UgZnJvbVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbiB8IHVuZGVmaW5lZH0gc2tpcEhpZGluZyBXaGV0aGVyIHdlIHdhbnQgdG8gc2tpcCBoaWRpbmcgdGhlIGVtcHR5IG1lc3NhZ2UgYm94LCB0aGlzIGlzIHVzZWZ1bCBmb3IgY2xlYXJpbmcgdGhlIGJveCB0byBhZGQgbmV3IHRleHRcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbW92ZUlucHV0TWVzc2FnZShpbnB1dEJveE5hbWU6IFwiZmluZFwiIHwgXCJyZXBsYWNlXCIsIHNraXBIaWRpbmc/OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlucHV0Qm94OiBIVE1MSW5wdXRFbGVtZW50ID0gaW5wdXRCb3hOYW1lID09PSBcImZpbmRcIiA/IHRoaXMuZmluZFRleHRCb3ggOiB0aGlzLnJlcGxhY2VUZXh0Qm94O1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2VCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpbnB1dEJveE5hbWV9LW1lc3NhZ2UtYm94YCkgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIC8vIEFkZCB0aGUgY2xhc3NlcyBmb3IgcHJvcGVyIHN0eWxpbmcgb2YgdGhlIG1lc3NhZ2VcbiAgICAgICAgaW5wdXRCb3guY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLWJvcmRlclwiLCBcIndhcm5pbmctYm9yZGVyXCIpO1xuICAgICAgICBlcnJvck1lc3NhZ2VCb3guY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLWJvcmRlclwiLCBcIndhcm5pbmctYm9yZGVyXCIsIFwiaW5wdXQtd2FybmluZ1wiLCBcImlucHV0LWVycm9yXCIpO1xuICAgICAgICBpZiAoc2tpcEhpZGluZyAhPT0gdHJ1ZSkgZXJyb3JNZXNzYWdlQm94LmhpZGRlbiA9IHRydWU7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbmltcG9ydCB7IGdldEVsZW1lbnRzV2l0aEdpdmVuT2Zmc2V0LCByZWxhdGl2ZUNvbXBsZW1lbnQsIGJpbmFyeVNlYXJjaCwgZGlzanVuY3Rpb24gfSBmcm9tIFwiLi91dGlsXCI7XG5pbXBvcnQgeyBXZWJWaWV3U3RhdGVNYW5hZ2VyIH0gZnJvbSBcIi4vd2Vidmlld1N0YXRlTWFuYWdlclwiO1xuXG5leHBvcnQgY2xhc3MgU2VsZWN0SGFuZGxlciB7XG4gICAgcHJpdmF0ZSBfZm9jdXM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIF9zZWxlY3Rpb246IG51bWJlcltdID0gW107XG4gICAgcHJpdmF0ZSBfc2VsZWN0aW9uU3RhcnQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhbiBvZmZzZXQgc2VsZWN0cyB0aGUgZWxlbWVudHMuIFRoaXMgZG9lcyBub3QgY2xlYXIgdGhlIHByZXZpb3VzbHkgc2VsZWN0ZWQgZWxlbWVudHMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBPZmZzZXQgdG8gc2VsZWN0XG4gICAgICogQHBhcmFtIHtib29sZWFufSBmb3JjZSBJZiBmb3JjZSBpcyBub3QgZ2l2ZW4sIHRvZ2dsZXMgc2VsZWN0aW9uLiBJZiBmb3JjZSBpcyB0cnVlIHNlbGVjdHMgdGhlIGVsZW1lbnQuXG4gICAgICogSWYgZm9yY2UgaXMgZmFsc2UgZGVzZWxlY3RzIHRoZSBlbGVtZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHRvZ2dsZVNlbGVjdE9mZnNldChvZmZzZXQ6IG51bWJlciwgZm9yY2U/OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQob2Zmc2V0KTtcbiAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gRWxlbWVudCBtYXkgbm90IGJlIHBhcnQgb2YgdGhlIERPTVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnRzWzBdLmNsYXNzTGlzdC50b2dnbGUoXCJzZWxlY3RlZFwiLCBmb3JjZSk7XG4gICAgICAgIGVsZW1lbnRzWzFdLmNsYXNzTGlzdC50b2dnbGUoXCJzZWxlY3RlZFwiLCBmb3JjZSk7XG4gICAgfVxuXG4gICAgLyoqKlxuICAgICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIHRoZSBvZmZzZXQgb2YgdGhlIGVsZW1lbnQgY3VycmVudGx5IGZvY3VzZWQuXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIG9mZnNldCBvZiB0aGUgZWxlbWVudCBjdXJyZW50bHkgZm9jdXNlZFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRGb2N1c2VkKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb2N1cztcbiAgICB9XG5cbiAgICAvKioqXG4gICAgICogQGRlc2NyaXB0aW9uIFNldCB0aGUgb2Zmc2V0IG9mIHRoZSBlbGVtZW50IGN1cnJlbnRseSBmb2N1c2VkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgVGhlIG9mZnNldCB0aGUgZWxlbWVudCBjdXJyZW50bHkgZm9jdXNlZFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRGb2N1c2VkKG9mZnNldDogbnVtYmVyIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2ZvY3VzID0gb2Zmc2V0O1xuICAgIH1cblxuICAgIC8qKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyB0aGUgb2Zmc2V0IGZyb20gd2hpY2ggdGhlIHNlbGVjdGlvbiBzdGFydHMuXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIG9mZnNldCBmcm9tIHdoaWNoIHRoZSBzZWxlY3Rpb24gc3RhcnRzXG4gICAgICovXG4gICAgcHVibGljIGdldFNlbGVjdGlvblN0YXJ0KCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb25TdGFydCA/PyB0aGlzLl9mb2N1cztcbiAgICB9XG5cbiAgICAvKioqXG4gICAgICogQGRlc2NyaXB0aW9uIFJldHVybnMgdGhlIG9mZnNldHMgb2YgdGhlIGVsZW1lbnRzIGN1cnJlbnRseSBzZWxlY3RlZC5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119IFRoZSBvZmZzZXRzIG9mIHRoZSBlbGVtZW50cyBjdXJyZW50bHkgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0U2VsZWN0ZWQoKTogbnVtYmVyW10ge1xuICAgICAgICByZXR1cm4gV2ViVmlld1N0YXRlTWFuYWdlci5nZXRQcm9wZXJ0eShcInNlbGVjdGVkX29mZnNldHNcIikgPz8gW107XG4gICAgfVxuXG4gICAgLyoqKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhbiBhcnJheSBvZiBvZmZzZXRzLCBzZWxlY3RzIHRoZSBjb3JyZXNwb25kaW5nIGVsZW1lbnRzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IG9mZnNldHMgVGhlIG9mZnNldHMgb2YgdGhlIGVsZW1lbnRzIHlvdSB3YW50IHRvIHNlbGVjdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBUaGUgb2Zmc2V0IGZyb20gd2hpY2ggdGhlIHNlbGVjdGlvbiBzdGFydHNcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcmNlUmVuZGVyIFdoZXRlciB0byBmb3JjZSByZW5kZXJpbmcgb2YgYWxsIGVsZW1lbnRzIHdob3NlXG4gICAgICogc2VsZWN0ZWQgc3RhdGVkIHdpbGwgY2hhbmdlXG4gICAgICovXG4gICAgcHVibGljIHNldFNlbGVjdGVkKG9mZnNldHM6IG51bWJlcltdLCBzdGFydD86IG51bWJlciwgZm9yY2VSZW5kZXIgPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBvbGRTZWxlY3Rpb24gPSB0aGlzLl9zZWxlY3Rpb247XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uU3RhcnQgPSBzdGFydDtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gWy4uLm9mZnNldHNdLnNvcnQoKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiBhIC0gYik7XG4gICAgICAgIFdlYlZpZXdTdGF0ZU1hbmFnZXIuc2V0UHJvcGVydHkoXCJzZWxlY3RlZF9vZmZzZXRzXCIsIHRoaXMuX3NlbGVjdGlvbik7XG5cbiAgICAgICAgLy8gTmVlZCB0byBjYWxsIHJlbmRlclNlbGVjdGlvbiB3aXRoIHRoZSBsZWFzdCBudW1iZXIgb2Ygb2Zmc2V0cyB0byBhdm9pZCBxdWVyeWluZyB0aGUgRE9NXG4gICAgICAgIC8vIGFzIG11Y2ggYXMgcG9zc2libGUsIGlmIG5vdCByZW5kZXJpbmcgbGFyZ2Ugc2VsZWN0aW9ucyBiZWNvbWVzIGxhZ2d5IGFzIHdlIGRvbnQgaG9sZCByZWZlcmVuY2VzXG4gICAgICAgIC8vIHRvIHRoZSBET00gZWxlbWVudHNcbiAgICAgICAgY29uc3QgdG9SZW5kZXIgPSBmb3JjZVJlbmRlciA/IGRpc2p1bmN0aW9uKG9sZFNlbGVjdGlvbiwgdGhpcy5fc2VsZWN0aW9uKSA6IHJlbGF0aXZlQ29tcGxlbWVudChvbGRTZWxlY3Rpb24sIHRoaXMuX3NlbGVjdGlvbik7XG4gICAgICAgIHRoaXMucmVuZGVyU2VsZWN0aW9uKHRvUmVuZGVyKTtcbiAgICB9XG5cbiAgICAvKioqXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbmRlcnMgdGhlIHVwZGF0ZWQgc2VsZWN0aW9uIHN0YXRlIG9mIHNlbGVjdGVkL3Vuc2VsZWN0ZWQgZWxlbWVudHNcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSBvZmZzZXRzIFRoZSBvZmZzZXRzIG9mIHRoZSBlbGVtZW50cyB0byByZW5kZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbmRlclNlbGVjdGlvbihvZmZzZXRzOiBudW1iZXJbXSk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWlucyA9IChvZmZzZXQ6IG51bWJlcik6IGJvb2xlYW4gPT4gYmluYXJ5U2VhcmNoKHRoaXMuX3NlbGVjdGlvbiwgb2Zmc2V0LCAoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IGEgLSBiKSA+PSAwO1xuXG4gICAgICAgIGZvciAoY29uc3Qgb2Zmc2V0IG9mIG9mZnNldHMpIHtcbiAgICAgICAgICAgIFNlbGVjdEhhbmRsZXIudG9nZ2xlU2VsZWN0T2Zmc2V0KG9mZnNldCwgY29udGFpbnMob2Zmc2V0KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqXG4gICAgICogQGRlc2NyaXB0aW9uIEdyYWJzIHRoZSBoZXggdmFsdWVzIG9mIHRoZSBzZWxlY3RlZCBieXRlc1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gVGhlIGhleCB2YWx1ZXNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFNlbGVjdGVkSGV4KCk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgaGV4OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3RlZCBoZXhcIikgYXMgSFRNTENvbGxlY3Rpb25PZjxIVE1MU3BhbkVsZW1lbnQ+O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRbaV0uaW5uZXJUZXh0ID09PSBcIitcIikgY29udGludWU7XG4gICAgICAgICAgICBoZXgucHVzaChzZWxlY3RlZFtpXS5pbm5lclRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEZvY3VzZXMgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGJhc2VkIG9uIHRoZSBzZWN0aW9uIHBhc3NlZCBpblxuICAgICAqIEBwYXJhbSBzZWN0aW9uIHtcImhleFwiIHwgXCJhc2NpaVwifSBUaGUgc2VjdGlvbiB0byBwbGFjZSB0aGUgZm9jdXNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZvY3VzU2VsZWN0aW9uKHNlY3Rpb246IFwiaGV4XCIgfCBcImFzY2lpXCIpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgc2VsZWN0ZWQgJHtzZWN0aW9ufWApO1xuICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCAhPT0gMCkgKHNlbGVjdGlvblswXSBhcyBIVE1MU3BhbkVsZW1lbnQpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFJldHJpZXZlcyB0aGUgc2VsZWN0aW9uIGFzIGEgc3RyaW5nLCBkZWZhdWx0cyB0byBoZXggaWYgdGhlcmUgaXMgbm8gZm9jdXMgb24gZWl0aGVyIHNpZGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc2VsZWN0aW9uIHJlcHJlc2VudGVkIGFzIGEgc3RyaW5nXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRTZWxlY3RlZFZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBzZWxlY3RlZFZhbHVlID0gXCJcIjtcbiAgICAgICAgbGV0IHNlY3Rpb24gPSBcImhleFwiO1xuICAgICAgICBsZXQgc2VsZWN0ZWRFbGVtZW50czogSFRNTENvbGxlY3Rpb25PZjxIVE1MU3BhbkVsZW1lbnQ+O1xuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudD8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYXNjaWlcIikpIHtcbiAgICAgICAgICAgIHNlY3Rpb24gPSBcImFzY2lpXCI7XG4gICAgICAgICAgICBzZWxlY3RlZEVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdGVkIGFzY2lpXCIpIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTFNwYW5FbGVtZW50PjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdGVkRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VsZWN0ZWQgaGV4XCIpIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTFNwYW5FbGVtZW50PjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2Ygc2VsZWN0ZWRFbGVtZW50cykge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaW5uZXJUZXh0ID09PSBcIitcIikgY29udGludWU7XG4gICAgICAgICAgICBzZWxlY3RlZFZhbHVlICs9IGVsZW1lbnQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24gPT09IFwiaGV4XCIpIHNlbGVjdGVkVmFsdWUgKz0gXCIgXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgaXQncyBoZXggd2Ugd2FudCB0byByZW1vdmUgdGhlIGxhc3Qgc3BhY2UgYXMgaXQgZG9lc24ndCBtYWtlIHNlbnNlXG4gICAgICAgIC8vIEZvciBhc2NpaSB0aGF0IHNwYWNlIG1pZ2h0IGhhdmUgbWVhbmluZ1xuICAgICAgICBpZiAoc2VjdGlvbiA9PT0gXCJoZXhcIikgc2VsZWN0ZWRWYWx1ZSA9IHNlbGVjdGVkVmFsdWUudHJpbVJpZ2h0KCk7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZFZhbHVlO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG5cbmltcG9ydCB7IHZpcnR1YWxIZXhEb2N1bWVudCB9IGZyb20gXCIuL2hleEVkaXRcIjtcbmltcG9ydCB7IFdlYlZpZXdTdGF0ZU1hbmFnZXIgfSBmcm9tIFwiLi93ZWJ2aWV3U3RhdGVNYW5hZ2VyXCI7XG5cbmV4cG9ydCBjbGFzcyBTY3JvbGxCYXJIYW5kbGVyIHtcbiAgICBwcml2YXRlIHNjcm9sbEJhcjogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBzY3JvbGxCYXJIZWlnaHQhOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzY3JvbGxUaHVtYjogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBzY3JvbGxUaHVtYkhlaWdodCE6IG51bWJlcjtcbiAgICBwcml2YXRlIHNjcm9sbEp1bXAhOiBudW1iZXI7XG4gICAgcHJpdmF0ZSByb3dIZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIHNjcm9sbFRvcDogbnVtYmVyO1xuICAgIHByaXZhdGUgaXNEcmFnZ2luZzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBHaXZlbiBhIHNjcm9sbGJhciBlbGVtZW50IGluc3RhbnRpYXRlcyBhIGhhbmRsZXIgd2hpY2ggaGFuZGxlcyB0aGUgc2Nyb2xsaW5nIGJlaGF2aW9yIGluIHRoZSBlZGl0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2Nyb2xsQmFySWQgdGhlIGlkIG9mIHRoZSBzY3JvbGxiYXIgZWxlbWVudCBvbiB0aGUgRE9NIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3dIZWlnaHQgdGhlIGhlaWdodCBvZiBhIHJvdyBpbiBweFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNjcm9sbEJhcklkOiBzdHJpbmcsIG51bVJvd3M6IG51bWJlciwgcm93SGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgLy8gSWYgdGhlIHNjcm9sbGJhciBpc24ndCBvbiB0aGUgRE9NIGZvciBzb21lIHJlYXNvbiB0aGVyZSdzIG5vdGhpbmcgd2UgY2FuIGRvIGJlc2lkZXMgY3JlYXRlIGFuIGVtcHR5IGhhbmRsZXIgYW5kIHRocm93IGFuIGVycm9yXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzY3JvbGxCYXJJZCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2Nyb2xsQmFySWQpISBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVGh1bWIgPSB0aGlzLnNjcm9sbEJhci5jaGlsZHJlblswXSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVGh1bWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIHNjcm9sbGJhciBpZCFcIjtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIHRoaXMub25Nb3VzZVdoZWVsLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnNjcm9sbEJhci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVGh1bWIuY2xhc3NMaXN0LmFkZChcInNjcm9sbGluZ1wiKTtcbiAgICAgICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNjcm9sbEJhci5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRodW1iLmNsYXNzTGlzdC5yZW1vdmUoXCJzY3JvbGxpbmdcIik7XG4gICAgICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuc2Nyb2xsVGh1bWJEcmFnLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IHJvd0hlaWdodDtcbiAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxCYXIobnVtUm93cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgZW5zdXJpbmcgdGhlIHNjcm9sbGJhciBpcyB2YWxpZCBhZnRlciB3aW5kb3cgcmVzaXplIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1Sb3dzIFRoZSBudW1iZXIgb2Ygcm93cyBpbiB0aGUgZmlsZSwgbmVlZGVkIHRvIG1hcCBzY3JvbGwgYmFyIHRvIHJvdyBsb2NhdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlU2Nyb2xsQmFyKG51bVJvd3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBTb21lIGNhbGN1bGF0aW9ucyBzbyB0aGF0IHRoZSB0aHVtYiAvIHNjcnViYmVyIGlzIHJlcHJlc2VudGF0aXZlIG9mIGhvdyBtdWNoIGNvbnRlbnQgdGhlcmUgaXNcbiAgICAgICAgLy8gQ3JlZGl0IHRvIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2MzY2Nzk1L2hvdy10by1jYWxjdWxhdGUtdGhlLXNpemUtb2Ytc2Nyb2xsLWJhci10aHVtYiBmb3IgdGhlc2UgY2FsY3VsYXRpb25zXG4gICAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSAobnVtUm93cyArIDEpICogdGhpcy5yb3dIZWlnaHQ7XG4gICAgICAgIHRoaXMuc2Nyb2xsQmFySGVpZ2h0ID0gdGhpcy5zY3JvbGxCYXIuY2xpZW50SGVpZ2h0O1xuICAgICAgICAvLyBXZSBkb24ndCB3YW50IHRoZSBzY3JvbGwgdGh1bWIgbGFyZ2VyIHRoYW4gdGhlIHNjcm9sbGJhclxuICAgICAgICB0aGlzLnNjcm9sbFRodW1iSGVpZ2h0ID0gTWF0aC5taW4odGhpcy5zY3JvbGxCYXJIZWlnaHQsIE1hdGgubWF4KHRoaXMuc2Nyb2xsQmFySGVpZ2h0ICogKHRoaXMuc2Nyb2xsQmFySGVpZ2h0IC8gY29udGVudEhlaWdodCksIDMwKSk7XG4gICAgICAgIHRoaXMuc2Nyb2xsVGh1bWIuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5zY3JvbGxUaHVtYkhlaWdodH1weGA7XG4gICAgICAgIC8vIElmIHlvdSBtb3ZlIHRoZSBzY3JvbGxiYXIgMXB4IGhvdyBtdWNoIHNob3VsZCB0aGUgZG9jdW1lbnQgbW92ZVxuICAgICAgICB0aGlzLnNjcm9sbEp1bXAgPSBNYXRoLm1heCgwLCAoY29udGVudEhlaWdodCAtIHRoaXMuc2Nyb2xsQmFySGVpZ2h0KSAvICh0aGlzLnNjcm9sbEJhckhlaWdodCAtIHRoaXMuc2Nyb2xsVGh1bWJIZWlnaHQpKTtcbiAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxlZFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgd2hlbiB0aGUgdXNlciBkcmFncyB0aGUgdGh1bWIgb24gdGhlIHNjcm9sbGJhciBhcm91bmRcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IFRoZSBtb3VzZSBldmVudCBwYXNzZWQgdG8gdGhlIGV2ZW50IGhhbmRsZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIHNjcm9sbFRodW1iRHJhZyhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBpZiB0aGVzZSBhcmUgZXF1YWwgaXQgbWVhbnMgdGhlIGRvY3VtZW50IGlzIHRvbyBzaG9ydCB0byBzY3JvbGwgYW55d2F5c1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxCYXJIZWlnaHQgPT09IHRoaXMuc2Nyb2xsVGh1bWJIZWlnaHQpIHJldHVybjtcbiAgICAgICAgLy8gVGhpcyBoZWxwcyB0aGUgY2FzZSB3aGVyZSB3ZSBsb3NlIHRyYWNrIGFzIHRoZSB1c2VyIHJlbGVhc2VzIHRoZSBidXR0b24gb3V0c2lkZSB0aGUgd2Vidmlld1xuICAgICAgICBpZiAoIXRoaXMuaXNEcmFnZ2luZyB8fCBldmVudC5idXR0b25zID09IDApe1xuICAgICAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRodW1iLmNsYXNzTGlzdC5yZW1vdmUoXCJzY3JvbGxpbmdcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsVG9wKGV2ZW50LmNsaWVudFkgKiB0aGlzLnNjcm9sbEp1bXApO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbGVkUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gVXBkYWVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgZG9jdW1lbnQgYW5kIHRoZSBzY3JvbGxiYXIgdGh1bWIgYmFzZWQgb24gdGhlIHNjcm9sbFRvcFxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgdXBkYXRlU2Nyb2xsZWRQb3NpdGlvbigpOiBQcm9taXNlPHZvaWRbXT4ge1xuICAgICAgICAvLyBUaGUgdmlydHVhbCBkb2N1bWVudCB1cG9uIGZpcnN0IGxvYWQgaXMgdW5kZWZpbmVkIHNvIHdlIHdhbnQgdG8gcHJldmVudCBhbnkgZXJyb3JzIGFuZCBqdXN0IG5vdCBkbyBhbnl0aGluZyBpbiB0aGF0IGNhc2VcbiAgICAgICAgaWYgKCF2aXJ0dWFsSGV4RG9jdW1lbnQgfHwgIXZpcnR1YWxIZXhEb2N1bWVudC5kb2N1bWVudEhlaWdodCkgcmV0dXJuIFtdO1xuICAgICAgICB0aGlzLnNjcm9sbFRodW1iLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7dGhpcy5zY3JvbGxUb3AgLyB0aGlzLnNjcm9sbEp1bXB9cHgpYDtcbiAgICAgICAgLy8gVGhpcyBtYWtlcyBzdXJlIGl0IGRvZXNuJ3Qgc2Nyb2xsIHBhc3QgdGhlIGJvdHRvbSBvZiB0aGUgdmlld3BvcnRcbiAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyb3d3cmFwcGVyXCIpWzBdIGFzIEhUTUxFbGVtZW50KSEuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7dGhpcy5zY3JvbGxUb3AgJSB2aXJ0dWFsSGV4RG9jdW1lbnQuZG9jdW1lbnRIZWlnaHR9cHgpYDtcbiAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyb3d3cmFwcGVyXCIpWzFdIGFzIEhUTUxFbGVtZW50KSEuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7dGhpcy5zY3JvbGxUb3AgJSB2aXJ0dWFsSGV4RG9jdW1lbnQuZG9jdW1lbnRIZWlnaHR9cHgpYDtcbiAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyb3d3cmFwcGVyXCIpWzJdIGFzIEhUTUxFbGVtZW50KSEuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7dGhpcy5zY3JvbGxUb3AgJSB2aXJ0dWFsSGV4RG9jdW1lbnQuZG9jdW1lbnRIZWlnaHR9cHgpYDtcbiAgICAgICAgcmV0dXJuIHZpcnR1YWxIZXhEb2N1bWVudC5zY3JvbGxIYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgdGhlIHVzZXIgc2Nyb2xsaW5nIHdpdGggdGhlaXIgbW91c2Ugd2hlZWxcbiAgICAgKiBAcGFyYW0ge01vdXNlV2hlZWxFdmVudH0gZXZlbnQgVGhlIGV2ZW50IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHNjcm9sbCBwYXNzZWQgdG8gdGhlIGV2ZW50IGhhbmRsZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uTW91c2VXaGVlbChldmVudDogTW91c2VXaGVlbEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIGlmIHRoZXNlIGFyZSBlcXVhbCBpdCBtZWFucyB0aGUgZG9jdW1lbnQgaXMgdG9vIHNob3J0IHRvIHNjcm9sbCBhbnl3YXlzXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEJhckhlaWdodCA9PT0gdGhpcy5zY3JvbGxUaHVtYkhlaWdodCkgcmV0dXJuO1xuICAgICAgICBpZiAoTWF0aC5hYnMoZXZlbnQuZGVsdGFYKSAhPT0gMCB8fCBldmVudC5zaGlmdEtleSkgcmV0dXJuO1xuICAgICAgICBpZiAoZXZlbnQuZGVsdGFZID4gMCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsVG9wKHRoaXMuc2Nyb2xsVG9wICsgdGhpcy5yb3dIZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsVG9wKHRoaXMuc2Nyb2xsVG9wIC0gdGhpcy5yb3dIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbGVkUG9zaXRpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIENhbiBiZSBjYWxsZWQgdG8gc2Nyb2xsIHRoZSBkb2N1bWVudCBzaW1pbGFyIHRvIHdpbmRvdy5zY3JvbGxCeVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1Sb3dzIFRoZSBudW1iZXIgb2Ygcm93cyB5b3Ugd2FudCB0byBzY3JvbGxcbiAgICAgKiBAcGFyYW0ge1widXBcIiB8IFwiZG93blwifSBkaXJlY3Rpb24gVGhlIGRpcmVjdGlvbiwgdXAgb3IgZG93blxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzY3JvbGxEb2N1bWVudChudW1Sb3dzOiBudW1iZXIsIGRpcmVjdGlvbjogXCJ1cFwiIHwgXCJkb3duXCIpOiBQcm9taXNlPHZvaWRbXT4ge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInVwXCIpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlydHVhbFNjcm9sbFRvcCh0aGlzLnNjcm9sbFRvcCAtICh0aGlzLnJvd0hlaWdodCAqIG51bVJvd3MpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlydHVhbFNjcm9sbFRvcCh0aGlzLnNjcm9sbFRvcCArICh0aGlzLnJvd0hlaWdodCAqIG51bVJvd3MpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVTY3JvbGxlZFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFNjcm9sbHMgdG8gdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2Nyb2xsVG9Ub3AoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlVmlydHVhbFNjcm9sbFRvcCgwKTtcbiAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxlZFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFNjcm9sbHMgdG8gdGhlIGJvdHRvbSBvZiB0aGUgZG9jdW1lbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2Nyb2xsVG9Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlVmlydHVhbFNjcm9sbFRvcCgoKHRoaXMuc2Nyb2xsQmFySGVpZ2h0IC0gdGhpcy5zY3JvbGxUaHVtYkhlaWdodCkgKiB0aGlzLnNjcm9sbEp1bXApICsgdGhpcy5yb3dIZWlnaHQpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbGVkUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ29udHJvbHMgc2Nyb2xsaW5nIHVwIGFuZCBkb3duIG9uZSB2aWV3cG9ydC4gV2hpY2ggb2NjdXJzIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBwYWdlIHVwIG9yIHBhZ2UgZG93blxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2aWV3cG9ydEhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSB2aWV3cG9ydCBpbiBwaXhlbHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGlyZWN0aW9uIFdoZXRoZXIgeW91IHdhbnQgdG8gcGFnZSB1cCBvciBkb3duXG4gICAgICovXG4gICAgcHVibGljIHBhZ2Uodmlld3BvcnRIZWlnaHQ6IG51bWJlciwgZGlyZWN0aW9uOiBcInVwXCIgfCBcImRvd25cIik6IHZvaWQge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09IFwidXBcIikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsVG9wKHRoaXMuc2Nyb2xsVG9wIC0gdmlld3BvcnRIZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsVG9wKHRoaXMuc2Nyb2xsVG9wICsgdmlld3BvcnRIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsZWRQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIC8qKipcbiAgICAgKiBAZGVzY3JpcHRpb24gU2V0cyB0aGUgdmlydHVhbFNjcm9sbFRvcCBlbnN1cmluZyBpdCBuZXZlciBleGNlZWRzIHRoZSBkb2N1bWVudCBib3VuZHNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmV3U2Nyb2xsVG9wIFRoZSBudW1iZXIgeW91J3JlIHRyeWluZyB0byBzZXQgdGhlIHZpcnR1YWwgc2Nyb2xsIHRvcCB0b1xuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlVmlydHVhbFNjcm9sbFRvcChuZXdTY3JvbGxUb3A6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNjcm9sbFRvcCA9IE1hdGgubWF4KDAsIG5ld1Njcm9sbFRvcCk7XG4gICAgICAgIG5ld1Njcm9sbFRvcCA9IHRoaXMuc2Nyb2xsVG9wO1xuICAgICAgICB0aGlzLnNjcm9sbFRvcCA9IE1hdGgubWluKG5ld1Njcm9sbFRvcCwgKCh0aGlzLnNjcm9sbEJhckhlaWdodCAtIHRoaXMuc2Nyb2xsVGh1bWJIZWlnaHQpICogdGhpcy5zY3JvbGxKdW1wKSArIHRoaXMucm93SGVpZ2h0KTtcbiAgICAgICAgV2ViVmlld1N0YXRlTWFuYWdlci5zZXRQcm9wZXJ0eShcInNjcm9sbF90b3BcIiwgdGhpcy5zY3JvbGxUb3ApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBSZXRyaWV2ZXMgdGhlIHBpeGVsIHZhbHVlIGF0IHRoZSB0b3Agb2YgdGhlIHZpZXdwb3J0XG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIHBpeGVsIHZhbHVlIG9mIHRoZSB2aXJ0dWFsIHZpZXdwb3J0IHRvcFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgdmlydHVhbFNjcm9sbFRvcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zY3JvbGxUb3A7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZXMgdGhlIHNjcm9sbCBwb3NpdGlvbiB0byBiZSB3aGF0ZXZlciB3YXMgc2F2ZWQgaW4gdGhlIHdlYnZpZXcgc3RhdGUuIFNob3VsZCBvbmx5IGJlIGNhbGxlZCBpZiB0aGUgdXNlciBoYXMgcmVsb2FkZWQgdGhlIHdlYnZpZXdcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVzeW5jU2Nyb2xsUG9zaXRpb24oKTogdm9pZCB7XG4gICAgICAgIC8vIElmIHdlIGhhZCBhIHByZXZpb3VzbHkgc2F2ZWQgc3RhdGUgd2hlbiBjcmVhdGluZyB0aGUgc2Nyb2xsYmFyIHdlIHNob3VsZCByZXN0b3JlIHRoZSBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgaWYgKFdlYlZpZXdTdGF0ZU1hbmFnZXIuZ2V0U3RhdGUoKSAmJiBXZWJWaWV3U3RhdGVNYW5hZ2VyLmdldFN0YXRlKCkuc2Nyb2xsX3RvcCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsVG9wKFdlYlZpZXdTdGF0ZU1hbmFnZXIuZ2V0U3RhdGUoKS5zY3JvbGxfdG9wKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsZWRQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFNjcm9sbHMgdG8gdGhlIGdpdmVuIG9mZnNldCBpZiBpdCdzIG91dHNpZGUgdGhlIHZpZXdwb3J0XG4gICAgICogQHBhcmFtIG9mZnNldCBUaGUgb2Zmc2V0IHRvIHNjcm9sbCB0byBcbiAgICAgKiBAcGFyYW0gZm9yY2UgV2hldGhlciBvciBub3QgeW91IHNob3VsZCBzY3JvbGwgZXZlbiBpZiBpdCdzIGluIHRoZSB2aWV3cG9ydFxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzY3JvbGxUb09mZnNldChvZmZzZXQ6IG51bWJlciwgZm9yY2U/OiBib29sZWFuKTogUHJvbWlzZTx2b2lkW10+IHtcbiAgICAgICAgLy8gaWYgdGhlc2UgYXJlIGVxdWFsIGl0IG1lYW5zIHRoZSBkb2N1bWVudCBpcyB0b28gc2hvcnQgdG8gc2Nyb2xsIGFueXdheXNcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsQmFySGVpZ2h0ID09PSB0aGlzLnNjcm9sbFRodW1iSGVpZ2h0KSByZXR1cm4gW107XG4gICAgICAgIGNvbnN0IHRvcE9mZnNldCA9IHZpcnR1YWxIZXhEb2N1bWVudC50b3BPZmZzZXQoKTtcbiAgICAgICAgLy8gRG9uJ3Qgc2Nyb2xsIGlmIGluIHRoZSB2aWV3cG9ydFxuICAgICAgICBpZiAoIWZvcmNlICYmIG9mZnNldCA+PSB0b3BPZmZzZXQgJiYgb2Zmc2V0IDw9IHZpcnR1YWxIZXhEb2N1bWVudC5ib3R0b21PZmZzZXQoKSkgcmV0dXJuIFtdO1xuICAgICAgICBjb25zdCByb3dEaWZmZXJlbmNlID0gTWF0aC5mbG9vcihNYXRoLmFicyhvZmZzZXQgLSB0b3BPZmZzZXQpIC8gMTYpO1xuICAgICAgICAvLyBUaGUgKzMvLTMgaXMgYmVjYXVzZSB0aGVyZSBpcyBiZWNhdXNlIHdlIHdhbnQgdGhlIHJlc3VsdCB0byBub3QgYmUgcHJlc3NlZCBhZ2FpbnN0IHRoZSB0b3BcbiAgICAgICAgaWYgKG9mZnNldCA+IHRvcE9mZnNldCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2Nyb2xsRG9jdW1lbnQocm93RGlmZmVyZW5jZSAtIDMsIFwiZG93blwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjcm9sbERvY3VtZW50KHJvd0RpZmZlcmVuY2UgKyAzLCBcInVwXCIpO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG5pbXBvcnQgeyBCeXRlRGF0YSB9IGZyb20gXCIuL2J5dGVEYXRhXCI7XG5cbi8vIEFzc29ydGVkIGhlbHBlciBmdW5jdGlvbnNcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gQ2xhc3Mgd2hpY2ggcmVwcmVzZW50cyBhIHJhbmdlIG9mIG51bWJlcnNcbiAqL1xuZXhwb3J0IGNsYXNzIFJhbmdlIHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgc3RhcnQ6IG51bWJlcjtcbiAgICBwdWJsaWMgcmVhZG9ubHkgZW5kOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ29uc3RydWN0cyBhIHJhbmdlIG9iamVjdCByZXByZXNlbnRpbmcgW3N0YXJ0LCBlbmRdIGluY2x1c2l2ZSBvZiBib3RoXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFJlcHJlc2VudHMgdGhlIHN0YXJ0IG9mIHRoZSByYW5nZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgUmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoZSByYW5nZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID4gZW5kKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gZW5kO1xuICAgICAgICAgICAgdGhpcy5lbmQgPSBzdGFydDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICAgICAgICAgIHRoaXMuZW5kID0gZW5kO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBkZXNjaXB0aW9uIFRlc3RzIGlmIHRoZSBnaXZlbiBudW1iZXIgaWYgd2l0aGluIHRoZSByYW5nZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW0gVGhlIG51bWJlciB0byB0ZXN0XG4gICAgICogQHJldHVybnMge2Jvb2xlYW4gfSBUcnVlIGlmIHRoZSBudW1iZXIgaXMgaW4gdGhlIHJhbmdlLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBiZXR3ZWVuKG51bTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmVuZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bSA+PSB0aGlzLnN0YXJ0ICYmIG51bSA8PSB0aGlzLmVuZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudW0gPj0gdGhpcy5zdGFydDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gQ2hlY2tzIGlmIHRoZSBnaXZlbiBudW1iZXIgaXMgaW4gYW55IG9mIHRoZSByYW5nZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gVGhlIG51bWJlciB0byB1c2Ugd2hlbiBjaGVja2luZyB0aGUgcmFuZ2VzXG4gKiBAcGFyYW0ge1JhbmdlW119IHJhbmdlcyBUaGUgcmFuZ2VzIHRvIGNoZWNrIHRoZSBudW1iZXIgYWdhaW5zdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIG51bWJlciBpcyBpbiBhbnkgb2YgdGhlIHJhbmdlcywgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoaW5BbnlSYW5nZShudW06IG51bWJlciwgcmFuZ2VzOiBSYW5nZVtdKTogYm9vbGVhbiB7XG4gICAgZm9yIChjb25zdCByYW5nZSBvZiByYW5nZXMpIHtcbiAgICAgICAgaWYgKHJhbmdlLmJldHdlZW4obnVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGEgbGlzdCBvZiByYW5nZXMgY29udGFpbmluZyB0aGUgbm9uIHJlbmRlcmFibGUgOCBiaXQgY2hhciBjb2Rlc1xuICogQHJldHVybnMge1JhbmdlW119IFRoZSByYW5nZXMgd2hpY2ggcmVwcmVzZW50IHRoZSBub24gcmVuZGVyYWJsZSA4IGJpdCBjaGFyIGNvZGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUNoYXJhY3RlclJhbmdlcygpOiBSYW5nZVtdIHtcbiAgICBjb25zdCByYW5nZXM6IFJhbmdlW10gPSBbXTtcbiAgICByYW5nZXMucHVzaChuZXcgUmFuZ2UoMCwgMzEpKTtcbiAgICByYW5nZXMucHVzaChuZXcgUmFuZ2UoMTI3LCAxNjApKTtcbiAgICByYW5nZXMucHVzaChuZXcgUmFuZ2UoMTczLCAxNzMpKTtcbiAgICByYW5nZXMucHVzaChuZXcgUmFuZ2UoMjU2KSk7XG4gICAgcmV0dXJuIHJhbmdlcztcbn1cblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhbiBvZmZzZXQgZ2V0cyBhbGwgc3BhbnMgd2l0aCB0aGF0IG9mZnNldFxuICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBUaGUgb2Zmc2V0IHRvIGZpbmQgZWxlbWVudHMgb2ZcbiAqIEByZXR1cm5zIHtIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50Pn0gcmV0dXJucyBhIGxpc3Qgb2YgSFRNTEVsZW1lbnRzIHdoaWNoIGhhdmUgdGhlIGdpdmVuIG9mZnNldFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQob2Zmc2V0OiBudW1iZXIpOiBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PiB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYGNlbGwtb2Zmc2V0LSR7b2Zmc2V0fWApIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhbiBlbGVtZW50IHJldHVybnMgaXRzIG9mZnNldCBvciBOYU4gaWYgaXQgZG9lc24ndCBoYXZlIG9uZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byBnZXQgdGhlIG9mZnNldCBvZlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgb2Zmc2V0IG9mIHRoZSBlbGVtZW50IG9yIE5hTlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudHNPZmZzZXQoZWxlbWVudDogRWxlbWVudCk6IG51bWJlciB7XG4gICAgZm9yIChjb25zdCBjdXJyZW50Q2xhc3Mgb2YgZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRDbGFzcy5pbmRleE9mKFwiY2VsbC1vZmZzZXRcIikgIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBwYXJzZUludChjdXJyZW50Q2xhc3MucmVwbGFjZShcImNlbGwtb2Zmc2V0LVwiLCBcIlwiKSk7XG4gICAgICAgICAgICByZXR1cm4gb2Zmc2V0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBOYU47XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFJldHVybnMgdGhlIGVsZW1lbnRzIHdpdGggdGhlIHNhbWUgb2Zmc2V0IGFzIHRoZSBvbmUgY2xpY2tlZFxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCBUaGUgZXZlbnQgd2hpY2ggaXMgaGFuZGVkIHRvIGEgbW91c2UgZXZlbnQgbGlzdGVuZXJcbiAqIEByZXR1cm5zIHtIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+IHwgQXJyYXk8RWxlbWVudD59IFRoZSBlbGVtZW50cyB3aXRoIHRoZSBzYW1lIG9mZnNldCBhcyB0aGUgY2xpY2tlZCBlbGVtZW50LCBvciB1bmRlZmluZWQgaWYgbm9uZSBjb3VsZCBiZSByZXRyaWV2ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1lbnRzR2l2ZW5Nb3VzZUV2ZW50KGV2ZW50OiBNb3VzZUV2ZW50KTogSFRNTENvbGxlY3Rpb25PZjxFbGVtZW50PiB8IEFycmF5PEVsZW1lbnQ+IHtcbiAgICBpZiAoIWV2ZW50IHx8ICFldmVudC50YXJnZXQpIHJldHVybiBbXTtcbiAgICBjb25zdCBob3ZlcmVkID0gZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQ7XG4gICAgcmV0dXJuIGdldEVsZW1lbnRzV2l0aEdpdmVuT2Zmc2V0KGdldEVsZW1lbnRzT2Zmc2V0KGhvdmVyZWQpKTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gR2l2ZW4gYSBieXRlZGF0YSBvYmplY3QgdXBkYXRlcyB0aGUgYXNjaWkgZWxlbWVudCB3aXRoIHRoZSBjb3JyZWN0IGRlY29kZWQgdGV4dFxuICogQHBhcmFtIHtCeXRlRGF0YX0gYnl0ZURhdGEgVGhlIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGEgZ2l2ZW4gYnl0ZVxuICogQHBhcmFtIHtIVE1MU3BhbkVsZW1lbnR9IGFzY2lpRWxlbWVudCBUaGUgZGVjb2RlZCB0ZXh0IGVsZW1lbnQgb24gdGhlIERPTVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQXNjaWlWYWx1ZShieXRlRGF0YTogQnl0ZURhdGEsIGFzY2lpRWxlbWVudDogSFRNTFNwYW5FbGVtZW50KTogdm9pZCB7XG4gICAgYXNjaWlFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJub25ncmFwaGljXCIpO1xuICAgIC8vIElmIGl0J3Mgc29tZSBzb3J0IG9mIGNoYXJhY3RlciB3ZSBjYW5ub3QgcmVuZGVyIHdlIGp1c3QgcmVwcmVzZW50IGl0IGFzIGEgcGVyaW9kIHdpdGggdGhlIG5vZ3JhcGhpYyBjbGFzc1xuICAgIGlmICh3aXRoaW5BbnlSYW5nZShieXRlRGF0YS50bzhiaXRVSW50KCksIGdlbmVyYXRlQ2hhcmFjdGVyUmFuZ2VzKCkpKSB7XG4gICAgICAgIGFzY2lpRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibm9uZ3JhcGhpY1wiKTtcbiAgICAgICAgYXNjaWlFbGVtZW50LmlubmVyVGV4dCA9IFwiLlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGFzY2lpX2NoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVEYXRhLnRvOGJpdFVJbnQoKSk7XG4gICAgICAgIGFzY2lpRWxlbWVudC5pbm5lclRleHQgPSBhc2NpaV9jaGFyO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhIHN0cmluZyAwIHBhZHMgaXQgdXAgdW5pdGwgdGhlIHN0cmluZyBpcyBvZiBsZW5ndGggd2lkdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBudW1iZXIgVGhlIG51bWJlciB5b3Ugd2FudCB0byAwIHBhZCAoaXQncyBhIHN0cmluZyBhcyB5b3UncmUgMCBwYWRkaW5nIGl0IHRvIGRpc3BsYXkgaXQsIG5vdCB0byBkbyBhcml0aG1ldGljKVxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIFRoZSBsZW5ndGggb2YgdGhlIGZpbmFsIHN0cmluZyAoaWYgc21hbGxlciB0aGFuIHRoZSBzdHJpbmcgcHJvdmlkZWQgbm90aGluZyBoYXBwZW5zKVxuICogQHJldHVybnMge3N0cmluZ30gVGhlIG5ld2x5IHBhZGRlZCBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhZChudW1iZXI6IHN0cmluZywgd2lkdGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgbnVtYmVyID0gbnVtYmVyICsgXCJcIjtcbiAgICByZXR1cm4gbnVtYmVyLmxlbmd0aCA+PSB3aWR0aCA/IG51bWJlciA6IG5ldyBBcnJheSh3aWR0aCAtIG51bWJlci5sZW5ndGggKyAxKS5qb2luKFwiMFwiKSArIG51bWJlcjtcbn1cblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBHaXZlbiB0d28gZWxlbWVudHMgKHRoZSBoZXggYW5kIGFzY2lpIGVsZW1lbnRzKSwgcmV0dXJucyBhIEJ5dGVEYXRhIG9iamVjdCByZXByZXNlbnRpbmcgYm90aCBvZiB0aGVtXG4gKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9uT2Y8RWxlbWVudD59IGVsZW1lbnRzIFRoZSBlbGVtZW50cyByZXByZXNlbnRpbmcgdGhlIGhleCBhbmQgYXNzb2NpYXRlZCBhc2NpaSBvbiB0aGUgRE9NXG4gKiBAcmV0dXJucyB7Qnl0ZURhdGEgfCB1bmRlZmluZWR9IFRoZSBCeXRlRGF0YSBvYmplY3Qgb3IgdW5kZWZpbmVkIGlmIGVsZW1lbnRzIHdhcyBtYWxmb3JtZWQgb3IgZW1wdHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJldHJpZXZlU2VsZWN0ZWRCeXRlT2JqZWN0KGVsZW1lbnRzOiBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+KTogQnl0ZURhdGEgfCB1bmRlZmluZWQge1xuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBBcnJheS5mcm9tKGVsZW1lbnRzKSkge1xuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGV4XCIpKSB7XG4gICAgICAgICAgICBjb25zdCBieXRlX29iamVjdCA9IG5ldyBCeXRlRGF0YShwYXJzZUludChlbGVtZW50LmlubmVySFRNTCwgMTYpKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50X2VsZW1lbnQgPSBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZyB8fCBlbGVtZW50LnBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nPy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50X2VsZW1lbnQgfHwgY3VycmVudF9lbGVtZW50LmlubmVySFRNTCA9PT0gXCIrXCIpIGJyZWFrO1xuICAgICAgICAgICAgICAgIGJ5dGVfb2JqZWN0LmFkZEFkamFjZW50Qnl0ZShuZXcgQnl0ZURhdGEocGFyc2VJbnQoY3VycmVudF9lbGVtZW50LmlubmVySFRNTCwgMTYpKSk7XG4gICAgICAgICAgICAgICAgY3VycmVudF9lbGVtZW50ID0gY3VycmVudF9lbGVtZW50Lm5leHRFbGVtZW50U2libGluZyB8fCBjdXJyZW50X2VsZW1lbnQucGFyZW50RWxlbWVudD8ubmV4dEVsZW1lbnRTaWJsaW5nPy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBieXRlX29iamVjdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm47XG59XG4vKipcbiAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhIHN0YXJ0IGFuZCBlbmQgb2Zmc2V0IGNyZWF0ZXMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIG9mZnNldHMgaW4gYmV0d2VlbiwgaW5jbHVzaXZlIG9mIHN0YXJ0IGFuZCBlbmRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydE9mZnNldCBUaGUgb2Zmc2V0IHdoaWNoIGRlZmluZXMgdGhlIHN0YXJ0IG9mIHRoZSByYW5nZVxuICogQHBhcmFtIHtudW1iZXJ9IGVuZE9mZnNldCBUaGUgb2Zmc2V0IHdoaWNoIGRlZmluZXMgdGhlIGVuZCBvZiB0aGUgcmFuZ2VcbiAqIEByZXR1cm5zIHtudW1iZXJbXX0gVGhlIHJhbmdlIFtzdGFydE9mZnNldCwgZW5kT2Zmc2V0XVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT2Zmc2V0UmFuZ2Uoc3RhcnRPZmZzZXQ6IG51bWJlciwgZW5kT2Zmc2V0OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgY29uc3Qgb2Zmc2V0c1RvU2VsZWN0ID0gW107XG4gICAgLy8gV2UgZmxpcCB0aGVtIHNvIHRoYXQgdGhlIGZvciBsb29wIGNyZWF0ZXMgdGhlIHJhbmdlIGNvcnJlY3RseVxuICAgIGlmIChlbmRPZmZzZXQgPCBzdGFydE9mZnNldCkge1xuICAgICAgICBjb25zdCB0ZW1wID0gZW5kT2Zmc2V0O1xuICAgICAgICBlbmRPZmZzZXQgPSBzdGFydE9mZnNldDtcbiAgICAgICAgc3RhcnRPZmZzZXQgPSB0ZW1wO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgYW4gYXJyYXkgb2Ygb2Zmc2V0cyB3aXRoIGV2ZXJ5dGhpbmcgYmV0d2VlbiB0aGUgbGFzdCBzZWxlY3RlZCBlbGVtZW50IGFuZCB3aGF0IHRoZSB1c2VyIGhpdCBzaGlmdFxuICAgIGZvciAobGV0IGkgPSBzdGFydE9mZnNldDsgaSA8PSBlbmRPZmZzZXQ7IGkrKykge1xuICAgICAgICBvZmZzZXRzVG9TZWxlY3QucHVzaChpKTtcbiAgICB9XG4gICAgcmV0dXJuIG9mZnNldHNUb1NlbGVjdDtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gQ29udmVydHMgYSBoZXggcXVlcnkgdG8gYSBzdHJpbmcgYXJyYXkgaWdub3Jpbmcgc3BhY2VzLCBpZiBub3QgZXZlbmx5IGRpdmlzaWJsZSB3ZSBhcHBlbmQgYSBsZWFkaW5nIDAgXG4gKiBpLmUgQSAtPiAwQVxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IFRoZSBxdWVyeSB0byBjb252ZXJ0IHRvIGFuIGFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoZXhRdWVyeVRvQXJyYXkocXVlcnk6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBsZXQgY3VycmVudENoYXJhY3RlclNlcXVlbmNlID0gXCJcIjtcbiAgICBjb25zdCBxdWVyeUFycmF5OiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHF1ZXJ5W2ldID09PSBcIiBcIikgY29udGludWU7XG4gICAgICAgIGN1cnJlbnRDaGFyYWN0ZXJTZXF1ZW5jZSArPSBxdWVyeVtpXTtcbiAgICAgICAgaWYgKGN1cnJlbnRDaGFyYWN0ZXJTZXF1ZW5jZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHF1ZXJ5QXJyYXkucHVzaChjdXJyZW50Q2hhcmFjdGVyU2VxdWVuY2UpO1xuICAgICAgICAgICAgY3VycmVudENoYXJhY3RlclNlcXVlbmNlID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoY3VycmVudENoYXJhY3RlclNlcXVlbmNlLmxlbmd0aCA+IDApICB7XG4gICAgICAgIHF1ZXJ5QXJyYXkucHVzaChcIjBcIiArIGN1cnJlbnRDaGFyYWN0ZXJTZXF1ZW5jZSk7XG4gICAgfVxuICAgIHJldHVybiBxdWVyeUFycmF5O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBHaXZlbiB0d28gc29ydGVkIGNvbGxlY3Rpb25zIG9mIG51bWJlcnMsIHJldHVybnMgdGhlIHVuaW9uXG4gKiBiZXR3ZWVuIHRoZW0gKE9SKS5cbiAqIEBwYXJhbSB7bnVtYmVyW119IG9uZSBUaGUgZmlyc3Qgc29ydGVkIGFycmF5IG9mIG51bWJlcnNcbiAqIEBwYXJhbSB7bnVtYmVyW119IG90aGVyIFRoZSBvdGhlciBzb3J0ZWQgYXJyYXkgb2YgbnVtYmVyc1xuICogQHJldHVybnMge251bWJlcltdfSBBIHNvcnRlZCBjb2xsZWN0aW9ucyBvZiBudW1iZXJzIHJlcHJlc2VudGluZyB0aGUgdW5pb24gKE9SKVxuICogYmV0d2VlbiB0byBzb3J0ZWQgY29sbGVjdGlvbnMgb2YgbnVtYmVyc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzanVuY3Rpb24ob25lOiBudW1iZXJbXSwgb3RoZXI6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcbiAgICBsZXQgaSA9IDAsIGogPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBvbmUubGVuZ3RoIHx8IGogPCBvdGhlci5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGkgPj0gb25lLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gob3RoZXJbaisrXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaiA+PSBvdGhlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9uZVtpKytdKTtcbiAgICAgICAgfSBlbHNlIGlmIChvbmVbaV0gPT09IG90aGVyW2pdKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChvbmVbaV0pO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSBpZiAob25lW2ldIDwgb3RoZXJbal0pIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9uZVtpKytdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG90aGVyW2orK10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gR2l2ZW4gdHdvIHNvcnRlZCBjb2xsZWN0aW9ucyBvZiBudW1iZXJzLCByZXR1cm5zIHRoZSByZWxhdGl2ZVxuICogY29tcGxlbWVudCBiZXR3ZWVuIHRoZW0gKFhPUikuXG4gKiBAcGFyYW0ge251bWJlcltdfSBvbmUgVGhlIGZpcnN0IHNvcnRlZCBhcnJheSBvZiBudW1iZXJzXG4gKiBAcGFyYW0ge251bWJlcltdfSBvdGhlciBUaGUgb3RoZXIgc29ydGVkIGFycmF5IG9mIG51bWJlcnNcbiAqIEByZXR1cm5zIHtudW1iZXJbXX0gQSBzb3J0ZWQgY29sbGVjdGlvbnMgb2YgbnVtYmVycyByZXByZXNlbnRpbmcgdGhlIGNvbXBsZW1lbnQgKFhPUilcbiAqIGJldHdlZW4gdG8gc29ydGVkIGNvbGxlY3Rpb25zIG9mIG51bWJlcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbGF0aXZlQ29tcGxlbWVudChvbmU6IG51bWJlcltdLCBvdGhlcjogbnVtYmVyW10pOiBudW1iZXJbXSB7XG4gICAgY29uc3QgcmVzdWx0OiBudW1iZXJbXSA9IFtdO1xuICAgIGxldCBpID0gMCwgaiA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IG9uZS5sZW5ndGggfHwgaiA8IG90aGVyLmxlbmd0aCkge1xuICAgICAgICBpZiAoaSA+PSBvbmUubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChvdGhlcltqKytdKTtcbiAgICAgICAgfSBlbHNlIGlmIChqID49IG90aGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gob25lW2krK10pO1xuICAgICAgICB9IGVsc2UgaWYgKG9uZVtpXSA9PT0gb3RoZXJbal0pIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2UgaWYgKG9uZVtpXSA8IG90aGVyW2pdKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChvbmVbaSsrXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChvdGhlcltqKytdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFNlYXJjaGVzIGEga2V5IGVsZW1lbnQgaW5zaWRlIGEgc29ydGVkIGFycmF5LlxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7VFtdfSBhcnJheSBUaGUgc29ydGVkIGFycmF5IHRvIHNlYXJjaCBpblxuICogQHBhcmFtIHtUfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yIGluIHRoZSBzb3J0ZWQgYXJyYXlcbiAqIEBwYXJhbSB7Y29tcGFyYXRvckNhbGxiYWNrfSBjb21wYXJhdG9yIFRoZSBjb21wYXJhdG9yIGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgYXQgd2hpY2ggYSBnaXZlbiBlbGVtZW50IGNhbiBiZSBmb3VuZCBpbiB0aGUgYXJyYXksIG9yIGEgbmVnYXRpdmUgdmFsdWUgaWYgaXQgaXMgbm90IHByZXNlbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmFyeVNlYXJjaDxUPihhcnJheTogUmVhZG9ubHlBcnJheTxUPiwga2V5OiBULCBjb21wYXJhdG9yOiAob3AxOiBULCBvcDI6IFQpID0+IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IGxvdyA9IDAsXG4gICAgICAgIGhpZ2ggPSBhcnJheS5sZW5ndGggLSAxO1xuXG4gICAgd2hpbGUgKGxvdyA8PSBoaWdoKSB7XG4gICAgICAgIGNvbnN0IG1pZCA9ICgobG93ICsgaGlnaCkgLyAyKSB8IDA7XG4gICAgICAgIGNvbnN0IGNvbXAgPSBjb21wYXJhdG9yKGFycmF5W21pZF0sIGtleSk7XG4gICAgICAgIGlmIChjb21wIDwgMCkge1xuICAgICAgICAgICAgbG93ID0gbWlkICsgMTtcbiAgICAgICAgfSBlbHNlIGlmIChjb21wID4gMCkge1xuICAgICAgICAgICAgaGlnaCA9IG1pZCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbWlkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtKGxvdyArIDEpO1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcblxuaW1wb3J0IHsgQnl0ZURhdGEgfSBmcm9tIFwiLi9ieXRlRGF0YVwiO1xuaW1wb3J0IHsgZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQsIHVwZGF0ZUFzY2lpVmFsdWUsIHBhZCwgY3JlYXRlT2Zmc2V0UmFuZ2UsIHJldHJpZXZlU2VsZWN0ZWRCeXRlT2JqZWN0LCBnZXRFbGVtZW50c09mZnNldCB9IGZyb20gXCIuL3V0aWxcIjtcbmltcG9ydCB7IHRvZ2dsZUhvdmVyLCBjaGFuZ2VFbmRpYW5uZXNzIH0gZnJvbSBcIi4vZXZlbnRIYW5kbGVyc1wiO1xuaW1wb3J0IHsgY2h1bmtIYW5kbGVyLCB2aXJ0dWFsSGV4RG9jdW1lbnQgfSBmcm9tIFwiLi9oZXhFZGl0XCI7XG5pbXBvcnQgeyBTY3JvbGxCYXJIYW5kbGVyIH0gZnJvbSBcIi4vc3JvbGxCYXJIYW5kbGVyXCI7XG5pbXBvcnQgeyBFZGl0SGFuZGxlciwgRWRpdE1lc3NhZ2UgfSBmcm9tIFwiLi9lZGl0SGFuZGxlclwiO1xuaW1wb3J0IHsgV2ViVmlld1N0YXRlTWFuYWdlciB9IGZyb20gXCIuL3dlYnZpZXdTdGF0ZU1hbmFnZXJcIjtcbmltcG9ydCB7IFNlbGVjdEhhbmRsZXIgfSBmcm9tIFwiLi9zZWxlY3RIYW5kbGVyXCI7XG5pbXBvcnQgeyBTZWFyY2hIYW5kbGVyIH0gZnJvbSBcIi4vc2VhcmNoSGFuZGxlclwiO1xuaW1wb3J0IHsgcG9wdWxhdGVEYXRhSW5zcGVjdG9yIH0gZnJvbSBcIi4vZGF0YUluc3BlY3RvclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZpcnR1YWxpemVkUGFja2V0IHtcbiAgICBvZmZzZXQ6IG51bWJlcjtcbiAgICBkYXRhOiBCeXRlRGF0YTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB0aGUgcHJlc2VudGF0aW9uIGxheWVyIHZpcnR1YWxpemluZyB0aGUgaGV4IGRvY3VtZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBWaXJ0dWFsRG9jdW1lbnQge1xuICAgIHByaXZhdGUgZmlsZVNpemU6IG51bWJlcjtcbiAgICBwcml2YXRlIGJhc2VBZGRyZXNzOiBudW1iZXI7XG4gICAgcHJpdmF0ZSByb3dIZWlnaHQ6IG51bWJlcjtcbiAgICBwdWJsaWMgcmVhZG9ubHkgZG9jdW1lbnRIZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIHZpZXdQb3J0SGVpZ2h0ITogbnVtYmVyXG4gICAgcHJpdmF0ZSBoZXhBZGRyUGFkZGluZzogbnVtYmVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc2Nyb2xsQmFySGFuZGxlcjogU2Nyb2xsQmFySGFuZGxlcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVkaXRIYW5kbGVyOiBFZGl0SGFuZGxlcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlbGVjdEhhbmRsZXI6IFNlbGVjdEhhbmRsZXI7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzZWFyY2hIYW5kbGVyOiBTZWFyY2hIYW5kbGVyO1xuICAgIHByaXZhdGUgcm93czogTWFwPHN0cmluZywgSFRNTERpdkVsZW1lbnQ+W107XG4gICAgcHJpdmF0ZSByZWFkb25seSBlZGl0b3JDb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIENvbnN0cnVjdHMgYSBWaXJ0dWFsRG9jdW1lbnQgZm9yIGEgZmlsZSBvZiBhIGdpdmVuIHNpemUuIEFsc28gaGFuZGxlcyB0aGUgaW5pdGlhbCBET00gbGF5b3V0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZpbGVTaXplIFRoZSBzaXplLCBpbiBieXRlcywgb2YgdGhlIGZpbGUgd2hpY2ggaXMgYmVpbmcgZGlzcGxheWVkXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZmlsZVNpemU6IG51bWJlciwgYmFzZUFkZHJlc3MgPSAwKSB7XG4gICAgICAgIHRoaXMuZmlsZVNpemUgPSBmaWxlU2l6ZTtcbiAgICAgICAgdGhpcy5iYXNlQWRkcmVzcyA9IGJhc2VBZGRyZXNzO1xuICAgICAgICB0aGlzLmVkaXRIYW5kbGVyID0gbmV3IEVkaXRIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0SGFuZGxlciA9IG5ldyBTZWxlY3RIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMuc2VhcmNoSGFuZGxlciA9IG5ldyBTZWFyY2hIYW5kbGVyKCk7XG4gICAgICAgIC8vIFRoaXMgaG9sZHMgdGhlIDMgbWFpbiBjb2x1bW5zIHJvd3MgKGhleGFkZHIsIGhleGJvZHksIGFzY2lpKVxuICAgICAgICB0aGlzLnJvd3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucm93cy5wdXNoKG5ldyBNYXA8c3RyaW5nLCBIVE1MRGl2RWxlbWVudD4oKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UgY3JlYXRlIGVsZW1lbnRzIGFuZCBwbGFjZSB0aGVtIG9uIHRoZSBET00gYmVmb3JlIHJlbW92aW5nIHRoZW0gdG8gZ2V0IGhlaWdodHMgYW5kIHdpZHRocyBvZiByb3dzIHRvIHNldHVwIGxheW91dCBjb3JyZWN0bHlcbiAgICAgICAgY29uc3QgYXNjaWkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFzY2lpXCIpITtcbiAgICAgICAgY29uc3QgaGV4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXhib2R5XCIpITtcbiAgICAgICAgY29uc3QgaGV4YWRkciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGV4YWRkclwiKSE7XG4gICAgICAgIGNvbnN0IG9sZEhleEFkZHJIdG1sID0gaGV4YWRkci5pbm5lckhUTUw7XG4gICAgICAgIGNvbnN0IG9sZEhleEh0bWwgPSBoZXguaW5uZXJIVE1MO1xuICAgICAgICBjb25zdCBvbGRBc2NpaUh0bWwgPSBhc2NpaS5pbm5lckhUTUw7XG4gICAgICAgIC8vIFdlIGhhdmUgdG8gc2V0IHRoZSBhc2NpaSBjb2x1bW5zIHdpZHRoIHRvIGJlIGxhcmdlIGJlZm9yZSBhcHBlbmRpbmcgdGhlIGFzY2lpIG9yIGVsc2UgaXQgd3JhcHMgYW5kIG1lc3NlcyB1cCB0aGUgd2lkdGggY2FsY3VsYXRpb25cbiAgICAgICAgLy8gVGhpcyBpcyBhIGNoYW5nZSBpbiB0aGUgbmV4dCBnZW4gbGF5b3V0IGVuZ2luZVxuICAgICAgICBhc2NpaS5zdHlsZS53aWR0aCA9IFwiNTAwcHhcIjtcbiAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29uc3QgYXNjaWlSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBoZXhBZGRyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaGV4QWRkclJvdy5jbGFzc05hbWUgPSBcInJvd1wiO1xuICAgICAgICBhc2NpaVJvdy5jbGFzc05hbWUgPSBcInJvd1wiO1xuICAgICAgICByb3cuY2xhc3NOYW1lID0gXCJyb3dcIjtcbiAgICAgICAgLy8gRm9yIGFzY2lpIHdlIHdhbnQgdG8gdGVzdCBtb3JlIHRoYW4ganVzdCBvbmUgY2hhcmFjdGVyIGFzIHNvbWV0aW1lcyB0aGF0IGRvZXNuJ3Qgc2V0IHRoZSB3aWR0aCBjb3JyZWN0bHlcbiAgICAgICAgY29uc3QgYXNjaWlUZXN0U3RyaW5nID0gXCJUZXN0aW5nIFN0cmluZyEhXCI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaGV4X2VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgIGNvbnN0IGFzY2lpX2VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgIGhleF9lbGVtZW50LmlubmVyVGV4dCA9IFwiRkZcIjtcbiAgICAgICAgICAgIGFzY2lpX2VsZW1lbnQuaW5uZXJUZXh0ID0gYXNjaWlUZXN0U3RyaW5nW2ldO1xuICAgICAgICAgICAgYXNjaWlSb3cuYXBwZW5kQ2hpbGQoYXNjaWlfZWxlbWVudCk7XG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoaGV4X2VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGhleEFkZHJSb3cuaW5uZXJUZXh0ID0gXCIwMDAwMDAwMFwiO1xuICAgICAgICByb3cuc3R5bGUudG9wID0gXCIwcHhcIjtcbiAgICAgICAgYXNjaWlSb3cuc3R5bGUudG9wID0gXCIwcHhcIjtcbiAgICAgICAgaGV4LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAgIGhleGFkZHIuYXBwZW5kQ2hpbGQoaGV4QWRkclJvdyk7XG4gICAgICAgIGFzY2lpLmFwcGVuZENoaWxkKGFzY2lpUm93KTtcblxuICAgICAgICBjb25zdCBzcGFucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3BhblwiKTtcbiAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBzcGFuc1sxNl0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAvLyBVdGlsaXplIHRoZSBmYWtlIHJvd3MgdG8gZ2V0IHRoZSB3aWR0aHMgb2YgdGhlbSBhbmQgYWx0ZXIgdGhlIHdpZHRocyBvZiB0aGUgaGVhZGVycyBldGMgdG8gZml0XG4gICAgICAgIC8vIFRoZSBwbHVzIG9uZSBpcyBiZWNhdXNlIHRoZSBuZXcgbGF5b3V0IGVuZ2luZSBpbiBjaHJvbWUgd291bGQgd3JhcCB0aGUgdGV4dCBvdGhlcndpc2Ugd2hpY2ggSSdtIHVuc3VyZSB3aHlcbiAgICAgICAgY29uc3QgYXNjaWlSb3dXaWR0aCA9IGFzY2lpUm93Lm9mZnNldFdpZHRoICsgMTtcbiAgICAgICAgY29uc3QgaGV4Um93V2lkdGggPSBzcGFuc1sxNl0ucGFyZW50RWxlbWVudCEub2Zmc2V0V2lkdGg7XG4gICAgICAgIC8vIENhbGN1bGF0ZSBkb2N1bWVudCBoZWlnaHQsIHdlIG1heCBvdXQgYXQgNTAwayBkdWUgdG8gYnJvd3NlciBsaW1pdGF0aW9ucyBvbiBsYXJnZSBkaXZcbiAgICAgICAgdGhpcy5kb2N1bWVudEhlaWdodCA9IDUwMDAwMDtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBwYWRkaW5nIG5lZWRlZCB0byBtYWtlIHRoZSBvZmZzZXQgY29sdW1uIHJpZ2h0IGFsaWduZWRcbiAgICAgICAgdGhpcy5oZXhBZGRyUGFkZGluZyA9IGhleEFkZHJSb3cucGFyZW50RWxlbWVudCEuY2xpZW50V2lkdGggLSBoZXhBZGRyUm93LmNsaWVudFdpZHRoO1xuXG5cbiAgICAgICAgLy8gV2Ugc2V0IHRoZSBkb2N1bWVudCBiYWNrIHRvIGl0cyBvcmlnaW5hbCBzdGF0ZVxuICAgICAgICBoZXguaW5uZXJIVE1MID0gb2xkSGV4SHRtbDtcbiAgICAgICAgYXNjaWkuaW5uZXJIVE1MID0gb2xkQXNjaWlIdG1sO1xuICAgICAgICBoZXhhZGRyLmlubmVySFRNTCA9IG9sZEhleEFkZHJIdG1sO1xuXG4gICAgICAgIC8vIFNldHMgdGhlIGNvbHVtbnMgaGVpZ2h0cyBmb3Igc3RpY2t5IHNjcm9sbGluZyB0byB3b3JrXG4gICAgICAgIGNvbnN0IGNvbHVtbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29sdW1uXCIpIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+O1xuICAgICAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2x1bW5zKSB7XG4gICAgICAgICAgICBjb2x1bW4uc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5kb2N1bWVudEhlaWdodH1weGA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEdWUgdG8gYWJzb2x1dGUgcG9zaXRpb25pbmcgb24gdGhlIGVkaXRvciBwb3NpdGlvbiB3ZSBoYXZlIHRvIHNldCBhIGxvdCBvZiBzaXplcyBvdXJzZWx2ZXMgYXMgdGhlIGVsZW1lbnRzIGFyZSBub3QgcGFydCBvZiB0aGUgZG9jdW1lbnQgZmxvd1xuICAgICAgICBjb25zdCByb3dXcmFwcGVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyb3d3cmFwcGVyXCIpIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTERpdkVsZW1lbnQ+O1xuICAgICAgICAvLyBTZXRzIHRoZSBoZXhhZGRyIGNvbHVtbiB0byB0aGUgc2FtZSB3aWR0aCBhcyBpdHMgaGVhZGVyICggdGhlICsgMSBpcyBuZWVkZWQgdG8gKVxuICAgICAgICByb3dXcmFwcGVyc1swXS5zdHlsZS53aWR0aCA9IGAkeyhkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaGVhZGVyXCIpWzBdIGFzIEhUTUxFbGVtZW50KS5vZmZzZXRXaWR0aH1weGA7XG4gICAgICAgIC8vIFdlIHJlbW92ZSB0aGUgdGV4dCBmcm9tIHRoZSBoZWFkZXIgdG8gbWFrZSBpdCBsb29rIGxpa2UgaXQncyBub3QgdGhlcmVcbiAgICAgICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoZWFkZXJcIilbMF0gYXMgSFRNTEVsZW1lbnQpLm9mZnNldEhlaWdodDtcbiAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoZWFkZXJcIilbMF0gYXMgSFRNTEVsZW1lbnQpLmlubmVyVGV4dCA9IFwiXCI7XG4gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaGVhZGVyXCIpWzBdIGFzIEhUTUxFbGVtZW50KS5zdHlsZS53aWR0aCA9IGAke3Jvd1dyYXBwZXJzWzBdLnN0eWxlLndpZHRofXB4YDtcbiAgICAgICAgLy8gVGhlIHBsdXMgb25lIGlzIHRvIGFjY291bnQgZm9yIGFsbCBvdGhlciBoZWFkZXJzIGhhdmluZyBib3JkZXJzXG4gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaGVhZGVyXCIpWzBdIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5oZWlnaHQgPSBgJHtoZWFkZXJIZWlnaHQgKyAxfXB4YDtcbiAgICAgICAgcm93V3JhcHBlcnNbMF0uc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5kb2N1bWVudEhlaWdodH1weGA7XG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIGhleCBzZWN0aW9uXG4gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaGVhZGVyXCIpWzFdIGFzIEhUTUxFbGVtZW50KS5zdHlsZS53aWR0aCA9IGAke2hleFJvd1dpZHRofXB4YDtcbiAgICAgICAgcm93V3JhcHBlcnNbMV0uc3R5bGUud2lkdGggPSBgJHtoZXhSb3dXaWR0aH1weGA7XG4gICAgICAgIHJvd1dyYXBwZXJzWzFdLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuZG9jdW1lbnRIZWlnaHR9cHhgO1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSBhc2NpaSAgc2VjdGlvblxuICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhlYWRlclwiKVsyXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUud2lkdGggPSBgJHthc2NpaVJvd1dpZHRofXB4YDtcbiAgICAgICAgcm93V3JhcHBlcnNbMl0uc3R5bGUud2lkdGggPSBgJHthc2NpaVJvd1dpZHRofXB4YDtcbiAgICAgICAgcm93V3JhcHBlcnNbMl0uc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5kb2N1bWVudEhlaWdodH1weGA7XG5cbiAgICAgICAgLy8gQ3JlYXRlcyB0aGUgc2Nyb2xsQmFyIEhhbmRsZXJcbiAgICAgICAgdGhpcy5zY3JvbGxCYXJIYW5kbGVyID0gbmV3IFNjcm9sbEJhckhhbmRsZXIoXCJzY3JvbGxiYXJcIiwgdGhpcy5maWxlU2l6ZSAvIDE2LCB0aGlzLnJvd0hlaWdodCk7XG4gICAgICAgIC8vIEludGlhbGl6ZXMgYSBmZXcgdGhpbmdzIHN1Y2ggYXMgdmlld3BvcnQgc2l6ZSBhbmQgdGhlIHNjcm9sbGJhciBwb3NpdGlvbnNcbiAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZSgpO1xuXG4gICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0b3ItY29udGFpbmVyXCIpITtcbiAgICAgICAgLy8gQmluZCB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIC8vIFdpbGwgbmVlZCB0byByZWZhY3RvciB0aGlzIHNlY3Rpb24gc29vbiBhcyBpdHMgZ2V0dGluZyBwcmV0dHkgbWVzc3lcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbmRpYW5uZXNzXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGNoYW5nZUVuZGlhbm5lc3MpO1xuICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmVkaXRvcktleUJvYXJkSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5lZGl0b3JDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCB0b2dnbGVIb3Zlcik7XG4gICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRvZ2dsZUhvdmVyKTtcblxuICAgICAgICAvLyBFdmVudCBoYW5kbGVzIHRvIGhhbmRsZSB3aGVuIHRoZSB1c2VyIGRyYWdzIHRvIGNyZWF0ZSBhIHNlbGVjdGlvblxuICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY29weVwiLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudD8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGV4XCIpIHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ/LmNsYXNzTGlzdC5jb250YWlucyhcImFzY2lpXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0SGFuZGxlci5jb3B5KGV2ZW50IGFzIENsaXBib2FyZEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFzdGVcIiwgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ/LmNsYXNzTGlzdC5jb250YWlucyhcImhleFwiKSB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50Py5jbGFzc0xpc3QuY29udGFpbnMoXCJhc2NpaVwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdEhhbmRsZXIucGFzdGUoZXZlbnQgYXMgQ2xpcGJvYXJkRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5kb2N1bWVudFJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMud2luZG93S2V5Ym9hcmRIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW5kZXJzIHRoZSBuZXdseSBwcm92aWRlZCBwYWNrZXRzIG9udG8gdGhlIERPTVxuICAgICAqIEBwYXJhbSB7VmlydHVhbGl6ZWRQYWNrZXRbXX0gbmV3UGFja2V0cyB0aGUgcGFja2V0cyB3aGljaCB3aWxsIGJlIHJlbmRlcmVkXG4gICAgICovXG4gICAgcHVibGljIHJlbmRlcihuZXdQYWNrZXRzOiBWaXJ0dWFsaXplZFBhY2tldFtdKTogdm9pZCB7XG4gICAgICAgIGxldCByb3dEYXRhOiBWaXJ0dWFsaXplZFBhY2tldFtdID0gW107XG4gICAgICAgIGNvbnN0IGFkZHJGcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgY29uc3QgaGV4RnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGNvbnN0IGFzY2lpRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIC8vIENvbnN0cnVjdCByb3dzIG9mIDE2IGFuZCBhZGQgdGhlbSB0byB0aGUgYXNzb2NpYXRlZCBmcmFnbWVudHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByb3dEYXRhLnB1c2gobmV3UGFja2V0c1tpXSk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gbmV3UGFja2V0cy5sZW5ndGggLSAxIHx8IHJvd0RhdGEubGVuZ3RoID09IDE2KSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJvd3NbMF0uZ2V0KHJvd0RhdGFbMF0ub2Zmc2V0LnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVIZXhBZHJlc3NlcyhhZGRyRnJhZ21lbnQsIHJvd0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRlSGV4Qm9keShoZXhGcmFnbWVudCwgcm93RGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVBc2NpaVRhYmxlKGFzY2lpRnJhZ21lbnQsIHJvd0RhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByb3dEYXRhID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW5kZXIgdGhlIGZyYWdtZW50cyB0byB0aGUgRE9NXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGV4YWRkclwiKT8uYXBwZW5kQ2hpbGQoYWRkckZyYWdtZW50KTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXhib2R5XCIpPy5hcHBlbmRDaGlsZChoZXhGcmFnbWVudCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXNjaWlcIik/LmFwcGVuZENoaWxkKGFzY2lpRnJhZ21lbnQpO1xuXG4gICAgICAgIGlmIChXZWJWaWV3U3RhdGVNYW5hZ2VyLmdldFN0YXRlKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkT2Zmc2V0cyA9IHRoaXMuc2VsZWN0SGFuZGxlci5nZXRTZWxlY3RlZCgpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkT2Zmc2V0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RIYW5kbGVyLnNldFNlbGVjdGVkKHNlbGVjdGVkT2Zmc2V0cywgc2VsZWN0ZWRPZmZzZXRzWzBdLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoaXMgaXNuJ3QgdGhlIGJlc3QgcGxhY2UgZm9yIHRoaXMsIGJ1dCBpdCBjYW4ndCBnbyBpbiB0aGUgY29uc3RydWN0b3IgZHVlIHRvIHRoZSBkb2N1bWVudCBub3QgYmVpbmcgaW5zdGFudGlhdGVkIHlldFxuICAgICAgICAgICAgLy8gVGhpcyBlbnN1cmVzIHRoYXQgdGhlIHNyb2xsVG9wIGlzIHRoZSBzYW1lIGFzIGluIHRoZSBzdGF0ZSBvYmplY3QsIHNob3VsZCBvbmx5IGJlIG91dCBvZiBzeW5jIG9uIGluaXRpYWwgd2VidmlldyBsb2FkXG4gICAgICAgICAgICBjb25zdCBzYXZlZFNjcm9sbFRvcCA9IFdlYlZpZXdTdGF0ZU1hbmFnZXIuZ2V0U3RhdGUoKS5zY3JvbGxfdG9wO1xuICAgICAgICAgICAgaWYgKHNhdmVkU2Nyb2xsVG9wICYmIHNhdmVkU2Nyb2xsVG9wICE9PSB0aGlzLnNjcm9sbEJhckhhbmRsZXIudmlydHVhbFNjcm9sbFRvcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQmFySGFuZGxlci5yZXN5bmNTY3JvbGxQb3NpdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEV2ZW50IGhhbmRsZXIgd2hpY2ggaXMgY2FsbGVkIGV2ZXJ5dGltZSB0aGUgdmlld3BvcnQgaXMgcmVzaXplZFxuICAgICAqL1xuICAgIHByaXZhdGUgZG9jdW1lbnRSZXNpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmlld1BvcnRIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxCYXJIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEJhckhhbmRsZXIudXBkYXRlU2Nyb2xsQmFyKHRoaXMuZmlsZVNpemUgLyAxNik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0cyB0aGUgb2Zmc2V0IG9mIHRoZSBwYWNrZXQgYXQgdGhlIHRvcCBvZiB0aGUgdmlld3BvcnRcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgb2Zmc2V0XG4gICAgICovXG4gICAgcHVibGljIHRvcE9mZnNldCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKE1hdGguZmxvb3IodGhpcy5zY3JvbGxCYXJIYW5kbGVyLnZpcnR1YWxTY3JvbGxUb3AgLyB0aGlzLnJvd0hlaWdodCkgKiAxNik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEdldHMgdGhlIG9mZnNldCBvZiB0aGUgcGFja2V0IGF0IHRoZSBib3R0b20gcmlnaHQgb2YgdGhlIHZpZXdwb3J0XG4gICAgICogQHJldHVybnMge251bWJlcn0gdGhlIG9mZnNldFxuICAgICAqL1xuICAgIHB1YmxpYyBib3R0b21PZmZzZXQoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgY2xpZW50SGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJodG1sXCIpWzBdLmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgbnVtUm93c0luVmlld3BvcnQgPSBNYXRoLmZsb29yKGNsaWVudEhlaWdodCAvIHRoaXMucm93SGVpZ2h0KTtcbiAgICAgICAgLy8gSWYgaXQncyB0aGUgZW5kIG9mIHRoZSBmaWxlIGl0IHdpbGwgZmFsbCB0byB0aGUgdGhpcy5maWxlU2l6ZSAtIDEgY2FzZVxuICAgICAgICByZXR1cm4gTWF0aC5taW4oKHRoaXMudG9wT2Zmc2V0KCkgKyAobnVtUm93c0luVmlld3BvcnQgKiAxNikpIC0gMSwgdGhpcy5maWxlU2l6ZSAtIDEpO1xuICAgIH0gICBcblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBSZXRyaWV2ZXMgdGhlIFkgcG9zaXRpb24gYSBnaXZlbiBvZmZzZXQgaXMgYXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgdG8gY2FsY3VsYXRlIHRoZSB5IHBvc2l0aW9uIG9mXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIFkgcG9zaXRpb24gdGhlIG9mZnNldCBpcyBhdFxuICAgICAqL1xuICAgIHB1YmxpYyBvZmZzZXRZUG9zKG9mZnNldDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIChNYXRoLmZsb29yKG9mZnNldCAvIDE2KSAqIHRoaXMucm93SGVpZ2h0KSAlIHRoaXMuZG9jdW1lbnRIZWlnaHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEdldHMgZXhlY3V0ZWQgZXZlcnl0aW1lIHRoZSBkb2N1bWVudCBpcyBzY3JvbGxlZCwgdGhpcyB0YWxrcyB0byB0aGUgZGF0YSBsYXllciB0byByZXF1ZXN0IG1vcmUgcGFja2V0c1xuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzY3JvbGxIYW5kbGVyKCk6IFByb21pc2U8dm9pZFtdPiB7XG4gICAgICAgIC8vIFdlIHdhbnQgdG8gZW5zdXJlIHRoZXJlIGFyZSBhdCBsZWFzdCAyIGNodW5rcyBhYm92ZSB1cyBhbmQgNCBjaHVua3MgYmVsb3cgdXNcbiAgICAgICAgLy8gVGhlc2UgbnVtYmVycyB3ZXJlIGNob3NlbiBhcmJpdHJhcmlseSB1bmRlciB0aGUgYXNzdW1wdGlvbiB0aGF0IHNjcm9sbGluZyBkb3duIGlzIG1vcmUgY29tbW9uXG4gICAgICAgIGNvbnN0IGNodW5rSGFuZGxlclJlc3BvbnNlID0gYXdhaXQgY2h1bmtIYW5kbGVyLmVuc3VyZUJ1ZmZlcih2aXJ0dWFsSGV4RG9jdW1lbnQudG9wT2Zmc2V0KCksIHtcbiAgICAgICAgICAgIHRvcEJ1ZmZlclNpemU6IDIsXG4gICAgICAgICAgICBib3R0b21CdWZmZXJTaXplOiA0XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByZW1vdmVkQ2h1bmtzOiBudW1iZXJbXSA9IGNodW5rSGFuZGxlclJlc3BvbnNlLnJlbW92ZWQ7XG4gICAgICAgIC8vIFdlIHJlbW92ZSB0aGUgY2h1bmtzIGZyb20gdGhlIERPTSBhcyB0aGUgY2h1bmsgaGFuZGxlciBpcyBubyBsb25nZXIgdHJhY2tpbmcgdGhlbVxuICAgICAgICBmb3IgKGNvbnN0IGNodW5rIG9mIHJlbW92ZWRDaHVua3MpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBjaHVuazsgaSA8IGNodW5rICsgY2h1bmtIYW5kbGVyLmNodW5rU2l6ZTsgaSArPSAxNikge1xuICAgICAgICAgICAgICAgIHRoaXMucm93c1swXS5nZXQoaS50b1N0cmluZygpKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzWzBdLmRlbGV0ZShpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMucm93c1sxXS5nZXQoaS50b1N0cmluZygpKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzWzFdLmRlbGV0ZShpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMucm93c1syXS5nZXQoaS50b1N0cmluZygpKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzWzJdLmRlbGV0ZShpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaHVua0hhbmRsZXJSZXNwb25zZS5yZXF1ZXN0ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbmRlcnMgdGhlIGd1dHRlciB3aGljaCBob2xkcyB0aGUgaGV4IGFkZHJlc3MgbWVtb3J5IG9mZnNldFxuICAgICAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gZnJhZ21lbnQgVGhlIGZyYWdtZW50IHdoaWNoIGVsZW1lbnRzIGdldCBhZGRlZCB0b1xuICAgICAqIEBwYXJhbSB7VmlydHVhbGl6ZWRQYWNrZXRbXX0gcm93RGF0YSBBbiBhcnJheSBvZiAxNiBieXRlcyByZXByZXNlbnRpbmcgb25lIHJvd1xuICAgICAqL1xuICAgIHByaXZhdGUgcG9wdWxhdGVIZXhBZHJlc3NlcyhmcmFnbWVudDogRG9jdW1lbnRGcmFnbWVudCwgcm93RGF0YTogVmlydHVhbGl6ZWRQYWNrZXRbXSk6IHZvaWQge1xuICAgICAgICBjb25zdCBvZmZzZXQgPSByb3dEYXRhWzBdLm9mZnNldDtcbiAgICAgICAgY29uc3QgYWRkciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGRpc3BsYXlPZmZzZXQgPSBvZmZzZXQgKyB0aGlzLmJhc2VBZGRyZXNzO1xuICAgICAgICBhZGRyLmNsYXNzTmFtZSA9IFwicm93XCI7XG4gICAgICAgIGFkZHIuc2V0QXR0cmlidXRlKFwiZGF0YS1vZmZzZXRcIiwgb2Zmc2V0LnRvU3RyaW5nKCkpO1xuICAgICAgICBhZGRyLmlubmVyVGV4dCA9IHBhZChkaXNwbGF5T2Zmc2V0LnRvU3RyaW5nKDE2KSwgOCkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoYWRkcik7XG4gICAgICAgIHRoaXMucm93c1swXS5zZXQob2Zmc2V0LnRvU3RyaW5nKCksIGFkZHIpO1xuICAgICAgICAvLyBXZSBhZGQgYSBsZWZ0IHB4IG9mZnNldCB0byBlZmZlY3RpdmVseSByaWdodCBhbGlnbiB0aGUgY29sdW1uXG4gICAgICAgIGFkZHIuc3R5bGUubGVmdCA9IGAke3RoaXMuaGV4QWRkclBhZGRpbmd9cHhgO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVJvdyhhZGRyLCBvZmZzZXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW5kZXJzIHRoZSBkZWNvZGVkIHRleHQgc2VjdGlvblxuICAgICAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gZnJhZ21lbnQgVGhlIGZyYWdtZW50IHdoaWNoIGVsZW1lbnRzIGdldCBhZGRlZCB0b1xuICAgICAqIEBwYXJhbSB7VmlydHVhbGl6ZWRQYWNrZXRbXX0gcm93RGF0YSBBbiBhcnJheSBvZiAxNiBieXRlcyByZXByZXNlbnRpbmcgb25lIHJvd1xuICAgICAqL1xuICAgIHByaXZhdGUgcG9wdWxhdGVBc2NpaVRhYmxlKGZyYWdtZW50OiBEb2N1bWVudEZyYWdtZW50LCByb3dEYXRhOiBWaXJ0dWFsaXplZFBhY2tldFtdKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHJvdy5jbGFzc05hbWUgPSBcInJvd1wiO1xuICAgICAgICBjb25zdCByb3dPZmZzZXQgPSByb3dEYXRhWzBdLm9mZnNldC50b1N0cmluZygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd0RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGFzY2lpX2VsZW1lbnQgPSB0aGlzLmNyZWF0ZUFzY2lpRWxlbWVudChyb3dEYXRhW2ldKTtcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChhc2NpaV9lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICB0aGlzLnJvd3NbMl0uc2V0KHJvd09mZnNldCwgcm93KTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGVSb3cocm93LCBwYXJzZUludChyb3dPZmZzZXQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVuZGVycyB0aGUgZGVjb2RlZCB0ZXh0IHNlY3Rpb25cbiAgICAgKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IGZyYWdtZW50IFRoZSBmcmFnbWVudCB3aGljaCBlbGVtZW50cyBnZXQgYWRkZWQgdG9cbiAgICAgKiBAcGFyYW0ge1ZpcnR1YWxpemVkUGFja2V0W119IHJvd0RhdGEgQW4gYXJyYXkgb2YgMTYgYnl0ZXMgcmVwcmVzZW50aW5nIG9uZSByb3dcbiAgICAgKi9cbiAgICBwcml2YXRlIHBvcHVsYXRlSGV4Qm9keShmcmFnbWVudDogRG9jdW1lbnRGcmFnbWVudCwgcm93RGF0YTogVmlydHVhbGl6ZWRQYWNrZXRbXSk6IHZvaWQge1xuICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICByb3cuY2xhc3NOYW1lID0gXCJyb3dcIjtcbiAgICAgICAgY29uc3Qgcm93T2Zmc2V0ID0gcm93RGF0YVswXS5vZmZzZXQudG9TdHJpbmcoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBoZXhfZWxlbWVudCA9IHRoaXMuY3JlYXRlSGV4RWxlbWVudChyb3dEYXRhW2ldKTtcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChoZXhfZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgICAgdGhpcy5yb3dzWzFdLnNldChyb3dPZmZzZXQsIHJvdyk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlUm93KHJvdywgcGFyc2VJbnQocm93T2Zmc2V0KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIENyZWF0ZXMgYSBzaW5nbGUgaGV4IHNwYW4gZWxlbWVudCBmcm9tIGEgcGFja2V0XG4gICAgICogQHBhcmFtIHtWaXJ0dWFsaXplZFBhY2tldH0gcGFja2V0IFRoZSBWaXJ0dWFsaXplZFBhY2tldCBob2xkaW5nIHRoZSBkYXRhIG5lZWRlZCB0byBnZW5lcmF0ZSB0aGUgZWxlbWVudFxuICAgICAqIEByZXR1cm5zIHtIVE1MU3BhbkVsZW1lbnR9IFRoZSBodG1sIHNwYW4gZWxlbWVudCByZWFkeSB0byBiZSBhZGRlZCB0byB0aGUgRE9NXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVIZXhFbGVtZW50KHBhY2tldDogVmlydHVhbGl6ZWRQYWNrZXQpOiBIVE1MU3BhbkVsZW1lbnQge1xuICAgICAgICBjb25zdCBoZXhfZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBoZXhfZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGV4XCIpO1xuICAgICAgICBoZXhfZWxlbWVudC5jbGFzc0xpc3QuYWRkKGBjZWxsLW9mZnNldC0ke3BhY2tldC5vZmZzZXQudG9TdHJpbmcoKX1gKTtcbiAgICAgICAgLy8gSWYgdGhlIG9mZnNldCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gZmlsZVNpemUgdGhhdCdzIG91ciBwbGFjZWhvbGRlciBzbyBpdCdzIGp1c3QgYSArIHN5bWJvbCB0byBzaWduYWwgeW91IGNhbiB0eXBlIGFuZCBhZGQgYnl0ZXMgdGhlcmVcbiAgICAgICAgaWYgKHBhY2tldC5vZmZzZXQgPCB0aGlzLmZpbGVTaXplKSB7XG4gICAgICAgICAgICBoZXhfZWxlbWVudC5pbm5lclRleHQgPSBwYWQocGFja2V0LmRhdGEudG9IZXgoKSwgMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoZXhfZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYWRkLWNlbGxcIik7XG4gICAgICAgICAgICBoZXhfZWxlbWVudC5pbm5lclRleHQgPSBcIitcIjtcbiAgICAgICAgfVxuICAgICAgICBoZXhfZWxlbWVudC50YWJJbmRleCA9IC0xO1xuICAgICAgICBoZXhfZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0b2dnbGVIb3Zlcik7XG4gICAgICAgIHJldHVybiBoZXhfZWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhIHNpbmdsZSBhc2NpaSBzcGFuIGVsZW1lbnQgZnJvbSBhIHBhY2tldFxuICAgICAqIEBwYXJhbSB7VmlydHVhbGl6ZWRQYWNrZXR9IHBhY2tldCBUaGUgVmlydHVhbGl6ZWRQYWNrZXQgaG9sZGluZyB0aGUgZGF0YSBuZWVkZWQgdG8gZ2VuZXJhdGUgdGhlIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJucyB7SFRNTFNwYW5FbGVtZW50fSBUaGUgaHRtbCBzcGFuIGVsZW1lbnQgcmVhZHkgdG8gYmUgYWRkZWQgdG8gdGhlIERPTVxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlQXNjaWlFbGVtZW50KHBhY2tldDogVmlydHVhbGl6ZWRQYWNrZXQpOiBIVE1MU3BhbkVsZW1lbnQge1xuICAgICAgICBjb25zdCBhc2NpaV9lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGFzY2lpX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChgY2VsbC1vZmZzZXQtJHtwYWNrZXQub2Zmc2V0LnRvU3RyaW5nKCl9YCk7XG4gICAgICAgIGFzY2lpX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFzY2lpXCIpO1xuICAgICAgICAvLyBJZiB0aGUgb2Zmc2V0IGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBmaWxlU2l6ZSB0aGF0J3Mgb3VyIHBsYWNlaG9sZGVyIHNvIGl0J3MganVzdCBhICsgc3ltYm9sIHRvIHNpZ25hbCB5b3UgY2FuIHR5cGUgYW5kIGFkZCBieXRlcyB0aGVyZVxuICAgICAgICBpZiAocGFja2V0Lm9mZnNldCA8IHRoaXMuZmlsZVNpemUpIHtcbiAgICAgICAgICAgIHVwZGF0ZUFzY2lpVmFsdWUocGFja2V0LmRhdGEsIGFzY2lpX2VsZW1lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXNjaWlfZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYWRkLWNlbGxcIik7XG4gICAgICAgICAgICBhc2NpaV9lbGVtZW50LmlubmVyVGV4dCA9IFwiK1wiO1xuICAgICAgICB9XG4gICAgICAgIGFzY2lpX2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdG9nZ2xlSG92ZXIpO1xuICAgICAgICBhc2NpaV9lbGVtZW50LnRhYkluZGV4ID0gLTE7XG4gICAgICAgIHJldHVybiBhc2NpaV9lbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBNb3ZlcyB0aGUgcm93cyBmcm9tIHdoZXJlIHRoZXkgd2VyZSBwbGFjZWQgdG8gd2hlcmUgdGhleSBhcmUgc3VwcG9zZWQgdG8gYmUgKHRoaXMgaXMgZHVlIHRvIGFic29sdXRlIHBvc2l0aW9uaW5nKVxuICAgICAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IHJvdyAgVGhlIERpdkVsZW1lbnQgd2hpY2ggbmVlZHMgdG8gYmUgbW92ZWRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgb2YgdGhlIGVsZW1lbnQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgcm93XG4gICAgICovXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVSb3cocm93OiBIVE1MRGl2RWxlbWVudCwgb2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gR2V0IHRoZSBleHBlY3RlZCBZIHZhbHVlXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkWSA9IHRoaXMub2Zmc2V0WVBvcyhvZmZzZXQpO1xuICAgICAgICByb3cuc3R5bGUudG9wID0gYCR7ZXhwZWN0ZWRZfXB4YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB0aGUgY2xpY2sgZXZlbnRzIHdpdGhpbiB0aGUgZWRpdG9yXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCBUaGUgTW91c2VFdmVudCBwYXNzZWQgdG8gdGhlIGV2ZW50IGhhbmRsZXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjbGlja0hhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbnMgPiAxKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgaWYgKCF0YXJnZXQgfHwgaXNOYU4oZ2V0RWxlbWVudHNPZmZzZXQodGFyZ2V0KSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuZWRpdEhhbmRsZXIuY29tcGxldGVQZW5kaW5nRWRpdHMoKTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gZ2V0RWxlbWVudHNPZmZzZXQodGFyZ2V0KTtcbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydFNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0SGFuZGxlci5nZXRTZWxlY3Rpb25TdGFydCgpO1xuICAgICAgICAgICAgaWYgKHN0YXJ0U2VsZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEhhbmRsZXIuc2V0Rm9jdXNlZChvZmZzZXQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKHN0YXJ0U2VsZWN0aW9uLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KHN0YXJ0U2VsZWN0aW9uLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SGFuZGxlci5zZXRTZWxlY3RlZChjcmVhdGVPZmZzZXRSYW5nZShtaW4sIG1heCksIHN0YXJ0U2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RIYW5kbGVyLnNldEZvY3VzZWQob2Zmc2V0KTtcbiAgICAgICAgICAgIGlmIChldmVudC5jdHJsS2V5KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5zZWxlY3RIYW5kbGVyLmdldFNlbGVjdGVkKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U2VsZWN0aW9uID0gc2VsZWN0aW9uLmZpbHRlcihpID0+IGkgIT09IG9mZnNldCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT09IG5ld1NlbGVjdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RIYW5kbGVyLnNldFNlbGVjdGVkKFsuLi5uZXdTZWxlY3Rpb24sIG9mZnNldF0sIG9mZnNldCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RIYW5kbGVyLnNldFNlbGVjdGVkKG5ld1NlbGVjdGlvbiwgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SGFuZGxlci5zZXRTZWxlY3RlZChbb2Zmc2V0XSwgb2Zmc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5zcGVjdG9yKCk7XG4gICAgICAgICAgICB0YXJnZXQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgdGhlIG1vdXNlZG93biBldmVudHMgd2l0aGluIHRoZSBlZGl0b3JcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IFRoZSBNb3VzZUV2ZW50IHBhc3NlZCB0byB0aGUgZXZlbnQgaGFuZGxlci5cbiAgICAgKi9cbiAgICBwcml2YXRlIG1vdXNlRG93bkhhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbnMgIT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgaWYgKCF0YXJnZXQgfHwgaXNOYU4oZ2V0RWxlbWVudHNPZmZzZXQodGFyZ2V0KSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuZWRpdEhhbmRsZXIuY29tcGxldGVQZW5kaW5nRWRpdHMoKTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gZ2V0RWxlbWVudHNPZmZzZXQodGFyZ2V0KTtcbiAgICAgICAgY29uc3Qgc3RhcnRNb3VzZU1vdmVPZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIGNvbnN0IHN0YXJ0U2VsZWN0aW9uID0gZXZlbnQuc2hpZnRLZXkgPyB0aGlzLnNlbGVjdEhhbmRsZXIuZ2V0U2VsZWN0aW9uU3RhcnQoKSA6IG9mZnNldDtcblxuICAgICAgICBjb25zdCBvbk1vdXNlTW92ZSA9IChldmVudDogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbnMgIT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0IHx8IGlzTmFOKGdldEVsZW1lbnRzT2Zmc2V0KHRhcmdldCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBnZXRFbGVtZW50c09mZnNldCh0YXJnZXQpO1xuICAgICAgICAgICAgaWYgKHN0YXJ0U2VsZWN0aW9uICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBzdGFydE1vdXNlTW92ZU9mZnNldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SGFuZGxlci5zZXRGb2N1c2VkKG9mZnNldCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWluID0gTWF0aC5taW4oc3RhcnRTZWxlY3Rpb24sIG9mZnNldCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoc3RhcnRTZWxlY3Rpb24sIG9mZnNldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RIYW5kbGVyLnNldFNlbGVjdGVkKGNyZWF0ZU9mZnNldFJhbmdlKG1pbiwgbWF4KSwgc3RhcnRTZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgIHRhcmdldC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb25Nb3VzZVVwID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3JDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgb25Nb3VzZVVwKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG9uTW91c2VVcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgYWxsIGtleWJvYXJkIGludGVyYWN0aW9uIHdpdGggdGhlIG1haW4gZWRpdG9yIHdpbmRvd1xuICAgICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgVGhlIEtleWJvYXJkRXZlbnQgcGFzc2VkIHRvIHRoZSBldmVudCBoYW5kbGVyLlxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgZWRpdG9yS2V5Qm9hcmRIYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICghZXZlbnQgfHwgIWV2ZW50LnRhcmdldCkgcmV0dXJuO1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCBtb2RpZmllcktleVByZXNzZWQgPSBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5jdHJsS2V5O1xuICAgICAgICBpZiAoKGV2ZW50LmtleUNvZGUgPj0gMzcgJiYgZXZlbnQua2V5Q29kZSA8PSA0MCAvKkFycm93cyovKVxuICAgICAgICAgICAgfHwgKChldmVudC5rZXlDb2RlID09PSAzNSAvKkVuZCovIHx8IGV2ZW50LmtleUNvZGUgPT09IDM2IC8qSG9tZSovKSAmJiAhZXZlbnQuY3RybEtleSkpIHtcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGVCeUtleShldmVudC5rZXlDb2RlLCB0YXJnZXRFbGVtZW50LCBldmVudC5zaGlmdEtleSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKCFtb2RpZmllcktleVByZXNzZWQgJiYgdGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJoZXhcIikpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZWRpdEhhbmRsZXIuZWRpdEhleCh0YXJnZXRFbGVtZW50LCBldmVudC5rZXkpO1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBjZWxsIGhhcyBiZWVuIGVkaXRlZFxuICAgICAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQuaW5uZXJUZXh0LnRyaW1SaWdodCgpLmxlbmd0aCA9PSAyICYmIHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdGluZ1wiKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImVkaXRpbmdcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZUJ5S2V5KDM5LCB0YXJnZXRFbGVtZW50LCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIW1vZGlmaWVyS2V5UHJlc3NlZCAmJiBldmVudC5rZXkubGVuZ3RoID09PSAxICYmIHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYXNjaWlcIikpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZWRpdEhhbmRsZXIuZWRpdEFzY2lpKHRhcmdldEVsZW1lbnQsIGV2ZW50LmtleSk7XG4gICAgICAgICAgICB0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJlZGl0aW5nXCIpO1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZUJ5S2V5KDM5LCB0YXJnZXRFbGVtZW50LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5lZGl0SGFuZGxlci5jb21wbGV0ZVBlbmRpbmdFZGl0cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIGtleWJvYXJkIGl0ZXJhdGlvbiB3aXRoIHRoZSB3aW5kb3dcbiAgICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IFRoZSBLZXlib2FyZEV2ZW50IHBhc3NlZCB0byB0aGUgZXZlbnQgaGFuZGxlci5cbiAgICAgKi9cbiAgICBwcml2YXRlIHdpbmRvd0tleWJvYXJkSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIWV2ZW50IHx8ICFldmVudC50YXJnZXQpIHJldHVybjtcbiAgICAgICAgaWYgKChldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkpICYmIGV2ZW50LmtleSA9PT0gXCJmXCIpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIHByZXNzZXMgY3RybCAvIGNtZCArIGYgd2UgZm9jdXMgdGhlIHNlYXJjaCBib3ggYW5kIGNoYW5nZSB0aGUgZHJvcGRvd25cbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSGFuZGxlci5zZWFyY2hLZXliaW5kaW5nSGFuZGxlcigpO1xuICAgICAgICB9IGVsc2UgaWYgKChldmVudC5rZXlDb2RlID09IDM2IHx8IGV2ZW50LmtleUNvZGUgPT0gMzUpICYmIGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIHByZXNzZWQgQ1RSTCArIEhvbWUgb3IgQ1RSTCArIEVuZCB3ZSBzY3JvbGwgdGhlIHdob2xlIGRvY3VtZW50XG4gICAgICAgICAgICBldmVudC5rZXlDb2RlID09IDM2ID8gdGhpcy5zY3JvbGxCYXJIYW5kbGVyLnNjcm9sbFRvVG9wKCkgOiB0aGlzLnNjcm9sbEJhckhhbmRsZXIuc2Nyb2xsVG9Cb3R0b20oKTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09IDMzKSB7XG4gICAgICAgICAgICAvLyBQRyBVcFxuICAgICAgICAgICAgdGhpcy5zY3JvbGxCYXJIYW5kbGVyLnBhZ2UodGhpcy52aWV3UG9ydEhlaWdodCwgXCJ1cFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09IDM0KSB7XG4gICAgICAgICAgICAvLyBQRyBEb3duXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEJhckhhbmRsZXIucGFnZSh0aGlzLnZpZXdQb3J0SGVpZ2h0LCBcImRvd25cIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB3aGVuIHRoZSB1c2VyIHVzZXMgdGhlIGFycm93IGtleXMsIEhvbWUgb3IgRW5kIHRvIG5hdmlnYXRlIHRoZSBlZGl0b3JcbiAgICAgKiBAcGFyYW0ge251bWJlcn0ga2V5Q29kZSBUaGUga2V5Q29kZSBvZiB0aGUga2V5IHByZXNzZWRcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRFbGVtZW50IFRoZSBlbGVtZW50XG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc1JhbmdlU2VsZWN0aW9uIElmIHdlIGFyZSBzZWxlY3RpbmcgYSByYW5nZSAoc2hpZnQga2V5IHByZXNzZWQpXG4gICAgICovXG4gICAgcHJpdmF0ZSBuYXZpZ2F0ZUJ5S2V5KGtleUNvZGU6IG51bWJlciwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQsIGlzUmFuZ2VTZWxlY3Rpb246IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgbGV0IG5leHQ6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgMzU6XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgcHJlc3NlcyBFbmQgd2UgZ28gdG8gdGhlIGVuZCBvZiB0aGUgbGluZVxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudENoaWxkcmVuID0gdGFyZ2V0RWxlbWVudC5wYXJlbnRFbGVtZW50IS5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICBuZXh0ID0gcGFyZW50Q2hpbGRyZW5bcGFyZW50Q2hpbGRyZW4ubGVuZ3RoIC0gMV0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM2OlxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIHByZXNzZXMgSG9tZSB3ZSBnbyB0byB0aGUgZnJvbnQgb2YgdGhlIGxpbmVcbiAgICAgICAgICAgICAgICBuZXh0ID0gdGFyZ2V0RWxlbWVudC5wYXJlbnRFbGVtZW50IS5jaGlsZHJlblswXSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgICAgLy8gbGVmdFxuICAgICAgICAgICAgICAgIG5leHQgPSAodGFyZ2V0RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIHx8IHRhcmdldEVsZW1lbnQucGFyZW50RWxlbWVudD8ucHJldmlvdXNFbGVtZW50U2libGluZz8uY2hpbGRyZW5bMTVdKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgLy8gdXBcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50c19hYm92ZSA9IGdldEVsZW1lbnRzV2l0aEdpdmVuT2Zmc2V0KGdldEVsZW1lbnRzT2Zmc2V0KHRhcmdldEVsZW1lbnQpIC0gMTYpO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50c19hYm92ZS5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgICAgICAgIG5leHQgPSB0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImhleFwiKSA/IGVsZW1lbnRzX2Fib3ZlWzBdIDogZWxlbWVudHNfYWJvdmVbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgIC8vIHJpZ2h0XG4gICAgICAgICAgICAgICAgbmV4dCA9ICh0YXJnZXRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZyB8fCB0YXJnZXRFbGVtZW50LnBhcmVudEVsZW1lbnQ/Lm5leHRFbGVtZW50U2libGluZz8uY2hpbGRyZW5bMF0pIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICAvLyBkb3duXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudHNfYmVsb3cgPSBnZXRFbGVtZW50c1dpdGhHaXZlbk9mZnNldChNYXRoLm1pbihnZXRFbGVtZW50c09mZnNldCh0YXJnZXRFbGVtZW50KSArIDE2LCB0aGlzLmZpbGVTaXplIC0gMSkpO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50c19iZWxvdy5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgICAgICAgIG5leHQgPSB0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImhleFwiKSA/IGVsZW1lbnRzX2JlbG93WzBdIDogZWxlbWVudHNfYmVsb3dbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHQgJiYgbmV4dC50YWdOYW1lID09PSBcIlNQQU5cIikge1xuICAgICAgICAgICAgY29uc3QgbmV4dFJlY3QgPSBuZXh0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMudmlld1BvcnRIZWlnaHQgPD0gbmV4dFJlY3QuYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCYXJIYW5kbGVyLnNjcm9sbERvY3VtZW50KDEsIFwiZG93blwiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dFJlY3QudG9wIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEJhckhhbmRsZXIuc2Nyb2xsRG9jdW1lbnQoMSwgXCJ1cFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gZ2V0RWxlbWVudHNPZmZzZXQobmV4dCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEhhbmRsZXIuc2V0Rm9jdXNlZChvZmZzZXQpO1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRTZWxlY3Rpb24gPSB0aGlzLnNlbGVjdEhhbmRsZXIuZ2V0U2VsZWN0aW9uU3RhcnQoKTtcbiAgICAgICAgICAgIGlmIChpc1JhbmdlU2VsZWN0aW9uICYmIHN0YXJ0U2VsZWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbihzdGFydFNlbGVjdGlvbiwgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXggPSBNYXRoLm1heChzdGFydFNlbGVjdGlvbiwgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEhhbmRsZXIuc2V0U2VsZWN0ZWQoY3JlYXRlT2Zmc2V0UmFuZ2UobWluLCBtYXgpLCBzdGFydFNlbGVjdGlvbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SGFuZGxlci5zZXRTZWxlY3RlZChbb2Zmc2V0XSwgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUluc3BlY3RvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqXG4gICAgICogQGRlc2NyaXB0aW9uIFBvcHVsYXRlcyB0aGUgaW5zcGVjdG9yIGRhdGEgd2l0aCB0aGUgY3VycmVudGx5IGZvY3VzZWQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZUluc3BlY3RvcigpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5zZWxlY3RIYW5kbGVyLmdldEZvY3VzZWQoKTtcbiAgICAgICAgaWYgKG9mZnNldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IGdldEVsZW1lbnRzV2l0aEdpdmVuT2Zmc2V0KG9mZnNldCk7XG4gICAgICAgICAgICBjb25zdCBieXRlX29iaiA9IHJldHJpZXZlU2VsZWN0ZWRCeXRlT2JqZWN0KGVsZW1lbnRzKSE7XG4gICAgICAgICAgICBjb25zdCBsaXR0bGVFbmRpYW4gPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbmRpYW5uZXNzXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID09PSBcImxpdHRsZVwiO1xuICAgICAgICAgICAgcG9wdWxhdGVEYXRhSW5zcGVjdG9yKGJ5dGVfb2JqLCBsaXR0bGVFbmRpYW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhbiBhcnJheSBvZiBvZmZzZXRzLCBzZWxlY3RzIHRoZSBjb3JyZXNwb25kaW5nIGVsZW1lbnRzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IG9mZnNldHMgVGhlIG9mZnNldHMgb2YgdGhlIGVsZW1lbnRzIHlvdSB3YW50IHRvIHNlbGVjdFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRTZWxlY3Rpb24ob2Zmc2V0czogbnVtYmVyW10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RIYW5kbGVyLnNldFNlbGVjdGVkKG9mZnNldHMsIG9mZnNldHMubGVuZ3RoID4gMCA/IG9mZnNldHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIC8qKipcbiAgICAgKiBAZGVzY3JpcHRpb24gR2l2ZW4gYW4gb2Zmc2V0LCBzZWxlY3RzIHRoZSBlbGVtZW50cyBhbmQgZm9jdXNlcyB0aGUgZWxlbWVudCBpbiB0aGUgc2FtZSBjb2x1bW4gYXMgcHJldmlvdXMgZm9jdXMuIERlZmF1bHRzIHRvIGhleC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgb2YgdGhlIGVsZW1lbnRzIHlvdSB3YW50IHRvIHNlbGVjdCBhbmQgZm9jdXNcbiAgICAgKi9cbiAgICBwdWJsaWMgZm9jdXNFbGVtZW50V2l0aEdpdmVuT2Zmc2V0KG9mZnNldDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQob2Zmc2V0KTtcbiAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCAhPSAyKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2VsZWN0SGFuZGxlci5zZXRTZWxlY3RlZChbb2Zmc2V0XSwgb2Zmc2V0KTtcbiAgICAgICAgLy8gSWYgYW4gYXNjaWkgZWxlbWVudCBpcyBjdXJyZW50bHkgZm9jdXNlZCB0aGVuIHdlIGZvY3VzIHRoYXQsIGVsc2Ugd2UgZm9jdXMgaGV4XG4gICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5jbGFzc0xpc3QuY29udGFpbnMoXCJyaWdodFwiKSkge1xuICAgICAgICAgICAgZWxlbWVudHNbMV0uZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnRzWzBdLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gVW5kb2VzIHRoZSBnaXZlbiBlZGl0cyBmcm9tIHRoZSBkb2N1bWVudFxuICAgICAqIEBwYXJhbSB7RWRpdE1lc3NhZ2VbXX0gZWRpdHMgVGhlIGVkaXRzIHRoYXQgd2lsbCBiZSB1bmRvbmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmlsZVNpemUgVGhlIHNpemUgb2YgdGhlIGZpbGUsIHRoZSBleHQgaG9zdCB0cmFja3MgdGhpcyBhbmQgcGFzc2VzIGl0IGJhY2tcbiAgICAgKi9cbiAgICBwdWJsaWMgdW5kbyhlZGl0czogRWRpdE1lc3NhZ2VbXSwgZmlsZVNpemU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmZpbGVTaXplID0gZmlsZVNpemU7XG4gICAgICAgIHRoaXMuZWRpdEhhbmRsZXIudW5kbyhlZGl0cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFJlZG9lcyB0aGUgZ2l2ZW4gZWRpdHMgZnJvbSB0aGUgZG9jdW1lbnRcbiAgICAgKiBAcGFyYW0ge0VkaXRNZXNzYWdlW119IGVkaXRzIFRoZSBlZGl0cyB0aGF0IHdpbGwgYmUgcmVkb25lXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZpbGVTaXplIFRoZSBzaXplIG9mIHRoZSBmaWxlLCB0aGUgZXh0IGhvc3QgdHJhY2tzIHRoaXMgYW5kIHBhc3NlcyBpdCBiYWNrZWRvbmVcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVkbyhlZGl0czogRWRpdE1lc3NhZ2VbXSwgZmlsZVNpemU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmVkaXRIYW5kbGVyLnJlZG8oZWRpdHMpO1xuICAgICAgICB0aGlzLmZpbGVTaXplID0gZmlsZVNpemU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIENhbGxlZCB3aGVuIHRoZSB1c2VyIGV4ZWN1dGVzIHJldmVydFxuICAgICAqL1xuICAgIHB1YmxpYyByZXZlcnQoZmlsZVNpemU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmZpbGVTaXplID0gZmlsZVNpemU7XG4gICAgICAgIHRoaXMuZWRpdEhhbmRsZXIucmV2ZXJ0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIENyZWF0ZXMgYW4gYWRkIGNlbGwgKHRoZSBsaXR0bGUgcGx1cyBwbGFjZWhvbGRlcikgYW5kIHBsYWNlcyBpdCBhdCB0aGUgZW5kIG9mIHRoZSBkb2N1bWVudFxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVBZGRDZWxsKCk6IHZvaWQge1xuICAgICAgICAvLyBEb24ndCBtYWtlIG1vcmUgbW9yZSBhZGQgY2VsbHMgdW50aWwgdGhlcmUgYXJlIG5vbmUgbGVmdCBvbiB0aGUgRE9NXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYWRkLWNlbGxcIikubGVuZ3RoICE9PSAwKSByZXR1cm47XG4gICAgICAgIC8vIFRoaXMgd2lsbCBzdGFydCBhIG5ldyByb3dcbiAgICAgICAgY29uc3QgcGFja2V0OiBWaXJ0dWFsaXplZFBhY2tldCA9IHtcbiAgICAgICAgICAgIG9mZnNldDogdGhpcy5maWxlU2l6ZSxcbiAgICAgICAgICAgIGRhdGE6IG5ldyBCeXRlRGF0YSgwKVxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5maWxlU2l6ZSAlIDE2ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcihbcGFja2V0XSk7XG4gICAgICAgICAgICAvLyBJZiBpdCdzIGEgbmV3IGNodW5rIHdlIHdhbnQgdGhlIGNodW5raGFuZGxlciB0byB0cmFjayBpdFxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsZVNpemUgJSBjaHVua0hhbmRsZXIuY2h1bmtTaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY2h1bmtIYW5kbGVyLmFkZENodW5rKHRoaXMuZmlsZVNpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zY3JvbGxCYXJIYW5kbGVyLnVwZGF0ZVNjcm9sbEJhcih0aGlzLmZpbGVTaXplIC8gMTYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaGV4X2VsZW1lbnQgPSB0aGlzLmNyZWF0ZUhleEVsZW1lbnQocGFja2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGFzY2lpX2VsZW1lbnQgPSB0aGlzLmNyZWF0ZUFzY2lpRWxlbWVudChwYWNrZXQpO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSBnZXRFbGVtZW50c1dpdGhHaXZlbk9mZnNldCh0aGlzLmZpbGVTaXplIC0gMSk7XG4gICAgICAgICAgICBlbGVtZW50c1swXS5wYXJlbnRFbGVtZW50Py5hcHBlbmRDaGlsZChoZXhfZWxlbWVudCk7XG4gICAgICAgICAgICBlbGVtZW50c1sxXS5wYXJlbnRFbGVtZW50Py5hcHBlbmRDaGlsZChhc2NpaV9lbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIHRoZSBsYXN0IGNlbGwgZnJvbSB0aGUgdmlydHVhbCBkb2N1bWVudFxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmVMYXN0Q2VsbCgpOiB2b2lkIHtcbiAgICAgICAgLy8gV2UgY2FuIHVzZSB0aGUgYWRkIGNlbGwgYXMgdGhlIGxhc3QgY2VsbCBvZmZzZXQgc2luY2UgYSBwbHVzIGNlbGwgc2hvdWxkIGFsd2F5cyBiZSB0aGUgbGFzdCBjZWxsXG4gICAgICAgIGNvbnN0IHBsdXNDZWxsT2Zmc2V0ID0gZ2V0RWxlbWVudHNPZmZzZXQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImFkZC1jZWxsXCIpWzBdKTtcbiAgICAgICAgaWYgKGlzTmFOKHBsdXNDZWxsT2Zmc2V0KSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBsYXN0Q2VsbHMgPSBnZXRFbGVtZW50c1dpdGhHaXZlbk9mZnNldChwbHVzQ2VsbE9mZnNldCk7XG4gICAgICAgIGNvbnN0IHNlY29uZFRvTGFzdENlbGxzID0gZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQocGx1c0NlbGxPZmZzZXQgLSAxKTtcbiAgICAgICAgLy8gSWYgdGhlIGxhc3QgY2VsbCB3YXMgb24gaXRzIG93biByb3cgd2UgcmVtb3ZlIHRoZSBuZXcgcm93XG4gICAgICAgIGlmIChwbHVzQ2VsbE9mZnNldCAlIDE2ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJvd3NbMF0uZ2V0KHBsdXNDZWxsT2Zmc2V0LnRvU3RyaW5nKCkpPy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMucm93c1swXS5kZWxldGUocGx1c0NlbGxPZmZzZXQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB0aGlzLnJvd3NbMV0uZ2V0KHBsdXNDZWxsT2Zmc2V0LnRvU3RyaW5nKCkpPy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMucm93c1sxXS5kZWxldGUocGx1c0NlbGxPZmZzZXQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB0aGlzLnJvd3NbMl0uZ2V0KHBsdXNDZWxsT2Zmc2V0LnRvU3RyaW5nKCkpPy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMucm93c1syXS5kZWxldGUocGx1c0NlbGxPZmZzZXQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEJhckhhbmRsZXIudXBkYXRlU2Nyb2xsQmFyKChwbHVzQ2VsbE9mZnNldCAtIDEpIC8gMTYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGFzdENlbGxzWzBdLnJlbW92ZSgpO1xuICAgICAgICAgICAgbGFzdENlbGxzWzFdLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHNlY29uZFRvTGFzdENlbGxzWzBdLmlubmVyVGV4dCA9IFwiK1wiO1xuICAgICAgICBzZWNvbmRUb0xhc3RDZWxsc1swXS5jbGFzc0xpc3QuYWRkKFwiYWRkLWNlbGxcIik7XG4gICAgICAgIHNlY29uZFRvTGFzdENlbGxzWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJub25ncmFwaGljXCIpO1xuICAgICAgICBzZWNvbmRUb0xhc3RDZWxsc1swXS5jbGFzc0xpc3QucmVtb3ZlKFwiZWRpdGVkXCIpO1xuICAgICAgICBzZWNvbmRUb0xhc3RDZWxsc1sxXS5pbm5lclRleHQgPSBcIitcIjtcbiAgICAgICAgc2Vjb25kVG9MYXN0Q2VsbHNbMV0uY2xhc3NMaXN0LnJlbW92ZShcIm5vbmdyYXBoaWNcIik7XG4gICAgICAgIHNlY29uZFRvTGFzdENlbGxzWzFdLmNsYXNzTGlzdC5hZGQoXCJhZGQtY2VsbFwiKTtcbiAgICAgICAgc2Vjb25kVG9MYXN0Q2VsbHNbMV0uY2xhc3NMaXN0LnJlbW92ZShcImVkaXRlZFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gU2ltcGxlIGdldHRlciBmb3IgdGhlIGZpbGVTaXplXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIGZpbGVTaXplXG4gICAgICovXG4gICAgcHVibGljIGdldCBkb2N1bWVudFNpemUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuZmlsZVNpemU7IH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBVcGRhdGVzIHRoZSBmaWxlIHNpemUgc28gaXRzIGluIHN5bmMgd2l0aCBleHQgaG9zdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuZXdTaXplIFRoZSBuZXcgZmlsZXNpemVcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlRG9jdW1lbnRTaXplKG5ld1NpemU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmZpbGVTaXplID0gbmV3U2l6ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFJlLXJlcXVlc3RzIGFsbCB0aGUgY2h1bmtzIG9uIHRoZSBET00gZm9yIHJlbmRlcmluZy4gVGhpcyBpcyBuZWVkZWQgZm9yIHJldmVydFxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyByZVJlcXVlc3RDaHVua3MoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIC8vIElmIHdlIGRvbid0IGRvIEFycmF5LmZyb20gaXQgd2lsbCBzdGlsbCByZWZlcmVuY2UgdGhlIG9yaWdpbmFsIHNldCBjYXVzaW5nIGl0IHRvIGluZmluaXRlbHkgcmVxdWVzdCBhbmQgZGVsZXRlIHRoZSBjaHVua3NcbiAgICAgICAgY29uc3QgYWxsQ2h1bmtzID0gQXJyYXkuZnJvbShjaHVua0hhbmRsZXIuYWxsQ2h1bmtzKTtcbiAgICAgICAgZm9yIChjb25zdCBjaHVuayBvZiBhbGxDaHVua3MpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgdGhlIGNodW5rcyBmcm9tIHRoZSBET01cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBjaHVuazsgaSA8IGNodW5rICsgY2h1bmtIYW5kbGVyLmNodW5rU2l6ZTsgaSArPSAxNikge1xuICAgICAgICAgICAgICAgIHRoaXMucm93c1swXS5nZXQoaS50b1N0cmluZygpKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzWzBdLmRlbGV0ZShpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMucm93c1sxXS5nZXQoaS50b1N0cmluZygpKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzWzFdLmRlbGV0ZShpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMucm93c1syXS5nZXQoaS50b1N0cmluZygpKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzWzJdLmRlbGV0ZShpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2h1bmtIYW5kbGVyLnJlbW92ZUNodW5rKGNodW5rKTtcbiAgICAgICAgICAgIGF3YWl0IGNodW5rSGFuZGxlci5yZXF1ZXN0TW9yZUNodW5rcyhjaHVuayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gU2Nyb2xscyB0byB0aGUgZ2l2ZW4gb2Zmc2V0IGlmIGl0J3Mgb3V0c2lkZSB0aGUgdmlld3BvcnRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0IFRoZSBvZmZzZXQgdG8gc2Nyb2xsIHRvIFxuICAgICAqIEBwYXJhbSBmb3JjZSBXaGV0aGVyIG9yIG5vdCB5b3Ugc2hvdWxkIHNjcm9sbCBldmVuIGlmIGl0J3MgaW4gdGhlIHZpZXdwb3J0XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNjcm9sbERvY3VtZW50VG9PZmZzZXQob2Zmc2V0OiBudW1iZXIsIGZvcmNlPzogYm9vbGVhbik6IFByb21pc2U8dm9pZFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjcm9sbEJhckhhbmRsZXIuc2Nyb2xsVG9PZmZzZXQob2Zmc2V0LCBmb3JjZSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbmltcG9ydCB7IHZzY29kZSB9IGZyb20gXCIuL2hleEVkaXRcIjtcblxuLyoqXG4gKiBTaW1wbGUgc3RhdGljIGNsYXNzIHdoaWNoIGhhbmRsZXMgc2V0dGluZyBhbmQgY2xlYXJpbmcgdGhlIHdlYnZpZXdzIHN0YXRlXG4gKiBXZSB1c2UgdGhpcyBvdmVyIHRoZSBkZWZhdWx0IC5zZXRTdGF0ZSBhcyBpdCBpbXBsZW1lbnRzIGEgc2V0U3RhdGUgd2hpY2ggZG9lc24ndCBvdmVycmlkZSB0aGUgZW50aXJlIG9iamVjdCBqdXN0IHRoZSBnaXZlbiBwcm9wZXJ0eVxuICovXG5leHBvcnQgY2xhc3MgV2ViVmlld1N0YXRlTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gR2l2ZW4gYSBwcm9wZXJ0eSBhbmQgYSB2YWx1ZSBlaXRoZXIgdXBkYXRlcyBvciBhZGRzIGl0IHRvIHRoZSBzdGF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWUgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHthbnl9IHByb3BlcnR5VmFsdWUgVGhlIHZhbHVlIHRvIHN0b3JlIGZvciB0aGUgcHJvcGVydHlcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0UHJvcGVydHkocHJvcGVydHlOYW1lOiBzdHJpbmcsIHByb3BlcnR5VmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgY3VycmVudFN0YXRlID0gV2ViVmlld1N0YXRlTWFuYWdlci5nZXRTdGF0ZSgpO1xuICAgICAgICBpZiAoY3VycmVudFN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9IHsgfTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50U3RhdGVbcHJvcGVydHlOYW1lXSA9IHByb3BlcnR5VmFsdWU7XG4gICAgICAgIHZzY29kZS5zZXRTdGF0ZShjdXJyZW50U3RhdGUpO1xuICAgIH1cblxuICAgIC8qKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ2xlYXJzIHRoZSBzdGF0ZSBvYmplY3RcbiAgICAgKi9cbiAgICBzdGF0aWMgY2xlYXJTdGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgdnNjb2RlLnNldFN0YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFJldHJpZXZlcyB0aGUgc3RhdGUgb2JqZWN0XG4gICAgICovXG4gICAgc3RhdGljIGdldFN0YXRlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdnNjb2RlLmdldFN0YXRlKCkgPT09IFwic3RyaW5nXCIgPyBKU09OLnBhcnNlKHZzY29kZS5nZXRTdGF0ZSgpKSA6IHZzY29kZS5nZXRTdGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBSZXRyaWV2ZXMgYSBwcm9wZXJ0eSBvbiB0aGUgc3RhdGUgb2JqZWN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gcmV0cmlldmUgdGhlIHZhbHVlIG9mXG4gICAgICovXG4gICAgc3RhdGljIGdldFByb3BlcnR5KHByb3BlcnR5TmFtZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSAgV2ViVmlld1N0YXRlTWFuYWdlci5nZXRTdGF0ZSgpO1xuICAgICAgICByZXR1cm4gc3RhdGVbcHJvcGVydHlOYW1lXTtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==