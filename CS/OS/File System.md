# File system

## File Concept

- File 이란?
  - Array of Bytes
  - 관련 정보들의 집합

- File System
  - 파일과 physical disk block 간의 mapping 을 제공한다.
  - 디스크의 위치 배치를 담당
  - 덕분에 우리는 파일이 저장된 물리적 위치를 알 필요가 없다.
  - 파일 시스템에 따라 파일들의 배치나 구성이 달라질 수 있다.
- File Attributes
  - name : 파일 이름
  - type : executable. text. library. archive. multimedia 등
  - location : 장치에 저장되어 있는 위치
  - size : 파일 사이즈
  - protection : 접근 권한 정보 등
  - 그 외 메타 데이터 : 시간. 유저 인포 등
- **File 은 Directory Structure 에 저장이 된다.**
- File Operations
  - Create
  - Write
  - Read
  - File Seek
  - Delete
  - Open
  - Close
- Current File Position Pointer : 파일에 대해 프로세스가 어디까지 작업했는지 자동으로 기록하는 포인터
- Open/Close Semantics
  - 여러 프로세스가 파일을 공유하는 경우
  - 2개의 Open File Table 을 유지
    - Per Process Table
    - System-wide Table
  - Open Count → 열때마다 증가. 닫을때마다 감소
  - Delete 는 Open Count가 0일 때만 가능한 operation이다.

## File Access Method

- 순차 접근
  - 파일에 있는 정보에 대한 접근은 레코드 순서대로 이루어진다.
  - read next. write next. reset
- 임의 접근
  - 파일의 어떠한 위치라도 바로 접근해서 읽기 및 쓰기를 수행한다.
  - 이는 File System이 이러한 기능을 제공해주기 때문
  - Read n. Write n (n= 읽고자하는 블록 number)

## 전형적인 File System 구성

- File system은 여러 개의 계층으로 나뉘어져 구성되어있다
  - application programs → Virtual File System → file-organization module → basic fle system → I/O control → devices
- 파일 시스템을 유연하게 사용 가능. 여러개의 파일 시스템을 사용할 수 있도록.

## Mount

- 파일을 사용하려면 Open 해야한다. 파일 시스템을 사용하려면 Mount를 해야한다.

- mount : directory 와 device 를 붙여서 하나의 경로이게끔?

  - `/home/a/b/c`

- 분산된 파일 시스템 → 쉽게 편리하게 사용하기 위해 마운트 사용


## Directory Structure Concept

- 파일들에 대한 정보를 가지는 노드들의 집합
- 파일과 디렉토리 구조는 모두 디스크 상에 있다.
- Single-level Directory
  - 모든 사용자에 대해서 하나의 단일한 디렉토리
- Two-level Directory
  - 사용자 마다 디렉토리를 분리
- Tree-Structured Directories
  - 효율적인 탐색. Grouping 특성
- Acyclic-Graph Directories
  - 다른 디렉토리에서 같은 파일 삭제
- General Graph Directory
  - 사이클이 없도록 보장하는 방법 → 링크는 파일로만 가능. Cycle Detection Algorithm

## File 구현

- 디스크 블록은 파일 시스템의 입출력 단위. → block 단위
- data block의 위치 정보를 어떻게 저장할지? → 운영체제마다 다름
- Contigous Allocation
  - 파일을 물리적으로 연속된 디스크 블록에 저장한다.
  - 구현이 간단하고 읽기 성능 뛰어남. 한번에 끝까지 기록해야하고 공간 낭비
- Linked List Allocation
  - 데이터 블록을 Linked List로 구현된다.
  - 공간의 낭비가 없다. 디스크의 어디든지 위치 가능.
  - Random Access 가 불가능하다. 포인터가 있어야한다
- Linked List Allocation using an index
  - 데이터에 관련된 블럭 중 index block 는 모든 데이터 블록의 위치를 알 수 있다.
  - 빠르게 Random Access 가능
  - 최대 파일의 크기가 고정되어있다. 인덱스 블록의 크기도 고정되어있으니까
- **I-nodes**
  - Data block index들을 테이블 형태로 관리하는 방법
  - 구성 요소
    - 파일에 대한 속성 = Field
    - 작은 파일을 위한 direct index
    - 파일의 크기가 커지면서 데이터 블록의 인덱스를 저장하기 위한 인덱스 테이블 필요

## Directory 구현

- Directory entry : 파일 이름이나 속성 같은 정보가 저장
- Directories in MS-DOS
  - Linked List Allocation → 맨 처음의 데이터 블럭을 알면 전체의 파일 데이터를 알 수 있다
- Directories in UNIX
  - 파일 속성 등 정보는 I-Node 에 저장

## Protection

- 저장된 정보에 부적절한 접근을 막는 것
- Access Lists and Groups (Read.Write.Execute)
  - owner : 111
  - group : 110 → owner가 속해있는 그룹
  - public : 001

## 참고 자료

숭실대 3학년 1학기 운영체제 전공 수업 