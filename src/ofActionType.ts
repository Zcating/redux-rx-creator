import {ActionCreator, Creator} from './models';
import { Action } from 'redux';

import {OperatorFunction} from 'rxjs';
import {filter} from 'rxjs/operators';

type ActionExtractor<
    T extends string | AC,
    AC extends ActionCreator<string, Creator>,
    E
> = T extends string ? E : ReturnType<Extract<T, AC>>;

export function ofActionType<
    AC extends ActionCreator<string, Creator>[],
    U extends Action = Action,
    V = ReturnType<AC[number]>
>(...allowedTypes: AC): OperatorFunction<U, V>;

export function ofActionType<
    E extends Extract<U, { type: T1 }>,
    AC extends ActionCreator<string, Creator>,
    T1 extends string | AC,
    U extends Action = Action,
    V = T1 extends string ? E : ReturnType<Extract<T1, AC>>
>(t1: T1): OperatorFunction<U, V>;

export function ofActionType<
    E extends Extract<U, { type: T1 | T2 }>,
    AC extends ActionCreator<string, Creator>,
    T1 extends string | AC,
    T2 extends string | AC,
    U extends Action = Action,
    V = ActionExtractor<T1 | T2, AC, E>
>(t1: T1, t2: T2): OperatorFunction<U, V>;
export function ofActionType<
    E extends Extract<U, { type: T1 | T2 | T3 }>,
    AC extends ActionCreator<string, Creator>,
    T1 extends string | AC,
    T2 extends string | AC,
    T3 extends string | AC,
    U extends Action = Action,
    V = ActionExtractor<T1 | T2 | T3, AC, E>
>(t1: T1, t2: T2, t3: T3): OperatorFunction<U, V>;

export function ofActionType<
    E extends Extract<U, { type: T1 | T2 | T3 | T4 }>,
    AC extends ActionCreator<string, Creator>,
    T1 extends string | AC,
    T2 extends string | AC,
    T3 extends string | AC,
    T4 extends string | AC,
    U extends Action = Action,
    V = ActionExtractor<T1 | T2 | T3 | T4, AC, E>
>(t1: T1, t2: T2, t3: T3, t4: T4): OperatorFunction<U, V>;

export function ofActionType<
    E extends Extract<U, { type: T1 | T2 | T3 | T4 | T5 }>,
    AC extends ActionCreator<string, Creator>,
    T1 extends string | AC,
    T2 extends string | AC,
    T3 extends string | AC,
    T4 extends string | AC,
    T5 extends string | AC,
    U extends Action = Action,
    V = ActionExtractor<T1 | T2 | T3 | T4 | T5, AC, E>
>(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): OperatorFunction<U, V>;

export function ofActionType<V extends Action>(
    ...allowedTypes: Array<string | ActionCreator<string, Creator>>
): OperatorFunction<Action, V>;

// filter the action to get the right action
export function ofActionType(
    ...allowedTypes: Array<string | ActionCreator<string, Creator>>
): OperatorFunction<Action, Action> {
    return filter((action: Action) =>
        allowedTypes.some((typeOrActionCreator) => {
            if (typeof typeOrActionCreator === 'string') {
                // Comparing the string to type
                return typeOrActionCreator === action.type;
            }

            // We are filtering by ActionCreator
            return typeOrActionCreator.type === action.type;
        })
    );
}
