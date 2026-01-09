import React, { useRef, useEffect } from "react";

export const DeveloperBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    
    // --- CONFIGURATION ---
    const PARTICLE_COUNT = 60; // Slightly fewer particles to save performance for the glow
    const CONNECT_DISTANCE = 120;
    const MOUSE_RADIUS = 180;
    const GLOW_INTENSITY = 15;
    
    // Cyberpunk Palette
    const COLORS = ["#00f3ff", "#bd00ff", "#00ff9d", "#ffffff"]; // Cyan, Purple, Neon Green, White
    const SYMBOLS = ["{ }", "</>", ";", "0", "1", "&&", "||", "[]", "=>", "()"];

    const mouse = { x: null, y: null };

    // Handle Resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8; // Slower, smoother movement
        this.vy = (Math.random() - 0.5) * 0.8;
        this.baseSize = Math.random() * 2 + 1;
        this.size = this.baseSize;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        // Symbol Logic
        this.isSymbol = Math.random() > 0.7; // 30% chance to be a code symbol
        this.symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        this.changeTimer = 0; // Timer to switch symbols
        
        // Pulse Logic
        this.angle = Math.random() * Math.PI * 2; // Random starting angle for pulse
      }

      update() {
        // 1. Move
        this.x += this.vx;
        this.y += this.vy;

        // 2. Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // 3. Mouse Interaction (Repulsion + Attraction mix)
        // We want them to gently float away but connect to mouse
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < MOUSE_RADIUS) {
                const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
                const directionX = (dx / distance) * force * 2; // Push away slightly
                const directionY = (dy / distance) * force * 2;
                this.x -= directionX;
                this.y -= directionY;
            }
        }

        // 4. "Decryption" Effect: Change symbol occasionally
        if (this.isSymbol) {
            this.changeTimer++;
            if (this.changeTimer > 20 + Math.random() * 50) { // Random interval
                this.symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
                this.changeTimer = 0;
            }
        }

        // 5. Pulse Effect (Breathing size)
        this.angle += 0.05;
        this.size = this.baseSize + Math.sin(this.angle) * 0.5;
      }

      draw() {
        ctx.beginPath();
        // Add Glow
        ctx.shadowBlur = GLOW_INTENSITY;
        ctx.shadowColor = this.color;

        if (this.isSymbol) {
            ctx.font = "12px monospace";
            ctx.fillStyle = this.color;
            ctx.fillText(this.symbol, this.x, this.y);
        } else {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        // Reset shadow for performance (optional, but good practice)
        ctx.shadowBlur = 0;
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
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      connectToMouse(); // NEW: Connect particles to mouse cursor

      animationId = requestAnimationFrame(animate);
    };

    const connectParticles = () => {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONNECT_DISTANCE) {
                    let opacityValue = 1 - (distance / CONNECT_DISTANCE);
                    ctx.strokeStyle = `rgba(100, 243, 255, ${opacityValue * 0.15})`; // Cyan connections
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    const connectToMouse = () => {
        if (mouse.x === null) return; // Mouse not on screen

        for (let i = 0; i < particles.length; i++) {
            let dx = mouse.x - particles[i].x;
            let dy = mouse.y - particles[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < MOUSE_RADIUS) {
                let opacityValue = 1 - (distance / MOUSE_RADIUS);
                // Brighter connection to mouse
                ctx.strokeStyle = `rgba(189, 0, 255, ${opacityValue * 0.4})`; // Purple mouse lines
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }

    // Event Listeners
    window.addEventListener("resize", () => {
        resize();
        init();
    });
    
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX; // Changed to clientX for React compatibility
        mouse.y = e.clientY;
    });

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
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ background: 'transparent' }} 
    />
  );
};