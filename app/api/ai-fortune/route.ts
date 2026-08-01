const SYSTEM_PROMPT =
  '너는 한국어 "오늘의 운세" 앱의 운세 생성기야. 따뜻하고 긍정적인 톤의 오늘의 운세를 2~3문장으로 새로 만들고, 어울리는 행운의 아이템(이모지 1개 + 짧은 한국어 이름)도 같이 만들어줘. ' +
  '다른 설명 없이 반드시 아래 JSON 형식으로만 답해: {"fortune": string, "luckyItem": {"emoji": string, "name": string}}';

export async function POST() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "OPENROUTER_API_KEY가 설정되지 않았습니다." }, { status: 500 });
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 1,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: "오늘의 운세를 새로 만들어줘." },
      ],
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "OpenRouter 요청이 실패했습니다." }, { status: 502 });
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "";

  try {
    const parsed = JSON.parse(content);
    return Response.json(parsed);
  } catch {
    return Response.json({ error: "AI 응답을 해석하지 못했습니다." }, { status: 502 });
  }
}
