/**
 * data.js - 데이터 관리 모듈
 */

window.DataModule = (function() {
    // 샘플 데이터
    let sampleData = [
        { id: 0, value: 75 },
        { id: 1, value: 20 },
        { id: 2, value: 80 },
        { id: 3, value: 100 },
        { id: 4, value: 70 }
    ];

    let dataStore = [...sampleData];

    // 샘플 데이터 가져오는 함수
    function getSampleData() {
        return [...sampleData];
    }

    // 모든 데이터를 반환하는 함수
    function getAllData() {
        return dataStore;
    }

    // 데이터 추가 함수
    function addData(id, value) {
        // ID 중복 검사
        if (dataStore.some(item => item.id === parseInt(id))) {
            alert('중복된 ID입니다.');
            return false;
        }

        // 음수 검사
        if (parseInt(value) < 0) {
            alert('VALUE는 0 이상의 값만 입력 가능합니다.');
            return false;
        }

        dataStore.push({
            id: parseInt(id),
            value: parseInt(value)
        });

        return true;
    }

    // 특정 ID의 데이터 값을 업데이트하는 함수
    function updateData(id, value) {
        // 음수 검사
        if (parseInt(value) < 0) {
            alert('VALUE는 0 이상의 값만 입력 가능합니다.');
            return false;
        }

        const index = dataStore.findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
            dataStore[index].value = parseInt(value);
            return true;
        }
        return false;
    }

    // 특정 ID의 데이터를 삭제하는 함수
    function deleteData(id) {
        const initialLength = dataStore.length;
        dataStore = dataStore.filter(item => item.id !== parseInt(id));
        return dataStore.length !== initialLength;
    }

    // JSON 데이터 유효성 검사 함수
    function validateJsonData(data) {
        // 형식 검사
        if (!Array.isArray(data)) {
            return { isValid: false, message: '데이터는 배열 형식이어야 합니다.' };
        }

        // 각 항목의 속성 검사
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (!item.hasOwnProperty('id') || !item.hasOwnProperty('value')) {
                return {
                    isValid: false,
                    message: `${i + 1}번째 항목에 id 또는 value 속성이 없습니다.`
                };
            }
        }

        // 음수 검사
        for (let i = 0; i < data.length; i++) {
            const value = data[i].value;
            if (parseInt(value) < 0) {
                return {
                    isValid: false,
                    message: `${i + 1}번째 항목의 값(${value})이 음수입니다. 0 이상의 값만 허용됩니다.`
                };
            }
        }

        // ID 중복 검사
        const idMap = {};
        for (let i = 0; i < data.length; i++) {
            const id = data[i].id;
            if (idMap[id] !== undefined) {
                return {
                    isValid: false,
                    message: `중복된 ID(${id})가 있습니다: ${idMap[id] + 1}번째와 ${i + 1}번째 항목`
                };
            }
            idMap[id] = i;
        }

        return { isValid: true, message: `유효한 JSON 형식 (${data.length}개 항목)` };
    }

    // JSON 파싱 함수
    function setDataFromJson(jsonString) {
        try {
            const parsedData = JSON.parse(jsonString);
            const validation = validateJsonData(parsedData);

            if (!validation.isValid) {
                console.error(validation.message);
                return false;
            }

            // 검증 통과 시 데이터 업데이트
            dataStore = parsedData;
            return true;
        } catch (error) {
            console.error('JSON 파싱 오류:', error);
            return false;
        }
    }

    return {
        getSampleData,
        getAllData,
        addData,
        updateData,
        deleteData,
        validateJsonData,
        setDataFromJson
    };
})();