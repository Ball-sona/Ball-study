# React-hook-form

https://react-hook-form.com/

## how to use

```js
function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch('example'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register('example')} />
      <input {...register('exampleRequired', { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      <button>Submit</button>
    </form>
  );
}
```

- `useForm()`: 폼을 관리하는 기본 훅
- `handleSubmit(onSubmit)`: `onSubmit` 함수가 호출되면 폼 내 input들을 validate한다.
- `register(inputName)`: input을 `useForm`의 관리 대상으로 등록한다.
- `watch(inputName)`: input 값을 추적한다.
- `formState`: 에러 등 폼의 현재 상태를 나타낸다.

즉 기본적인 구조는 `useForm` 훅을 사용해서 폼 내 input들을 등록하고, 등록한 input들의 값과 유효 여부를 추적하며 폼 상태를 관리하는 구조이다.
