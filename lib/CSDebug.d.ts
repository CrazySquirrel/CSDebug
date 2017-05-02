/**
 * Import interface
 */
import ICSDebug from "../Interfaces/ICSDebug";
/**
 * Debug class
 */
declare class CSDebug implements ICSDebug {
    /**
     * Clone object safely
     * @param obj
     * @param deep
     * @return {{}}
     */
    static cloneObjectSafely(obj: Object, deep: number): Object;
    /**
     * Declare debug properties
     */
    use: boolean;
    arrLog: Array<any>;
    console: any;
    debugConsole: HTMLElement;
    /**
     * Debug constructor
     * @param localUse
     * @param settings
     */
    constructor(localUse: boolean, settings?: any);
    /**
     * Init debug console dom element
     */
    initDebugConsole(): void;
    /**
     * Debug error method
     * @param strMessage
     * @param AdditionalMessage
     */
    error(strMessage: any, ...AdditionalMessage: Array<any>): void;
    /**
     * Debug warn method
     * @param strMessage
     * @param AdditionalMessage
     */
    warn(strMessage: any, ...AdditionalMessage: Array<any>): void;
    /**
     * Debug info method
     * @param strMessage
     * @param AdditionalMessage
     */
    info(strMessage: any, ...AdditionalMessage: Array<any>): void;
    /**
     * Debug log method
     * @param strMessage
     * @param AdditionalMessage
     */
    log(strMessage: any, ...AdditionalMessage: Array<any>): void;
    /**
     * Debug debug method
     * @param strMessage
     * @param AdditionalMessage
     */
    debug(strMessage: any, ...AdditionalMessage: Array<any>): void;
    /**
     * Get records from log by filters
     * @param strMode
     * @param strMessage
     * @param strStackMethod
     * @param strStackFile
     * @return {Array}
     */
    getLogRects(strMode?: any, strMessage?: any, strStackMethod?: string, strStackFile?: string): any;
    /**
     * Get log record by ID
     * @param ID
     */
    getLogRectByID(ID: any): any;
    /**
     * Clean debug log
     */
    clearLog(): void;
    /**
     * Write message into the log stack and console
     * @param mode
     * @param strMessage
     */
    write(mode: string, strMessage: any): void;
    /**
     * Implementation of the console window error method
     * @param strMessage
     * @param AdditionalMessage
     * @public
     */
    _error(strMessage: any, ...AdditionalMessage: Array<any>): void;
    /**
     * Implementation of the console window warn method
     * @param strMessage
     * @param AdditionalMessage
     * @public
     */
    _warn(strMessage: any, ...AdditionalMessage: Array<any>): void;
    /**
     * Implementation of the console window info method
     * @param strMessage
     * @param AdditionalMessage
     * @public
     */
    _info(strMessage: any, ...AdditionalMessage: Array<any>): void;
    /**
     * Implementation of the console window log method
     * @param strMessage
     * @param AdditionalMessage
     * @public
     */
    _log(strMessage: any, ...AdditionalMessage: Array<any>): void;
    /**
     * Implementation of the console window debug method
     * @param strMessage
     * @param AdditionalMessage
     * @public
     */
    _debug(strMessage: any, ...AdditionalMessage: Array<any>): void;
}
export default CSDebug;
