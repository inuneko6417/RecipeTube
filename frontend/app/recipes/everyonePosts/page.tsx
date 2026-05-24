"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeTabs from "../components/RecipeTabs";

export default function EveryonePostsPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // APIから全レシピを取得
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/recipes`);
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Header />
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">みんなの投稿</h1>
        <div className="py-2">
          <RecipeTabs />
        </div>
        {/* ここでタブを表示 */}
        {/* <RecipeTabs activeTab="everyone" /> */}
        {loading ? (
          <p className="text-center">読み込み中...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* レスポンスが配列ではないのでmapは使えないの改善の必要がある */}
            {recipes.map((recipe: any) => (
              <div key={recipe.id} className="bg-white rounded-2xl shadow-sm border p-2">
                <img
                  src={recipe.thumbnail_url}
                  alt={recipe.title}
                  className="w-full aspect-video object-cover rounded-xl mb-4"
                />
                <h2 className="font-bold text-lg mb-2 line-clamp-2">{recipe.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {recipe.ingredients.slice(0, 3).map((ing: any) => (
                    <span key={ing.id} className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-md">
                      {ing.name}
                    </span>
                  ))}
                  {recipe.ingredients.length > 3 && <span className="text-xs text-gray-400">...他</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
