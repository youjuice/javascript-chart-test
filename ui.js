/**
 * ui.js - UI 관련 모듈
 */

window.UIModule = (function() {
    // 테이블 렌더링 함수
    function renderDataTable(data) {
        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = '';

        // 데이터가 없는 경우
        if (data.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `<td colspan="3">데이터가 없습니다</td>`;
            tableBody.appendChild(emptyRow);
            return;
        }

        // 각 데이터 추가
        data.forEach(item => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', item.id);

            row.innerHTML = `
                <td>${item.id}</td>
                <td>
                    <input type="number" class="edit-value" value="${item.value}" data-id="${item.id}">
                </td>
                <td>
                    <button class="btn danger delete-btn" data-id="${item.id}">삭제</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    // JSON 에디터 업데이트 함수
    function updateJsonEditor(data) {
        const jsonEditor = document.getElementById('json-editor');
        jsonEditor.value = JSON.stringify(data, null, 2);
    }

    // JSON 에디터의 값을 가져오는 함수
    function getJsonEditorContent() {
        return document.getElementById('json-editor').value;
    }

    // 입력 필드 초기화
    function clearInputs() {
        document.getElementById('new-id').value = '';
        document.getElementById('new-value').value = '';
        document.getElementById('new-id').classList.remove('input-error');
        document.getElementById('new-value').classList.remove('input-error');
    }

    return {
        renderDataTable,
        updateJsonEditor,
        getJsonEditorContent,
        clearInputs
    };
})();