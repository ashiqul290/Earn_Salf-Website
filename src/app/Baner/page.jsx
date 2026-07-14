"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaBoxOpen, FaMotorcycle, FaUsers, FaCheckCircle,
  FaGooglePlay, FaApple, FaFacebookF, FaWhatsapp,
  FaInstagram, FaYoutube, FaArrowRight, FaStar,
} from "react-icons/fa";

const stats = [
  { icon: <FaBoxOpen />,     title: "Products",   value: "100+", bg: "bg-blue-100",   color: "text-blue-500",   glow: "shadow-blue-200"   },
  { icon: <FaMotorcycle />,  title: "Deliveries", value: "400+", bg: "bg-pink-100",   color: "text-pink-500",   glow: "shadow-pink-200"   },
  { icon: <FaUsers />,       title: "Affiliates", value: "200+", bg: "bg-cyan-100",   color: "text-cyan-500",   glow: "shadow-cyan-200"   },
  { icon: <FaCheckCircle />, title: "Success",    value: "90%",  bg: "bg-green-100",  color: "text-green-500",  glow: "shadow-green-200"  },
];

const products = [
  { img: "p1.jpg",  name: "Premium Kit",      price: "৳1,200", rating: 4.8 },
  { img: "p2.jpg",  name: "Starter Pack",     price: "৳850",   rating: 4.5 },
  { img: "p3.jpg",  name: "Growth Bundle",    price: "৳1,500", rating: 4.9 },
  { img: "p4.jpg",  name: "Basic Set",        price: "৳600",   rating: 4.3 },
  { img: "p5.jpg",  name: "Pro Package",      price: "৳2,000", rating: 5.0 },
  { img: "p6.jpg",  name: "Value Bundle",     price: "৳750",   rating: 4.6 },
  { img: "p7.jpg",  name: "Elite Collection", price: "৳2,500", rating: 4.7 },
  { img: "p8.jpg",  name: "Classic Kit",      price: "৳900",   rating: 4.4 },
  { img: "p9.jpg",  name: "Smart Pack",       price: "৳1,100", rating: 4.8 },
  { img: "p10.jpg", name: "Mega Bundle",      price: "৳3,000", rating: 4.9 },
  { img: "p11.jpg", name: "Lite Set",         price: "৳500",   rating: 4.2 },
  { img: "p12.jpg", name: "Super Kit",        price: "৳1,800", rating: 4.7 },
];

const heroBanners = ["img2.avif", "img3.jpg", "img4.avif", "img5.avif"];

const heroSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 800,
  arrows: false,
};

const productSettings = {
  dots: false,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  speed: 600,
  arrows: false,
  responsive: [
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

export default function HomePage() {
  return (
    <div className="space bg-white min-h-screen overflow-x-hidden">

      {/* ── Hero Section ── */}
      <section className="relative pt-6 pb-10 px-4">
        {/* Background blob */}
        <div className="absolute top-0 left-0 w-full h-[320px] bg-gradient-to-br from-yellow-50 via-pink-50 to-white -z-10 rounded-b-[60px]" />

        {/* Heading */}
        <div className="text-center mb-6 px-2">
          <span className="inline-block bg-yellow-100 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full mb-3 tracking-wide">
            🚀 Next Generation Platform
          </span>
          <h1 className="text-[26px] sm:text-[34px] font-extrabold text-gray-800 leading-tight">
            Grow Your Skill &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
              Earn More
            </span>
          </h1>
          <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
            Join thousands of affiliates earning with EarnSelf every day.
          </p>
        </div>

        {/* Hero Slider */}
        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-yellow-100">
          <Slider {...heroSettings}>
            {heroBanners.map((src, i) => (
              <div key={i}>
                <div className="relative h-[200px] sm:h-[260px]">
                  <img
                    src={src}
                    alt={`banner-${i}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="px-4 mb-10">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-md ${item.glow}`}
            >
              <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <span className={`text-xl ${item.color}`}>{item.icon}</span>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">{item.title}</p>
                <p className="text-xl font-extrabold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trending Products ── */}
      <section className="px-4 mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-gray-800">Trending Products</h2>
            <p className="text-xs text-gray-400">Best sellers this week</p>
          </div>
          <a
            href=""
            className="flex items-center gap-1 text-xs font-semibold text-yellow-500 hover:text-yellow-600 transition"
          >
            See all <FaArrowRight size={10} />
          </a>
        </div>

        <Slider {...productSettings}>
          {products.map((p, i) => (
            <div key={i} className="px-1.5">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
                {/* Image */}
                <div className="relative h-[160px] sm:h-[180px] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  {/* Rating badge */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full shadow">
                    <FaStar className="text-yellow-400 text-[10px]" />
                    <span className="text-[10px] font-bold text-gray-700">{p.rating}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-extrabold text-emerald-600">{p.price}</span>
                    <button className="text-[10px] font-semibold bg-yellow-400 hover:bg-yellow-500 text-white px-2.5 py-1 rounded-lg transition">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* ── App Download Banner ── */}
      <section className="px-4 mb-10">
        <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-6 overflow-hidden shadow-xl shadow-yellow-200">
          <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 -left-4 w-20 h-20 bg-white/10 rounded-full" />
          <div className="relative z-10">
            <p className="text-xs text-white/80 font-medium mb-1">📱 Available Now</p>
            <h3 className="text-xl font-extrabold text-white mb-1">Download Our App</h3>
            <p className="text-white/70 text-xs mb-4">Track earnings, manage referrals on the go</p>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white text-gray-800 text-xs font-bold px-4 py-2.5 rounded-xl shadow hover:shadow-md transition">
                <FaGooglePlay className="text-green-500 text-sm" /> Google Play
              </button>
              <button className="flex items-center gap-2 bg-white text-gray-800 text-xs font-bold px-4 py-2.5 rounded-xl shadow hover:shadow-md transition">
                <FaApple className="text-gray-800 text-sm" /> App Store
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Links ── */}
      <section className="px-4 mb-10">
        <h3 className="text-sm font-bold text-gray-700 mb-3 text-center">Follow Us</h3>
        <div className="flex justify-center gap-3">
          {[
            { icon: <FaFacebookF />,  bg: "bg-blue-600",  href: "#" },
            { icon: <FaWhatsapp />,   bg: "bg-green-500", href: "#" },
            { icon: <FaInstagram />,  bg: "bg-pink-500",  href: "#" },
            { icon: <FaYoutube />,    bg: "bg-red-600",   href: "#" },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              className={`w-11 h-11 ${s.bg} text-white rounded-2xl flex items-center justify-center text-base shadow-md hover:scale-110 hover:shadow-lg transition-all duration-200`}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}