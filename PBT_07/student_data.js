const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

function avgScore(s) {
    return s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3;
}

function classify(avg) {
    if (avg >= 8.0) return "Giỏi";
    if (avg >= 6.5) return "Khá";
    if (avg >= 5.0) return "Trung bình";
    return "Yếu";
}

const results = [];
for (let i = 0; i < students.length; i++) {
    const avg = avgScore(students[i]);
    results.push({
        name: students[i].name,
        avg: avg,
        grade: classify(avg),
        gender: students[i].gender,
        math: students[i].math,
        physics: students[i].physics,
        cs: students[i].cs,
    });
}

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
for (let i = 0; i < results.length; i++) {
    const r = results[i];
    const tb = r.avg.toFixed(1);
  console.log("| " + String(i + 1).padEnd(3) + " | " + r.name.padEnd(6) + " | " + tb.padEnd(4) + " | " + r.grade.padEnd(11) + " |");
}

const counts = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
for (let i = 0; i < results.length; i++) {
    counts[results[i].grade]++;
}
console.log("\nSố SV mỗi xếp loại:");
console.log(counts);

let maxIdx = 0;
let minIdx = 0;
for (let i = 1; i < results.length; i++) {
    if (results[i].avg > results[maxIdx].avg) maxIdx = i;
    if (results[i].avg < results[minIdx].avg) minIdx = i;
}
console.log("\nTB cao nhất:", results[maxIdx].name, "-", results[maxIdx].avg.toFixed(1));
console.log("TB thấp nhất:", results[minIdx].name, "-", results[minIdx].avg.toFixed(1));

let sumMath = 0, sumPhysics = 0, sumCs = 0;
for (let i = 0; i < students.length; i++) {
    sumMath += students[i].math;
    sumPhysics += students[i].physics;
    sumCs += students[i].cs;
}
const n = students.length;
console.log("\nĐiểm TB toàn lớp theo môn:");
console.log("Math:", (sumMath / n).toFixed(2));
console.log("Physics:", (sumPhysics / n).toFixed(2));
console.log("CS:", (sumCs / n).toFixed(2));

let mSum = 0, mCount = 0, fSum = 0, fCount = 0;
for (let i = 0; i < results.length; i++) {
    if (results[i].gender === "M") {
        mSum += results[i].avg;
        mCount++;
    } else {
        fSum += results[i].avg;
        fCount++;
    }
}
console.log("\nBonus - TB theo giới tính:");
console.log("Nam:", mCount ? (mSum / mCount).toFixed(2) : "N/A");
console.log("Nữ:", fCount ? (fSum / fCount).toFixed(2) : "N/A");
