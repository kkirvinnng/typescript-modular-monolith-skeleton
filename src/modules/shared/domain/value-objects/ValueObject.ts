import { Primitives } from '../../types/Primitives'

export abstract class ValueObject<T extends Primitives>{
    readonly value: T

    protected constructor(value: T) {
        this.value = value
        this.assertIsValid(value)
    }

    protected abstract assertIsValid(value: T): void;

    equals(vo: ValueObject<T>): boolean {
        return vo.constructor.name === this.constructor.name && this.value === vo.value
    }

}