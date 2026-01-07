import React, { useRef, useEffect } from "react";

export const DeveloperBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    
    // Configuration
    const PARTICLE_COUNT = 70;
    const CONNECT_DISTANCE = 110;
    const MOUSE_RADIUS = 150;
    
    // Tech colors matching your screenshot (Cyan, Blue, Purple, White)
    const COLORS = ["#64ffda", "#4facfe", "#a855f7", "#ffffff"];
    const SYMBOLS = ["{ }", "</>", ";", "0", "1", "&&", "||", "[]"];

    const mouse = { x: null, y: null };

    // Handle high-res displays
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5; // Velocity X
        this.vy = (Math.random() - 0.5) * 1.5; // Velocity Y
        this.size = Math.random() * 2 + 1;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        // 20% chance to be a code symbol, 80% chance to be a dot
        this.isSymbol = Math.random() > 0.8;
        this.symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      }

      update() {
        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse Interaction (Repulsion)
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < MOUSE_RADIUS) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
                const directionX = forceDirectionX * force * 3;
                const directionY = forceDirectionY * force * 3;

                this.x -= directionX;
                this.y -= directionY;
            }
        }
      }

      draw() {
        ctx.beginPath();
        if (this.isSymbol) {
            ctx.font = "14px monospace";
            ctx.fillStyle = this.color;
            ctx.fillText(this.symbol, this.x, this.y);
        } else {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
      }
    }

    let particles = [];
    const init = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and Draw Particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw Connections (The Network Effect)
      connectParticles();

      animationId = requestAnimationFrame(animate);
    };

    const connectParticles = () => {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONNECT_DISTANCE) {
                    // Calculate opacity based on distance (fade out as they get further)
                    let opacityValue = 1 - (distance / CONNECT_DISTANCE);
                    ctx.strokeStyle = `rgba(100, 255, 218, ${opacityValue * 0.2})`; // Using the Cyan color with low opacity
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    // Event Listeners
    window.addEventListener("resize", () => {
        resize();
        init();
    });
    
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    // Clear mouse when leaving window so particles settle
    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });

    resize();
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 bg-transparent"
      style={{ background: 'transparent' }} // Ensure canvas itself is transparent
    />
  );
};