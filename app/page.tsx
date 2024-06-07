import Image from "next/image";

export default function Home() {
  return (
    <main
    className={`flex min-h-screen flex-col items-center justify-between p-24`}
  >
    <h1>Stripe Payments</h1>
    <p>A consultancy session</p>
    <a
      href="https://buy.stripe.com/test_eVa3dW8uE1JCgw0aEE"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Buy Now
    </a>
  </main>
  );
}