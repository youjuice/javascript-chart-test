### 프로젝트 소개
데이터 관리 및 시각화 웹 애플리케이션입니다. 
ID와 VALUE 쌍으로 구성된 데이터를 관리하고 차트로 표시합니다.

### 파일 구조
```
├── index.html         # 메인 HTML 구조
├── index.css          # 스타일시트
├── data.js            # 데이터 관리 모듈
├── chart.js           # 차트 관련 모듈
├── ui.js              # UI 관련 모듈
├── json-editor.js     # JSON 에디터 기능 모듈
└── main.js            # 메인 모듈 (이벤트 핸들러 및 초기화)
```

### 주요 기능
- 차트를 통한 데이터 시각화
- 테이블 형식의 데이터 편집 및 삭제
- 새로운 데이터 추가
- JSON 형식으로 고급 데이터 편집

### 추가 구현 기능
#### 데이터 유효성 검사
- 음수 값 입력 방지
- ID 중복 검사
- JSON 형식 실시간 검증

#### 사용자 경험(UX) 개선
- 사용자 피드백 제공
- 데이터 삭제 확인 절차
- 입력 필드 자동 초기화

#### 차트 기능 개선
- 큰 값 범위 감지 및 로그 스케일 자동 적용
- 상세 툴팁으로 정확한 값 확인

#### JSON 편집기 강화
- 탭 키 지원으로 들여쓰기 편의성
- 템플릿 버튼으로 빠른 데이터 조작
