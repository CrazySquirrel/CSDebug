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
export default IWindow;
