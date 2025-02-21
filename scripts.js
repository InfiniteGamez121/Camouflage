const cursor = document.querySelector('.custom-cursor');
      const cursorDot = document.querySelector('.custom-cursor-dot');
      document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px'
      });
      document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%, -50%) scale(0.7)');
      document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
      document.querySelectorAll('a, button, .movie-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'))
      });

      const particleContainer = document.getElementById('particle-container');

		function createParticle() {
			const particle = document.createElement('div');
			const size = Math.random() * 5 + 2; 
			const startX = Math.random() * window.innerWidth;
			const greenShades = ['#24ec24', '#03d803', '#029902', '#02a002', '#4df54d'];

			particle.style.cssText = `
				position: absolute;
				bottom: 0;
				left: ${startX}px;
				width: ${size}px;
				height: ${size}px;
				border-radius: 50%;
				background-color: ${greenShades[Math.floor(Math.random() * greenShades.length)]};
				opacity: ${Math.random() * 0.8 + 0.2};
				animation: moveParticle ${Math.random() * 7 + 6}s linear;
			`;

			particleContainer.appendChild(particle);

			particle.addEventListener('animationend', () => particle.remove());
		}

		setInterval(() => {
			if (document.hidden) return;
			createParticle();
		}, 200);

		const style = document.createElement('style');
        		style.textContent = `
		@keyframes moveParticle {
			0% {
				transform: translate(0, 0) rotate(0deg);
			}
			100% {
				transform: translate(calc(-50vw + 100%), calc(-100vh)) rotate(360deg);
			}
		}
		`;
		document.head.appendChild(style);

        document.getElementById('search-bar').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                let url = this.value.trim().toLowerCase();
                if (!url.startsWith('https://')) {
                    url = 'https://' + url;
                }
                window.location.href = `/static/iframe.html#` + url;
            }
        });
        if ('serviceWorker' in navigator) {
	    navigator.serviceWorker.register('/service-worker.js');
	}

