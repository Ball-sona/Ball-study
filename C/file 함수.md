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

- 



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

