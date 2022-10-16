## Docker	

#### Docker

- 컨테이너 기반의 오픈소스 가상화 플랫폼



##### 이미지 내려받기 (최신 안정화 버전)

```bash
docker pull ubuntu:latest
docker pull ubuntu:20.04
```

##### 컨테이너 생성하기

```
docker run -it --name [container-name] [image-name]
```

##### 컨테이너 실행하기

```
docker ps
docker start [container-name]
```



##### 공유 디렉토리 연결하기 

도커를 구동하는 로컬 호스트 시스템과 도커 컨테이너 간에 공유 폴더를 연결(마운트)하는 방법이다. 

- 로컬 시스템 절대경로 지정하기

  ```
  docker -v [host system dir]:[container dir] [image-name]
  docker -volume="[host system dir]:[container dir]" [image-name]
  ```

- 현재 디렉토리를 공유 디렉토리로 지정하기.

  ```
  docker run -it -volume="$PWD:[container dir]" [image-name]
  ```

   

##### 도커 컨테이너 - 로컬 디렉토리 파일 복사하기

- 도커 -> 로컬

  ```bash
  docker cp [container-name]:[복사할 파일] [붙여넣을 폴더 경로]
  ```

- 로컬 -> 도커

  ```c
  docker cp [복사할 파일] [container-name]:[붙여넣을 폴더 경로]
  ```

  





+Ubuntu 설정

```
apt-get update
apt-get upgrade -y
apt-get install build-essential gdb [...라이브러리? 설치]
```

