export const FORTUNES = [
  "오늘은 뜻밖의 좋은 소식이 들려올 거예요.",
  "작은 용기가 큰 행운을 불러오는 하루입니다.",
  "주변 사람에게 베푼 친절이 곧 나에게 돌아옵니다.",
  "미뤄왔던 일을 시작하기에 완벽한 타이밍이에요.",
  "평소보다 촉이 예리해지는 날, 직감을 믿어보세요.",
  "새로운 인연이 좋은 기회로 이어질 수 있어요.",
  "고민하던 문제의 실마리가 우연히 풀립니다.",
  "오늘은 무리하지 말고 여유를 즐기는 게 좋아요.",
  "금전운이 상승해요, 다만 과소비는 조심하세요.",
  "칭찬 한마디가 하루를 특별하게 만들어줄 거예요.",
  "생각지도 못한 곳에서 도움의 손길이 나타나요.",
  "오늘 내린 결정이 나중에 큰 도움이 됩니다.",
  "몸과 마음을 돌보면 컨디션이 눈에 띄게 좋아져요.",
  "가벼운 산책이 뜻밖의 영감을 가져다줄 거예요.",
  "솔직한 대화가 오해를 풀고 관계를 좋게 만듭니다.",
  "차분히 기다리면 원하는 결과가 찾아와요.",
  "오늘은 도전보다 정리와 마무리가 잘 맞는 날이에요.",
  "웃음이 많은 하루, 즐거운 일이 연달아 생겨요.",
  "작은 실수는 있어도 결국 좋은 방향으로 흘러갑니다.",
  "누군가와의 협업이 예상보다 큰 성과를 냅니다.",
];

export const LUCKY_ITEMS = [
  { emoji: "🍀", name: "네잎클로버" },
  { emoji: "🍋", name: "레몬" },
  { emoji: "📎", name: "클립" },
  { emoji: "🕯️", name: "향초" },
  { emoji: "🧦", name: "양말" },
  { emoji: "☂️", name: "우산" },
  { emoji: "🔑", name: "열쇠고리" },
  { emoji: "🪴", name: "작은 화분" },
  { emoji: "📚", name: "책" },
  { emoji: "🧢", name: "모자" },
  { emoji: "🍯", name: "꿀" },
  { emoji: "🧣", name: "목도리" },
  { emoji: "🪙", name: "동전" },
  { emoji: "🖊️", name: "볼펜" },
  { emoji: "🌻", name: "해바라기" },
  { emoji: "🍎", name: "사과" },
  { emoji: "🎧", name: "이어폰" },
  { emoji: "🧴", name: "핸드크림" },
  { emoji: "🪞", name: "손거울" },
  { emoji: "🧩", name: "퍼즐 조각" },
];

export function drawFortune() {
  const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
  const luckyItem =
    LUCKY_ITEMS[Math.floor(Math.random() * LUCKY_ITEMS.length)];
  return { fortune, luckyItem };
}
