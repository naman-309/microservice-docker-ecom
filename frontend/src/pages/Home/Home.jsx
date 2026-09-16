import HeroSection from "../../components/home/HeroSection"
import FeaturedProducts from "../../components/home/FeaturedProducts"
import TechStack from "../../components/home/TechStack"
import ArchitecturePreview from "../../components/home/ArchitecturePreview"
function Home() {
    return (
        <>

            <HeroSection />
            <FeaturedProducts />
            <TechStack></TechStack>
            <ArchitecturePreview>   </ArchitecturePreview>
        </>
    )
}

export default Home