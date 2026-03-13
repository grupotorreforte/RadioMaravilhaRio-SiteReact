import banner2 from "@/assets/banner_atual.png";

const HeroBanner = () => {
  return (
    <div className="relative w-full aspect-[1920/412] overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${banner2})`,
            backgroundSize: "cover",
          }}
        />
    </div>
  );
};

export default HeroBanner;