---
title: 오늘 배운것
date: 2026-10-20
excerpt: 클로드 코드로 블로그를 만들면서 HTML, CSS, JavaScript가 각각 어떤 역할을 하는지 정리했습니다.
tags: 학습, HTML, CSS, JavaScript
---

클로드 코드와 함께 이 블로그를 만들면서, 세 가지 기술이 각각 어떤 역할을 맡고 있는지 다시 정리하게 되었습니다.

## HTML — 뼈대를 만든다

HTML은 페이지에 어떤 요소들이 있는지, 그 요소들이 어떤 순서와 구조로 놓이는지를 정의합니다. 이 블로그에서는 `index.html`이 글 목록이 들어갈 자리(`#post-list`)를, `post.html`이 글 제목과 본문이 들어갈 자리(`#post-title`, `#post-content`)를 미리 비워 놓고, 이후 JavaScript가 그 자리를 채워 넣는 방식으로 쓰였습니다.

## CSS — 보이는 방식을 결정한다

CSS는 같은 구조라도 어떻게 보이게 할지를 결정합니다.

- `:root`에 색상, 글자 크기 같은 값을 CSS 변수로 정의해두면, 다크 모드처럼 테마가 바뀔 때 변수 값만 덮어써서 전체 디자인을 한 번에 바꿀 수 있었습니다.
- 본문 너비를 제한하고 줄간격을 넉넉히 주는 것만으로 가독성이 크게 달라진다는 걸 체감했습니다.
- 미디어 쿼리로 작은 화면에서 레이아웃이 깨지지 않도록 별도로 점검해야 한다는 것도 배웠습니다.

## JavaScript — 데이터를 가져와 동작을 만든다

JavaScript는 정적인 HTML/CSS에 생명을 불어넣는 역할을 합니다. 이 블로그에서는:

- `fetch`로 `posts/manifest.json`과 각 `.md` 파일을 읽어옵니다.
- 마크다운 텍스트를 파싱해서 실제 HTML로 변환합니다.
- 사용자가 다크 모드 버튼을 누르면 `localStorage`에 선택값을 저장해서, 다시 방문했을 때도 같은 테마가 유지되도록 합니다.

```js
document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
localStorage.setItem("theme", isDark ? "dark" : "light");
```

## 정리

> HTML은 무엇이 있는지, CSS는 어떻게 보이는지, JavaScript는 어떻게 동작하는지를 담당한다.

이 세 가지가 역할을 명확히 나눠 맡고 있다는 걸 직접 코드를 보며 확인할 수 있어서 좋았습니다.
