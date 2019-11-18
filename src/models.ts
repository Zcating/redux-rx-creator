// tslint:disable: no-any
import {Action} from 'redux';

// declare to make it property-renaming safe
export declare interface TypedAction<T extends string> extends Action {
    readonly type: T;
}

export type ActionType<A> = A extends ActionCreator<infer T, infer C>
    ? ReturnType<C> & { type: T }
    : never;

/**
 * A function that takes an `Action` and a `State`, and returns a `State`.
 * See `createReducer`.
 */
export interface ActionReducer<T, V extends Action = Action> {
    (state: T | undefined, action: V): T;
}

/**
 * A type to mark not allow message.
 */
export const arraysAreNotAllowedMsg = 'arrays are not allowed in action creators';
type ArraysAreNotAllowed = typeof arraysAreNotAllowedMsg;

export type DisallowArraysAndTypeProperty<T> = T extends any[]
    ? ArraysAreNotAllowed
    : T extends { type: any } ? TypePropertyIsNotAllowed : T;

export const typePropertyIsNotAllowedMsg = 'type property is not allowed in action creators';
type TypePropertyIsNotAllowed = typeof typePropertyIsNotAllowedMsg;

/**
 * A function that returns an object in the shape of the `Action` interface.  Configured using `createAction`.
 */
export type Creator<P extends any[] = any[],
    R extends object = object> = R extends any[]
    ? ArraysAreNotAllowed
    : R extends { type: any }
        ? TypePropertyIsNotAllowed
        : FunctionWithParametersType<P, R>;

export type PropsReturnType<T extends object> = T extends any[]
    ? ArraysAreNotAllowed
    : T extends { type: any }
        ? TypePropertyIsNotAllowed
        : { _as: 'props'; _p: T };


/**
 * See `Creator`.
 */
export type ActionCreator<T extends string = string,
    C extends Creator = Creator> = C & TypedAction<T>;

export type FunctionWithParametersType<P extends unknown[], R = void> = (
    ...args: P
) => R;

export type ParametersType<T> = T extends (...args: infer U) => unknown
    ? U
    : never;
