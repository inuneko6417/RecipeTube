export function LoadingCat() {
  return (
    <div className="flex flex-col items-center justify-center py-16 w-full overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm">
      <svg width="100%" height="220" viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="groundGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f3f4f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#e5e7eb" stopOpacity="1" />
            <stop offset="100%" stopColor="#f3f4f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 地面 */}
        <rect x="0" y="170" width="680" height="4" fill="url(#groundGrad)" rx="2" />

        <g>
          {/* 猫全体の移動（少し跳ねるような動きを追加） */}
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-200 0; 700 0"
            dur="2.5s"
            repeatCount="indefinite"
          />

          <g>
            {/* 上下へのバウンド */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -8; 0 0"
              dur="0.4s"
              repeatCount="indefinite"
              additive="sum"
            />

            {/* 猫の体 */}
            <path d="M40,100 Q60,80 100,80 T160,100 L160,130 Q160,150 140,150 L60,150 Q40,150 40,130 Z" fill="#1f2937" />

            {/* しっぽ（躍動感のある動き） */}
            <g>
              <path d="M40,110 Q10,110 15,80" stroke="#1f2937" strokeWidth="8" fill="none" strokeLinecap="round">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="-15 40 110; 15 40 110; -15 40 110"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </path>
            </g>

            {/* 足（走る軌道を表現） */}
            <g>
              {/* 前足1 */}
              <rect x="135" y="145" width="12" height="25" rx="6" fill="#1f2937">
                <animateTransform attributeName="transform" type="rotate" values="30 141 145; -30 141 145; 30 141 145" dur="0.4s" repeatCount="indefinite" />
              </rect>
              {/* 前足2 */}
              <rect x="115" y="145" width="12" height="25" rx="6" fill="#374151">
                <animateTransform attributeName="transform" type="rotate" values="-30 121 145; 30 121 145; -30 121 145" dur="0.4s" repeatCount="indefinite" />
              </rect>
              {/* 後ろ足1 */}
              <rect x="65" y="145" width="12" height="25" rx="6" fill="#1f2937">
                <animateTransform attributeName="transform" type="rotate" values="-40 71 145; 40 71 145; -40 71 145" dur="0.4s" repeatCount="indefinite" />
              </rect>
              {/* 後ろ足2 */}
              <rect x="45" y="145" width="12" height="25" rx="6" fill="#374151">
                <animateTransform attributeName="transform" type="rotate" values="40 51 145; -40 51 145; 40 51 145" dur="0.4s" repeatCount="indefinite" />
              </rect>
            </g>

            {/* 頭 */}
            <g transform="translate(165, 85)">
              <circle cx="0" cy="0" r="28" fill="#1f2937" />
              {/* 耳 */}
              <path d="M-20,-15 L-25,-35 L-5,-20 Z" fill="#1f2937" />
              <path d="M20,-15 L25,-35 L5,-20 Z" fill="#1f2937" />
              {/* 目（集中している様子） */}
              <rect x="-12" y="-5" width="6" height="2" fill="white" />
              <rect x="6" y="-5" width="6" height="2" fill="white" />
              {/* 鼻 */}
              <circle cx="0" cy="5" r="3" fill="#ff9999" />
            </g>
          </g>
        </g>
      </svg>

      <div className="text-center mt-4">
        <p className="text-orange-600 font-bold text-lg flex items-center justify-center gap-2">
          <span className="inline-block animate-bounce">🍳</span>
          美味しいレシピを探索中...
        </p>
        <p className="text-gray-400 text-sm mt-1">猫がダッシュで取得しに行っています</p>
      </div>
    </div>
  );
}
