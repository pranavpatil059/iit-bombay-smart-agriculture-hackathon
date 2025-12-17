
import Layout from '@/components/Layout';
import FarmerSchemesHub from '@/components/FarmerSchemesHub';
import PMKisanDashboard from '@/components/PMKisanDashboard';
import ParticleBackground from '@/components/ParticleBackground';

const GovernmentSchemes = () => {
  return (
    <Layout>
      {/* Animated Particle Background */}
      <ParticleBackground className="opacity-30" />
      
      <div className="relative z-10">
        <FarmerSchemesHub />
      </div>
    </Layout>
  );
};

export default GovernmentSchemes;
