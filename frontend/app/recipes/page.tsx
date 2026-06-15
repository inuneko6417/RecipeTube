"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import RecipeTabs from "./components/RecipeTabs";


export type Ingredient = {
  id?: number;
  name: string;
  quantity: string;
};

export type Recipe = {
  id?: number;
  title: string;
  thumbnail_url: string;
  video_id: string;
  youtube_url: string;
  ingredients: Ingredient[];
};

export default function RecipeExtractorPage() {
  const router = useRouter();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoInfo, setVideo] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (videoInfo) {
      document.title = `${videoInfo.title} | RecipeTube`;
    } else {
      document.title = "Recipetube検索 | RecipeTube";
    }
  }, [videoInfo]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setVideo(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recipes/preview`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ youtube_url: youtubeUrl }),
        },
      );

      if (!res.ok) {
        throw new Error("取得に失敗しました");
      }

      const data = await res.json();
      setVideo(data);
    } catch {
      setErrors(["取得に失敗しました"]);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async () => {
    if (videoInfo) {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/recipes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipe: {
              title: videoInfo.title,
              video_id: videoInfo.video_id,
              youtube_url: videoInfo.youtube_url,
              thumbnail_url: videoInfo.thumbnail_url,
              ingredients_attributes: videoInfo.ingredients.map(ing => ({
                name: ing.name,
                quantity: ing.quantity
              }))
            }
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          if (data.errors && Array.isArray(data.errors)) {
            setErrors(data.errors);
          } else {
            setErrors(["投稿に失敗しました"]);
          }
          return;
        }
        router.push(`/recipes/everyonePosts`);
      } catch (err) {
        setErrors(["通信エラーが発生しました"]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Header />
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          YouTubeレシピ食材抽出
        </h1>
        <div className="py-2">
          <RecipeTabs />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8"
        >
          <label className="block text-sm font-bold mb-2">YouTube動画URL</label>
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            className="border rounded w-full py-2 px-3 mb-4"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            required
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "取得中..." : "取得"}
          </button>
        </form>

        {errors.length > 0 && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
            <div className="relative overflow-hidden bg-white border border-red-100 rounded-3xl shadow-xl shadow-red-100/20">
              {/* 装飾的な背景アクセント */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-500 to-orange-400" />

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-50 rounded-xl">
                    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">
                      確認が必要です
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">以下の項目をご確認ください</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {errors.map((msg, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-red-50/50 rounded-2xl border border-red-100/50 group hover:bg-red-50 transition-colors"
                    >
                      <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 group-hover:scale-125 transition-transform" />
                      <p className="text-sm text-red-800 font-semibold leading-relaxed">
                        {msg}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {videoInfo && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <h2 className="text-xl font-bold mb-4">{videoInfo.title}</h2>

            <div className="aspect-video mb-6">
              <iframe
                className="w-full h-full rounded"
                src={`https://www.youtube.com/embed/${videoInfo.video_id}`}
                title={videoInfo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="font-bold text-lg mb-2 text-blue-600">
              抽出された材料
            </h3>
            <div className="p-4 bg-gray-50 border rounded">
              <div className="grid gap-3">
                {videoInfo.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="group relative flex items-center justify-between p-4 bg-white hover:bg-orange-50/50 border border-gray-100 rounded-2xl transition-all hover:border-orange-200 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:scale-125 transition-transform" />
                      <span className="text-gray-800 font-semibold group-hover:text-orange-950 transition-colors">
                        {ingredient.name}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-orange-50 text-orange-400 text-xs font-bold rounded-lg border border-orange-100 group-hover:bg-orange-600 group-hover:text-white transition-all">
                      {ingredient.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-6">
              <button
                onClick={handlePost}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
              >
                {loading ? "投稿中..." : "投稿する"}
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
