// tslint:disable: no-any

import {
    Creator,
    ActionCreator,
    FunctionWithParametersType,
    PropsReturnType,
    DisallowArraysAndTypeProperty,
} from './models';

import {Action} from 'redux';

export declare interface TypedAction<T extends string> extends Action {
    readonly type: T;
}

/*
 * create Action
 */
export function createAction<T extends string>(type: T): ActionCreator<T, () => TypedAction<T>>;
export function createAction<T extends string, P extends object>(
    type: T,
    config: { _as: 'props'; _p: P },
): ActionCreator<T, (props: P) => P & TypedAction<T>>;

export function createAction<
    T extends string,
    P extends any[],
    R extends object
>(
    type: T,
    creator: Creator<P, DisallowArraysAndTypeProperty<R>>
): FunctionWithParametersType<P, R & Action<T>> & Action<T>;

export function createAction<T extends string, C extends Creator>(
    type: T,
    config?: { _as: 'props' } | C
): Creator {
    if (typeof config === 'function') {
        return defineType(type, (...args: any[]) => ({
            ...config(...args),
            type,
        }));
    }
    const as = config ? config._as : 'empty';
    switch (as) {
        case 'empty':
            return defineType(type, () => ({ type }));
        case 'props':
            return defineType(type, (obj: object) => ({
                ...obj,
                type,
            }));
        default:
            throw new Error('Unexpected config.');
    }
}

export function props<P extends object>(): PropsReturnType<P> {
    // the return type does not match TypePropertyIsNotAllowed, so double casting is used.
    return ({ _as: 'props', _p: undefined! } as unknown) as PropsReturnType<P>;
}

function defineType(type: string, creator: Creator): Creator {
    return Object.defineProperty(creator, 'type', {
        value: type,
        writable: false,
    });
}
