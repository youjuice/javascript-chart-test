/**
 * data.js - 데이터 관리 모듈
 */

window.DataModule = (function() {
    // 샘플 데이터
    let dataStore = [
        { id: 0, value: 75 },
        { id: 1, value: 20 },
        { id: 2, value: 80 },
        { id: 3, value: 100 },
        { id: 4, value: 70 }
    ];

    // 모든 데이터를 반환하는 함수
    function getAllData() {
        return dataStore;
    }

    // 데이터 추가 함수
    function addData(id, value) {
        // ID 중복 검사
        if (dataStore.some(item => item.id === parseInt(id))) {
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

    // JSON 파싱 함수
    function setDataFromJson(jsonString) {
        try {
            const parsedData = JSON.parse(jsonString);

            // 유효성 검사
            if (!Array.isArray(parsedData)) {
                console.error('데이터는 배열 형식이어야 합니다.');
                return false;
            }

            // 각 항목 검사
            for (const item of parsedData) {
                if (!item.hasOwnProperty('id') || !item.hasOwnProperty('value')) {
                    console.error('각 항목은 id와 value 속성을 가져야 합니다.');
                    return false;
                }
            }

            // 데이터 업데이트
            dataStore = parsedData;
            return true;
        } catch (error) {
            console.error('JSON 파싱 오류:', error);
            return false;
        }
    }

    return {
        getAllData,
        addData,
        updateData,
        deleteData,
        setDataFromJson
    };
})();