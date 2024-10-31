<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>เกมปริศนาถอดรหัส</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
            font-family: Arial, sans-serif;
            text-align: center;
        }
        #result {
            margin-top: 10px;
        }
        .correct {
            color: green;
        }
        .incorrect {
            color: red;
        }
    </style>
</head>
<body>
    <h1>ลองใส่รหัสผ่าน</h1>
    <div id="levelContainer">
        <p id="levelText"></p>
        <input type="text" id="passwordInput" placeholder="กรอกรหัสผ่าน">
        <button id="checkButton">ตรวจสอบ</button>
        <p id="result"></p>
    </div>
    <script>
        // ข้อมูลสำหรับแต่ละด่าน
        const levels = [
            { description: "ลองใส่ PASSWORD ดูสิ", password: "PASSWORD" },
            { description: "2 + 5 เท่ากับเท่าใด", password: "7" },
            { description: "สิ่งที่มีค่าที่สุดในชีวิตผมคือ?", password: "Milk" }
        ];
        
        const attempts = Array(levels.length).fill(0); // ตัวแปรเก็บจำนวนครั้งที่พลาดในแต่ละด่าน
        let currentLevel = 0; // ตัวแปรเก็บด่านปัจจุบัน

        // อัพเดตข้อความแสดงด่านปัจจุบัน
        function updateLevelText() {
            document.getElementById("levelText").textContent = `ด่านที่ ${currentLevel + 1}: ${levels[currentLevel].description}`;
        }

        // เริ่มเกม
        updateLevelText();

        // ตรวจสอบรหัสผ่าน
        document.getElementById("checkButton").addEventListener("click", function() {
            const userInput = document.getElementById("passwordInput").value;

            // เพิ่มจำนวนครั้งที่พลาดในด่านปัจจุบัน
            attempts[currentLevel]++;

            // ล้างข้อความผลก่อนหน้านี้
            document.getElementById("result").textContent = '';

            // ตรวจสอบรหัสผ่าน
            if (userInput === levels[currentLevel].password) {
                document.getElementById("result").textContent = `รหัสผ่านถูกต้อง! คุณพยายาม ${attempts[currentLevel - 1]} ครั้งในด่านนี้`;
                document.getElementById("result").className = 'correct'; // เปลี่ยนเป็นสีเขียว
                
                if (currentLevel < levels.length - 1) {
                    currentLevel++; // เปลี่ยนไปยังด่านถัดไป
                    updateLevelText(); // อัพเดตข้อความแสดงด่าน
                } else {
                    // เมื่อถึงด่านสุดท้าย
                    let summary = "สรุปจำนวนครั้งที่พลาดในแต่ละด่าน:<br>";
                    for (let i = 0; i < attempts.length; i++) {
                        summary += `ด่าน ${i + 1}: ${attempts[i]} ครั้ง<br>`;
                    }
                    document.getElementById("result").innerHTML = `รหัสผ่านถูกต้อง! คุณพยายาม ${attempts[currentLevel - 1]} ครั้งในด่านนี้<br>${summary}`;
                }
            } else {
                document.getElementById("result").textContent = `รหัสผ่านผิด! คุณพยายาม ${attempts[currentLevel]} ครั้งในด่านนี้`;
                document.getElementById("result").className = 'incorrect'; // เปลี่ยนเป็นสีแดง
            }

            // ล้างช่องกรอกรหัสผ่าน
            document.getElementById("passwordInput").value = '';
        });
    </script>
</body>
</html>
