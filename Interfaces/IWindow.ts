"use strict";
/**
 * Import sub interfaces
 */
import IAnimationFrame from "./IAnimationFrame";
import IDebug from "./IDebug";
/**
 * The storage interface
 */
interface IWindow {
    document: any;
    Utils: any;

    eventListenerAdded: boolean;

    pageXOffset: number;
    pageYOffset: number;
    innerHeight: number;
    innerWidth: number;

    onerror: Function;
    requestAnimationFrame: Function;
    webkitRequestAnimationFrame: Function;
    mozRequestAnimationFrame: Function;
    oRequestAnimationFrame: Function;
    msRequestAnimationFrame: Function;

    setTimeout(callback: Function, time: number): number;

    Debug: IDebug;
    AnimationFrame: IAnimationFrame;
}
/**
 * Declare window interface
 */
declare var window: IWindow;
/**
 * Export the window interface
 */
export default IWindow;
