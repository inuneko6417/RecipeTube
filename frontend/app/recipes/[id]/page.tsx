"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeTabs from "../components/RecipeTabs";

type Ingredient = {
  id: number;
  name: string;
  quantity: string;
};

type Recipe = {
  id: number;
  title: string;
  thumbnail_url: string;
  video_id: string;
  ingredients: Ingredient[];
};

export default function RecipeShowPage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/recipes/${params.id}`);
        if (!res.ok) {
          throw new Error("レシピが見つかりませんでした");
        }
        const data = await res.json();
        setRecipe(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "予期しないエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRecipe();
    }
  }, [params.id]);

  if (loading) return <div className="text-center p-10">読み込み中...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!recipe) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Header />
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">投稿詳細</h1>
        <div className="py-2">
          <RecipeTabs />
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8">
          <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>

          <div className="aspect-video mb-6">
            <iframe
              className="w-full h-full rounded"
              src={`https://www.youtube.com/embed/${recipe.video_id}`}
              title={recipe.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <h3 className="font-bold text-lg mb-2 text-blue-600">
            材料
          </h3>
          <div className="p-4 bg-gray-50 border rounded">
            <div className="grid gap-3">
              {recipe.ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
