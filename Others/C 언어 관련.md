# C 언어 관련 

## 데이터 타입

#### unsigned int 

- int의 양의 정수 범위만 사용하는 자료형
- 양의 표현이 int에 비해 2배.

#### size_t

- `long unsigned int` 의 별칭. 가장 큰 사이즈를 담을 수 있는 unsigned 데이터 타입

  

## 포인터

#### 포인터

- const char* ptr = 'hello' 라고 한다면 ptr은  read only data 영역에 저장되어 있는 'hello' 라는 문자열의 주소를 가리키는 포인터다. 

- const char* 은 32비트 운영체제에서는 4바이트, 64비트 운영체제에서는 8바이트로 고정되어있다. 

#### 다중 포인터

- const char** 은 const char * 의 주소값을 매개변수로 다루는 자료형



## File 관련 함수

#### fopen

```c
#include <stdio.h>

File *fs = fopen('test.txt','w');
fclose(fs);
```

- file 열고 작업 후 fclose 함수 필수



#### fputs

```c
int fputs(char const* message, FILE* file_stream);
```

- file에 문자열 message 저장 

   

#### fwrite

```c
size_t fwrite(void const* buffer, size_t elementSize, size_t elementCount, FILE* file_stream);
```



#### fgets

```c
char *fgets (char *string, int n, FILE *stream);
```

- stream 위치에서 n개의 문자를 읽다가  `\n`을 만나면 중단한다. 읽은 문자열은 string에 저장하고(`\n` 포함) 끝에 `\0`을 추가한다.

- string 버퍼를 가리키는 포인터 리턴. 

  

#### fread

```c
size_t fread(void *buffer, size_t size, size_t count, FILE *stream);
```

- stream에서 size 길이만큼 count 번 읽고, 읽은 문자열을 buffer에 저장한다. (buffer은 임시 공간)
- NULL을 제외한 읽은 데이터 값의 횟수 리턴. 

- ` num = fread( buffer, sizeof( buffer ), 1, stream );`

