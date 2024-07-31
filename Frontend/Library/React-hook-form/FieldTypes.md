# FieldTypes

```tsx
type Inputs = {
  id: string;
  pw: string;
  info: { code: number; name: string };
};

export function ReactHookForm() {
  const { register, handleSubmit, watch } = useForm<Inputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('id')} />
      {/** ... **/}
    </form>
  );
}
```

위 예시에서 `useForm`에 제네릭 타입으로 `Inputs` 를 전달하면, 자동으로 `register` 함수에 인자 타입이 `id | pw | info | info.code | info.name` 가 된다. 어떻게 `info.code` 같이 중첩 타입의 속성까지 파악할 수 있는건지 알고싶어서 타입을 뜯어보았다!

```ts
const register: UseFormRegister<TFieldValues>;

export type UseFormRegister<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TFieldName,
  options?: RegisterOptions<TFieldValues, TFieldName>
) => UseFormRegisterReturn<TFieldName>;
```

- `useForm`에 전달한 제네릭 타입은 `useFormRegister`의 제네릭 타입 `TFieldValues`로 전달된다.
- `useFormRegister` 타입을 보면 `TFieldName extends FieldPath<TFieldValues>`를 통해 `TFieldName`을 추출하고, 이를 `register`의 고정 인자인 `name`의 타입으로 사용한다.

````ts
export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;

/**
 * Type which eagerly collects all paths through a type
 * @typeParam T - type which should be introspected
 * @example
 * ```
 * Path<{foo: {bar: string}}> = 'foo' | 'foo.bar'
 * ```
 */
export type Path<T> = T extends any ? PathInternal<T> : never;
````

- `FieldPath`는 `Path` 타입을 사용하는데, 이는 전달 받은 타입 `T`(즉, `TFieldValues`)를 깊숙히 뜯어보면서 중첩 객체의 속성까지 추출한다고 주석에서 설명하고 있다.

```ts
/**
 * Helper type for recursively constructing paths through a type.
 * This obscures the internal type param TraversedTypes from exported contract.
 */
type PathInternal<T, TraversedTypes = T> =
  T extends ReadonlyArray<infer V>
    ? IsTuple<T> extends true
      ? {
          [K in TupleKeys<T>]-?: PathImpl<K & string, T[K], TraversedTypes>;
        }[TupleKeys<T>]
      : PathImpl<ArrayKey, V, TraversedTypes>
    : {
        [K in keyof T]-?: PathImpl<K & string, T[K], TraversedTypes>;
      }[keyof T];
```

엄 상당히 복잡하지만, 가장 먼저 `T`가 `readonly` 배열인지를 확인한다. 일단 `readonly` 배열이 아니라 가정하고 살펴보자.

```ts
{
	[K in keyof T]-? : PathImpl<K & string, T[K], TraversedTypes>;
}[keyof T];
```

- `[K in keyof T]` 를 통해서 T의 모든 속성에 대해 어떤 작업을 반복하는 걸 확인할 수 있다.
- 이때 `-?`을 통해 `id?:string` 같이 옵셔널 속성으로 된 애들을 필수 속성으로 만들어준다.
- 이렇게 추출한 `K & string` 와 `T[K]` , 그리고 `T`인 `TraversedTypes` 을 `PathImpl`의 제네릭 타입으로 전달한다.
  - ex) 위 예시에서 `K` 가 `code`인 상황이라면 `PathImpl<"code" | string, number, Inputs>` 가 되는 것

```ts
/**
 * Helper type for recursively constructing paths through a type.
 * This actually constructs the strings and recurses into nested
 * object types.
 */
type PathImpl<K extends string | number, V, TraversedTypes> = V extends
  | Primitive
  | BrowserNativeObject
  ? `${K}`
  : true extends AnyIsEqual<TraversedTypes, V>
    ? `${K}`
    : `${K}` | `${K}.${PathInternal<V, TraversedTypes | V>}`;
```

`PathImpl`은 한마디로 `T[K]` 가 원시 타입일 때까지 '재귀적으로' 분해하면서 `T` 내 모든 속성을 추출해낸다.

- 만약 `T[K]` 가 원시 타입이나 BrowserNativeObject 일 경우 재귀를 시작하지 않고 그대로 `K`를 반환한다., 그리고 `T`의 원본인 `TraversedTypes` 와 같은 경우 재귀를 멈추고 `K`를 반환한다.
- 원시 타입이 아닐 경우, 즉 `T[K]` 가 '객체'일 경우 `PathInternal<T[K], TraversedTypes | T[K]>` 를 호출해서, 이제 `T[K]` 내 속성들을 추출하기 시작한다.
- 이렇게 순회하면서 `TraversedTypes | V` 를 통해 `TraversedTypes`를 확장시켜가고, 순회가 끝나면 `{...}[keyof T]`를 통해 속성만 추출해서 반환한다.

즉 `PathInternal`는 `T`를 재귀적으로 순회하면서 `T`의 복사본인 `TraversedTypes`을 확장시켜가며 최종 타입을 누적시키는 방식을 통해 타입 내 모든 속성들을 추출한다. 그런데 `T` 가 '읽기 전용'이라면 이렇게 타입을 확장하는 방식을 사용할 수가 없다.

그렇기 때문에 `T` 가 `readonly` 배열인 경우 예외처리가 필요한 것이다.

```ts
IsTuple<T> extends true ? {
    [K in TupleKeys<T>]-?: PathImpl<K & string, T[K], TraversedTypes>;
}[TupleKeys<T>] : PathImpl<ArrayKey, V, TraversedTypes>
```

- `IsTuple<T> extends true`를 통해 `T` 가 튜플 타입인지, 즉 `[number, number]`처럼 길이가 고정되어있는 정적 배열인지 확인한다.
- 튜플이 맞다면 `TupleKeys<T>`를 통해 `T`의 고정 속성들을 따로 추출해준 후 `PathImpl`에 전달하여 확장 가능하도록 해주고, 튜플이 아니라면 길이가 고정되어있지 않으므로 그냥 `number`와 동일한 타입인 `ArrayKey`를 전달한다.
