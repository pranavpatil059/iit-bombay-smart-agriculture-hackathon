import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

interface Bubble {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
}

interface ParticleBackgroundProps {
  className?: string;
  particleColor?: string;
  lineColor?: string;
  particleCount?: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className = '',
  particleColor = '#ef4444',
  lineColor = '#ef4444',
  particleCount = 60
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const bubblesRef = useRef<Bubble[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 4 + 2
        });
      }
    };

    // Initialize floating bubbles
    const initBubbles = () => {
      bubblesRef.current = [];
      const bubbleColors = [
        'rgba(239, 68, 68, 0.1)',   // Red
        'rgba(249, 115, 22, 0.1)',  // Orange
        'rgba(245, 158, 11, 0.1)',  // Amber
        'rgba(34, 197, 94, 0.1)',   // Green
        'rgba(59, 130, 246, 0.1)',  // Blue
        'rgba(147, 51, 234, 0.1)',  // Purple
        'rgba(236, 72, 153, 0.1)'   // Pink
      ];

      for (let i = 0; i < 15; i++) {
        bubblesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 100 + 50,
          opacity: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 0.5 + 0.2,
          color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)]
        });
      }
    };

    initParticles();
    initBubbles();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');    // Dark blue center
      gradient.addColorStop(0.3, 'rgba(30, 41, 59, 0.9)');   // Slate
      gradient.addColorStop(0.6, 'rgba(51, 65, 85, 0.8)');   // Gray
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.95)');    // Dark edges

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw floating bubbles
      bubblesRef.current.forEach((bubble) => {
        // Update bubble position
        bubble.y -= bubble.speed;
        bubble.x += Math.sin(Date.now() * 0.001 + bubble.x * 0.01) * 0.5;

        // Reset bubble when it goes off screen
        if (bubble.y < -bubble.size) {
          bubble.y = canvas.height + bubble.size;
          bubble.x = Math.random() * canvas.width;
        }

        // Draw bubble with gradient
        const bubbleGradient = ctx.createRadialGradient(
          bubble.x, bubble.y, 0,
          bubble.x, bubble.y, bubble.size
        );
        bubbleGradient.addColorStop(0, bubble.color.replace('0.1', '0.3'));
        bubbleGradient.addColorStop(0.7, bubble.color);
        bubbleGradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = bubbleGradient;
        ctx.fill();

        // Add bubble border glow
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.strokeStyle = bubble.color.replace('0.1', '0.5');
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle with glow effect
        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        particleGradient.addColorStop(0, particleColor);
        particleGradient.addColorStop(0.5, particleColor + '80');
        particleGradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();

        // Draw solid particle center
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Draw connections to nearby particles
        particlesRef.current.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              const opacity = (1 - distance / 120) * 0.6;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });

        // Draw connection to mouse with enhanced effect
        const mouseDistance = Math.sqrt(
          (particle.x - mouseRef.current.x) ** 2 + (particle.y - mouseRef.current.y) ** 2
        );

        if (mouseDistance < 200) {
          const opacity = (1 - mouseDistance / 200) * 0.8;
          
          // Draw glowing line to mouse
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Add glow effect
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
          ctx.lineWidth = 4;
          ctx.stroke();

          // Attract particle to mouse
          const attractionForce = 0.0002;
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
  }, [particleColor, lineColor, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleBackground;