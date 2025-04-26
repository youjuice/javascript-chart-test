/**
 * json-editor.js - JSON 에디터 기능 개선
 */

// JSON 에디터 기능 개선 함수
function enhanceJsonEditor() {
    const jsonEditor = document.getElementById('json-editor');
    const statusDiv = document.getElementById('json-status');

    // 실시간 JSON 유효성 검사
    jsonEditor.addEventListener('input', () => {
        try {
            const content = jsonEditor.value;
            const parsed = JSON.parse(content);
            const validation = DataModule.validateJsonData(parsed);

            if (validation.isValid) {
                statusDiv.textContent = validation.message;
                statusDiv.style.color = 'green';
            } else {
                statusDiv.textContent = validation.message;
                statusDiv.style.color = 'red';
            }
        } catch (error) {
            statusDiv.textContent = '유효하지 않은 JSON 형식';
            statusDiv.style.color = 'red';
        }
    });

    // JSON 작성 시 탭 키 지원
    jsonEditor.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = jsonEditor.selectionStart;
            const end = jsonEditor.selectionEnd;

            // 탭 삽입
            jsonEditor.value = jsonEditor.value.substring(0, start) + '  ' +
                jsonEditor.value.substring(end);

            // 커서 위치 이동
            jsonEditor.selectionStart = jsonEditor.selectionEnd = start + 2;
        }
    });

    // 상태 업데이트
    const initialEvent = new Event('input');
    jsonEditor.dispatchEvent(initialEvent);
}

// JSON 템플릿 제공 함수
function setupTemplateButtons() {
    // 새 항목 추가 버튼 기능
    document.getElementById('new-item-button').addEventListener('click', () => {
        const jsonEditor = document.getElementById('json-editor');
        const template = '{ "id": 0, "value": 100 }';

        try {
            let content = jsonEditor.value.trim();
            if (content === '') {
                jsonEditor.value = '[\n  ' + template + '\n]';
            } else {
                let parsed = JSON.parse(content);
                if (Array.isArray(parsed)) {
                    // 기존 ID 추출
                    const existingIds = parsed.map(item => item.id);

                    // 새 항목 생성 (중복되지 않는 ID 찾기)
                    let newId = 0;
                    while (existingIds.includes(newId)) {
                        newId++;
                    }

                    // 새 항목에 중복되지 않는 ID 할당
                    const newItem = JSON.parse(template);
                    newItem.id = newId;

                    // 기존 배열에 새 항목 추가
                    parsed.push(newItem);
                    jsonEditor.value = JSON.stringify(parsed, null, 2);
                } else {
                    alert('현재 편집 중인 데이터가 배열 형식이 아닙니다.');
                }
            }
        } catch (error) {
            alert('현재 JSON이 유효하지 않습니다.');
        }

        // 상태 업데이트
        const inputEvent = new Event('input');
        jsonEditor.dispatchEvent(inputEvent);
    });

    // 초기화 버튼 기능
    document.getElementById('reset-button').addEventListener('click', () => {
        const jsonEditor = document.getElementById('json-editor');

        if (confirm('현재 내용이 초기 템플릿으로 대체됩니다. 계속하시겠습니까?')) {
            // 샘플 데이터 가져오기
            const sampleData = DataModule.getSampleData();
            jsonEditor.value = JSON.stringify(sampleData, null, 2);
            alert('JSON 에디터가 초기 템플릿으로 복원되었습니다. \n적용하려면 Apply 버튼을 클릭하세요.');
        }

        // 상태 업데이트
        const inputEvent = new Event('input');
        jsonEditor.dispatchEvent(inputEvent);
    });
}