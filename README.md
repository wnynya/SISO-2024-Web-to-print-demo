## 처음 설치

작동 환경: PDF 프린트 라이브러리가 윈도우 기반이라 윈도우에서 돌려야합니다.

1. node.js 설치
   [https://nodejs.org/en/download](https://nodejs.org/en/download) 에서 최신 LTS 버전 다운로드 후 설치

2. 리포지토리 다운로드해서 원하는 곳에 압축 풀기

3. 압축 푼 폴더 (package.json 파일이 있는 경로) 에서 터미널 열기 (윈도우 CMD)

4. 터미널에 `npm init` 명령어 사용해서 라이브러리 다운로드

## 서버 설정

`src/app.mjs` 파일 맨 위의 이 옵션들을 사용 환경에 맞게 바꿔야 합니다.

PORT 값은 숫자 (안 바꾸는 것을 추천)
밑에 프린터 이름과 프린터 속성은 양 끝의 따옴표를 지우면 안됩니다 (중요)

아마 프린터 이름이랑 프린터 속성의 `paper=...종이크키` 이 부분만 맞게 수정해주면 될꺼에요.

```js
const PORT = 8080; // 서버가 열릴 포트
const PRINTER_NAME = 'EPSON PM-400 Series'; // 프린터 이름
const PRINTER_SETTINGS = 'fit,color,paper=10 x 15 cm (4 x 6 in)'; // 프린터 속성
```

페이지에 들어갔을 때 로드되는 이미지는 `src/public/paper.jpg` 파일입니다.

## 서버 실행

1. 압축 푼 폴더 (package.json 파일이 있는 경로) 에서 터미널 열기 (윈도우 CMD)

2. 터미널에 `npm run start` 명령어 사용해서 서버 실행하기

## 접속하기

[https://localhost:8080](https://localhost:8080) 접속하면 사용할 수 있습니다.

서버 설정에서 PORT 값을 바꾼 경우 8080 을 바꾼 숫자로 입력해주세요.
