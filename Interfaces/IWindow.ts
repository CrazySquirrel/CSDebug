"use strict";
/**
 * Import sub interfaces
 */
import ICSDebug from "./ICSDebug";
/**
 * The storage interface
 */
interface IWindow {
    document: any;
    console: any;

    CSDebug: ICSDebug;
}
/**
 * Declare window interface
 */
declare var window: IWindow;
/**
 * Export the window interface
 */
export default IWindow;
