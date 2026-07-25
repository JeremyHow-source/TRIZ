import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters (mix of numbers, letters, and Japanese Katakana)
    const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    const charArray = matrixChars.split("");

    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);

    // Track the vertical position of each column's drop
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start at random off-screen vertical offsets
    }

    const draw = () => {
      // Semi-transparent black wash to generate the fading trail effect
      ctx.fillStyle = 'rgba(9, 11, 14, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw glowing bright white-green heads for active drops, green for trails
        if (Math.random() > 0.985) {
          ctx.fillStyle = '#ffffff'; // White head
        } else if (Math.random() > 0.95) {
          ctx.fillStyle = '#66ff99'; // Bright green transition
        } else {
          ctx.fillStyle = '#00ff66'; // Standard Matrix green
        }

        ctx.fillText(char, x, y);

        // Reset drop to top randomly after it goes past the screen height
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.22]"
      style={{ mixBlendMode: 'screen' }}
      id="matrix-rain-canvas"
    />
  );
}
