/**
 *
 * 이미지에 효과를 줄 때 사용되는 코드
 *
 */

const image = document.querySelector('#image-paper');
const canvas = document.querySelector('#paper');
canvas.width = 2100 / 4;
canvas.height = 2970 / 4;
const ctx = canvas.getContext('2d');
const cfv = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  'hue-rotate': 0,
  invert: 0,
  opacity: 100,
  saturate: 100,
  sepia: 0,
};
const cfu = {
  blur: 'px',
  brightness: '%',
  contrast: '%',
  grayscale: '%',
  'hue-rotate': 'deg',
  invert: '%',
  opacity: '%',
  saturate: '%',
  sepia: '%',
};
function getCFT(filter) {
  return `${filter}(${cfv[filter]}${cfu[filter]})`;
}

function draw() {
  let cft = ``;
  for (const filter in cfv) {
    cft += getCFT(filter) + ' ';
  }
  ctx.filter = cft;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

function updateControls() {
  for (const range of document.querySelectorAll(
    '#controls input[type=range]'
  )) {
    const filter = range.name;
    cfv[filter] = range.value;
    const label = document.querySelector(`#controls label[for=${filter}]`);
    label.innerHTML = getCFT(filter);
  }
}

setInterval(() => {
  updateControls();
  draw();
}, 100);

/**
 *
 * 프린트 버튼을 누를 때 사용되는 코드
 *
 */
const { jsPDF } = window.jspdf;

async function print(save = false) {
  // 새로운 PDF 파일 만들기
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // canvas 엘리먼트의 내용을 PNG 이미지 형태로 변환
  const png = canvas.toDataURL('image/png');

  // PNG 이미지를 PDF 파일 안에 넣기
  pdf.addImage(png, 'PNG', 0, 0, 210, 297);

  // 만들어진 PDF 파일을 백엔드 서버로 보내기
  if (save) {
    pdf.save(`pdf-${Date.now()}.pdf`);
  } else {
    fetch('/print', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pdf: pdf.output('datauristring'),
      }),
    }).then((response) => {
      console.log('ok');
    });
  }
}

// #button-print 엘리먼트 (프린트 버튼) 을 누르면 함수를 실행하기
document.querySelector('#button-print').addEventListener('click', () => {
  print();
});

// #button-save 엘리먼트 (PDF 로 저장 버튼) 을 누르면 함수를 실행하기
document.querySelector('#button-save').addEventListener('click', () => {
  print(true);
});
