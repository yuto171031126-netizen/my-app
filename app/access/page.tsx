export default function AccessPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black mb-2">Access</h1>
        <p className="text-zinc-400 mb-8">開催場所：長崎大学 中部講堂</p>

        {/* 地図エリア */}
        <div className="bg-zinc-900 p-2 rounded-2xl border border-zinc-800 shadow-2xl mb-8">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.2312613149887!2d129.86903907663243!3d32.79374467366381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x351558bf2a096c15%3A0x63346e6a18d1847c!2z6ZW35bSO5aSn5a2mIOOCueODs-ODiOOCu-ODs-OCueOCr-ODh-ODquODvA!5e0!3m2!1sja!2sjp!4v1717402800000!5m2!1sja!2sjp" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            className="rounded-xl"
          ></iframe>
        </div>

        {/* 道順テキスト */}
        <div className="space-y-6 text-zinc-300">
          <div>
            <h3 className="font-bold text-white mb-2">📍 詳細情報</h3>
            <p className="text-sm leading-relaxed">
              〒852-8521 長崎県長崎市文教町1-14<br />
              長崎大学 文教キャンパス内 中部講堂
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-2">🚌 お越しの方へ</h3>
            <p className="text-sm leading-relaxed">
              路面電車「長崎大学」電停から徒歩約5分です。大学正門から入り、案内に従って中部講堂へお越しください。
            </p>
          </div>
        </div>

        <a href="/" className="inline-block mt-12 text-purple-400 underline">← ホームに戻る</a>
      </div>
    </div>
  );
}