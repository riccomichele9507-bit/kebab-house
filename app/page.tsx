import { HeroCard } from "@/components/home/hero-card";
import { UspStrip } from "@/components/home/usp-strip";
import { CategoryCircles } from "@/components/home/category-circles";
import { FeaturedDishes } from "@/components/home/featured-dishes";
import { BookingCTA } from "@/components/home/booking-cta";
import { AboutTeaser } from "@/components/home/about-teaser";
import { RestaurantLocation } from "@/components/home/restaurant-location";

export default function HomePage() {
  return (
    <div className="pb-8">
      <HeroCard />
      <UspStrip />
      <CategoryCircles />
      <FeaturedDishes />
      <BookingCTA />
      <AboutTeaser />
      <RestaurantLocation />
    </div>
  );
}
