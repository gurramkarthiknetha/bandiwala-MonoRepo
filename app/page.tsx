import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ServiceButtons from '@/components/ServiceButtons';
import FeaturedVendors from '@/components/FeaturedVendors';
import TrendingDishes from '@/components/TrendingDishes';
import Reviews from '@/components/Reviews';
import MapSection from '@/components/MapSection';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <ServiceButtons />
      <FeaturedVendors />
      <TrendingDishes />
      <Reviews />
      <MapSection />
      <CTA />
      <Footer />
    </div>
  );
}
