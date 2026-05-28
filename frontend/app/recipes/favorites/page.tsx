import RecipeTabs from "../components/RecipeTabs";

export default function FavoritesPosts() {
  return (
    <div className="min-h-[480px] flex items-center justify-center p-8">
      <div className="text-center max-w-md w-full">

        {/* アイコン */}
        <div className="relative w-20 h-20 mx-auto mb-8 animate-bounce">
          <div className="w-full h-full rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
            <svg className="w-9 h-9 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center">
            <svg className="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
          </span>
        </div>

        {/* バッジ */}
        <div className="py-2">
          <RecipeTabs />
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-medium mb-6 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          開発中
        </span>

        <h1 className="text-2xl font-medium text-gray-900 mb-3">
          お気に入り機能
        </h1>
        <p className="text-gray-500 leading-relaxed mb-8">
          この機能は現在鋭意開発中です。<br />
          もうしばらくお待ちください。
        </p>

        {/* カード */}
        <div className="grid grid-cols-2 gap-2.5 mb-8">
          {[
            {
              label: "保存機能",
              status: "実装中",
              svg: <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0z" />,
            },
            {
              label: "タグ管理",
              status: "予定",
              svg: <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3z" />,
            },
          ].map(({ label, status, svg }) => (
            <div key={label} className="bg-gray-50 rounded-lg p-4 text-left border border-gray-100">
              <svg className="w-5 h-5 text-gray-400 mb-1.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                {svg}
              </svg>
              <p className="text-sm font-medium text-gray-700">{label}</p>
              <p className="text-xs text-gray-400">{status}</p>
            </div>
          ))}
        </div>

        {/* ドット */}
        <div className="flex items-center justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
