function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function copyResult() {
  const result = document.getElementById("result").innerText;
  navigator.clipboard.writeText(result).then(() => {
    alert("Hasil berhasil disalin ke clipboard!");
  });
}

function convert() {
  const fromBase = parseInt(document.getElementById("fromBase").value);
  const toBase = parseInt(document.getElementById("toBase").value);
  const inputRaw = document.getElementById("inputNumber").value.trim();

  const resultSpan = document.getElementById("result");
  const explanationPre = document.getElementById("explanation");
  const resultBox = document.getElementById("resultBox");

  let explanation = "";
  const hexMap = "0123456789ABCDEF";
  let input = inputRaw.toUpperCase();

  let isNegative = false;
  if (input.startsWith("-")) {
    isNegative = true;
    input = input.slice(1);
  }

  let decimalValue = 0;

  if (fromBase !== 10) {
    const chars = input.split("").reverse();
    chars.forEach((char, i) => {
      let val = fromBase === 16 ? hexMap.indexOf(char) : parseInt(char);
      decimalValue += val * Math.pow(fromBase, i);
    });
  } else {
    decimalValue = parseInt(input);
  }

  if (isNaN(decimalValue)) {
    alert("Input tidak valid.");
    resultBox.style.display = "none";
    return;
  }

  // Perbaikan: selalu gunakan nilai positif
  const absDecimal = Math.abs(decimalValue);
  let result = "";

  if (fromBase === 10 && toBase === 2) {
    explanation += `Konversi desimal ${decimalValue} ke biner:\n`;
    let n = absDecimal;
    const steps = [];
    while (n > 0) {
      let bagi = Math.floor(n / 2);
      let sisa = n % 2;
      steps.push(`${n} dibagi 2 = ${bagi}, sisa ${sisa}`);
      n = bagi;
    }
    explanation += steps.join("\n");
    explanation += `\nSisa dibaca dari bawah ke atas untuk hasil biner.\n`;

    result = absDecimal.toString(2);
  } else if (fromBase === 2 && toBase === 10) {
    explanation += `Konversi biner ${inputRaw} ke desimal:\n`;
    const bits = input.split("").reverse();
    let total = 0;
    bits.forEach((bit, i) => {
      let val = parseInt(bit);
      let hasil = val * Math.pow(2, i);
      total += hasil;
      explanation += `Bit ke-${i} = ${bit}, maka ${bit} × 2^${i} = ${hasil}\n`;
    });
    explanation += `Jumlahkan semuanya = ${total}`;
    result = total.toString();
  } else if (fromBase === 10 && toBase === 16) {
    explanation += `Konversi desimal ${decimalValue} ke hexadesimal:\n`;
    let n = absDecimal;
    const steps = [];
    while (n > 0) {
      let bagi = Math.floor(n / 16);
      let sisa = n % 16;
      steps.push(`${n} dibagi 16 = ${bagi}, sisa ${sisa} (${hexMap[sisa]})`);
      n = bagi;
    }
    explanation += steps.join("\n");
    explanation += `\nBaca sisa dari bawah untuk hasil hexadesimal.`;
    result = absDecimal.toString(16).toUpperCase();
  } else if (fromBase === 16 && toBase === 10) {
    explanation += `Konversi hexadesimal ${inputRaw} ke desimal:\n`;
    const chars = input.split("").reverse();
    let total = 0;
    chars.forEach((char, i) => {
      let val = hexMap.indexOf(char);
      let hasil = val * Math.pow(16, i);
      total += hasil;
      explanation += `Huruf '${char}' → ${val} × 16^${i} = ${hasil}\n`;
    });
    result = total.toString();
  } else {
    explanation += `Konversi umum:\n`;
    explanation += `1. Konversi ${inputRaw} dari basis ${fromBase} ke desimal: ${decimalValue}\n`;
    explanation += `2. Lalu ke basis ${toBase}: ${absDecimal
      .toString(toBase)
      .toUpperCase()}`;
    result = absDecimal.toString(toBase).toUpperCase();
  }

  resultSpan.innerText = result;
  explanationPre.innerText = explanation;
  resultBox.style.display = "block";
}