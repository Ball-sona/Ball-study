# Git Merge

Github 에서 특정 브랜치에서 작업 완료 후 main 브랜치(혹은 develop 브랜치 등) 으로 머지하고자 하는 경우, 총 3가지의 Merge 종류 중 하나를 선택해야한다.

- Merge Commit : All commits from this branch will be added to the base branch via a merge commit.
- Squash Merging : The commits from this branch will be combined into one commit in the base branch.
- Rebase Merging : The commits from this branch will be rebased and added to the base branch.

## Merge Commit

머지 종류 중 default 값으로, 일반적으로 많이 사용되는 머지 방법이다. 상황에 따라 `Fast-forward`, `Recursive` 총 2가지 방식이 존재할 수 있다.

### Fast-forward

브랜치 머시 시점에, **베이스 브랜치에 커밋이 따로 없는 경우**에 실행되는 방식이다.

<img width="612" alt="스크린샷 2023-03-17 12 38 38" src="https://user-images.githubusercontent.com/67703882/225806744-27ce7a90-d2fc-40b2-b1f8-c9b946d20fe4.png">

`develop` 이 `master` 에서 분기된 이후, `master` 에서 추가적으로 커밋이 되지 않았다. 즉 `develop` 이 `master` 의 모든 내용을 포함하고 추가적인 내용을 담고 있는 것이다. 이때는 `master` 브랜치에 분기 이후 `develop` 의 추가 내용이 그대로 붙게 되고, <u>커밋 메세지가 따로 발생하지 않는다.</u>

### Recursive

브랜치 머지 시점에, **베이스 브랜치에 추가적인 커밋이 생긴 경우** 실행되는 방식이다.

<img width="706" alt="스크린샷 2023-03-17 12 43 05" src="https://user-images.githubusercontent.com/67703882/225807321-82169866-84aa-48d8-8a45-dec1e6d734a6.png">

`develop` 이 `master` 에서 분기된 이후, `master` 에서 hotfix 등 추가적인 커밋이 발생할 수 있다. 이때는 `develop`이 `master` 보다 순수 최신 버전이라고 보기에는 어렵다. 이런 경우에는 두 브랜치가 각자 다르게 가지고 있는 부분을 합친 새로운 커밋 메세지를 만들어서 병합하게 된다.

## Squash Merge

분기된 브랜치의 커밋 내역들을 베이스 브랜치에서 **하나의 새로운 커밋**으로 합치는 방식이다.

<img width="643" alt="스크린샷 2023-03-17 12 46 21" src="https://user-images.githubusercontent.com/67703882/225807720-198b88c4-80d3-456b-8323-cd94cae51427.png">

브랜치 및 커밋 히스토리를 깔끔하게 관리할 수 있다는 장점이 있으나, atomic commit level로 rollback하는 것이 불가능하다.

### 명령어

```shell
git merge --squash <checkouted_branch>
```

## Rebase Merge

분기 브랜치에서 커밋된 내용을 베이스 브랜치에 `rebase` 하여 커밋 내용을 재배치하고 추가 커밋 메세지 없이 머지하는 방식이다.

<img width="621" alt="스크린샷 2023-03-17 13 04 58" src="https://user-images.githubusercontent.com/67703882/225810015-921aeb04-adb4-4965-9fea-648ee94684fd.png">

### 명령어

```shell
/* 분기 브랜치에서 */
git rebase <base_branch>
git checkout <base_branch>
/* 베이스 브랜치에서 */
git merge <checkouted_branch>
```

## 참고자료

[세 가지의 Merge 방식](https://mangchhe.github.io/git/2021/09/04/GitMerge/)

[Git의 다양한 머지 전략 비교 - 우리 팀은 어떤 전략을 도입해야 할까?](https://inmoonlight.github.io/2021/07/11/Git-merge-strategy/)
