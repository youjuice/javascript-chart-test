/**
 * main.js - 메인 모듈
 */

document.addEventListener('DOMContentLoaded', () => {
    refreshAllComponents();
    setupEventListeners();

    enhanceJsonEditor();
    setupTemplateButtons();
});

// 모든 컴포넌트 새로고침 함수
function refreshAllComponents() {
    const data = DataModule.getAllData();
    ChartModule.initOrUpdateChart(data);
    UIModule.renderDataTable(data);
    UIModule.updateJsonEditor(data);
}

// 이벤트 리스너 설정 함수
function setupEventListeners() {
    // 값 편집 적용
    document.getElementById('apply-edit').addEventListener('click', () => {
        const editInputs = document.querySelectorAll('.edit-value');
        let updateSuccess = true;

        editInputs.forEach(input => {
            const id = parseInt(input.getAttribute('data-id'));
            const value = parseInt(input.value);
            if (!isNaN(value)) {
                if (!DataModule.updateData(id, value)) {
                    updateSuccess = false;
                }
            }
        });

        // 성공 시 새로운 값으로, 실패 시 원래 값으로 돌아감
        refreshAllComponents();

        if (updateSuccess) {
            alert('데이터가 성공적으로 수정되었습니다.');
        }
    });

    // 데이터 삭제
    document.querySelector('#data-table tbody').addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            if (confirm(`ID: ${id} 항목을 삭제하시겠습니까?`)) {
                DataModule.deleteData(id);
                refreshAllComponents();
                alert(`ID: ${id} 항목이 삭제되었습니다.`);
            }
        }
    });

    // 값 추가
    document.getElementById('add-value').addEventListener('click', () => {
        const newIdInput = document.getElementById('new-id');
        const newValueInput = document.getElementById('new-value');

        const newId = parseInt(newIdInput.value);
        const newValue = parseInt(newValueInput.value);

        // 유효성 검사
        if (isNaN(newId) || isNaN(newValue)) {
            alert('유효한 ID와 값을 입력하세요.');
            return;
        }

        // 데이터 추가
        if (DataModule.addData(newId, newValue)) {
            refreshAllComponents();
            alert(`ID: ${newId} 항목이 추가되었습니다.`);
            UIModule.clearInputs();
        }
    });

    // JSON 편집 적용
    document.getElementById('apply-json').addEventListener('click', () => {
        try {
            const content = UIModule.getJsonEditorContent();
            const parsed = JSON.parse(content);
            const validation = DataModule.validateJsonData(parsed);

            if (!validation.isValid) {
                alert(validation.message);
                return;
            }

            if (DataModule.setDataFromJson(content)) {
                refreshAllComponents();
                alert('JSON 데이터가 성공적으로 적용되었습니다.');
            }
        } catch (error) {
            alert('유효하지 않은 JSON 형식입니다.');
        }
    });
}
