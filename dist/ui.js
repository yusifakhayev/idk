"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
const fullscreen_1 = require("./helpers/fullscreen");
const fullscreenState_1 = require("./state/fullscreenState");
const searchState_1 = require("./state/searchState");
const clockState_1 = require("./state/clockState");
const directoryDisplayState_1 = require("./state/directoryDisplayState");
const refreshState_1 = require("./state/refreshState");
const Search_1 = require("./ui/Search");
const Clock_1 = require("./ui/Clock");
const Directories_1 = require("./ui/Directories");
const DirectoriesNULL_1 = require("./ui/DirectoriesNULL");
const getDirectory_1 = require("./subprocesses/getDirectory");
// import {readFile} from './subprocesses/readFile'
const fileBufferState_1 = require("./state/fileBufferState");
const appendFileState_1 = require("./state/appendFileState");
const App = () => {
    (0, getDirectory_1.getDirectory)();
    const toggleFullscreen = (0, fullscreenState_1.fullscreenState)((state) => state.toggleFullscreen);
    const toggleSearch = (0, searchState_1.searchState)((state) => state.toggleSearch);
    const toggleClock = (0, clockState_1.clockState)((state) => state.toggleClock);
    const toggleDirectoryDisplay = (0, directoryDisplayState_1.directoryDisplayState)((state) => state.toggleDisplay);
    const setRefresh = (0, refreshState_1.refreshState)((state) => state.toggleRefresh);
    // const appendFile = appendFileState((state) => state.appendFile)
    // const directoryDisplay = directoryDisplayState((state) => state.display)
    // readFile({afileToAppendppendFile: `${fileToAppend}`})
    //@ts-ignore
    //@ts-ignore
    const [reload, setReload] = (0, react_1.useState)(0);
    const [displayBool, setDisplaybool] = (0, react_1.useState)(false);
    const [fileOut, setFileOut] = (0, react_1.useState)('');
    // const {exit} = useApp()
    (0, ink_1.useInput)((input) => {
        switch (input) {
            case "S":
                toggleSearch();
                break;
            case "F":
                toggleFullscreen();
                break;
            case "T":
                toggleClock();
                break;
            case "P":
                toggleDirectoryDisplay();
                break;
            case "q":
                (0, fullscreen_1.clearScreen)();
                break;
        }
    });
    (0, react_1.useEffect)(() => {
        const unsubscribeFullscreen = fullscreenState_1.fullscreenState.subscribe((state) => state.fullscreen, (value) => {
            setReload(reload => reload + 1);
            value ? (0, fullscreen_1.enterFullscreen)() : (0, fullscreen_1.exitFullscreen)();
        });
        const unsubscribeSearch = searchState_1.searchState.subscribe((state) => state.search, () => {
            setReload(reload => reload + 1);
            setRefresh();
        });
        const unsubscribeClock = clockState_1.clockState.subscribe((state) => state.clock, () => {
            setReload(reload => reload + 1);
        });
        const unsubscribeFileBuffer = fileBufferState_1.fileBufferState.subscribe((state) => state.file, (value) => {
            setFileOut(value);
            setRefresh();
            setReload(reload => reload + 1);
        });
        const unsubscribeAppendFile = appendFileState_1.appendFileState.subscribe((state) => state.appendFile, () => {
        });
        return () => {
            unsubscribeAppendFile();
            unsubscribeFileBuffer();
            unsubscribeFullscreen();
            unsubscribeSearch();
            unsubscribeClock();
        };
    }, []);
    (0, react_1.useEffect)(() => {
        const unsubscribeDirectoryDisplay = directoryDisplayState_1.directoryDisplayState.subscribe((state) => state.display, () => {
            setDisplaybool(displayBool => !displayBool);
        });
        return () => {
            unsubscribeDirectoryDisplay();
        };
    }, [displayBool]);
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ink_1.Box, { justifyContent: "center", alignItems: "stretch", width: "100%", height: "100%", flexDirection: "column" },
            (0, Search_1.Search)(),
            (0, Clock_1.Clock)(),
            displayBool ? react_1.default.createElement(Directories_1.Directories, { file: fileOut }) : react_1.default.createElement(DirectoriesNULL_1.DirectoriesNULL, null)));
};
module.exports = App;
exports.default = App;
