import React, { useRef, useEffect } from "react";

export const DeveloperBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let resizeTimeout;

    // --- CONFIGURATION ---
    const CONFIG = {
      particleCount: 50, // Reduced from 80 for better performance
      connectionDistance: 150,
      connectionDistanceSq: 150 * 150, // Pre-calculated squared distance
      mouseInteractionRadius: 200,
      mouseInteractionRadiusSq: 200 * 200,
      baseSpeed: 0.6,
      colors: ["#00f3ff", "#bc13fe", "#00ff9d"], 
      symbols: ["{ }", "</>", ";", "0", "1", "&&", "||", "[]"],
    };

    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Debounce resize to prevent lag when resizing window
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resize();
            init();
        }, 100);
    };

    class Particle {
      constructor() {
        this.reset();
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * CONFIG.baseSpeed;
        this.vy = (Math.random() - 0.5) * CONFIG.baseSpeed;
        this.color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
        this.isSymbol = Math.random() > 0.7; // Less symbols, more dots (faster to draw)
        this.symbol = CONFIG.symbols[Math.floor(Math.random() * CONFIG.symbols.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        
        // Removed ShadowBlur (Expensive!)
        // Removed GlobalCompositeOperation (Expensive!)

        if (this.isSymbol) {
            ctx.font = "12px monospace";
            ctx.fillText(this.symbol, this.x, this.y);
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.baseSize, 0, Math.PI * 2);
            ctx.fill();
        }
      }
    }

    let particles = [];
    const init = () => {
      particles = [];
      for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawConnections = () => {
        // Optimization: Standard Loop
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                
                // 1. Simple Box Check (Fastest rejection)
                // If x distance is already too big, don't calculate math
                let dx = particles[a].x - particles[b].x;
                if (dx > CONFIG.connectionDistance || dx < -CONFIG.connectionDistance) continue;
                
                let dy = particles[a].y - particles[b].y;
                if (dy > CONFIG.connectionDistance || dy < -CONFIG.connectionDistance) continue;

                // 2. Squared Distance (Avoids expensive Math.sqrt)
                let distSq = dx * dx + dy * dy;

                if (distSq < CONFIG.connectionDistanceSq) {
                    // Check Mouse Proximity
                    let midX = (particles[a].x + particles[b].x) / 2;
                    let midY = (particles[a].y + particles[b].y) / 2;
                    let mouseDx = midX - mouse.x;
                    let mouseDy = midY - mouse.y;
                    let mouseDistSq = mouseDx * mouseDx + mouseDy * mouseDy;

                    let alpha = 0;

                    if (mouseDistSq < CONFIG.mouseInteractionRadiusSq) {
                         // High visibility near mouse
                         alpha = 1 - (distSq / CONFIG.connectionDistanceSq);
                         // Optional: Add extra boost based on mouse proximity
                         alpha = Math.min(alpha + 0.3, 1); 
                         ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
                         ctx.lineWidth = 1;
                    } else {
                         // Very faint visibility elsewhere (or 0 to hide completely)
                         alpha = 1 - (distSq / CONFIG.connectionDistanceSq);
                         if (alpha > 0.8) { // Only draw the very closest lines
                            ctx.strokeStyle = `rgba(100, 100, 100, ${alpha * 0.15})`;
                            ctx.lineWidth = 0.5;
                         } else {
                            continue; // Skip drawing if too faint
                         }
                    }

                    if (alpha > 0) {
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
    };

    const animate = () => {
      // Use clearRect instead of fillRect for maximum FPS
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      drawConnections();
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    resize();
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 bg-slate-950"
    />
  );
};