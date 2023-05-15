# AWS EC2와 Github Action으로 프론트엔드 CI/CD 구축하기



## EC2 Instance Settings

### 1. 인스턴스 생성

1. [EC2 대시보드](https://us-east-2.console.aws.amazon.com/ec2/home?region=us-east-2#Home) 이동 후 [인스턴스 시작] 클릭 

2. 인스턴스 설정 시작 

   - OS 이미지 : `Ubuntu Server 20.04` 선택

   - 인스턴스 유형 : `t2.micro` 설정(이게 제일 무난하다고 함.)


   - [새 키 페어 생성] 버튼 클릭 (키 페어는 패스워드 같은거)
     - `.pem` 파일이 다운받아지는데, 이후에 터미널에서 사용해야하므로 잘 찾을 수 있는 경로에 두자.

   - 다른 설정들은 그대로 두고 [인스턴스 시작] 클릭

1. 인스턴스 설치 완료

4. [인스턴스 ID] 눌러서 기본 정보 확인 -> IP주소 기억

5. 인스턴스 연결을 위해 [연결] 버튼 클릭

6. 인스턴스에 연결 > SSH 클라이언트 > `ssh` 로 시작하는 명령어 복사

   ```
   ssh -i "prr-key.pem" ubuntu@ec2-15-165-152-42.ap-northeast-2.compute.amazonaws.com
   ```

7. 인스턴스 정보 > [보안] > [인바운드 규칙 편집] > SSH, HTTP, HTTPS 설정

   ![스크린샷 2023-03-05 14.39.12](/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2023-03-05 14.39.12.png)

8. 위 명령어를 `.pem` 파일이 위치한 디렉토리로 이동 후 실행

9. ubuntu 실행 확인

### 2. 탄력적 IP 설정

> **탄력적 IP는 왜 설정하나?**
>
> 인스턴스를 중지하고 시작할때마다 EC2 인스턴스와 연결된 퍼블릭 IP는 자동으로 변경된다. 따라서 고정된 IP가 필요하다면 탄력적 IP를 발급받아 연결해주어야한다. 근데 이는 유료임. 그래서 필요없음 꺼줘야한다.

1. 네트워크 및 보안 > 탄력적 IP > [탄력적 IP 주소 할당]
2. 네트워크 경계 그룹 설정 > 할당 
3. [탄력적 IP 주소 연결] > 내 인스턴스 선택 > 연결 



## S3 Settings

> **S3란 ?**
>
>  파일을 저장할 수 있는 파일 서버 역할의 서비스이다. 어디서나 쉽게 데이터를 저장하고 불러올 수 있으며 파일 크기는 5TB까지 지원한다. 저장 공간은 무제한이다.

1. S3 > [버킷 만들기]
2. 버킷 이름, AWS 지역 설정 
3. 객체 소유권은 '권장 사항' 선택
4. !! 일단 그냥 기본 설정으로 둠 !!

![스크린샷 2023-03-05 14.49.30](/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2023-03-05 14.49.30.png)



## AWS IAM Settings

> **IAM 이란?** 
>
> AWS의 특정 기능을 사용할 수 있는 권한을 부여받은 사용자를 생성할 수 있는 기능. 이를 생성하면 Access Key 와 Secret Access Key를 부여받는데, 이를 통해 권한을 부여 받은 AWS 기능을 사용할 수 있다.

### 1. 사용자 추가

EC2, S3, CodeDeploy를 사용할 수 있는 권한 부여 받기

1. AWS > [IAM] 이동

2. 엑세스 관리 > 사용자 > [사용자 추가]

3. 권한 설정 > 권한 옵션을 '직접 정책 연결' 선택

4. 권한 정책 > `AmazonEC2FullAccess` , `AmazonS3FullAccess` , `AWSCodeDeployFullAcceess` 선택

   <img src="/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2023-03-05 12.55.53.png" alt="스크린샷 2023-03-05 12.55.53" style="zoom:60%;" />

5. 태그 추가 

   <img src="/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2023-03-05 14.18.39.png" alt="스크린샷 2023-03-05 14.18.39" style="zoom:60%;" />

6. Access key 와 Secret Access key를 저장해두자.

### 2. EC2 역할 추가

> **역할과 사용자의 차이는?**
>
> 사용자는 AWS 계정 내에서 생성된 특정 사용자에게만 귀속되는 것이라면, 역할은 이 역할을 부여받은 사용자는 모두 해당 서비스에 접근할 수 있다는 차이가 있다.

1. AWS > [IAM] 이동
2. 엑세스 관리 > 역할 > [역할 추가]
3. 엔티티 선택 > 'AWS 서비스' 선택 > 사용 사례를 'EC2' 로 선택
4. 권한 정책 > `AmazonEC2FullAccess` , `AmazonS3FullAccess` , `AWSCodeDeployFullAcceess` 선택
5. 태그 추가

### 3. Code Deploy 역할 추가

1. AWS > [IAM] 이동
2. 엑세스 관리 > 역할 > [역할 추가]
3. 엔티티 선택 > 'AWS 서비스' 선택 > 사용 사례를 'CodeDeploy' 로 선택
4. 권한 정책 > `AWSCodeDeployRole` 선택
5. 이름은 임의로 지정 

이렇게해서 총 2개의 역할을 만들었다. 

<img src="/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2023-03-05 14.29.24.png" alt="스크린샷 2023-03-05 14.29.24" style="zoom:67%;" />

### 4. EC2에 IAM 역할 연결

1. 인스턴스 선택 
2. 작업 > 보안 > [IAM 역할 수정]
3. 아까 만든 EC2 역할을 설정 > 역할 업데이트



## CodeDeploy Settings

### 1. CodeDeploy 생성

S3에 있는 파일들을 EC2에 옮겨서 실행시켜줄 CodeDeploy를 생성하자.

1. CodeDeploy > 배포 > 시작하기 > [애플리케이션 생성]

2. 애플리케이션 생성 > 컴퓨팅 플랫폼을 'EC2/온프레미스' 선택

3. [배포 그룹 생성] > 서비스 역할은 CodeDeploy용 IAM 선택, 환경 구성은 'Amazon EC2 인스턴스' 선택

4. 아까 만들었던 태그 추가 

   <img src="/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2023-03-06 23.30.43.png" alt="스크린샷 2023-03-06 23.30.43" style="zoom:60%;" /> 

5. 배포 설정은 'CodeDeployDefault.AllAtOnce' 선택

> - CodeDeployDefault.AllAtOnce : 한번에 가급적 많은 수의 인스턴스를 배포
>
> - CodeDeployDefault.HalfAtTime : 최대 절반의 인스턴스에 한번에 배포
>
> - CodeDeployDefault.OneAtTime : 한번에 한 인스턴스에만 배포

6. 로드 밸런스는 비활성화해주자. 

> 로드 밸런스는 배포가 되는 동안 트래픽을 차단했다가 배포 후 트래픽을 허용하여 트래픽의 균형을 맞추는 작업.

### 2. Code Deploy Agent 설치

EC2에서 CodeDeploy를 사용하려면 [Code Deploy Agent를 설치해주어야한다.](https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/codedeploy-agent-operations-install-ubuntu.html)

```
sudo apt update
sudo apt install ruby-full
sudo apt install wget

cd /home/ubuntu
wget https://aws-codedeploy-ap-northeast-2.s3.ap-northeast-2.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto > /tmp/logfile # 최신 버전 agent 설치
```

```
sudo service codedeploy-agent status # 잘 돌아가는지 확인
sudo service codedeploy-agent start # 실행
```



## EC2 Instance Project Settings

0. EC2 접속 및 git clone

1. node 설치

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
```

2. yarn 설치

```
sudo apt remove cmdtest
sudo apt remove yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - 
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn 
```

3. pm2 설치 (무중단 배포를 위해)

```
sudo npm install pm2 -g
```

4. 프로젝트 패키지 설치 및 pm2 시작

```
yarn
sudo npx pm2 start npm -- start // npm
sudo npx pm2 start yarn --interpreter bash -- start // yarn
```

5. 프로젝트가 백그라운드 모드로 잘 돌아가는지 확인

```
pm2 list
```



## Github Actions Settings

1. `.github/workflows/production.yml` 파일 생성

```yaml
name: Production

on:
  push:
    branches:
      - main

env:
  S3_BUCKET_NAME: ${{ secrets.S3_BUCKET_NAME }}
  CODE_DEPLOYMENT_APPLICATION_NAME: ${{ secrets.CODE_DEPLOYMENT_APPLICATION_NAME }}
  CODE_DEPLOY_DEPLOYMENT_GROUP_NAME: ${{ secrets.CODE_DEPLOY_DEPLOYMENT_GROUP_NAME }}

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies # 의존성 파일 설치
        run: yarn  

      - name: Run ESLint
        run: yarn lint

      - name: Build next app # 빌드
        run: yarn build

      - name: Make zip file # S3에 올릴 빌드한 프로젝트를 압축 
        run: zip -qq -r ./$GITHUB_SHA.zip . -x "node_modules/*"
        shell: bash

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_ID }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Upload to S3 # S3에 파일 업로드
        run: aws s3 cp --region ap-northeast-2 ./$GITHUB_SHA.zip s3://$S3_BUCKET_NAME/$GITHUB_SHA.zip

      - name: Code Deploy # CodeDeploy가 S3에서 파일을 가져오기
        run: |
          aws deploy create-deployment \
          --deployment-config-name CodeDeployDefault.AllAtOnce \
          --application-name ${{ env.CODE_DEPLOYMENT_APPLICATION_NAME }} \
          --deployment-group-name ${{ env.CODE_DEPLOY_DEPLOYMENT_GROUP_NAME }} \
          --s3-location bucket=$S3_BUCKET_NAME,bundleType=zip,key=$GITHUB_SHA.zip

      - name: start-notification # 슬랙 알림
        uses: 8398a7/action-slack@v3
        with:
          status: custom
          fields: workflow,job,commit,repo,ref,author,took
          custom_payload: |
            {
              attachments: [{
                color: '${{ job.status }}' === 'success' ? 'good' : '${{ job.status }}' === 'failure' ? 'danger' : 'warning',
                text: '${{ job.status }}' === 'success' ? `[Front] SUCCESS WORK!✔\n ${{github.base_ref}} from ${{github.head_ref}} \n${process.env.AS_JOB} (${process.env.AS_COMMIT}) by ${process.env.AS_AUTHOR}` 
            : `[Front] FAIL WORK!❌\n ${{github.base_ref}} from ${{github.head_ref}} \n${process.env.AS_JOB} (${process.env.AS_COMMIT}) by ${process.env.AS_AUTHOR}`,
              }]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
        if: always()

```

2. 디렉토리 루트에 `appsepc.yml` 파일 생성

```yml
version: 0.0
os: linux

files:
  - source: /
    destination: /home/ubuntu/prr-deploy # 프로젝트 저장할 경로

permissions: # EC2 인스턴스에 프로젝트를 저장하기 위한 권한 설정
  - object: /home/ubuntu/prr-deploy
    owner: ubuntu
    group: ubuntu
    mode: 755

hooks:
  AfterInstall: # 배포 완료 후 실행할 동작 
    - location: deploy.sh # deploy.sh를 실행 
      timeout: 1000 # 1000초 넘어가면 실패
      runas: root # root 권한 (run as root)
```

3. 디렉토리 루트에 `deploy.sh` 파일 생성

```sh
#!/bin/bash
REPOSITORY=/home/ubuntu/prr-deploy
cd $REPOSITORY

sudo yarn install --ignore-engines # 의존성 파일 설치 
sudo npx pm2 reload all # 프로젝트 변경된 내용 반영하기 위해 pm2 reload 
```



## reference

- [AWS EC2와 Github Actions로 프론트엔드 배포해보기](https://velog.io/@arthur/AWS-EC2%EC%99%80-Github-Actions%EB%A1%9C-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EB%B0%B0%ED%8F%AC%ED%95%B4%EB%B3%B4%EA%B8%B0-2)

- [Github Actions, AWS CodeDeploy를 활용한 CI/CD - Node.js](https://velog.io/@orijoon98/Github-Actions-AWS-CodeDeploy%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-CICD-Node.js2)

- [EC2 인스턴스를 이용한 배포 -NextJS, Express](https://hojung-testbench.tistory.com/entry/AWS-EC2-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%B0%B0%ED%8F%AC-NextJS-Express)


