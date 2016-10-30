"use strict";
/**
 * Import sub interfaces
 */
import IDebug from "./IDebug";
/**
 * The storage interface
 */
interface IWindow {
    document: any;
    console: any;

    Debug: IDebug;
}
/**
 * Declare window interface
 */
declare var window: IWindow;
/**
 * Export the window interface
 */
export default IWindow;
