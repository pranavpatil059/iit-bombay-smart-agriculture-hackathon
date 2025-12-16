import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  pulse: number;
}

interface FloatingOrb {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

interface EnhancedParticleBackgroundProps {
  className?: string;
  theme?: 'agriculture' | 'finance' | 'technology';
}

const EnhancedParticleBackground: React.FC<EnhancedParticleBackgroundProps> = ({
  className = '',
  theme = 'agriculture'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const orbsRef = useRef<FloatingOrb[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const getThemeColors = () => {
    switch (theme) {
      case 'agriculture':
        return {
          particles: ['#22c55e', '#16a34a', '#15803d', '#ef4444', '#f97316'],
          orbs: [
            'rgba(34, 197, 94, 0.15)',   // Green
            'rgba(22, 163, 74, 0.12)',   // Dark Green
            'rgba(239, 68, 68, 0.1)',    // Red
            'rgba(249, 115, 22, 0.1)',   // Orange
            'rgba(245, 158, 11, 0.08)'   // Yellow
          ],
          background: {
            center: 'rgba(5, 46, 22, 0.95)',     // Dark green
            mid: 'rgba(20, 83, 45, 0.9)',        // Forest green
            edge: 'rgba(15, 23, 42, 0.95)'       // Dark blue
          }
        };
      case 'finance':
        return {
          particles: ['#ef4444', '#dc2626', '#b91c1c', '#fbbf24', '#f59e0b'],
          orbs: [
            'rgba(239, 68, 68, 0.15)',   // Red
            'rgba(220, 38, 38, 0.12)',   // Dark Red
            'rgba(251, 191, 36, 0.1)',   // Gold
            'rgba(245, 158, 11, 0.1)',   // Amber
            'rgba(249, 115, 22, 0.08)'   // Orange
          ],
          background: {
            center: 'rgba(46, 5, 5, 0.95)',      // Dark red
            mid: 'rgba(83, 20, 20, 0.9)',        // Deep red
            edge: 'rgba(15, 23, 42, 0.95)'       // Dark blue
          }
        };
      default:
        return {
          particles: ['#3b82f6', '#2563eb', '#1d4ed8', '#ef4444', '#8b5cf6'],
          orbs: [
            'rgba(59, 130, 246, 0.15)',  // Blue
            'rgba(37, 99, 235, 0.12)',   // Dark Blue
            'rgba(139, 92, 246, 0.1)',   // Purple
            'rgba(239, 68, 68, 0.1)',    // Red
            'rgba(34, 197, 94, 0.08)'    // Green
          ],
          background: {
            center: 'rgba(5, 22, 46, 0.95)',     // Dark blue
            mid: 'rgba(20, 45, 83, 0.9)',        // Deep blue
            edge: 'rgba(15, 23, 42, 0.95)'       // Dark navy
          }
        };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = getThemeColors();

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 3 + 2,
          color: colors.particles[Math.floor(Math.random() * colors.particles.length)],
          pulse: Math.random() * Math.PI * 2
        });
      }
    };

    // Initialize floating orbs
    const initOrbs = () => {
      orbsRef.current = [];
      for (let i = 0; i < 12; i++) {
        orbsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 150 + 80,
          opacity: Math.random() * 0.4 + 0.1,
          speed: Math.random() * 0.3 + 0.1,
          color: colors.orbs[Math.floor(Math.random() * colors.orbs.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02
        });
      }
    };

    initParticles();
    initOrbs();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      // Create dynamic gradient background
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x || canvas.width / 2, 
        mouseRef.current.y || canvas.height / 2, 0,
        mouseRef.current.x || canvas.width / 2, 
        mouseRef.current.y || canvas.height / 2, 
        Math.max(canvas.width, canvas.height) * 0.8
      );
      gradient.addColorStop(0, colors.background.center);
      gradient.addColorStop(0.4, colors.background.mid);
      gradient.addColorStop(1, colors.background.edge);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add animated overlay pattern
      const time = Date.now() * 0.001;
      const overlayGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      overlayGradient.addColorStop(0, `rgba(239, 68, 68, ${0.05 + Math.sin(time) * 0.02})`);
      overlayGradient.addColorStop(0.5, 'transparent');
      overlayGradient.addColorStop(1, `rgba(34, 197, 94, ${0.05 + Math.cos(time * 1.2) * 0.02})`);
      
      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw floating orbs with enhanced effects
      orbsRef.current.forEach((orb) => {
        // Update orb position and rotation
        orb.y -= orb.speed;
        orb.x += Math.sin(time + orb.x * 0.01) * 0.5;
        orb.rotation += orb.rotationSpeed;

        // Reset orb when it goes off screen
        if (orb.y < -orb.size) {
          orb.y = canvas.height + orb.size;
          orb.x = Math.random() * canvas.width;
        }

        // Create complex orb gradient
        const orbGradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.size
        );
        orbGradient.addColorStop(0, orb.color.replace('0.15', '0.4'));
        orbGradient.addColorStop(0.3, orb.color.replace('0.15', '0.2'));
        orbGradient.addColorStop(0.7, orb.color);
        orbGradient.addColorStop(1, 'transparent');

        // Draw orb with rotation effect
        ctx.save();
        ctx.translate(orb.x, orb.y);
        ctx.rotate(orb.rotation);
        
        // Main orb
        ctx.beginPath();
        ctx.arc(0, 0, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = orbGradient;
        ctx.fill();

        // Inner glow
        ctx.beginPath();
        ctx.arc(0, 0, orb.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = orb.color.replace('0.15', '0.6');
        ctx.fill();

        // Sparkle effect
        for (let i = 0; i < 3; i++) {
          const sparkleAngle = (orb.rotation + i * (Math.PI * 2 / 3));
          const sparkleX = Math.cos(sparkleAngle) * orb.size * 0.8;
          const sparkleY = Math.sin(sparkleAngle) * orb.size * 0.8;
          
          ctx.beginPath();
          ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fill();
        }

        ctx.restore();
      });

      // Update and draw particles with enhanced effects
      particlesRef.current.forEach((particle, i) => {
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.pulse += 0.1;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Pulsing size effect
        const pulseSize = particle.size + Math.sin(particle.pulse) * 1;

        // Draw particle with enhanced glow
        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, pulseSize * 4
        );
        particleGradient.addColorStop(0, particle.color);
        particleGradient.addColorStop(0.3, particle.color + '80');
        particleGradient.addColorStop(0.6, particle.color + '40');
        particleGradient.addColorStop(1, 'transparent');

        // Outer glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize * 4, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();

        // Main particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(particle.x - pulseSize * 0.3, particle.y - pulseSize * 0.3, pulseSize * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();

        // Draw enhanced connections
        particlesRef.current.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              const opacity = (1 - distance / 150) * 0.8;
              
              // Main connection line
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
              ctx.lineWidth = 2;
              ctx.stroke();

              // Glow effect
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
              ctx.lineWidth = 4;
              ctx.stroke();
            }
          }
        });

        // Enhanced mouse interaction
        const mouseDistance = Math.sqrt(
          (particle.x - mouseRef.current.x) ** 2 + (particle.y - mouseRef.current.y) ** 2
        );

        if (mouseDistance < 250) {
          const opacity = (1 - mouseDistance / 250) * 1;
          
          // Lightning-like connection to mouse
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          
          // Add some randomness to the line for lightning effect
          const midX = (particle.x + mouseRef.current.x) / 2 + (Math.random() - 0.5) * 20;
          const midY = (particle.y + mouseRef.current.y) / 2 + (Math.random() - 0.5) * 20;
          
          ctx.quadraticCurveTo(midX, midY, mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 3;
          ctx.stroke();

          // Inner lightning core
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.quadraticCurveTo(midX, midY, mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Strong attraction to mouse
          const attractionForce = 0.0003;
          particle.vx += (mouseRef.current.x - particle.x) * attractionForce;
          particle.vy += (mouseRef.current.y - particle.y) * attractionForce;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: 'transparent' }}
    />
  );
};

export default EnhancedParticleBackground;