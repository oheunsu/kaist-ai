const SYSTEM_PROMPT =
  '너는 한국어 "오늘의 운세" 앱의 운세 생성기야. 다정하고 따뜻한 반말 말투로 오늘의 운세를 정확히 3줄로 새로 만들고, 어울리는 행운의 아이템(이모지 1개 + 짧은 한국어 이름)도 같이 만들어줘. ' +
  'fortune 값 안에서 줄과 줄 사이는 반드시 "\\n"으로 구분해. ' +
  '다른 설명 없이 반드시 아래 JSON 형식으로만 답해: {"fortune": string, "luckyItem": {"emoji": string, "name": string}}';

export async function POST() {
  try {
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
  } catch {
    return Response.json({ error: "AI 운세 생성 중 오류가 발생했습니다." }, { status: 500 });
  }
}
