## Docker 명령어

##### 이미지 내려받기 (최신 안정화 버전)

```bash
docker pull ubuntu:latest
docker pull ubuntu:20.04
```

##### 이미지 리스트 출력

```bash
docker images
```

##### 컨테이너 리스트 출력

```bash
docker ps -a
```

##### 이미지를 이용하여 컨테이너 생성

```bash
docker run -it --name=[container-name] [image-name]
```

##### 이미지 삭제

```bash
docker rmi [image-name]
```

##### 중지된 컨테이너 시작 + 접속은 X

```bash
docker start [container-name]
```

##### 현재 켜져있는 컨테이너에 접속

```bash
docker exec -it [container-name] bash
docker attach [container-name]
```

##### 컨테이너 정지

```bash
docker stop [container-name]
```

##### 컨테이너 삭제

```bash
docker rm [container-name]
docker kill [container-name] 
```

##### 컨테이너 탈출

```bash
control+P+Q
```



##### 공유 디렉토리 연결하기

도커를 구동하는 로컬 호스트 시스템과 도커 컨테이너 간에 공유 폴더를 연결(마운트)하는 방법이다. 

- 로컬 시스템 절대경로 지정하기

  ```bash
  docker -v [host system dir]:[container dir] [image-name]
  docker -volume="[host system dir]:[container dir]" [image-name]
  ```

- 현재 디렉토리를 공유 디렉토리로 지정하기.

  ```bash
  docker run -it -volume="$PWD:[container dir]" [image-name]
  ```

   

##### 도커 컨테이너 - 로컬 디렉토리 파일 복사하기

- 도커 -> 로컬

  ```bash
  docker cp [container-name]:[복사할 파일] [붙여넣을 폴더 경로]
  ```

- 로컬 -> 도커

  ```bash
  docker cp [복사할 파일] [container-name]:[붙여넣을 폴더 경로]
  ```

