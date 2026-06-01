"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeTabs from "../components/RecipeTabs";
import { Ingredient } from "../page";
import { Recipe } from "../page";
import { LoadingCat } from "../components/LoadingCat";

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
          <LoadingCat />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe: Recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className="bg-white rounded-2xl shadow-sm border overflow-hidden transition-all hover:shadow-md hover:border-orange-200 group"
              >
                <img
                  src={recipe.thumbnail_url}
                  alt={recipe.title}
                  className="w-full aspect-video object-cover group-hover:opacity-90 transition-opacity"
                />
                <div className="p-4">
                  <h2 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {recipe.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredients.slice(0, 3).map((ing: Ingredient) => (
                      <span key={ing.id} className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-md">
                        {ing.name}
                      </span>
                    ))}
                    {recipe.ingredients.length > 3 && <span className="text-xs text-gray-400">...他</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
