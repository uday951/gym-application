import React from "react";
import Image from "next/image";
import { PriceCard } from "./../components/priceCard";
import { Footer } from "./../components/footer";
import { Navbar } from "./../components/Navbar";
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const title = "Pricing";

export default function Pricing() {
  const handleCheckout = async (planName, price) => {
    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: price, // In INR
      }),
    });

    const { orderId } = await response.json();

    // Razorpay options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay API key
      amount: price * 100, // Amount in paise
      currency: "INR",
      name: "Atlas Gym",
      description: `${planName} Plan`,
      order_id: orderId,
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Various pricing options available with being a Member of Atlas Gym. Whether you're new to the gym or an experienced lifter we have a plan that fits your needs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`bg-black ${inter.className}`}>
        <Navbar />
        <div className="h-[400px] w-full bg-black relative flex justify-center items-end">
          <Image src="/images/sub-page-1.webp" alt="Pricing" className="object-cover" fill />
          <div className="w-full h-full z-10 absolute bg-black/50"></div>
          <div className=" text-center text-2xl mt-10 mb-5 tracking-[.1em] uppercase flex justify-center items-center gap-2 font-semibold z-30 text-white">
            <span>
              <div className="w-8 h-[2px] bg-gradient-to-r from-red-500 to-orange-600"></div>
            </span>
            {title}
            <span>
              <div className="w-8 h-[2px] bg-gradient-to-r from-red-500 to-orange-600"></div>
            </span>
          </div>
        </div>

        <div className="bg-white flex flex-col py-8 items-center border-b-2">
          <div className="flex justify-center">
            <div className="flex justify-center gap-10 flex-wrap">
              <PriceCard 
                title={"Newcomer"}
                price="2999" // Price in INR
                features={""}
                thumbnail="/images/pricing/pricing-2.jpg"
                handleCheckout={() => handleCheckout("Newcomer", 2999)}
              />
              <PriceCard
                title={"Experienced"}
                price="4999" // Price in INR
                features={""}
                thumbnail="/images/pricing/pricing-1.webp"
                handleCheckout={() => handleCheckout("Experienced", 4999)}
              />
              <PriceCard
                title={"Mr. Olympia"}
                price="5999" // Price in INR
                features={""}
                thumbnail="/images/pricing/pricing-3.webp"
                handleCheckout={() => handleCheckout("Mr. Olympia", 5999)}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
