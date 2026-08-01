export const metadata = {
  title: "개인정보처리방침 | 오늘의 운세",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col gap-6 px-6 py-16 text-zinc-800 dark:text-zinc-200">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        개인정보처리방침
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        &ldquo;오늘의 운세&rdquo;(이하 &ldquo;서비스&rdquo;)는 이용자의 개인정보를 아래와 같이 수집·이용합니다.
      </p>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          1. 수집하는 개인정보 항목
        </h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed">
          <li>회원가입 시: 이메일 주소, 비밀번호(암호화 저장)</li>
          <li>운세 뽑기 시: 이름(로그인하지 않은 경우 직접 입력한 값), 생성된 운세 내용, 날짜</li>
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          2. 수집 목적
        </h2>
        <p className="text-sm leading-relaxed">
          회원 식별 및 로그인, 뽑은 운세 기록 저장 및 조회 기능 제공 목적으로만 이용합니다.
          마케팅, 광고, 제3자 제공 등 다른 목적으로는 이용하지 않습니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          3. 보유 및 이용 기간
        </h2>
        <p className="text-sm leading-relaxed">
          회원 탈퇴 또는 삭제 요청 시까지 보관하며, 요청 시 지체 없이 파기합니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          4. 개인정보의 국외 이전
        </h2>
        <p className="text-sm leading-relaxed">
          서비스는 데이터베이스 및 인증 기능 제공을 위해 Supabase(해외 사업자)를, 호스팅을 위해
          Vercel(해외 사업자)을 이용합니다. 수집된 개인정보는 해당 서비스의 서버(아시아·태평양 리전 등)에
          저장·처리될 수 있습니다.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          5. 이용자의 권리
        </h2>
        <p className="text-sm leading-relaxed">
          이용자는 언제든지 본인의 개인정보에 대한 열람, 정정, 삭제를 요청할 수 있습니다. 아래
          연락처로 문의해주세요.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          6. 문의처
        </h2>
        <p className="text-sm leading-relaxed">운영자 연락처: (이메일 주소를 입력해주세요)</p>
      </section>
    </div>
  );
}
