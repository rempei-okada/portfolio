import React from 'react';

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">当事務所へのお問い合わせはお電話または以下のフォームから承ります。</h2>
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold">お電話でのお問い合わせ</h3>
        <p className="text-lg">092-409-9543</p>
        <p className="text-sm">all day 9:00 - 17:00</p>
      </div>
      
      <h3 className="text-2xl font-bold mb-4">フォームからお問い合わせ</h3>
      <p className="text-sm mb-4">※の項目は必須入力項目です。</p>
      <p className="text-xs mb-6">
        このサイトはreCAPTCHAによって保護されており、Googleの
        <a href="https://policies.google.com/privacy" className="text-blue-500">プライバシーポリシー</a>
        と
        <a href="https://policies.google.com/terms" className="text-blue-500">利用規約</a>
        が適用されます。
      </p>
      
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">お名前 <span className="text-red-500">*</span></label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="お名前" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="furigana">フリガナ <span className="text-red-500">*</span></label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="furigana" type="text" placeholder="フリガナ" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">メールアドレス <span className="text-red-500">*</span></label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="メールアドレス" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">電話番号</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="電話番号" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">ご住所</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="ご住所" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">お問い合わせ内容 <span className="text-red-500">*</span></label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="お問い合わせ内容" required></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            送 信
          </button>
        </div>
      </form>
    </div>
  );
}

