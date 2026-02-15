// src/app/admin/page.tsx
"use client";
export default function AdminPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) alert("Product added to Postgres!");
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-xl font-bold mb-4 text-black">Add New Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" placeholder="Title" className="border p-2 text-black" required />
        <input name="price" type="number" step="0.01" placeholder="Price" className="border p-2 text-black" required />
        <textarea name="description" placeholder="Description" className="border p-2 text-black" />
        <input name="category" placeholder="Category" className="border p-2 text-black" />
        <input name="image" placeholder="Image URL" className="border p-2 text-black" />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add to E-shop</button>
      </form>
    </div>
  );
}