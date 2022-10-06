## Docker	

#### Docker

- 컨테이너 기반의 오픈소스 가상화 플랫폼



- 이미지 내려받기 (최신 안정화 버전)

```bash
docker pull ubuntu:latest
docker pull ubuntu:20.04
```

- 컨테이너 생성하기

```
docker run -it --name [container-name] [image-name]
```

- 컨테이너 실행하기

```
docker ps
docker start [container-name]
```



+Ubuntu 설정

```
apt-get update
apt-get upgrade -y
apt-get install build-essential gdb [...라이브러리? 설치]
```

